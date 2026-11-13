import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { websiteConfig } from '../content/config';

interface OpeningScreenProps {
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const { openingScreen } = websiteConfig;

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      // Elegant heart confetti burst
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#FDA4AF', '#E11D48', '#DDD6FE', '#F43F5E', '#FFF1F2'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    } catch {
      // Ignore
    }

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #FFF9FA 0%, #FFF0F4 45%, #FCE4EC 100%)',
        }}
      >
        {/* Ambient Dreamy Glow Circles */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-[100px] pointer-events-none -top-20 -left-20 animate-pulse-gentle" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-200/35 blur-[120px] pointer-events-none -bottom-24 -right-20 animate-pulse-gentle" />

        {/* Floating Delicate Heart Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-300/40 select-none text-2xl sm:text-3xl"
              initial={{
                x: `${15 + i * 15}%`,
                y: '105%',
                opacity: 0,
              }}
              animate={{
                y: '-10%',
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 9 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear',
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-sm w-full mx-auto text-center flex flex-col items-center">
          
          {/* Top Delicate Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/80 shadow-xs text-xs text-[#742232] font-medium mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>A special surprise for you</span>
          </motion.div>

          {/* 3D Envelope Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.6, type: "spring" }}
            onClick={handleOpenClick}
            className="relative cursor-pointer group mb-8 w-72 sm:w-80"
          >
            {/* Outer Glow Halo */}
            <div className="absolute -inset-3 bg-gradient-to-r from-rose-200/50 via-pink-200/40 to-purple-200/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100" />

            {/* The Envelope Box */}
            <div className="relative w-full h-48 sm:h-52 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5ED] to-[#F5EBE1] rounded-2xl shadow-2xl border border-rose-200/70 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
              
              {/* Gold foil rim accent */}
              <div className="absolute inset-0 border border-amber-200/50 rounded-2xl pointer-events-none" />

              {/* Top Flap with smooth 3D unfolding */}
              <div 
                className="absolute inset-x-0 top-0 h-28 origin-top transition-transform duration-700 shadow-md"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #FBF4EA 0%, #F5ECE0 100%)',
                  transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  zIndex: isOpening ? 5 : 25,
                }}
              />

              {/* Letter Peak Inside */}
              <motion.div 
                className="absolute inset-x-5 bg-white rounded-t-xl shadow-lg border-t border-x border-rose-200 transition-all duration-700"
                style={{
                  top: isOpening ? '-20px' : '45px',
                  height: isOpening ? '140px' : '60px',
                  zIndex: 10,
                }}
              >
                <div className="p-3">
                  <div className="w-16 h-1.5 bg-rose-200/70 rounded-full mb-2" />
                  <div className="w-28 h-1.5 bg-cream-200 rounded-full mb-2" />
                  <div className="w-20 h-1.5 bg-cream-200 rounded-full" />
                </div>
              </motion.div>

              {/* Side & Bottom Envelope Folds */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.04) 0%, transparent 100%)',
                  zIndex: 15,
                }}
              />

              {/* 3D Wax Seal with Heart Pulse */}
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full wax-seal flex items-center justify-center transition-all duration-500 ${
                  isOpening ? 'scale-125 opacity-0' : 'group-hover:scale-110'
                }`}
                style={{ zIndex: 30 }}
              >
                <Heart className="w-7 h-7 text-white fill-white animate-heartbeat drop-shadow-md" />
              </div>
            </div>

            <p className="mt-3 text-xs text-rose-500/80 font-medium tracking-wide">
              {openingScreen.envelopeHint}
            </p>
          </motion.div>

          {/* Heading Text */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-3xl sm:text-4xl text-[#4A1521] tracking-tight mb-2.5 font-normal"
          >
            {openingScreen.greeting}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-sans text-sm sm:text-base text-[#742232] mb-7 max-w-xs leading-relaxed font-light"
          >
            {openingScreen.subGreeting}
          </motion.p>

          {/* Luxury Open Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-white font-serif tracking-wide shadow-xl shadow-rose-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-base sm:text-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 50%, #9F1239 100%)',
            }}
          >
            <MailOpen className="w-4 h-4 text-white transition-transform group-hover:rotate-12" />
            <span>{isOpening ? "Opening for you..." : openingScreen.buttonText}</span>
            <Heart className="w-4 h-4 text-white fill-white transition-transform group-hover:scale-125" />
          </motion.button>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-xs text-[#9B515E] font-handwriting text-base sm:text-lg"
          >
            {openingScreen.footerQuote}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
