"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-black font-bold font-sans text-sm pr-4">{faq.question}</span>
            <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-[#555555] font-sans text-sm leading-[1.7]">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
