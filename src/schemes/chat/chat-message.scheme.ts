import { z } from "zod";
import { userCardScheme } from "../user/userCard.schema";

export const chatMessageScheme = z.object({
  id: z.number(),
  content: z.string(),
  sender: userCardScheme,
  sentAt: z.string(),
});

export type ChatMessageScheme = z.infer<typeof chatMessageScheme>;