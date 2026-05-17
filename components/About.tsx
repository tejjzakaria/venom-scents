import React from 'react';
import Image from 'next/image';
import type { StoreContent } from '../lib/api';

type Props = { content?: NonNullable<StoreContent['home']>['about'] };

const About: React.FC<Props> = ({ content }) => {
  const headline = content?.headline ?? "About Venom";
  const body     = content?.body     ?? "At Venom, we're more than just a perfume brand, we're a movement. We're redefining what it means to wear a fragrance that empowers you to own every moment and make it yours.";
  const ctaText  = content?.ctaText  ?? "Shop Now";

  return (
    <section className="w-full py-14 lg:py-24 bg-[#FFF8F8]">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="lg:col-span-1">
            <div className="relative overflow-hidden rounded-xl border border-[#F5E6E6] w-full">
              <Image
                src="/images/about.webp"
                alt="About Venom"
                width={800}
                height={1000}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col justify-center text-center lg:text-start px-4 lg:px-0">
            <h2 className="text-black font-semibold font-serif text-3xl md:text-4xl lg:text-[48px] leading-[1.2] mb-4 lg:mb-6">
              {headline}
            </h2>

            <p className="text-[#444444] font-sans text-sm md:text-base leading-[1.6] max-w-[480px] mx-auto lg:mx-0 mb-8 lg:mb-10 mt-3 lg:mt-5">
              {body}
            </p>

            <button className="bg-black text-white font-bold font-sans text-sm md:text-base w-full max-w-[280px] h-12 md:h-14 rounded-full mx-auto lg:mx-0 hover:bg-gray-800 transition-colors">
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
