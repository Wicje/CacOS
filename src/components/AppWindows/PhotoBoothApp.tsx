import React, { useState } from 'react';
import { sounds } from '../../utils/sound';
import { Camera, Sparkles } from 'lucide-react';
import pantheonImg from '../../assets/images/widget_pantheon_1791425670957.jpg';

interface PhotoBoothAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export const PhotoBoothApp: React.FC<PhotoBoothAppProps> = ({ onClose, zIndex, onFocus }) => {
  const [filter, setFilter] = useState<'normal' | 'sepia' | 'grayscale' | 'invert'>('normal');
  const [snaps, setSnaps] = useState<string[]>([pantheonImg]);
  const [position, setPosition] = useState({ x: 300, y: 110 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, posX: 300, posY: 110 });

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

  const takePhoto = () => {
    sounds.playShutter();
    // Add current snapshot
    setSnaps([pantheonImg, ...snaps]);
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'sepia': return 'sepia(80%)';
      case 'grayscale': return 'grayscale(100%)';
      case 'invert': return 'invert(90%)';
      default: return 'none';
    }
  };

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[640px] h-[460px] rounded-[20px] bg-[#1e1e20]/95 backdrop-blur-3xl shadow-2xl border border-white/20 text-white flex flex-col select-none overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 border-b border-white/10 px-4 flex items-center justify-between cursor-default shrink-0"
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
        <span className="text-[12px] font-medium text-white/60">Photo Booth</span>
        <div className="w-10" />
      </div>

      {/* Viewfinder Preview */}
      <div className="flex-1 relative flex items-center justify-center bg-black/60 overflow-hidden">
        <img
          src={pantheonImg}
          alt="Viewfinder"
          className="w-full h-full object-cover transition-all duration-300"
          style={{ filter: getFilterStyle() }}
        />

        {/* Capture button */}
        <button
          onClick={takePhoto}
          className="absolute bottom-4 w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 border-4 border-white shadow-xl flex items-center justify-center transition-transform active:scale-95"
        >
          <Camera size={22} className="text-white" />
        </button>

        {/* Filters bar */}
        <div className="absolute top-4 right-4 flex gap-1.5 bg-black/50 backdrop-blur-md p-1.5 rounded-xl border border-white/15">
          {(['normal', 'sepia', 'grayscale', 'invert'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded-lg text-[11px] capitalize ${
                filter === f ? 'bg-white text-black font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Snapshot reel at bottom */}
      <div className="h-16 border-t border-white/10 px-3 flex items-center gap-2 overflow-x-auto bg-neutral-900/80">
        {snaps.map((s, idx) => (
          <div key={idx} className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 shrink-0">
            <img src={s} alt="snap" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
