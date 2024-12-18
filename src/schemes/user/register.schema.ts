import { z } from "zod";
import { userScheme } from "./user.scheme";

export const registerScheme = userScheme
  .omit({
    id: true,
    photo: true,
    bio: true,
  })
  .extend({
    //Necessities should be an array of numbers (their id)
    necessities: z.array(z.number()).min(6, {
      message: "Selecione pelo menos 6 opções."
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export type RegisterScheme = z.infer<typeof registerScheme>;
