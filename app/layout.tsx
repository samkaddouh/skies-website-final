import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import ClientWrapper from "@/components/ClientWrapper"
import LanguageAwareLayout from "@/components/LanguageAwareLayout"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skieslb.com"),
  title: {
    default: "Customs Clearance & Freight with Live Tracking — Beirut, Lebanon | Skies Shipping & Clearing",
    template: "%s | Skies Shipping & Clearing",
  },
  description:
    "Licensed customs clearing and freight company at the Port of Beirut and Beirut Airport. Air & sea freight, customs clearance, and a client portal with live shipment tracking. We Move It, You Track It.",
  openGraph: {
    title: "Skies Shipping & Clearing — We Move It, You Track It.",
    description:
      "Air & Sea Freight · Customs Clearance · Live Tracking. The first clearing company in Lebanon with a real-time client portal.",
    url: "https://www.skieslb.com",
    siteName: "Skies Shipping & Clearing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skies Shipping & Clearing — We Move It, You Track It.",
    description: "Air & Sea Freight · Customs Clearance · Live Tracking — Beirut, Lebanon.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ClientWrapper>
          <LanguageProvider>
            <LanguageAwareLayout>{children}</LanguageAwareLayout>
          </LanguageProvider>
        </ClientWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
