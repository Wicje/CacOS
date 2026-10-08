import React, { useState, useEffect } from 'react';
import { ArrowRight, Power, RefreshCw, Moon } from 'lucide-react';
import { sounds } from '../utils/sound';

interface LockScreenProps {
  isLocked: boolean;
  onUnlock: () => void;
  wallpaperUrl: string;
}

export const LockScreen: React.FC<LockScreenProps> = ({ isLocked, onUnlock, wallpaperUrl }) => {
  const [password, setPassword] = useState('');
  const [timeStr, setTimeStr] = useState('09:43');
  const [dateStr, setDateStr] = useState('Tuesday, September 16');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isLocked) return null;

  const handleUnlock = () => {
    sounds.playUnlock();
    onUnlock();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between items-center py-12 select-none overflow-hidden animate-fadeIn"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm pointer-events-none" />

      {/* Top Large Clock (macOS Sequoia lock screen style) */}
      <div className="relative z-10 flex flex-col items-center text-white mt-8">
        <h1 className="text-[104px] font-extralight tracking-tight leading-none drop-shadow-lg font-sans">
          {timeStr}
        </h1>
        <p className="text-[20px] font-medium tracking-tight text-white/90 drop-shadow-md mt-1">
          {dateStr}
        </p>
      </div>

      {/* Center User Profile and Password Input */}
      <div className="relative z-10 flex flex-col items-center">
        {/* User Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-0.5 shadow-2xl mb-3 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-2xl border-2 border-white/20">
            V
          </div>
        </div>

        <h3 className="text-[17px] font-semibold text-white drop-shadow mb-3">
          Victor
        </h3>

        {/* Password Pill Input */}
        <div className="relative w-52 h-9 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center px-3 shadow-xl mac-specular-glass">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Touch ID or Enter Password"
            className="w-full bg-transparent text-white text-[12px] placeholder-white/50 outline-none pr-6"
          />
          <button
            onClick={handleUnlock}
            className="w-6 h-6 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition-colors"
          >
            <ArrowRight size={13} />
          </button>
        </div>

        <span className="text-[11px] text-white/60 mt-2">
          Press Return or Click Arrow to Unlock
        </span>
      </div>

      {/* Bottom Power Controls */}
      <div className="relative z-10 flex items-center gap-8 text-white/70">
        <button
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1 hover:text-white transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/15">
            <Moon size={15} />
          </div>
          <span className="text-[10px]">Sleep</span>
        </button>

        <button
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1 hover:text-white transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/15">
            <RefreshCw size={15} />
          </div>
          <span className="text-[10px]">Restart</span>
        </button>

        <button
          onClick={() => sounds.playClick()}
          className="flex flex-col items-center gap-1 hover:text-white transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/15">
            <Power size={15} />
          </div>
          <span className="text-[10px]">Shut Down</span>
        </button>
      </div>
    </div>
  );
};
