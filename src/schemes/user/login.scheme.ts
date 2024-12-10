import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor entre um email válido.",
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
});

export type LoginSchema = z.infer<typeof loginSchema>;
