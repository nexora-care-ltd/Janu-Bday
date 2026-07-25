import React, { useState, useEffect } from 'react';
import { Heart, Plane, MapPin, Clock, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { AppConfig } from '../types';

interface HeroSectionProps {
  config: AppConfig;
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOpenCustomizer }) => {
  const [daysKnown, setDaysKnown] = useState<number>(0);
  const [daysToMeet, setDaysToMeet] = useState<number | null>(null);

  useEffect(() => {
    // Calculate days since met online
    if (config.metOnlineDate) {
      const met = new Date(config.metOnlineDate).getTime();
      const now = new Date().getTime();
      const diffDays = Math.floor((now - met) / (1000 * 60 * 60 * 24));
      setDaysKnown(diffDays > 0 ? diffDays : 0);
    }

    // Calculate countdown to meeting if valid date provided
    if (config.targetMeetingDate) {
      const target = new Date(config.targetMeetingDate).getTime();
      const now = new Date().getTime();
      if (!isNaN(target)) {
        const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
        setDaysToMeet(diffDays);
      } else {
        setDaysToMeet(null);
      }
    }
  }, [config.metOnlineDate, config.targetMeetingDate]);

  const miles = Math.round(config.distanceKm * 0.621371);

  return (
    <section className="relative pt-12 pb-10 px-4 text-center overflow-hidden">
      {/* Top Birthday Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#f9a8d4] text-[#881337] text-xs sm:text-sm font-bold tracking-wide mb-6 shadow-md shadow-rose-900/10 animate-pulse">
        <Sparkles className="w-4 h-4 text-[#e11d48]" />
        <span>Happy Birthday To My Future Wife • {config.herBirthday}</span>
        <Heart className="w-3.5 h-3.5 fill-current text-[#e11d48]" />
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#4c0519] mb-4 leading-tight">
        To My Beloved, <br />
        <span className="font-serif text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#881337] drop-shadow-sm">
          {config.herName}
        </span>
      </h1>

      {/* Tagline */}
      <p className="font-serif italic text-xl sm:text-2xl text-[#881337] max-w-lg mx-auto mb-6 font-semibold">
        "{config.heroTagline}"
      </p>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-[#881337]/90 max-w-xl mx-auto mb-10 leading-relaxed px-2 font-medium">
        {config.heroSubtitle}
      </p>

      {/* Miles Between Us - Interactive Frosted Glass Connection Box */}
      <div className="w-full max-w-md mx-auto bg-white/50 border-2 border-white/80 rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(136,19,55,0.15)] backdrop-blur-3xl relative overflow-hidden text-left">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#881337] mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#e11d48]" /> Long-Distance Connection
          </span>
          <span className="flex items-center gap-1 text-[#881337]/80">
            <Clock className="w-3.5 h-3.5" /> {config.timeZoneDiffHours}h Time Diff
          </span>
        </div>

        {/* Cities & Animated Flight Path */}
        <div className="flex items-center justify-between py-3 px-2 bg-white/70 rounded-2xl border border-white relative mb-5 shadow-inner">
          {/* His City */}
          <div className="text-center w-5/12">
            <div className="text-xs text-[#881337]/70 font-bold">His Home</div>
            <div className="font-serif text-lg font-extrabold text-[#4c0519] truncate">{config.hisCity}</div>
            <div className="text-[11px] text-[#e11d48] font-medium truncate">{config.hisCountry}</div>
          </div>

          {/* Animated Connecting Line */}
          <div className="flex-1 flex flex-col items-center justify-center px-1">
            <div className="text-[10px] font-mono text-[#e11d48] font-bold mb-1">
              {config.distanceKm.toLocaleString()} km
            </div>
            <div className="w-full relative flex items-center justify-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-[#f9a8d4] via-[#e11d48] to-[#f9a8d4] border-t border-dashed border-[#e11d48]/50"></div>
              <div className="absolute bg-[#e11d48] p-1 rounded-full shadow-md shadow-rose-500/50 animate-bounce">
                <Plane className="w-3.5 h-3.5 text-white transform rotate-45" />
              </div>
            </div>
            <div className="text-[10px] text-[#881337]/80 mt-1 font-mono">
              ({miles.toLocaleString()} mi)
            </div>
          </div>

          {/* Her City */}
          <div className="text-center w-5/12">
            <div className="text-xs text-[#881337]/70 font-bold">Her Home</div>
            <div className="font-serif text-lg font-extrabold text-[#e11d48] truncate">{config.herCity}</div>
            <div className="text-[11px] text-[#881337] font-medium truncate">{config.herCountry}</div>
          </div>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 gap-3 text-center mb-4">
          <div className="bg-white/60 border border-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs">
            <div className="flex items-center gap-1 text-xs text-[#881337]/80 font-bold mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>Days Since Story Reply</span>
            </div>
            <div className="font-serif text-2xl font-extrabold text-[#4c0519]">
              {daysKnown} <span className="text-xs font-normal text-[#881337]">days</span>
            </div>
            <div className="text-[10px] text-[#881337]/70 mt-0.5 font-bold text-[#e11d48]">Dec 31, 2024 ("INSTA ❤️") -&gt; Forever</div>
          </div>

          <div className="bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] border border-[#f9a8d4] rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs">
            <div className="flex items-center gap-1 text-xs text-[#881337] font-bold mb-1">
              <Plane className="w-3.5 h-3.5 text-[#e11d48] animate-pulse" />
              <span>Meeting in Hosur</span>
            </div>
            <div className="font-serif text-xl font-extrabold text-[#e11d48] truncate w-full">
              In 1-2 Months! ✨
            </div>
            <div className="text-[10px] text-[#881337]/80 mt-0.5 font-bold">
              London to Hosur Direct
            </div>
          </div>
        </div>

        {/* Exact Route Addresses & Husband's Life Assurance */}
        <div className="bg-gradient-to-r from-[#fff1f2] via-white to-[#fff1f2] border-2 border-[#e11d48]/40 rounded-2xl p-4 mb-4 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between border-b border-[#fbcfe8] pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e11d48] flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Our Exact Route Home
            </span>
            <span className="bg-[#e11d48] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">100% Guaranteed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white/80 p-2 rounded-xl border border-[#fbcfe8]">
              <span className="font-bold text-[#881337] block text-[11px]">🛫 His Departure Address:</span>
              <span className="text-[#4c0519] font-medium">East Ham, London E6 2AR</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-[#fbcfe8]">
              <span className="font-bold text-[#881337] block text-[11px]">🛬 Her Destination Address:</span>
              <span className="text-[#4c0519] font-medium">3/89-11, Rajaji Nagar 1st Cross, SIPCOT 1, Bedarapalli, Hosur, Tamil Nadu 635126</span>
            </div>
          </div>

          <div className="bg-rose-950/5 border border-rose-500/30 p-3 rounded-xl text-xs text-[#4c0519] font-medium italic leading-relaxed">
            <span className="font-extrabold text-[#e11d48] block not-italic mb-1">❤️ Husband's Promise:</span>
            "In one or two months definitely I will be there to meet you soon pondati! Don't worry about our future — I have planned everything for life until life end so don't worry."
          </div>
        </div>

        {/* Footer promise in card */}
        <div className="mt-4 pt-3 border-t border-[#fbcfe8] flex items-center justify-center gap-2 text-xs font-bold text-[#881337] text-center">
          <ShieldCheck className="w-4 h-4 text-[#e11d48] flex-shrink-0" />
          <span>No distance can ever diminish what my soul feels for you.</span>
        </div>
      </div>
    </section>
  );
};
