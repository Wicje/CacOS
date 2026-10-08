import React from 'react';
import { sounds } from '../utils/sound';
import { X, Check } from 'lucide-react';
import sequoiaDusk from '../assets/images/sequoia_wallpaper_1791425659843.jpg';
import sequoiaDay from '../assets/images/sequoia_day_1791426348004.jpg';
import sequoiaNight from '../assets/images/sequoia_night_1791426361816.jpg';

export interface WallpaperOption {
  id: string;
  name: string;
  url: string;
  timeOfDay: 'dusk' | 'day' | 'night' | 'dynamic';
}

export const WALLPAPERS: WallpaperOption[] = [
  { id: 'sequoia_dusk', name: 'Sequoia Dusk (Original)', url: sequoiaDusk, timeOfDay: 'dusk' },
  { id: 'sequoia_day', name: 'Sequoia Daylight', url: sequoiaDay, timeOfDay: 'day' },
  { id: 'sequoia_night', name: 'Sequoia Starlight', url: sequoiaNight, timeOfDay: 'night' }
];

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWallpaperId: string;
  onSelectWallpaper: (wp: WallpaperOption) => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({
  isOpen,
  onClose,
  currentWallpaperId,
  onSelectWallpaper
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="w-[560px] rounded-[22px] bg-slate-900/90 backdrop-blur-3xl border border-white/20 p-5 text-white shadow-2xl mac-specular-glass"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div>
            <h2 className="text-[16px] font-semibold">Wallpaper Gallery</h2>
            <p className="text-[11px] text-white/60">Dynamic macOS Sequoia Landscapes</p>
          </div>
          <button
            onClick={() => {
              sounds.playClose();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {WALLPAPERS.map((wp) => {
            const isSelected = currentWallpaperId === wp.id;
            return (
              <div
                key={wp.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectWallpaper(wp);
                }}
                className={`flex flex-col gap-2 rounded-xl overflow-hidden cursor-pointer group p-1 transition-all ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-500/10' : 'hover:scale-[1.02]'
                }`}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/15">
                  <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                      <Check size={12} />
                    </div>
                  )}
                </div>
                <span className="text-[12px] font-medium text-center text-white/90">
                  {wp.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
