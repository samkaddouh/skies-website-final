// src/types/formState.ts

export const shippingTerms = ["EXW", "FOB"] as const

export type ShippingTerm = (typeof shippingTerms)[number]


import type { TranslationKey } from "@/utils/translations"



export type ServiceType = "air" | "sea" | "land" | null;
export type CargoType = "general" | "hazardous";

export interface BaseQuoteFormData {
    name: string;
    email: string;
    phone: string;
    originAddress: string;
    destinationAddress: string;
    description: string;
    value: string;
    weight: string;
    dimensions: string;
    additionalInfo: string;
    // Add any other fields you expect from the base form data
}

export interface FormState {
    errors: Partial<Record<keyof BaseQuoteFormData | "form", string>>;
    touched: Partial<Record<keyof BaseQuoteFormData, boolean>>;
    success: boolean;
    isSubmitting: boolean;
    serviceType: ServiceType;
    currentStep: number;
    maxSteps: number;
    data: Omit<BaseQuoteFormData, "serviceType" | "numberOfCartons" | "numberOfPallets"> & {
        companyNameSupplier: string;
        isGeneral?: boolean;
        isHazardous?: boolean;
        deliveryUrgency?: "standard" | "express" | "priority";
        exactPickupAddress?: string;
        typeOfService?: "FOB" | "EXW";
        equipmentNeeded?: "LCL" | "20ft" | "40ft" | "20HC" | "40HC" | "20REEF" | "40REEF" | "20OT" | "40OT";
        temperature?: string;
        temperatureUnit?: "C" | "F";
        cargoInGauge?: boolean;
        cargoDimensions?: string;
        dimensionsUnit?: "cm" | "in" | "m" | "ft";
        unloadingAssistance: unknown,
        loadingAssistance?: unknown,
        packages: string;
        shippingTerm?: string;
        containerCapacity?: number;
        cargoGaugeType?: "in" | "out";
        cargoType?: CargoType;
        weightValue?: string;
        weightUnit?: "kg" | "lb" | "ton";
        descriptionOfGoods?: string;
        additionalInfo?: string;
    };
}

export interface StepTwoProps {
    data: {
        shippingTerm?: ShippingTerm
        serviceType: ServiceType
        exactPickupAddress?: string
        cargoType?: CargoType
        packages?: string
        descriptionOfGoods?: string
        additionalInfo?: string
        originAddress?: string,
        destinationAddress?: string
    }
    onServiceTypeSelect: (type: ServiceType) => void
    onShippingTermChange: (term: ShippingTerm) => void
    onCargoTypeChange: (type: CargoType) => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    t: (key: TranslationKey) => string
    onPrevious: () => void
    onNext: () => void
    onReset: () => void
    handleDimensionsChange: (value: string, unit: "cm" | "in" | "m" | "ft") => void,
    handleWeightChange: (value: string, unit: "kg" | "lb" | "ton") => void,
    language: string,
    formState: FormState,
    setFormState: React.Dispatch<React.SetStateAction<FormState>>,
}

export interface ServiceTypeSelectorProps {
    t: (key: TranslationKey) => string,
    value: ServiceType,
    onServiceTypeSelect: (type: ServiceType) => void
}

export interface ServiceSpecificAreaProp {
    handleDimensionsChange: (value: string, unit: "cm" | "in" | "m" | "ft") => void,
    handleWeightChange: (value: string, unit: "kg" | "lb" | "ton") => void,
    formState: FormState,
    data?: {
        shippingTerm?: ShippingTerm
        serviceType: ServiceType
        exactPickupAddress?: string
        cargoType?: CargoType
        packages?: string
        descriptionOfGoods?: string
        additionalInfo?: string
    },
    setFormState: React.Dispatch<React.SetStateAction<FormState>>,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    t: (key: TranslationKey) => string,
    language?: string
}


export interface StepOneProps {
    data: {
        name: string
        email: string
        phone: string
        companyNameSupplier: string
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    t: (key: TranslationKey) => string
}


export interface StepThreeProps {
    data: {
        shippingTerm?: ShippingTerm
        serviceType: ServiceType
        exactPickupAddress?: string
        cargoType?: CargoType
        packages?: string
        descriptionOfGoods?: string
        additionalInfo?: string
    }
    t: (key: TranslationKey) => string
    onPrevious: () => void
    onSubmit: () => void
}

export interface CargoDetailsProps {
    data: {
        cargoGaugeType?: "in" | "out"
        containerCapacity?: number
        cargoDimensions?: string
        dimensionsUnit?: "cm" | "in" | "m" | "ft"
        weightValue?: string
        weightUnit?: "kg" | "lb" | "ton"
        temperature?: string
        numberOfPackages?: string
        // originAddress?: string
        // destinationAddress?: string,
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onDimensionsChange?: (value: string, unit: "cm" | "in" | "m" | "ft") => void
    onWeightChange?: (value: string, unit: "kg" | "lb" | "ton") => void
    t: (key: TranslationKey) => string,
    serviceType: string
}

export interface AddressDetailsProps {
    data: {
        originAddress?: string
        destinationAddress?: string
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    t: (key: TranslationKey) => string
}

export const nameSort = ["name",
    "email",
    "phone",
    "companyNameSupplier",
    "shippingTerm",
    "exactPickupAddress",
    "typeOfService",
    "isGeneral",
    "isHazardous",
    "deliveryUrgency",
    "equipmentNeeded",
    "temperature",
    "temperatureUnit",
    "cargoInGauge",
    "cargoDimensions",
    "dimensionsUnit",
    "unloadingAssistance",
    "loadingAssistance",
    "packages",
    "containerCapacity",
    "cargoGaugeType",
    "cargoType",
    "weightValue",
    "weightUnit",
    "value",
    "weight",
    "dimensions",
    // "originAddress",
    // "destinationAddress",
    "descriptionOfGoods",
    "additionalInfo"
];