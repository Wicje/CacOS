import React, { useState, useRef } from 'react';
import { AppIconRenderer } from './MacIcons';
import { sounds } from '../utils/sound';

interface DockItem {
  id: string;
  name: string;
  iconType: string;
  badge?: number | string;
  isRunning?: boolean;
}

const DOCK_ITEMS_LEFT: DockItem[] = [
  { id: 'finder', name: 'Finder', iconType: 'finder', isRunning: true },
  { id: 'apps', name: 'Launchpad', iconType: 'apps', isRunning: false },
  { id: 'safari', name: 'Safari', iconType: 'safari', isRunning: false },
  { id: 'messages', name: 'Messages', iconType: 'messages', isRunning: false },
  { id: 'mail', name: 'Mail', iconType: 'mail', isRunning: false },
  { id: 'maps', name: 'Maps', iconType: 'maps', isRunning: false },
  { id: 'photos', name: 'Photos', iconType: 'photos', isRunning: false },
  { id: 'facetime', name: 'FaceTime', iconType: 'facetime', isRunning: false },
  { id: 'calendar', name: 'Calendar', iconType: 'calendar', isRunning: false },
  { id: 'contacts', name: 'Contacts', iconType: 'contacts', isRunning: false },
  { id: 'reminders', name: 'Reminders', iconType: 'reminders', badge: 4, isRunning: false },
  { id: 'notes', name: 'Notes', iconType: 'notes', isRunning: false },
  { id: 'freeform', name: 'Freeform', iconType: 'freeform', isRunning: false },
  { id: 'tv', name: 'TV', iconType: 'tv', isRunning: false },
  { id: 'music', name: 'Music', iconType: 'music', isRunning: false },
  { id: 'appstore', name: 'App Store', iconType: 'appstore', isRunning: false },
  { id: 'settings', name: 'System Settings', iconType: 'settings', badge: 1, isRunning: false },
];

const DOCK_ITEMS_RIGHT: DockItem[] = [
  { id: 'lightbulb', name: 'Ideas', iconType: 'lightbulb', isRunning: false },
  { id: 'weather', name: 'Weather', iconType: 'weather', isRunning: false },
  { id: 'photobooth', name: 'Photo Booth', iconType: 'photobooth', isRunning: false },
  { id: 'downloads', name: 'Downloads', iconType: 'downloads', isRunning: false },
  { id: 'trash', name: 'Trash', iconType: 'trash', isRunning: false },
];

interface DockProps {
  onOpenApp: (appId: string) => void;
  runningAppIds: string[];
}

export const Dock: React.FC<DockProps> = ({ onOpenApp, runningAppIds }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const allItems = [...DOCK_ITEMS_LEFT, { id: 'separator', name: '', iconType: '' }, ...DOCK_ITEMS_RIGHT];

  const handleItemClick = (item: DockItem) => {
    if (item.id === 'separator') return;
    sounds.playLaunch();
    setBouncingId(item.id);
    setTimeout(() => setBouncingId(null), 1200);
    onOpenApp(item.id);
  };

  // Magnification calculation based on mouse distance
  const getScale = (index: number) => {
    if (hoveredIdx === null) return 1;
    const distance = Math.abs(hoveredIdx - index);
    if (distance === 0) return 1.35;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.08;
    return 1;
  };

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40 select-none">
      {/* 3D Glass Plinth */}
      <div
        ref={dockRef}
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative flex items-end h-[64px] px-2.5 py-1.5 rounded-[24px] bg-white/25 dark:bg-black/40 backdrop-blur-3xl border border-white/30 mac-specular-glass ring-1 ring-white/10 transition-all duration-150"
      >
        {allItems.map((item, idx) => {
          if (item.id === 'separator') {
            return (
              <div
                key="separator"
                className="w-[1px] h-9 mx-1.5 bg-white/25 self-center rounded-full"
              />
            );
          }

          const scale = getScale(idx);
          const isRunning = runningAppIds.includes(item.id) || item.isRunning;
          const isBouncing = bouncingId === item.id;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => handleItemClick(item)}
              className="relative flex flex-col items-center group px-0.5 cursor-pointer origin-bottom transition-all duration-100 ease-out"
              style={{
                transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 16 : 0}px)`
              }}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xl border border-white/15 text-white text-[11px] font-medium whitespace-nowrap shadow-xl pointer-events-none z-50">
                  {item.name}
                </div>
              )}

              {/* Icon Container with optional bounce */}
              <div className={`relative ${isBouncing ? 'animate-bounce' : ''}`}>
                <AppIconRenderer
                  iconType={item.iconType}
                  size={46}
                  className="filter drop-shadow-md transition-transform"
                />

                {/* Badge (e.g., Reminders 4, Settings 1) */}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 border border-white text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Active Running App Dot */}
              <div
                className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
                  isRunning ? 'bg-white/90 shadow-[0_0_4px_white]' : 'bg-transparent'
                }`}
              />

              {/* Mirror Reflection beneath dock */}
              <div className="absolute -bottom-7 w-full flex justify-center opacity-25 dock-reflection pointer-events-none">
                <AppIconRenderer
                  iconType={item.iconType}
                  size={42}
                  className="filter blur-[0.6px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
