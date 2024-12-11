import { z } from "zod";

export const userScheme = z.object({
  id: z.number(),
  username: z.string().min(3, {
    message: "O nome é necessário e deve ter no mínimo 3 caracteres.",
  }),
  age: z.number().min(18, {
    message: "Você deve ter no mínimo 18 anos para se cadastrar.",
  }),
  photo: z
    .string()
    .trim()
    .url("Invalid image format. The image must be a URL."),
  email: z
    .string()
    .min(1, {
      message: "O email é necessário.",
    })
    .email({
      message: "Por favor entre um email válido.",
    }),
  type: z.enum(["elderly", "volunteer"], {
    message: "Por favor selecione um tipo de usuário.",
  }),
  meetingPreference: z.enum(["presential", "remote", "both"], {
    message: "Por favor selecione uma preferência de reunião.",
  }),
  uf: z.string().min(1, {
    message: "Por favor selecione o seu estado.",
  }),
  town: z.string().min(1, {
    message: "Por favor entre a cidade onde você mora.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Sua senha deve ter no mínimo 8 caracteres.",
    })
    .max(32, {
      message: "Sua senha deve ter no máximo 32 caracteres.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      {
        message:
          "Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      }
    ),
  confirmPassword: z.string(),
});

export type UserSchema = z.infer<typeof userScheme>;
