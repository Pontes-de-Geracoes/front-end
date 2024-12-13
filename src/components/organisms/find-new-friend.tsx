import { UserCardScheme } from "../../schemes/user/userCard.schema";
import { users } from "../../mocks/fake-users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { useEffect, useState, useMemo } from "react";
import { useWatch, useForm } from "react-hook-form";
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
import UserCard from "../molecules/userCard/user-card";
import { UserModal } from "../molecules/userCard/user-modal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../atoms/pagination";

const filterScheme = z.object({
  type: z.string(),
  uf: z.string(),
  town: z.string(),
  meetingPreference: z.string(),
});

type filterScheme = z.infer<typeof filterScheme>;

const FindNewFriend = () => {
  /* Users states */
  const [filteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState<null | UserCardScheme>(null);

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);

  /* Form states */
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

  const formValues = useWatch({
    control: form.control,
  });

  // Memoize filtered results
  const currentUsers = useMemo(() => {
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
        formValues.uf === "" || user.uf === formValues.uf?.toUpperCase();
      const town = formValues.town === "" || user.town === formValues.town;

      return type && meetingPreference && uf && town;
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filtered.slice(indexOfFirstUser, indexOfLastUser);
  }, [formValues, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  return (
    <>
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
          <Button onClick={() => form.reset()} type="button">
            Resetar filtros
          </Button>
        </form>
      </Form>
      <div className="flex flex-wrap gap-10 justify-center mt-10 ">
        {currentUsers.map((user: UserCardScheme) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </>
  );
};

export default FindNewFriend;
