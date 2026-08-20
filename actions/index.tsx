"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

const LEADS_INBOX = "sales@skieslb.com"

function createTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
}

export async function sendQuote(serviceType: string, data: string, honeypot?: string) {
    // Honeypot filled → bot. Pretend success, send nothing.
    if (honeypot) return { success: true }

    try {
        const transporter = createTransporter()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: LEADS_INBOX,
            subject: `New Quote Request - ${serviceType.toUpperCase()} Freight`,
            html: `
        <h2>New Quote Request</h2> ${data}`,
        }

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
    // Honeypot filled → bot. Pretend success, send nothing.
    if (formData.get("website")) return { success: true }

    try {
        const rawFormData = Object.fromEntries(formData.entries())
        delete rawFormData.website

        // Validate the form data
        const validatedFields = ContactFormSchema.safeParse(rawFormData)

        // If validation fails, return the errors
        if (!validatedFields.success) {
            return {
                error: validatedFields.error.issues[0].message,
            }
        }

        const data = validatedFields.data as ContactFormData

        const transporter = createTransporter()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: LEADS_INBOX,
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

        await transporter.sendMail(mailOptions)

        return { success: true }
    } catch (error) {
        console.error("Email sending error:", error)
        return {
            error: "An error occurred while sending the message. Please try again.",
        }
    }
}

const DemoRequestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
    company: z.string().optional(),
    preferredTime: z.string().optional(),
    notes: z.string().optional(),
})

export async function sendDemoRequest(formData: FormData) {
    // Honeypot filled → bot. Pretend success, send nothing.
    if (formData.get("website")) return { success: true }

    try {
        const rawFormData = Object.fromEntries(formData.entries())
        delete rawFormData.website

        const validatedFields = DemoRequestSchema.safeParse(rawFormData)
        if (!validatedFields.success) {
            return { error: validatedFields.error.issues[0].message }
        }

        const data = validatedFields.data

        const transporter = createTransporter()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: LEADS_INBOX,
            subject: `New Live Demo Request — ${data.name}${data.company ? ` (${data.company})` : ""}`,
            html: `
        <h2>New Live Demo Request</h2>
        <p>Schedule a Google Meet to walk them through the client portal.</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.preferredTime ? `<p><strong>Preferred day/time:</strong> ${data.preferredTime}</p>` : ""}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes.replace(/\n/g, "<br>")}</p>` : ""}`,
        }

        await transporter.sendMail(mailOptions)

        return { success: true }
    } catch (error) {
        console.error("Demo request error:", error)
        return {
            error: "An error occurred while sending the request. Please try again.",
        }
    }
}
