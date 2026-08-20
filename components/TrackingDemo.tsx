"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Plane, Ship, Mail, Check, FileText, Receipt } from "lucide-react"

type Stage = {
  en: string
  ar: string
  badge: string
  dot: string
  ring: string
}

const STAGES: Stage[] = [
  { en: "In Transit", ar: "قيد النقل", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", ring: "bg-blue-400" },
  {
    en: "D/O Ready",
    ar: "إذن التسليم جاهز",
    badge: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
    ring: "bg-purple-400",
  },
  {
    en: "D/O Received",
    ar: "تم استلام إذن التسليم",
    badge: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
    ring: "bg-indigo-400",
  },
  {
    en: "Under Inspection",
    ar: "قيد المعاينة",
    badge: "bg-teal-100 text-teal-700",
    dot: "bg-teal-500",
    ring: "bg-teal-400",
  },
  {
    en: "Under Clearance",
    ar: "قيد التخليص",
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
    ring: "bg-yellow-400",
  },
  {
    en: "Under Delivery",
    ar: "قيد التوصيل",
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    ring: "bg-orange-400",
  },
  {
    en: "Delivered",
    ar: "تم التسليم",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    ring: "bg-green-400",
  },
]

type Mode = "air" | "sea"

const SHIPMENTS: Record<
  Mode,
  {
    icon: typeof Plane
    ref: string
    routeEn: string
    routeAr: string
    docEn: string
    docAr: string
    times: string[]
  }
> = {
  air: {
    icon: Plane,
    ref: "AWB 235-4471 8926",
    routeEn: "Istanbul → Beirut (BEY)",
    routeAr: "اسطنبول ← بيروت (BEY)",
    docEn: "AWB.pdf",
    docAr: "بوليصة الشحن الجوي",
    times: ["Mon 09:14", "Wed 11:02", "Wed 15:47", "Thu 08:30", "Thu 13:21", "Fri 09:05", "Fri 12:38"],
  },
  sea: {
    icon: Ship,
    ref: "B/L MSCU-8847 1206",
    routeEn: "Shanghai → Port of Beirut",
    routeAr: "شنغهاي ← مرفأ بيروت",
    docEn: "B/L.pdf",
    docAr: "بوليصة الشحن البحري",
    times: ["12 May", "03 Jun", "03 Jun", "04 Jun", "05 Jun", "06 Jun", "06 Jun"],
  },
}

const STEP_MS = 2400
const DONE_HOLD_MS = 4200

export default function TrackingDemo() {
  const { language, dir } = useLanguage()
  const [mode, setMode] = useState<Mode>("air")
  const [step, setStep] = useState(0)
  const [toastKey, setToastKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const isLast = step >= STAGES.length - 1
    timerRef.current = setTimeout(
      () => {
        if (isLast) {
          // Full cycle done — switch to the other shipment
          setMode((m) => (m === "air" ? "sea" : "air"))
          setStep(0)
        } else {
          setStep(step + 1)
        }
        setToastKey((k) => k + 1)
      },
      isLast ? DONE_HOLD_MS : STEP_MS,
    )
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [step, mode])

  const selectMode = (m: Mode) => {
    if (m === mode) return
    setMode(m)
    setStep(0)
    setToastKey((k) => k + 1)
  }

  const stage = STAGES[step]
  const shipment = SHIPMENTS[mode]
  const label = (s: Stage) => (language === "ar" ? s.ar : s.en)

  return (
    <div dir={dir} className="relative w-full max-w-sm mx-auto select-none">
      {/* Phone-style card */}
      <div className="rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200 overflow-hidden">
        {/* Portal top bar */}
        <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between">
          <span className="text-white font-semibold text-sm tracking-tight">
            {language === "ar" ? "بوابة عملاء سكايز" : "Skies Client Portal"}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">
              {language === "ar" ? "مباشر" : "Live"}
            </span>
          </div>
        </div>

        {/* Air / Sea toggle */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => selectMode("air")}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === "air" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Plane size={13} className={mode === "air" ? "text-sky-500" : ""} />
              {language === "ar" ? "جوي" : "Air"}
            </button>
            <button
              type="button"
              onClick={() => selectMode("sea")}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === "sea" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Ship size={13} className={mode === "sea" ? "text-sky-500" : ""} />
              {language === "ar" ? "بحري" : "Sea"}
            </button>
          </div>
        </div>

        {/* Shipment header */}
        <div className="px-5 pt-3.5 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-slate-500 font-medium tabular-nums">{shipment.ref}</p>
              <p className="text-sm font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <shipment.icon size={14} className="text-sky-500 shrink-0" />
                {language === "ar" ? shipment.routeAr : shipment.routeEn}
              </p>
            </div>
            <span
              key={`${mode}-${step}`}
              className={`animate-status-pop inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${stage.badge}`}
            >
              {label(stage)}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 py-4">
          <ol className="space-y-0">
            {STAGES.map((s, i) => {
              const done = i < step
              const current = i === step
              return (
                <li key={s.en} className="flex gap-3">
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      {current && (
                        <span className={`animate-ping-slow absolute inline-flex h-3 w-3 rounded-full ${s.ring}`} />
                      )}
                      <span
                        className={`relative flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-500 ${
                          done || current ? s.dot : "bg-slate-200"
                        }`}
                      >
                        {done && <Check size={11} strokeWidth={3} className="text-white" />}
                      </span>
                    </span>
                    {i < STAGES.length - 1 && (
                      <span
                        className={`w-0.5 flex-1 min-h-[14px] transition-colors duration-500 ${
                          done ? "bg-slate-300" : "bg-slate-100"
                        }`}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <div className="pb-3 -mt-0.5 flex items-baseline justify-between gap-2 flex-1">
                    <span
                      className={`text-sm transition-colors duration-500 ${
                        current
                          ? "font-semibold text-slate-900"
                          : done
                            ? "font-medium text-slate-600"
                            : "text-slate-400"
                      }`}
                    >
                      {label(s)}
                    </span>
                    <span
                      className={`text-xs tabular-nums transition-opacity duration-500 ${
                        done || current ? "text-slate-400 opacity-100" : "opacity-0"
                      }`}
                    >
                      {shipment.times[i]}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Documents row */}
        <div className="px-5 pb-4 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 ring-1 ring-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <FileText size={13} className="text-sky-500" />
            {language === "ar" ? shipment.docAr : shipment.docEn}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg bg-slate-50 ring-1 ring-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-opacity duration-500 ${
              step >= 4 ? "opacity-100" : "opacity-40"
            }`}
          >
            <Receipt size={13} className="text-sky-500" />
            {language === "ar" ? "إيصال الرسوم" : "Duties receipt.pdf"}
          </span>
        </div>
      </div>

      {/* Email notification toast */}
      <div
        key={toastKey}
        className="animate-toast-in absolute -bottom-5 left-3 right-3 sm:-left-6 sm:right-auto sm:w-72 rounded-xl bg-white shadow-xl shadow-slate-900/15 ring-1 ring-slate-200 px-4 py-3 flex items-start gap-3 pointer-events-none"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100">
          <Mail size={15} className="text-sky-600" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-900">
            {language === "ar" ? "تم إرسال بريد إلكتروني للعميل" : "Email sent to client"}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {language === "ar" ? `تحديث الحالة: ${stage.ar}` : `Status update: ${stage.en}`}
          </p>
        </div>
      </div>
    </div>
  )
}
