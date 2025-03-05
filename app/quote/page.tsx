"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { sendQuote } from "@/actions/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { StepOne } from "@/components/StepOne"
import { StepTwo } from "@/components/StepTwo"
import { ServiceType, CargoType, FormState, type ShippingTerm, nameSort } from "@/app/types/formState"
import { initialFormState } from "@/app/states/initialFormState"
import { StepThree } from "@/components/StepThree"
import { BaseQuoteSchema, SeaFreightSchema, BaseQuoteOptionalSchema } from "@/app/quote/schema"

// Confirmation Modal component
function ConfirmationModal({ isOpen, onConfirm, onCancel, t }: { isOpen: boolean, onConfirm: () => void, onCancel: () => void, t: (key: TranslationKey) => string }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">{t("resetConfirmTitle")}</h2>
                <p className="mb-4">{t("resetConfirmInfo")}</p>
                <div className="flex justify-end gap-4">
                    <Button onClick={onCancel} variant="outline">{t("cancel")}</Button>
                    <Button onClick={onConfirm} variant="destructive">{t("confirm")}</Button>
                </div>
            </div>
        </div>
    )
}



function ErrorConfirmationModal({ isOpen, onConfirm, onCancel, stepTwoErrors, t }: {
    isOpen: boolean, onConfirm: () => void, onCancel: () => void, stepTwoErrors: { field: string; message: string; }[], t: (key: TranslationKey) => string
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">{t("errorFormTitle")}</h2>
                <p className="mb-4">{t("errorFormDesc")}</p>

                {stepTwoErrors && stepTwoErrors.length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {stepTwoErrors.map((error: {
                                field: string;
                                message: string;
                            }, index: unknown) => (
                                <p style={{ borderBottom: "solid 1px #eee" }} key={index as number} className="mb-2">{t(error.field as TranslationKey)}: {t(error.message as TranslationKey)}</p>

                            ))}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-end gap-4">
                    <Button onClick={onCancel} variant="outline">{t("cancel")}</Button>
                    <Button onClick={onConfirm} variant="destructive">{t("confirm")}</Button>
                </div>
            </div>
        </div>
    )
}



export default function QuotePage() {
    const { language } = useLanguage()
    const t = (key: TranslationKey) => translations[language][key]

    const [stepTwoErrors, setStepTwoErrors] = useState<string[]>([]);
    const [formState, setFormState] = useState<FormState>(initialFormState)
    const [isConfirmingReset, setIsConfirmingReset] = useState(false) // State to handle the confirmation modal
    const [isErrorConfirmationIsOpen, setIsErrorConfirmationIsOpen] = useState(false) // State to handle the confirmation modal
    const [ConfirmationErrors, setConfirmationErrors] = useState<{ field: string; message: string }[]>([])


    const ErrorConfirmationContinue = () => {
        setFormState((prev) => ({
            ...prev,
            currentStep: Math.min(prev.currentStep + 1, prev.maxSteps),
        }));

        setIsErrorConfirmationIsOpen(false);
        window.scrollTo(0, 0);
    }
    const CloseErorrConfirmation = () => {
        setIsErrorConfirmationIsOpen(false);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, [name]: value },
        }))

    }

    const handleServiceTypeSelect = (type: ServiceType) => {
        setFormState((prev) => ({
            ...prev,
            serviceType: type,
            data: {
                ...prev.data,
                serviceType: type,
                deliveryUrgency: undefined,
                equipmentNeeded: undefined,
                temperature: undefined,
                temperatureUnit: undefined,
                cargoInGauge: undefined,
                cargoDimensions: undefined,
                dimensionsUnit: undefined,
                packages: "",
                containerCapacity: undefined,
                weightValue: undefined,
                weightUnit: undefined,
            },
        }))
    }

    const handleShippingTermChange = (term: ShippingTerm) => {
        setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, shippingTerm: term },
        }))
    }

    const handleCargoTypeChange = (type: CargoType) => {
        setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, cargoType: type },
        }))
    }

    const handleDimensionsChange = (value: string, unit: "cm" | "in" | "m" | "ft") => {
        setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, cargoDimensions: value, dimensionsUnit: unit },
        }))
    }

    const handleWeightChange = (value: string, unit: "kg" | "lb" | "ton") => {
        setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, weightValue: value, weightUnit: unit },
        }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setFormState((prev) => ({ ...prev, isSubmitting: true, errors: {} }))

        const form = event.target as HTMLFormElement

        try {


            // nameSort

            const data = nameSort.filter((key): key is keyof typeof formState.data => !!formState.data[key as keyof typeof formState.data]).map((key: keyof typeof formState.data) => {
                const translationKey = key === "shippingTerm" ? "shippingTerms" : key;
                return (
                    `<p><strong>${t(translationKey as keyof typeof t)}</strong> ${(formState.data[key] as string)?.toUpperCase()}</p > `
                );;
            })

            if (formState.serviceType) {
                await sendQuote(formState.serviceType, data.join('\n\t'))
            } else {
                throw new Error("Service type is required");
            }

            setFormState((prev) => ({
                ...prev,
                success: true,
                isSubmitting: false,
                serviceType: null,
                currentStep: 1,
                maxSteps: 3,
                data: initialFormState.data,
            }))
            form.reset()

        } catch {
            setFormState((prev) => ({
                ...prev,
                errors: { form: t("errorMessage") },
                success: false,
                isSubmitting: false,
            }))
        }
    }

    function validateStepTwoOptional() {
        const validatedFields = BaseQuoteOptionalSchema.safeParse(formState.data);
        if (!validatedFields.success) {
            const errors = validatedFields.error.errors.reduce<Record<string, string>>((acc, err) => {
                if (!acc[err.path[0]]) {  // Only take the first error for each field
                    acc[err.path[0]] = t(err.message as TranslationKey);
                }
                return acc;
            }, {});
            setStepTwoErrors(Object.values(errors)); // Store only the translated first error for each field
        } else {
            setStepTwoErrors([]);
        }
        return validatedFields.success;
    }





    const validateStepTwo = () => {
        const schema = formState.serviceType === "sea" ? SeaFreightSchema : BaseQuoteSchema;
        const validatedFields = schema.safeParse(formState.data);

        if (!validatedFields.success) {
            const errorsMap = new Map();

            validatedFields.error.errors.forEach(err => {
                const field = err.path.join(".");
                if (!errorsMap.has(field)) {
                    errorsMap.set(field, err.message); // Store only the first error per field
                }
            });

            return Array.from(errorsMap, ([field, message]) => ({ field, message }));
        }

        return []; // Return empty array if validation succeeds
    };


    const validateStepOne = () => {
        const errors: Record<string, string> = {};
        if (!formState.data.name.trim()) errors.name = t("nameTooShort");
        if (!formState.data.email.trim() || !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formState.data.email))
            errors.email = t("invalidEmail");
        if (!formState.data.phone.trim() || !/^\+?\d{7,15}$/.test(formState.data.phone))
            errors.phone = t("invalidPhone");

        setFormState((prev) => ({ ...prev, errors }));
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {

        if (formState.currentStep === 1 && !validateStepOne()) {
            return; // Prevent navigation if validation fails
        }

        if (formState.currentStep === 2) {
            if (!validateStepTwoOptional()) {
                return; // Prevent navigation if validation fails
            } else {

                let errors = validateStepTwo();

                errors = (formState.data.shippingTerm === "FOB") ? errors.filter(err => err.field != "exactPickupAddress") : errors;

                if (errors === null || errors.length === 0) {
                    setFormState((prev) => ({
                        ...prev,
                        currentStep: Math.min(prev.currentStep + 1, prev.maxSteps),
                    }));
                    window.scrollTo(0, 0);
                } else {
                    setIsErrorConfirmationIsOpen(true);
                    setConfirmationErrors(errors);
                    return;

                    // if (confirm("have some error")) {
                    //     setFormState((prev) => ({
                    //         ...prev,
                    //         currentStep: Math.min(prev.currentStep + 1, prev.maxSteps),
                    //     }));
                    // }
                }
            }
        }

        setFormState((prev) => ({
            ...prev,
            currentStep: Math.min(prev.currentStep + 1, prev.maxSteps),
        }));
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setFormState((prev) => ({
            ...prev,
            currentStep: Math.max(prev.currentStep - 1, 1),
        }));
        window.scrollTo(0, 0);
    }

    const handleResetStep2 = () => {
        setIsConfirmingReset(true); // Trigger the confirmation dialog
    }

    const confirmReset = () => {
        setFormState((prev) => ({
            ...prev,
            data: {
                ...initialFormState.data,
                name: prev.data.name,
                email: prev.data.email,
                phone: prev.data.phone,
                companyNameSupplier: prev.data.companyNameSupplier,
                shippingTerm: ""
            },
            serviceType: null,
        }));
        setIsConfirmingReset(false); // Close the confirmation dialog

        window.scrollTo(0, 0);
    }

    const cancelReset = () => {
        setIsConfirmingReset(false); // Close the confirmation dialog
    }

    const renderStep = () => {
        switch (formState.currentStep) {
            case 1:
                return (
                    <>
                        <StepOne data={formState.data} handleInputChange={handleInputChange} t={t} />
                        <div className={`flex justify - end mt - 6 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                            <Button type="button" onClick={() => { nextStep() }}>
                                {t("next")}
                            </Button>
                        </div>
                    </>
                )
            case 2:
                return (
                    <StepTwo
                        data={{ ...formState.data, serviceType: formState.serviceType, shippingTerm: formState.data.shippingTerm as "EXW" | "FOB" | undefined }}
                        onServiceTypeSelect={handleServiceTypeSelect}
                        onShippingTermChange={handleShippingTermChange}
                        onCargoTypeChange={handleCargoTypeChange}
                        handleInputChange={handleInputChange}
                        t={t}
                        handleDimensionsChange={handleDimensionsChange}
                        handleWeightChange={handleWeightChange}
                        onPrevious={prevStep}
                        onNext={() => nextStep()}
                        onReset={handleResetStep2}
                        language={language}
                        formState={formState}
                        setFormState={setFormState}
                    />
                )
            case 3:
                return (
                    <StepThree
                        onPrevious={prevStep}
                        onSubmit={() => nextStep()}
                        t={t}
                        data={{ ...formState.data, serviceType: formState.serviceType, shippingTerm: formState.data.shippingTerm as "EXW" | "FOB" | undefined }}
                    >
                    </StepThree>
                );
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[#828282]">
                    <div className="absolute inset-0"></div>
                </div>
                <div className="container relative mx-auto px-6 sm:px-8">
                    <div className="max-w-3xl">
                        <h1 className="animate-subtle-jump text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f8f9fa]">{t("getQuoteTitle")}</h1>
                        <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-100">{t("getQuoteDescription")}</p>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            {formState.success && (
                                <Alert className="mb-6">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertDescription>{t("quoteSuccess")}</AlertDescription>
                                </Alert>
                            )}
                            {formState.errors.form && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{formState.errors.form}</AlertDescription>
                                </Alert>
                            )}

                            {stepTwoErrors && stepTwoErrors.length > 0 && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {stepTwoErrors.map((error, index) => (
                                            <p key={index} className="mb-2">{error}</p>
                                        ))}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {renderStep()}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ConfirmationModal isOpen={isConfirmingReset} onConfirm={confirmReset} onCancel={cancelReset} t={t} />
            <ErrorConfirmationModal isOpen={isErrorConfirmationIsOpen} onConfirm={ErrorConfirmationContinue} onCancel={CloseErorrConfirmation} stepTwoErrors={ConfirmationErrors} t={t} />

        </div>
    )
}
