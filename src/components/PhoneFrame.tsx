import React, { useState } from 'react';
import { Smartphone, Monitor, Edit3, Heart, Sparkles, Share2, Check, ShieldCheck } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  herName: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  herName
}) => {
  const [inPhoneFrame, setInPhoneFrame] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyShareLink = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fff1f2] text-[#4c0519] flex flex-col items-center relative selection:bg-[#e11d48] selection:text-white pb-16 overflow-x-hidden">
      {/* Background Frosted Glass Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#fda4af]/60 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#f9a8d4]/50 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#fdf2f8] rounded-full blur-[100px]"></div>
      </div>

      {/* Top Floating Control Bar (Creator & Preview Controls) */}
      <header className="w-full sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-[#fbcfe8] px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#881337] flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-current animate-pulse" />
          </div>
          <div className="hidden sm:block text-xs font-bold tracking-wide text-[#4c0519]">
            For <span className="text-[#e11d48] font-serif font-bold text-sm">{herName}</span> • 27th Birthday & Love Guide
          </div>
        </div>

        {/* Right Buttons: Toggle Frame, Customize, Share */}
        <div className="flex items-center gap-2">
          {/* Toggle Phone Frame / Fullscreen */}
          <button
            onClick={() => setInPhoneFrame(!inPhoneFrame)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#fbcfe8] hover:border-[#e11d48] text-xs font-bold text-[#881337] shadow-2xs transition-all"
            title={inPhoneFrame ? "Switch to Fullscreen view" : "Switch to Mobile Phone mockup view"}
          >
            {inPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#e11d48]" />
                <span>Expand View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#e11d48]" />
                <span>Phone Preview</span>
              </>
            )}
          </button>

          {/* Share Link Button */}
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#fbcfe8] text-xs font-bold text-[#881337] shadow-2xs transition-all"
            title="Copy page URL to send to your future wife"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#e11d48]" />
                <span>Share With Her</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex justify-center items-start pt-4 px-2 sm:px-4 z-10">
        {inPhoneFrame ? (
          /* Phone Mockup Wrapper for Desktop with Frosted Glass */
          <div className="w-full max-w-[430px] bg-white/40 backdrop-blur-3xl rounded-[48px] border-[8px] border-white/80 shadow-[0_32px_64px_-16px_rgba(136,19,55,0.2)] relative overflow-hidden my-4 min-h-[850px] flex flex-col">
            {/* Phone Top Notch / Dynamic Island */}
            <div className="w-full pt-3 pb-1 px-8 flex items-center justify-between bg-[#fff1f2]/90 text-[11px] font-bold text-[#881337] z-30 select-none border-b border-white/40">
              <span>9:41</span>
              <div className="w-24 h-5 bg-[#4c0519] rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></span>
                <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-pulse"></span>
              </div>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Scrollable Inside Phone */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-gradient-to-b from-[#fff1f2] via-[#fdf2f8] to-[#fff1f2] pb-12 relative">
              {children}
            </div>

            {/* Phone Home Indicator Bar */}
            <div className="w-full py-2 bg-[#fff1f2]/90 flex justify-center items-center z-30 border-t border-white/40">
              <div className="w-32 h-1 bg-[#881337]/30 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Full Screen View */
          <div className="w-full max-w-4xl mx-auto pb-12">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
