"use client"

import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { Users, Globe, Award, TrendingUp } from "lucide-react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useEffect, useState, useRef } from "react"

const AboutPage: React.FC = () => {
  const { language } = useLanguage()
  const t = (key: TranslationKey) => translations[language][key]

  const [parent] = useAutoAnimate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [startCounting, setStartCounting] = useState(false)

  const observerRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    console.log(observerRef.current);

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [isLoaded])


  const whyChooseUs = [
    { icon: Award, statKey: "statCustomerSatisfaction", label: "customerSatisfaction", suffix: "%" },
    { icon: Users, statKey: "statHappyClients", label: "happyClients", suffix: "+" },
    { icon: TrendingUp, statKey: "statYearsExperience", label: "yearsExperience", suffix: "+" },
    { icon: Globe, statKey: "statGlobalNetwork", label: "countries", suffix: "+" },
  ]


  const AnimatedCounter = ({
    end,
    duration = 2000,
    suffix = "",
  }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    const startTimeRef = useRef<number | null>(null)

    useEffect(() => {
      if (startCounting && countRef.current !== end) {
        startTimeRef.current = Date.now()
        const interval = setInterval(() => {
          const currentTime = Date.now()
          const elapsedTime = currentTime - (startTimeRef.current ?? currentTime)
          const progress = Math.min(elapsedTime / duration, 1)
          const nextCount = Math.floor(end * progress)

          if (nextCount !== countRef.current) {
            countRef.current = nextCount
            setCount(nextCount)
          }

          if (progress === 1) {
            clearInterval(interval)
          }
        }, 16)

        return () => clearInterval(interval)
      }
    }, [end, duration])

    return (
      <span>
        {count}
        {suffix}
      </span>
    )
  };


  return (
    <div className="bg-white">
      {/* Updated Hero Section */}
      <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#828282]">
          <div className="absolute inset-0"></div>
        </div>

        <div className="container relative mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="animate-subtle-jump text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f8f9fa]">
              {t("aboutHeroTitle")}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-100">{t("aboutHeroSubtitle")}</p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </section>

      <div ref={parent}>
        {isLoaded && (
          <>

            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-1 gap-12">
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl font-bold mb-4">{t("aboutUsTtile")}</h3>
                    <p className="text-gray-600 leading-relaxed">{t("aboutUsDesciption")}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-4">{t("ourMission")}</h3>
                    <p className="text-gray-600 leading-relaxed">{t("missionStatement")}</p>
                  </div>
                </div>
              </div>
            </section>




            {/* Why Choose Us Section */}
            <section ref={observerRef} className="py-8 md:py-12 lg:py-16 bg-white">
              <div className="container mx-auto px-6 sm:px-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center">
                  {t("whyChooseUs")}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="text-center">
                      <item.icon size={48} className="mx-auto mb-4 text-[#0479c2]" strokeWidth={1.5} />
                      <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        <AnimatedCounter
                          end={t(item.statKey as TranslationKey) as unknown as number}
                          suffix={item.suffix}
                        />
                      </div>
                      <p className="text-lg text-gray-600">{t(item.label as TranslationKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>





          </>
        )}
      </div>
    </div>
  )
}

export default AboutPage

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const styleTag = document.createElement("style")
styleTag.appendChild(document.createTextNode(fadeInKeyframes))
document.head.appendChild(styleTag)

