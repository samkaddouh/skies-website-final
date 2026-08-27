"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations, type TranslationKey } from "@/utils/translations"
import { Menu, X, LogIn } from "lucide-react"

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const t = (key: TranslationKey) => translations[language][key]

  const navItems = [
    { href: "/", label: "home" },
    { href: "/services", label: "services" },
    { href: "/about", label: "about" },
    { href: "/quote", label: "getQuote" },
    { href: "/contact", label: "contact" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  if (!isMounted) {
    return null
  }

  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/Skies_Logo.png"
              alt="Skies Shipping & Clearing"
              width={215}
              height={125}
              className="h-12 w-auto md:h-16"
              priority
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-7 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-700 hover:text-sky-600 transition-colors text-[15px] font-medium"
                  >
                    {t(item.label as TranslationKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo"
                  className="text-sky-600 hover:text-sky-500 transition-colors text-[15px] font-semibold"
                >
                  {language === "ar" ? "احجز عرضاً" : "Book a Demo"}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
            >
              {language === "en" ? "عربي" : "English"}
            </button>
            <a
              href="https://skieslogistics.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
            >
              <LogIn size={15} />
              {language === "ar" ? "دخول العملاء" : "Client Login"}
            </a>
            <Link
              href="/demo#book"
              className="inline-flex items-center bg-slate-950 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-sm font-semibold"
            >
              {language === "ar" ? "ابدأ الآن" : "Get Started"}
            </Link>
          </div>

          <button
            className="lg:hidden text-slate-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100">
          <nav className="bg-white px-6 pt-3 pb-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2.5 text-slate-800 hover:text-sky-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.label as TranslationKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo"
                  className="block py-2.5 text-sky-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "ar" ? "احجز عرضاً" : "Book a Demo"}
                </Link>
              </li>
            </ul>
            <div className="mt-4 space-y-3">
              <Link
                href="/demo#book"
                className="flex items-center justify-center w-full bg-slate-950 text-white px-4 py-3 rounded-xl font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === "ar" ? "ابدأ الآن" : "Get Started"}
              </Link>
              <a
                href="https://skieslogistics.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-slate-600 px-4 py-3 rounded-xl border border-slate-200 font-medium"
              >
                <LogIn size={16} />
                {language === "ar" ? "دخول العملاء" : "Client Login"}
              </a>
              <button
                onClick={() => {
                  toggleLanguage()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-slate-600 px-4 py-2.5 rounded-xl border border-slate-200 font-medium"
              >
                {language === "en" ? "عربي" : "English"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
