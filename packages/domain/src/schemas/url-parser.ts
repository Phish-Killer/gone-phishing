import { z } from "zod";

export const ParseUrl= z.object({
  url: z.string().trim().url("Must be a valid URL"),
});

export type ParseUrlInput = z.infer<typeof ParseUrl>;