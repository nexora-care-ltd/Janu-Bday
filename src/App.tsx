import React, { useState, useEffect } from 'react';
import { AppConfig, PhotoItem } from './types';
import { DEFAULT_CONFIG } from './data/defaultConfig';
import { EnvelopeWelcome } from './components/EnvelopeWelcome';
import { HeroSection } from './components/HeroSection';
import { LoveLetters } from './components/LoveLetters';
import { TimelineMemories } from './components/TimelineMemories';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveJar } from './components/LoveJar';
import { BirthdayCake } from './components/BirthdayCake';
import { MusicPlayer } from './components/MusicPlayer';
import { PhoneFrame } from './components/PhoneFrame';
import { CustomizerModal } from './components/CustomizerModal';
import { VaishuUniverse } from './components/VaishuUniverse';
import { ISTBirthdayCountdown } from './components/ISTBirthdayCountdown';
import { JanuMemoryGallery } from './components/JanuMemoryGallery';
import { Heart, Sparkles, Gift } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('birthday_app_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.herName === 'My Beloved' || !parsed.herName || parsed.herName === 'Vaishu Jananni GM' || !parsed.herName.includes('Janu')) {
          parsed.herName = DEFAULT_CONFIG.herName;
          parsed.heroSubtitle = DEFAULT_CONFIG.heroSubtitle;
          parsed.heroTagline = DEFAULT_CONFIG.heroTagline;
          parsed.musicTitle = DEFAULT_CONFIG.musicTitle;
          parsed.metOnlineDate = DEFAULT_CONFIG.metOnlineDate;
          parsed.letters = DEFAULT_CONFIG.letters;
          parsed.memories = DEFAULT_CONFIG.memories;
          parsed.reasons = DEFAULT_CONFIG.reasons;
          parsed.photos = DEFAULT_CONFIG.photos;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading config from localStorage:', e);
    }
    return DEFAULT_CONFIG;
  });

  const [isOpened, setIsOpened] = useState(false);
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('birthday_app_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving config to localStorage:', e);
    }
  };

  const handleAddPhoto = (newPhoto: PhotoItem) => {
    const updated = {
      ...config,
      photos: [newPhoto, ...config.photos]
    };
    handleSaveConfig(updated);
  };

  const handleOpenGift = () => {
    setIsOpened(true);
    setAutoPlayMusic(true);
  };

  // If envelope not opened yet, show the romantic welcome gift screen
  if (!isOpened) {
    return (
      <EnvelopeWelcome
        herName={config.herName}
        hisName={config.hisName}
        onOpen={handleOpenGift}
      />
    );
  }

  return (
    <>
      {/* Ambient Music Player Button */}
      <MusicPlayer
        title={config.musicTitle}
        customUrl={config.musicUrl}
        autoPlayTriggered={autoPlayMusic}
      />

      {/* Main Page Content Inside Phone Frame / Fullscreen */}
      <PhoneFrame
        herName={config.herName}
        isCreatorMode={isCreatorMode}
        onToggleCreatorMode={() => setIsCreatorMode(!isCreatorMode)}
        onOpenCustomizer={() => setIsCreatorMode(true)}
      >
        <div className="space-y-12 pb-8">
          {/* Hero Section */}
          <HeroSection
            config={config}
            onOpenCustomizer={() => setIsCreatorMode(true)}
          />

          {/* Indian Standard Time 00:00 Birthday Countdown & Reveal */}
          <ISTBirthdayCountdown />

          {/* Vaishu's Exclusive Universe & Preferences */}
          <VaishuUniverse />

          {/* Janu's Saree & Memory Photo Album (9 Photos & Dec 31 Story Reply) */}
          <JanuMemoryGallery />

          {/* Unfolding Love Letters */}
          <LoveLetters
            letters={config.letters}
            herName={config.herName}
            hisName={config.hisName}
          />

          {/* Favorite Online Memories Timeline */}
          <TimelineMemories
            memories={config.memories}
          />

          {/* Photo Gallery (Polaroids) */}
          <PhotoGallery
            photos={config.photos}
            onAddPhoto={handleAddPhoto}
            isCreatorMode={isCreatorMode}
          />

          {/* Infinite Wishing Jar */}
          <LoveJar
            reasons={config.reasons}
          />

          {/* Birthday Cake & Candles Finale */}
          <BirthdayCake
            herName={config.herName}
            finalPromise={config.finalPromise}
          />

          {/* Romantic Footer */}
          <footer className="text-center pt-8 pb-4 px-6 border-t border-[#fbcfe8] max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#f9a8d4]"></span>
              <Heart className="w-4 h-4 text-[#e11d48] fill-current animate-pulse" />
              <span className="w-8 h-[1px] bg-[#f9a8d4]"></span>
            </div>
            <p className="font-serif text-base font-bold text-[#4c0519]">
              Happy Birthday, My Future Wife • Vaishu Jananni GM
            </p>
            <p className="text-xs text-[#881337] mt-1 font-serif italic">
              "Until the day we stand together under the Northern Lights, let my love wrap around you like a warm blanket."
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#881337]/70 font-mono">
              <button
                onClick={() => setIsCreatorMode(true)}
                className="text-[#e11d48] hover:text-[#be123c] underline font-bold"
              >
                ✏️ Customize Page
              </button>
              <span>•</span>
              <span>Made with ❤️ across the miles</span>
            </div>
          </footer>
        </div>
      </PhoneFrame>

      {/* Creator Customization Modal */}
      {isCreatorMode && (
        <CustomizerModal
          config={config}
          onSave={handleSaveConfig}
          onClose={() => setIsCreatorMode(false)}
        />
      )}
    </>
  );
}
