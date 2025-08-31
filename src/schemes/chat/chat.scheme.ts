import { z } from "zod";
import { userCardScheme } from "../user/userCard.schema";

export const chatScheme = z.object({
  id: z.number(),
  user1: userCardScheme,
  user2: userCardScheme,
  meeting: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    date: z.string().transform((str) => new Date(str)),
    message: z.string(),
    status: z.string(),
  }),
  createdAt: z.string().transform((str) => new Date(str)),
});

export type ChatScheme = z.infer<typeof chatScheme>;