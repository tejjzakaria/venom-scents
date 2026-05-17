'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Product } from '../lib/api';
import type { Locale } from '../lib/locale';
import { getTranslations } from '../lib/i18n';

const tagColour: Record<string, string> = {
  Bestseller: 'bg-[#0F0F0F] text-white',
  New:        'bg-[#B84040] text-white',
  Sale:       'bg-[#B84040] text-white',
  'Low Stock':'bg-amber-500 text-white',
};

function tagStyle(tag: string) {
  return tagColour[tag] ?? 'bg-gray-700 text-white';
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24"
          fill={s <= filled ? '#00A17C' : 'none'} stroke="#00A17C" strokeWidth="2">
          <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
        </svg>
      ))}
    </div>
  );
}

function formatCount(s: string): string {
  const n = parseInt(s, 10) || 0;
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function ShopClient({ products, locale }: { products: Product[]; locale: Locale }) {
  const tr  = getTranslations(locale);
  const t   = tr.shop;
  const allLabel = tr.collection.allProducts;
  const sortOptions = [
    { value: 'featured',   label: t.sortFeatured },
    { value: 'best',       label: t.sortBestSelling },
    { value: 'newest',     label: t.sortNewest },
    { value: 'price-asc',  label: t.sortPriceLow },
    { value: 'price-desc', label: t.sortPriceHigh },
  ];

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return [allLabel, ...unique];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, locale]);

  const [activeCategory, setActiveCategory] = useState(() => categories[0]);
  const [activeSort, setActiveSort]         = useState('featured');

  const filtered = useMemo(() => {
    let list = activeCategory === allLabel
      ? products
      : products.filter(p => p.category === activeCategory);

    switch (activeSort) {
      case 'price-asc':  list = [...list].sort((a, b) => a.price - b.price);                       break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price);                       break;
      case 'best':       list = [...list].sort((a, b) => b.sold - a.sold);                         break;
      case 'newest':     list = [...list].sort((a, b) => (a.tag === 'New' ? -1 : b.tag === 'New' ? 1 : 0)); break;
    }
    return list;
  }, [products, activeCategory, activeSort]);

  return (
    <div className="flex flex-col min-h-full bg-white">

      {/* ── Page Hero ───────────────────────────────────────────────── */}
      <div className="relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse 60% 80% at 20% 50%, #8B0000 0%, transparent 70%)',
        }} />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-20">
          <div className="flex items-center gap-2 mb-5 md:mb-6">
            <Link href="/" className="text-white/40 text-xs font-sans uppercase tracking-widest hover:text-white/70 transition-colors">{t.breadcrumbHome}</Link>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/70 text-xs font-sans uppercase tracking-widest">{t.breadcrumbShop}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
            <div>
              <h1 className="text-white font-bold font-serif text-[36px] md:text-[64px] leading-[1.05] mb-2 md:mb-3">{t.title}</h1>
              <p className="text-white/50 font-sans text-xs md:text-sm max-w-[360px] leading-relaxed">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 md:px-5 md:py-3 self-start md:self-auto">
              <StarRating rating={5} />
              <span className="text-white/70 text-xs font-sans">{t.statsText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Filter + Sort Bar ────────────────────────────────── */}
      <div className="sticky top-[112px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5 flex-1 min-w-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full border font-sans text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                    : 'bg-[#FFF8F8] text-gray-600 border-[#FFF8F8] hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-gray-400 text-xs font-sans hidden sm:block">
              {filtered.length} {filtered.length !== 1 ? t.products : t.product}
            </span>
            <select
              value={activeSort}
              onChange={e => setActiveSort(e.target.value)}
              className="text-xs font-sans text-[#0F0F0F] bg-white border border-gray-200 rounded-full px-4 py-2 appearance-none cursor-pointer focus:outline-none focus:border-gray-400 pr-8"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 w-full">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF8F8] flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p className="text-[#0F0F0F] font-serif text-xl mb-2">
              {products.length === 0 ? t.noProductsTitle : t.emptyTitle}
            </p>
            <p className="text-gray-400 font-sans text-sm mb-6">
              {products.length === 0 ? t.noProductsSub : t.emptySub}
            </p>
            {products.length > 0 && (
              <button
                onClick={() => setActiveCategory(allLabel)}
                className="bg-[#0F0F0F] text-white font-sans text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                {t.viewAll}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((product) => {
              const price    = product.price;
              const original = product.originalPrice ?? price;
              const savings  = original > price ? Math.round(((original - price) / original) * 100) : 0;
              const image    = product.images[0] ?? null;
              const rating   = parseFloat(product.rating) || 0;

              return (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-[#E9E1ED] overflow-hidden">
                    {image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-300 text-xs font-sans">No image</span>
                      </div>
                    )}

                    {product.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold font-sans uppercase tracking-wider px-2.5 py-1 rounded-full ${tagStyle(product.tag)}`}>
                        {product.tag}
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
                      <div className="w-full bg-[#0F0F0F]/90 backdrop-blur-sm text-white font-bold font-sans text-xs h-10 rounded-full flex items-center justify-center">
                        {t.viewProduct}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={rating} />
                      <span className="text-gray-400 text-[10px] font-sans">{formatCount(product.reviews)}</span>
                    </div>

                    <h3 className="text-[#0F0F0F] font-bold font-sans text-sm leading-snug mb-1">
                      {product.name}
                    </h3>

                    {product.shortDesc && (
                      <p className="hidden sm:block text-gray-500 font-sans text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                        {product.shortDesc}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mb-3 mt-auto">
                      <span className="text-[#0F0F0F] font-bold text-base">{price.toFixed(2)} MAD</span>
                      {original > price && (
                        <span className="text-gray-400 line-through text-xs font-sans">{original.toFixed(2)} MAD</span>
                      )}
                      {savings > 0 && (
                        <span className="bg-[#B84040] text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto">
                          -{savings}%
                        </span>
                      )}
                    </div>

                    <button
                      onClick={e => e.preventDefault()}
                      className="w-full bg-[#0F0F0F] text-white font-bold font-sans text-xs h-10 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <div className="mt-auto bg-[#FFF8F8] border-t border-[#F5E6E6]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-center md:text-start">
          <div>
            <h2 className="text-[#0F0F0F] font-serif font-bold text-xl md:text-3xl mb-1">{t.ctaTitle}</h2>
            <p className="text-[#555555] font-sans text-sm">{t.ctaSub}</p>
          </div>
          <button className="bg-[#B84040] text-white font-bold font-sans text-sm px-8 py-4 rounded-full hover:bg-[#A03535] transition-colors flex-shrink-0 w-full md:w-auto">
            {t.ctaButton}
          </button>
        </div>
      </div>

    </div>
  );
}
