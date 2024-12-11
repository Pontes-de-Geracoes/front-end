import { z } from "zod";
import { userScheme } from "./user.scheme";

export const registerSchema = userScheme
  .omit({
    id: true,
    photo: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });
/* case we want check the town and uf if the use put something diff of remote */
/*   .refine(
    (data) => {
      if (data.meetingPreference !== "remote") {
        return data.uf && data.town;
      }
      return true;
    },
    {
      message:
        "Por favor selecione o seu estado e entre a cidade onde você mora.",
      path: ["uf", "town"], // This will show the error on both fields
    }
  ); */

export type RegisterSchema = z.infer<typeof registerSchema>;
