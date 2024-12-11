import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "../atoms/input";
import { toast } from "../../hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Typography } from "../atoms/typography";
import {
  registerSchema,
  RegisterSchema,
} from "../../schemes/user/register.schema";
import { Link } from "react-router";
import { RadioGroup, RadioGroupItem } from "../atoms/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { DatePicker } from "../atoms/date-picker";

type states = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<
    { id: number; sigla: string; nome: string }[]
  >([]);
  const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "http://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        setStates(
          data.sort((a: states, b: states) => a.nome.localeCompare(b.nome))
        );
      } catch (error) {
        console.error("Error fetching states:", error);
        toast({
          title: "Erro ao carregar estados",
          description: "Não foi possível carregar a lista de estados.",
          variant: "destructive",
        });
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.watch(
            "uf"
          )}/municipios`
        );
        const data = await response.json();
        setCities(
          data.sort((a: { nome: string }, b: { nome: string }) =>
            a.nome.localeCompare(b.nome)
          )
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          title: "Erro ao carregar cidades",
          description: "Não foi possível carregar a lista de cidades.",
          variant: "destructive",
        });
      }
    };

    fetchCities();
  }, [form.watch("uf")]);

  function onSubmit(values: RegisterSchema) {
    setLoading(true);

    // 3. Handle your form submission.
    //const confirmedUser = await login(values);

    // 4. Handle the response.
    /* if (confirmedUser) {
     
      / set/update authentication token
      /update

     return router.push("/"); 
    } */

    // 5. Handle the error.
    toast({
      title: "Email ou senha incorretos",
      description: "Problema no servido.",
      variant: "destructive",
    });

    setLoading(false);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full md:w-1/2 "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="Nome de usuário" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirme a senha"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4  ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Eu sou...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="elderly" />
                      </FormControl>
                      <FormLabel className="font-normal">Idoso</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="volunteer" />
                      </FormControl>
                      <FormLabel className="font-normal">Voluntário</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("type") === "elderly" && (
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <DatePicker onDateChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="meetingPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual sua preferência de encontros ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="presential">Presencial</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                  <SelectItem value="both">
                    Ambos - (Presencial e Remoto)
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormDescription> </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {(form.watch("meetingPreference") === "presential" ||
          form.watch("meetingPreference") === "both") && (
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="uf"
              render={({ field }) => (
                <FormItem className="w-6/12">
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a sua cidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.sigla}>
                          {state.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Cidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={!form.watch("uf")}>
                          <SelectValue placeholder="Escolha a sua cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.nome}>
                            {city.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>
        <Typography variant={"small"} className="text-center">
          Já tem uma conta conosco ?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Faça login
          </Link>
        </Typography>
      </form>
    </Form>
  );
};
export default RegisterForm;
