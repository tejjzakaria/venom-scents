import React from 'react';
import Link from 'next/link';
import { getTranslations } from '../lib/i18n';
import { getStore } from '../lib/api';
import type { Locale } from '../lib/locale';

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

const Footer = async ({ locale }: { locale: Locale }) => {
  const [t, store] = await Promise.all([
    Promise.resolve(getTranslations(locale).footer),
    getStore(),
  ]);

  const sc           = store?.content?.[locale] ?? store?.content?.['en'];
  const instagramRaw = sc?.contact?.instagram ?? null;
  const instagramHandle = instagramRaw?.replace(/^@/, '') ?? null;
  const phone        = store?.phone ?? null;
  const phoneHref    = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;
  const igHref       = instagramHandle ? `https://instagram.com/${instagramHandle}` : null;

  return (
    <footer className="bg-black text-white py-16 px-[5%]">
      <div className="max-w-[1280px] mx-auto">

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_2fr_1fr] md:gap-8 md:items-center">

          {/* Left — Brand */}
          <div className="text-start">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-2">VENOM</h2>
            <p className="text-xs text-gray-400 font-sans">{t.tagline}</p>
          </div>

          {/* Center — Nav */}
          <div className="flex justify-center">
            <nav className="flex gap-8">
              <Link href="/shop"    className="text-sm font-sans hover:text-gray-300 transition-colors">{t.shopAll}</Link>
              <Link href="/about"   className="text-sm font-sans hover:text-gray-300 transition-colors">{t.ourStory}</Link>
              <Link href="/"        className="text-sm font-sans hover:text-gray-300 transition-colors">{t.home}</Link>
              <Link href="/contact" className="text-sm font-sans hover:text-gray-300 transition-colors">{t.contact}</Link>
            </nav>
          </div>

          {/* Right — Social + Phone + Legal */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-4">
              {igHref && (
                <a href={igHref} target="_blank" rel="noopener noreferrer"
                   className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <IconInstagram />
                </a>
              )}
              {phone && phoneHref && (
                <a href={phoneHref} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-sans">
                  <IconPhone />
                  {phone}
                </a>
              )}
            </div>
            <p className="text-[10px] text-gray-500 font-sans">© {new Date().getFullYear()} VENOM</p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center space-y-6">

          {/* Brand */}
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-2">VENOM</h2>
            <p className="text-xs text-gray-400 font-sans">{t.tagline}</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col items-center space-y-4">
            <Link href="/shop"    className="text-sm font-sans hover:text-gray-300 transition-colors">{t.shopAll}</Link>
            <Link href="/about"   className="text-sm font-sans hover:text-gray-300 transition-colors">{t.ourStory}</Link>
            <Link href="/"        className="text-sm font-sans hover:text-gray-300 transition-colors">{t.home}</Link>
            <Link href="/contact" className="text-sm font-sans hover:text-gray-300 transition-colors">{t.contact}</Link>
          </nav>

          {/* Social + Phone */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-5">
              {igHref && (
                <a href={igHref} target="_blank" rel="noopener noreferrer"
                   className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <IconInstagram />
                </a>
              )}
              {phone && phoneHref && (
                <a href={phoneHref} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-sans">
                  <IconPhone />
                  {phone}
                </a>
              )}
            </div>
            <p className="text-[10px] text-gray-500 font-sans">© {new Date().getFullYear()} VENOM</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
