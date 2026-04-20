"use client";

import { useState } from "react";
import { faq } from "@/lib/config";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-section border-t border-peach/10">
      <div className="container-sauna">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Questions, answered</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05]">
              Everything you<br />
              want to ask.
            </h2>
          </div>
        </div>

        <div className="max-w-3xl ml-auto space-y-0 border-t border-peach/10">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-peach/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-6 flex justify-between items-start gap-6 text-left hover:text-gold transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base md:text-lg uppercase tracking-heading text-peach">
                    {item.q}
                  </span>
                  <span className="text-gold text-xl leading-none mt-1 flex-shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-8 pr-10 animate-fade-in">
                    <p className="text-peach/70 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
