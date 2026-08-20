"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  Plane,
  Ship,
  FileCheck,
  ShieldCheck,
  Thermometer,
  Truck,
  Radar,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const copy = {
  en: {
    heroTitle: "Services",
    heroSub:
      "Freight, clearance, and compliance — handled by one licensed team at the Port of Beirut and Beirut Airport. Every service below ends the same way: with a live status in your portal.",
    ctaQuote: "Get a Quote",
    trackLine: "And you track every step of it — live in your portal, with an email at every stage.",
    services: [
      {
        id: "air-freight",
        icon: Plane,
        title: "Air Freight",
        lead: "Urgent cargo through Beirut Airport, without the airport chaos.",
        body: "We book, consolidate, and receive air shipments at Beirut Rafic Hariri International Airport — airport-to-airport or door-to-door. From AWB issuance to airline follow-up, one team owns the file from origin to release.",
        points: [
          "Import & export via Beirut Airport (BEY)",
          "EXW and FOB pickups coordinated with our origin agents",
          "Priority handling for urgent and time-critical cargo",
          "AWB and all documents uploaded to your portal account",
        ],
      },
      {
        id: "sea-freight",
        icon: Ship,
        title: "Sea Freight — FCL & LCL",
        lead: "Full containers or consolidated cargo through the Port of Beirut.",
        body: "Whether it's a full 40' container or a few pallets in consolidation, we manage the ocean leg and everything after it: shipping-line follow-up, delivery order collection, port handling, and gate-out.",
        points: [
          "FCL: 20', 40', 40'HC, reefer and special equipment",
          "LCL consolidation for smaller shipments",
          "D/O collection and shipping-line coordination handled for you",
          "B/L and duties receipts visible in your portal",
        ],
      },
      {
        id: "customs-clearance",
        icon: FileCheck,
        title: "Customs Clearance",
        lead: "Our core craft — in-house licensed brokers, not subcontractors.",
        body: "Skies is a licensed customs clearing company. Our own brokers work the Port of Beirut and Beirut Airport daily: tariff classification, declarations, inspections, and release. No middlemen, no black box — you see the official duties receipt in your account.",
        points: [
          "Licensed in-house brokers at port and airport",
          "Tariff classification and duty estimation before you commit",
          "Inspection attendance and follow-up until release",
          "Official customs duties receipts uploaded to your portal",
        ],
      },
      {
        id: "regulatory-compliance",
        icon: ShieldCheck,
        title: "Regulatory Compliance",
        lead: "MOH, MOA, MOE and IRI approvals — before your cargo becomes a problem.",
        body: "Pharma, food, cosmetics, and medical devices don't clear on customs paperwork alone. We manage ministry approvals end-to-end: Ministry of Public Health, Agriculture, Economy, and IRI conformity — filed correctly, followed up daily.",
        points: [
          "Pharmaceuticals & medical devices — MOH import licenses",
          "Food & agricultural products — MOA permits",
          "Cosmetics and consumer goods — MOH / MOE requirements",
          "IRI conformity certificates coordinated with the port file",
        ],
      },
      {
        id: "cold-chain",
        icon: Thermometer,
        title: "Cold-Chain Handling",
        lead: "2–8°C pharma shipments, with conditional release done right.",
        body: "Temperature-sensitive cargo doesn't wait in line. We coordinate cold-room storage, priority processing, and conditional-release procedures with MOH so your 2–8°C shipments move from aircraft to cold truck to your warehouse without breaking the chain.",
        points: [
          "2–8°C and controlled-temperature pharma handling",
          "Conditional-release procedures with the Ministry of Public Health",
          "Cold-room coordination at Beirut Airport",
          "Refrigerated last-mile delivery to your facility",
        ],
      },
      {
        id: "door-to-door",
        icon: Truck,
        title: "Door-to-Door Delivery",
        lead: "From your supplier's dock to your warehouse floor — one accountable partner.",
        body: "We close the loop: origin pickup, freight, clearance, and final delivery anywhere in Lebanon on our coordinated trucks. One contract, one point of contact, one portal showing the whole journey.",
        points: [
          "Origin pickup via our network of agents (EXW)",
          "Coordinated trucking across Lebanon",
          "Proof of delivery recorded in your shipment file",
          "One invoice, itemized line by line",
        ],
      },
    ],
    ctaTitle: "Not sure which service fits?",
    ctaSub: "Tell us what you're shipping — we'll tell you exactly how it moves and what it costs.",
  },
  ar: {
    heroTitle: "خدماتنا",
    heroSub:
      "شحن وتخليص وامتثال — يديرها فريق واحد مرخّص في مرفأ بيروت ومطار بيروت. وكل خدمة أدناه تنتهي بالطريقة نفسها: حالة مباشرة في بوابتك.",
    ctaQuote: "اطلب عرض سعر",
    trackLine: "وأنت تتابع كل خطوة — مباشرة في بوابتك، مع بريد إلكتروني في كل مرحلة.",
    services: [
      {
        id: "air-freight",
        icon: Plane,
        title: "الشحن الجوي",
        lead: "شحنات عاجلة عبر مطار بيروت، من دون فوضى المطار.",
        body: "نحجز وندمج ونستلم الشحنات الجوية في مطار رفيق الحريري الدولي — من مطار إلى مطار أو من الباب إلى الباب. من إصدار بوليصة الشحن إلى متابعة شركة الطيران، فريق واحد يتولى الملف من المنشأ حتى الإفراج.",
        points: [
          "استيراد وتصدير عبر مطار بيروت (BEY)",
          "استلام EXW وFOB بالتنسيق مع وكلائنا في بلد المنشأ",
          "معالجة أولوية للشحنات العاجلة والحساسة للوقت",
          "بوليصة الشحن وجميع المستندات في حسابك على البوابة",
        ],
      },
      {
        id: "sea-freight",
        icon: Ship,
        title: "الشحن البحري — حاويات كاملة ومجمّعة",
        lead: "حاويات كاملة أو شحن مجمّع عبر مرفأ بيروت.",
        body: "سواء كانت حاوية 40 قدماً كاملة أو بضع طبليات مجمّعة، ندير الرحلة البحرية وكل ما بعدها: متابعة خط الشحن، استلام إذن التسليم، معاملات المرفأ، والخروج من البوابة.",
        points: [
          "حاويات كاملة: 20 و40 و40HC ومبرّدة ومعدات خاصة",
          "تجميع الشحنات الصغيرة (LCL)",
          "استلام إذن التسليم والتنسيق مع خط الشحن نيابة عنك",
          "بوليصة الشحن وإيصالات الرسوم ظاهرة في بوابتك",
        ],
      },
      {
        id: "customs-clearance",
        icon: FileCheck,
        title: "التخليص الجمركي",
        lead: "اختصاصنا الأساسي — مخلّصون مرخّصون من فريقنا، لا متعاقدون.",
        body: "سكايز شركة تخليص جمركي مرخّصة. مخلّصونا يعملون يومياً في مرفأ بيروت ومطار بيروت: التصنيف الجمركي، البيانات، المعاينات، والإفراج. لا وسطاء ولا غموض — ترى إيصال الرسوم الرسمي في حسابك.",
        points: [
          "مخلّصون مرخّصون من فريقنا في المرفأ والمطار",
          "التصنيف الجمركي وتقدير الرسوم قبل أن تلتزم",
          "حضور المعاينات والمتابعة حتى الإفراج",
          "إيصالات الرسوم الجمركية الرسمية في بوابتك",
        ],
      },
      {
        id: "regulatory-compliance",
        icon: ShieldCheck,
        title: "الامتثال التنظيمي",
        lead: "موافقات وزارات الصحة والزراعة والاقتصاد وIRI — قبل أن تصبح شحنتك مشكلة.",
        body: "الأدوية والأغذية ومستحضرات التجميل والأجهزة الطبية لا تُخلَّص بالأوراق الجمركية وحدها. ندير موافقات الوزارات من البداية للنهاية: وزارة الصحة العامة، الزراعة، الاقتصاد، وشهادات مطابقة IRI — تُقدَّم بشكل صحيح وتُتابَع يومياً.",
        points: [
          "الأدوية والأجهزة الطبية — تراخيص استيراد من وزارة الصحة",
          "الأغذية والمنتجات الزراعية — تصاريح وزارة الزراعة",
          "مستحضرات التجميل والسلع الاستهلاكية — متطلبات الصحة والاقتصاد",
          "شهادات مطابقة IRI بالتنسيق مع ملف المرفأ",
        ],
      },
      {
        id: "cold-chain",
        icon: Thermometer,
        title: "سلسلة التبريد",
        lead: "شحنات أدوية بدرجة 2–8 مئوية، مع إفراج مشروط بإجراءات صحيحة.",
        body: "الشحنات الحساسة للحرارة لا تنتظر في الطابور. ننسّق التخزين المبرّد والمعالجة ذات الأولوية وإجراءات الإفراج المشروط مع وزارة الصحة، لتنتقل شحناتك من الطائرة إلى الشاحنة المبرّدة إلى مستودعك من دون كسر السلسلة.",
        points: [
          "معالجة أدوية بدرجة 2–8 مئوية وحرارة مضبوطة",
          "إجراءات الإفراج المشروط مع وزارة الصحة العامة",
          "تنسيق الغرف المبرّدة في مطار بيروت",
          "توصيل مبرّد حتى منشأتك",
        ],
      },
      {
        id: "door-to-door",
        icon: Truck,
        title: "التوصيل من الباب إلى الباب",
        lead: "من رصيف المورّد إلى مستودعك — شريك واحد مسؤول.",
        body: "نغلق الدائرة: الاستلام في المنشأ، الشحن، التخليص، والتسليم النهائي في أي مكان في لبنان عبر شاحناتنا المنسّقة. عقد واحد، جهة اتصال واحدة، وبوابة واحدة تعرض الرحلة كاملة.",
        points: [
          "الاستلام في المنشأ عبر شبكة وكلائنا (EXW)",
          "نقل برّي منسّق في جميع أنحاء لبنان",
          "إثبات التسليم مسجّل في ملف شحنتك",
          "فاتورة واحدة، مفصّلة بنداً بنداً",
        ],
      },
    ],
    ctaTitle: "لست متأكداً أي خدمة تناسبك؟",
    ctaSub: "أخبرنا ماذا تشحن — ونخبرك بالضبط كيف تتحرك شحنتك وكم تكلّف.",
  },
}

function ServicesContent() {
  const { language, dir } = useLanguage()
  const searchParams = useSearchParams()
  const t = copy[language]
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      // Wait a tick for layout, then scroll
      requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [searchParams])

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="container relative mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{t.heroTitle}</h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.heroSub}</p>
            <Link
              href="/quote"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors"
            >
              {t.ctaQuote}
              <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Service sections */}
      <div className="container mx-auto px-6 sm:px-8 py-14 md:py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {t.services.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 rounded-3xl ring-1 ring-slate-200 p-7 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100">
                  <s.icon size={24} className="text-sky-600" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">{s.title}</h2>
                  <p className="mt-1 text-base font-medium text-sky-600">{s.lead}</p>
                </div>
              </div>
              <p className="mt-5 text-slate-600 leading-relaxed">{s.body}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check size={16} strokeWidth={2.5} className="text-sky-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Radar size={15} className="text-sky-500 shrink-0" />
                {t.trackLine}
              </p>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-14 rounded-3xl bg-slate-950 px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t.ctaTitle}</h2>
          <p className="mt-3 text-slate-300">{t.ctaSub}</p>
          <Link
            href="/quote"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors"
          >
            {t.ctaQuote}
            <Arrow size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  )
}
