import { useForm } from "react-hook-form";
import { Meeting } from "../../../mocks/fake-meetings";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../atoms/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../atoms/form";
import { Select } from "../../atoms/select";
import { Typography } from "../../atoms/typography";
import {
  meetingScheme,
  MeetingScheme,
} from "../../../schemes/meeting/meeting.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../../hooks/use-toast";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { Textarea } from "../../atoms/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../atoms/alert-dialog";

type MeetingModalProps = Readonly<{
  meeting?: Meeting;
  onClose: () => void;
}>;

const MeetingModal = ({ meeting, onClose }: MeetingModalProps) => {
  const { user } = useContext(UserContext);
  const form = useForm<MeetingScheme>({
    resolver: zodResolver(meetingScheme),
    defaultValues: {
      date: meeting?.dateRange,
      type: meeting?.type,
      status: meeting?.status,
      message: "",
    },
  });

  const onSubmit = (values: MeetingScheme) => {
    console.log(values);

    toast({
      title: "Encontro confirmado",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onClose();
  };

  const who =
    meeting?.sender.id === user?.id ? meeting?.recipient : meeting?.sender;

  return (
    meeting && (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl text-center">
          <DialogHeader className="flex flex-col items-center relative">
            <div className="absolute -top-2 -left-3 flex mb-3 gap-2">
              <Badge className="">
                {who?.type === "elderly" ? "Idoso" : "Voluntário"}
              </Badge>
              <Badge
                className={`
           ${
             meeting.status === "confirm"
               ? "bg-green-100 text-green-800"
               : meeting.status === "cancel"
               ? "bg-red-100 text-red-800"
               : "bg-yellow-100 text-yellow-800"
           }`}
              >
                {meeting.status == "cancel"
                  ? "Cancelado"
                  : meeting.status == "confirm"
                  ? "Confirmado"
                  : "Pendente"}
              </Badge>
            </div>
            <Avatar className="w-32 h-32">
              <AvatarImage src={who?.photo} alt={who?.username} />
              <AvatarFallback>{who?.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle className="mt-4 text-center space-y-5">
              <div className="flex flex-col ">
                <Typography variant={"h3"}>{who?.username}</Typography>
                <Typography variant={"small"} className="text-gray-500">
                  {who?.town} - {who?.uf}
                </Typography>
                <div className="grid gap-4 py-4">
                  <Typography className="text-sm text-gray-600">
                    {who?.bio}
                  </Typography>
                </div>
              </div>
              <Typography>{meeting.message}</Typography>
            </DialogTitle>
          </DialogHeader>

          <div className="text-left flex flex-col gap-2">
            <div className="flex justify-between">
              <Typography variant={"h4"} className="">
                {meeting.name}
              </Typography>
              <div className="text-right">
                <Typography variant={"h4"}>Data</Typography>
                <Typography variant={"small"} className="text-gray-500">
                  {meeting.dateRange.toDateString()}
                </Typography>
              </div>
            </div>
            {meeting.status === "pendent" &&
              (meeting.recipient.id === user?.id ? (
                /* if is a meeting request to the user */
                /*  It's nice make something cool when accept some meeting */
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="py-4">
                          <FormLabel>
                            Envier uma mensagem com seu contato para{" "}
                            {meeting.sender.username} para prosseguírem com o
                            encontro.
                          </FormLabel>
                          <FormControl>
                            <Textarea placeholder="Mensagem" {...field} />
                          </FormControl>
                          <FormDescription>
                            Seria legal vocês compartilharem WhatsApp levando em
                            consideração o publico alvo da plataforma.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* maybe is good make a confirm alert */}
                    <div className="flex justify-end gap-2 py-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Cancelar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita, e seu encontro
                              com {who?.username} será cancelado.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 "
                              onClick={() => {
                                form.setValue(
                                  "message",
                                  `Encontro cancelado por ${user?.username}, ID: ${user?.id}.`
                                );
                                form.setValue("status", "cancel");
                                form.handleSubmit(onSubmit)();
                              }}
                            >
                              Cancelar mesmo assim
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button type="submit">Confirmar</Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <>
                  <Typography className="text">
                    Ansioso para o encontro ? Aguarde só mais um pouco que{" "}
                    {who?.username} vai confirmar com toda certeza.
                  </Typography>
                  <Button onClick={onClose}>fechar</Button>
                </>
              ))}
            {meeting.status === "confirm" && (
              <div className="flex flex-col gap-2">
                <Typography>
                  {who?.username} confirmou o encontro, não esqueça de
                  comparecer. Segue mais informações sobre o encontro abaixo:
                </Typography>
                <Typography>{meeting.message}</Typography>
                <Button onClick={onClose}>Fechar</Button>
              </div>
            )}
            {meeting.status === "cancel" && (
              <>
                <Typography className="text-center">
                  Infelizmente {who?.username} cancelou o encontro, todo mundo
                  tem seus dias talvez em outro momento.
                </Typography>
                <Button onClick={onClose}>fechar</Button>
              </>
            )}
          </div>
          {/* Types of model footer */}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default MeetingModal;
