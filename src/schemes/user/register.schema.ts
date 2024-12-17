import { z } from "zod";
import { userScheme } from "./user.scheme";

export const registerScheme = userScheme
  .omit({
    id: true,
    photo: true,
    bio: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export type RegisterScheme = z.infer<typeof registerScheme>;
