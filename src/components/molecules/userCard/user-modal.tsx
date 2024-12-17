import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Textarea } from "@/components/atoms/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import { UserCardScheme } from "../../../schemes/user/userCard.schema";
import { Typography } from "../../atoms/typography";
import { Badge } from "../../atoms/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../atoms/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/popover";
import { cn } from "../../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../atoms/calendar";
type UserModalProps = Readonly<{
  user?: UserCardScheme;
  onClose: () => void;
}>;

import { format } from "date-fns";
import { toast } from "../../../hooks/use-toast";

import { Input } from "../../atoms/input";
import {
  meetingCreateScheme,
  MeetingCreateScheme,
} from "../../../schemes/meeting/meeting-create.scheme";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/user.context";
import { meetingsServices } from "../../../services/meetings.services";

export function UserModal({ user, onClose }: UserModalProps) {
  const { user: userInfo } = useContext(UserContext);
  const form = useForm<MeetingCreateScheme>({
    resolver: zodResolver(meetingCreateScheme),
    defaultValues: {
      name: "",
      description: "",
      message: "",
      status: "pending",
      sender: userInfo.id,
      recipient: user?.id,
    },
  });
  form.setValue("sender", userInfo.id);
  form.setValue("recipient", user?.id as number);

  /* I want check if has some error in the form if the form change with reack hook forms  */
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (values: MeetingCreateScheme) => {
    console.log(values);

    const newMeeting = await meetingsServices.create(values);

    if (!newMeeting) {
      return toast({
        title: "Erro ao solicitar encontro",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }

    /*   toast({
      title: "Encontro solicitado",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(newMeeting, null, 2)}
          </code>
        </pre>
      ),
    }); */

    toast({
      title: "Encontro solicitado com sucesso.",
    });
    onClose();
  };

  return (
    user && (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] h-[95%] overflow-y-scroll overflow-x-hidden rounded-3xl text-center">
          <DialogHeader className="flex flex-col items-center relative">
            <div className="absolute -top-2 -left-3 flex  gap-2">
              <Badge className="">
                {user?.type === "elderly" ? "Idoso" : "Voluntário"}
              </Badge>
              <Badge>
                {user?.meetingPreference === "in person"
                  ? "Presencial"
                  : user?.meetingPreference === "hybrid"
                  ? "Híbrido"
                  : "Remoto"}
              </Badge>
            </div>
            <Avatar className="w-32 h-32">
              <AvatarImage src={user?.photo} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle className="mt-4 text-center space-y-5">
              <div className="flex flex-col ">
                <Typography variant={"h3"}>{user?.name}</Typography>
                <Typography variant={"small"} className="text-gray-500">
                  {user?.town} - {user?.state}
                </Typography>
              </div>
              <div className="relative flex overflow-x-hidden max-w-[370px]">
                {/* TODO: Edit this later for the user interest */}
                <div className="animate-marquee whitespace-nowrap space-x-2 ">
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap space-x-2 ">
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                  <Badge className="bg-primary/80">Caminhar</Badge>
                  <Badge className="bg-primary/80">Cantar</Badge>
                  <Badge className="bg-primary/80">Dançar</Badge>
                  <Badge className="bg-primary/80">Tecnologia</Badge>
                </div>
              </div>
              <div className="grid gap-4 py-4">
                <Typography className="text-sm text-gray-600">
                  {user?.bio}
                </Typography>
              </div>
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-left w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dê um titulo para esse encontro"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descrição do encontro"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua preferência de encontros ?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {user?.meetingPreference === "hybrid" ? (
                          <SelectItem value="hybrid">
                            Sem preferência
                          </SelectItem>
                        ) : user?.meetingPreference === "in person" ? (
                          <SelectItem value="in person">Presencial</SelectItem>
                        ) : user?.meetingPreference === "remote" ? (
                          <SelectItem value="remote">Remoto</SelectItem>
                        ) : (
                          <SelectItem value="hybrid">
                            Sem preferências
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormLabel>Data de encontro</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "min-w-[240px] w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <Textarea
                      className="max-h-36"
                      placeholder="Escreva uma mensagem"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant={"outline"} onClick={onClose} className="">
                  Cancelar
                </Button>
                <Button type="submit">Enviar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  );
}
