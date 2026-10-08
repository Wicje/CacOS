import React, { useState } from 'react';
import { sounds } from '../../utils/sound';
import { Sun, Moon, Volume2, Monitor, Shield, Wifi, Bluetooth, HardDrive, Bell, Image as ImageIcon } from 'lucide-react';
import sequoiaDusk from '../../assets/images/sequoia_wallpaper_1791425659843.jpg';
import sequoiaDay from '../../assets/images/sequoia_day_1791426348004.jpg';
import sequoiaNight from '../../assets/images/sequoia_night_1791426361816.jpg';

interface SettingsAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentWallpaperId?: string;
  onSelectWallpaper?: (id: string) => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  onClose,
  zIndex,
  onFocus,
  isDarkMode,
  onToggleDarkMode,
  currentWallpaperId = 'sequoia_dusk',
  onSelectWallpaper
}) => {
  const [activeTab, setActiveTab] = useState('Appearance');
  const [position, setPosition] = useState({ x: 340, y: 130 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, posX: 340, posY: 130 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: dragRef.current.posX + (e.clientX - dragRef.current.startX),
        y: Math.max(26, dragRef.current.posY + (e.clientY - dragRef.current.startY))
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const navItems = [
    { name: 'Appearance', icon: Sun },
    { name: 'Wallpaper', icon: ImageIcon },
    { name: 'Wi-Fi', icon: Wifi },
    { name: 'Bluetooth', icon: Bluetooth },
    { name: 'Notifications', icon: Bell },
    { name: 'Sound', icon: Volume2 },
    { name: 'Displays', icon: Monitor },
    { name: 'General', icon: HardDrive },
    { name: 'Privacy & Security', icon: Shield }
  ];

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[680px] h-[450px] rounded-[20px] bg-white/95 dark:bg-[#1e1e20]/95 backdrop-blur-3xl shadow-2xl border border-white/20 text-slate-800 dark:text-white flex flex-col select-none overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 border-b border-black/10 dark:border-white/10 px-4 flex items-center justify-between cursor-default shrink-0"
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playClose();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"
          />
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <span className="text-[12px] font-medium text-slate-500 dark:text-white/60">System Settings</span>
        <div className="w-10" />
      </div>

      {/* Main Layout: Sidebar & Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 border-r border-black/10 dark:border-white/10 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.name;
            return (
              <div
                key={item.name}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(item.name);
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg mb-1 cursor-pointer text-[12px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Icon size={14} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 dark:bg-black/20">
          {activeTab === 'Appearance' && (
            <div>
              <h3 className="text-[15px] font-semibold mb-4">Appearance</h3>
              <div className="flex gap-4">
                <div
                  onClick={() => {
                    sounds.playClick();
                    if (isDarkMode) onToggleDarkMode();
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                    !isDarkMode
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-black/10 dark:border-white/10 hover:border-blue-400'
                  }`}
                >
                  <div className="w-24 h-16 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center">
                    <Sun size={24} className="text-amber-500" />
                  </div>
                  <span className="text-[12px] font-medium">Light</span>
                </div>

                <div
                  onClick={() => {
                    sounds.playClick();
                    if (!isDarkMode) onToggleDarkMode();
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                    isDarkMode
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-black/10 dark:border-white/10 hover:border-blue-400'
                  }`}
                >
                  <div className="w-24 h-16 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <Moon size={24} className="text-blue-400" />
                  </div>
                  <span className="text-[12px] font-medium">Dark</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium">Accent colour</span>
                  <div className="flex gap-2">
                    {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-amber-500', 'bg-emerald-500'].map(
                      (c, i) => (
                        <div
                          key={i}
                          className={`w-4.5 h-4.5 rounded-full ${c} cursor-pointer hover:scale-110 transition-transform shadow-sm`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Wallpaper' && (
            <div>
              <h3 className="text-[15px] font-semibold mb-4">Wallpaper</h3>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-4">
                Dynamic macOS Sequoia Lake Tahoe Landscapes
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'sequoia_dusk', name: 'Sequoia Dusk', src: sequoiaDusk },
                  { id: 'sequoia_day', name: 'Sequoia Daylight', src: sequoiaDay },
                  { id: 'sequoia_night', name: 'Sequoia Starlight', src: sequoiaNight }
                ].map((item) => {
                  const isSelected = currentWallpaperId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sounds.playClick();
                        onSelectWallpaper?.(item.id);
                      }}
                      className={`flex flex-col gap-1.5 p-1 rounded-xl cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-blue-500 bg-blue-500/10' : 'hover:scale-[1.02]'
                      }`}
                    >
                      <div className="aspect-video rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-sm">
                        <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-medium text-center">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab !== 'Appearance' && activeTab !== 'Wallpaper' && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
              <p className="text-[14px]">System Preferences for {activeTab}</p>
              <span className="text-[11px] text-slate-500 mt-1">Configured for macOS Sequoia 15.0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
