'use client';

import React from 'react';
import Link from 'next/link';
import type { Product } from '../lib/api';
import type { Locale } from '../lib/locale';
import { getTranslations } from '../lib/i18n';

type Props = { products: Product[]; locale: Locale };

const Bestsellers: React.FC<Props> = ({ products, locale }) => {
  if (products.length === 0) return null;
  const t = getTranslations(locale).bestsellers;

  return (
    <section className="w-full py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-12">
          <h2 className="text-center lg:text-start text-black font-bold font-serif text-3xl lg:text-[40px] mb-5 lg:mb-0">
            {t.title}
          </h2>
          <Link
            href="/shop"
            className="hidden lg:inline-flex items-center gap-2 text-sm font-sans font-bold text-[var(--color-primary)] hover:underline transition-colors"
          >
            {t.viewAll}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => {
            const price    = product.price;
            const original = product.originalPrice ?? price;
            const savings  = original > price ? Math.round(((original - price) / original) * 100) : 0;
            const image    = product.images[0] ?? null;

            return (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="aspect-square bg-[#E9E1ED] relative overflow-hidden">
                  {image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-300 text-xs font-sans">No image</span>
                    </div>
                  )}
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#00A17C" stroke="#00A17C" strokeWidth="2">
                          <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-sans">{product.reviews}</span>
                  </div>

                  <h3 className="text-black font-bold font-sans text-sm leading-snug mb-1">
                    {product.name}
                  </h3>

                  {product.shortDesc && (
                    <p className="text-gray-500 font-sans text-xs leading-relaxed mb-3 line-clamp-2 flex-1 hidden sm:block">
                      {product.shortDesc}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-auto mb-3">
                    <span className="text-black font-bold text-base">{price.toFixed(2)} MAD</span>
                    {original > price && (
                      <span className="text-gray-400 line-through text-xs font-sans">{original.toFixed(2)}</span>
                    )}
                    {savings > 0 && (
                      <span className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded ms-auto">
                        -{savings}%
                      </span>
                    )}
                  </div>

                  <button
                    onClick={e => e.preventDefault()}
                    className="w-full bg-black text-white font-bold font-sans text-xs h-10 rounded-full hover:bg-[var(--color-primary)] transition-colors"
                  >
                    {t.addToCart}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 lg:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[var(--color-primary)] border border-[var(--color-primary)] px-6 py-2.5 rounded-full hover:bg-[#FFF8F8] transition-colors"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
