import React, { useState } from 'react';
import { X, Sparkles, Save, Heart, MapPin, Calendar, Mail, Star, Camera, Wand2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { AppConfig, LoveLetterItem } from '../types';

interface CustomizerModalProps {
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({ config, onSave, onClose }) => {
  const [formData, setFormData] = useState<AppConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'basics' | 'location' | 'letters' | 'reasons'>('basics');
  
  // AI Writer State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');
  const [selectedLetterId, setSelectedLetterId] = useState<string>(config.letters[0]?.id || 'l1');

  const handleChange = (field: keyof AppConfig, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLetterChange = (id: string, field: keyof LoveLetterItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      letters: prev.letters.map(l => (l.id === id ? { ...l, [field]: value } : l))
    }));
  };

  const handleGenerateAiLetter = async () => {
    if (!aiPrompt.trim()) {
      setAiError('Please enter a few keywords or details about your relationship first.');
      return;
    }
    setIsGenerating(true);
    setAiError('');

    try {
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          herName: formData.herName,
          hisName: formData.hisName,
          herCity: formData.herCity,
          hisCity: formData.hisCity,
          promptDetails: aiPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate letter from AI service.');
      }

      const data = await response.json();
      if (data.generatedContent) {
        // Update the currently selected letter with AI content
        handleLetterChange(selectedLetterId, 'content', data.generatedContent);
        setAiPrompt('');
      } else {
        throw new Error('No content returned');
      }
    } catch (err) {
      console.error('AI error:', err);
      setAiError('Could not generate letter right now. Please try again or edit manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500/20 p-2 rounded-xl border border-rose-500/30 text-rose-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl font-bold text-white">
                Creator & Customization Mode
              </h2>
              <p className="text-xs text-slate-400">
                Personalize this birthday page for your future wife before sharing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950/50 border-b border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'basics' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> 1. Names & Vibe
          </button>

          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'location' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> 2. Long-Distance & Countdown
          </button>

          <button
            onClick={() => setActiveTab('letters')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'letters' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> 3. Love Letters & AI Writer
          </button>
        </div>

        {/* Form Content Area */}
        <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Basics */}
          {activeTab === 'basics' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 border-b border-slate-800 pb-2">
                Couple Details & Birthday Greeting
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Her Name / Nickname *</label>
                  <input
                    type="text"
                    required
                    value={formData.herName}
                    onChange={(e) => handleChange('herName', e.target.value)}
                    placeholder="e.g. Elena"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-400 font-serif-display text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name / Signature *</label>
                  <input
                    type="text"
                    required
                    value={formData.hisName}
                    onChange={(e) => handleChange('hisName', e.target.value)}
                    placeholder="e.g. Your Forever Love, David"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-400 font-script text-xl text-rose-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Her Birthday Label</label>
                <input
                  type="text"
                  value={formData.herBirthday}
                  onChange={(e) => handleChange('herBirthday', e.target.value)}
                  placeholder="e.g. Today, July 25th, My Queen's Day"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Romantic Tagline</label>
                <input
                  type="text"
                  value={formData.heroTagline}
                  onChange={(e) => handleChange('heroTagline', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-rose-200 font-serif-romantic italic text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-300 text-sm leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Location & Long Distance */}
          {activeTab === 'location' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 border-b border-slate-800 pb-2">
                Long-Distance Connection & Countdowns
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">His Location</span>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.hisCity}
                      onChange={(e) => handleChange('hisCity', e.target.value)}
                      placeholder="e.g. London"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.hisCountry}
                      onChange={(e) => handleChange('hisCountry', e.target.value)}
                      placeholder="e.g. United Kingdom"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">Her Location</span>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.herCity}
                      onChange={(e) => handleChange('herCity', e.target.value)}
                      placeholder="e.g. Tokyo"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-rose-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.herCountry}
                      onChange={(e) => handleChange('herCountry', e.target.value)}
                      placeholder="e.g. Japan"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Distance (in Kilometers)</label>
                  <input
                    type="number"
                    value={formData.distanceKm}
                    onChange={(e) => handleChange('distanceKm', Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    ≈ {Math.round(formData.distanceKm * 0.621371).toLocaleString()} miles
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Zone Diff (Hours)</label>
                  <input
                    type="number"
                    value={formData.timeZoneDiffHours}
                    onChange={(e) => handleChange('timeZoneDiffHours', Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date You First Met Online</label>
                  <input
                    type="date"
                    value={formData.metOnlineDate}
                    onChange={(e) => handleChange('metOnlineDate', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">Target Airport Meeting Date</label>
                  <input
                    type="date"
                    value={formData.targetMeetingDate || ''}
                    onChange={(e) => handleChange('targetMeetingDate', e.target.value)}
                    className="w-full bg-slate-800 border border-rose-500/40 rounded-xl p-2.5 text-white font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Letters & AI Writer */}
          {activeTab === 'letters' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Gemini AI Writer Box */}
              <div className="bg-gradient-to-r from-purple-950/60 via-rose-950/60 to-pink-950/60 border border-purple-500/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-purple-300 animate-pulse" />
                    <span className="font-serif-display font-bold text-white text-base">Gemini AI Love Letter Writer</span>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30">
                    AI Assistant
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3">
                  Tell me a few keywords or inside jokes (e.g. "we stay up until 3 AM on Discord, she loves coffee and cats, we are meeting in Tokyo this winter") and I will write a heartfelt vow for you!
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. We met playing Valorant, she has the sweetest voice, I can't wait to hold her hand..."
                    className="flex-1 bg-slate-900/80 border border-purple-500/40 rounded-xl p-2.5 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAiLetter}
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-purple-900/30 transition-all active:scale-95"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Crafting Vows...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Generate & Fill Letter</span>
                      </>
                    )}
                  </button>
                </div>

                {aiError && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{aiError}</span>
                  </div>
                )}
              </div>

              {/* Letter Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Select Letter to Edit</label>
                <div className="flex flex-wrap gap-2">
                  {formData.letters.map((letter) => (
                    <button
                      key={letter.id}
                      type="button"
                      onClick={() => setSelectedLetterId(letter.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedLetterId === letter.id
                          ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {letter.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor for Selected Letter */}
              {formData.letters
                .filter(l => l.id === selectedLetterId)
                .map(letter => (
                  <div key={letter.id} className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Letter Title</label>
                      <input
                        type="text"
                        value={letter.title}
                        onChange={(e) => handleLetterChange(letter.id, 'title', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-serif-display font-bold text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Date Stamp</label>
                      <input
                        type="text"
                        value={letter.date}
                        onChange={(e) => handleLetterChange(letter.id, 'date', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-rose-300 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Letter Body Content *</label>
                      <textarea
                        rows={8}
                        value={letter.content}
                        onChange={(e) => handleLetterChange(letter.id, 'content', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-200 font-serif-romantic text-base sm:text-lg leading-relaxed focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900/90 py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Customizations</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
