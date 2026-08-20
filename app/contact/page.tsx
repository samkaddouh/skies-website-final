"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { sendEmail } from "@/actions/index"
import { CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from "lucide-react"

const copy = {
  en: {
    heroTitle: "Talk to us",
    heroSub:
      "A question about a shipment, a rate, or a regulation — you'll reach someone who can actually answer it.",
    phone: "Phone",
    email: "Email",
    location: "Location",
    locationValue: "Beirut, Lebanon",
    hours: "Hours",
    hoursValue: "Mon–Fri, 8:00 AM – 5:00 PM",
    hoursClosed: "Sat–Sun closed",
    formTitle: "Send us a message",
    name: "Name",
    emailField: "Email",
    phoneField: "Phone",
    company: "Company (optional)",
    message: "Message",
    messagePlaceholder: "Tell us about your shipment or your question...",
    submit: "Send Message",
    submitting: "Sending...",
    success: "Message sent — we'll get back to you within one business day.",
    error: "Something went wrong. Please try again or call +961 1 456 000.",
    required: "Please fill in your name, email, phone, and a message of at least 10 characters.",
  },
  ar: {
    heroTitle: "تواصل معنا",
    heroSub: "سؤال عن شحنة أو سعر أو إجراء — ستصل إلى شخص يستطيع فعلاً الإجابة.",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    location: "الموقع",
    locationValue: "بيروت، لبنان",
    hours: "ساعات العمل",
    hoursValue: "الاثنين–الجمعة، 8:00 صباحاً – 5:00 مساءً",
    hoursClosed: "السبت–الأحد مغلق",
    formTitle: "أرسل لنا رسالة",
    name: "الاسم",
    emailField: "البريد الإلكتروني",
    phoneField: "الهاتف",
    company: "الشركة (اختياري)",
    message: "الرسالة",
    messagePlaceholder: "أخبرنا عن شحنتك أو سؤالك...",
    submit: "أرسل الرسالة",
    submitting: "جارٍ الإرسال...",
    success: "تم إرسال الرسالة — سنعاود التواصل معك خلال يوم عمل واحد.",
    error: "حدث خطأ. حاول مجدداً أو اتصل على ‎+961 1 456 000.",
    required: "يرجى إدخال الاسم والبريد الإلكتروني والهاتف ورسالة من ١٠ أحرف على الأقل.",
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const t = copy[language]
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const message = (formData.get("message") as string) || ""
    if (!formData.get("name") || !formData.get("email") || !formData.get("phone") || message.trim().length < 10) {
      setStatus("error")
      setErrorMsg(t.required)
      return
    }

    setStatus("submitting")
    try {
      const result = await sendEmail(formData)
      if (result.error) {
        setStatus("error")
        setErrorMsg(t.error)
      } else {
        setStatus("success")
        form.reset()
      }
    } catch {
      setStatus("error")
      setErrorMsg(t.error)
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"

  const infoCards = [
    { icon: Phone, label: t.phone, value: "+961 1 456 000", href: "tel:+9611456000", ltr: true },
    { icon: Mail, label: t.email, value: "sales@skieslb.com", href: "mailto:sales@skieslb.com", ltr: true },
    { icon: MapPin, label: t.location, value: t.locationValue },
    { icon: Clock, label: t.hours, value: t.hoursValue, sub: t.hoursClosed },
  ]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="container relative mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{t.heroTitle}</h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.heroSub}</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {infoCards.map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl ring-1 ring-slate-200 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100">
                    <c.icon size={20} className="text-sky-600" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-base font-semibold text-slate-900 hover:text-sky-600 transition-colors tabular-nums"
                        dir={c.ltr ? "ltr" : undefined}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-slate-900">{c.value}</p>
                    )}
                    {c.sub && <p className="text-sm text-slate-400 mt-0.5">{c.sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 rounded-3xl ring-1 ring-slate-200 shadow-lg shadow-slate-900/5 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">{t.formTitle}</h2>

              {status === "success" && (
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-green-50 ring-1 ring-green-200 px-4 py-3 text-sm text-green-700">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  {t.success}
                </div>
              )}
              {status === "error" && (
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Honeypot — invisible to humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input name="name" type="text" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t.emailField} <span className="text-red-500">*</span>
                    </label>
                    <input name="email" type="email" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t.phoneField} <span className="text-red-500">*</span>
                    </label>
                    <input name="phone" type="tel" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.company}</label>
                    <input name="company" type="text" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea name="message" rows={5} required placeholder={t.messagePlaceholder} className={inputClass} />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors disabled:opacity-60"
                >
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
