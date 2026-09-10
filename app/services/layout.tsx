import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping, Customs Clearance & Freight Services in Beirut",
  description:
    "Air freight, sea freight (FCL & LCL), and licensed customs clearance at the Port of Beirut and Beirut Airport. Door-to-door shipping across Lebanon with live tracking.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Shipping, Customs Clearance & Freight Services in Beirut | Skies Shipping & Clearing",
    description:
      "Air & sea freight, licensed customs clearance at the Port of Beirut and Beirut Airport, and live shipment tracking.",
    url: "https://www.skies-lb.com/services",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
