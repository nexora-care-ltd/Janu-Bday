export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  isVirtual?: boolean; // e.g. "Facetime Screenshot", "Virtual Date"
  likes: number;
}

export interface LoveLetterItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'future' | 'birthday' | 'promise' | 'memory';
  read: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: 'message' | 'video' | 'plane' | 'heart' | 'music' | 'moon' | 'gift';
  highlightQuote?: string;
  audioDuration?: string; // e.g. "0:45 voice note"
}

export interface ReasonNote {
  id: string;
  text: string;
  category: 'sweet' | 'funny' | 'future' | 'deep';
}

export type ThemePreset = 'starlight-rose' | 'velvet-midnight' | 'champagne-gold' | 'cherry-blossom';

export interface AppConfig {
  herName: string;
  hisName: string;
  herBirthday: string; // e.g. "July 25" or custom
  hisCity: string;
  hisCountry: string;
  herCity: string;
  herCountry: string;
  distanceKm: number;
  timeZoneDiffHours: number;
  metOnlineDate: string; // e.g. "2024-03-14"
  targetMeetingDate?: string; // e.g. "2026-12-20" or "When the stars align at the arrival gate"
  theme: ThemePreset;
  heroTagline: string;
  heroSubtitle: string;
  musicTitle: string;
  musicUrl?: string; // optional custom mp3 url
  photos: PhotoItem[];
  letters: LoveLetterItem[];
  memories: MemoryItem[];
  reasons: ReasonNote[];
  finalPromise: string;
}
