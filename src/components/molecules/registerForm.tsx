import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "../atoms/input";
import { toast } from "../../hooks/use-toast";
import { LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Typography } from "../atoms/typography";
import {
  registerScheme,
  RegisterScheme,
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
import { fetchCities, fetchStates } from "../../utils/ibge";
import { Badge } from "../atoms/badge";
import { necessityServices } from "@/services/necessities.services";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<
    { id: number; sigla: string; nome: string }[]
  >([]);
  const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);
  const [selectedNecessities, setSelectedNecessities] = useState<string[]>([]);
  const [necessities, setNecessities] = useState<{id:number, name:string, description:string}[]>([]);

  const form = useForm<RegisterScheme>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  //this method listens to chenges in the type field and re-renders the component
  const userType = form.watch("type");

  useEffect(() => {
    (async () => {
      const states = await fetchStates();
      setStates(states);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cities = await fetchCities(form.getValues("state"));
      setCities(cities);
    })();
  }, [form.watch("state")]);

  useEffect(() => {
    (async () => {
      const necessitiesFetch = await necessityServices.getAll();
      setNecessities(necessitiesFetch);
    })();
    console.log(necessities);
  }, []);

  const isListOfStrings = (value: any): boolean => {
    //verify if a value is an array of string
    return Array.isArray(value) && value.every((item) => typeof item === "string");
  };

  const handleNecessitySelection = (necessity: string) => {
    setSelectedNecessities((prevNecessities) => [
      ...prevNecessities,
      necessity,
    ]);
  };

  const handleNecessityRemoval = (necessity: string) => {
    //filtering only the necessities that are different from the clicked one
    setSelectedNecessities((prevNecessities) =>
      prevNecessities.filter((item) => item !== necessity)
    );
  };

  function onSubmit(values: RegisterScheme) {
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
        className="space-y-3 w-full md:w-1/2"
      >
        <FormField
          control={form.control}
          name="name"
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
        <div className="flex flex-col sm:flex-row gap-4  ">
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
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl className="">
                  <DatePicker onDateChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full md:w-6/12">
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
                      <SelectTrigger disabled={!form.watch("state")}>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {userType && (
          <FormField
            control={form.control}
            name="necessities"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>
                  {form.getValues("type") === "elderly"
                    ? "Quais são suas necessidades ?"
                    : "Quais são suas habilidades ?"}
                </FormLabel>
                
                {//verifying if was possible to get the necessities form the database
                necessities && necessities.length > 0 ?
                  (//if was possible, show them in a dropdown menu
                  <Select
                    onValueChange={(value: string) => {
                      const selectedNecessity = necessities.find(
                        (necessity) => necessity.name === value
                      );
                      if (selectedNecessity) {
                        handleNecessitySelection(selectedNecessity.name);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Quais são suas necessidades?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {necessities.map((necessity) => (
                          <SelectItem key={necessity.id} value={necessity.name}>
                            {necessity.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>)
                :
                  //if it wasnt possible to fetch the necessities, shw message on screen
                  (<span><br/>Não foi possível buscar as necessidades</span>)
                }
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="">
          {selectedNecessities.map((necessity, id) => (
            <Badge
              key={id}
              className="bg-primary/80 m-1 cursor-pointer"
              onClick={() => handleNecessityRemoval(necessity)}
            >
              {necessity}
              <X size={15} className="m-1" />
            </Badge>
          ))}
        </div>

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
