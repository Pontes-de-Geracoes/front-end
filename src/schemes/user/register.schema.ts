import { z } from "zod";

export const registerSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
