import { getStore } from "../../lib/api";
import { getLocale } from "../actions/locale";
import { getTranslations } from "../../lib/i18n";

export default async function ContactPage() {
  const [store, locale] = await Promise.all([getStore(), getLocale()]);
  const storeContent = store?.content?.[locale] ?? store?.content?.['en'];
  const ct = getTranslations(locale).contact;

  const channels = [
    store?.email && {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: ct.email,
      value: store.email,
      sub: ct.emailSub,
      href: `mailto:${store.email}`,
    },
    store?.phone && {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: ct.whatsapp,
      value: store.phone,
      sub: ct.whatsappSub,
      href: `https://wa.me/${store.phone.replace(/\D/g, "")}`,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: ct.instagram,
      value: storeContent?.contact?.instagram ?? "@venomscents",
      sub: ct.instagramSub,
      href: `https://instagram.com/${(storeContent?.contact?.instagram ?? "@venomscents").replace("@", "")}`,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
      label: ct.tiktok,
      value: storeContent?.contact?.tiktok ?? "@venomscents",
      sub: ct.tiktokSub,
      href: `https://tiktok.com/${storeContent?.contact?.tiktok ?? "@venomscents"}`,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; sub: string; href: string }[];

  const storeName = store?.name ?? "Venom";
  const currency  = store?.currency;

  return (
    <div className="flex flex-col flex-1">

      {/* Hero */}
      <section className="w-full bg-[#0A0A0A] py-14 lg:py-24">
        <div className="container mx-auto px-4 max-w-[1280px] text-center">
          <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
            {ct.eyebrow}
          </p>
          <h1 className="text-white font-serif font-bold text-[32px] md:text-[48px] lg:text-[64px] leading-[1.1] mb-5 lg:mb-6">
            Contact{" "}
            <span className="italic text-[#B84040]">{storeName}</span>
          </h1>
          <p className="text-white/60 font-sans text-sm md:text-lg max-w-[480px] mx-auto">
            {store?.desc
              ? store.desc
              : ct.fallbackDesc}
          </p>
          {currency && (
            <p className="text-white/30 font-sans text-xs mt-4 uppercase tracking-widest">
              {currency}
            </p>
          )}
        </div>
      </section>

      {/* Contact channels */}
      <section className="w-full py-14 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className="text-center mb-8 lg:mb-14">
            <p className="text-[#B84040] font-sans text-sm uppercase tracking-[0.2em] mb-4">
              {ct.reachUs}
            </p>
            <h2 className="text-2xl lg:text-[40px] font-serif">
              <span className="font-bold text-black">{ct.chooseYour}</span>{" "}
              <span className="italic text-[#B84040]">{ct.channel}</span>
            </h2>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${channels.length === 4 ? "lg:grid-cols-4" : channels.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#B84040] hover:shadow-lg transition-all duration-200"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              >
                <div className="w-14 h-14 rounded-xl border border-[#B84040] bg-[#FFF8F8] flex items-center justify-center mb-5 group-hover:bg-[#B84040] transition-colors duration-200 [&_svg]:group-hover:stroke-white">
                  {c.icon}
                </div>
                <p className="text-[#555555] font-sans text-xs uppercase tracking-wider mb-1">{c.label}</p>
                <p className="text-black font-bold font-sans text-base mb-1">{c.value}</p>
                <p className="text-[#555555] font-sans text-xs">{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
