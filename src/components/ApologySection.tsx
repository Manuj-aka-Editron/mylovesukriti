import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { websiteConfig } from '../content/config';

export const ApologySection: React.FC = () => {
  const { apologyLetter } = websiteConfig;

  return (
    <section id="apology" className="relative py-16 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-96 bg-rose-200/25 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <Feather className="w-3.5 h-3.5 text-[#9B515E]" />
          <span>{apologyLetter.badge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A1521] tracking-tight font-normal">
          {apologyLetter.heading}
        </h2>
      </motion.div>

      {/* The Parchment Letter Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-rose-200/90 overflow-hidden"
        style={{
          boxShadow: '0 20px 50px -10px rgba(116, 34, 50, 0.12), 0 4px 15px -2px rgba(116, 34, 50, 0.05)',
        }}
      >
        {/* Subtle vintage inner border */}
        <div className="absolute inset-3 border border-rose-200/40 rounded-2xl pointer-events-none" />

        {/* Top Header of the Letter */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-rose-100">
          <div className="flex items-center gap-2 text-[#9B515E] text-xs tracking-wider uppercase font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="font-serif italic text-sm">For Jaanu’s eyes only</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center border border-rose-200 shadow-2xs">
            <Heart className="w-4 h-4 text-[#742232] fill-rose-300" />
          </div>
        </div>

        {/* Salutation */}
        <div className="font-serif italic text-2xl sm:text-3xl text-[#4A1521] mb-6">
          {apologyLetter.salutation}
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-5 text-[#5C232E] font-sans text-sm sm:text-base leading-relaxed font-light">
          {apologyLetter.paragraphs.map((paragraph, index) => (
            <p key={index} className="transition-all duration-300 hover:text-[#3B0E17]">
              {index === 0 && (
                <span className="float-left text-4xl sm:text-5xl font-serif text-[#742232] leading-none pr-3 pt-1 font-normal">
                  I
                </span>
              )}
              {index === 0 ? paragraph.slice(1) : paragraph}
            </p>
          ))}
        </div>

        {/* Handwritten Sign-off */}
        <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col items-end">
          <div className="text-xs text-[#9B515E] uppercase tracking-widest font-sans mb-1">
            {apologyLetter.closing}
          </div>
          <div className="font-script text-3xl sm:text-4xl md:text-5xl text-[#742232] font-normal">
            {apologyLetter.signature}
          </div>
        </div>

        {/* Delicate Corner Rose Motif */}
        <div className="absolute bottom-2 left-6 text-rose-300/40 text-2xl select-none pointer-events-none font-serif">
          ❦
        </div>
      </motion.div>
    </section>
  );
};
