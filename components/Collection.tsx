import React from 'react';
import Link from 'next/link';
import { getTranslations } from '../lib/i18n';
import type { Locale } from '../lib/locale';

const BG_COLORS = ['#E8E2F1', '#F4E4E8', '#ECE6D8', '#E8E2F1', '#F4E4E8', '#ECE6D8'];

type CategoryCard = { name: string; image: string; bgColor: string };

type Props = { categories: CategoryCard[]; locale: Locale };

const Collection: React.FC<Props> = ({ categories, locale }) => {
  const t = getTranslations(locale).collection;
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-black font-bold font-serif text-2xl md:text-[40px] mb-8 md:mb-12">
          {t.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 mt-4 md:mt-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="/shop"
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 block"
            >
              <div
                className="aspect-square relative overflow-hidden"
                style={{ backgroundColor: category.bgColor }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="py-3 md:py-5 px-2 text-center">
                <p className="text-black font-sans text-xs md:text-sm font-medium leading-snug">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { BG_COLORS };
export default Collection;
