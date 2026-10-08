import React, { useState } from 'react';
import {
  Wifi,
  Bluetooth,
  Radio,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music2,
  Sliders,
  Layers,
  Copy,
  Calculator,
  Timer,
  Camera,
  Clock,
  CircleDot
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp?: (appId: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  isStageManagerEnabled?: boolean;
  onToggleStageManager?: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  isDarkMode = true,
  onToggleDarkMode,
  isStageManagerEnabled = false,
  onToggleStageManager
}) => {
  const [wifiOn, setWifiOn] = useState(false);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [airdropOn, setAirdropOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [stageManagerOn, setStageManagerOn] = useState(false);
  const [screenMirrorOn, setScreenMirrorOn] = useState(false);
  const [volume, setVolume] = useState(72);
  const [shazamActive, setShazamActive] = useState(false);

  if (!isOpen) return null;

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    sounds.playToggle(!current);
    setter(!current);
  };

  return (
    <div
      className="fixed top-8 right-3 z-50 w-[320px] rounded-3xl bg-slate-900/65 backdrop-blur-3xl border border-white/20 p-3 shadow-2xl text-white select-none transition-all duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Section: Connectivity (Left) and Now Playing (Right) */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        {/* Connectivity Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md p-2.5 flex flex-col justify-between border border-white/10">
          {/* Wi-Fi */}
          <div
            onClick={() => toggle(setWifiOn, wifiOn)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                wifiOn ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'
              }`}
            >
              <Wifi size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-medium leading-tight">Wi-Fi</span>
              <span className="text-[10px] text-white/60 leading-tight">
                {wifiOn ? 'Tahoe 5G' : 'Off'}
              </span>
            </div>
          </div>

          {/* Bluetooth */}
          <div
            onClick={() => toggle(setBluetoothOn, bluetoothOn)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                bluetoothOn ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'
              }`}
            >
              <Bluetooth size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-medium leading-tight">Bluetooth</span>
              <span className="text-[10px] text-white/60 leading-tight">
                {bluetoothOn ? 'On' : 'Off'}
              </span>
            </div>
          </div>

          {/* AirDrop */}
          <div
            onClick={() => toggle(setAirdropOn, airdropOn)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                airdropOn ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'
              }`}
            >
              <Radio size={14} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-medium leading-tight">AirDrop</span>
              <span className="text-[10px] text-white/60 leading-tight">
                {airdropOn ? 'Contacts Only' : 'Off'}
              </span>
            </div>
          </div>
        </div>

        {/* Now Playing Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md p-2.5 flex flex-col justify-between border border-white/10">
          <div className="flex gap-2.5 items-center">
            {/* Album art thumbnail */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center shadow-inner shrink-0">
              <Music2 size={18} className="text-white/80" />
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[12px] font-medium truncate">
                {isPlaying ? 'Lake Tahoe Echoes' : 'Not Playing'}
              </span>
              <span className="text-[10px] text-white/60 truncate">
                {isPlaying ? 'Apple Ambient' : 'Music'}
              </span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-3 pt-2 text-white/80">
            <button
              onClick={() => sounds.playClick()}
              className="p-1 hover:text-white transition-colors"
            >
              <SkipBack size={15} fill="currentColor" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="p-1 hover:text-white transition-colors"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
            <button
              onClick={() => sounds.playClick()}
              className="p-1 hover:text-white transition-colors"
            >
              <SkipForward size={15} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Focus & Display / Screen Mirroring */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        {/* Focus Card */}
        <div
          onClick={() => toggle(setFocusOn, focusOn)}
          className={`rounded-2xl p-2.5 flex items-center gap-2.5 border border-white/10 cursor-pointer transition-colors ${
            focusOn ? 'bg-indigo-600 text-white' : 'bg-white/10 hover:bg-white/15'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Moon size={14} fill={focusOn ? 'currentColor' : 'none'} />
          </div>
          <span className="text-[12px] font-medium">Focus</span>
        </div>

        {/* Stage Manager & Screen Mirroring split cards */}
        <div className="grid grid-cols-2 gap-2">
          <div
            onClick={() => {
              sounds.playToggle(!isStageManagerEnabled);
              onToggleStageManager?.();
            }}
            className={`rounded-2xl p-2 flex items-center justify-center border border-white/10 cursor-pointer transition-colors ${
              isStageManagerEnabled ? 'bg-white text-slate-900' : 'bg-white/10 hover:bg-white/15 text-white'
            }`}
            title="Stage Manager"
          >
            <Layers size={18} />
          </div>
          <div
            onClick={() => toggle(setScreenMirrorOn, screenMirrorOn)}
            className={`rounded-2xl p-2 flex items-center justify-center border border-white/10 cursor-pointer transition-colors ${
              screenMirrorOn ? 'bg-white text-slate-900' : 'bg-white/10 hover:bg-white/15 text-white'
            }`}
            title="Screen Mirroring"
          >
            <Copy size={18} />
          </div>
        </div>
      </div>

      {/* Sound Slider */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/10 mb-2.5">
        <div className="flex items-center justify-between text-[11px] font-medium text-white/80 mb-2">
          <span>Sound</span>
          <span className="text-white/50 text-[10px]">{volume}%</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 70)}
            className="text-white/70 hover:text-white"
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="relative flex-1 h-5 bg-black/40 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-white rounded-full transition-all duration-75"
              style={{ width: `${volume}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                sounds.playClick();
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Music Recognition / Shortcuts Row */}
      <div className="grid grid-cols-4 gap-2 mb-2.5">
        <div
          onClick={() => {
            sounds.playClick();
            setShazamActive(!shazamActive);
          }}
          className={`col-span-2 rounded-2xl p-2 flex items-center gap-2 border border-white/10 cursor-pointer transition-colors ${
            shazamActive ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/15'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Music2 size={13} />
          </div>
          <span className="text-[11px] font-medium truncate">Recognise Music</span>
        </div>

        <div
          onClick={() => {
            sounds.playClick();
            onOpenApp?.('calculator');
          }}
          className="rounded-2xl bg-white/10 hover:bg-white/15 p-2 flex items-center justify-center border border-white/10 cursor-pointer"
          title="Calculator"
        >
          <Calculator size={16} />
        </div>

        <div
          onClick={() => {
            sounds.playClick();
            onOpenApp?.('clock');
          }}
          className="rounded-2xl bg-white/10 hover:bg-white/15 p-2 flex items-center justify-center border border-white/10 cursor-pointer"
          title="Timer"
        >
          <Timer size={16} />
        </div>
      </div>

      {/* Grid of round toggle utilities */}
      <div className="grid grid-cols-4 gap-2.5 mb-3 px-1">
        {/* Dark / Light Mode */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleDarkMode?.();
          }}
          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
            isDarkMode
              ? 'bg-blue-600/80 border-blue-400/30 text-white'
              : 'bg-white/15 hover:bg-white/25 border-white/15 text-white/80'
          }`}
          title="Dark Mode"
        >
          <Moon size={16} />
        </button>

        {/* Camera / Photo Booth */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenApp?.('photobooth');
          }}
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white/80"
          title="Photo Booth"
        >
          <Camera size={16} />
        </button>

        {/* Stopwatch */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenApp?.('clock');
          }}
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white/80"
          title="Stopwatch"
        >
          <Clock size={16} />
        </button>

        {/* Screen Record */}
        <button
          onClick={() => {
            sounds.playClick();
          }}
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white/80"
          title="Screen Recording"
        >
          <CircleDot size={16} />
        </button>
      </div>

      {/* Edit Controls Button */}
      <div className="flex justify-center pt-1">
        <button
          onClick={() => sounds.playClick()}
          className="px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-medium text-white/80 transition-colors"
        >
          Edit Controls
        </button>
      </div>
    </div>
  );
};
