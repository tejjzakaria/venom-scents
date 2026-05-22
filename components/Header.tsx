'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '../lib/locale';
import { setLocale } from '../app/actions/locale';
import { getTranslations } from '../lib/i18n';


interface HeaderProps {
  locale: Locale;
  logo?:  string;
}

function LogoMark({ logo, className }: { logo?: string; className: string }) {
  if (logo && (logo.startsWith('http') || logo.startsWith('/'))) {
    return <img src={logo} alt="logo" className="h-8 w-auto object-contain" />;
  }
  return <span className={className}>{logo ?? 'VENOM'}</span>;
}

const Header: React.FC<HeaderProps> = ({ locale, logo }) => {
  const router                  = useRouter();
  const pathname                = usePathname();
  const [, startTransition]     = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = getTranslations(locale);
  const navLinks = [
    { label: t.nav.home,    href: '/' },
    { label: t.nav.shop,    href: '/shop' },
    { label: t.nav.about,   href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  function switchLocale(next: Locale) {
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Announcement Bar */}
        <div className="h-10 bg-[#0A0A0A] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='noise' patternUnits='userSpaceOnUse' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='25' cy='25' r='1' fill='%23ffffff' opacity='0.1'/%3E%3Ccircle cx='75' cy='75' r='1' fill='%23ffffff' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
          <div className="absolute inset-0 opacity-20" style={{
            background: 'radial-gradient(circle at center, #400000 0%, transparent 50%, #400000 100%)',
          }} />
          <div className="flex items-center justify-center h-full relative z-10">
            <span className="text-white text-xs font-sans uppercase tracking-wider mr-2">
              {t.announcementBar}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            {/* Left — Hamburger */}
            <div className="flex items-center ps-4 md:ps-6">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="cursor-pointer p-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>

            {/* Center — Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/">
                <LogoMark logo={logo} className="text-black font-serif font-bold text-2xl md:text-3xl logo-font" />
              </Link>
            </div>

            {/* Right — Language switcher */}
            <div className="flex items-center gap-6 pe-4 md:pe-6">
              <div className="flex items-center gap-0.5">
                {(['en', 'fr', 'ar'] as const).map((l, i) => (
                  <React.Fragment key={l}>
                    {i > 0 && <span className="text-gray-200 text-[10px] select-none px-0.5">|</span>}
                    <button
                      onClick={() => switchLocale(l)}
                      className={`text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors px-1 py-0.5 ${
                        locale === l
                          ? 'text-[#B84040]'
                          : 'text-gray-400 hover:text-[#0F0F0F]'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <LogoMark logo={logo} className="text-black font-serif font-bold text-xl logo-font" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-4 pt-4 gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 text-sm uppercase tracking-widest py-3 px-3 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-[#FFF8F8] text-[#B84040] font-bold'
                    : 'text-[#0F0F0F] font-medium hover:bg-gray-50 hover:text-[#B84040]'
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B84040] flex-shrink-0" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer — Language switcher */}
        <div className="flex items-center gap-2 px-6 pt-6 mt-auto pb-8 border-t border-gray-100">
          {(['en', 'fr', 'ar'] as const).map((l) => (
            <button
              key={l}
              onClick={() => { switchLocale(l); setMenuOpen(false); }}
              className={`text-xs font-sans font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded-full border transition-colors ${
                locale === l
                  ? 'border-[#B84040] text-[#B84040] bg-[#FFF8F8]'
                  : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-[#0F0F0F]'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
