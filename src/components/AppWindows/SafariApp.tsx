import React, { useState } from 'react';
import { sounds } from '../../utils/sound';
import { ArrowLeft, ArrowRight, RotateCw, Shield, Search, Plus, Bookmark } from 'lucide-react';

interface SafariAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export const SafariApp: React.FC<SafariAppProps> = ({ onClose, zIndex, onFocus }) => {
  const [url, setUrl] = useState('apple.com');
  const [position, setPosition] = useState({ x: 260, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, posX: 260, posY: 100 });

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

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[720px] h-[480px] rounded-[20px] bg-white/95 dark:bg-[#1f1f21]/95 backdrop-blur-3xl shadow-2xl border border-white/20 flex flex-col select-none overflow-hidden"
    >
      {/* Safari Titlebar & Navigation */}
      <div
        onMouseDown={handleMouseDown}
        className="h-11 border-b border-black/10 dark:border-white/10 px-4 flex items-center gap-3 cursor-default shrink-0"
      >
        <div className="flex items-center gap-1.5 mr-2">
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

        <div className="flex items-center gap-1 text-slate-500">
          <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30" disabled>
            <ArrowLeft size={15} />
          </button>
          <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30" disabled>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto h-7 bg-black/5 dark:bg-white/10 rounded-lg flex items-center px-2.5 gap-2 border border-black/5 dark:border-white/10">
          <Shield size={12} className="text-slate-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent text-[12px] text-center font-normal outline-none text-slate-800 dark:text-slate-100"
          />
          <RotateCw size={12} className="text-slate-400 cursor-pointer" />
        </div>

        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-slate-500">
          <Plus size={15} />
        </button>
      </div>

      {/* Safari Page Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-neutral-900/60 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4"></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          macOS Sequoia
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mt-2">
          Built for Apple silicon. Featuring iPhone Mirroring, all-new Passwords app, and breathtaking dynamic landscapes of California.
        </p>

        {/* Favorites bar */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {[
            { name: 'Apple', url: 'apple.com', icon: '' },
            { name: 'iCloud', url: 'icloud.com', icon: '☁️' },
            { name: 'News', url: 'apple.news', icon: '📰' },
            { name: 'Maps', url: 'maps.apple.com', icon: '🗺️' }
          ].map((fav) => (
            <div
              key={fav.name}
              onClick={() => setUrl(fav.url)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center text-xl group-hover:scale-105 transition-transform border border-black/5 dark:border-white/10">
                {fav.icon}
              </div>
              <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">
                {fav.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
