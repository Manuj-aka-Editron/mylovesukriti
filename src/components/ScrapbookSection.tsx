import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Camera, 
  MapPin, 
  Calendar, 
  ZoomIn, 
  X,
  Upload,
  Clock,
  Compass,
  Sunrise
} from 'lucide-react';
import { websiteConfig, PolaroidItem } from '../content/config';

export const ScrapbookSection: React.FC = () => {
  const { scrapbookSection } = websiteConfig;
  const [polaroids, setPolaroids] = useState<PolaroidItem[]>(scrapbookSection.polaroids);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-purple-500" />;
      case 'Sunrise':
      default:
        return <Sunrise className="w-4 h-4 text-orange-400" />;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultUrl = event.target.result as string;
          setPolaroids(prev => prev.map(p => p.id === id ? { ...p, imageUrl: resultUrl } : p));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="scrapbook" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-medium text-[#742232] mb-3 shadow-2xs">
          <Camera className="w-3.5 h-3.5 text-[#9B515E]" />
          <span>{scrapbookSection.badge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A1521] tracking-tight mb-3 font-normal">
          {scrapbookSection.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#742232] leading-relaxed font-light">
          {scrapbookSection.subtitle}
        </p>

        {/* Quick Personalize Button */}
        <div className="mt-4">
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="inline-flex items-center gap-1.5 text-xs text-[#9B515E] hover:text-[#742232] bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full border border-rose-200 shadow-2xs transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3" />
            <span>{isCustomizing ? 'Done Personalizing Photos' : 'Personalize Photos (Optional)'}</span>
          </button>
        </div>
      </motion.div>

      {/* Part 1: Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-7 mb-20">
        {polaroids.map((photo, idx) => {
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative group bg-[#FFFDF9] p-3.5 pb-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 transform ${photo.rotation} hover:rotate-0 hover:scale-103 hover:z-20 cursor-pointer border border-[#E8DFD3]`}
            >
              {/* Washi Tape Accent */}
              <div className="washi-tape" />

              {/* Photo Frame Container */}
              <div 
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-4/5 overflow-hidden rounded-xs bg-stone-100 mb-3 shadow-inner"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Vintage vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity" />

                {/* Tap to zoom hint */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/85 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ZoomIn className="w-3.5 h-3.5 text-[#742232]" />
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="px-1 text-center">
                <p className="font-handwriting text-lg sm:text-xl text-[#4A1521] leading-tight mb-2">
                  {photo.caption}
                </p>
                
                <div className="flex items-center justify-center gap-3 text-[11px] text-[#9B515E] font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-rose-400" />
                    {photo.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-rose-400" />
                    {photo.location}
                  </span>
                </div>
              </div>

              {/* Edit Mode Upload Button */}
              {isCustomizing && (
                <div className="mt-3 pt-2 border-t border-rose-100 text-center">
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#742232] font-medium cursor-pointer hover:underline bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <Upload className="w-3 h-3" />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, photo.id)}
                    />
                  </label>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Part 2: Interactive Relationship Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-rose-200/90 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Clock className="w-4 h-4 text-[#9B515E]" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#4A1521] font-normal">
            Chapters of Us
          </h3>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-rose-300 before:via-pink-200 before:to-purple-200">
          {scrapbookSection.timeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center shadow-xs transition-transform group-hover:scale-125">
                <div className="w-1.5 h-1.5 rounded-full bg-[#742232]" />
              </div>

              {/* Content Card */}
              <div className="bg-[#FFFDF9] hover:bg-rose-50/50 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-2xs transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-medium text-[#9B515E]">
                    {item.phase} — {item.date}
                  </span>
                  <div className="p-1 rounded-full bg-rose-50 border border-rose-100">
                    {getTimelineIcon(item.iconName)}
                  </div>
                </div>

                <h4 className="font-serif text-lg text-[#4A1521] mb-1 font-medium">
                  {item.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[#5C232E] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FFFDF9] p-4 pb-6 rounded-3xl shadow-2xl border border-rose-200 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-4/5 overflow-hidden rounded-2xl bg-stone-100 mb-4 shadow-inner">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center px-3">
                <p className="font-handwriting text-2xl text-[#4A1521] mb-2">
                  {selectedPhoto.caption}
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-[#9B515E]">
                  <span>{selectedPhoto.date}</span>
                  <span>•</span>
                  <span>{selectedPhoto.location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
