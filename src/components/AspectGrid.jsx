import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const AspectGrid = ({ planets, aspects, houses, activePlanets, activeAspects, onHover, onLeave }) => {
  if (!planets || !aspects || !houses) return null;

  // Professional point list: Major Planets + AC + MC
  const AC = { key: 'ac', name: 'Ascendant', symbol: 'AC', longitude: houses.cusps[0].longitude };
  const MC = { key: 'mc', name: 'Midheaven', symbol: 'MC', longitude: houses.cusps[9].longitude };
  
  const basePoints = [...planets.slice(0, 10), AC, MC];
  const gridPoints = basePoints.filter(p => p.key === 'ac' || p.key === 'mc' || activePlanets.has(p.key));

  // Professional Aspect Engine (calculates harmonics on-the-fly)
  const calculateAspect = (p1, p2) => {
    let diff = Math.abs(p1.longitude - p2.longitude);
    if (diff > 180) diff = 360 - diff;

    const allHarmonics = [
      { type: 'Conjunction', angle: 0, orb: 8, symbol: '☌' },
      { type: 'Opposition', angle: 180, orb: 8, symbol: '☍' },
      { type: 'Trine', angle: 120, orb: 8, symbol: '△' },
      { type: 'Square', angle: 90, orb: 8, symbol: '□' },
      { type: 'Sextile', angle: 60, orb: 6, symbol: '⚹' },
      { type: 'Semi-Sextile', angle: 30, orb: 2, symbol: '⚺' },
      { type: 'Quincunx', angle: 150, orb: 3, symbol: '⚼' },
      { type: 'Semi-Square', angle: 45, orb: 2, symbol: '∠' },
      { type: 'Sesquiquadrate', angle: 135, orb: 2, symbol: '⚵' },
      { type: 'Quintile', angle: 72, orb: 1.5, symbol: 'Q' },
      { type: 'Bi-Quintile', angle: 144, orb: 1.5, symbol: 'bQ' }
    ];

    const harmonics = allHarmonics.filter(h => !activeAspects || activeAspects.has(h.type));

    for (let h of harmonics) {
      const orb = Math.abs(diff - h.angle);
      if (orb <= h.orb) {
        return { type: h.type, orb: orb, symbol: h.symbol };
      }
    }
    return null;
  };

  return (
    <div className="bg-[#f8f5f0] border border-gold/20 p-0 rounded-lg shadow-sm overflow-hidden select-none">
    <div className="w-full">
      <div className="grid" style={{ 
        gridTemplateColumns: `repeat(${gridPoints.length + 1}, 1fr)`,
        width: 'fit-content'
      }}>
        {/* Empty top corner */}
        <div className="w-10 h-10"></div>
        
        {/* Top Header Row */}
        {gridPoints.map((p, i) => (
          <div key={`h-${p.key}`} className="w-10 h-10 flex items-center justify-center text-[11px] text-[#8b7355] font-bold font-mono border-b border-gold/10">
            {p.key === 'ac' || p.key === 'mc' ? p.symbol : <PlanetGlyph name={p.key} size={14} />}
          </div>
        ))}

        {/* Rows */}
        {gridPoints.map((p1, rowIndex) => (
          <React.Fragment key={p1.key}>
            {/* Left Header Column */}
            <div className="w-10 h-10 flex items-center justify-center text-[11px] text-[#8b7355] font-bold font-mono border-r border-gold/10 bg-gold/5">
              {p1.key === 'ac' || p1.key === 'mc' ? p1.symbol : <PlanetGlyph name={p1.key} size={14} />}
            </div>

            {/* Grid Cells */}
            {gridPoints.map((p2, colIndex) => {
              // Only show the lower triangle (like astro.com)
              if (colIndex >= rowIndex) return <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10"></div>;

              const aspect = calculateAspect(p1, p2);
              if (!aspect) return <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10 border-b border-r border-gold/5"></div>;

              const color = aspect.type === 'Trine' || aspect.type === 'Sextile' ? 'text-blue-700' : 
                            aspect.type === 'Square' || aspect.type === 'Opposition' ? 'text-red-700' : 
                            ['Quintile', 'Bi-Quintile'].includes(aspect.type) ? 'text-emerald-700' :
                            'text-[#b8860b]';

              return (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className="w-10 h-10 flex flex-col items-center justify-center border-b border-r border-gold/10 bg-white/50 group relative hover:bg-gold/10 transition-colors cursor-help"
                  onMouseEnter={(e) => onHover?.(e, `${t(p1.name)} ${t(aspect.type)} ${t(p2.name)} (${aspect.orb.toFixed(1)}°)`)}
                  onMouseLeave={onLeave}
                >
                  <span className={`${color} text-lg leading-none font-bold`}>{aspect.symbol}</span>
                  <span className="text-[9px] text-[#1a1a1a]/60 font-mono leading-none mt-0.5 font-bold">{Math.floor(aspect.orb)}°</span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AspectGrid;
