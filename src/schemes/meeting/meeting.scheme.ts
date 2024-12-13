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
  type: z.enum(["presential", "remote", "both"]),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
  message: z.string(),
  status: z.enum(["pendent", "confirm", "cancel"]),
  sender: userCardScheme,
  recipient: userCardScheme,
});

export type MeetingScheme = z.infer<typeof meetingScheme>;
