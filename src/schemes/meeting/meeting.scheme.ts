import { z } from "zod";
import { userCardScheme } from "../user/userCard.schema";

export const meetingScheme = z.object({
  id: z.number(),
  name: z.string().min(3, {
    message: "O nome deve ter no mínimo 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter no mínimo 10 caracteres",
  }),
  type: z.enum(["in person", "remote", "hybrid"], {
    message: "O tipo de reunião deve ser pessoalmente, remoto ou ambos",
  }),
  date: z.date({
    message: "A data é obrigatória",
  }),
  message: z.string().min(1, {
    message: "A mensagem não deve ser nula",
  }),
  status: z.enum(["pending", "confirm", "canceled"]),
  sender: userCardScheme,
  recipient: userCardScheme,
});

export type MeetingScheme = z.infer<typeof meetingScheme>;
