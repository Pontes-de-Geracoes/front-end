import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../atoms/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const profileMeetingsForm = z.object({
  name: z.string(),
  friendName: z.string(),
  sendByMe: z.boolean(),
  date: z.date(),
  status: z.enum(["pending", "confirm", "canceled", "all"]).optional(),
});

export type ProfileMeetingsForm = z.infer<typeof profileMeetingsForm>;

interface MeetingFormProps {
  onFormChange: (values: ProfileMeetingsForm) => void;
}

const MeetingForm = ({ onFormChange }: MeetingFormProps) => {
  const form = useForm<ProfileMeetingsForm>({
    resolver: zodResolver(profileMeetingsForm),
    defaultValues: {
      name: "",
      friendName: "",
      status: undefined,
      date: new Date(),
    },
  });

  const formValues = useWatch({
    control: form.control,
    defaultValue: {
      name: "",
      friendName: "",
      sendByMe: false,
      date: new Date(),
      status: "all",
    },
  }) as ProfileMeetingsForm;
  useEffect(() => onFormChange(formValues), [formValues, onFormChange]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 w-full md:flex-row">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Nome do evento" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="friendName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Nome do amigo" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full ">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" className="w-full" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirm">Confirmado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => form.reset()} type="button">
          Reseta filtros
        </Button>
      </form>
    </Form>
  );
};

export default MeetingForm;
