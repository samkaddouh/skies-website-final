"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { Ship, ArrowLeftRight, Plane, Globe, Shield, FileCheck, Warehouse, Truck } from "lucide-react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function ServicesPage() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const t = (key: TranslationKey) => translations[language][key]
  const [parent] = useAutoAnimate()
  const [isLoaded, setIsLoaded] = useState(false)
  const servicesListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const section = searchParams.get("section")
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  const scrollToServices = () => {
    if (servicesListRef.current) {
      servicesListRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      id: "international-shipping",
      icon: Globe,
      title: t("internationalShipping"),
      description: t("internationalShippingDescription"),
      longDescription: t("internationalShippingLong"),
      videoSrc: "/videos/international-shipping.mov",
      posterSrc: "/images/international-shipping-poster.jpg",
    },
    {
      id: "freight-forwarding",
      icon: ArrowLeftRight,
      title: t("freightForwarding"),
      description: t("freightForwardingDescription"),
      longDescription: t("freightForwardingLong"),
      videoSrc: "/videos/freight-forwarding.mov",
      posterSrc: "/images/freight-forwarding-poster.jpg",
    },
    {
      id: "air-freight",
      icon: Plane,
      title: t("airFreight"),
      description: t("airFreightDescription"),
      longDescription: t("airFreightLong"),
      videoSrc: "/videos/air-freight.mov",
      posterSrc: "/images/air-freight-poster.jpg",
    },
    {
      id: "sea-freight",
      icon: Ship,
      title: t("seaFreight"),
      description: t("seaFreightDescription"),
      longDescription: t("seaFreightLong"),
      videoSrc: "/videos/sea-freight.mov",
      posterSrc: "/images/sea-freight-poster.jpg",
    },
    {
      id: "last-mile-delivery",
      icon: Truck,
      title: t("lastMileDelivery"),
      description: t("lastMileDeliveryDescription"),
      longDescription: t("lastMileDeliveryLong"),
      videoSrc: "/videos/land-freight.mov",
      posterSrc: "/images/last-mile-delivery-poster.jpg",
    },

    {
      id: "cargo-insurance",
      icon: Shield,
      title: t("cargoInsurance"),
      description: t("cargoInsuranceDescription"),
      longDescription: t("cargoInsuranceLong"),
      videoSrc: "/videos/cargo-insurance.mov",
      posterSrc: "/images/cargo-insurance-poster.jpg",
    },
    {
      id: "customs-clearance",
      icon: FileCheck,
      title: t("customsClearance"),
      description: t("customsClearanceDescription"),
      longDescription: t("customsClearanceLong"),
      videoSrc: "/videos/customs-clearance.mov",
      posterSrc: "/images/customs-clearance-poster.jpg",
    },
    {
      id: "warehousing",
      icon: Warehouse,
      title: t("warehousing"),
      description: t("warehousingDescription"),
      longDescription: t("warehousingLong"),
      videoSrc: "/videos/warehousing.mov",
      posterSrc: "/images/warehousing-poster.jpg",
    },

  ]

  return (
    <div className="bg-white">
      {/* Hero Section with gradient overlay */}
      <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#828282]">
          <div className="absolute inset-0"></div>
        </div>

        <div className="container relative mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="animate-subtle-jump text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f8f9fa]">{t("ourServices")}</h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-100">{t("servicesDescription")}</p>

            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("exploreServices")}
            </button>
          </div>
        </div>
      </section>

      <div id="services-list" ref={servicesListRef} className="py-12 md:py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div ref={parent} className="max-w-6xl mx-auto space-y-12">
            {isLoaded && services.map((service) => <ServiceSection key={service.id} service={service} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceSection({
  service,
}: {
  service: {
    id: string
    icon: React.ElementType
    title: string
    description: string
    longDescription: string
    videoSrc: string
    posterSrc: string
  }
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const section = urlParams.get("section")
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  // Start loading the video only when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoading(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Play/pause based on visibility once loading has started
  useEffect(() => {
    if (!videoLoading) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [videoLoading])

  return (
    <section id={service.id} className="scroll-mt-20">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 items-start">
          <div ref={containerRef} className="video-aspect-ratio-container">
            {/* Static poster — always visible until video is ready */}
            <img
              src={service.posterSrc}
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
            {/* Video src is only set once the section is in view */}
            <video
              ref={videoRef}
              src={videoLoading ? service.videoSrc : undefined}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              playsInline
              muted
              loop
              onCanPlay={() => setVideoReady(true)}
            />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <p className="text-lg mb-4 font-medium">{service.description}</p>
            <p className="text-gray-600 leading-relaxed">{service.longDescription}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const styleTag = document.createElement("style")
styleTag.appendChild(document.createTextNode(fadeInKeyframes))
document.head.appendChild(styleTag)

