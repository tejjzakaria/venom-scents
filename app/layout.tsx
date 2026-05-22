import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppWidget from "../components/WhatsAppWidget";
import { getLocale } from "./actions/locale";
import { getStore } from "../lib/api";

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

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Venom Scents",
  description: "Premium fragrances crafted to turn heads.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, store] = await Promise.all([getLocale(), getStore()]);

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${notoSansArabic.variable} h-full antialiased`}
      style={(store?.color ? { '--color-primary': store.color } : {}) as CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <Header locale={locale} logo={store?.logo} />
        {children}
        <Footer locale={locale} />
        {store?.phone && <WhatsAppWidget phone={store.phone} />}
      </body>
    </html>
  );
}
