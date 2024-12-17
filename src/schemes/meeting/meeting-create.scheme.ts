import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingCreateScheme = meetingScheme
  .omit({
    id: true,
  })
  .extend({
    sender: z.number(),
    recipient: z.number(),
  });

export type MeetingCreateScheme = z.infer<typeof meetingCreateScheme>;
