import React, { useState } from 'react';
import { Heart, Sparkles, Gift, Star, RefreshCw, Bookmark } from 'lucide-react';
import { ReasonNote } from '../types';
import confetti from 'canvas-confetti';

interface LoveJarProps {
  reasons: ReasonNote[];
}

export const LoveJar: React.FC<LoveJarProps> = ({ reasons }) => {
  const [activeReason, setActiveReason] = useState<ReasonNote | null>(reasons[0] || null);
  const [isShaking, setIsShaking] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const handlePullReason = () => {
    if (isShaking) return;
    setIsShaking(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * reasons.length);
      setActiveReason(reasons[randomIndex] || null);
      setIsShaking(false);

      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#f43f5e', '#ec4899', '#ffffff'],
        shapes: ['circle', 'square']
      });
    }, 400);
  };

  const handleSaveReason = () => {
    setSavedCount(prev => prev + 1);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.75 },
      colors: ['#f43f5e', '#ffd700']
    });
  };

  return (
    <section className="py-10 px-4 max-w-xl mx-auto text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
          <span>Infinite Love Jar</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
          Reasons I Can't Wait To Marry You
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tap the wishing jar to unfold a folded paper star written just for you
        </p>
      </div>

      {/* The Jar Graphic & Note Card */}
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        {/* Background glowing stars */}
        <div className="absolute top-4 left-6 text-amber-400/20 animate-pulse">
          <Star className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-6 right-8 text-rose-400/20 animate-pulse" style={{ animationDelay: '1s' }}>
          <Heart className="w-8 h-8 fill-current" />
        </div>

        {/* Jar Visual Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handlePullReason}
            disabled={isShaking}
            className={`group relative w-32 h-40 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/10 via-rose-500/10 to-amber-500/20 border-2 border-amber-300/40 shadow-inner flex flex-col items-center justify-end p-4 transition-all duration-300 ${
              isShaking ? 'animate-bounce scale-105 border-amber-300' : 'hover:scale-105 hover:border-amber-300/70'
            }`}
          >
            {/* Jar Lid */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-md border border-amber-200/50 shadow-md"></div>

            {/* Glowing stars inside jar */}
            <div className="absolute inset-4 flex flex-wrap items-center justify-center gap-2 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
              <Star className="w-5 h-5 text-amber-300 fill-current animate-spin" style={{ animationDuration: '10s' }} />
              <Heart className="w-4 h-4 text-rose-400 fill-current animate-pulse" />
              <Star className="w-4 h-4 text-pink-300 fill-current" />
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <Star className="w-6 h-6 text-amber-400 fill-current" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30 z-10 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              Tap Jar ✨
            </span>
          </button>
        </div>

        {/* Active Note Card */}
        {activeReason ? (
          <div className="bg-[#fdfbf7] text-slate-900 p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-amber-200 relative transform transition-all duration-300 mb-6">
            <div className="flex items-center justify-between text-xs text-amber-700 font-mono mb-2 uppercase tracking-wider">
              <span>Folded Love Star</span>
              <span>#{activeReason.id || 'Special'}</span>
            </div>
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-slate-800 leading-relaxed italic">
              "{activeReason.text}"
            </p>
          </div>
        ) : (
          <div className="text-slate-400 text-sm mb-6 font-serif-romantic italic">
            The jar is full of my love for you. Tap it to pull a note!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handlePullReason}
            disabled={isShaking}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isShaking ? 'animate-spin' : ''}`} />
            <span>Pull Another Love Note</span>
          </button>

          <button
            onClick={handleSaveReason}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <Bookmark className="w-4 h-4 fill-current text-rose-400" />
            <span>Save Note {savedCount > 0 ? `(${savedCount} Saved)` : ''}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
