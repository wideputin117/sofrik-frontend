import { z } from "zod";

export const LoggedInUserSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
});

export type LoggedInUser = z.infer<typeof LoggedInUserSchema>;
