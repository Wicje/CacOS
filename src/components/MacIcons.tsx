import React from 'react';

interface IconProps {
  size?: number | string;
  className?: string;
}

export const FinderIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E90FF" />
        <stop offset="100%" stopColor="#0B5ED7" />
      </linearGradient>
      <linearGradient id="finderFaceLeft" x1="0" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
      <linearGradient id="finderFaceRight" x1="50" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9BD4F5" />
        <stop offset="100%" stopColor="#3CA8FF" />
      </linearGradient>
      <filter id="macDropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#finderBg)" filter="url(#macDropShadow)" />
    <path d="M5 25C5 13.9543 13.9543 5 25 5H50V95H25C13.9543 95 5 86.0457 5 75V25Z" fill="url(#finderFaceLeft)" />
    <path d="M50 5H75C86.0457 5 95 13.9543 95 25V75C95 86.0457 86.0457 95 75 95H50V5Z" fill="url(#finderFaceRight)" />
    {/* Eyes */}
    <circle cx="34" cy="40" r="4.5" fill="#0D2E5C" />
    <circle cx="66" cy="40" r="4.5" fill="#0D2E5C" />
    {/* Nose curve */}
    <path d="M50 35V53C50 56 46 58 43 57" stroke="#0D2E5C" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Smiling mouth */}
    <path d="M30 63C38 74 62 74 70 63" stroke="#0D2E5C" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

export const AppStoreIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="appstoreGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2A9AF3" />
        <stop offset="100%" stopColor="#0B63DE" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#appstoreGrad)" />
    {/* The iconic triangular stick assembly */}
    <path d="M36 28L64 74" stroke="white" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
    <path d="M64 28L36 74" stroke="white" strokeWidth="9" strokeLinecap="round" />
    <path d="M26 62H74" stroke="white" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

export const AppsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#E8ECEF" />
    <rect width="84" height="84" x="8" y="8" rx="18" fill="#F4F5F7" />
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="16" height="16" rx="4" fill="#34C759" />
      <rect x="22" y="0" width="16" height="16" rx="4" fill="#FF9500" />
      <rect x="44" y="0" width="16" height="16" rx="4" fill="#007AFF" />
      <rect x="0" y="22" width="16" height="16" rx="4" fill="#AF52DE" />
      <rect x="22" y="22" width="16" height="16" rx="4" fill="#FF2D55" />
      <rect x="44" y="22" width="16" height="16" rx="4" fill="#5856D6" />
      <rect x="0" y="44" width="16" height="16" rx="4" fill="#5AC8FA" />
      <rect x="22" y="44" width="16" height="16" rx="4" fill="#FFCC00" />
      <rect x="44" y="44" width="16" height="16" rx="4" fill="#8E8E93" />
    </g>
  </svg>
);

export const AutomatorIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#758296" />
    <rect width="86" height="86" x="7" y="7" rx="19" fill="#94A3B8" />
    {/* Pipe wrench / robot head */}
    <rect x="30" y="25" width="40" height="36" rx="6" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
    <circle cx="40" cy="38" r="4" fill="#3B82F6" />
    <circle cx="60" cy="38" r="4" fill="#3B82F6" />
    <line x1="38" y1="52" x2="62" y2="52" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    {/* Antenna */}
    <line x1="50" y1="25" x2="50" y2="16" stroke="#475569" strokeWidth="3" />
    <circle cx="50" cy="15" r="3.5" fill="#EF4444" />
    {/* Pipe in mouth */}
    <path d="M56 52C65 52 70 58 72 66" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const BooksIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="booksGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA438" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#booksGrad)" />
    <path
      d="M26 34C34 32 46 34 50 38C54 34 66 32 74 34V66C66 64 54 66 50 70C46 66 34 64 26 66V34Z"
      fill="white"
      fillRule="evenodd"
    />
    <line x1="50" y1="38" x2="50" y2="70" stroke="#FF8A00" strokeWidth="2.5" />
  </svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#2C2C2E" />
    {/* LCD screen */}
    <rect x="18" y="18" width="64" height="18" rx="4" fill="#3A3A3C" />
    <text x="76" y="32" fill="white" fontSize="12" fontFamily="monospace" textAnchor="end" fontWeight="bold">0</text>
    {/* Keypad */}
    <circle cx="30" cy="48" r="7" fill="#636366" />
    <circle cx="50" cy="48" r="7" fill="#636366" />
    <circle cx="70" cy="48" r="7" fill="#FF9F0A" />
    <circle cx="30" cy="66" r="7" fill="#636366" />
    <circle cx="50" cy="66" r="7" fill="#636366" />
    <circle cx="70" cy="66" r="7" fill="#FF9F0A" />
    {/* Plus and equals */}
    <text x="70" y="52" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
    <text x="70" y="70" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">=</text>
  </svg>
);

export const CalendarIcon: React.FC<IconProps & { day?: number; weekday?: string }> = ({
  size = 64,
  className = '',
  day = 16,
  weekday = 'TUE'
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    <path d="M5 25C5 13.9543 13.9543 5 25 5H75C86.0457 5 95 13.9543 95 25V30H5V25Z" fill="#FF3B30" />
    <text x="50" y="23" fill="white" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">
      {weekday}
    </text>
    <text x="50" y="72" fill="#1C1C1E" fontSize="38" fontWeight="300" textAnchor="middle" fontFamily="system-ui, sans-serif">
      {day}
    </text>
  </svg>
);

export const ChessIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#D2B48C" />
    <rect width="82" height="82" x="9" y="9" rx="16" fill="#8B5A2B" />
    {/* Board checker tiles */}
    <rect x="9" y="9" width="41" height="41" fill="#F5DEB3" />
    <rect x="50" y="50" width="41" height="41" fill="#F5DEB3" />
    {/* Knight piece silhouette */}
    <path
      d="M38 72H62C62 68 58 64 56 61C61 58 64 51 62 43C60 36 54 30 45 28C43 32 38 35 34 38C32 40 34 46 39 46C36 50 35 56 36 62C34 65 34 68 38 72Z"
      fill="#222"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <circle cx="48" cy="38" r="2" fill="white" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#000000" />
    <circle cx="50" cy="50" r="41" fill="#FFFFFF" />
    {/* Ticks */}
    <circle cx="50" cy="15" r="1.5" fill="#8E8E93" />
    <circle cx="85" cy="50" r="1.5" fill="#8E8E93" />
    <circle cx="50" cy="85" r="1.5" fill="#8E8E93" />
    <circle cx="15" cy="50" r="1.5" fill="#8E8E93" />
    {/* Hour hand */}
    <line x1="50" y1="50" x2="38" y2="35" stroke="#1C1C1E" strokeWidth="3.5" strokeLinecap="round" />
    {/* Minute hand */}
    <line x1="50" y1="50" x2="68" y2="32" stroke="#1C1C1E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Second hand */}
    <line x1="50" y1="55" x2="50" y2="20" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#FF9500" />
  </svg>
);

export const ContactsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#999999" />
    <rect width="78" height="86" x="7" y="7" rx="17" fill="#B0B0B0" />
    {/* Index tabs */}
    <rect x="80" y="20" width="8" height="12" rx="2" fill="#E57373" />
    <rect x="80" y="36" width="8" height="12" rx="2" fill="#81C784" />
    <rect x="80" y="52" width="8" height="12" rx="2" fill="#64B5F6" />
    {/* Profile silhouette */}
    <circle cx="45" cy="40" r="13" fill="#FFFFFF" />
    <path d="M25 70C25 58 35 56 45 56C55 56 65 58 65 70H25Z" fill="#FFFFFF" />
  </svg>
);

export const DictionaryIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#9B1C1C" />
    <rect width="86" height="86" x="7" y="7" rx="19" fill="#B91C1C" />
    <text x="50" y="62" fill="#FFF5E5" fontSize="42" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">
      Aa
    </text>
  </svg>
);

export const FaceTimeIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="facetimeGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3CD657" />
        <stop offset="100%" stopColor="#2BB845" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#facetimeGrad)" />
    <rect x="22" y="32" width="34" height="36" rx="8" fill="white" />
    <path d="M56 42L76 30V70L56 58V42Z" fill="white" />
  </svg>
);

export const FindMyIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="findMyGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="50%" stopColor="#30D158" />
        <stop offset="100%" stopColor="#30D158" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="white" stroke="#E5E5EA" strokeWidth="1" />
    {/* Radar rings */}
    <circle cx="50" cy="50" r="36" stroke="#30D158" strokeWidth="3" opacity="0.4" />
    <circle cx="50" cy="50" r="24" stroke="#30D158" strokeWidth="3" opacity="0.6" />
    <circle cx="50" cy="50" r="12" fill="url(#findMyGrad)" />
    {/* Blue locator dot */}
    <circle cx="50" cy="50" r="6" fill="#007AFF" />
  </svg>
);

export const FontBookIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#E5E5EA" />
    <rect width="84" height="84" x="8" y="8" rx="18" fill="#F2F2F7" />
    <text x="50" y="65" fill="#636366" fontSize="52" fontFamily="Times New Roman, serif" fontWeight="500" textAnchor="middle">
      a
    </text>
  </svg>
);

export const FreeformIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    <path
      d="M24 58C28 42 42 28 54 35C66 42 44 68 56 70C68 72 76 56 76 46"
      stroke="#00C7BE"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 36C58 40 54 52 64 54C72 56 76 48 76 46"
      stroke="#FF9500"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

export const GamesIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="gamesGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF453A" />
        <stop offset="100%" stopColor="#D70015" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#gamesGrad)" />
    {/* Rocket */}
    <g transform="translate(18, 18) rotate(45 32 32)">
      <path d="M32 10C24 16 22 28 22 42H42C42 28 40 16 32 10Z" fill="white" />
      <circle cx="32" cy="28" r="4.5" fill="#FF3B30" />
      <path d="M22 36L14 44V48L22 46V36Z" fill="#F2F2F7" />
      <path d="M42 36L50 44V48L42 46V36Z" fill="#F2F2F7" />
      {/* Flame */}
      <path d="M26 44L32 54L38 44Z" fill="#FFD60A" />
    </g>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="homeGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF9F0A" />
        <stop offset="100%" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#homeGrad)" />
    <path d="M50 24L24 45V72H42V56H58V72H76V45L50 24Z" fill="white" />
  </svg>
);

export const ImageCaptureIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#2C2C2E" />
    <rect x="22" y="24" width="56" height="42" rx="6" fill="#1C1C1E" stroke="#8E8E93" strokeWidth="2" />
    {/* Rainbow color bars inside screen */}
    <rect x="26" y="28" width="9" height="34" fill="#FF3B30" />
    <rect x="35" y="28" width="9" height="34" fill="#FF9500" />
    <rect x="44" y="28" width="9" height="34" fill="#FFCC00" />
    <rect x="53" y="28" width="9" height="34" fill="#34C759" />
    <rect x="62" y="28" width="9" height="34" fill="#007AFF" />
    <rect x="71" y="28" width="3" height="34" fill="#AF52DE" />
    {/* Stand */}
    <rect x="45" y="66" width="10" height="10" fill="#636366" />
    <rect x="36" y="76" width="28" height="4" rx="2" fill="#636366" />
  </svg>
);

export const IPhoneMirroringIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="phoneMirrorGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4A5568" />
        <stop offset="100%" stopColor="#1A202C" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#E2E8F0" />
    {/* Phone frame */}
    <rect x="30" y="16" width="40" height="68" rx="10" fill="url(#phoneMirrorGrad)" stroke="#718096" strokeWidth="2" />
    {/* Dynamic island */}
    <rect x="44" y="21" width="12" height="3.5" rx="1.75" fill="#000000" />
    {/* Blue wallpaper glow */}
    <rect x="33" y="27" width="34" height="52" rx="4" fill="#3B82F6" opacity="0.8" />
  </svg>
);

export const JournalIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="journalGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2D1537" />
        <stop offset="100%" stopColor="#140819" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#journalGrad)" />
    {/* Iridescent butterfly bookmark */}
    <path
      d="M50 25C44 32 30 35 28 48C26 60 40 68 50 75C60 68 74 60 72 48C70 35 56 32 50 25Z"
      fill="#D946EF"
      opacity="0.85"
    />
    <path
      d="M50 32C46 38 35 40 33 50C31 58 42 64 50 70C58 64 69 58 67 50C65 40 54 38 50 32Z"
      fill="#38BDF8"
      opacity="0.9"
    />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="mailGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#mailGrad)" />
    <rect x="20" y="30" width="60" height="42" rx="6" fill="white" />
    <path d="M22 32L50 54L78 32" stroke="#5AC8FA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MapsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="mapBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A8DADC" />
        <stop offset="100%" stopColor="#E9D8A6" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#mapBg)" />
    {/* Highways */}
    <path d="M5 45Q50 30 95 65" stroke="#FFFFFF" strokeWidth="12" />
    <path d="M5 45Q50 30 95 65" stroke="#F4A261" strokeWidth="6" />
    <path d="M45 5Q52 50 60 95" stroke="#FFFFFF" strokeWidth="8" />
    {/* Pin indicator */}
    <circle cx="58" cy="40" r="12" fill="#007AFF" />
    <polygon points="58,56 52,48 64,48" fill="#007AFF" />
    <circle cx="58" cy="40" r="5" fill="white" />
  </svg>
);

export const MessagesIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34C759" />
        <stop offset="100%" stopColor="#248A3D" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#msgGrad)" />
    {/* Speech bubble */}
    <path
      d="M26 48C26 36 37 26 50 26C63 26 74 36 74 48C74 60 63 70 50 70C46 70 41 69 37 67L24 71L27 60C26 56 26 52 26 48Z"
      fill="white"
    />
  </svg>
);

export const MissionControlIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#1C1C1E" />
    {/* Window spaces tiles */}
    <rect x="20" y="24" width="26" height="20" rx="3" fill="#8E8E93" />
    <rect x="54" y="24" width="26" height="20" rx="3" fill="#8E8E93" />
    <rect x="30" y="52" width="40" height="26" rx="4" fill="#007AFF" />
  </svg>
);

export const MusicIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="musicGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FC3D39" />
        <stop offset="100%" stopColor="#FA233B" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#musicGrad)" />
    {/* Note */}
    <path
      d="M62 25V55C60 54 57 53 54 53C47 53 42 57 42 62C42 67 47 71 54 71C60 71 65 67 65 62V35L42 41V60C40 59 37 58 34 58C27 58 22 62 22 67C22 72 27 76 34 76C40 76 45 72 45 67V32L62 25Z"
      fill="white"
    />
  </svg>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFBEA" stroke="#E5E5EA" strokeWidth="1" />
    {/* Yellow pad header */}
    <path d="M5 25C5 13.9543 13.9543 5 25 5H75C86.0457 5 95 13.9543 95 25V30H5V25Z" fill="#FACC15" />
    {/* Horizontal lines */}
    <line x1="16" y1="42" x2="84" y2="42" stroke="#E5E7EB" strokeWidth="2" />
    <line x1="16" y1="54" x2="84" y2="54" stroke="#E5E7EB" strokeWidth="2" />
    <line x1="16" y1="66" x2="84" y2="66" stroke="#E5E7EB" strokeWidth="2" />
    <line x1="16" y1="78" x2="84" y2="78" stroke="#E5E7EB" strokeWidth="2" />
  </svg>
);

export const PasswordsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#2C2C2E" />
    {/* Keyring with colorful keys */}
    <circle cx="50" cy="40" r="14" stroke="#E5E5EA" strokeWidth="4" />
    <path d="M42 48L32 75H40L42 70L46 72L50 64L48 50" fill="#FFCC00" />
    <path d="M56 48L64 76H56L54 70L50 72L48 64L52 50" fill="#00C7BE" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34C759" />
        <stop offset="100%" stopColor="#248A3D" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#phoneGrad)" />
    {/* Phone handset */}
    <path
      d="M34 26C32 26 30 27 28 29C25 32 23 37 25 43C29 55 45 71 57 75C63 77 68 75 71 72C73 70 74 68 74 66C74 63 68 57 65 56C62 55 60 56 58 58C55 56 50 51 48 48C50 46 51 44 50 41C49 38 43 32 40 32C38 32 36 26 34 26Z"
      fill="white"
    />
  </svg>
);

export const PhotoBoothIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="pbGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#pbGrad)" />
    {/* Curtain draped photo strip */}
    <path d="M15 15Q30 30 15 85" stroke="#991B1B" strokeWidth="6" />
    <path d="M85 15Q70 30 85 85" stroke="#991B1B" strokeWidth="6" />
    <rect x="32" y="20" width="36" height="60" rx="3" fill="#FFFFFF" />
    <rect x="36" y="24" width="28" height="16" fill="#3B82F6" />
    <rect x="36" y="44" width="28" height="16" fill="#10B981" />
    <rect x="36" y="64" width="28" height="12" fill="#F59E0B" />
  </svg>
);

export const SafariIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    <circle cx="50" cy="50" r="38" fill="#007AFF" />
    {/* Compass ticks */}
    <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="1" strokeDasharray="2 6" />
    {/* Compass Needle */}
    <g transform="rotate(45 50 50)">
      <polygon points="50,16 44,50 56,50" fill="#FF3B30" />
      <polygon points="50,84 44,50 56,50" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
    </g>
  </svg>
);

export const PhotosIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    <g transform="translate(50, 50)">
      {/* 8 colored petals */}
      <ellipse cx="0" cy="-22" rx="6" ry="14" fill="#FF2D55" />
      <ellipse cx="15.5" cy="-15.5" rx="6" ry="14" fill="#FF9500" transform="rotate(45)" />
      <ellipse cx="22" cy="0" rx="6" ry="14" fill="#FFCC00" transform="rotate(90)" />
      <ellipse cx="15.5" cy="15.5" rx="6" ry="14" fill="#34C759" transform="rotate(135)" />
      <ellipse cx="0" cy="22" rx="6" ry="14" fill="#5AC8FA" transform="rotate(180)" />
      <ellipse cx="-15.5" cy="15.5" rx="6" ry="14" fill="#007AFF" transform="rotate(225)" />
      <ellipse cx="-22" cy="0" rx="6" ry="14" fill="#5856D6" transform="rotate(270)" />
      <ellipse cx="-15.5" cy="-15.5" rx="6" ry="14" fill="#AF52DE" transform="rotate(315)" />
    </g>
  </svg>
);

export const RemindersIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    {/* 4 dots with checklist bars */}
    <circle cx="26" cy="30" r="5" fill="#007AFF" />
    <rect x="38" y="27" width="40" height="6" rx="3" fill="#C7C7CC" />
    <circle cx="26" cy="50" r="5" fill="#FF9500" />
    <rect x="38" y="47" width="40" height="6" rx="3" fill="#C7C7CC" />
    <circle cx="26" cy="70" r="5" fill="#FF2D55" />
    <rect x="38" y="67" width="40" height="6" rx="3" fill="#C7C7CC" />
  </svg>
);

export const TVIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#1C1C1E" />
    <text x="36" y="58" fill="white" fontSize="24" fontFamily="system-ui" fontWeight="bold"></text>
    <text x="56" y="58" fill="white" fontSize="24" fontFamily="system-ui" fontWeight="bold">tv</text>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="gearGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8E8E93" />
        <stop offset="100%" stopColor="#636366" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#E5E5EA" />
    <circle cx="50" cy="50" r="32" fill="url(#gearGrad)" />
    {/* Gear cogs */}
    <g transform="translate(50, 50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="-5"
          y="-37"
          width="10"
          height="8"
          rx="2"
          fill="#7C7C80"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="14" fill="#E5E5EA" />
    </g>
  </svg>
);

export const WeatherIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="weatherGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2A9AF3" />
        <stop offset="100%" stopColor="#64D2FF" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#weatherGrad)" />
    {/* Sun */}
    <circle cx="42" cy="42" r="16" fill="#FFCC00" />
    {/* Cloud */}
    <path
      d="M32 66C26 66 22 62 22 56C22 50 26 47 31 47C33 39 40 33 49 33C57 33 63 38 66 45C71 45 76 49 76 55C76 61 71 66 65 66H32Z"
      fill="white"
      opacity="0.95"
    />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="bulbGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFCC00" />
        <stop offset="100%" stopColor="#FF9500" />
      </linearGradient>
    </defs>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#bulbGrad)" />
    <circle cx="50" cy="42" r="18" fill="white" opacity="0.9" />
    <rect x="42" y="60" width="16" height="6" rx="2" fill="white" opacity="0.9" />
    <rect x="44" y="68" width="12" height="4" rx="2" fill="white" opacity="0.7" />
  </svg>
);

export const DownloadsIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="folderGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
    </defs>
    <path d="M12 28C12 24 16 20 20 20H42L48 28H80C84 28 88 32 88 36V76C88 80 84 84 80 84H20C16 84 12 80 12 76V28Z" fill="url(#folderGrad)" />
    <path d="M12 36C12 32 16 28 20 28H80C84 28 88 32 88 36V76C88 80 84 84 80 84H20C16 84 12 80 12 76V36Z" fill="#3CA8FF" />
    {/* Download arrow inside circular badge */}
    <circle cx="50" cy="56" r="16" fill="white" />
    <path d="M50 46V64M44 58L50 64L56 58" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    {/* Mesh cylinder basket filled with paper */}
    <ellipse cx="50" cy="24" rx="30" ry="8" fill="#999" opacity="0.5" />
    {/* Papers sticking out */}
    <polygon points="40,16 52,10 56,22 42,24" fill="#FAFAFA" stroke="#DDD" />
    <polygon points="46,14 62,12 60,26 48,22" fill="#EAEAEA" stroke="#CCC" />
    {/* Mesh body */}
    <path d="M22 24L30 84H70L78 24" fill="rgba(200,210,220,0.6)" stroke="#8E8E93" strokeWidth="2" />
    {/* Mesh grid lines */}
    <line x1="34" y1="26" x2="38" y2="84" stroke="#8E8E93" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="50" y1="26" x2="50" y2="84" stroke="#8E8E93" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="66" y1="26" x2="62" y2="84" stroke="#8E8E93" strokeWidth="1" strokeDasharray="3 3" />
    <ellipse cx="50" cy="84" rx="20" ry="5" fill="#8E8E93" />
  </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <rect width="90" height="90" x="5" y="5" rx="20" fill="#1E1E1E" stroke="#333" strokeWidth="1" />
    <text x="18" y="44" fill="#00FF66" fontSize="24" fontFamily="Courier, monospace" fontWeight="bold">&gt;_</text>
  </svg>
);

// Map of all application icons by id / iconType
export const AppIconRenderer: React.FC<{ iconType: string; size?: number; className?: string }> = ({
  iconType,
  size = 56,
  className = ''
}) => {
  switch (iconType) {
    case 'appstore':
      return <AppStoreIcon size={size} className={className} />;
    case 'apps':
      return <AppsIcon size={size} className={className} />;
    case 'automator':
      return <AutomatorIcon size={size} className={className} />;
    case 'books':
      return <BooksIcon size={size} className={className} />;
    case 'calculator':
      return <CalculatorIcon size={size} className={className} />;
    case 'calendar':
      return <CalendarIcon size={size} className={className} />;
    case 'chess':
      return <ChessIcon size={size} className={className} />;
    case 'clock':
      return <ClockIcon size={size} className={className} />;
    case 'contacts':
      return <ContactsIcon size={size} className={className} />;
    case 'dictionary':
      return <DictionaryIcon size={size} className={className} />;
    case 'facetime':
      return <FaceTimeIcon size={size} className={className} />;
    case 'findmy':
      return <FindMyIcon size={size} className={className} />;
    case 'fontbook':
      return <FontBookIcon size={size} className={className} />;
    case 'freeform':
      return <FreeformIcon size={size} className={className} />;
    case 'games':
      return <GamesIcon size={size} className={className} />;
    case 'home':
      return <HomeIcon size={size} className={className} />;
    case 'imagecapture':
      return <ImageCaptureIcon size={size} className={className} />;
    case 'iphonemirroring':
      return <IPhoneMirroringIcon size={size} className={className} />;
    case 'journal':
      return <JournalIcon size={size} className={className} />;
    case 'mail':
      return <MailIcon size={size} className={className} />;
    case 'maps':
      return <MapsIcon size={size} className={className} />;
    case 'messages':
      return <MessagesIcon size={size} className={className} />;
    case 'missioncontrol':
      return <MissionControlIcon size={size} className={className} />;
    case 'music':
      return <MusicIcon size={size} className={className} />;
    case 'notes':
      return <NotesIcon size={size} className={className} />;
    case 'passwords':
      return <PasswordsIcon size={size} className={className} />;
    case 'phone':
      return <PhoneIcon size={size} className={className} />;
    case 'photobooth':
      return <PhotoBoothIcon size={size} className={className} />;
    case 'finder':
      return <FinderIcon size={size} className={className} />;
    case 'safari':
      return <SafariIcon size={size} className={className} />;
    case 'photos':
      return <PhotosIcon size={size} className={className} />;
    case 'reminders':
      return <RemindersIcon size={size} className={className} />;
    case 'tv':
      return <TVIcon size={size} className={className} />;
    case 'settings':
      return <SettingsIcon size={size} className={className} />;
    case 'weather':
      return <WeatherIcon size={size} className={className} />;
    case 'lightbulb':
      return <LightBulbIcon size={size} className={className} />;
    case 'downloads':
      return <DownloadsIcon size={size} className={className} />;
    case 'trash':
      return <TrashIcon size={size} className={className} />;
    case 'terminal':
      return <TerminalIcon size={size} className={className} />;
    default:
      return <FinderIcon size={size} className={className} />;
  }
};
