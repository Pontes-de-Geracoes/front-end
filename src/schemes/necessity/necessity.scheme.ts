import { z } from "zod";

export const necessityScheme = z.object({
  id: z.number(),
  name: z.string().min(3, {
    message: "O nome deve ter no mínimo 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter no mínimo 10 caracteres",
  })
});

export type NecessityScheme = z.infer<typeof necessityScheme>;
