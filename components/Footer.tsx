"use client"

import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { Clock, MapPin, Phone, Mail, ExternalLink } from "lucide-react"

const Footer: React.FC = () => {
  const { language } = useLanguage()
  const t = (key: TranslationKey) => translations[language][key]
  const ar = language === "ar"

  const links = [
    { id: "services", label: "services" },
    { id: "about", label: "about" },
    { id: "quote", label: "getQuote" },
    { id: "contact", label: "contact" },
  ]

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="text-white text-lg font-bold">Skies Shipping &amp; Clearing</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-sm">
              {ar
                ? "شحن جوي وبحري · تخليص جمركي · تتبّع مباشر — بيروت، لبنان."
                : "Air & Sea Freight · Customs Clearance · Live Tracking — Beirut, Lebanon."}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-sky-400 shrink-0" />
                <span>{ar ? "بيروت، لبنان" : "Beirut, Lebanon"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-sky-400 shrink-0" />
                <a href="tel:+9611456000" className="hover:text-white transition-colors tabular-nums" dir="ltr">
                  +961 1 456 000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-sky-400 shrink-0" />
                <a href="mailto:sales@skieslb.com" className="hover:text-white transition-colors">
                  sales@skieslb.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              {ar ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={`/${link.id}`} className="hover:text-white transition-colors">
                    {t(link.label as TranslationKey)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://skieslogistics.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
                >
                  {ar ? "بوابة العملاء" : "Client Portal"}
                  <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              <Clock size={15} className="text-sky-400" />
              {ar ? "ساعات العمل" : "Opening Hours"}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{ar ? "الاثنين–الجمعة: 8:00 صباحاً – 5:00 مساءً" : "Mon–Fri: 8:00 AM – 5:00 PM"}</li>
              <li className="text-slate-500">{ar ? "السبت–الأحد: مغلق" : "Sat–Sun: Closed"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Skies Shipping &amp; Clearing.{" "}
            {ar ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="font-medium text-slate-400">{ar ? "نحن ننقلها. أنت تتابعها." : "We Move It. You Track It."}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
