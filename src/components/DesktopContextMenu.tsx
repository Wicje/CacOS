import React, { useEffect, useRef } from 'react';
import { sounds } from '../utils/sound';
import {
  FolderPlus,
  Info,
  Image,
  LayoutGrid,
  Layers,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onChangeWallpaper: () => void;
  onEditWidgets: () => void;
  onNewFolder: () => void;
}

export const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  onChangeWallpaper,
  onEditWidgets,
  onNewFolder
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Ensure menu stays within screen boundaries
  const adjustedX = Math.min(x, window.innerWidth - 230);
  const adjustedY = Math.min(y, window.innerHeight - 300);

  const handleAction = (action: () => void) => {
    sounds.playClick();
    action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{ left: `${adjustedX}px`, top: `${adjustedY}px` }}
      className="fixed z-50 w-[215px] rounded-xl bg-slate-900/85 backdrop-blur-3xl border border-white/20 p-1 text-[13px] text-white/90 shadow-2xl mac-specular-glass select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => handleAction(onNewFolder)}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
      >
        <FolderPlus size={14} />
        <span>New Folder</span>
      </div>

      <div
        onClick={() => handleAction(() => {})}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors text-white/60 hover:text-white"
      >
        <Info size={14} />
        <span>Get Info</span>
      </div>

      <div className="h-[1px] bg-white/10 my-1 mx-1" />

      <div
        onClick={() => handleAction(onChangeWallpaper)}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors font-medium text-amber-300 hover:text-white"
      >
        <Image size={14} />
        <span>Change Wallpaper…</span>
      </div>

      <div
        onClick={() => handleAction(onEditWidgets)}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
      >
        <LayoutGrid size={14} />
        <span>Edit Widgets…</span>
      </div>

      <div className="h-[1px] bg-white/10 my-1 mx-1" />

      <div
        onClick={() => handleAction(() => {})}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors text-white/80"
      >
        <Layers size={14} />
        <span>Use Stacks</span>
      </div>

      <div
        onClick={() => handleAction(() => {})}
        className="flex items-center justify-between px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} />
          <span>Sort By</span>
        </div>
        <span className="text-[10px] text-white/40">›</span>
      </div>

      <div
        onClick={() => handleAction(() => {})}
        className="flex items-center justify-between px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} />
          <span>Clean Up By</span>
        </div>
        <span className="text-[10px] text-white/40">›</span>
      </div>

      <div className="h-[1px] bg-white/10 my-1 mx-1" />

      <div
        onClick={() => handleAction(() => {})}
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
      >
        <SlidersHorizontal size={14} />
        <span>Show View Options</span>
      </div>
    </div>
  );
};
