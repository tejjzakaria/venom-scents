import React from 'react';
import Image from 'next/image';
import type { StoreContent } from '../lib/api';

type Props = { content?: NonNullable<StoreContent['home']>['hero'] };

const Hero: React.FC<Props> = ({ content }) => {
  const headline    = content?.headline    ?? "Own Your Allure";
  const subtext     = content?.subtext     ?? "Scents crafted to turn heads and leave a lasting impression.";
  const ctaText     = content?.ctaText     ?? "Shop Now";
  const socialProof = content?.socialProof ?? "4.5/5 From 125,000+ Customers";

  return (
    <section className="relative w-full overflow-hidden min-h-[520px] md:min-h-[620px]">
      <Image
        src="/images/hero.webp"
        alt="Hero background"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      <div className="absolute inset-0 bg-black/80 md:bg-linear-to-r rtl:md:bg-linear-to-l md:from-black/70 md:via-black/30 md:to-transparent"></div>

      <div className="absolute top-0 ltr:left-0 rtl:right-0 w-1/2 h-1/2 bg-gradient-radial from-red-500/20 via-transparent to-transparent opacity-30"></div>

      <div className="absolute inset-0 z-10 flex items-center px-6 md:ps-[10vw] md:pe-0 justify-center md:justify-start">
        <div className="max-w-[600px] w-full text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-1.5 mb-4 md:mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#00A17C" stroke="#00A17C" strokeWidth="2">
                  <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                </svg>
              ))}
            </div>
            <span className="text-white text-xs font-sans ms-1">{socialProof}</span>
          </div>

          <h1 className="!text-white font-bold font-serif text-[36px] md:text-[56px] lg:text-[72px] leading-[1.1] mt-4 md:mt-6">
            {headline}
          </h1>

          <p className="text-white/90 font-sans text-sm md:text-base leading-normal mt-3 md:mt-4 max-w-[400px] mx-auto md:mx-0">
            {subtext}
          </p>

          <button className="bg-[var(--color-primary)] text-white font-bold font-sans text-base md:text-lg w-full max-w-[300px] md:max-w-[320px] h-12 md:h-14 rounded-full mt-8 md:mt-10 hover:bg-[var(--color-primary-dark)] transition-colors">
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
