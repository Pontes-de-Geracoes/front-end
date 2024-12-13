import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingCreateScheme = meetingScheme.omit({
  id: true,
});

export type MeetingCreateScheme = z.infer<typeof meetingCreateScheme>;
