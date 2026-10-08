import React from 'react';
import { AppIconRenderer } from './MacIcons';
import { sounds } from '../utils/sound';

interface StageGroup {
  id: string;
  name: string;
  iconType: string;
  activeCount?: number;
}

interface StageManagerProps {
  isEnabled: boolean;
  activeWindowId: string;
  onSelectGroup: (appId: string) => void;
}

const STAGE_GROUPS: StageGroup[] = [
  { id: 'finder', name: 'Finder', iconType: 'finder' },
  { id: 'safari', name: 'Safari', iconType: 'safari' },
  { id: 'notes', name: 'Notes', iconType: 'notes' },
  { id: 'terminal', name: 'Terminal', iconType: 'terminal' },
  { id: 'calculator', name: 'Calculator', iconType: 'calculator' }
];

export const StageManager: React.FC<StageManagerProps> = ({
  isEnabled,
  activeWindowId,
  onSelectGroup
}) => {
  if (!isEnabled) return null;

  // Filter out the currently active window from the shelf
  const shelfGroups = STAGE_GROUPS.filter((g) => g.id !== activeWindowId);

  return (
    <div className="fixed left-3 top-28 bottom-28 z-20 flex flex-col justify-center gap-4 pointer-events-auto select-none">
      {shelfGroups.map((group) => (
        <div
          key={group.id}
          onClick={() => {
            sounds.playLaunch();
            onSelectGroup(group.id);
          }}
          className="group relative cursor-pointer"
          style={{ perspective: '800px' }}
        >
          {/* Miniature 3D Window Thumbnail Shelf */}
          <div
            className="w-24 h-16 rounded-xl bg-slate-900/60 dark:bg-black/70 backdrop-blur-2xl border border-white/25 shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex flex-col p-1.5 transition-all duration-300 ease-out origin-left group-hover:scale-105 group-hover:border-white/40"
            style={{
              transform: 'rotateY(22deg) scale(0.92)'
            }}
          >
            {/* Mini window traffic lights header */}
            <div className="flex items-center gap-1 mb-1 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            {/* Mini window body content */}
            <div className="flex-1 flex items-center justify-center bg-white/10 rounded-lg">
              <AppIconRenderer iconType={group.iconType} size={24} className="drop-shadow" />
            </div>
          </div>

          {/* App Icon badge sitting on shelf edge */}
          <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-slate-800 border border-white/30 flex items-center justify-center shadow-md">
            <AppIconRenderer iconType={group.iconType} size={16} />
          </div>

          {/* Hover Tooltip */}
          <div className="absolute left-28 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md bg-slate-900/85 backdrop-blur-xl border border-white/15 text-white text-[11px] font-medium whitespace-nowrap shadow-xl pointer-events-none">
            {group.name}
          </div>
        </div>
      ))}
    </div>
  );
};
