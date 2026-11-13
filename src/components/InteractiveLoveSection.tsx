import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { websiteConfig } from '../content/config';

export const InteractiveLoveSection: React.FC = () => {
  const { interactiveSection } = websiteConfig;
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHugOpen, setIsHugOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [noteIndex, setNoteIndex] = useState(0);

  const handleRevealSpecial = () => {
    setIsRevealed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FDA4AF', '#E11D48', '#DDD6FE', '#F43F5E'],
      });
    } catch {
      // Ignore
    }
  };

  const handleTriggerHug = () => {
    setIsHugOpen(true);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#FDA4AF', '#F43F5E', '#DDD6FE'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#FFF1F2', '#FECDD3', '#E11D48'],
        });
      }, 350);
    } catch {
      // Ignore
    }
  };

  const handlePickNote = () => {
    const notes = interactiveSection.loveNotes;
    const nextIndex = (noteIndex + 1) % notes.length;
    setNoteIndex(nextIndex);
    setActiveNote(notes[nextIndex]);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FDE047', '#FDA4AF', '#C4B5FD'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <section id="interactive" className="relative py-16 px-4 sm:px-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9B515E]" />
          <span>{interactiveSection.badge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A1521] tracking-tight mb-2 font-normal">
          {interactiveSection.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#742232] leading-relaxed font-light">
          {interactiveSection.subtitle}
        </p>
      </motion.div>

      <div className="space-y-6">
        
        {/* Interaction 1: "Do you know how special you are to me?" */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-xl text-center"
        >
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 mx-auto flex items-center justify-center mb-4 text-[#742232] shadow-2xs">
            <Heart className="w-6 h-6 fill-rose-400 text-rose-500 animate-pulse-gentle" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#4A1521] mb-4 font-normal">
            {interactiveSection.specialQuestion}
          </h3>

          {!isRevealed ? (
            <button
              onClick={handleRevealSpecial}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-serif text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)',
              }}
            >
              <span>{interactiveSection.specialButtonText}</span>
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 max-w-md mx-auto shadow-2xs"
            >
              <p className="font-serif italic text-lg sm:text-xl text-[#742232] font-medium leading-relaxed mb-2">
                “{interactiveSection.specialRevealedMessage}”
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#9B515E]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>You are my safest home</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Interaction 2: "Send me a virtual hug 🫂" */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-[#FFFDF9] to-rose-50/70 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl text-center"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100/70 border border-purple-200 mx-auto flex items-center justify-center mb-4 text-purple-600 shadow-2xs text-2xl">
            🫂
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#4A1521] mb-2 font-normal">
            Need a warm embrace right now?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#742232] mb-5 font-light">
            Even though miles stand between us, love travels instantly.
          </p>

          <button
            onClick={handleTriggerHug}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#742232] border border-rose-300 font-serif text-base shadow-sm hover:shadow-lg hover:bg-rose-50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{interactiveSection.hugButtonText}</span>
          </button>
        </motion.div>

        {/* Interaction 3: Little Jar of Adoration */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-xl text-center"
        >
          <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center mb-3 text-amber-500 shadow-2xs">
            <Gift className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#4A1521] mb-1 font-medium">
            {interactiveSection.jarTitle}
          </h3>
          <p className="text-xs text-[#9B515E] mb-4">
            Tap to open a random note written just for you
          </p>

          <button
            onClick={handlePickNote}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#742232] bg-[#FAF6EE] hover:bg-[#F5EFEB] border border-rose-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Smile className="w-4 h-4 text-amber-600" />
            <span>{interactiveSection.jarButtonText}</span>
          </button>

          {activeNote && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 max-w-md mx-auto shadow-2xs"
            >
              <p className="font-handwriting text-xl sm:text-2xl text-[#4A1521] leading-relaxed">
                “{activeNote}”
              </p>
            </motion.div>
          )}
        </motion.div>

      </div>

      {/* Full-screen Virtual Hug Overlay */}
      <AnimatePresence>
        {isHugOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsHugOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FCE4EC] p-8 sm:p-9 rounded-3xl shadow-2xl border border-rose-200 text-center overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsHugOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 text-[#742232] hover:bg-rose-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Pulsing Hug Aura */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-rose-300/40 animate-ping opacity-60 pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-rose-200/50 blur-2xl pointer-events-none" />
                
                <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-[#BE123C] to-rose-400 flex items-center justify-center shadow-2xl animate-heartbeat">
                  <span className="text-4xl select-none">🫂</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A1521] mb-3 font-normal mt-6">
                {interactiveSection.hugTitle}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#5C232E] leading-relaxed mb-7 font-light">
                {interactiveSection.hugMessage}
              </p>

              <button
                onClick={() => setIsHugOpen(false)}
                className="px-7 py-3 rounded-full text-white text-xs sm:text-sm font-serif tracking-wide shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #BE123C 0%, #742232 100%)',
                }}
              >
                Hug Received & Felt ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
