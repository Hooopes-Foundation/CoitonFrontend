import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(2).max(50),
  region: z.string().min(2).max(50),
  vId: z.number(),
});

export type TOrganizationSchema = z.infer<typeof organizationSchema>;
