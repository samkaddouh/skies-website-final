import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get a Shipping & Customs Clearance Quote — Beirut, Lebanon",
  description:
    "Request a free quote for air freight, sea freight, or customs clearance in Beirut. Fast response from a licensed clearing company at the Port of Beirut and Beirut Airport.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Get a Shipping & Customs Clearance Quote — Beirut | Skies Shipping & Clearing",
    description:
      "Free quote for air & sea freight and customs clearance in Beirut, Lebanon. Fast response, transparent pricing.",
    url: "https://www.skies-lb.com/quote",
  },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children
}
