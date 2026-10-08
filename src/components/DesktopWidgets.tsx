import React, { useState, useEffect } from 'react';
import pantheonImg from '../assets/images/widget_pantheon_1791425670957.jpg';

interface AnalogClockProps {
  city: string;
  sublabel: string;
  offsetHours: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ city, sublabel, offsetHours }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute timezone time based on UTC
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  // Let base be aligned to California (UTC-7/8) or relative offset
  const cityTime = new Date(utc + 3600000 * offsetHours);

  const seconds = cityTime.getSeconds();
  const minutes = cityTime.getMinutes();
  const hours = cityTime.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const offsetStr = offsetHours >= 0 ? `+${offsetHours}HRS` : `${offsetHours}HRS`;

  return (
    <div className="flex flex-col items-center select-none text-white">
      {/* Clock Face */}
      <div className="relative w-14 h-14 rounded-full bg-white/10 border border-white/25 shadow-inner flex items-center justify-center mb-1.5 backdrop-blur-sm">
        {/* Hour markers */}
        <div className="absolute top-1 w-0.5 h-1.5 bg-white/60 rounded-full" />
        <div className="absolute bottom-1 w-0.5 h-1.5 bg-white/60 rounded-full" />
        <div className="absolute left-1 w-1.5 h-0.5 bg-white/60 rounded-full" />
        <div className="absolute right-1 w-1.5 h-0.5 bg-white/60 rounded-full" />

        {/* Hour Hand */}
        <div
          className="absolute w-1 h-3.5 bg-white rounded-full origin-bottom shadow-sm"
          style={{
            bottom: '50%',
            transform: `rotate(${hourDeg}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-0.5 h-5 bg-white/90 rounded-full origin-bottom shadow-sm"
          style={{
            bottom: '50%',
            transform: `rotate(${minuteDeg}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Second Hand */}
        <div
          className="absolute w-[1px] h-5.5 bg-amber-400 rounded-full origin-bottom"
          style={{
            bottom: '50%',
            transform: `rotate(${secondDeg}deg)`
          }}
        />

        {/* Center Pivot */}
        <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full z-10 shadow" />
      </div>

      {/* City & info matching screenshot */}
      <span className="text-[11px] font-semibold tracking-tight text-white/90 leading-tight">
        {city}
      </span>
      <span className="text-[10px] text-white/70 leading-tight">
        {sublabel}
      </span>
      <span className="text-[9px] text-white/50 tracking-wider font-mono leading-tight">
        {offsetStr}
      </span>
    </div>
  );
};

interface DesktopWidgetsProps {
  isEditing?: boolean;
  onDoneEditing?: () => void;
}

export const DesktopWidgets: React.FC<DesktopWidgetsProps> = ({ isEditing = false, onDoneEditing }) => {
  return (
    <div className="absolute top-12 left-6 z-10 flex flex-col gap-3 select-none pointer-events-auto">
      {isEditing && (
        <div className="flex items-center justify-between pb-1">
          <span className="text-[12px] font-semibold text-white/90 drop-shadow">Edit Widgets</span>
          <button
            onClick={onDoneEditing}
            className="px-3 py-0.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium shadow"
          >
            Done
          </button>
        </div>
      )}

      {/* Top row: Calendar Widget and Photo Widget */}
      <div className={`flex items-center gap-3 ${isEditing ? 'animate-wiggle' : ''}`}>
        {/* Calendar Widget */}
        <div className="relative w-[160px] h-[160px] rounded-[24px] bg-slate-900/40 backdrop-blur-3xl border border-white/20 p-3.5 flex flex-col justify-between shadow-2xl hover:bg-slate-900/45 transition-colors mac-specular-glass">
          {isEditing && (
            <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-700/90 text-white flex items-center justify-center text-[10px] font-bold border border-white/30 shadow">
              −
            </div>
          )}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">
              September
            </div>
            {/* Day initials */}
            <div className="grid grid-cols-7 text-center text-[9px] font-medium text-white/50 mb-1">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
            {/* Days grid matching screenshot */}
            <div className="grid grid-cols-7 text-center text-[10px] font-normal text-white/80 gap-y-0.5">
              <span className="text-white/20"></span>
              <span className="text-white/20"></span>
              <span className="text-white/20"></span>
              <span className="text-white/20"></span>
              <span>1</span>
              <span>2</span>
              <span>3</span>

              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>

              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              {/* Day 16 highlighted circle matching screenshot */}
              <span className="relative flex items-center justify-center font-bold text-white">
                <span className="absolute inset-0 m-auto w-4.5 h-4.5 bg-blue-500 rounded-full -z-10 shadow-sm" />
                16
              </span>
              <span>17</span>

              <span>18</span>
              <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>

              <span>25</span>
              <span>26</span>
              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
            </div>
          </div>
        </div>

        {/* Photo Widget - Neoclassical Architecture */}
        <div className="w-[160px] h-[160px] rounded-[24px] overflow-hidden bg-slate-900/30 backdrop-blur-2xl border border-white/20 shadow-2xl relative group">
          <img
            src={pantheonImg}
            alt="Architecture Widget"
            className="w-full h-full object-cover object-center filter saturate-90 contrast-105 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* World Clock Widget underneath */}
      <div className="w-[332px] rounded-[24px] bg-slate-900/35 backdrop-blur-2xl border border-white/20 p-3.5 shadow-2xl hover:bg-slate-900/40 transition-colors">
        <div className="grid grid-cols-4 gap-2">
          <AnalogClock city="Cupertino" sublabel="Today" offsetHours={-8} />
          <AnalogClock city="Tokyo" sublabel="Today" offsetHours={8} />
          <AnalogClock city="Sydney" sublabel="Today" offsetHours={9} />
          <AnalogClock city="Paris" sublabel="Today" offsetHours={1} />
        </div>
      </div>
    </div>
  );
};
