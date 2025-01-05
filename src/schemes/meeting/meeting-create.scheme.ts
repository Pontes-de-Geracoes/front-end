import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingCreateScheme = meetingScheme
  .omit({
    id: true,
  })
  .extend({
    sender: z.object({
      id: z.number(),
    }),
    recipient: z.object({
      id: z.number(),
    }),
  });

export type MeetingCreateScheme = z.infer<typeof meetingCreateScheme>;
