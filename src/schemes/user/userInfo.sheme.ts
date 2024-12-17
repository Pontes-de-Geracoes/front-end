import { z } from "zod";
import { userScheme } from "./user.scheme";
import { meetingScheme } from "../meeting/meeting.scheme";

export const userInfoScheme = userScheme
  .omit({
    confirmPassword: true,
    password: true,
    necessities: true,
  })
  .extend({
    meetings: z.array(meetingScheme).optional(),
  });

export type UserInfoScheme = z.infer<typeof userInfoScheme>;
