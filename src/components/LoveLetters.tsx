import React, { useState } from 'react';
import { Mail, Heart, Sparkles, CheckCircle2, Send, Quote } from 'lucide-react';
import { LoveLetterItem } from '../types';
import confetti from 'canvas-confetti';

interface LoveLettersProps {
  letters: LoveLetterItem[];
  herName: string;
  hisName: string;
}

export const LoveLetters: React.FC<LoveLettersProps> = ({ letters, herName, hisName }) => {
  const [activeTab, setActiveTab] = useState<string>(letters[0]?.id || 'l1');
  const [kissesSent, setKissesSent] = useState<number>(0);

  const currentLetter = letters.find(l => l.id === activeTab) || letters[0];

  const handleSendKiss = () => {
    setKissesSent(prev => prev + 1);
    // Trigger floating heart confetti
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#ffe4e6'],
      shapes: ['circle']
    });
  };

  return (
    <section className="py-10 px-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>Birthday Love Notes</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
          Unfold My Heart
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select a letter below to read my vows and wishes for you
        </p>
      </div>

      {/* Letters Navigation Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 px-1">
        {letters.map((letter, idx) => {
          const isActive = letter.id === activeTab;
          return (
            <button
              key={letter.id}
              onClick={() => setActiveTab(letter.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-400 shadow-lg shadow-rose-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-rose-500/40 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isActive ? 'fill-current text-white' : 'text-rose-400'}`} />
              <span className="whitespace-nowrap">{letter.title || `Letter #${idx + 1}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Letter Card */}
      {currentLetter && (
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
          {/* Subtle watermark quote icon in corner */}
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-rose-500/5 rotate-12 pointer-events-none" />

          {/* Letter header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 block mb-1">
                {currentLetter.date}
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                {currentLetter.title}
              </h3>
            </div>
            <div className="bg-rose-500/20 p-2 rounded-full border border-rose-500/30 text-rose-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Letter Body */}
          <div className="font-serif-romantic text-lg sm:text-xl text-slate-200 leading-relaxed whitespace-pre-line mb-8 select-text">
            {currentLetter.content}
          </div>

          {/* Letter Footer & Interactive Action */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs text-slate-400 block">Forever and always,</span>
              <span className="font-script text-2xl text-rose-300">{hisName}</span>
            </div>

            {/* Interactive Love Back Button */}
            <button
              onClick={handleSendKiss}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 group"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-current group-hover:scale-125 transition-transform" />
              <span>Send Kiss Back {kissesSent > 0 ? `(${kissesSent})` : ''}</span>
              <Send className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
