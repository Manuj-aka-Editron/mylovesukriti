import React, { useState, useEffect } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { FloatingParticles } from './components/FloatingParticles';
import { FloatingNavAudio } from './components/FloatingNavAudio';
import { RomanticHeader } from './components/RomanticHeader';
import { ApologySection } from './components/ApologySection';
import { NeverForgetSection } from './components/NeverForgetSection';
import { ScrapbookSection } from './components/ScrapbookSection';
import { PromiseSection } from './components/PromiseSection';
import { InteractiveLoveSection } from './components/InteractiveLoveSection';
import { FinalLetterSection } from './components/FinalLetterSection';
import { romanticAudio } from './services/audioService';
import { websiteConfig } from './content/config';

export const App: React.FC = () => {
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    romanticAudio.init(websiteConfig.audio.audioUrl);
    romanticAudio.enableAutoplay(websiteConfig.audio.audioUrl);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A1521] relative overflow-x-hidden selection:bg-rose-200 selection:text-[#BE123C]">
      
      {/* 1. Opening Screen Modal / Transition */}
      {!hasOpened && (
        <OpeningScreen onOpen={() => {
          setHasOpened(true);
          romanticAudio.play(websiteConfig.audio.audioUrl);
        }} />
      )}

      {/* Floating Canvas Particles (Hearts & Petals) */}
      <FloatingParticles />

      {/* Main Experience when Opened */}
      <main className={`relative z-10 transition-opacity duration-1000 ${hasOpened ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Floating Ambient Music Controller */}
        <FloatingNavAudio />

        {/* Romantic Welcome Banner */}
        <RomanticHeader />

        {/* Section 2: The Apology — From My Heart */}
        <ApologySection />

        {/* Section 3: Things I Never Want You To Forget */}
        <NeverForgetSection />

        {/* Section 4: Our Little World 🌷 (Scrapbook & Relationship Timeline) */}
        <ScrapbookSection />

        {/* Section 5: A Promise To You */}
        <PromiseSection />

        {/* Section 6: Interactive Love Section (Do you know how special you are? & Virtual Hug) */}
        <InteractiveLoveSection />

        {/* Section 7: Final Letter & Jaanu's Response Box */}
        <FinalLetterSection />

      </main>
    </div>
  );
};

export default App;
