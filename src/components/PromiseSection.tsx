import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Heart, Sparkles } from 'lucide-react';
import { websiteConfig } from '../content/config';

export const PromiseSection: React.FC = () => {
  const { promiseSection } = websiteConfig;
  const [activePromiseId, setActivePromiseId] = useState<number | null>(1);

  return (
    <section id="promises" className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-200/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <Shield className="w-3.5 h-3.5 text-[#9B515E]" />
          <span>{promiseSection.badge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A1521] tracking-tight mb-3 font-normal">
          {promiseSection.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#742232] leading-relaxed font-light">
          {promiseSection.subtitle}
        </p>
      </motion.div>

      {/* Promises List */}
      <div className="space-y-4">
        {promiseSection.promises.map((promise, index) => {
          const isOpen = activePromiseId === promise.id;

          return (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onClick={() => setActivePromiseId(isOpen ? null : promise.id)}
              className={`rounded-2xl transition-all duration-300 border cursor-pointer overflow-hidden ${
                isOpen
                  ? 'bg-white shadow-xl border-rose-300 ring-2 ring-rose-100'
                  : 'bg-white/85 hover:bg-white border-rose-200/80 hover:border-rose-300 shadow-sm'
              }`}
            >
              {/* Main Promise Row */}
              <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors shadow-2xs ${
                    isOpen ? 'bg-[#742232] text-white' : 'bg-rose-100 text-[#742232]'
                  }`}>
                    <span className="font-serif text-sm font-semibold">{index + 1}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base sm:text-lg md:text-xl text-[#4A1521] font-medium leading-snug">
                      {promise.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5C232E] mt-1.5 font-light leading-relaxed">
                      {promise.detail}
                    </p>
                  </div>
                </div>

                <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-rose-50 text-[#742232]' : 'text-[#9B515E]'}`}>
                  <Heart className={`w-4 h-4 ${isOpen ? 'fill-rose-500 text-rose-500' : ''}`} />
                </div>
              </div>

              {/* Expanded Action Commitment */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-rose-100 bg-[#FFFDF9]/60">
                  <div className="mt-3.5 flex items-start gap-2.5 text-xs text-[#742232]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#4A1521]">My daily commitment: </span>
                      <span className="italic font-serif text-sm sm:text-base text-[#5C232E]">{promise.commitment}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Reassurance Footer */}
      <div className="mt-8 text-center p-4 rounded-2xl bg-white/70 border border-rose-100 text-xs sm:text-sm text-[#742232] font-sans shadow-2xs">
        <Sparkles className="w-4 h-4 text-amber-500 inline mr-1.5" />
        <span>Holding myself accountable every single day, even when no one is watching.</span>
      </div>
    </section>
  );
};
