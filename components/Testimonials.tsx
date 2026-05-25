"use client";

import React, { useRef, useState } from 'react';
import type { StoreContent } from '../lib/api';

type Props = { content?: NonNullable<StoreContent['home']>['testimonials'] };

const DEFAULT_STATS = [
  { percent: "95%", text: "called it the most irresistible fragrance they've ever come across." },
  { percent: "92%", text: "said the scent stayed beautifully strong from morning through the night." },
  { percent: "93%", text: "noticed they received instant compliments after first wearing it." },
];

const testimonials = [
  { video: "/images/video-review1.mp4", quote: "This has become a daily essential for me. It's worth every penny." },
  { video: "/images/video-review2.mp4", quote: "One of my favourite perfumes. Very sexy, very feminine." },
  { video: "/images/video-review3.mp4", quote: "I've never smelt something like this before. It's not overpowering." },
];

const Testimonials: React.FC<Props> = ({ content }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingStates, setPlayingStates] = useState<boolean[]>([false, false, false]);

  const headlineBold   = content?.headlineBold   ?? "Women";
  const headlineItalic = content?.headlineItalic ?? "Speak up";
  const stats          = content?.stats          ?? DEFAULT_STATS;

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates(prev => {
        const next = [...prev];
        next[index] = !next[index];
        return next;
      });
    }
  };

  return (
    <section className="w-full py-14 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span className="font-bold text-black">{headlineBold}</span>{" "}
            <span className="italic text-[var(--color-primary)]">{headlineItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 lg:px-0 snap-x snap-mandatory">
              {testimonials.map((t, index) => (
                <div key={index} className="flex-shrink-0 w-[160px] md:w-[200px] snap-start flex flex-col">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3 flex-shrink-0">
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={t.video}
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                    />
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${playingStates[index] ? 'opacity-0' : 'opacity-100'}`}>
                      <button
                        onClick={() => handlePlayPause(index)}
                        className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        {playingStates[index] ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="flex-1 text-xs italic text-black font-sans text-center">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-6 justify-center">
            {stats.map((stat: { percent: string; text: string }, index: number) => (
              <div key={index} className="bg-[#FFF8F8] rounded-2xl lg:rounded-full p-4 lg:p-6 flex items-center gap-4 lg:gap-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-primary)] font-bold text-base lg:text-lg">{stat.percent}</span>
                </div>
                <p className="text-black font-sans text-sm lg:text-base flex-1">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
