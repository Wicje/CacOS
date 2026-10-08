/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import sequoiaDusk from './assets/images/sequoia_wallpaper_1791425659843.jpg';
import sequoiaDay from './assets/images/sequoia_day_1791426348004.jpg';
import sequoiaNight from './assets/images/sequoia_night_1791426361816.jpg';

import { Menubar } from './components/Menubar';
import { DesktopWidgets } from './components/DesktopWidgets';
import { FinderWindow } from './components/FinderWindow';
import { ControlCenter } from './components/ControlCenter';
import { Dock } from './components/Dock';
import { SpotlightModal } from './components/SpotlightModal';
import { DesktopContextMenu } from './components/DesktopContextMenu';
import { LockScreen } from './components/LockScreen';
import { NotificationCenter } from './components/NotificationCenter';
import { NotificationBanner } from './components/NotificationBanner';
import { MacNotch } from './components/MacNotch';
import { WallpaperModal, WallpaperOption, WALLPAPERS } from './components/WallpaperModal';
import { AppleIntelligenceGlow } from './components/AppleIntelligenceGlow';
import { StageManager } from './components/StageManager';
import { Launchpad } from './components/Launchpad';

import { CalculatorApp } from './components/AppWindows/CalculatorApp';
import { NotesApp } from './components/AppWindows/NotesApp';
import { SafariApp } from './components/AppWindows/SafariApp';
import { TerminalApp } from './components/AppWindows/TerminalApp';
import { SettingsApp } from './components/AppWindows/SettingsApp';
import { PhotoBoothApp } from './components/AppWindows/PhotoBoothApp';
import { AppIconRenderer } from './components/MacIcons';
import { sounds } from './utils/sound';

export default function App() {
  // Wallpaper state (Default to Dusk matching browser.jpg)
  const [currentWallpaperId, setCurrentWallpaperId] = useState<string>('sequoia_dusk');
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState(false);

  // Lock Screen state
  const [isLocked, setIsLocked] = useState(false);

  // Apple Intelligence / Siri state
  const [isAppleIntelligenceOpen, setIsAppleIntelligenceOpen] = useState(false);

  // Stage Manager mode
  const [isStageManagerEnabled, setIsStageManagerEnabled] = useState(false);

  // Launchpad fullscreen state
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);

  // Widget Edit / Wiggle mode
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);

  // Notification Center drawer (Right-side slideout)
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  // Desktop right-click context menu
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false
  });

  // Desktop user folders
  const [desktopFolders, setDesktopFolders] = useState<Array<{ id: string; name: string }>>([
    { id: 'f1', name: 'Design Assets' }
  ]);
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);

  // Desktop Marquee Selection Box
  const [marquee, setMarquee] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isActive: boolean;
  }>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isActive: false
  });

  // Finder window
  const [isFinderOpen, setIsFinderOpen] = useState(true);

  // Control Center (open by default, exactly matching browser.jpg!)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(true);

  // Spotlight search modal
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  // Appearance theme
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Active open apps
  const [openApps, setOpenApps] = useState<{ [appId: string]: boolean }>({
    finder: true
  });

  // Window Z-Index ordering & Active window tracking
  const [activeWindowId, setActiveWindowId] = useState<string>('finder');
  const [zIndices, setZIndices] = useState<{ [id: string]: number }>({
    finder: 20,
    calculator: 21,
    notes: 22,
    safari: 23,
    terminal: 24,
    settings: 25,
    photobooth: 26
  });

  const getWallpaperUrl = () => {
    switch (currentWallpaperId) {
      case 'sequoia_day':
        return sequoiaDay;
      case 'sequoia_night':
        return sequoiaNight;
      default:
        return sequoiaDusk;
    }
  };

  const bringToFront = (appId: string) => {
    setActiveWindowId(appId);
    setZIndices((prev) => {
      const highest = Math.max(...Object.values(prev), 20);
      return { ...prev, [appId]: highest + 1 };
    });
  };

  const handleOpenApp = (appId: string) => {
    sounds.playLaunch();
    if (appId === 'apps' || appId === 'launchpad') {
      setIsLaunchpadOpen(true);
      return;
    }

    if (appId === 'finder') {
      setIsFinderOpen(true);
      bringToFront('finder');
      return;
    }

    setOpenApps((prev) => ({ ...prev, [appId]: true }));
    bringToFront(appId);
  };

  const handleCloseApp = (appId: string) => {
    sounds.playClose();
    if (appId === 'finder') {
      setIsFinderOpen(false);
      return;
    }
    setOpenApps((prev) => ({ ...prev, [appId]: false }));
  };

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd + Ctrl + Q: Lock Screen
      if (e.metaKey && e.ctrlKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        sounds.playLock();
        setIsLocked(true);
      }
      // Option + Space or Cmd + M: Apple Intelligence
      if ((e.altKey && e.code === 'Space') || (e.metaKey && e.key.toLowerCase() === 'm')) {
        e.preventDefault();
        sounds.playLaunch();
        setIsAppleIntelligenceOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Marquee drag listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!marquee.isActive) return;
      setMarquee((prev) => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY
      }));
    };

    const handleMouseUp = () => {
      if (marquee.isActive) {
        setMarquee((prev) => ({ ...prev, isActive: false }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [marquee.isActive]);

  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    // Only start marquee if clicking empty desktop background (not right click)
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('.fixed') && !target.classList.contains('desktop-bg')) return;

    setSelectedFolderIds([]);
    setMarquee({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isActive: true
    });
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playClick();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true
    });
  };

  const createNewFolder = () => {
    sounds.playClick();
    const folderNum = desktopFolders.length + 1;
    setDesktopFolders((prev) => [
      ...prev,
      { id: String(Date.now()), name: `Untitled Folder ${folderNum > 1 ? folderNum : ''}`.trim() }
    ]);
  };

  const runningAppIds = [
    ...(isFinderOpen ? ['finder'] : []),
    ...Object.entries(openApps)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id)
  ];

  // Marquee rectangle dimensions
  const marqueeLeft = Math.min(marquee.startX, marquee.currentX);
  const marqueeTop = Math.min(marquee.startY, marquee.currentY);
  const marqueeWidth = Math.abs(marquee.currentX - marquee.startX);
  const marqueeHeight = Math.abs(marquee.currentY - marquee.startY);

  return (
    <div
      onMouseDown={handleDesktopMouseDown}
      onContextMenu={handleDesktopContextMenu}
      onClick={() => {
        if (contextMenu.isOpen) setContextMenu((prev) => ({ ...prev, isOpen: false }));
        if (isNotificationCenterOpen) setIsNotificationCenterOpen(false);
      }}
      className={`relative w-screen h-screen overflow-hidden select-none font-sans desktop-bg transition-colors duration-500 ${
        isDarkMode ? 'dark text-white' : 'text-slate-900'
      }`}
      style={{
        backgroundImage: `url(${getWallpaperUrl()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Top macOS Menubar */}
      <Menubar
        activeAppTitle={activeWindowId === 'finder' ? 'Finder' : activeWindowId.charAt(0).toUpperCase() + activeWindowId.slice(1)}
        onOpenApp={handleOpenApp}
        isControlCenterOpen={isControlCenterOpen}
        onToggleControlCenter={() => {
          setIsControlCenterOpen(!isControlCenterOpen);
          if (isNotificationCenterOpen) setIsNotificationCenterOpen(false);
        }}
        onToggleSpotlight={() => setIsSpotlightOpen(!isSpotlightOpen)}
        onLockScreen={() => setIsLocked(true)}
        onToggleNotificationCenter={() => {
          setIsNotificationCenterOpen(!isNotificationCenterOpen);
          if (isControlCenterOpen) setIsControlCenterOpen(false);
        }}
        onToggleAppleIntelligence={() => setIsAppleIntelligenceOpen(!isAppleIntelligenceOpen)}
      />

      {/* Modern MacBook Pro Interactive Notch (NotchNook with multiple states) */}
      <MacNotch onOpenApp={handleOpenApp} />

      {/* Desktop Marquee Selection Box */}
      {marquee.isActive && (
        <div
          style={{
            left: `${marqueeLeft}px`,
            top: `${marqueeTop}px`,
            width: `${marqueeWidth}px`,
            height: `${marqueeHeight}px`
          }}
          className="fixed z-15 bg-blue-500/20 border border-blue-400/60 rounded-[2px] pointer-events-none"
        />
      )}

      {/* Stage Manager 3D Window Shelf (Left edge) */}
      <StageManager
        isEnabled={isStageManagerEnabled}
        activeWindowId={activeWindowId}
        onSelectGroup={handleOpenApp}
      />

      {/* Desktop Widgets (Left side: Calendar, Photo, World Clock) */}
      <DesktopWidgets
        isEditing={isEditingWidgets}
        onDoneEditing={() => setIsEditingWidgets(false)}
      />

      {/* Desktop Custom Created Folders */}
      <div className="absolute top-14 right-6 flex flex-col gap-4 pointer-events-auto select-none z-10">
        {desktopFolders.map((folder) => {
          const isSelected = selectedFolderIds.includes(folder.id);
          return (
            <div
              key={folder.id}
              onClick={(e) => {
                e.stopPropagation();
                sounds.playClick();
                setSelectedFolderIds([folder.id]);
              }}
              onDoubleClick={() => handleOpenApp('finder')}
              className={`flex flex-col items-center group cursor-pointer w-20 text-center p-1 rounded-xl transition-colors ${
                isSelected ? 'bg-blue-600/30 ring-1 ring-blue-400/50' : 'hover:bg-white/10'
              }`}
            >
              <AppIconRenderer iconType="downloads" size={48} className="drop-shadow-lg" />
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded mt-1 truncate max-w-full ${
                  isSelected ? 'bg-blue-600 text-white font-semibold' : 'text-white drop-shadow-md bg-black/20 backdrop-blur-xs'
                }`}
              >
                {folder.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Finder Window (Applications Folder from browser.jpg) */}
      <FinderWindow
        isOpen={isFinderOpen}
        onClose={() => handleCloseApp('finder')}
        onOpenApp={handleOpenApp}
        onFocus={() => bringToFront('finder')}
        zIndex={zIndices['finder'] || 20}
        isActive={activeWindowId === 'finder'}
      />

      {/* Right Floating Control Center */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        onOpenApp={handleOpenApp}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isStageManagerEnabled={isStageManagerEnabled}
        onToggleStageManager={() => setIsStageManagerEnabled(!isStageManagerEnabled)}
      />

      {/* Notification Center Drawer (Right Side) */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onOpenApp={handleOpenApp}
      />

      {/* Floating Toast Notification Banner */}
      <NotificationBanner onOpenApp={handleOpenApp} />

      {/* Interactive App Windows */}
      {openApps['calculator'] && (
        <CalculatorApp
          onClose={() => handleCloseApp('calculator')}
          zIndex={zIndices['calculator'] || 25}
          onFocus={() => bringToFront('calculator')}
        />
      )}

      {openApps['notes'] && (
        <NotesApp
          onClose={() => handleCloseApp('notes')}
          zIndex={zIndices['notes'] || 25}
          onFocus={() => bringToFront('notes')}
        />
      )}

      {openApps['safari'] && (
        <SafariApp
          onClose={() => handleCloseApp('safari')}
          zIndex={zIndices['safari'] || 25}
          onFocus={() => bringToFront('safari')}
        />
      )}

      {openApps['terminal'] && (
        <TerminalApp
          onClose={() => handleCloseApp('terminal')}
          zIndex={zIndices['terminal'] || 25}
          onFocus={() => bringToFront('terminal')}
        />
      )}

      {openApps['settings'] && (
        <SettingsApp
          onClose={() => handleCloseApp('settings')}
          zIndex={zIndices['settings'] || 25}
          onFocus={() => bringToFront('settings')}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          currentWallpaperId={currentWallpaperId}
          onSelectWallpaper={(id) => setCurrentWallpaperId(id)}
        />
      )}

      {openApps['photobooth'] && (
        <PhotoBoothApp
          onClose={() => handleCloseApp('photobooth')}
          zIndex={zIndices['photobooth'] || 25}
          onFocus={() => bringToFront('photobooth')}
        />
      )}

      {/* Spotlight Search Overlay */}
      <SpotlightModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenApp={handleOpenApp}
      />

      {/* Apple Intelligence Perimeter Rainbow Glow & Capsule */}
      <AppleIntelligenceGlow
        isOpen={isAppleIntelligenceOpen}
        onClose={() => setIsAppleIntelligenceOpen(false)}
        onOpenApp={handleOpenApp}
      />

      {/* Fullscreen Launchpad Overlay */}
      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        onOpenApp={handleOpenApp}
      />

      {/* Wallpaper Gallery Modal */}
      <WallpaperModal
        isOpen={isWallpaperModalOpen}
        onClose={() => setIsWallpaperModalOpen(false)}
        currentWallpaperId={currentWallpaperId}
        onSelectWallpaper={(wp: WallpaperOption) => setCurrentWallpaperId(wp.id)}
      />

      {/* Desktop Right-Click Context Menu */}
      <DesktopContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onChangeWallpaper={() => setIsWallpaperModalOpen(true)}
        onEditWidgets={() => setIsEditingWidgets(true)}
        onNewFolder={createNewFolder}
      />

      {/* macOS Sequoia Lock Screen & Sleep State */}
      <LockScreen
        isLocked={isLocked}
        onUnlock={() => setIsLocked(false)}
        wallpaperUrl={getWallpaperUrl()}
      />

      {/* Bottom Floating 3D Specular Glass Dock */}
      <Dock onOpenApp={handleOpenApp} runningAppIds={runningAppIds} />
    </div>
  );
}
