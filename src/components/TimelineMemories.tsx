import React, { useState } from 'react';
import { Clock, MessageCircle, Video, Music, Moon, Plane, Heart, Sparkles, Volume2, Check } from 'lucide-react';
import { MemoryItem } from '../types';
import confetti from 'canvas-confetti';

interface TimelineMemoriesProps {
  memories: MemoryItem[];
}

export const TimelineMemories: React.FC<TimelineMemoriesProps> = ({ memories }) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [likedMemories, setLikedMemories] = useState<Record<string, number>>({});

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'message': return <MessageCircle className="w-5 h-5 text-rose-300" />;
      case 'video': return <Video className="w-5 h-5 text-pink-300" />;
      case 'music': return <Music className="w-5 h-5 text-purple-300" />;
      case 'moon': return <Moon className="w-5 h-5 text-amber-300" />;
      case 'plane': return <Plane className="w-5 h-5 text-rose-300 animate-pulse" />;
      default: return <Heart className="w-5 h-5 text-rose-300" />;
    }
  };

  const handleSimulateAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    // Simulate audio finished after 4 seconds
    setTimeout(() => {
      setPlayingAudioId(prev => (prev === id ? null : prev));
    }, 4000);
  };

  const handleLikeMemory = (id: string) => {
    setLikedMemories(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    confetti({
      particleCount: 15,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#ffd700']
    });
  };

  return (
    <section className="py-10 px-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Journey</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
          Our Favorite Memories
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          From a simple online notification to the love of my lifetime
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-dashed border-rose-500/30 ml-2 sm:ml-4">
        {memories.map((mem, idx) => {
          const likes = likedMemories[mem.id] || 0;
          const isPlayingThis = playingAudioId === mem.id;

          return (
            <div key={mem.id} className="relative group">
              {/* Glowing timeline node icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-rose-500/60 shadow-lg shadow-rose-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(mem.icon)}
              </div>

              {/* Memory Card */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-1.5">
                  <span>{mem.date}</span>
                  <span className="bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">Milestone #{idx + 1}</span>
                </div>

                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white mb-2">
                  {mem.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {mem.description}
                </p>

                {/* Highlight Quote if present */}
                {mem.highlightQuote && (
                  <div className="bg-slate-950/60 border-l-2 border-rose-400 px-3 py-2 rounded-r-xl text-xs font-serif-romantic italic text-rose-200 mb-4">
                    {mem.highlightQuote}
                  </div>
                )}

                {/* Simulated Voice Note Button if present */}
                {mem.audioDuration && (
                  <div className="mb-4 bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSimulateAudio(mem.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
                          isPlayingThis ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        }`}
                      >
                        <Volume2 className={`w-4 h-4 ${isPlayingThis ? 'animate-bounce' : ''}`} />
                      </button>
                      <div className="text-left">
                        <div className="text-xs font-medium text-rose-200">
                          {isPlayingThis ? 'Playing simulated voice note...' : 'Voice Note Memory'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{mem.audioDuration}</div>
                      </div>
                    </div>
                    {isPlayingThis && (
                      <div className="flex items-end gap-1 h-4">
                        <span className="w-1 bg-rose-400 animate-pulse h-2"></span>
                        <span className="w-1 bg-rose-400 animate-pulse h-4" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-1 bg-rose-400 animate-pulse h-3" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-1 bg-rose-400 animate-pulse h-1" style={{ animationDelay: '0.3s' }}></span>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Treasured Forever
                  </span>
                  <button
                    onClick={() => handleLikeMemory(mem.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-rose-500/20 text-xs font-medium text-rose-300 transition-colors active:scale-95"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-current text-rose-500' : ''}`} />
                    <span>{likes > 0 ? `${likes} Loves` : 'Love This'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
