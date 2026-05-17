import React from 'react';
import type { StoreContent } from '../lib/api';

type Props = { content?: NonNullable<StoreContent['home']>['benefits'] };

const ICONS = [
  <svg key="clock" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>
  </svg>,
  <svg key="heart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>,
  <svg key="leaf" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B84040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    <path d="M12 7v10"></path><path d="M9 10h6"></path>
  </svg>,
];

const DEFAULT_ITEMS = [
  { title: "Lasts all day",    description: "Our enhanced formula ensures a scent that lasts all day, keeping you refreshed from morning to night." },
  { title: "Premium Quality",  description: "Packaged in premium bottles, our products combine elegance with durability for a luxurious experience." },
  { title: "Vegan-Friendly",   description: "Made with vegan ingredients, our fragrances are cruelty-free and suitable for all lifestyles." },
];

const Benefits: React.FC<Props> = ({ content }) => {
  const headlineBold   = content?.headlineBold   ?? "Unlock the Secret to";
  const headlineItalic = content?.headlineItalic ?? "Timeless Charm";
  const items          = content?.items          ?? DEFAULT_ITEMS;

  return (
    <section className="w-full py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-serif">
            <span className="font-bold text-black">{headlineBold}</span>{" "}
            <span className="italic text-[#B84040]">{headlineItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item: { title: string; description: string }, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-lg border border-[#B84040] flex items-center justify-center flex-shrink-0">
                  {ICONS[index % ICONS.length]}
                </div>
                <h3 className="text-black font-bold font-sans text-base lg:text-xl">{item.title}</h3>
              </div>
              <p className="text-[#555555] font-sans text-sm leading-[1.6] mt-3 lg:mt-4">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
