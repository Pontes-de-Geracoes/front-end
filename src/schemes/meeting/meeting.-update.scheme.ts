import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingUpdateScheme = meetingScheme.omit({
  id: true,
  sender: true,
  recipient: true,
});

export type MeetingUpdateScheme = z.infer<typeof meetingUpdateScheme>;
