import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../services/audioService';
import { websiteConfig } from '../content/config';

export const FloatingNavAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const { audio } = websiteConfig;

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const toggleMusic = () => {
    romanticAudio.toggle(audio.audioUrl);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-white/95 border-rose-300 text-[#BE123C] shadow-rose-200/50'
            : 'bg-white/80 border-rose-200/90 text-[#742232] hover:bg-white'
        }`}
        title={isPlaying ? "Pause music" : "Play our song"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-[#BE123C] rounded-full audio-bar-1" />
              <span className="w-0.5 bg-[#BE123C] rounded-full audio-bar-2" />
              <span className="w-0.5 bg-[#BE123C] rounded-full audio-bar-3" />
            </div>
            <Volume2 className="w-4 h-4 text-[#BE123C]" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Music className="w-4 h-4 text-[#9B515E] group-hover:text-[#BE123C] transition-colors" />
            <VolumeX className="w-3.5 h-3.5 text-[#9B515E]/60" />
          </div>
        )}

        <span className="text-xs font-sans font-medium">
          {isPlaying ? `${audio.title} 🎵` : "Play Our Song 🎵"}
        </span>
      </button>
    </div>
  );
};
