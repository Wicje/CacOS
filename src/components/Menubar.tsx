import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sliders,
  Sun,
  Battery,
  Wifi,
  Volume2,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface MenubarProps {
  activeAppTitle?: string;
  onOpenApp?: (appId: string) => void;
  isControlCenterOpen: boolean;
  onToggleControlCenter: () => void;
  onToggleSpotlight: () => void;
  onLockScreen?: () => void;
  onToggleNotificationCenter?: () => void;
  onToggleAppleIntelligence?: () => void;
}

export const Menubar: React.FC<MenubarProps> = ({
  activeAppTitle = 'Finder',
  onOpenApp,
  isControlCenterOpen,
  onToggleControlCenter,
  onToggleSpotlight,
  onLockScreen,
  onToggleNotificationCenter,
  onToggleAppleIntelligence
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState('Tue 16 Sep  09:43');
  const menuBarRef = useRef<HTMLDivElement>(null);

  // Update clock every minute or keep live
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      // For pixel-perfect match to screenshot: 'Tue 16 Sep 09:43'
      setCurrentTimeStr(`${dayName} ${dayNum} ${monthName}  ${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menu: string) => {
    sounds.playClick();
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div
      ref={menuBarRef}
      className="fixed top-0 left-0 right-0 h-[26px] z-50 bg-black/25 backdrop-blur-2xl border-b border-white/10 text-white text-[13px] font-normal px-3.5 flex items-center justify-between select-none shadow-sm"
    >
      {/* Left Menu Items */}
      <div className="flex items-center gap-1.5 h-full">
        {/* Apple Logo */}
        <div className="relative h-full flex items-center">
          <button
            onClick={() => handleMenuClick('apple')}
            className={`px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors flex items-center justify-center font-bold text-[14px] ${
              activeMenu === 'apple' ? 'bg-white/20' : ''
            }`}
          >
            
          </button>
          {activeMenu === 'apple' && (
            <div className="absolute top-[26px] left-0 w-56 rounded-xl bg-slate-900/80 backdrop-blur-3xl border border-white/15 shadow-2xl p-1.5 text-[13px] text-white/90 z-50">
              <div
                onClick={() => {
                  sounds.playClick();
                  onOpenApp?.('settings');
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                About This Mac
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div
                onClick={() => {
                  sounds.playClick();
                  onOpenApp?.('settings');
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                System Settings...
              </div>
              <div
                onClick={() => {
                  sounds.playClick();
                  onOpenApp?.('appstore');
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                App Store...
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Force Quit...
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div
                onClick={() => {
                  sounds.playLock();
                  onLockScreen?.();
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Sleep
              </div>
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Restart...
              </div>
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Shut Down...
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div
                onClick={() => {
                  sounds.playLock();
                  onLockScreen?.();
                  setActiveMenu(null);
                }}
                className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Lock Screen
              </div>
            </div>
          )}
        </div>

        {/* Active App Name (Finder) */}
        <div className="relative h-full flex items-center">
          <button
            onClick={() => handleMenuClick('app')}
            className={`px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors font-semibold text-[13px] ${
              activeMenu === 'app' ? 'bg-white/20' : ''
            }`}
          >
            {activeAppTitle}
          </button>
          {activeMenu === 'app' && (
            <div className="absolute top-[26px] left-0 w-48 rounded-xl bg-slate-900/80 backdrop-blur-3xl border border-white/15 shadow-2xl p-1.5 text-[13px] text-white/90 z-50">
              <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                About {activeAppTitle}
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                Settings...
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                Empty Trash...
              </div>
              <div className="h-[1px] bg-white/10 my-1" />
              <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                Hide {activeAppTitle}
              </div>
              <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                Hide Others
              </div>
            </div>
          )}
        </div>

        {/* Standard Menu Titles */}
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
          <div key={item} className="relative h-full flex items-center">
            <button
              onClick={() => handleMenuClick(item)}
              className={`px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors text-[13px] ${
                activeMenu === item ? 'bg-white/20' : ''
              }`}
            >
              {item}
            </button>
            {activeMenu === item && (
              <div className="absolute top-[26px] left-0 w-48 rounded-xl bg-slate-900/80 backdrop-blur-3xl border border-white/15 shadow-2xl p-1.5 text-[13px] text-white/90 z-50">
                <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                  New Finder Window
                </div>
                <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                  New Folder
                </div>
                <div className="h-[1px] bg-white/10 my-1" />
                <div className="px-2.5 py-1 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer">
                  Close Window
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Menu Items */}
      <div className="flex items-center gap-2 h-full">
        {/* Weather 13°C */}
        <div
          onClick={() => {
            sounds.playClick();
            onOpenApp?.('weather');
          }}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer text-[12px] font-medium"
        >
          <Sun size={13} className="text-amber-400 fill-amber-400" />
          <span>13°C</span>
        </div>

        {/* Battery */}
        <div className="flex items-center px-1 py-0.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer">
          <Battery size={15} className="rotate-90 text-white/90" />
        </div>

        {/* Apple Intelligence / Siri */}
        <button
          onClick={() => {
            sounds.playLaunch();
            onToggleAppleIntelligence?.();
          }}
          className="p-1 rounded-md hover:bg-white/15 transition-colors text-white/90 group"
          title="Apple Intelligence & Siri"
        >
          <Sparkles size={14} className="text-purple-300 group-hover:text-pink-300 transition-colors" />
        </button>

        {/* Spotlight Search (Magnifying Glass) */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleSpotlight();
          }}
          className="p-1 rounded-md hover:bg-white/15 transition-colors text-white/90"
          title="Spotlight Search (Cmd + Space)"
        >
          <Search size={14} />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleControlCenter();
          }}
          className={`p-1 rounded-md transition-colors ${
            isControlCenterOpen ? 'bg-white/25 text-white' : 'hover:bg-white/15 text-white/90'
          }`}
          title="Control Center"
        >
          {/* macOS Control Center Sliders Icon */}
          <Sliders size={14} />
        </button>

        {/* Date and Time (Tue 16 Sep 09:43) */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleNotificationCenter?.();
          }}
          className="px-1.5 py-0.5 rounded-md hover:bg-white/15 transition-colors text-[12px] font-medium tracking-tight"
          title="Notification Center"
        >
          {currentTimeStr}
        </button>
      </div>
    </div>
  );
};
