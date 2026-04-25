import React from 'react';

export const PlanetGlyph = ({ name, size = 18, className = "", style = {} }) => {
  const glyphs = {
    sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
    jupiter: 'jupiter_custom', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇',
    node: '☊', south_node: '☋', lilith: '⚸', chiron: 'chiron_custom'
  };

  const char = glyphs[(name || '').toLowerCase()] || '?';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {char === 'jupiter_custom' ? (
        <g transform="translate(12, 12)">
          <path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ) : char === 'chiron_custom' ? (
        <g transform="translate(12, 12)">
          <circle cx="0" cy="5" r="3.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path d="M0,1.5 L0,-8 M0,-3 L5,-8 M0,-3 L5,2" 
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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

  const char = emojis[(name || '').toLowerCase()] || '✨';

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
