/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useContext, useEffect, useState } from "react";
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
import { UserContext, UserContextSchema } from "@/contexts/user.context";
import { useFieldArray } from "react-hook-form";
import { auth } from "../../services/auth.service";
import { services } from "../../services/services";
import { NecessityScheme } from "../../schemes/necessity/necessity.scheme";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);
  const [states, setStates] = useState<
    { id: number; sigla: string; nome: string }[]
  >([]);
  const [necessities, setNecessities] = useState<
    { id: number; name: string; description: string }[]
  >([]);
  const { setIsAuthenticated, update } = useContext(
    UserContext
  ) as UserContextSchema;
  const form = useForm<RegisterScheme>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      necessities: [],
    },
  });
  const userType = form.watch("type");

  useEffect(() => {
    (async () => {
      // Fetch states
      const states = await fetchStates();
      setStates(states || []);

      // Fetch necessities
      const necessitiesFetch = await services.get<NecessityScheme[]>({
        url: "/necessities",
        withCredentials: false,
      });
      setNecessities(necessitiesFetch || []);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cities = await fetchCities(form.getValues("state"));
      setCities(cities);
    })();
  }, [form.watch("state")]);

  async function onSubmit(values: RegisterScheme) {
    setLoading(true);
    const savedUser = await auth.register(values);
    setLoading(false);
    if (!savedUser)
      return toast({
        title: "Não foi possível realizar o cadastro",
        variant: "destructive",
      });

    setIsAuthenticated(true);
    update(savedUser);
    window.location.href = "/";
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "necessities",
  });

  const handleNecessitySelection = (selectedNecessity: any) => {
    // Check if necessity already exists
    const exists = fields.some((field) => field.id === selectedNecessity.id);

    if (!exists) append(selectedNecessity);
  };

  const handleNecessityRemoval = (necessityToRemove: any) => {
    const index = fields.findIndex(
      (field) => field.id === necessityToRemove.id
    );

    if (index !== -1) remove(index);
  };
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
                  <SelectItem value="in person">Presencial</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                  <SelectItem value="hybrid">
                    Híbrido - (Presencial e Remoto)
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

                {necessities && necessities.length > 0 ? (
                  <Select
                    onValueChange={(value: string) => {
                      const selectedNecessity = necessities.find(
                        (necessity) => necessity.name === value
                      );
                      if (selectedNecessity) {
                        handleNecessitySelection(selectedNecessity);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione suas necessidades" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {necessities.map((necessity) => (
                        <SelectItem key={necessity.id} value={necessity.name}>
                          {necessity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Não foi possível carregar as necessidades
                  </span>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex flex-wrap gap-2">
          {fields.map((necessity) => (
            <Badge
              key={necessity.id}
              className="bg-primary/80 cursor-pointer hover:bg-primary/90"
              onClick={() => handleNecessityRemoval(necessity)}
            >
              {necessity.name}
              <X size={15} className="ml-2" />
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
