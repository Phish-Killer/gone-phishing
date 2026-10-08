import { z } from "zod";

export const ParseEmail = z.object({
  email: z.string().trim().email("Must be a valid email address"),
});

export type ParseEmailInput = z.infer<typeof ParseEmail>;