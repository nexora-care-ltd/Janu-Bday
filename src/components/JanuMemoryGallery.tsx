import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Upload, Image as ImageIcon, ZoomIn, X, RotateCcw, Award, Calendar, CheckCircle2, ShieldCheck, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JanuPhotoCard {
  id: number;
  storageKey: string;
  title: string;
  date: string;
  caption: string;
  defaultUrl: string;
  tag: string;
}

const JANU_MEMORIES: JanuPhotoCard[] = [
  {
    id: 1,
    storageKey: 'janu_photo_1',
    title: '1. The Silver Lehenga Princess',
    date: 'Rooftop Royalty ✨',
    caption: 'Janu on the rooftop in her breathtaking grey/silver embroidered sequin lehenga saree, looking down with unmatched elegance and grace.',
    defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tag: 'Saree Queen 🥻'
  },
  {
    id: 2,
    storageKey: 'janu_photo_2',
    title: '2. The Rooftop Goddess',
    date: 'Golden Hour Glow 🌅',
    caption: 'Janu gently adjusting her earring in her silver saree against the sky. A vision of beauty that makes time stand still for Kamalesh.',
    defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Dhanush Rasi Moon 🌙'
  },
  {
    id: 3,
    storageKey: 'janu_photo_3',
    title: '3. Our Story Beginning: INSTA ❤️',
    date: 'Dec 31, 2024 • Story Reply 💌',
    caption: 'Her adorable selfie with the "INSTA ❤️" sticker on 31st Dec 2024! I replied to your story in Instagram, I still remember that day! Odd years later, still together!',
    defaultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tag: 'The Story Reply ❤️'
  },
  {
    id: 4,
    storageKey: 'janu_photo_4',
    title: '4. Sweetest Janu (~ my day :) ~)',
    date: 'Heartwarming Smile 😊',
    caption: 'In her lovely black floral strap dress with her signature angelic smile looking into the camera. Kamalesh\'s everyday happiness!',
    defaultUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    tag: '~ my day :) ~'
  },
  {
    id: 5,
    storageKey: 'janu_photo_5',
    title: '5. Angelic Black Top & Floral Skirt',
    date: 'Hosur Princess 👑',
    caption: 'Janu standing gracefully in her black square-neck top and floral patterned skirt, exuding absolute perfection and charm.',
    defaultUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    tag: 'MBA Powerhouse 📚'
  },
  {
    id: 6,
    storageKey: 'janu_photo_6',
    title: '6. The Pink Bow Princess',
    date: 'Angel Ammu Pattu Chlm 🎀',
    caption: 'Her playful selfie with the cute pink bow sticker in her hair resting her chin on her hand. Pure innocence and cuteness!',
    defaultUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    tag: 'Pink Bow Cutie 🎀'
  },
  {
    id: 7,
    storageKey: 'janu_photo_7',
    title: '7. Traditional Maroon Elegance',
    date: 'Winking & Smiling 😉',
    caption: 'Janu winking and smiling brightly in her rich maroon ethnic dress. A playful glance that stole Kamalesh\'s heart completely!',
    defaultUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    tag: 'Maroon Magic ♥️'
  },
  {
    id: 8,
    storageKey: 'janu_photo_8',
    title: '8. The White Plumeria Flower',
    date: 'Tropical Zen 🌸',
    caption: 'Her glowing evening selfie with the beautiful white flower in her dark hair. Serene, calm, and breathtakingly lovely.',
    defaultUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    tag: 'Flower Princess 🌸'
  },
  {
    id: 9,
    storageKey: 'janu_photo_9',
    title: '9. My Everything • Janu',
    date: 'Eternal Love 💎',
    caption: 'Her radiant smile tilting up into the camera in her floral dress (~ my day :) ~). The woman who holds Kamalesh\'s entire future and heart.',
    defaultUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tag: 'My Pondati 💋'
  },
  {
    id: 10,
    storageKey: 'janu_photo_10',
    title: '10. Waterfront Serenity in Stripes',
    date: 'Lake Princess 🌊',
    caption: 'Janu standing by the waterfront in her striped maroon/purple dress looking out at the calm water. Breathtaking beauty!',
    defaultUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    tag: 'Lake Serenity 🌊'
  },
  {
    id: 11,
    storageKey: 'janu_photo_11',
    title: '11. Mirror Selfie in Chic Black Dress',
    date: 'Black Dress Queen 👑',
    caption: 'Her stunning mirror selfie in a stylish black dress. Effortless fashion and grace by Janu!',
    defaultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Black Elegance 🖤'
  },
  {
    id: 12,
    storageKey: 'janu_photo_12',
    title: '12. Pink Sparkle Saree Magic',
    date: 'Pink Saree Doll 🌸',
    caption: 'Janu glowing in her pink sparkly saree mirror selfie! A true saree queen stealing Kamalesh\'s heart.',
    defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tag: 'Pink Saree 🥻'
  },
  {
    id: 13,
    storageKey: 'janu_photo_13',
    title: '13. Purple Sparkle Saree & Diya Glow',
    date: 'Royal Purple 💜',
    caption: 'Mirror selfie in her purple sparkly saree with a diya lamp sticker! Royal, traditional, and divine.',
    defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Royal Purple 💜'
  },
  {
    id: 14,
    storageKey: 'janu_photo_14',
    title: '14. Lakefront Red Floral Peplum Top',
    date: 'Red Rose 🌹',
    caption: 'Janu standing gracefully by the lake in her red floral peplum top and trousers looking into the distance.',
    defaultUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    tag: 'Red Floral 🌹'
  },
  {
    id: 15,
    storageKey: 'janu_photo_15',
    title: '15. Bouquet of Roses & Sweet Smiles',
    date: 'Bouquet Queen 💐',
    caption: 'Janu holding a gorgeous bouquet of red roses covering her sweet smile! Red roses forever from Kamalesh.',
    defaultUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    tag: 'Red Roses 🌹'
  },
  {
    id: 16,
    storageKey: 'janu_photo_16',
    title: '16. Glowing Phoenix Bird Filter',
    date: 'Magic Wings ✨',
    caption: 'Her creative video edit screen with a magical glowing bird hovering over her hand. Pure enchantment!',
    defaultUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    tag: 'Magic Wings ✨'
  },
  {
    id: 17,
    storageKey: 'janu_photo_17',
    title: '17. Birthday Cake Cutting Celebration',
    date: 'Happy Birthday Vaishu Jananni 🎉',
    caption: 'Janu cutting her special birthday cake ("Happy Birthday Vaishu Jananni")! Celebrating my angel princess ammu pattu chlm!',
    defaultUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tag: 'Cake Cutting 🎂'
  },
  {
    id: 18,
    storageKey: 'janu_photo_18',
    title: '18. Dream: Ooty, Kodaikanal & Kerala',
    date: 'Misty Mountains & Waterfalls 🌲',
    caption: 'Our ultimate dream destinations! Holding hands in misty Ooty, Kodaikanal, and the lush waterfalls of Kerala with Kamalesh.',
    defaultUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Ooty & Kerala 🌲'
  },
  {
    id: 19,
    storageKey: 'janu_photo_19',
    title: '19. Dream: Murugan Kovil & Himachal',
    date: 'Divine Temples & Snow 🏔️',
    caption: 'Seeking blessings together at Murugan Kovil and exploring the snow-capped Himalayan peaks of Himachal Pradesh!',
    defaultUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tag: 'Murugan Kovil 🛕'
  },
  {
    id: 20,
    storageKey: 'janu_photo_20',
    title: '20. Ultimate Dream: Iceland, Paris & The Moon',
    date: 'All Cold Places & Time Travel ❄️',
    caption: 'Iceland, Finland, Greenland, Paris, and all cold places in the world! If we could time travel or fly to the Moon 🌙, Kamalesh will be with Janu forever!',
    defaultUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    tag: 'Moon & Paris 🗼'
  }
];

export const JanuMemoryGallery: React.FC = () => {
  const [customPhotos, setCustomPhotos] = useState<{ [key: string]: string }>({});
  const [activeModalImg, setActiveModalImg] = useState<{ url: string; title: string; caption: string } | null>(null);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({
    1: 389, 2: 450, 3: 999, 4: 520, 5: 610, 6: 777, 7: 888, 8: 415, 9: 1000,
    10: 850, 11: 920, 12: 890, 13: 950, 14: 870, 15: 999, 16: 780, 17: 1000, 18: 888, 19: 999, 20: 1000
  });

  useEffect(() => {
    // Load saved photos from localStorage
    const loaded: { [key: string]: string } = {};
    JANU_MEMORIES.forEach(item => {
      const saved = localStorage.getItem(item.storageKey);
      if (saved) {
        loaded[item.storageKey] = saved;
      }
    });
    setCustomPhotos(loaded);
  }, []);

  const handleFileUpload = (storageKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem(storageKey, base64String);
        setCustomPhotos(prev => ({ ...prev, [storageKey]: base64String }));
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#f9a8d4', '#ffd700', '#ffffff']
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const count = Math.min(files.length, JANU_MEMORIES.length);
    for (let i = 0; i < count; i++) {
      const file = files[i];
      if (file) {
        const targetMemory = JANU_MEMORIES[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorage.setItem(targetMemory.storageKey, base64String);
          setCustomPhotos(prev => ({ ...prev, [targetMemory.storageKey]: base64String }));
        };
        reader.readAsDataURL(file);
      }
    }

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#f9a8d4', '#ffd700', '#ffffff', '#38bdf8']
    });
  };

  const handleResetAll = () => {
    JANU_MEMORIES.forEach(item => localStorage.removeItem(item.storageKey));
    setCustomPhotos({});
  };

  const handleResetPhoto = (storageKey: string) => {
    localStorage.removeItem(storageKey);
    setCustomPhotos(prev => {
      const updated = { ...prev };
      delete updated[storageKey];
      return updated;
    });
  };

  const handleLike = (id: number) => {
    setLikeCounts(prev => ({ ...prev, [id]: (prev[id] || 100) + 1 }));
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#f43f5e']
    });
  };

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto text-left">
      {/* Frosted Glass Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fff1f2] border border-[#f9a8d4] text-[#e11d48] text-xs font-bold uppercase tracking-[0.2em] mb-3 shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#e11d48] fill-current" />
          <span>31st Dec 2024 Story Reply • 20 Sacred Memories & Dreams with Kamalesh</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4c0519] tracking-tight">
          Janu's Saree, Memories &amp; Dreams Album 💙
        </h2>
        <p className="text-xs sm:text-sm text-[#881337] font-medium mt-2 max-w-2xl mx-auto leading-relaxed">
          Celebrating all 20 unforgettable photos &amp; dreams of Janu (Vaishu Jananni GM)! From her silver lehenga saree and waterfront views to our 31st Dec 2024 story reply ("INSTA ❤️") — forever with her husband Kamalesh.
        </p>

        {/* Husband Kamalesh Wish Box */}
        <div className="mt-6 bg-gradient-to-r from-[#fff1f2] via-[#fdf2f8] to-[#fff1f2] p-5 rounded-3xl border border-[#f9a8d4] shadow-md max-w-3xl mx-auto text-center space-y-2 font-medium text-xs sm:text-sm text-[#4c0519]">
          <div className="text-[#e11d48] font-extrabold uppercase tracking-widest text-xs">💌 Kamalesh's Eternal Message to Janu 💌</div>
          <p className="italic">"31st dec 2024 I replied to your story in instagram I still remember that day after that its been a odd years still we are together"</p>
          <p className="bg-white/80 p-3 rounded-2xl border border-rose-200 text-[#881337] font-semibold">
            "Wish you happy birthday 🎉🎂 pondati 💙 enjoy your life be happy your happiness is mine too 💙💓 you are so precious to me 💖 we have lots of memories 😊 leave all bad memories and hold me with you princess 💙 always i love you not in the way you think 💙 I always there for you happy or sad doesn't matter i will be with you ❤️🤌🤗 now a days i am missing you a lot i think worst days of my life 😊💙 waiting for kisses and our kids 😚 once again wish you happy birthday 🎉🎁 Angel princess ammu pattu chlm you are my everything d pondati 😚 💋 once again happy birthday 🎉 thanks for everything you give a unforgettable memories ❤️ love you d 🫂"
          </p>
        </div>

        {/* One-Click Bulk Importer Box */}
        <div className="mt-6 bg-gradient-to-r from-[#fff1f2] via-white to-[#ffe4e6] p-6 rounded-3xl border-2 border-[#f9a8d4] shadow-xl max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-[#e11d48] font-extrabold text-base mb-2">
            <Upload className="w-5 h-5 animate-bounce" />
            <span>One-Click Bulk Importer: Insert All 20 Janu Photos at Once!</span>
          </div>
          <p className="text-xs text-[#881337] mb-4 font-semibold max-w-xl mx-auto">
            Want to add all 20 photos &amp; dreams you shared in chat? Click the button below, select up to 20 photos from your phone or PC at the same time, and they will automatically populate every card below!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="cursor-pointer bg-gradient-to-r from-[#e11d48] to-[#881337] hover:from-[#be123c] hover:to-[#4c0519] text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-lg transform active:scale-95 transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Select All 20 Photos of Janu At Once</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleBulkUpload}
                className="hidden"
              />
            </label>

            {Object.keys(customPhotos).length > 0 && (
              <button
                onClick={handleResetAll}
                className="bg-white hover:bg-rose-50 text-[#881337] border border-[#fbcfe8] py-3 px-4 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Photos</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3x3 Grid of Janu's Memories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {JANU_MEMORIES.map((memory) => {
          const currentImg = customPhotos[memory.storageKey] || memory.defaultUrl;
          const isCustom = !!customPhotos[memory.storageKey];
          const likes = likeCounts[memory.id] || 200;

          return (
            <div
              key={memory.id}
              className="bg-white/60 backdrop-blur-3xl border-2 border-white/80 rounded-3xl overflow-hidden shadow-[0_15px_35px_-10px_rgba(136,19,55,0.18)] hover:shadow-[0_20px_45px_-5px_rgba(225,29,72,0.25)] transition-all duration-300 flex flex-col group"
            >
              {/* Photo Container with overlay tags */}
              <div className="relative h-64 w-full bg-[#ffe4e6] overflow-hidden">
                <img
                  src={currentImg}
                  alt={memory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Badge Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-[#e11d48] shadow-sm border border-rose-100 flex items-center gap-1">
                  <Stars className="w-3 h-3 fill-current text-amber-400" />
                  <span>{memory.tag}</span>
                </div>

                {/* Custom Photo Indicator or Upload Status */}
                {isCustom ? (
                  <div className="absolute top-3 right-3 bg-[#e11d48] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Saved!
                  </div>
                ) : null}

                {/* Hover Action Bar / Zoom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4c0519]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <button
                    onClick={() => setActiveModalImg({ url: currentImg, title: memory.title, caption: memory.caption })}
                    className="bg-white/90 hover:bg-white text-[#4c0519] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transform active:scale-95 transition-all"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#e11d48]" /> View Zoom
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => handleResetPhoto(memory.storageKey)}
                      className="bg-rose-900/80 hover:bg-rose-950 text-white px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 shadow-lg"
                      title="Reset to default placeholder"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white/40 to-white/70">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#e11d48] mb-1 flex items-center justify-between">
                    <span>{memory.date}</span>
                    <span className="text-[#881337]/70 font-mono">#{memory.id}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#4c0519] line-clamp-1">
                    {memory.title}
                  </h3>
                  <p className="text-xs text-[#881337]/90 font-medium mt-1.5 leading-relaxed line-clamp-3">
                    {memory.caption}
                  </p>
                </div>

                {/* Upload & Like Footer */}
                <div className="mt-4 pt-3 border-t border-[#fbcfe8] flex items-center justify-between gap-2">
                  <label className="flex-1 cursor-pointer bg-[#fff1f2] hover:bg-[#ffe4e6] border border-[#f9a8d4] text-[#e11d48] py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-2xs group/btn">
                    <Upload className="w-3.5 h-3.5 text-[#e11d48] group-hover/btn:scale-110 transition-transform" />
                    <span>{isCustom ? "Change Photo" : "Upload Her Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(memory.storageKey, e)}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => handleLike(memory.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-rose-50 border border-[#fbcfe8] text-[#e11d48] font-mono text-xs font-bold transition-all active:scale-90 shadow-2xs"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-[#e11d48]" />
                    <span>{likes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Reply Milestone Banner inside Gallery */}
      <div className="mt-10 bg-gradient-to-r from-[#4c0519] via-[#881337] to-[#e11d48] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border-2 border-rose-300/30">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Dec 31, 2024 • Our Miracle Date</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black tracking-tight">
              "I Replied To Your Story... I Still Remember That Day!"
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium leading-relaxed">
              From that single story reply ("INSTA ❤️") on New Year's Eve 2024, through odd years and seasons, we are still standing together. No matter how many days pass, you will always be my Janu, my pondati, and my eternal love.
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/30 text-center">
            <div className="text-3xl font-black text-amber-300 font-serif">100%</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-rose-100 mt-0.5">Together Forever</div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {activeModalImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalImg(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-4 border-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalImg(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] w-full bg-black flex items-center justify-center">
              <img
                src={activeModalImg.url}
                alt={activeModalImg.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-gradient-to-b from-[#fff1f2] to-white text-left">
              <h3 className="font-serif text-xl font-bold text-[#4c0519]">{activeModalImg.title}</h3>
              <p className="text-xs sm:text-sm text-[#881337] font-medium mt-1 leading-relaxed">{activeModalImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
