import React from 'react';
import { Link } from 'react-router-dom';

const EstiloLogo = ({ variant = 'dark', size = 'md', showTagline = true, className = '' }) => {
  // Variant: 'dark' (for light backgrounds - black logo), 'light' (for dark backgrounds - white logo)
  const isLight = variant === 'light';
  
  const textColor = isLight ? 'text-white' : 'text-ebony';
  const taglineColor = isLight ? 'text-white/75' : 'text-ebony/60';
  const mainColor = isLight ? '#FFFFFF' : '#1A1818';

  // Size mapping
  const dimensions = {
    xs: { icon: 28, text: 'text-xs', tagline: 'text-[7px]', spacing: 'tracking-[0.18em]', gap: 'gap-1.5' },
    sm: { icon: 32, text: 'text-sm', tagline: 'text-[7px]', spacing: 'tracking-[0.2em]', gap: 'gap-2' },
    md: { icon: 48, text: 'text-xl', tagline: 'text-[10px]', spacing: 'tracking-[0.3em]', gap: 'gap-3' },
    lg: { icon: 62, text: 'text-2xl', tagline: 'text-[11px]', spacing: 'tracking-[0.35em]', gap: 'gap-3' },
    xl: { icon: 84, text: 'text-3xl', tagline: 'text-xs', spacing: 'tracking-[0.4em]', gap: 'gap-3' }
  };

  const currentSize = dimensions[size] || dimensions.md;

  return (
    <Link to="/" className={`inline-flex items-center ${currentSize.gap} group focus:outline-none ${className}`}>
      {/* Emblem SVG — Pure Black & White Monochrome */}
      <div className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <svg 
          width={currentSize.icon} 
          height={currentSize.icon} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Ring */}
          <circle cx="50" cy="50" r="38" stroke={mainColor} strokeWidth="1.6" />
          
          {/* Top Left Leafy Botanical Branch extending out */}
          <path d="M 26 36 C 18 26 26 14 38 20 C 34 26 26 30 26 36 Z" stroke={mainColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 24 32 C 16 24 24 16 30 22" stroke={mainColor} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 30 24 C 26 14 36 10 38 18" stroke={mainColor} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 36 20 C 34 12 44 12 42 20" stroke={mainColor} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 20 34 C 14 30 18 22 24 28" stroke={mainColor} strokeWidth="1.3" strokeLinecap="round" />

          {/* Monogram 'E' */}
          <text 
            x="33" 
            y="60" 
            fontFamily="Cinzel, 'Cormorant Garamond', Georgia, serif" 
            fontSize="34" 
            fontWeight="500" 
            fill={mainColor}
          >
            E
          </text>

          {/* Monogram 'W' Calligraphic overlay extending outside circle */}
          <text 
            x="48" 
            y="64" 
            fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif" 
            fontSize="46" 
            fontStyle="italic"
            fontWeight="300"
            fill={mainColor}
          >
            W
          </text>

          {/* Bottom Right 3 Dots along outer curve */}
          <circle cx="68" cy="74" r="1.6" fill={mainColor} />
          <circle cx="74" cy="69" r="1.6" fill={mainColor} />
          <circle cx="79" cy="63" r="1.6" fill={mainColor} />
        </svg>
      </div>

      {/* Brand Text & Tagline — Monochrome */}
      <div className="flex flex-col">
        <span className={`font-brand-title font-bold ${currentSize.text} ${textColor} leading-tight ${currentSize.spacing} transition-colors group-hover:opacity-90`}>
          ESTILO WEAR
        </span>
        {showTagline && (
          <span className={`font-sans font-medium ${currentSize.tagline} ${taglineColor} tracking-[0.25em] uppercase mt-0.5`}>
            SLAY EVERY LOOK
          </span>
        )}
      </div>
    </Link>
  );
};

export default EstiloLogo;
