"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { sendDemoRequest } from "@/actions/index"
import TrackingDemo from "@/components/TrackingDemo"
import { CheckCircle, AlertCircle, Video, CalendarClock, UserCheck } from "lucide-react"

const copy = {
  en: {
    title: "See the portal live",
    sub: "Book a 20-minute Google Meet. We'll walk you through a real shipment in the client portal — live statuses, documents, duty receipts, and email updates.",
    points: [
      { icon: Video, text: "20-minute Google Meet, no commitment" },
      { icon: UserCheck, text: "A real walkthrough of the portal, not slides" },
      { icon: CalendarClock, text: "We confirm your slot by email the same day" },
    ],
    formTitle: "Book your live demo",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company (optional)",
    preferredTime: "Preferred day & time",
    preferredTimePlaceholder: "e.g. Tuesday afternoon, or any morning",
    notes: "Anything specific you want to see? (optional)",
    submit: "Request Demo",
    submitting: "Sending...",
    success: "Request received — we'll email you shortly to confirm your Google Meet.",
    error: "Something went wrong. Please try again or call +961 1 456 000.",
    required: "Please fill in your name, email and phone.",
  },
  ar: {
    title: "شاهد البوابة مباشرة",
    sub: "احجز اجتماع Google Meet لمدة ٢٠ دقيقة. نعرض لك شحنة حقيقية في بوابة العملاء — حالات مباشرة، مستندات، إيصالات رسوم، وتحديثات بريد إلكتروني.",
    points: [
      { icon: Video, text: "اجتماع Google Meet لمدة ٢٠ دقيقة، بدون أي التزام" },
      { icon: UserCheck, text: "جولة حقيقية في البوابة، وليس شرائح عرض" },
      { icon: CalendarClock, text: "نؤكد موعدك بالبريد الإلكتروني في اليوم نفسه" },
    ],
    formTitle: "احجز عرضك المباشر",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    company: "الشركة (اختياري)",
    preferredTime: "اليوم والوقت المفضّلان",
    preferredTimePlaceholder: "مثلاً: الثلاثاء بعد الظهر، أو أي صباح",
    notes: "هل هناك شيء محدد تريد رؤيته؟ (اختياري)",
    submit: "اطلب العرض",
    submitting: "جارٍ الإرسال...",
    success: "تم استلام الطلب — سنراسلك قريباً لتأكيد موعد Google Meet.",
    error: "حدث خطأ. حاول مجدداً أو اتصل على ‎+961 1 456 000.",
    required: "يرجى إدخال الاسم والبريد الإلكتروني والهاتف.",
  },
}

export default function DemoPage() {
  const { language } = useLanguage()
  const t = copy[language]
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (!formData.get("name") || !formData.get("email") || !formData.get("phone")) {
      setStatus("error")
      setErrorMsg(t.required)
      return
    }

    setStatus("submitting")
    try {
      const result = await sendDemoRequest(formData)
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

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="container relative mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{t.title}</h1>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.sub}</p>
              <ul className="mt-8 space-y-4">
                {t.points.map((p) => (
                  <li key={p.text} className="flex items-center gap-3 text-slate-200">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15">
                      <p.icon size={18} className="text-sky-400" />
                    </span>
                    <span className="text-sm sm:text-base">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block pb-8">
              <TrackingDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto rounded-3xl ring-1 ring-slate-200 shadow-lg shadow-slate-900/5 p-6 sm:p-10">
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
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input name="email" type="email" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t.phone} <span className="text-red-500">*</span>
                  </label>
                  <input name="phone" type="tel" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.company}</label>
                  <input name="company" type="text" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.preferredTime}</label>
                <input name="preferredTime" type="text" placeholder={t.preferredTimePlaceholder} className={inputClass} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.notes}</label>
                <textarea name="notes" rows={3} className={inputClass} />
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
      </section>
    </div>
  )
}
