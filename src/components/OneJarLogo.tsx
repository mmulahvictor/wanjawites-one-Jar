import React from 'react';

interface OneJarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const OneJarLogo: React.FC<OneJarLogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeMap = {
    sm: 'h-9 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg 
        viewBox="0 0 320 180" 
        className={`${sizeMap[size]} transition-transform duration-300 hover:scale-105`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="One-Jar Poetry Official Logo"
      >
        <defs>
          <linearGradient id="redBrush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="tealQuill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="inkSplash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>

        {/* Outer Red Expressive Brush Ring */}
        <path 
          d="M 120 28 C 65 25, 25 65, 28 120 C 31 165, 80 178, 125 170 C 160 163, 178 135, 170 100 C 165 75, 145 60, 120 62 C 95 64, 75 80, 72 105 C 70 125, 85 142, 110 142" 
          stroke="url(#redBrush)" 
          strokeWidth="14" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path 
          d="M 115 32 C 60 30, 32 70, 34 115 C 36 150, 75 168, 118 162" 
          stroke="#B91C1C" 
          strokeWidth="5" 
          strokeLinecap="round" 
          opacity="0.75"
        />

        {/* Teal Splash Backing */}
        <path 
          d="M 75 105 C 65 95, 60 115, 68 125 C 72 132, 60 142, 75 145 C 88 148, 85 130, 95 135 C 105 140, 110 120, 95 110 C 85 102, 85 115, 75 105 Z" 
          fill="url(#inkSplash)" 
          opacity="0.85"
        />
        <circle cx="62" cy="100" r="4" fill="#06B6D4" />
        <circle cx="68" cy="148" r="3" fill="#0D9488" />

        {/* Ink Pot / Jar Base */}
        <path 
          d="M 210 125 L 250 125 C 255 125, 265 140, 260 160 C 256 172, 204 172, 200 160 C 195 140, 205 125, 210 125 Z" 
          stroke="#06B6D4" 
          strokeWidth="6" 
          fill="none" 
          strokeLinejoin="round"
        />
        <rect x="210" y="145" width="40" height="15" rx="4" fill="#06B6D4" opacity="0.9" />

        {/* Feather Quill */}
        <path 
          d="M 140 32 C 160 38, 195 65, 235 130 C 220 100, 200 70, 168 50 C 185 58, 205 85, 222 110 Z" 
          fill="url(#tealQuill)"
        />
        <path 
          d="M 140 32 C 168 45, 195 72, 230 135" 
          stroke="#0D9488" 
          strokeWidth="4" 
          strokeLinecap="round"
        />

        {/* Red Sparkles */}
        <path d="M 270 75 L 273 82 L 280 85 L 273 88 L 270 95 L 267 88 L 260 85 L 267 82 Z" fill="#EF4444" />
        <path d="M 282 72 L 284 76 L 288 78 L 284 80 L 282 84 L 280 80 L 276 78 L 280 76 Z" fill="#EF4444" />

        {/* Brand Text inside Logo SVG */}
        <text 
          x="100" 
          y="104" 
          fontFamily="serif" 
          fontWeight="900" 
          fontSize="34" 
          fill="#DC2626"
          fontStyle="italic"
        >
          One-Jar
        </text>
        <text 
          x="125" 
          y="136" 
          fontFamily="serif" 
          fontWeight="700" 
          fontSize="24" 
          fill="#0F172A"
          letterSpacing="1"
        >
          Poetry
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-black tracking-tight text-slate-900 text-lg leading-tight flex items-center gap-1">
            WanjaWrites <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-sans font-bold">× One-Jar</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Faith Wanja • Poet & Cultural Documentarian
          </span>
        </div>
      )}
    </div>
  );
};
