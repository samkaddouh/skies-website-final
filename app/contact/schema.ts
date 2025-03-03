import { z } from "zod"

export const ContactFormSchema = z.object({
    name: z
        .string()
        .min(2, "nameTooShort")
        .refine((val) => !/\d/.test(val), "nameContainsNumbers"),
    email: z.string().email("invalidEmail"),
    phone: z
        .string()
        .min(8, "invalidPhone")
        .regex(/^\+?[0-9\s-]{8,}$/, "invalidPhone")
        .refine((val) => {
            // Must contain at least one number
            return /\d/.test(val)
        }, "invalidPhone"),
    company: z
        .string()
        .min(2, "companyTooShort")
        .refine((val) => !/\d/.test(val), "companyContainsNumbers")
        .optional(),
    message: z.string().min(10, "messageTooShort"),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>