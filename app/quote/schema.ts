import { z } from "zod"

export type ServiceType = "air" | "sea" | "land" | null


export const BaseQuoteOptionalSchema = z.object({
  name: z
    .string()
    .min(1, "nameRequired")
    .min(2, "nameTooShort")
    .refine((val) => !/\d/.test(val), "nameContainsNumbers"),
  email: z.string().email("invalidEmail").min(1, "emailRequired"),
  phone: z
    .string()
    .min(1, "phoneRequired")
    .min(8, "invalidPhone")
    .regex(/^\+?[0-9\s-]{8,}$/, "invalidPhone")
    .refine((val) => {
      return /\d/.test(val)
    }, "invalidPhone"),
  originAddress: z.string().min(1, "originAddressRequired").min(3, "originAddressTooShort"),
  destinationAddress: z.string().min(1, "destinationAddressRequired").min(3, "destinationAddressTooShort"),
  additionalInfo: z.string().optional(),
  companyNameSupplier: z.string().min(1, "companyNameSupplierRequired").min(2, "companyNameTooShort"),
  descriptionOfGoods: z.string().min(1, "descriptionOfGoodsRequired").min(6, "descriptionOfGoodsTooShort"),
});


// Base schema for fields common to all freight types
export const BaseQuoteSchema = z.object({
  name: z
    .string()
    .min(1, "nameRequired")
    .min(2, "nameTooShort")
    .refine((val) => !/\d/.test(val), "nameContainsNumbers"),
  email: z.string().email("invalidEmail").min(1, "emailRequired"),
  phone: z
    .string()
    .min(1, "phoneRequired")
    .min(8, "invalidPhone")
    .regex(/^\+?[0-9\s-]{8,}$/, "invalidPhone")
    .refine((val) => {
      return /\d/.test(val)
    }, "invalidPhone"),
  originAddress: z.string().min(1, "originAddressRequired").min(3, "originAddressTooShort"),
  destinationAddress: z.string().min(1, "destinationAddressRequired").min(3, "destinationAddressTooShort"),
  serviceType: z.enum(["air", "sea", "land"] as const, { required_error: "serviceTypeRequired" }),
  // description: z.string().min(1, "descriptionRequired").min(3, "descriptionTooShort"),
  // dimensions: z.string().min(1, "dimensionsRequired"),
  additionalInfo: z.string().optional(),
  companyNameSupplier: z.string().min(1, "companyNameSupplierRequired").min(2, "companyNameTooShort"),

  numberOfPackages: z.string().min(1, "numberOfPackagesRequired").min(2, "numberOfPackagesTooShort").transform((val) => val ?? ""),
  shippingTerm: z.enum(["EXW", "FOB"] as const).optional(),
  exactPickupAddress: z.string()
    .min(1, "exactPickupAddressRequired")
    .min(6, "exactPickupAddressTooShort"),
  descriptionOfGoods: z.string().min(1, "descriptionOfGoodsRequired").min(6, "descriptionOfGoodsTooShort"),
  cargoGaugeType: z.enum(["in", "out"]).optional(),
  containerCapacity: z.number().optional(),
  weightValue: z.string().min(1, "weightValueRequired"),
  cargoDimensions: z.string().min(1, "cargoDimensionsRequired").min(3, "cargoDimensionsTooShort"),
});


// Air freight specific fields
// export const ShippingTermFOBSchema = BaseQuoteSchema.extend({
//   exactPickupAddress: z.string().optional()
// });


// Air freight specific fields
export const AirFreightSchema = BaseQuoteSchema.extend({
  preferredAirline: z.string().optional(),
  deliveryUrgency: z.enum(["standard", "express", "priority"]),
})

// Sea freight specific fields
export const SeaFreightSchema = BaseQuoteSchema.extend({
  equipmentNeeded: z.enum([
    "LCL",
    "20ft",
    "40ft",
    "20HC",
    "40HC",
    "20REEF",
    "40REEF",
    "20OT",
    "40OT",
  ]),
  numberOfPackages: z.string().optional(), // Initially optional
  cargoDimensions: z.string().optional(),
  weightValue: z.string().optional()
}).refine(
  (data) => {
    // Ensure numberOfPackages is required when equipmentNeeded is "LCL"
    if (data.serviceType === "sea" && data.equipmentNeeded === "LCL") {
      return !!data.numberOfPackages && data.numberOfPackages.length > 1;
    }
    return true; // Valid if not "sea" or not "LCL"
  },
  {
    message: "numberOfPackagesRequired",
    path: ["numberOfPackages"],
  }
).refine((data) => {
  // Ensure numberOfPackages is required when equipmentNeeded is "LCL"
  if (data.serviceType === "sea" && data.equipmentNeeded === "LCL") {
    return !!data.cargoDimensions && data.cargoDimensions.length > 2;
  }
  return true; // Valid if not "sea" or not "LCL"
},
  {
    message: "cargoDimensionsRequired",
    path: ["cargoDimensions"],
  }
).refine((data) => {
  // Ensure numberOfPackages is required when equipmentNeeded is "LCL"
  if (data.serviceType === "sea" && data.equipmentNeeded === "LCL") {
    return !!data.weightValue;
  }
  return true; // Valid if not "sea" or not "LCL"
},
  {
    message: "weightValueRequired",
    path: ["weightValue"],
  }
);



// Land freight specific fields
export const LandFreightSchema = BaseQuoteSchema.extend({
  requiresLoadingAssistance: z.boolean(),
  requiresUnloadingAssistance: z.boolean(),
})

export type BaseQuoteFormData = z.infer<typeof BaseQuoteSchema>
export type AirFreightFormData = z.infer<typeof AirFreightSchema>
export type SeaFreightFormData = z.infer<typeof SeaFreightSchema>
export type LandFreightFormData = z.infer<typeof LandFreightSchema>

