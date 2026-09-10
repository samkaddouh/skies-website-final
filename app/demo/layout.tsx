import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Shipment Tracking Demo — Client Portal",
  description:
    "See the Skies client portal live: real-time shipment tracking for air & sea freight and customs clearance in Beirut, Lebanon. Book a personal demo.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Live Shipment Tracking Demo | Skies Shipping & Clearing",
    description:
      "Real-time shipment tracking for freight and customs clearance in Beirut. Book a personal demo of the client portal.",
    url: "https://www.skieslb.com/demo",
  },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
