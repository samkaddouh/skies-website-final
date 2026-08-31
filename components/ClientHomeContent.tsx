"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import TrackingDemo from "@/components/TrackingDemo"
import {
  Plane,
  Ship,
  FileCheck,
  ShieldCheck,
  Thermometer,
  Truck,
  Radar,
  FolderOpen,
  MailCheck,
  Receipt,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const copy = {
  en: {
    heroBadge: "Licensed customs broker — Port of Beirut & Beirut Airport",
    heroTitle1: "We Move It,",
    heroTitle2: "You Track It.",
    heroSub:
      "Air & Sea Freight · Customs Clearance · Live Tracking. Every shipment gets a live status in your client portal — with an email in your inbox at every stage.",
    ctaQuote: "Get a Quote",
    ctaDemo: "Schedule a Live Demo",
    digitalTitle: "The only clearing company in Lebanon with a real client portal",
    digitalSub:
      "While others update you by phone call, every Skies client gets a portal account. No guessing, no chasing — you see what we see.",
    features: [
      {
        icon: Radar,
        title: "Live shipment statuses",
        desc: "From In Transit to Delivered — every stage of the clearing lifecycle, updated in real time.",
      },
      {
        icon: FolderOpen,
        title: "Documents & duty receipts online",
        desc: "Bills of lading, delivery orders, and the official customs duties receipts — in your account, not in someone's drawer.",
      },
      {
        icon: MailCheck,
        title: "Automatic email updates",
        desc: "The moment your shipment changes status, you get an email. You never have to ask 'where is my container?'",
      },
      {
        icon: Receipt,
        title: "Itemized payment requests",
        desc: "Fee requests broken down line by line. You approve what you can see.",
      },
    ],
    servicesTitle: "What we do",
    servicesSub: "Full clearing and freight coverage — and you track every step of it.",
    services: [
      {
        icon: Plane,
        title: "Air Freight",
        desc: "Urgent cargo via Beirut Airport, door-to-door or airport-to-airport.",
        id: "air-freight",
      },
      {
        icon: Ship,
        title: "Sea Freight — FCL & LCL",
        desc: "Full containers or consolidated cargo through the Port of Beirut.",
        id: "sea-freight",
      },
      {
        icon: FileCheck,
        title: "Customs Clearance",
        desc: "In-house licensed brokers at the port and airport. Our core craft.",
        id: "customs-clearance",
      },
      {
        icon: ShieldCheck,
        title: "Regulatory Compliance",
        desc: "MOH, MOA, MOE and IRI approvals for pharma, food, cosmetics and medical devices.",
        id: "regulatory-compliance",
      },
      {
        icon: Thermometer,
        title: "Cold-Chain Handling",
        desc: "2–8°C pharma shipments with conditional-release procedures done right.",
        id: "cold-chain",
      },
      {
        icon: Truck,
        title: "Door-to-Door Delivery",
        desc: "From origin pickup to your warehouse floor, one accountable partner.",
        id: "door-to-door",
      },
    ],
    trackNote: "Track every step in your portal",
    statsTitle: "A family company running on its own technology",
    stats: [
      { value: "25+", label: "Years clearing at Beirut" },
      { value: "450+", label: "Companies supported" },
      { value: "7", label: "Live tracking stages per shipment" },
      { value: "100%", label: "Shipments visible in the portal" },
    ],
    ctaTitle: "Ready to see your shipments — not chase them?",
    ctaSub: "Tell us what you're shipping. We'll quote it, clear it, and you'll track it live.",
    ctaPrimary: "Request a Quote",
    ctaSecondary: "Client Login",
  },
  ar: {
    heroBadge: "مخلّص جمركي مرخّص — مرفأ بيروت ومطار بيروت",
    heroTitle1: "نحن ننقلها،",
    heroTitle2: "أنت تتابعها.",
    heroSub:
      "شحن جوي وبحري · تخليص جمركي · تتبّع مباشر. كل شحنة لها حالة مباشرة في بوابة العملاء — مع بريد إلكتروني إلى صندوقك في كل مرحلة.",
    ctaQuote: "اطلب عرض سعر",
    ctaDemo: "احجز عرضاً مباشراً",
    digitalTitle: "شركة التخليص الوحيدة في لبنان مع بوابة عملاء حقيقية",
    digitalSub:
      "بينما يبلّغك الآخرون عبر الهاتف، كل عميل لدى سكايز لديه حساب في البوابة. لا تخمين ولا ملاحقة — ترى ما نراه.",
    features: [
      {
        icon: Radar,
        title: "حالات الشحنات مباشرة",
        desc: "من قيد النقل إلى تم التسليم — كل مرحلة من دورة التخليص، محدّثة لحظياً.",
      },
      {
        icon: FolderOpen,
        title: "المستندات وإيصالات الرسوم عبر الإنترنت",
        desc: "بوالص الشحن، أذونات التسليم، وإيصالات الرسوم الجمركية الرسمية — في حسابك.",
      },
      {
        icon: MailCheck,
        title: "تحديثات تلقائية بالبريد الإلكتروني",
        desc: "لحظة تغيّر حالة شحنتك، يصلك بريد إلكتروني. لن تسأل بعد اليوم «أين حاويتي؟»",
      },
      {
        icon: Receipt,
        title: "طلبات دفع مفصّلة",
        desc: "طلبات الرسوم مفصّلة بنداً بنداً. توافق على ما تراه.",
      },
    ],
    servicesTitle: "ماذا نقدّم",
    servicesSub: "تغطية كاملة للتخليص والشحن — وأنت تتابع كل خطوة.",
    services: [
      {
        icon: Plane,
        title: "الشحن الجوي",
        desc: "شحنات عاجلة عبر مطار بيروت، من الباب إلى الباب أو من مطار إلى مطار.",
        id: "air-freight",
      },
      {
        icon: Ship,
        title: "الشحن البحري — حاويات كاملة ومجمّعة",
        desc: "حاويات كاملة أو شحن مجمّع عبر مرفأ بيروت.",
        id: "sea-freight",
      },
      {
        icon: FileCheck,
        title: "التخليص الجمركي",
        desc: "مخلّصون مرخّصون من فريقنا في المرفأ والمطار. اختصاصنا الأساسي.",
        id: "customs-clearance",
      },
      {
        icon: ShieldCheck,
        title: "الامتثال التنظيمي",
        desc: "موافقات وزارات الصحة والزراعة والاقتصاد وIRI للأدوية والأغذية ومستحضرات التجميل والأجهزة الطبية.",
        id: "regulatory-compliance",
      },
      {
        icon: Thermometer,
        title: "سلسلة التبريد",
        desc: "شحنات أدوية بدرجة 2–8 مئوية مع إجراءات الإفراج المشروط بدقة.",
        id: "cold-chain",
      },
      {
        icon: Truck,
        title: "التوصيل من الباب إلى الباب",
        desc: "من الاستلام في المنشأ إلى مستودعك، شريك واحد مسؤول.",
        id: "door-to-door",
      },
    ],
    trackNote: "تابع كل خطوة في بوابتك",
    statsTitle: "شركة عائلية تعمل بتقنيتها الخاصة",
    stats: [
      { value: "+25", label: "عاماً من التخليص في بيروت" },
      { value: "+450", label: "شركة نخدمها" },
      { value: "7", label: "مراحل تتبّع مباشر لكل شحنة" },
      { value: "100%", label: "من الشحنات ظاهرة في البوابة" },
    ],
    ctaTitle: "جاهز لترى شحناتك — بدل أن تلاحقها؟",
    ctaSub: "أخبرنا ماذا تشحن. نسعّرها، نخلّصها، وأنت تتابعها مباشرة.",
    ctaPrimary: "اطلب عرض سعر",
    ctaSecondary: "دخول العملاء",
  },
}

export default function ClientHomeContent() {
  const { language, dir } = useLanguage()
  const t = copy[language]
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Subtle radial glow + grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-sky-500/20 blur-3xl" />

        <div className="container relative mx-auto px-6 sm:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-sky-300">
                <ShieldCheck size={15} />
                {t.heroBadge}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                {t.heroTitle1}
                <br />
                <span className="text-sky-400">{t.heroTitle2}</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">{t.heroSub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25"
                >
                  {t.ctaQuote}
                  <Arrow size={18} />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/20 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {t.ctaDemo}
                </Link>
              </div>
            </div>

            <div className="pb-8 lg:pb-0">
              <TrackingDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIGITAL-FIRST ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">{t.digitalTitle}</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t.digitalSub}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-slate-50 ring-1 ring-slate-200/70 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                  <f.icon size={22} className="text-sky-600" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t.servicesTitle}</h2>
              <p className="mt-3 text-lg text-slate-400">{t.servicesSub}</p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition-colors shrink-0"
            >
              {language === "ar" ? "كل الخدمات" : "All services"}
              <Arrow size={17} />
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.map((s) => (
              <Link
                key={s.id}
                href={`/services?section=${s.id}`}
                className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/[0.08] hover:ring-sky-400/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/15 shrink-0">
                    <s.icon size={20} className="text-sky-400" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                <p className="mt-4 text-xs font-medium text-sky-400/80 flex items-center gap-1.5">
                  <Radar size={13} />
                  {t.trackNote}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <section className="py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight text-slate-950">{t.statsTitle}</h2>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {t.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold tabular-nums text-sky-600">{s.value}</p>
                <p className="mt-2 text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-14 md:px-16 md:py-16 text-center">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-sky-500/25 blur-3xl" />
            <h2 className="relative text-3xl md:text-4xl font-bold tracking-tight text-white">{t.ctaTitle}</h2>
            <p className="relative mt-4 text-lg text-slate-300">{t.ctaSub}</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors"
              >
                {t.ctaPrimary}
                <Arrow size={18} />
              </Link>
              <a
                href="https://skieslogistics.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-white/5 ring-1 ring-white/20 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
