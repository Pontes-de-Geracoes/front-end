import { z } from "zod";
import { meetingScheme } from "./meeting.scheme";

export const meetingInfoScheme = meetingScheme.omit({});

export type MeetingInfoScheme = z.infer<typeof meetingInfoScheme>;
