import { z } from "zod";

export const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Northern",
  "Volta",
  "Upper East",
  "Upper West",
  "Brong-Ahafo",
  "Bono",
  "Bono East",
  "Ahafo",
  "Western North",
  "Oti",
  "North East",
  "Savannah",
] as const;

export const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(\+233|0)(20|23|24|25|26|27|28|50|54|55|59)\d{7}$/,
      "Invalid Ghana phone number"
    ),
  region: z.enum(GHANA_REGIONS, { message: "Please select a valid region" }),
  city: z.string().min(2, "City must be at least 2 characters"),
  landmark: z.string().optional(),
  gpsCode: z
    .string()
    .regex(/^[A-Z]{2}-\d{3,4}-\d{4}$/, "Invalid Ghana GPS code (e.g., GA-123-4567)")
    .optional()
    .or(z.literal("")),
  isDefault: z.boolean().optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;
