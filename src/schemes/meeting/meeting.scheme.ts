import { z } from "zod";

export const meetingScheme = z.object({
  type: z.enum(["presential", "remote", "both"]),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  message: z.string(),
  /* After remove this option */
  status: z.enum(["pendent", "confirm", "cancel"]).optional(),
});

export type MeetingScheme = z.infer<typeof meetingScheme>;
