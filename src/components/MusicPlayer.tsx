import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface MusicPlayerProps {
  title: string;
  customUrl?: string;
  autoPlayTriggered?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, customUrl, autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  // Soothing pentatonic romantic music box notes (frequencies in Hz)
  const notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
  ];

  const playMusicBoxNote = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Pick 1 or 2 random soothing notes
    const note = notes[Math.floor(Math.random() * notes.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Use sine wave with a hint of bell chime timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    // Envelope for a gentle harp/bell chime
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 3.0);
  };

  const startPlaying = () => {
    setIsPlaying(true);
    if (customUrl) {
      if (!htmlAudioRef.current) {
        htmlAudioRef.current = new Audio(customUrl);
        htmlAudioRef.current.loop = true;
      }
      htmlAudioRef.current.play().catch(e => console.log('Audio play blocked:', e));
    } else {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      // Play note immediately then loop
      playMusicBoxNote();
      timerRef.current = window.setInterval(() => {
        playMusicBoxNote();
        // Occasionally play a second harmonizing note
        if (Math.random() > 0.4) {
          setTimeout(playMusicBoxNote, 250);
        }
      }, 1600);
    }
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      startPlaying();
    }
  }, [autoPlayTriggered]);

  useEffect(() => {
    return () => {
      stopPlaying();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border ${
        isPlaying
          ? 'bg-rose-500/80 border-rose-400 text-white shadow-rose-500/30 scale-105 animate-pulse-glow'
          : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-rose-400/50 hover:text-white'
      }`}
      title={isPlaying ? "Mute romantic background music" : "Play romantic background music"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-bounce text-rose-200" />
          <span className="text-xs font-medium tracking-wide flex items-center gap-1">
            <Music className="w-3 h-3 text-rose-300" />
            {title || 'Music Box'}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-300"></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium tracking-wide">Play Audio</span>
          <Heart className="w-3 h-3 text-rose-400 animate-pulse" />
        </>
      )}
    </button>
  );
};
