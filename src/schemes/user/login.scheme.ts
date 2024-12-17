import { z } from "zod";
import { userScheme } from "./user.scheme";

export const loginSchema = userScheme.omit({
  age: true,
  meetingPreference: true,
  town: true,
  state: true,
  photo: true,
  type: true,
  confirmPassword: true,
  id: true,
  name: true,
  bio: true,
  necessities: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;
