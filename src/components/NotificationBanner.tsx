import React, { useEffect, useState } from 'react';
import { Bell, X, Calendar } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NotificationBannerProps {
  onOpenApp?: (appId: string) => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ onOpenApp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show a sample macOS banner after 2.5 seconds
    const timer = setTimeout(() => {
      sounds.playNotification();
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        sounds.playLaunch();
        onOpenApp?.('calendar');
        setIsVisible(false);
      }}
      className="fixed top-8 right-4 z-50 w-[330px] rounded-2xl bg-slate-900/80 backdrop-blur-3xl border border-white/20 p-3 shadow-2xl text-white select-none mac-specular-glass animate-slideDown cursor-pointer transition-all hover:scale-[1.01]"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-red-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
            Calendar
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50">now</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              setIsVisible(false);
            }}
            className="p-0.5 rounded-full hover:bg-white/20 text-white/60 hover:text-white"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      <div className="text-[12px] font-semibold text-white">
        Design Sync · macOS Sequoia
      </div>
      <div className="text-[11px] text-white/70 mt-0.5">
        Starts in 15 minutes. Tap to view schedule.
      </div>
    </div>
  );
};
