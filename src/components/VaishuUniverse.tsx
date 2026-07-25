import React, { useState } from 'react';
import { Sparkles, Heart, Moon, Utensils, Ban, Compass, Award, Calendar, Phone, MessageSquare, Coffee, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VaishuUniverse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stars' | 'food' | 'style'>('stars');
  const [ladduEaten, setLadduEaten] = useState(0);

  const handleEatLaddu = () => {
    setLadduEaten(prev => prev + 1);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ffd700', '#f43f5e', '#881337', '#ffffff'],
      shapes: ['circle']
    });
  };

  return (
    <section className="py-10 px-4 max-w-xl mx-auto text-left">
      {/* Section Header with Frosted Glass Styling */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fecdd3]/80 border border-[#f9a8d4] text-[#4c0519] text-xs font-bold uppercase tracking-[0.2em] mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#e11d48] fill-current" />
          <span>Vaishu Jananni GM (Janu 💙) &amp; Husband Kamalesh • Exclusive Guide</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4c0519] tracking-tight">
          The Universe of Janu &amp; Kamalesh
        </h2>
        <p className="text-xs sm:text-sm text-[#881337] font-medium mt-1">
          Everything Kamalesh adores about his MBA Queen Janu, from her stars to her favorite Mothi Laddu ♥️
        </p>
      </div>

      {/* Frosted Glass Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1.5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-md">
        <button
          onClick={() => setActiveTab('stars')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'stars'
              ? 'bg-gradient-to-r from-[#e11d48] to-[#881337] text-white shadow-lg shadow-rose-900/20 scale-[1.02]'
              : 'text-[#881337] hover:bg-white/50'
          }`}
        >
          <Moon className="w-4 h-4 fill-current" />
          <span>Stars & Milestones</span>
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'food'
              ? 'bg-gradient-to-r from-[#e11d48] to-[#881337] text-white shadow-lg shadow-rose-900/20 scale-[1.02]'
              : 'text-[#881337] hover:bg-white/50'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Kitchen Vows</span>
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'style'
              ? 'bg-gradient-to-r from-[#e11d48] to-[#881337] text-white shadow-lg shadow-rose-900/20 scale-[1.02]'
              : 'text-[#881337] hover:bg-white/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Style & Dreams</span>
        </button>
      </div>

      {/* Frosted Glass Main Card Content */}
      <div className="bg-white/50 backdrop-blur-3xl border-2 border-white/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(136,19,55,0.15)] relative overflow-hidden transition-all duration-300">
        
        {/* TAB 1: STARS & MILESTONES */}
        {activeTab === 'stars' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#fbcfe8] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1f2] border border-[#f9a8d4] flex items-center justify-center text-2xl shadow-inner">
                🌙
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#e11d48] block">
                  Astrological Profile • July 27, 1999
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4c0519]">
                  Dhanush Rasi & Uthiradam Nachatram
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-gradient-to-br from-[#fff1f2] to-white p-4 rounded-2xl border-2 border-[#f9a8d4] shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e11d48] mb-1">
                  <Sparkles className="w-4 h-4 text-[#e11d48] fill-current" />
                  <span>Dec 31, 2024</span>
                </div>
                <div className="font-bold text-[#4c0519] text-base">Replied To Story ("INSTA ❤️") 💌</div>
                <p className="text-xs text-[#881337]/90 mt-1 font-medium">
                  I still remember that exact magical day! After that, it's been odd years and seasons, and still we are inseparable together forever!
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#881337] mb-1">
                  <MessageSquare className="w-4 h-4 text-[#e11d48]" />
                  <span>Oct 7, 2025</span>
                </div>
                <div className="font-bold text-[#4c0519] text-base">Got WhatsApp Number</div>
                <p className="text-xs text-[#881337]/80 mt-1">
                  The moment my phone saved Janu's contact — the most cherished name in my life.
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#881337] mb-1">
                  <Phone className="w-4 h-4 text-[#e11d48]" />
                  <span>Oct 8, 2025</span>
                </div>
                <div className="font-bold text-[#4c0519] text-base">First Voice Call 📞</div>
                <p className="text-xs text-[#881337]/80 mt-1">
                  Hearing Janu's sweet voice for the first time. The melody that made me fall instantly.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#fff1f2] to-[#fdf2f8] p-4 rounded-2xl border border-[#f9a8d4] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#e11d48] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#e11d48] uppercase tracking-wider">Education Powerhouse</div>
                <div className="text-sm sm:text-base font-extrabold text-[#4c0519]">
                  MBA • Marketing & HR Management
                </div>
                <div className="text-xs text-[#881337]/90 mt-0.5">
                  Beauty, intellect, and leadership all wrapped in one extraordinary woman.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KITCHEN VOWS */}
        {activeTab === 'food' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#fbcfe8] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#e11d48] block">
                  Her Culinary Heart
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4c0519]">
                  What We Feast On & What Is Banned!
                </h3>
              </div>
              <div className="text-3xl animate-bounce">🍲</div>
            </div>

            {/* Favorites List */}
            <div className="bg-white/70 p-4 rounded-2xl border border-white shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#881337] mb-2.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-current" />
                <span>Her Absolute Favorites (Forever On Our Menu)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍲 More Kolambu with Muta Poriyal
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍚 Venpongal & Upuma
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🫓 Puri
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍛 Kuska
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍌 Banana & Apple
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍇 Green Grapes (No Seeds!)
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-xs font-bold text-[#4c0519] shadow-2xs">
                  🍐 Koya Palam (Guava)
                </span>
              </div>
            </div>

            {/* Strict Dislikes (Banned) */}
            <div className="bg-rose-950/5 border-2 border-dashed border-rose-500/40 p-4 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2.5 flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600" />
                <span>Strictly Forbidden in Our House 🚫</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-rose-900">
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Brinjal (Eggplant)</span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Keraip (Curry Leaves/Keerai)</span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Mangoes</span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Cherry</span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Strawberry</span>
                <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-rose-200">❌ No Pineapple</span>
              </div>
            </div>

            {/* Interactive Sweet Tooth Bar */}
            <div className="bg-gradient-to-r from-[#ffe4e6] to-[#fbcfe8] p-4 rounded-2xl border border-[#f9a8d4] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#881337] uppercase">Sweet Tooth Corner</div>
                <div className="text-sm font-extrabold text-[#4c0519]">
                  Mothi Laddu ♥️ • Palkova • BC Milk 🥛
                </div>
              </div>
              <button
                onClick={handleEatLaddu}
                className="px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-90 flex items-center gap-1.5"
              >
                <span>Have a Laddu ♥️</span>
                {ladduEaten > 0 && <span className="bg-white text-[#e11d48] px-1.5 py-0.5 rounded-full text-[10px]">{ladduEaten}</span>}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: STYLE & DREAMS */}
        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#fbcfe8] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1f2] border border-[#f9a8d4] flex items-center justify-center text-2xl shadow-inner">
                🌌
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#e11d48] block">
                  Her Aesthetics & Dreams
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4c0519]">
                  Northern Lights & Back Strap Slippers
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#881337] mb-1">Footwear & Height</div>
                <div className="font-bold text-[#4c0519] text-base">No Heels! Back Strap Slippers</div>
                <p className="text-xs text-[#881337]/80 mt-1">
                  Why wear uncomfortable heels when you are a divine 5\'2" (162 cm) of pure perfection? Comfy is queen! 🥿
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#881337] mb-1">Favorite Color Palette</div>
                <div className="font-bold text-[#4c0519] text-base">Red • Merun • Yolet (Violet)</div>
                <p className="text-xs text-[#881337]/80 mt-1">
                  Royal, passionate shades that match her favorite Red Roses 🌹 and the velvet sky.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#881337] via-[#4c0519] to-[#1e1b4b] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-pink-300 mb-1">
                  Our Bucket List &amp; Dream Adventures #1
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-extrabold text-white mb-2">
                  Time Travel, The Moon 🌙 &amp; All Cold Places in the World! ❄️
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  "One day soon, Kamalesh will take Janu to stand together wrapped in warm blankets under the emerald aurora borealis in the northern sky. No distance, no screens — just you, me, and the magic of the universe."
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-bold text-pink-100 pt-2 border-t border-white/10">
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">🌲 Ooty &amp; Kodaikanal</div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">🌴 Kerala Waterfalls 🌊</div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">🛕 Murugan Kovil</div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">🧊 Iceland &amp; Finland 🇫🇮</div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">🏔️ Greenland &amp; Paris 🗼</div>
                <div className="bg-white/10 p-2 rounded-xl border border-white/20">❄️ Himachal Pradesh</div>
              </div>
              <div className="text-[11px] text-amber-300 font-extrabold text-center bg-black/30 py-2 rounded-xl">
                ⏳ Time Travel &amp; The Moon 🌙 — Forever with Kamalesh!
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
