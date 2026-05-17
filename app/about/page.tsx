import Image from "next/image";
import Link from "next/link";
import { getStore } from "../../lib/api";
import { getLocale } from "../actions/locale";

const VALUE_ICONS = [
  <svg key="shield" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg key="heart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>,
  <svg key="smile" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>,
];

const DEFAULT_STATS = [
  { value: "125K+", label: "Happy Customers" },
  { value: "4.8★",  label: "Average Rating" },
  { value: "12+",   label: "Signature Scents" },
  { value: "3yr",   label: "Of Craftsmanship" },
];

const DEFAULT_VALUES = [
  { title: "Uncompromising Quality",  description: "Every bottle is crafted with the finest fragrance ingredients, vetted by master perfumers to ensure a scent that is as complex as it is captivating." },
  { title: "Vegan & Cruelty-Free",    description: "We believe beauty should never come at another's expense. All Venom fragrances are 100% vegan and never tested on animals." },
  { title: "Made to Empower",         description: "Venom was born from the belief that a scent should do more than smell good — it should make you feel powerful, magnetic, and unapologetically yourself." },
];

const DEFAULT_TIMELINE = [
  { year: "2022", title: "The Spark",    text: "Venom was founded by a small team obsessed with one question: why do some people walk into a room and command it? We believed scent was the answer." },
  { year: "2023", title: "The Formula",  text: "After 18 months of R&D with master perfumers in Grasse, France, we developed our signature pheromone-infused formula — long-lasting, complex, and unforgettable." },
  { year: "2024", title: "The Movement", text: "Our first collection sold out in 72 hours. What started as an experiment became a community of 50,000 women who refuse to go unnoticed." },
  { year: "2025", title: "The Brand",    text: "Today Venom is worn by over 125,000 customers worldwide. We've expanded our line while staying true to the craft and conviction that started it all." },
];

export default async function AboutPage() {
  const [store, locale] = await Promise.all([getStore(), getLocale()]);
  const ac = (store?.content?.[locale] ?? store?.content?.['en'])?.about;

  const hero = {
    eyebrow:  ac?.hero?.eyebrow  ?? "Our Story",
    headline: ac?.hero?.headline ?? "Scent That Speaks Before You Do",
    subtitle: ac?.hero?.subtitle ?? "Venom was built on a single conviction — that the right fragrance doesn't just complement who you are, it announces it.",
  };

  const stats = ac?.stats ?? DEFAULT_STATS;

  const mission = {
    eyebrow:        ac?.mission?.eyebrow        ?? "Why We Exist",
    headlineBold:   ac?.mission?.headlineBold   ?? "We Didn't Create a Perfume.",
    headlineItalic: ac?.mission?.headlineItalic ?? "We Created a Feeling.",
    body1:          ac?.mission?.body1          ?? "Most fragrances are designed to smell pleasant. We asked a different question: what if a scent could shift how a room responds to you the moment you walk in?",
    body2:          ac?.mission?.body2          ?? "That obsession drove three years of research, collaboration with perfumers in Grasse, and an uncompromising commitment to ingredients that work on a level most brands never explore.",
    ctaText:        ac?.mission?.ctaText        ?? "Explore the Collection",
  };

  const values = {
    eyebrow:        ac?.values?.eyebrow        ?? "What We Stand For",
    headlineBold:   ac?.values?.headlineBold   ?? "Built on",
    headlineItalic: ac?.values?.headlineItalic ?? "Principles, Not Trends",
    items:          ac?.values?.items          ?? DEFAULT_VALUES,
  };

  const timeline = {
    eyebrow:        ac?.timeline?.eyebrow        ?? "How We Got Here",
    headlineBold:   ac?.timeline?.headlineBold   ?? "The",
    headlineItalic: ac?.timeline?.headlineItalic ?? "Venom Journey",
    items:          ac?.timeline?.items          ?? DEFAULT_TIMELINE,
  };

  const cta = {
    headline:     ac?.cta?.headline     ?? "Ready to Own Your Allure?",
    subtitle:     ac?.cta?.subtitle     ?? "Discover the collection crafted to turn heads and leave an impression that lingers long after you've left the room.",
    primaryCta:   ac?.cta?.primaryCta   ?? "Shop the Collection",
    secondaryCta: ac?.cta?.secondaryCta ?? "Back to Home",
  };

  return (
    <div className="flex flex-col flex-1">

      {/* Hero */}
      <section className="relative w-full min-h-[480px] lg:min-h-[560px] flex items-center overflow-hidden bg-[#0A0A0A]">
        <Image
          src="/images/about.webp"
          alt="Venom — Our Story"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r rtl:bg-linear-to-l from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 max-w-[1280px] py-24">
          <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="text-white font-serif font-bold text-[30px] md:text-[48px] lg:text-[72px] leading-[1.1] max-w-[640px]">
            {hero.headline}
          </h1>
          <p className="text-white/70 font-sans text-sm md:text-lg leading-relaxed mt-4 lg:mt-6 max-w-[480px]">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#B84040]">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="py-6 lg:py-8 text-center">
                <p className="text-white font-serif font-bold text-2xl lg:text-4xl">{s.value}</p>
                <p className="text-white/80 font-sans text-xs lg:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full py-14 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
                {mission.eyebrow}
              </p>
              <h2 className="text-black font-serif font-bold text-3xl lg:text-[48px] leading-[1.15] mb-5 lg:mb-6">
                {mission.headlineBold}{" "}
                <span className="italic text-[#B84040]">{mission.headlineItalic}</span>
              </h2>
              <p className="text-[#555555] font-sans text-base leading-[1.7] mb-5">{mission.body1}</p>
              <p className="text-[#555555] font-sans text-base leading-[1.7] mb-8">{mission.body2}</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-black text-white font-bold font-sans text-sm h-14 px-8 rounded-full hover:bg-[#B84040] transition-colors"
              >
                {mission.ctaText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#F5E6E6]">
                <Image
                  src="/images/hero.webp"
                  alt="The Venom philosophy"
                  width={720}
                  height={560}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              </div>
              <div className="absolute -bottom-6 ltr:-left-6 rtl:-right-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100 hidden lg:block">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#00A17C" stroke="#00A17C" strokeWidth="2">
                      <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                    </svg>
                  ))}
                </div>
                <p className="text-black font-bold font-sans text-sm">4.8 / 5 Stars</p>
                <p className="text-[#555555] font-sans text-xs">From 125,000+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-14 lg:py-24 bg-[#FFF8F8]">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
              {values.eyebrow}
            </p>
            <h2 className="text-2xl lg:text-[40px] font-serif">
              <span className="font-bold text-black">{values.headlineBold}</span>{" "}
              <span className="italic text-[#B84040]">{values.headlineItalic}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {values.items.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg border border-[#B84040] flex items-center justify-center flex-shrink-0">
                    {VALUE_ICONS[i % VALUE_ICONS.length]}
                  </div>
                  <h3 className="text-black font-bold font-sans text-lg">{v.title}</h3>
                </div>
                <p className="text-[#555555] font-sans text-sm leading-[1.7]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full py-14 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
              {timeline.eyebrow}
            </p>
            <h2 className="text-2xl lg:text-[40px] font-serif">
              <span className="font-bold text-black">{timeline.headlineBold}</span>{" "}
              <span className="italic text-[#B84040]">{timeline.headlineItalic}</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute ltr:left-[7px] rtl:right-[7px] lg:left-1/2 top-0 bottom-0 w-px bg-[#F5E6E6] lg:-translate-x-px" />
            <div className="flex flex-col gap-12">
              {timeline.items.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex gap-8 lg:gap-0 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className="absolute ltr:left-0 rtl:right-0 lg:left-1/2 top-1 w-4 h-4 rounded-full bg-[#B84040] border-2 border-white shadow-md ltr:lg:-translate-x-2 rtl:lg:translate-x-2 flex-shrink-0" />
                  <div className={`ps-10 lg:ps-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pe-16 lg:text-end" : "lg:ps-16 lg:text-start"}`}>
                    <span className="inline-block text-[#B84040] font-bold font-sans text-sm bg-[#FFF8F8] px-3 py-1 rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-black font-bold font-sans text-xl mb-2">{item.title}</h3>
                    <p className="text-[#555555] font-sans text-sm leading-[1.7] max-w-[360px] lg:ms-auto">{item.text}</p>
                  </div>
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-14 lg:py-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B84040]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B84040]/5 rounded-full blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 max-w-[1280px] text-center">
          <h2 className="text-white font-serif font-bold text-3xl md:text-4xl lg:text-[56px] leading-[1.1] mb-5 lg:mb-6">
            {cta.headline}
          </h2>
          <p className="text-white/60 font-sans text-sm md:text-lg max-w-[480px] mx-auto mb-8 lg:mb-10 px-4">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#B84040] text-white font-bold font-sans text-base h-14 px-10 rounded-full hover:bg-[#A03535] transition-colors"
            >
              {cta.primaryCta}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold font-sans text-base h-14 px-10 rounded-full border border-white/30 hover:border-white/60 transition-colors"
            >
              {cta.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
