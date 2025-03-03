import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StepThreeProps, nameSort } from "@/app/types/formState"
export function StepThree({ data, t, onPrevious, onSubmit }: StepThreeProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">{t("reviewYourDetails")}</h2>

            <div className="space-y-4 border p-4 rounded-md">
                {
                    nameSort.filter((key): key is keyof typeof data => !!data[key as keyof typeof data]).map((key: keyof typeof data) => {
                        const translationKey = key === "shippingTerm" ? "shippingTerms" : key;
                        return (
                            <div key={key} className="space-y-1">
                                <Label className="text-base font-medium">{t(translationKey as keyof typeof t)}</Label>
                                <p className="border px-3 py-2 rounded-md bg-background text-sm">
                                    {data[key as keyof typeof data]}
                                </p>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex justify-between items-center mt-6">
                <Button onClick={onPrevious}>{t("previous")}</Button>
                <Button onClick={onSubmit}>{t("submit")}</Button>
            </div>
        </div>
    );
}