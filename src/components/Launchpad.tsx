import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { AppIconRenderer } from './MacIcons';
import { sounds } from '../utils/sound';

interface LaunchpadApp {
  id: string;
  name: string;
  iconType: string;
}

const LAUNCHPAD_APPS: LaunchpadApp[] = [
  { id: 'finder', name: 'Finder', iconType: 'finder' },
  { id: 'appstore', name: 'App Store', iconType: 'appstore' },
  { id: 'safari', name: 'Safari', iconType: 'safari' },
  { id: 'mail', name: 'Mail', iconType: 'mail' },
  { id: 'messages', name: 'Messages', iconType: 'messages' },
  { id: 'maps', name: 'Maps', iconType: 'maps' },
  { id: 'photos', name: 'Photos', iconType: 'photos' },

  { id: 'facetime', name: 'FaceTime', iconType: 'facetime' },
  { id: 'calendar', name: 'Calendar', iconType: 'calendar' },
  { id: 'contacts', name: 'Contacts', iconType: 'contacts' },
  { id: 'reminders', name: 'Reminders', iconType: 'reminders' },
  { id: 'notes', name: 'Notes', iconType: 'notes' },
  { id: 'freeform', name: 'Freeform', iconType: 'freeform' },
  { id: 'tv', name: 'TV', iconType: 'tv' },

  { id: 'music', name: 'Music', iconType: 'music' },
  { id: 'calculator', name: 'Calculator', iconType: 'calculator' },
  { id: 'books', name: 'Books', iconType: 'books' },
  { id: 'chess', name: 'Chess', iconType: 'chess' },
  { id: 'clock', name: 'Clock', iconType: 'clock' },
  { id: 'findmy', name: 'Find My', iconType: 'findmy' },
  { id: 'games', name: 'Games', iconType: 'games' },

  { id: 'home', name: 'Home', iconType: 'home' },
  { id: 'journal', name: 'Journal', iconType: 'journal' },
  { id: 'passwords', name: 'Passwords', iconType: 'passwords' },
  { id: 'photobooth', name: 'Photo Booth', iconType: 'photobooth' },
  { id: 'settings', name: 'Settings', iconType: 'settings' },
  { id: 'terminal', name: 'Terminal', iconType: 'terminal' },
  { id: 'weather', name: 'Weather', iconType: 'weather' },
];

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export const Launchpad: React.FC<LaunchpadProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        sounds.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = LAUNCHPAD_APPS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLaunch = (appId: string) => {
    sounds.playLaunch();
    onOpenApp(appId);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-between py-12 px-8 select-none transition-all duration-300 animate-fadeIn"
    >
      {/* Top Search Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[280px] h-9 rounded-full bg-white/15 backdrop-blur-2xl border border-white/20 flex items-center px-3 gap-2 text-white shadow-xl mac-specular-glass mt-2"
      >
        <Search size={14} className="text-white/60" />
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-[13px] text-white placeholder-white/50 outline-none"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-white/60 hover:text-white">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Grid of Applications */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[1000px] grid grid-cols-7 gap-y-10 gap-x-6 justify-items-center items-center my-auto"
      >
        {filtered.map((app) => (
          <div
            key={app.id}
            onClick={() => handleLaunch(app.id)}
            className="flex flex-col items-center group cursor-pointer w-24 text-center transition-transform hover:scale-105 active:scale-95"
          >
            <div className="p-1 rounded-2xl group-hover:drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)] transition-all">
              <AppIconRenderer
                iconType={app.iconType}
                size={66}
                className="filter drop-shadow-lg"
              />
            </div>
            <span className="mt-2 text-[12px] font-medium text-white/95 drop-shadow group-hover:text-white transition-colors truncate max-w-full">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
        <span className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
};
