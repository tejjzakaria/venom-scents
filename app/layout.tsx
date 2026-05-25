import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppWidget";
import { getLocale } from "./actions/locale";
import { getStore, getAvailableLocales } from "../lib/api";
import type { Locale } from "../lib/locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore();
  const name  = store?.name ?? 'Venom Scents';
  return {
    title:       { default: name, template: `%s | ${name}` },
    description: store?.desc ?? 'Premium fragrances crafted to turn heads.',
    icons:       { icon: store?.favicon || '/favicon.ico' },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, store] = await Promise.all([getLocale(), getStore()]);
  const availableLocales = getAvailableLocales(store);
  const effectiveLocale: Locale = availableLocales.length === 1 ? availableLocales[0] : locale;

  return (
    <html
      lang={effectiveLocale}
      dir={effectiveLocale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
      style={(store?.color ? { '--color-primary': store.color } : {}) as CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <Header locale={effectiveLocale} logo={store?.logo} availableLocales={availableLocales} />
        {children}
        <Footer locale={effectiveLocale} />
        {store?.phone && <WhatsAppWidget phone={store.phone} />}
      </body>
    </html>
  );
}
