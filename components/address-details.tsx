"use client"

import type React from "react"
import type { TranslationKey } from "@/utils/translations"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { BaseQuoteSchema } from "@/app/quote/schema"
import type { AddressDetailsProps } from "@/app/types/formState"

export function AddressDetails({
    formSatate,
    handleInputChange,
    t,
}: AddressDetailsProps) {
    // const { language } = useLanguage()
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const result = BaseQuoteSchema.safeParse({ [name]: value })

        if (!result.success) {
            const error = result?.error?.errors.filter((a) => a.path[0] === name)
            if (error && error.length > 0) {
                const message = error[0].message as string
                setErrors((prev) => ({ ...prev, [name]: t(message as TranslationKey) }))
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }))
            }
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    return (
        <>
            <div className="flex space-x-4">
                <div className="space-y-2 flex-1">
                    <Label className="text-base font-medium">
                        {t("originAddress")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        placeholder={t("originAddressPlaceholder")}
                        name="originAddress"
                        value={formSatate.data.originAddress || ""}
                        onChange={handleInputChange}
                        required
                        onBlur={handleBlur}
                        className="placeholder:text-muted-foreground placeholder:italic"
                    />
                    {errors.originAddress && <p className="text-red-500 text-sm">{errors.originAddress}</p>}
                </div>

                <div className="space-y-2 flex-1">
                    <Label className="text-base font-medium">
                        {t("destinationAddress")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        placeholder={t("destinationAddressPlaceholder")}
                        name="destinationAddress"
                        value={formSatate.data.destinationAddress || ""}
                        onChange={handleInputChange}
                        required
                        onBlur={handleBlur}
                        className="placeholder:text-muted-foreground placeholder:italic"
                    />
                    {errors.destinationAddress && <p className="text-red-500 text-sm">{errors.destinationAddress}</p>}
                </div>
            </div>
        </>
    )
}
