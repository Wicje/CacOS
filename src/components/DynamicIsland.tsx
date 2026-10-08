import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Timer, BatteryCharging, Headphones, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface DynamicIslandProps {
  onOpenApp?: (appId: string) => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ onOpenApp }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'music' | 'timer' | 'airpods'>('music');
  const [progress, setProgress] = useState(42);
  const [timerSeconds, setTimerSeconds] = useState(284);

  // Playback timer progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const toggleExpand = () => {
    sounds.playClick();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-1 left-1/2 -translate-x-1/2 z-50 select-none">
      <div
        onClick={toggleExpand}
        className={`group bg-black text-white border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded
            ? 'w-[360px] h-[140px] rounded-[30px] p-3.5'
            : 'w-[180px] h-[26px] rounded-full px-2.5 flex items-center justify-between hover:w-[195px]'
        }`}
      >
        {/* COMPACT STATE */}
        {!isExpanded && (
          <div className="flex items-center justify-between w-full h-full text-[11px] font-medium">
            {/* Left side: Album mini thumbnail or wave */}
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center">
                <Music size={8} className="text-white" />
              </div>
              <span className="text-[10px] text-white/90 truncate max-w-[70px] font-medium">
                Lake Tahoe
              </span>
            </div>

            {/* Right side: Live Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-2.5 pr-1">
              <span
                className={`w-0.5 bg-rose-500 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-rose-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-rose-500 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-2.5 animate-pulse delay-150' : 'h-1'
                }`}
              />
            </div>
          </div>
        )}

        {/* EXPANDED STATE */}
        {isExpanded && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col justify-between h-full w-full animate-fadeIn"
          >
            {/* Top Bar inside Island: Category Switcher */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('music');
                  }}
                  className={`px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                    activeTab === 'music' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Music size={11} />
                  <span>Now Playing</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('timer');
                  }}
                  className={`px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                    activeTab === 'timer' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Timer size={11} />
                  <span>Timer</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('airpods');
                  }}
                  className={`px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                    activeTab === 'airpods' ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Headphones size={11} />
                  <span>AirPods</span>
                </button>
              </div>

              {/* Close / Collapse pill */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsExpanded(false);
                }}
                className="w-4 h-4 rounded-full bg-white/15 hover:bg-white/30 text-white/70 hover:text-white flex items-center justify-center text-[9px]"
                title="Collapse"
              >
                ✕
              </button>
            </div>

            {/* TAB 1: MUSIC NOW PLAYING */}
            {activeTab === 'music' && (
              <div className="flex items-center gap-3 pt-1">
                {/* Album Cover */}
                <div
                  onClick={() => {
                    sounds.playLaunch();
                    onOpenApp?.('music');
                  }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <Music size={22} className="text-white drop-shadow" />
                </div>

                {/* Track details & controls */}
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col truncate">
                      <span className="text-[12px] font-semibold text-white truncate">
                        Lake Tahoe Echoes
                      </span>
                      <span className="text-[10px] text-white/60 truncate">
                        Apple Ambient · Sequoia Soundscape
                      </span>
                    </div>

                    {/* Animated Equalizer */}
                    <div className="flex items-end gap-0.5 h-3">
                      {[1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={`w-0.5 bg-rose-500 rounded-full transition-all duration-300 ${
                            isPlaying ? 'h-3 animate-pulse' : 'h-1'
                          }`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/20 h-1 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 pt-1.5 text-white/80">
                    <button
                      onClick={() => sounds.playClick()}
                      className="hover:text-white transition-colors"
                    >
                      <SkipBack size={14} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setIsPlaying(!isPlaying);
                      }}
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause size={13} fill="currentColor" />
                      ) : (
                        <Play size={13} fill="currentColor" className="ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={() => sounds.playClick()}
                      className="hover:text-white transition-colors"
                    >
                      <SkipForward size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TIMER */}
            {activeTab === 'timer' && (
              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Timer size={24} />
                  </div>
                  <div>
                    <span className="text-[24px] font-mono font-light text-white leading-none">
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="block text-[10px] text-white/50">Focus Timer</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setTimerSeconds(300);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium"
                >
                  Reset
                </button>
              </div>
            )}

            {/* TAB 3: AIRPODS PRO */}
            {activeTab === 'airpods' && (
              <div className="flex items-center justify-around px-2 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <Headphones size={20} className="text-white/80" />
                  <span className="text-[11px] font-semibold text-white">Victor&apos;s AirPods</span>
                  <span className="text-[9px] text-emerald-400">Connected</span>
                </div>

                <div className="h-8 w-[1px] bg-white/10" />

                <div className="flex items-center gap-4 text-[11px]">
                  <div className="flex flex-col items-center">
                    <span className="text-white/50 text-[10px]">Left</span>
                    <span className="font-mono text-emerald-400">100%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white/50 text-[10px]">Right</span>
                    <span className="font-mono text-emerald-400">95%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white/50 text-[10px]">Case</span>
                    <span className="font-mono text-emerald-400">88%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
