import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { AppIconRenderer } from './MacIcons';
import { sounds } from '../utils/sound';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

const APPS_LIST = [
  { id: 'finder', name: 'Applications', icon: 'finder', desc: 'System Folder' },
  { id: 'calculator', name: 'Calculator', icon: 'calculator', desc: 'Utilities' },
  { id: 'notes', name: 'Notes', icon: 'notes', desc: 'Productivity' },
  { id: 'safari', name: 'Safari', icon: 'safari', desc: 'Web Browser' },
  { id: 'settings', name: 'System Settings', icon: 'settings', desc: 'System Preferences' },
  { id: 'terminal', name: 'Terminal', icon: 'terminal', desc: 'Developer Tool' },
  { id: 'photobooth', name: 'Photo Booth', icon: 'photobooth', desc: 'Entertainment' },
  { id: 'music', name: 'Music', icon: 'music', desc: 'Audio & Media' },
  { id: 'appstore', name: 'App Store', icon: 'appstore', desc: 'App Management' },
];

export const SpotlightModal: React.FC<SpotlightModalProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = APPS_LIST.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (appId: string) => {
    sounds.playLaunch();
    onOpenApp(appId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-28 bg-black/20 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="w-[580px] rounded-[20px] bg-slate-900/80 backdrop-blur-3xl border border-white/20 shadow-2xl p-2.5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
          <Search size={22} className="text-white/60" />
          <input
            type="text"
            placeholder="Spotlight Search"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
              } else if (e.key === 'Enter' && results[selectedIndex]) {
                handleSelect(results[selectedIndex].id);
              }
            }}
            className="w-full bg-transparent text-[20px] font-normal text-white placeholder-white/40 outline-none"
          />
        </div>

        {/* Results List */}
        <div className="max-h-[300px] overflow-y-auto mt-2">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                  idx === selectedIndex ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-white/90'
                }`}
              >
                <AppIconRenderer iconType={item.icon} size={28} />
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leading-tight">{item.name}</span>
                  <span className="text-[11px] opacity-60 leading-tight">{item.desc}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-white/40 text-[13px]">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};
