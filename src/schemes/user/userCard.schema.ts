import { z } from "zod";
import { userScheme } from "./user.scheme";

export const userCardScheme = userScheme.omit({
  confirmPassword: true,
  password: true,
});

export type UserCardScheme = z.infer<typeof userCardScheme>;
