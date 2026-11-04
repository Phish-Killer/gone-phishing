import { z } from "zod";

export const SignIn = z.object({
  username: z.string().trim().min(1),
});