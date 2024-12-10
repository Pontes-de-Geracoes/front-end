import { z } from "zod";
import { userScheme } from "./user.scheme";

export const userContextScheme = userScheme.omit({
  confirmPassword: true,
  password: true,
});

export type UserInfoScheme = z.infer<typeof userContextScheme>;
