import { z } from "zod";

export const ConsultationSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  idea: z.string().min(1, "Required"),
  placement: z.string().array().min(1, "Required"),
  size: z.string().min(1, "Required"),
  sizeUnit: z.enum(["cm", "inch"], {
    required_error: "Required",
    invalid_type_error: "Invalid size unit",
  }),
  date: z
    .string()
    .optional()
    .refine((date) => {
      const parsedDate = new Date(date as string);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date"),
  inspiration: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Upload at least one file"
    ),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Required")
    .max(100, "Email is too long")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .min(5, "Invalid phone")
    .max(20, "Invalid phone")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone")
    .transform((value) => value.replace(/\s+/g, "").replace(/-/g, "")),
  whichCity: z.string().min(1, "Required"),
  whereDidYouFindMe: z.string().min(1, "Required"),
});
