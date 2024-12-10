import { z } from "zod";

export const userScheme = z.object({
  id: z.number(),
  username: z.string().min(1, "username is required"),
  email: z
    .string()
    .min(1, "The email is required.")
    .email("Invalid email format."),
  type: z.string(),
  photo: z
    .string()
    .trim()
    .url("Invalid image format. The image must be a URL."),
  password: z
    .string()
    .min(8, "The password must have at least 8 characters")
    .max(16, "The password must have at most 16 characters"),
  confirmPassword: z.string(),
});

export type UserSchema = z.infer<typeof userScheme>;
