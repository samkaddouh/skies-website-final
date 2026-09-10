import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us — Licensed Clearing Company in Beirut, Lebanon",
  description:
    "Skies Shipping & Clearing is a licensed customs clearing and freight company in Beirut, Lebanon — the first with a real-time client portal for live shipment tracking.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Skies Shipping & Clearing — Beirut, Lebanon",
    description:
      "A licensed clearing company in Beirut that works like a tech company: transparent pricing and live shipment tracking.",
    url: "https://www.skies-lb.com/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
