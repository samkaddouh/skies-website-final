import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us — Shipping & Customs Clearance in Beirut",
  description:
    "Contact Skies Shipping & Clearing in Beirut, Lebanon. Call +961 1 456 000 or email sales@skieslb.com for air & sea freight and customs clearance.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Skies Shipping & Clearing — Beirut, Lebanon",
    description:
      "Talk to a licensed clearing company in Beirut: +961 1 456 000 · sales@skieslb.com.",
    url: "https://www.skies-lb.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
