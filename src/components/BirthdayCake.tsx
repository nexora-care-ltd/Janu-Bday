import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Flame, CheckCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeProps {
  herName: string;
  finalPromise: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ herName, finalPromise }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit || isBlowing) return;
    setIsBlowing(true);

    setTimeout(() => {
      setCandlesLit(false);
      setWishMade(true);
      setIsBlowing(false);

      // Grand birthday confetti finale!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#ffd700', '#ffffff', '#fb7185'],
        shapes: ['circle', 'square']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#f43f5e', '#ffd700']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#ec4899', '#ffd700']
        });
      }, 300);
    }, 800);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section className="py-12 px-4 max-w-xl mx-auto text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5 text-rose-400" />
          <span>The Birthday Finale</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
          Make Your Wish, {herName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Close your eyes, make a wish for our future together, and blow out the candles!
        </p>
      </div>

      {/* Birthday Cake Box */}
      <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* The Cake Graphic */}
        <div className="flex flex-col items-center justify-center py-6 relative">
          {/* Candles */}
          <div className="flex items-end justify-center gap-4 mb-1 z-10">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-6 flex items-center justify-center">
                  {candlesLit ? (
                    <div className="w-3 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-pulse shadow-lg shadow-amber-400/80 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                  ) : (
                    <div className="w-1.5 h-3 bg-slate-600 rounded-full opacity-40 animate-fade-out"></div>
                  )}
                </div>
                {/* Candle stick */}
                <div className={`w-2.5 h-8 rounded-t-sm ${idx % 2 === 0 ? 'bg-rose-400' : 'bg-pink-300'} border border-rose-300/50 shadow-sm`}></div>
              </div>
            ))}
          </div>

          {/* Top Tier Cake */}
          <div className="w-40 h-12 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-2xl border-t-4 border-white/80 shadow-md flex items-center justify-center relative">
            <div className="absolute -top-1 w-full flex justify-around">
              <span className="w-3 h-3 bg-white rounded-full shadow-sm"></span>
              <span className="w-3 h-3 bg-white rounded-full shadow-sm"></span>
              <span className="w-3 h-3 bg-white rounded-full shadow-sm"></span>
              <span className="w-3 h-3 bg-white rounded-full shadow-sm"></span>
            </div>
          </div>

          {/* Bottom Tier Cake */}
          <div className="w-56 h-16 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-t-xl rounded-b-2xl border-t-4 border-rose-200/90 shadow-xl flex items-center justify-center relative">
            <span className="font-script text-white text-xl tracking-wide drop-shadow-md">
              Happy Birthday {herName}
            </span>
          </div>

          {/* Cake Plate */}
          <div className="w-64 h-3 bg-slate-700/80 rounded-full shadow-2xl mt-1 border border-slate-600"></div>
        </div>

        {/* Action Button */}
        {candlesLit ? (
          <button
            onClick={handleBlowCandles}
            disabled={isBlowing}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-600/40 flex items-center justify-center gap-3 transform active:scale-95 transition-all duration-300 animate-pulse-glow border border-amber-300/40 mt-4"
          >
            <Flame className={`w-5 h-5 text-amber-200 ${isBlowing ? 'animate-ping' : 'animate-bounce'}`} />
            <span>{isBlowing ? 'Blowing Out Candles... 💨' : 'Blow Out The Candles & Make Wish'}</span>
          </button>
        ) : (
          <div className="mt-4 animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold mb-4">
              <CheckCircle className="w-4 h-4" /> Wish Granted! Candles Blown Out 🎉
            </div>

            {/* His Secret Vow Card */}
            <div className="bg-gradient-to-br from-rose-950/80 via-slate-900 to-pink-950/80 border-2 border-rose-400/60 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden mb-6">
              <Sparkles className="absolute top-3 right-3 w-5 h-5 text-amber-300 animate-pulse" />
              <h3 className="font-serif-display text-xl font-bold text-rose-300 mb-2">
                My Secret Promise To You
              </h3>
              <p className="font-serif-romantic text-lg sm:text-xl text-slate-200 leading-relaxed italic">
                "{finalPromise}"
              </p>
            </div>

            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Relight Candles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
