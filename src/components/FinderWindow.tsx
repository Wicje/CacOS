import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Columns,
  Image as GalleryIcon,
  Share,
  Tag,
  MoreHorizontal,
  Search,
  ArrowUpDown
} from 'lucide-react';
import { AppIconRenderer } from './MacIcons';
import { ViewMode } from '../types';
import { sounds } from '../utils/sound';

interface FinderApp {
  id: string;
  name: string;
  iconType: string;
}

const APPLICATIONS_LIST: FinderApp[] = [
  // Row 1
  { id: 'appstore', name: 'App Store', iconType: 'appstore' },
  { id: 'apps', name: 'Apps', iconType: 'apps' },
  { id: 'automator', name: 'Automator', iconType: 'automator' },
  { id: 'books', name: 'Books', iconType: 'books' },
  { id: 'calculator', name: 'Calculator', iconType: 'calculator' },
  { id: 'calendar', name: 'Calendar', iconType: 'calendar' },
  { id: 'chess', name: 'Chess', iconType: 'chess' },

  // Row 2
  { id: 'clock', name: 'Clock', iconType: 'clock' },
  { id: 'contacts', name: 'Contacts', iconType: 'contacts' },
  { id: 'dictionary', name: 'Dictionary', iconType: 'dictionary' },
  { id: 'facetime', name: 'FaceTime', iconType: 'facetime' },
  { id: 'findmy', name: 'Find My', iconType: 'findmy' },
  { id: 'fontbook', name: 'Font Book', iconType: 'fontbook' },
  { id: 'freeform', name: 'Freeform', iconType: 'freeform' },

  // Row 3
  { id: 'games', name: 'Games', iconType: 'games' },
  { id: 'home', name: 'Home', iconType: 'home' },
  { id: 'imagecapture', name: 'Image Capture', iconType: 'imagecapture' },
  { id: 'iphonemirroring', name: 'iPhone Mirroring', iconType: 'iphonemirroring' },
  { id: 'journal', name: 'Journal', iconType: 'journal' },
  { id: 'mail', name: 'Mail', iconType: 'mail' },
  { id: 'maps', name: 'Maps', iconType: 'maps' },

  // Row 4
  { id: 'messages', name: 'Messages', iconType: 'messages' },
  { id: 'missioncontrol', name: 'Mission Control', iconType: 'missioncontrol' },
  { id: 'music', name: 'Music', iconType: 'music' },
  { id: 'notes', name: 'Notes', iconType: 'notes' },
  { id: 'passwords', name: 'Passwords', iconType: 'passwords' },
  { id: 'phone', name: 'Phone', iconType: 'phone' },
  { id: 'photobooth', name: 'Photo Booth', iconType: 'photobooth' }
];

interface FinderWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  onFocus: () => void;
  zIndex: number;
  isActive?: boolean;
}

export const FinderWindow: React.FC<FinderWindowProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onFocus,
  zIndex,
  isActive = true
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [iconSize, setIconSize] = useState<number>(54);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isTrafficHovered, setIsTrafficHovered] = useState(false);
  const [snapPreview, setSnapPreview] = useState<'left' | 'right' | 'full' | null>(null);

  // Dragging state
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.max(80, window.innerWidth / 2 - 340),
    y: Math.max(45, window.innerHeight / 2 - 275)
  });
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 670,
    height: 550
  });
  const isDraggingRef = useRef(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newX = e.clientX - dragStartOffset.current.x;
      const newY = Math.max(26, e.clientY - dragStartOffset.current.y);

      // Snap preview detection
      if (e.clientX < 30) {
        setSnapPreview('left');
      } else if (e.clientX > window.innerWidth - 30) {
        setSnapPreview('right');
      } else if (e.clientY < 35) {
        setSnapPreview('full');
      } else {
        setSnapPreview(null);
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      // Apply snap if releasing in preview zone
      if (e.clientX < 30) {
        setPosition({ x: 12, y: 34 });
        setSize({ width: Math.floor(window.innerWidth / 2) - 20, height: window.innerHeight - 105 });
      } else if (e.clientX > window.innerWidth - 30) {
        setPosition({ x: Math.floor(window.innerWidth / 2) + 8, y: 34 });
        setSize({ width: Math.floor(window.innerWidth / 2) - 20, height: window.innerHeight - 105 });
      } else if (e.clientY < 35) {
        setPosition({ x: 12, y: 34 });
        setSize({ width: window.innerWidth - 24, height: window.innerHeight - 105 });
      }
      setSnapPreview(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    onFocus();
    isDraggingRef.current = true;
    dragStartOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  if (!isOpen) return null;

  const filteredApps = APPLICATIONS_LIST.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Snap Preview Highlight Overlay */}
      {snapPreview && (
        <div
          className={`fixed pointer-events-none z-[19] bg-white/15 dark:bg-blue-500/15 backdrop-blur-md rounded-2xl border-2 border-white/40 dark:border-blue-400/40 transition-all duration-150 ${
            snapPreview === 'left'
              ? 'top-8 left-2 bottom-20 w-[49vw]'
              : snapPreview === 'right'
              ? 'top-8 right-2 bottom-20 w-[49vw]'
              : 'top-8 left-2 right-2 bottom-20'
          }`}
        />
      )}

      <div
        onMouseDown={onFocus}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex
        }}
        className={`fixed rounded-[22px] bg-white/95 dark:bg-[#1e1e20]/95 backdrop-blur-3xl border border-white/60 dark:border-white/15 flex flex-col overflow-hidden select-none mac-specular-glass ${
          isActive ? 'mac-window-active' : 'mac-window-inactive opacity-95'
        }`}
      >
      {/* Window Toolbar / Titlebar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        className="h-12 border-b border-black/5 dark:border-white/10 px-4 flex items-center justify-between cursor-default shrink-0 bg-transparent"
      >
        {/* Left: Traffic light buttons & nav arrows */}
        <div className="flex items-center gap-4">
          {/* Traffic Lights */}
          <div
            onMouseEnter={() => setIsTrafficHovered(true)}
            onMouseLeave={() => setIsTrafficHovered(false)}
            className="flex items-center gap-2 group"
          >
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sounds.playClose();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[8px] text-[#4C0000] font-bold"
            >
              {isTrafficHovered && '✕'}
            </button>
            {/* Minimize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sounds.playClose();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[8px] text-[#5A3E00] font-bold"
            >
              {isTrafficHovered && '—'}
            </button>
            {/* Maximize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sounds.playClick();
              }}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[7px] text-[#003E0A] font-bold"
            >
              {isTrafficHovered && '⤢'}
            </button>
          </div>

          {/* Navigation chevrons */}
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40" disabled>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Folder Title */}
          <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 tracking-tight ml-1">
            Applications
          </span>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          {/* View mode segmented pill */}
          <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-lg p-0.5 border border-black/5 dark:border-white/10">
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('grid');
              }}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-white/20 shadow-sm text-slate-900 dark:text-white'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Icons"
            >
              <LayoutGrid size={13} />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('list');
              }}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-white/20 shadow-sm text-slate-900 dark:text-white'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List"
            >
              <List size={13} />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('columns');
              }}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'columns'
                  ? 'bg-white dark:bg-white/20 shadow-sm text-slate-900 dark:text-white'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Columns"
            >
              <Columns size={13} />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('gallery');
              }}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'gallery'
                  ? 'bg-white dark:bg-white/20 shadow-sm text-slate-900 dark:text-white'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Gallery"
            >
              <GalleryIcon size={13} />
            </button>
          </div>

          {/* Grouping */}
          <button
            onClick={() => sounds.playClick()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="Group by"
          >
            <ArrowUpDown size={14} />
          </button>

          {/* Share */}
          <button
            onClick={() => sounds.playClick()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="Share"
          >
            <Share size={14} />
          </button>

          {/* Tags */}
          <button
            onClick={() => sounds.playClick()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="Tags"
          >
            <Tag size={14} />
          </button>

          {/* More Action */}
          <button
            onClick={() => sounds.playClick()}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="More Actions"
          >
            <MoreHorizontal size={14} />
          </button>

          {/* Search */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <input
                type="text"
                value={searchQuery}
                placeholder="Search..."
                autoFocus
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setShowSearchInput(false)}
                className="w-28 text-[12px] bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 rounded-lg px-2 py-0.5 outline-none text-slate-800 dark:text-slate-100"
              />
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowSearchInput(true);
                }}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                title="Search"
              >
                <Search size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
        onClick={() => setSelectedAppId(null)}
      >
        {viewMode === 'grid' && (
          <div className="grid grid-cols-7 gap-y-6 gap-x-2 justify-items-center">
            {filteredApps.map((app) => {
              const isSelected = selectedAppId === app.id;
              return (
                <div
                  key={app.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setSelectedAppId(app.id);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    sounds.playLaunch();
                    onOpenApp(app.id);
                  }}
                  className={`flex flex-col items-center justify-start text-center cursor-default group transition-transform ${
                    isSelected ? 'scale-100' : 'hover:scale-[1.02]'
                  }`}
                  style={{ width: `${Math.max(iconSize + 24, 76)}px` }}
                >
                  {/* Icon */}
                  <div
                    className={`p-1 rounded-xl transition-colors duration-150 relative ${
                      isSelected
                        ? 'bg-blue-500/20 ring-1 ring-blue-500/40'
                        : 'group-hover:drop-shadow-md'
                    }`}
                  >
                    <AppIconRenderer
                      iconType={app.iconType}
                      size={iconSize}
                      className="filter drop-shadow-sm group-hover:brightness-105"
                    />
                  </div>

                  {/* App Name Label */}
                  <span
                    className={`mt-1.5 text-[11px] leading-tight px-1.5 py-0.5 rounded-[4px] font-normal transition-colors max-w-[80px] break-words line-clamp-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white'
                    }`}
                  >
                    {app.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="w-full text-[12px] text-slate-700 dark:text-slate-300">
            <div className="grid grid-cols-12 py-1 px-3 border-b border-black/5 dark:border-white/10 font-semibold text-slate-400 text-[11px]">
              <span className="col-span-6">Name</span>
              <span className="col-span-3">Kind</span>
              <span className="col-span-3 text-right">Size</span>
            </div>
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAppId(app.id);
                }}
                onDoubleClick={() => onOpenApp(app.id)}
                className={`grid grid-cols-12 items-center py-1.5 px-3 rounded-lg cursor-pointer ${
                  selectedAppId === app.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="col-span-6 flex items-center gap-2 truncate">
                  <AppIconRenderer iconType={app.iconType} size={18} />
                  <span>{app.name}</span>
                </div>
                <span className="col-span-3 opacity-70">Application</span>
                <span className="col-span-3 text-right opacity-70">42.8 MB</span>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'columns' && (
          <div className="flex h-full border border-black/5 rounded-lg overflow-hidden text-[12px]">
            <div className="w-1/2 border-r border-black/10 dark:border-white/10 overflow-y-auto p-1">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  onDoubleClick={() => onOpenApp(app.id)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${
                    selectedAppId === app.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <AppIconRenderer iconType={app.iconType} size={18} />
                  <span className="truncate">{app.name}</span>
                </div>
              ))}
            </div>
            <div className="w-1/2 p-4 flex flex-col items-center justify-center text-center">
              {selectedAppId ? (
                <>
                  <AppIconRenderer
                    iconType={APPLICATIONS_LIST.find((a) => a.id === selectedAppId)?.iconType || 'finder'}
                    size={80}
                  />
                  <h3 className="mt-3 font-semibold text-[14px]">
                    {APPLICATIONS_LIST.find((a) => a.id === selectedAppId)?.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">Application · macOS Sequoia</p>
                  <button
                    onClick={() => onOpenApp(selectedAppId)}
                    className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-lg text-[12px] font-medium hover:bg-blue-700 shadow-sm"
                  >
                    Open
                  </button>
                </>
              ) : (
                <span className="text-slate-400">Select an item to preview</span>
              )}
            </div>
          </div>
        )}

        {viewMode === 'gallery' && (
          <div className="flex flex-col items-center justify-center h-full">
            <AppIconRenderer
              iconType={selectedAppId || 'finder'}
              size={120}
              className="drop-shadow-xl"
            />
            <h3 className="mt-4 font-semibold text-[16px]">
              {APPLICATIONS_LIST.find((a) => a.id === selectedAppId)?.name || 'Select App'}
            </h3>
          </div>
        )}
      </div>

      {/* Footer / Status Bar */}
      <div className="h-7 border-t border-black/5 dark:border-white/10 px-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0 bg-transparent">
        <div className="w-20" />
        {/* Centered items count & disk space */}
        <span className="text-center font-normal tracking-tight">
          {filteredApps.length} items, 86.13 GB available
        </span>

        {/* Right: Icon size slider bar matching screenshot */}
        <div className="flex items-center gap-2">
          <div className="relative w-16 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center">
            <div
              className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full"
              style={{ width: `${((iconSize - 40) / 40) * 100}%` }}
            />
            <input
              type="range"
              min="40"
              max="80"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              title="Zoom icons"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
