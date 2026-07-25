import React, { useState } from 'react';
import { Heart, Sparkles, Gift, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeWelcomeProps {
  herName: string;
  hisName: string;
  onOpen: () => void;
}

export const EnvelopeWelcome: React.FC<EnvelopeWelcomeProps> = ({ herName, hisName, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Launch romantic confetti (hearts and rose petals)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#ffe4e6', '#ffd700'],
      shapes: ['circle', 'square']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185', '#ffffff']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f43f5e', '#ffd700']
      });
    }, 300);

    // Wait 1.2s for envelope opening animation then reveal main page
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#fff1f2] text-[#4c0519] relative overflow-hidden">
      {/* Background Frosted Glass Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#fda4af]/60 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#f9a8d4]/50 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#fdf2f8] rounded-full blur-[100px]"></div>
        
        {/* Decorative floating hearts */}
        <div className="absolute top-16 left-8 text-[#e11d48]/30 animate-float" style={{ animationDuration: '6s' }}>
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <div className="absolute bottom-24 right-12 text-[#881337]/20 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <div className="absolute top-1/3 right-6 text-[#e11d48]/40 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-1/4 left-10 text-[#881337]/30 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Main Card Container with Frosted Glass */}
      <div className={`w-full max-w-md bg-white/50 backdrop-blur-3xl border-2 border-white/80 rounded-[36px] p-8 shadow-[0_32px_64px_-16px_rgba(136,19,55,0.25)] flex flex-col items-center text-center transition-all duration-1000 relative z-10 ${
        isOpening ? 'scale-110 opacity-0 translate-y-8 pointer-events-none' : 'scale-100 opacity-100'
      }`}>
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-[#f9a8d4] text-[#881337] text-xs font-bold tracking-wider uppercase mb-6 shadow-xs animate-pulse">
          <Gift className="w-3.5 h-3.5 text-[#e11d48]" />
          <span>Birthday Surprise • For Janu From Kamalesh 💙</span>
        </div>

        {/* Envelope Graphic / Wax Seal */}
        <div className="relative mb-8 group cursor-pointer" onClick={handleOpenClick}>
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#fff1f2] via-[#fdf2f8] to-[#fff1f2] flex items-center justify-center border-2 border-white shadow-inner group-hover:scale-105 transition-transform duration-500">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#e11d48] to-[#881337] flex items-center justify-center shadow-lg shadow-rose-900/30 group-hover:rotate-6 transition-transform duration-500 border-2 border-white/60">
              <Heart className="w-14 h-14 text-white fill-current drop-shadow-md animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#881337] text-white px-3.5 py-1 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1 border border-white">
            <Sparkles className="w-3 h-3 fill-current text-amber-300" /> Tap Me
          </div>
        </div>

        {/* Title & Greeting */}
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4c0519] mb-3 leading-tight">
          For My Future Wife, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] to-[#881337] font-serif text-4xl sm:text-5xl block mt-1 font-black">{herName}</span>
        </h1>

        <div className="bg-rose-950/5 p-3 rounded-xl border border-rose-200 text-xs text-[#881337] font-bold italic mb-4 max-w-xs">
          "31st Dec 2024 I replied to your story in Instagram! I still remember that day! After that, it's been odd years and still we are together!" — Kamalesh
        </div>

        <p className="font-serif italic text-sm sm:text-base text-[#881337] mb-6 leading-relaxed max-w-xs font-semibold">
          Dreaming of Time Travel, Moon, Ooty, Kodaikanal, Kerala, Murugan Kovil, Iceland, Paris & all cold places in the world with you! Here is your birthday gift.
        </p>

        {/* Open Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#881337] hover:from-[#be123c] hover:to-[#4c0519] text-white font-extrabold text-lg shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 transform active:scale-95 transition-all duration-300 border border-white/30 group"
        >
          <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>{isOpening ? 'Unfolding Our Love...' : 'Open Your Birthday Gift'}</span>
          <Heart className="w-4 h-4 fill-current animate-bounce text-rose-200" />
        </button>

        <p className="text-xs text-[#881337]/80 mt-4 font-mono font-medium">
          From {hisName} • With all my love forever 🫂
        </p>
      </div>
    </div>
  );
};
