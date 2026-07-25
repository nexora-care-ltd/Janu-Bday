import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Heart, Gift, Volume2, ShieldAlert, CheckCircle2, Lock, Unlock, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ISTBirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; isBirthday: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
  });

  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [currentISTString, setCurrentISTString] = useState<string>('');

  useEffect(() => {
    const calculateISTCountdown = () => {
      const now = new Date();
      // Get UTC timestamp in milliseconds
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // IST is UTC + 5:30 (5.5 hours)
      const istOffset = 5.5 * 3600000;
      const istNow = new Date(utc + istOffset);

      // Format current IST time string for display
      const istHours = istNow.getHours().toString().padStart(2, '0');
      const istMinutes = istNow.getMinutes().toString().padStart(2, '0');
      const istSeconds = istNow.getSeconds().toString().padStart(2, '0');
      setCurrentISTString(`${istHours}:${istMinutes}:${istSeconds} IST`);

      // Target birthday: July 27 at 00:00:00 IST
      let targetYear = istNow.getFullYear();
      const targetDate = new Date(targetYear, 6, 27, 0, 0, 0); // Month is 0-indexed (6 = July)

      // If July 27 00:00 has passed this year and it's not birthday day anymore, set target to next year
      // But if it IS July 27th (between 00:00 and 23:59:59), set isBirthday to true!
      if (istNow.getMonth() === 6 && istNow.getDate() === 27) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        if (!isRevealed) {
          // Auto reveal if it's birthday!
        }
        return;
      }

      if (istNow > targetDate) {
        targetDate.setFullYear(targetYear + 1);
      }

      const diff = targetDate.getTime() - istNow.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
      }
    };

    calculateISTCountdown();
    const interval = setInterval(calculateISTCountdown, 1000);
    return () => clearInterval(interval);
  }, [isRevealed]);

  const handleTriggerReveal = () => {
    setIsRevealed(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#881337', '#ffd700', '#6d28d9', '#ffffff'],
    });
  };

  return (
    <section className="py-8 px-4 max-w-xl mx-auto text-left">
      {/* Frosted Glass Countdown Card */}
      <div className="bg-gradient-to-br from-white/70 via-white/50 to-white/60 backdrop-blur-3xl border-2 border-[#f9a8d4] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(136,19,55,0.2)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#f43f5e]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-[#e11d48] text-xs font-bold uppercase tracking-widest mb-2 shadow-2xs">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>IST Midnight Reveal Clock • Exactly 00:00</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#4c0519]">
            July 27th Birthday Countdown
          </h2>
          <p className="text-xs text-[#881337] font-medium mt-1">
            Locked to Indian Standard Time (IST) for my Queen in Hosur • Current Time: <span className="font-mono font-bold bg-[#fff1f2] px-2 py-0.5 rounded text-[#e11d48]">{currentISTString}</span>
          </p>
        </div>

        {/* Live Countdown Grid */}
        {!timeLeft.isBirthday && !isRevealed ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 relative z-10">
            <div className="bg-white/80 border border-[#fbcfe8] rounded-2xl p-3 text-center shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#e11d48]">
                {timeLeft.days}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-[#881337]/80 tracking-wider mt-0.5">Days</div>
            </div>
            <div className="bg-white/80 border border-[#fbcfe8] rounded-2xl p-3 text-center shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#e11d48]">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-[#881337]/80 tracking-wider mt-0.5">Hours</div>
            </div>
            <div className="bg-white/80 border border-[#fbcfe8] rounded-2xl p-3 text-center shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#e11d48]">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-[#881337]/80 tracking-wider mt-0.5">Mins</div>
            </div>
            <div className="bg-white/80 border border-[#fbcfe8] rounded-2xl p-3 text-center shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#e11d48] animate-pulse">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-[#881337]/80 tracking-wider mt-0.5">Secs</div>
            </div>
          </div>
        ) : null}

        {/* Reveal Button (Available immediately so they can see the message!) */}
        {!isRevealed ? (
          <div className="text-center relative z-10">
            <button
              onClick={handleTriggerReveal}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#e11d48] via-[#881337] to-[#4c0519] hover:from-[#be123c] hover:to-[#1e1b4b] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-rose-900/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all border border-white/20 group animate-pulse"
            >
              <Gift className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>✨ {timeLeft.isBirthday ? "IT'S 00:00! REVEAL BIRTHDAY SURPRISE NOW!" : "Unlock 00:00 Midnight Surprise Now (Test Reveal)"}</span>
              <Unlock className="w-4 h-4 text-pink-300" />
            </button>
            <p className="text-[11px] text-[#881337]/70 mt-2 font-medium">
              Click anytime to see the secret midnight birthday letter written especially for Pondati Janu 💙
            </p>
          </div>
        ) : (
          /* Revealed Midnight Surprise Message Box */
          <div className="mt-4 bg-gradient-to-br from-[#fff1f2] via-white to-[#fdf2f8] border-2 border-[#e11d48] rounded-2xl p-6 shadow-xl relative z-10 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#fbcfe8] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e11d48] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  🎉
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e11d48] block">
                    00:00 Midnight Reveal • Indian Standard Time
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#4c0519]">
                    Happy Birthday Pondati Janu 💙
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsRevealed(false)}
                className="text-xs font-bold text-[#881337] hover:text-[#e11d48] underline"
              >
                Hide
              </button>
            </div>

            {/* The exact requested word-for-word message */}
            <div className="bg-white/90 p-5 rounded-xl border border-[#fbcfe8] shadow-inner font-sans text-sm sm:text-base leading-relaxed text-[#4c0519] space-y-3 whitespace-pre-wrap font-medium">
              <div className="bg-rose-950/5 p-3 rounded-lg border border-rose-200 text-xs text-[#881337] font-bold italic mb-2">
                "31st Dec 2024 I replied to your story in Instagram! I still remember that day! After that, it's been odd years and still we are together!" — Kamalesh
              </div>

              <p className="text-base sm:text-lg font-bold text-[#e11d48] border-l-4 border-[#e11d48] pl-3 py-1 bg-[#fff1f2]/60 rounded-r-lg">
                "Wish you happy birthday 🎉🎂 pondati 💙 enjoy your life be happy your happiness is mine too 💙💓 you are so precious to me 💖"
              </p>

              <p>
                we have lots of memories 😊 leave all bad memories and hold me with you princess 💙 always i love you not in the way you think 💙 I always there for you happy or sad doesn't matter i will be with you ❤️🤌🤗
              </p>

              <p className="bg-rose-50/80 p-3 rounded-lg border border-rose-100 font-semibold text-[#881337]">
                now a days i am missing you a lot i think worst days of my life 😊💙 waiting for kisses and our kids 😚 once again wish you happy birthday 🎉🎁 Angel princess ammu pattu chlm Janu you are my everything d pondati 😚 💋
              </p>

              <div className="bg-gradient-to-r from-[#fff1f2] via-[#fdf2f8] to-[#fff1f2] p-3 rounded-xl border border-[#f9a8d4] text-xs font-bold text-[#4c0519] text-center space-y-1">
                <div className="text-[#e11d48] font-extrabold uppercase tracking-wider">🌟 Our Forever Dreams 🌟</div>
                <div>Time Travel ⏳ • The Moon 🌙 • Ooty 🌲 • Kodaikanal 🌄 • Kerala Waterfalls 🌊 • Murugan Kovil 🛕</div>
                <div>Iceland 🧊 • Finland 🇫🇮 • Greenland 🏔️ • Paris 🗼 • Himachal Pradesh 🏔️ • All Cold Places in World ❄️</div>
              </div>

              <p className="font-extrabold text-[#4c0519] pt-1 text-center bg-gradient-to-r from-transparent via-[#fff1f2] to-transparent py-2">
                once again happy birthday 🎉 thanks for everything you give a unforgettable memories ❤️ love you d 🫂 — Forever yours, Kamalesh
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#fbcfe8] flex items-center justify-center gap-2 text-xs font-extrabold text-[#881337]">
              <Heart className="w-4 h-4 text-[#e11d48] fill-current animate-pulse" />
              <span>Forever Your Husband Kamalesh • For My Pondati Janu (Vaishu) 💙</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
