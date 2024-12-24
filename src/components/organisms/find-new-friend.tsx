import { UserCardScheme } from "../../schemes/user/userCard.schema";
//import { users } from "../../mocks/fake-users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { useEffect, useState, useMemo, useContext, useCallback } from "react";
import { useWatch, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { UserContext } from "../../contexts/user.context";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../atoms/dialog";
import { Badge } from "../atoms/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Typography } from "../atoms/typography";
import { NavLink } from "react-router";
import Container from "../atoms/container";
import Logo from "../atoms/logo";
import { Checkbox } from "../atoms/checkbox";
import { services } from "../../services/services";

const filterScheme = z.object({
  type: z.string(),
  uf: z.string(),
  town: z.string(),
  meetingPreference: z.enum(["in person", "remote", "hybrid", "all", ""]),
  sortByMatches: z.boolean().default(false), // Add th
});

type filterScheme = z.infer<typeof filterScheme>;

const FindNewFriend = () => {
  const { user: userInfo, isAuthenticated } = useContext(UserContext);

  /* Users states */
  const [users, setUsers] = useState<UserCardScheme[]>([] as UserCardScheme[]);
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

  useEffect(() => {
    (async () => {
      let usersFetch = await services.get<UserCardScheme[]>({
        url: "/users",
        withCredentials: false,
      });

      if (usersFetch) {
        if (isAuthenticated)
          usersFetch = usersFetch.filter((user) => user.id !== userInfo?.id);

        usersFetch = usersFetch.sort(() => Math.random() - 0.5);
        setUsers(usersFetch);
      }
    })();
  }, [isAuthenticated, userInfo]);

  const formValues = useWatch({
    control: form.control,
  });

  // Memoize filtered results
  const calculateNecessityMatches = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (userNecessities: any[]) => {
      if (!userInfo?.necessities || !userNecessities) return 0;

      return userInfo.necessities.filter((userNeed) =>
        userNecessities.some((necessity) => necessity.id === userNeed.id)
      ).length;
    },
    [userInfo?.necessities]
  );

  const { paginatedUsers, totalPages } = useMemo(() => {
    // Create a new array to avoid mutation
    let filtered = [...users].filter((user: UserCardScheme) => {
      const type =
        formValues.type === "" ||
        formValues.type === "all" ||
        user.type === formValues.type;

      const meetingPreference =
        formValues.meetingPreference === "" ||
        formValues.meetingPreference === "all" ||
        user.meetingPreference === formValues.meetingPreference;

      const uf =
        formValues.uf === "" ||
        formValues.uf === "all" ||
        user.state === formValues.uf;

      const town =
        formValues.town === "" ||
        formValues.town === "all" ||
        user.town === formValues.town;

      return type && meetingPreference && uf && town;
    });

    // Sort by matches if enabled
    if (formValues.sortByMatches) {
      filtered = filtered.sort((a, b) => {
        const matchesA = calculateNecessityMatches(a.necessities);
        const matchesB = calculateNecessityMatches(b.necessities);
        if (matchesA === matchesB) {
          // Secondary sort by name if matches are equal
          return a.name.localeCompare(b.name);
        }
        return matchesB - matchesA;
      });
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginatedUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filtered.length / usersPerPage);

    return {
      paginatedUsers,
      totalPages,
    };
  }, [users, formValues, currentPage, usersPerPage, calculateNecessityMatches]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    formValues.sortByMatches,
    formValues.type,
    formValues.meetingPreference,
    formValues.uf,
    formValues.town,
  ]);

  if (users.length === 0) {
    return (
      <Container variant="section" className="flex justify-center items-center">
        <Logo size={128} className="animate-bounce" />
      </Container>
    );
  }
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
                    <SelectItem value="in person">Presencial</SelectItem>
                    <SelectItem value="remote">Remoto</SelectItem>
                    <SelectItem value="hybrid">
                      Híbrido - (Presencial e Remoto)
                    </SelectItem>
                    <SelectItem value="all">Todos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {isAuthenticated && (
            <FormField
              control={form.control}
              name="sortByMatches"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 justify-center">
                  <FormLabel className="text-sm font-medium ">
                    Ordenar por compatibilidade
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-10 md:w-6 w-20 rounded border-gray-300 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <Button onClick={() => form.reset()} type="button">
            Resetar filtros
          </Button>
        </form>
      </Form>
      <div className="flex flex-wrap gap-10 justify-center mt-10 ">
        {paginatedUsers.map((user: UserCardScheme) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}

        {selectedUser && isAuthenticated && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {!isAuthenticated && selectedUser && (
          <Dialog open={true} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="sm:max-w-[600px] h-[90%] text-black   rounded-3xl text-center">
              <DialogHeader className="flex flex-col items-center relative">
                <div className="absolute -top-2 -left-3 flex  gap-2">
                  <Badge className="">
                    {selectedUser?.type === "elderly" ? "Idoso" : "Voluntário"}
                  </Badge>
                  <Badge>
                    {selectedUser?.meetingPreference === "in person"
                      ? "Presencial"
                      : selectedUser?.meetingPreference === "hybrid"
                      ? "Híbrido"
                      : "Remoto"}
                  </Badge>
                </div>
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={selectedUser?.photo}
                    alt={selectedUser?.name}
                  />
                  <AvatarFallback>
                    {selectedUser?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <DialogTitle className="mt-4 text-center space-y-5">
                  <div className="flex flex-col ">
                    <Typography variant={"h3"}>{selectedUser?.name}</Typography>
                    <Typography variant={"small"} className="text-gray-500">
                      {selectedUser?.town} - {selectedUser?.state}
                    </Typography>
                  </div>
                  <div className="relative flex overflow-x-hidden max-w-[240px] sm:max-w-[390px] md:max-w-[500px] ">
                    <div className="animate-marquee whitespace-nowrap space-x-2 ">
                      {selectedUser.necessities.map((necessity) => (
                        <Badge
                          key={necessity.id}
                          className="bg-primary/80 w-fit h-fit"
                        >
                          {necessity.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap space-x-2 ">
                      {selectedUser.necessities.map((necessity) => (
                        <Badge
                          key={necessity.id}
                          className="bg-primary/80 w-fit h-fit"
                        >
                          {necessity.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 py-4">
                    <Typography className="text-sm text-gray-600">
                      {selectedUser?.bio}
                    </Typography>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="">
                <Typography variant={"h3"}>
                  Se junte em nossa comunidade para ser conectar com outras
                  gerações.
                </Typography>
              </div>
              <DialogFooter>
                <div className="flex gap-4 w-full justify-center">
                  <NavLink
                    className="w-full"
                    onClick={() => setSelectedUser(null)}
                    to={"/login"}
                  >
                    <Button className="w-full">Faça login</Button>
                  </NavLink>
                  <NavLink
                    className="w-full"
                    onClick={() => setSelectedUser(null)}
                    to={"/register"}
                  >
                    <Button className="w-full" variant="outline">
                      Cadastrar
                    </Button>
                  </NavLink>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default FindNewFriend;
