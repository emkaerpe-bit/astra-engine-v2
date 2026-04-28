import React from 'react';

export const PlanetGlyph = ({ name, size = 18, className = "", style = {} }) => {
  const glyphs = {
    sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
    jupiter: 'jupiter_custom', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇',
    node: '☊', south_node: '☋', lilith: '⚸', chiron: 'chiron_custom',
    cupido: 'cupido_custom', hades: 'hades_custom', zeus: 'zeus_custom',
    kronos: 'kronos_custom', apollon: 'apollon_custom', admetos: 'admetos_custom',
    vulkanus: 'vulkanus_custom', poseidon: 'poseidon_custom', ap: '♈'
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
      ) : char === 'cupido_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <circle cx="0" cy="2" r="5" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path d="M-5,-4 L5,-4 M0,-4 L0,-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'hades_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <path d="M-6,-4 A6,6 0 0 0 6,-4 M0,-4 L0,6 M-3,6 L3,6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M-3,0 L3,0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'zeus_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <path d="M0,8 L0,-4 M-4,0 L4,0 M0,-4 L5,-8 M0,-4 L-5,-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'kronos_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <path d="M-4,-4 L4,-4 M0,-4 L0,8 M-2,2 L2,2 M-2,5 L2,5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-4,-8 L4,-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'apollon_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path d="M-3,-3 L3,3 M3,-3 L-3,3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'admetos_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <rect x="-6" y="-6" width="12" height="12" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path d="M0,-6 L0,6 M-6,0 L6,0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'vulkanus_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <path d="M-6,6 L6,6 M0,6 L0,-6 M-4,-6 L4,-6 M-4,-2 L4,-2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-2,-10 L2,-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : char === 'poseidon_custom' ? (
        <g transform="translate(12, 12) scale(0.8)">
          <path d="M-5,-4 A5,5 0 0 0 5,-4 M0,-4 L0,8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M-3,0 L3,0 M-3,4 L3,4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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
