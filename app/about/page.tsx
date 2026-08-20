"use client"

import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import TrackingDemo from "@/components/TrackingDemo"
import { Eye, Cpu, HandshakeIcon, Receipt, ArrowRight, ArrowLeft } from "lucide-react"

const copy = {
  en: {
    heroTitle: "A clearing company that decided to work like a tech company",
    heroSub:
      "Skies Shipping & Clearing is a family-run, licensed customs clearing and freight company in Beirut. What makes us different isn't the license — it's what we built on top of it.",
    storyTitle: "Why we built our own portal",
    storyP1:
      "Clearing in Lebanon has always worked the same way: you hand your shipment to a broker, and then you call. You call to ask if the vessel arrived. You call to ask if customs released it. You call to ask what you owe — and you take the number on faith.",
    storyP2:
      "We decided our clients deserve what we see from the inside. So we built our own client portal: every shipment gets a live status through the full clearing lifecycle, every document and official duties receipt is uploaded to your account, and every status change sends you an email automatically. No competitor in Lebanon offers this.",
    storyP3:
      "We're still a family company. The same people answer the phone every time, and the owner knows your file. The technology doesn't replace that — it means when you do call us, it's never to ask \"where is my shipment?\"",
    valuesTitle: "What we run on",
    values: [
      {
        icon: Eye,
        title: "Transparency",
        desc: "We show clients the official customs duties receipts — the actual paper, in your account. You pay what the state charged, and you can see it.",
      },
      {
        icon: Cpu,
        title: "Our own technology",
        desc: "The portal isn't bought software. We built it around how clearing in Beirut actually works, and we improve it from client feedback.",
      },
      {
        icon: Receipt,
        title: "Itemized everything",
        desc: "Fee requests come broken down line by line. No lump sums, no 'miscellaneous charges'.",
      },
      {
        icon: HandshakeIcon,
        title: "Family accountability",
        desc: "25+ years at the Port of Beirut and Beirut Airport. Your file has an owner with a name, not a ticket number.",
      },
    ],
    portalTitle: "This is what your account looks like",
    portalSub:
      "Live statuses through the full lifecycle, documents and duty receipts, and automatic email updates — for every shipment, on every account. Accounts are created by us for our clients; ask for yours when you ship with us.",
    portalCta: "Book a live walkthrough",
    ctaTitle: "Ship once with us — you'll see the difference",
    ctaQuote: "Get a Quote",
    ctaContact: "Contact Us",
  },
  ar: {
    heroTitle: "شركة تخليص قررت أن تعمل كشركة تقنية",
    heroSub:
      "سكايز للشحن والتخليص شركة عائلية مرخّصة للتخليص الجمركي والشحن في بيروت. ما يميزنا ليس الرخصة — بل ما بنيناه فوقها.",
    storyTitle: "لماذا بنينا بوابتنا الخاصة",
    storyP1:
      "التخليص في لبنان عمل دائماً بالطريقة نفسها: تسلّم شحنتك إلى مخلّص، ثم تتصل. تتصل لتسأل إن وصلت الباخرة. تتصل لتسأل إن أفرج الجمرك عنها. تتصل لتسأل كم عليك أن تدفع — وتأخذ الرقم على الثقة.",
    storyP2:
      "قررنا أن عملاءنا يستحقون أن يروا ما نراه من الداخل. فبنينا بوابة العملاء الخاصة بنا: كل شحنة لها حالة مباشرة عبر دورة التخليص الكاملة، كل مستند وكل إيصال رسوم رسمي يُرفَع إلى حسابك، وكل تغيير في الحالة يرسل لك بريداً إلكترونياً تلقائياً. لا منافس في لبنان يقدّم هذا.",
    storyP3:
      "وما زلنا شركة عائلية. الأشخاص أنفسهم يجيبون على الهاتف في كل مرة، والمالك يعرف ملفك. التقنية لا تستبدل ذلك — بل تعني أنك حين تتصل بنا، لن يكون السؤال أبداً «أين شحنتي؟»",
    valuesTitle: "مبادئ عملنا",
    values: [
      {
        icon: Eye,
        title: "الشفافية",
        desc: "نُري عملاءنا إيصالات الرسوم الجمركية الرسمية — الورقة الحقيقية، في حسابك. تدفع ما فرضته الدولة، وتراه بنفسك.",
      },
      {
        icon: Cpu,
        title: "تقنيتنا الخاصة",
        desc: "البوابة ليست برنامجاً جاهزاً. بنيناها حول طريقة عمل التخليص في بيروت فعلياً، ونطوّرها من ملاحظات عملائنا.",
      },
      {
        icon: Receipt,
        title: "كل شيء مفصّل",
        desc: "طلبات الرسوم تصل مفصّلة بنداً بنداً. لا مبالغ مقطوعة ولا «رسوم متفرقة».",
      },
      {
        icon: HandshakeIcon,
        title: "مسؤولية عائلية",
        desc: "أكثر من ٢٥ عاماً في مرفأ بيروت ومطار بيروت. ملفك له مسؤول باسمه، وليس رقم تذكرة.",
      },
    ],
    portalTitle: "هكذا يبدو حسابك",
    portalSub:
      "حالات مباشرة عبر الدورة الكاملة، مستندات وإيصالات رسوم، وتحديثات بريد تلقائية — لكل شحنة، في كل حساب. الحسابات ننشئها نحن لعملائنا؛ اطلب حسابك عندما تشحن معنا.",
    portalCta: "احجز جولة مباشرة",
    ctaTitle: "اشحن معنا مرة واحدة — وسترى الفرق",
    ctaQuote: "اطلب عرض سعر",
    ctaContact: "اتصل بنا",
  },
}

const AboutPage: React.FC = () => {
  const { language, dir } = useLanguage()
  const t = copy[language]
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="container relative mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">{t.heroTitle}</h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.heroSub}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">{t.storyTitle}</h2>
            <div className="mt-6 space-y-5 text-slate-600 leading-relaxed text-lg">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
              <p>{t.storyP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 text-center">{t.valuesTitle}</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {t.values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white ring-1 ring-slate-200/70 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                  <v.icon size={22} className="text-sky-600" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal showcase */}
      <section className="py-16 md:py-24 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t.portalTitle}</h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.portalSub}</p>
              <Link
                href="/demo"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors"
              >
                {t.portalCta}
                <Arrow size={18} />
              </Link>
            </div>
            <div className="pb-8">
              <TrackingDemo />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{t.ctaTitle}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-sky-400 transition-colors"
            >
              {t.ctaQuote}
              <Arrow size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl ring-1 ring-slate-300 px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
