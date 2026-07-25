import React, { useState } from 'react';
import { Camera, Heart, MapPin, Calendar, X, ZoomIn, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';
import confetti from 'canvas-confetti';
import { compressImage, savePhoto } from '../utils/photoStorage';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onAddPhoto?: (photo: PhotoItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddPhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // New photo form state
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('Our Special Date');
  const [newLocation, setNewLocation] = useState('Virtual & Together');
  const [isVirtual, setIsVirtual] = useState(true);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikesMap(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#ffffff']
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 1000, 0.85);
      setNewUrl(compressed);
    } catch (err) {
      console.error('Error compressing polaroid:', err);
    }
  };

  const handleSubmitNewPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newCaption) return;
    const photoId = 'polaroid_' + Date.now();
    await savePhoto(photoId, newUrl);
    if (onAddPhoto) {
      onAddPhoto({
        id: photoId,
        url: newUrl,
        caption: newCaption,
        date: newDate,
        location: newLocation,
        isVirtual: isVirtual,
        likes: 1
      });
    }
    setNewUrl('');
    setNewCaption('');
    setShowAddModal(false);
  };

  return (
    <section className="py-10 px-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5 text-purple-400" />
          <span>Polaroid Memories</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
          Our Photo Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Moments captured across screens and dreams of our future
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transform active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Permanent Polaroid
          </button>
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {photos.map((photo, idx) => {
          const totalLikes = photo.likes + (likesMap[photo.id] || 0);
          const rotation = idx % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0';

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`bg-[#fdfbf7] p-3.5 pb-5 rounded-2xl shadow-xl shadow-slate-950/60 text-slate-900 cursor-pointer transform ${rotation} transition-all duration-300 hover:scale-105 hover:z-20 border border-slate-200 flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Virtual Badge */}
              {photo.isVirtual && (
                <span className="absolute top-5 right-5 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider border border-white/20">
                  📱 Virtual Date
                </span>
              )}

              {/* Photo Image Box */}
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 relative mb-3.5 shadow-inner">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-full text-slate-900 shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Handwritten Caption */}
                <p className="font-serif-romantic text-base sm:text-lg font-semibold text-slate-800 leading-snug px-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 px-1">
                <div className="flex items-center gap-1 truncate max-w-[65%]">
                  <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                  <span className="truncate">{photo.location || 'Our Shared Memory'}</span>
                </div>
                <button
                  onClick={(e) => handleLike(e, photo.id)}
                  className="flex items-center gap-1 text-rose-600 font-semibold hover:scale-110 transition-transform bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100"
                >
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{totalLikes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-lg w-full bg-[#fdfbf7] p-4 sm:p-6 rounded-3xl text-slate-900 shadow-2xl relative border-2 border-rose-300 transform scale-100 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition-colors z-10 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-inner">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> {selectedPhoto.date || 'Timeless Memory'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> {selectedPhoto.location || 'Connected Soul'}
              </span>
            </div>

            <p className="font-serif-romantic text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed mb-6">
              "{selectedPhoto.caption}"
            </p>

            <button
              onClick={(e) => handleLike(e, selectedPhoto.id)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-transform active:scale-95"
            >
              <Heart className="w-5 h-5 fill-current animate-bounce" />
              <span>Send Love To This Memory</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Permanent Polaroid Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 max-w-md w-full text-white relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-rose-300 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Add New Memory Photo
            </h3>

            <form onSubmit={handleSubmitNewPhoto} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Image Source (Upload or URL)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-slate-300 mb-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-rose-500 file:text-white file:text-xs hover:file:bg-rose-600"
                />
                <input
                  type="url"
                  placeholder="Or paste image URL (e.g. from Unsplash or Imgur)"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              {newUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <img src={newUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-medium mb-1">Handwritten Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The night we stayed up until sunrise talking..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date / Label</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Location / Tag</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isVirtualCheck"
                  checked={isVirtual}
                  onChange={(e) => setIsVirtual(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-rose-500 w-4 h-4"
                />
                <label htmlFor="isVirtualCheck" className="text-slate-300 text-xs">
                  Mark as "📱 Virtual Date / Screenshot"
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold mt-2 shadow-lg shadow-rose-500/30"
              >
                Add To Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
