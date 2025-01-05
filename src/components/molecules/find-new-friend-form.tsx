import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Button } from "../atoms/button";
import { Checkbox } from "../atoms/checkbox";
import { fetchCities, fetchStates } from "../../utils/ibge";

const filterScheme = z.object({
  type: z.string(),
  uf: z.string(),
  town: z.string(),
  meetingPreference: z.enum(["in person", "remote", "hybrid", "all", ""]),
  sortByMatches: z.boolean().default(false),
});

export type FilterScheme = z.infer<typeof filterScheme>;

interface FindNewFriendFormProps {
  isAuthenticated: boolean;
  onFormChange: (values: FilterScheme) => void;
}

export const FindNewFriendForm = ({
  isAuthenticated,
  onFormChange,
}: FindNewFriendFormProps) => {
  const [states, setStates] = useState<
    { id: number; sigla: string; nome: string }[]
  >([]);
  const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);

  const form = useForm<FilterScheme>({
    resolver: zodResolver(filterScheme),
    defaultValues: {
      type: "",
      uf: "",
      town: "",
      meetingPreference: "",
      sortByMatches: false,
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    onFormChange({
      type: formValues.type || "",
      uf: formValues.uf || "",
      town: formValues.town || "",
      meetingPreference: formValues.meetingPreference || "",
      sortByMatches: formValues.sortByMatches || false,
    });
  }, [formValues, onFormChange]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("uf")]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 w-full md:flex-row">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormLabel>Ordenar por compatibilidade</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-10 md:w-6 w-20 rounded border-gray-300"
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
  );
};
