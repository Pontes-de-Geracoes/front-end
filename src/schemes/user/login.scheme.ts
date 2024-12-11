import { z } from "zod";
import { userScheme } from "./user.scheme";

export const loginSchema = userScheme.omit({
  age: true,
  meetingPreference: true,
  town: true,
  uf: true,
  photo: true,
  type: true,
  confirmPassword: true,
  id: true,
  username: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;
