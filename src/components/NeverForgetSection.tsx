import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  SunMedium, 
  ShieldCheck, 
  Compass, 
  Infinity as InfinityIcon,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { websiteConfig } from '../content/config';

export const NeverForgetSection: React.FC = () => {
  const { neverForgetSection } = websiteConfig;
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const getCardIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-[#9B515E] fill-rose-100" />;
      case 3:
        return <SunMedium className="w-5 h-5 text-amber-500" />;
      case 4:
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 5:
        return <Compass className="w-5 h-5 text-rose-400" />;
      case 6:
      default:
        return <InfinityIcon className="w-5 h-5 text-[#742232]" />;
    }
  };

  return (
    <section id="never-forget" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <Bookmark className="w-3.5 h-3.5 text-[#9B515E]" />
          <span>{neverForgetSection.badge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A1521] tracking-tight mb-3 font-normal">
          {neverForgetSection.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#742232] leading-relaxed font-light">
          {neverForgetSection.subtitle}
        </p>
      </motion.div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {neverForgetSection.cards.map((card, idx) => {
          const isSelected = activeCardId === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveCardId(isSelected ? null : card.id)}
              className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-white shadow-xl border-rose-300 -translate-y-1 ring-2 ring-rose-200'
                  : 'bg-white/85 hover:bg-white shadow-sm hover:shadow-lg border border-rose-200/80 hover:-translate-y-1'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110">
                  {getCardIcon(card.id)}
                </div>
                <span className="font-serif italic text-xs text-[#9B515E]/60 bg-rose-50/50 px-2.5 py-1 rounded-full border border-rose-100">
                  #{idx + 1}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-lg sm:text-xl text-[#4A1521] mb-2 font-medium leading-snug">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="font-sans text-xs sm:text-sm text-[#5C232E] leading-relaxed font-light mb-4">
                {card.description}
              </p>

              {/* Highlight / Takeaway Pill */}
              <div className="flex items-center gap-2 pt-3 border-t border-rose-100 text-xs font-medium text-[#742232]">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="italic font-serif text-sm text-[#742232]">{card.highlight}</span>
              </div>

              {/* Subtle top right ambient glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent rounded-tr-2xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-8 text-xs text-[#9B515E]/70 font-sans italic">
        (Tap any card to hold it in your heart)
      </div>
    </section>
  );
};
