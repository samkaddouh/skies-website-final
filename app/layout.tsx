import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import LanguageAwareLayout from "@/components/LanguageAwareLayout"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skies-lb.com"),
  title: {
    default: "Customs Clearance & Freight with Live Tracking — Beirut, Lebanon | Skies Shipping & Clearing",
    template: "%s | Skies Shipping & Clearing",
  },
  description:
    "Licensed customs clearing and freight company at the Port of Beirut and Beirut Airport. Air & sea freight, customs clearance, and a client portal with live shipment tracking. We Move It, You Track It.",
  keywords: [
    "customs clearance Beirut",
    "clearing company Beirut",
    "shipping company Beirut",
    "shipping company Lebanon",
    "freight forwarding Lebanon",
    "customs broker Lebanon",
    "Port of Beirut clearing",
    "Beirut Airport cargo clearance",
    "air freight Lebanon",
    "sea freight Beirut",
    "import export Lebanon",
    "shipment tracking Lebanon",
    "تخليص جمركي بيروت",
    "شركة شحن لبنان",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Skies Shipping & Clearing — We Move It, You Track It.",
    description:
      "Air & Sea Freight · Customs Clearance · Live Tracking. The first clearing company in Lebanon with a real-time client portal.",
    url: "https://www.skies-lb.com",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.skies-lb.com/#business",
      name: "Skies Shipping & Clearing",
      alternateName: "Skies Lebanon",
      slogan: "We Move It, You Track It.",
      description:
        "Licensed customs clearing and freight forwarding company in Beirut, Lebanon. Air & sea freight, customs clearance at the Port of Beirut and Beirut Airport, with live shipment tracking through a client portal.",
      url: "https://www.skies-lb.com",
      logo: "https://www.skies-lb.com/Skies_Logo.png",
      image: "https://www.skies-lb.com/Skies_Logo.png",
      telephone: "+961 1 456 000",
      email: "sales@skieslb.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Beirut",
        addressCountry: "LB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.8938,
        longitude: 35.5018,
      },
      areaServed: [
        { "@type": "Country", name: "Lebanon" },
        { "@type": "City", name: "Beirut" },
      ],
      knowsLanguage: ["en", "ar"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Shipping & Clearing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Customs Clearance",
              description: "Licensed customs clearance at the Port of Beirut and Beirut Rafic Hariri International Airport.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Air Freight",
              description: "Air freight to and from Beirut Airport with live shipment tracking.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sea Freight",
              description: "FCL and LCL sea freight through the Port of Beirut.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Live Shipment Tracking",
              description: "Real-time client portal to track shipments and clearance status.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.skies-lb.com/#website",
      url: "https://www.skies-lb.com",
      name: "Skies Shipping & Clearing",
      publisher: { "@id": "https://www.skies-lb.com/#business" },
      inLanguage: ["en", "ar"],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <LanguageAwareLayout>{children}</LanguageAwareLayout>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
