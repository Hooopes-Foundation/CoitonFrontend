import { countryOptions, listingTypes, propertyTypes } from "@/static";
import { z } from "zod";

const propertyTypeValues = propertyTypes.map((type) => type.value);
const countriesValue = countryOptions.map((type) => type.code);

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
  // 1. Owner/Agent Information
  email: z
    .string()
    .email("Invalid email format")
    .min(2, "Email must be at least 2 characters"),
  phone: z
    .string()
    .min(3, {
      message: "Phone number nust be at least 3 characters.",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Phone number must only contain digits",
    }),
  social: z
    .string()
    .min(2, "Social media handle must be at least 2 characters")
    .max(50, "Social media handle must not exceed 50 characters")
    .optional(),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(50, "Occupation must not exceed 50 characters")
    .optional(),

  // 2. Property Basics
  propertyType: z.enum(propertyTypeValues as [string, ...string[]], {
    required_error: "Property type is required",
    message: "Property type is required",
  }),
  listingType: z.enum(listingTypes, {
    required_error: "Listing type is required",
  }),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must not exceed 30 characters"),
  country: z.enum(countriesValue as [string, ...string[]], {
    required_error: "Country is required",
  }),
  location: z.object({
    name: z.string({ required_error: "Location name is required" }),
    latitude: z.string().refine((value) => !isNaN(Number(value))),
    longitude: z.string().refine((value) => !isNaN(Number(value))),
  }),
  price: z
    .string()
    .min(0.001, {
      message: "Price nust be at least $0.001",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Price must only contain digits",
    }),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  // 3. Property Features
  bedrooms: z
    .string()
    .min(1, {
      message: "Bedrooms nust be at least 1",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Bedrooms must only contain digits",
    }),
  bathrooms: z
    .string()
    .min(1, {
      message: "Bathrooms nust be at least 1",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Bathroom must only contain digits",
    }),
  sizeSqft: z
    .string()
    .min(1, {
      message: "Size sqft. nust be at least 1",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Size sqft. must only contain digits",
    }),
  landArea: z
    .string()
    .min(1, {
      message: "Land area nust be at least 1",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Land area must only contain digits",
    }),
  parkingSpaces: z
    .string()
    .min(1, {
      message: "Parking Spaces nust be at least 1",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Parking Spaces must only contain digits",
    }),
  yearBuilt: z.date({
    required_error: "Year built is required.",
  }),
  amenities: z.array(z.string()).optional(),

  // 4. Property Media
  banner: z
    .instanceof(File, { message: "Banner is required" })
    .refine((file) => file.size > 0, {
      message: "File size must be greater than 0 bytes",
    }),
  photos: z
    .array(z.instanceof(File), {
      required_error: "Property photos are required",
    })
    .min(2, { message: "At least 2 photos are required" })
    .max(10, { message: "At most 10 photos are allowed" }),

  // 4. Legal Documents
  propertyDocuments: z
    .array(z.instanceof(File), {
      required_error: "At least 1 document is required",
    })
    .min(1, { message: "At least 1 document is required" })
    .max(5, { message: "At most 5 documents are allowed" }),
});

export const onboardingSchema = z.discriminatedUnion("accountType", [
  z.object({
    accountType: z.literal("agent"),
    agentName: z.string().min(1, "Agent name is required"),
    agentCode: z.string().optional(),
  }),
  z.object({
    accountType: z.literal("dao"),
    daoName: z.string().min(1, "DAO name is required"),
    daoMembers: z.number().min(1, "Must have at least one member"),
  }),
]);

export type ONBOARDING_SCHEMA = z.infer<typeof onboardingSchema>;
export type CREATE_LISTING_SCHEMA = z.infer<typeof createListingSchema>;

export type REG_ORG_SCHEMA = z.infer<typeof regOrgSchema>;
export type PROP_MGMT_SCHEMA = z.infer<typeof propMgmtSchema>;
export type DAO_MGMT_SCHEMA = z.infer<typeof daoMgmtSchema>;
