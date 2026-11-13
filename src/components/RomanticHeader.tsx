import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { websiteConfig } from '../content/config';

export const RomanticHeader: React.FC = () => {
  const { recipientNickname, relationshipSubtitle } = websiteConfig;

  return (
    <header className="pt-20 pb-10 px-4 sm:px-6 text-center max-w-2xl mx-auto">
      {/* Little floating greeting pill */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200/90 shadow-xs text-xs font-medium text-[#742232] mb-5 backdrop-blur-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>A Sanctuary Made Just For You</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A1521] tracking-tight font-normal mb-3"
      >
        For My <span className="text-[#BE123C] font-script text-5xl sm:text-6xl md:text-7xl ml-1 font-normal">{recipientNickname}</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-serif italic text-base sm:text-lg md:text-xl text-[#742232] max-w-md mx-auto leading-relaxed mb-8 font-light"
      >
        {relationshipSubtitle}
      </motion.p>

      {/* Quick Navigation Anchor Tags */}
      <motion.nav 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs text-[#742232] font-medium"
      >
        <a 
          href="#apology" 
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/80 hover:border-rose-300 transition-all text-[#742232] hover:text-[#BE123C] shadow-2xs"
        >
          The Letter
        </a>
        <a 
          href="#never-forget" 
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/80 hover:border-rose-300 transition-all text-[#742232] hover:text-[#BE123C] shadow-2xs"
        >
          Never Forget
        </a>
        <a 
          href="#scrapbook" 
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/80 hover:border-rose-300 transition-all text-[#742232] hover:text-[#BE123C] shadow-2xs"
        >
          Our World 🌷
        </a>
        <a 
          href="#promises" 
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/80 hover:border-rose-300 transition-all text-[#742232] hover:text-[#BE123C] shadow-2xs"
        >
          My Promises
        </a>
        <a 
          href="#final-letter" 
          className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/80 hover:border-rose-300 transition-all text-[#742232] hover:text-[#BE123C] shadow-2xs"
        >
          Forever ❤️
        </a>
      </motion.nav>

      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-8" />
    </header>
  );
};
