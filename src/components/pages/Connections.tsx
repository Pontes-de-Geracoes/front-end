import { Heart } from "lucide-react";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import { UserCardScheme } from "../../schemes/user/userCard.schema";
import { users } from "../../utils/fake-users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../atoms/form";
import { fetchCities, fetchStates } from "../../utils/ibge";
import { Button } from "../atoms/button";
import UserCardList from "../molecules/userCard/userCardList";

const filterScheme = z.object({
  type: z.string(),
  uf: z.string(),
  town: z.string(),
  meetingPreference: z.string(),
});

type filterScheme = z.infer<typeof filterScheme>;

const Connections = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  //const [selectedUser, setSelectedUser] = useState(null);

  //------------------------------------------------------------

  const [states, setStates] = useState<
    { id: number; sigla: string; nome: string }[]
  >([]);
  const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);

  const form = useForm<filterScheme>({
    resolver: zodResolver(filterScheme),
    defaultValues: {
      type: "",
      uf: "",
      town: "",
      meetingPreference: "",
    },
  });

  useEffect(() => {
    (async () => {
      const states = await fetchStates();
      setStates(states);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cities = await fetchCities(form.getValues("uf"));
      setCities(cities);
    })();
  }, [form.watch("uf")]);

  const formValues = form.watch();
  useEffect(() => {
    const filtered = users.filter((user: UserCardScheme) => {
      const type =
        formValues.type === "" ||
        formValues.type === "all" ||
        user.type === formValues.type;
      const meetingPreference =
        formValues.meetingPreference === "" ||
        formValues.meetingPreference === "all" ||
        user.meetingPreference === formValues.meetingPreference;
      const uf =
        formValues.uf === "" || user.uf === formValues.uf.toUpperCase();
      const town = formValues.town === "" || user.town === formValues.town;
      return type && meetingPreference && uf && town;
    });

    setFilteredUsers(filtered);
  }, [formValues]);

  return (
    <Container
      variant={"main"}
      as="main"
      className="bg-gradient-to-tr from-60% via-primary/50 from-white dark:from-stone-950 dark:bg-gradient-to-tr dark:from-60% dark:via-primary/50"
    >
      <Container variant={"firstSection"} className="flex flex-col py-10 gap-2">
        {/* Title */}
        <Typography variant={"h1"} as="h1" className="">
          Encontre seu novo melhor amigo.{" "}
          <Heart className="inline fill-primary border-primary" size={60} />
        </Typography>
        <div className=" flex w-full flex-row ">
          {/* TODO: It's good put the form in the component later */}
          <Form {...form}>
            <form className="flex flex-col gap-2 w-full md:flex-row">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo " className="w-full" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="elderly">Idosos</SelectItem>
                        <SelectItem value="volunteer">Voluntários</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/*    */}
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
                    <FormItem className="w-full ">
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
                          {/*    */}
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
              <FormField
                control={form.control}
                name="meetingPreference"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de encontro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="presential">Presencial</SelectItem>
                        <SelectItem value="remote">Remoto</SelectItem>
                        <SelectItem value="all">
                          Ambos - (Presencial e Remoto)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={() => form.reset()}>Resetar filtros</Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-wrap gap-10 justify-center mt-10 ">
          {filteredUsers.map((user: UserCardScheme) => (
            <UserCardList key={user.id} {...user} />
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default Connections;
