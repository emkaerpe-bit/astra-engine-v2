import React from 'react';

export const PlanetGlyph = ({ name, size = 18, className = "" }) => {
  const glyphs = {
    sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
    jupiter: 'jupiter_custom', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇',
    node: '☊', lilith: '⚸', chiron: '⚷'
  };

  const char = glyphs[name.toLowerCase()] || '?';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {char === 'jupiter_custom' ? (
        <g transform="translate(4, 4) scale(1.1)">
          <path d="M2,3 C2,0 7,0 7,3 C7,6 2,6 2,9 L14,9 M11,4 L11,16"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ) : (
        <text x="12" y="14" textAnchor="middle" dominantBaseline="central"
          fontSize="18" fill="currentColor" fontFamily="serif" fontWeight="bold">
          {char}
        </text>
      )}
    </svg>
  );
};

export const ZodiacGlyph = ({ name, size = 14, className = "" }) => {
  const emojis = {
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
    leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
    sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
  };

  const char = emojis[name.toLowerCase()] || '✨';

  // Emoji alignment fix: Emojis often have a different baseline. 
  // We use a larger font size and slightly lower Y to center them perfectly.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="12" y="15" textAnchor="middle" dominantBaseline="central"
        fontSize={size * 1.5} fill="currentColor" fontFamily="sans-serif">
        {char}
      </text>
    </svg>
  );
};
