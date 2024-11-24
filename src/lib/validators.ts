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

export const createListingSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must not exceed 50 characters"),
  phone: z
    .string()
    .min(2, {
      message: "Phone number is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Phone number must only contain digits",
    }),
  social: z
    .string()
    .min(2, "Social media handle must be at least 2 characters")
    .max(50, "Social media handle must not exceed 50 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(50, "Occupation must not exceed 50 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must not exceed 50 characters"),
  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),
  postalCode: z
    .string()
    .min(2, {
      message: "Zip code is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Zip code must only contain digits",
    }),
  price: z
    .string()
    .min(2, {
      message: "Price is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Price must only contain digits",
    }),
  bedrooms: z
    .string()
    .min(2, {
      message: "Number of bedroom is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Number of bedrooms must be a valid number",
    }),
  bathrooms: z
    .string()
    .min(2, {
      message: "Number of bathroom is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Number of bathrooms must be a valid number",
    }),
  parkingSpot: z
    .string()
    .min(2, {
      message: "Number of parking space is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Number of parking spaces must be a valid number",
    }),
  constructionSqft: z
    .string()
    .min(2, {
      message: "Construction year is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Construction year must be a valid number",
    }),
  landSqft: z
    .string()
    .min(2, {
      message: "Land size is required",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Land size must be a valid number",
    }),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(50, "Description must not exceed 50 characters"),
  images: z
    .array(z.instanceof(File), {
      required_error: "Images of properties cannot be blank",
    })
    .min(2, { message: "At least 2 images is required" })
    .max(10, { message: "At most 10 images is required" }),
  documents: z
    .array(z.instanceof(File), {
      required_error: "Document is required to validate registration",
    })
    .min(1, { message: "At least 1 document is required" })
    .max(3, { message: "At most 3 document is required" }),
});

export type CREATE_LISTING_SCHEMA = z.infer<typeof createListingSchema>;

export type REG_ORG_SCHEMA = z.infer<typeof regOrgSchema>;
export type PROP_MGMT_SCHEMA = z.infer<typeof propMgmtSchema>;
export type DAO_MGMT_SCHEMA = z.infer<typeof daoMgmtSchema>;
