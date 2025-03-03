"use client"
import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { sendEmail } from "@/actions/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { z } from "zod"
import { FormField } from "@/components/FormField"

import { ContactFormData, ContactFormSchema } from "@/app/contact/schema";


interface FormState {
  errors: Partial<Record<keyof ContactFormData | "form", string>>
  touched: Partial<Record<keyof ContactFormData, boolean>>
  success: boolean
  isSubmitting: boolean
  data: ContactFormData
}

export default function ContactPage() {
  const { language } = useLanguage()
  const t = (key: TranslationKey) => (translations[language] as Record<TranslationKey, string>)[key]
  const [formState, setFormState] = useState<FormState>({
    errors: {},
    touched: {},
    success: false,
    isSubmitting: false,
    data: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  })

  const validateField = (field: keyof ContactFormData, value: string | undefined) => {
    try {
      if (!value) {
        // Handle empty values based on field requirements
        if (field === "company") {
          return undefined // company is optional
        }
        throw new z.ZodError([
          {
            code: "custom",
            path: [field],
            message: field === "message" ? "messageTooShort" : "required",
          },
        ])
      }

      // For phone field - allow numbers, spaces, dashes, and plus sign at start
      if (field === "phone") {
        if (!/^\+?[0-9\s-]*$/.test(value)) {
          throw new z.ZodError([
            {
              code: "custom",
              path: [field],
              message: "invalidPhone",
            },
          ])
        }
      }

      // For name and company fields - prevent numbers
      if ((field === "name" || field === "company") && /\d/.test(value)) {
        throw new z.ZodError([
          {
            code: "custom",
            path: [field],
            message: field === "name" ? "nameContainsNumbers" : "companyContainsNumbers",
          },
        ])
      }

      ContactFormSchema.shape[field].parse(value)
      return undefined
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0].message as TranslationKey
        return t(errorMessage)
      }
      return t("invalidInput")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // For phone field - only allow numbers, spaces, dashes, and plus at start
    if (name === "phone" && value !== "") {
      const sanitizedValue = value.replace(/[^\d\s-+]/g, "")
      // Only allow plus sign at the start
      if (sanitizedValue.indexOf("+") > 0) {
        return
      }
      setFormState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [name]: sanitizedValue,
        },
      }))
      return
    }

    // For name and company fields - prevent numeric input
    if ((name === "name" || name === "company") && /\d/.test(value)) {
      return
    }

    setFormState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }))
  }

  const handleBlur = (field: keyof ContactFormData) => {
    const value = formState.data[field]
    const error = validateField(field, value)

    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormState((prev) => ({ ...prev, isSubmitting: true }))

    // Validate all fields
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    let hasErrors = false
    Object.keys(formState.data).forEach((key) => {
      const field = key as keyof ContactFormData
      const error = validateField(field, formState.data[field])
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    })

    if (hasErrors) {
      setFormState((prev) => ({
        ...prev,
        errors: newErrors,
        touched: Object.keys(prev.data).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        isSubmitting: false,
      }))
      return
    }

    try {
      const result = await sendEmail(new FormData(event.currentTarget))

      if (result.error) {
        setFormState((prev) => ({
          ...prev,
          errors: { form: result.error },
          success: false,
          isSubmitting: false,
        }))
      } else {
        setFormState({
          errors: {},
          touched: {},
          success: true,
          isSubmitting: false,
          data: {
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          },
        })
      }
    } catch {
      setFormState((prev) => ({
        ...prev,
        errors: { form: t("unexpectedError") },
        isSubmitting: false,
      }))
    }
  }

  const formFields = [
    { name: "name", label: t("name"), type: "text", required: true },
    { name: "email", label: t("email"), type: "email", required: true },
    { name: "phone", label: t("phone"), type: "tel", required: true },
    { name: "company", label: t("company"), type: "text", required: false },
  ]

  return (
    <div className="bg-white min-h-[calc(100vh-64px)]">

      <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#828282]">
          <div className="absolute inset-0"></div>
        </div>

        <div className="container relative mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="animate-subtle-jump text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f8f9fa]">{t("contactUs")}</h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-100">{t("contactDescription")}</p>

          </div>
        </div>
      </section>



      <div className="container mx-auto px-4 py-8 pb-16 md:pb-24">
        <Card className="w-full max-w-[95%] md:max-w-4xl mx-auto">
          <CardContent className="p-4 md:p-8 pt-6">
            {formState.errors.form && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formState.errors.form}</AlertDescription>
              </Alert>
            )}
            {formState.success && (
              <Alert className="mb-6 bg-green-50 text-green-600 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{t("messageSent")}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {formFields.map((field) => (
                  <FormField
                    key={field.name}
                    label={
                      <>
                        {field.label}
                        {
                          field.name != "company" && <span className="text-red-500 ml-1">*</span>
                        }
                      </>
                    }
                    name={field.name}
                    type={field.type}
                    value={formState.data[field.name as keyof ContactFormData] || ""}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur(field.name as keyof ContactFormData)}
                    required={field.required}
                    placeHolder={`${t("enter")} ${field.label}`}
                    error={formState.touched[field.name as keyof ContactFormData] ? formState.errors[field.name as keyof ContactFormData] : undefined}
                  />
                ))}
              </div>

              <div className="space-y-2 mt-8">
                <FormField
                  label=<>
                    {t("message")} <span className="text-red-500 ml-1">*</span>
                  </>


                  name="message"
                  type="textarea"
                  value={formState.data.message}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("message")}
                  required
                  placeHolder={t("messagePlaceholder")}
                  error={formState.touched.message ? formState.errors.message : undefined}
                />
              </div>

              <div className="pt-8 text-center">
                <Button
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? t("sending") : t("sendMessage")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

