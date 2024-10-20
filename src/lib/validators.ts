import { z } from "zod";

export const regOrgSchema = z.object({
  name: z
    .string({ required_error: "Organization Name is required." })
    .min(2, {
      message: "Name must contain at least 2 character(s)",
    })
    .max(30, { message: "Name must contain at most 31 character(s)" }),
  region: z
    .string({ required_error: "Organization Region is required." })
    .min(2, {
      message: "Region must contain at least 2 character(s)",
    })
    .max(30, { message: "Region must contain at most 31 character(s)" }),
  id: z.string({ required_error: "Validator id is required." }),
});

export const propMgmtSchema = z.object({
  email: z
    .string()
    .email({ message: "A valid 'Contact Email' address is required" })
    .min(2),
  handles: z.object({
    twitter: z.string({ required_error: "Twitter handle is required!" }).min(2),
    telegram: z
      .string({ required_error: "Telegram handle is required" })
      .min(2),
  }),
});

export const daoMgmtSchema = z.object({
  files: z
    .array(z.instanceof(File), {
      required_error: "Document is required to validate registration",
    })
    .min(1, { message: "At least 1 document is required" })
    .max(3, { message: "At most 3 document is required" }),
  email: z
    .string()
    .email({ message: "A valid email address is required" })
    .min(2),
});

export type REG_ORG_SCHEMA = z.infer<typeof regOrgSchema>;
export type PROP_MGMT_SCHEMA = z.infer<typeof propMgmtSchema>;
export type DAO_MGMT_SCHEMA = z.infer<typeof daoMgmtSchema>;
