"use client";

import React from 'react';
import Image from 'next/image';
import type { StoreContent } from '../lib/api';
import type { Locale } from '../lib/locale';
import { getTranslations } from '../lib/i18n';

type Props = { content?: NonNullable<StoreContent['home']>['reviews']; locale?: Locale };

const REVIEWS = [
  { image: "/images/reviews/17JMUq5Be.jpg",              name: "Carol-ann L.", date: "3/2/2026",  rating: 5, text: "This perfume has completely transformed my confidence. Everywhere I go, I get compliments and feel like I'm turning heads. The scent is sophisticated yet alluring.",          product: { image: "/images/original-scent.webp", name: "Venom™ Pheromone Perfume Collection" } },
  { image: "/images/reviews/1UZQgPnov.jpg",              name: "Sarah M.",      date: "2/28/2026", rating: 5, text: "I've tried countless perfumes, but this one stands out. The longevity is incredible - it lasts all day without fading. Highly recommend!",                               product: { image: "/images/black-opium.webp",    name: "Venom™ Black Opium Collection" } },
  { image: "/images/reviews/4hkumDhbM.jpg",              name: "Emma R.",       date: "2/25/2026", rating: 5, text: "The packaging is as beautiful as the scent itself. I love how it feels premium and luxurious. The fragrance notes are perfectly balanced.",                             product: { image: "/images/miss-mystique.webp",  name: "Venom™ Miss Mystique Collection" } },
  { image: "/images/reviews/6U8TehkOP_0_HfXkgh9_orig.jpg", name: "Jessica T.", date: "2/20/2026", rating: 5, text: "This has become my signature scent. People stop me to ask what I'm wearing. The quality and staying power are unmatched.",                                              product: { image: "/images/exotic-escape.webp",  name: "Venom™ Exotic Escape Collection" } },
  { image: "/images/reviews/8opluY0NN.jpg",              name: "Michelle K.",   date: "2/18/2026", rating: 5, text: "Absolutely love this fragrance! It's feminine, sexy, and lasts forever. I've gotten so many compliments since I started wearing it.",                                  product: { image: "/images/original-scent.webp", name: "Venom™ Pheromone Perfume Collection" } },
  { image: "/images/reviews/Q94CRwU9g1.jpg",             name: "Amanda P.",     date: "2/15/2026", rating: 5, text: "The scent is intoxicating and unique. I feel so confident and empowered when I wear it. Worth every penny!",                                                           product: { image: "/images/black-opium.webp",    name: "Venom™ Black Opium Collection" } },
];

const Reviews: React.FC<Props> = ({ content, locale = 'en' }) => {
  const verified       = getTranslations(locale).reviews.verified;
  const headlineBold   = content?.headlineBold   ?? "Proof in Every";
  const headlineItalic = content?.headlineItalic ?? "Compliment.";
  const subtitle       = content?.subtitle       ?? "Hear from women who've seen the spark, the stares, and the chemistry in action.";
  const totalReviews   = content?.totalReviews   ?? "3,091 Reviews";

  const reviews = (content?.items && content.items.length > 0)
    ? content.items.map(r => ({
        image:   r.image,
        name:    r.name,
        date:    r.date,
        rating:  r.rating,
        text:    r.text,
        product: { image: r.productImage, name: r.productName },
      }))
    : REVIEWS;

  return (
    <section className="w-full py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 lg:mb-4">
            <span className="font-bold text-black">{headlineBold}</span>{" "}
            <span className="italic text-[var(--color-primary)]">{headlineItalic}</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">{subtitle}</p>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 lg:mb-12">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2">
                <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
              </svg>
            ))}
          </div>
          <span className="text-black font-sans text-base font-medium">{totalReviews}</span>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden break-inside-avoid mb-4">
              <div className="relative aspect-square">
                <Image src={review.image} alt={`Review by ${review.name}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" style={{ objectFit: 'cover' }} loading="lazy" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black font-sans text-sm">{review.name}</span>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                      </svg>
                      <span className="text-xs text-black font-sans">{verified}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2">
                      <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-sm leading-[1.5] mb-4">{review.text}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                    <Image src={review.product.image} alt={review.product.name} fill sizes="32px" style={{ objectFit: 'cover' }} />
                  </div>
                  <span className="text-xs text-gray-500 font-sans">{review.product.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
