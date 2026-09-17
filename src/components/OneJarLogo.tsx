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
          <linearGradient id="brandRedBrush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C83C2E" />
            <stop offset="100%" stopColor="#A82A1D" />
          </linearGradient>
          <linearGradient id="brandBlueQuill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D84C2" />
            <stop offset="50%" stopColor="#3A6EA5" />
            <stop offset="100%" stopColor="#2A527D" />
          </linearGradient>
          <linearGradient id="brandOrangeSplash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F29E65" />
            <stop offset="100%" stopColor="#E88D4D" />
          </linearGradient>
        </defs>

        {/* Outer Red Expressive Brush Ring */}
        <path 
          d="M 120 28 C 65 25, 25 65, 28 120 C 31 165, 80 178, 125 170 C 160 163, 178 135, 170 100 C 165 75, 145 60, 120 62 C 95 64, 75 80, 72 105 C 70 125, 85 142, 110 142" 
          stroke="url(#brandRedBrush)" 
          strokeWidth="14" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path 
          d="M 115 32 C 60 30, 32 70, 34 115 C 36 150, 75 168, 118 162" 
          stroke="#A82A1D" 
          strokeWidth="4" 
          strokeLinecap="round" 
          opacity="0.8"
        />

        {/* Terracotta / Orange Ink Splash Backing */}
        <path 
          d="M 75 105 C 65 95, 60 115, 68 125 C 72 132, 60 142, 75 145 C 88 148, 85 130, 95 135 C 105 140, 110 120, 95 110 C 85 102, 85 115, 75 105 Z" 
          fill="url(#brandOrangeSplash)" 
          opacity="0.85"
        />
        <circle cx="62" cy="100" r="4" fill="#E88D4D" />
        <circle cx="68" cy="148" r="3" fill="#C83C2E" />

        {/* Ink Pot / Jar Base in Brand Blue */}
        <path 
          d="M 210 125 L 250 125 C 255 125, 265 140, 260 160 C 256 172, 204 172, 200 160 C 195 140, 205 125, 210 125 Z" 
          stroke="#3A6EA5" 
          strokeWidth="6" 
          fill="none" 
          strokeLinejoin="round"
        />
        <rect x="210" y="145" width="40" height="15" rx="4" fill="#3A6EA5" opacity="0.95" />

        {/* Feather Quill */}
        <path 
          d="M 140 32 C 160 38, 195 65, 235 130 C 220 100, 200 70, 168 50 C 185 58, 205 85, 222 110 Z" 
          fill="url(#brandBlueQuill)"
        />
        <path 
          d="M 140 32 C 168 45, 195 72, 230 135" 
          stroke="#2A527D" 
          strokeWidth="4" 
          strokeLinecap="round"
        />

        {/* Red & Orange Sparkles */}
        <path d="M 270 75 L 273 82 L 280 85 L 273 88 L 270 95 L 267 88 L 260 85 L 267 82 Z" fill="#C83C2E" />
        <path d="M 282 72 L 284 76 L 288 78 L 284 80 L 282 84 L 280 80 L 276 78 L 280 76 Z" fill="#E88D4D" />

        {/* Brand Text inside Logo SVG */}
        <text 
          x="100" 
          y="104" 
          fontFamily="serif" 
          fontWeight="900" 
          fontSize="34" 
          fill="#C83C2E"
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
          fill="#1A1A1A"
          letterSpacing="1"
        >
          Poetry
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-black tracking-tight text-[#1A1A1A] text-lg leading-tight flex items-center gap-1.5">
            WanjaWrites <span className="text-xs px-2 py-0.5 rounded-full bg-[#C83C2E]/10 text-[#C83C2E] border border-[#C83C2E]/20 font-sans font-bold">× One-Jar</span>
          </span>
          <span className="text-[11px] text-[#1A1A1A]/60 font-medium">
            Faith Wanja • Poet & Cultural Documentarian
          </span>
        </div>
      )}
    </div>
  );
};
