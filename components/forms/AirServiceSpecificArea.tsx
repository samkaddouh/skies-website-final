import { useState } from "react";
import { ServiceSpecificAreaProp } from "@/app/types/formState";
import { CargoDetails } from "@/components/cargo-details";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BaseQuoteSchema } from "@/app/quote/schema";

export function AirServiceSpecificArea({
    handleDimensionsChange,
    handleWeightChange,
    formState,
    setFormState,
    handleInputChange,
    t,
}: ServiceSpecificAreaProp) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log("Handling blur for field:", name, "with value:", value);

        const result = BaseQuoteSchema.safeParse({ [name]: value });
        console.log("Validation result:", result);

        if (!result.success) {
            const error = result?.error?.errors.filter(a => a.path[0] === name);
            if (error && error.length > 0) {
                const message = error[0].message as string;
                console.log("Error message:", message);
                setErrors((prev) => ({ ...prev, [name]: t(message as never) }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <div className="space-y-6">
            <CargoDetails
                data={formState.data}
                handleInputChange={handleInputChange}
                onDimensionsChange={handleDimensionsChange}
                onWeightChange={handleWeightChange}
                serviceType="air"
                t={t}
            />

            <div className="space-y-3">
                <Label className="text-base font-medium">{t("deliveryUrgency")}</Label>
                <RadioGroup style={{ marginTop: "-5px" }}
                    value={formState.data.deliveryUrgency}
                    onValueChange={(value) =>
                        setFormState((prev) => ({
                            ...prev,
                            data: { ...prev.data, deliveryUrgency: value as "standard" | "express" | "priority" },
                        }))
                    }
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" onBlur={(e: unknown) => { handleBlur(e as React.FocusEvent<HTMLInputElement>) }} />
                        <Label style={{ marginTop: "20px", lineHeight: "20px" }} htmlFor="standard">{t("standardDelivery")} <br />
                            <p className="text-sm text-muted-foreground">{t("standardDeliveryDuration")}
                            </p>
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" onBlur={(e: unknown) => { handleBlur(e as React.FocusEvent<HTMLInputElement>) }} />
                        <Label style={{ marginTop: "20px", lineHeight: "20px" }} htmlFor="express">{t("expressDelivery")} <br />
                            <p className="text-sm text-muted-foreground">{t("expressDeliveryDuration")}
                            </p>
                        </Label>

                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="priority" id="priority" onBlur={(e: unknown) => { handleBlur(e as React.FocusEvent<HTMLInputElement>) }} />
                        <Label style={{ marginTop: "20px", lineHeight: "20px" }} htmlFor="priority">{t("priorityDelivery")} <br />
                            <p className="text-sm text-muted-foreground">{t("priorityDeliveryDuration")}
                            </p>
                        </Label>

                    </div>
                </RadioGroup>
                {errors.deliveryUrgency && <p className="text-red-500 text-sm">{errors.deliveryUrgency}</p>}
            </div >
        </div >
    );
}
