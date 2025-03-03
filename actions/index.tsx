"use server"

import nodemailer from "nodemailer"
import { z } from "zod"


export async function sendQuote(serviceType: string, data: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Quote Request - ${serviceType.toUpperCase()} Freight`,
            html: `
        <h2>New Quote Request</h2> ${data}`,
        }

        // console.log(mailOptions);
        // Send the email
        await transporter.sendMail(mailOptions)

        return { success: true }
    } catch (error) {
        console.error("Quote request error:", error)
        return {
            error: "An error occurred while sending the quote request. Please try again.",
        }
    }
}




// Define the validation schema
const ContactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
    company: z
        .string()
        .refine((val) => {
            if (val.length === 0) return true // Allow empty string
            return val.length >= 2 // Only check length if value is provided
        })
        .optional(),
    message: z.string().min(10),
})

type ContactFormData = z.infer<typeof ContactFormSchema>

export async function sendEmail(formData: FormData) {
    try {
        // Convert FormData to a regular object
        const rawFormData = Object.fromEntries(formData.entries())

        // Validate the form data
        const validatedFields = ContactFormSchema.safeParse(rawFormData)

        // If validation fails, return the errors
        if (!validatedFields.success) {
            return {
                error: validatedFields.error.issues[0].message,
            }
        }

        const data = validatedFields.data as ContactFormData

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: [process.env.EMAIL_USER, process.env.RECIPIENT1 ?? null].filter((e) => e).join(", "), // Add multiple recipients here
            subject: "New Contact Form Submission",
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>`,
        }

        // Send the email
        await transporter.sendMail(mailOptions)

        return { success: true }
    } catch (error) {
        console.error("Email sending error:", error)
        return {
            error: "An error occurred while sending the message. Please try again.",
        }
    }
}

