import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Copy, Check, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { websiteConfig } from '../content/config';

export const FinalLetterSection: React.FC = () => {
  const { finalLetterSection, replyBox, recipientNickname } = websiteConfig;
  const [copied, setCopied] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string>('');
  const [customResponse, setCustomResponse] = useState<string>('');

  const handleCopyOrSend = () => {
    const textToSend = customResponse.trim() !== '' ? customResponse : selectedResponse;
    if (!textToSend) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToSend);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.9 },
        colors: ['#FDA4AF', '#E11D48', '#DDD6FE'],
      });
    } catch {
      // Ignore
    }
  };

  const handleWhatsAppSend = () => {
    const textToSend = customResponse.trim() !== '' ? customResponse : selectedResponse;
    const encoded = encodeURIComponent(textToSend || `I went through the little website you made for me... ❤️`);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <section id="final-letter" className="relative py-20 px-4 sm:px-6 max-w-2xl mx-auto">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Decorative Wax Seal Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="w-14 h-14 rounded-full wax-seal flex items-center justify-center shadow-2xl mb-3">
          <Heart className="w-6 h-6 text-white fill-white animate-heartbeat" />
        </div>
        <div className="text-xs uppercase tracking-widest text-[#9B515E] font-medium font-sans">
          {finalLetterSection.badge}
        </div>
      </motion.div>

      {/* The Final Letter Parchment */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative bg-[#FFFDF9] rounded-3xl p-7 sm:p-12 shadow-2xl border border-rose-200/90"
        style={{
          boxShadow: '0 25px 60px -15px rgba(116, 34, 50, 0.14), 0 4px 15px -2px rgba(116, 34, 50, 0.05)',
        }}
      >
        {/* Subtle ribbon accent */}
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />

        {/* Letter Body in Handwritten Style */}
        <div className="font-handwriting text-2xl sm:text-3xl text-[#4A1521] leading-relaxed whitespace-pre-line mb-10">
          {finalLetterSection.body}
        </div>

        {/* Sign-off */}
        <div className="pt-6 border-t border-rose-100 flex flex-col items-end">
          <div className="font-serif italic text-base sm:text-lg text-[#742232] mb-1">
            {finalLetterSection.signOff}
          </div>
          <div className="font-script text-3xl sm:text-4xl md:text-5xl text-[#BE123C] font-normal">
            {finalLetterSection.senderSignature}
          </div>
          <div className="text-[11px] text-[#9B515E]/70 uppercase tracking-widest font-sans mt-2">
            {finalLetterSection.dateStamp}
          </div>
        </div>
      </motion.div>

      {/* Interactive Response Box for Jaanu */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-xl text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <MessageCircleHeart className="w-3.5 h-3.5 text-rose-500" />
          <span>A safe space for your reply</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#4A1521] mb-2 font-normal">
          {replyBox.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#742232] mb-6 max-w-md mx-auto font-light leading-relaxed">
          {replyBox.subtitle}
        </p>

        {/* Quick emotion pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {replyBox.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedResponse(option);
                setCustomResponse(option);
              }}
              className={`text-xs px-3.5 py-2 rounded-full border transition-all text-left cursor-pointer ${
                selectedResponse === option
                  ? 'bg-[#742232] text-white border-[#742232] shadow-xs'
                  : 'bg-white text-[#742232] border-rose-200 hover:border-rose-300 hover:bg-rose-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Custom Text Area */}
        <div className="max-w-md mx-auto mb-4">
          <textarea
            value={customResponse}
            onChange={(e) => setCustomResponse(e.target.value)}
            placeholder={`Type anything on your heart for him, ${recipientNickname}...`}
            rows={3}
            className="w-full p-3.5 rounded-2xl border border-rose-200 bg-[#FFFDF9] text-xs sm:text-sm text-[#4A1521] focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none placeholder:text-[#9B515E]/50 shadow-inner"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={handleCopyOrSend}
            disabled={!customResponse.trim() && !selectedResponse}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-[#FAF6EE] text-[#742232] border border-rose-200 hover:bg-[#F5EFEB] transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Reply'}</span>
          </button>

          <button
            onClick={handleWhatsAppSend}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-white shadow-md shadow-rose-500/25 transition-all hover:shadow-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)',
            }}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send on WhatsApp</span>
          </button>
        </div>
      </motion.div>

      {/* Tender Footer */}
      <footer className="mt-16 text-center text-xs text-[#9B515E] font-serif italic pb-8">
        <p className="flex items-center justify-center gap-1.5">
          <span>Crafted with patience and unending love for</span>
          <span className="font-sans font-semibold text-[#BE123C]">{recipientNickname}</span>
          <Heart className="w-3.5 h-3.5 text-[#BE123C] fill-[#BE123C] inline" />
        </p>
      </footer>
    </section>
  );
};
