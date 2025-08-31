import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../atoms/dialog";
import {
  Form,
} from "../../atoms/form";
import { Typography } from "../../atoms/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../../hooks/use-toast";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/user.context";
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
import { MeetingCardScheme } from "../../../schemes/meeting/meeting-card.scheme";
import { format, parseISO } from "date-fns";
import {
  meetingUpdateScheme,
  MeetingUpdateScheme,
} from "../../../schemes/meeting/meeting.-update.scheme";
import { services } from "../../../services/services";
import Chat from "../../organisms/chat";
import { ChatScheme } from "../../../schemes/chat/chat.scheme";

type MeetingModalProps = Readonly<{
  meeting?: MeetingCardScheme;
  onClose: () => void;
}>;

const MeetingModal = ({ meeting, onClose }: MeetingModalProps) => {
  const { user } = useContext(UserContext);
  const form = useForm<MeetingUpdateScheme>({
    resolver: zodResolver(meetingUpdateScheme),
    defaultValues: {
      name: meeting?.name,
      date: meeting?.date,
      type: meeting?.type,
      description: meeting?.description,
      status: meeting?.status,
      message: " ",
    },
  });

  const onSubmit = async (values: MeetingUpdateScheme) => {

    if (values.status === "canceled") {
      await services.put({
      url: `/meetings/${meeting?.id}`,
      data: values,
    });
      toast({
        title: "Encontro cancelado",
      });
    }

    if (values.status === "confirm") {
      startChat();
      toast({
        title: "Encontro confirmado",
      });
    }
    onClose();
  };

  const who =
    meeting?.sender.id === user?.id ? meeting?.recipient : meeting?.sender;

  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState<ChatScheme | null>(null);

  // Check if chat exists when component mounts
  useEffect(() => {
    const checkExistingChat = async () => {
      if (meeting && meeting.status === "confirm") {
        try {
          const existingChat = await services.get<ChatScheme>({
            url: `/chats/meeting/${meeting.id}`,
          });
          if (existingChat) {
            setChat(existingChat);
          }
        } catch (error) {
          // Chat doesn't exist yet, that's ok
          console.log('No existing chat found');
        }
      }
    };

    checkExistingChat();
  }, [meeting]);

  const startChat = async () => {
    try {
      const response = await services.post<ChatScheme>({
        url: `/chats/meeting/${meeting?.id}`,
        data: {},
      });
      
      if (response && response.id) {
        setChat(response);
        setShowChat(true);
      } else {
        console.error('Chat response does not contain ID:', response);
        toast({
          title: "Erro ao criar chat",
          description: "Não foi possível criar o chat. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to create chat:', error);
      toast({
        title: "Erro ao criar chat",
        description: "Não foi possível criar o chat. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const openExistingChat = () => {
    if (chat) {
      setShowChat(true);
    } else {
      startChat();
    }
  };

  if (showChat && chat) {
    return <Chat chatId={chat.id} onClose={() => setShowChat(false)} />;
  }

  return (
    meeting && (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] h-fit overflow-y-scroll overflow-x-hidden rounded-3xl text-center">
          <DialogHeader className="flex flex-col items-center relative">
            <div className="absolute -top-2 -left-3 flex mb-3 gap-2">
              <Badge className="w-fit">
                {who?.type === "elderly" ? "Idoso" : "Voluntário"}
              </Badge>
              <Badge
                className={`
           ${
             meeting.status === "confirm"
               ? "bg-green-100 text-green-800"
               : meeting.status === "canceled"
               ? "bg-red-100 text-red-800"
               : "bg-yellow-100 text-yellow-800"
           }`}
              >
                {meeting.status == "canceled"
                  ? "Cancelado"
                  : meeting.status == "confirm"
                  ? "Confirmado"
                  : "Pendente"}
              </Badge>
            </div>
            <Avatar className="w-32 h-32">
              <AvatarImage src={who?.photo} alt={who?.name} />
              <AvatarFallback>{who?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <DialogTitle className="mt-4 text-center space-y-5">
              <div className="flex flex-col ">
                <Typography variant={"h3"}>{who?.name}</Typography>
                <Typography variant={"small"} className="text-gray-500">
                  {who?.town} - {who?.state}
                </Typography>
                <div className="grid gap-4 py-4">
                  <Typography className="text-sm text-gray-600">
                    {who?.bio}
                  </Typography>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="text-left flex flex-col gap-2 ">
            <div className="flex justify-between pb-3">
              <Typography variant={"h4"} className="">
                {meeting.name}
              </Typography>
              <div className="text-right">
                <Typography variant={"h4"}>Data</Typography>
                <Typography variant={"small"} className="text-gray-500">
                  {format(meeting.date, "PPP")}
                </Typography>
              </div>
            </div>
            {meeting.status === "pending" &&
              (meeting.recipient.id === user?.id ? (
                /* if is a meeting request to the user */
                /*  It's nice make something cool when accept some meeting */
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* maybe is good make a confirm alert */}
                    <div className="flex justify-center gap-2 py-3 ">
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
                              com {who?.name} será cancelado.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 "
                              onClick={() => {
                                form.setValue(
                                  "message",
                                  `Encontro cancelado por ${user?.name}, ID: ${user?.id}.`
                                );
                                form.setValue("status", "canceled");
                                form.setValue(
                                  "date",
                                  parseISO(
                                    meeting.date instanceof Date
                                      ? meeting.date.toISOString()
                                      : meeting.date
                                  )
                                );
                                form.handleSubmit(onSubmit)();
                              }}
                            >
                              Cancelar mesmo assim
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        type="submit"
                        onClick={() => {
                          form.setValue(
                            "date",
                            parseISO(
                              meeting.date instanceof Date
                                ? meeting.date.toISOString()
                                : meeting.date
                            )
                          );
                          form.setValue("status", "confirm"); 

                          form.handleSubmit(onSubmit)();
                        }}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </form>
                </Form>
              )
              : (
                <>
                  <Typography className="text-center">
                    Ansioso para o encontro ? Aguarde só mais um pouco que{" "}
                    {who?.name} vai confirmar com toda certeza.
                  </Typography>
                  <Button onClick={onClose}>Fechar</Button>
                </>
              ))}
            {meeting.status === "confirm" && (
              <div className="flex flex-col gap-2 text-center">
                <Typography>
                  Encontro confirmado! {chat ? 'Continue' : 'Comece a'} conversar com {who?.name}.
                </Typography>
                <Button onClick={openExistingChat}>
                  {chat ? 'Abrir Chat' : 'Iniciar Chat'}
                </Button>
                <Button onClick={onClose} variant="outline">Fechar</Button>
              </div>
            )}
            {meeting.status === "canceled" && (
              <>
                <Typography className="text-center">
                  Infelizmente {who?.name} cancelou o encontro, todo mundo tem
                  seus dias talvez em outro momento.
                </Typography>
                <Button onClick={onClose}>Fechar</Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default MeetingModal;
