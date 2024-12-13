import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingCardScheme = meetingScheme.omit({});

export type MeetingCardScheme = z.infer<typeof meetingCardScheme>;
