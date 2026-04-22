import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const TriangularAspectGrid = ({ planets, title, colorClass = "text-[#1F2226]", onHover, onLeave }) => {
  if (!planets) return null;

  // Standard set of planets for the grid (Sun to Pluto + Nodes + Chiron + AC/MC)
  const gridPlanets = planets.slice(0, 13); 

  const getAspect = (p1, p2) => {
    if (!p1 || !p2 || !p1.longitude || !p2.longitude || p1.key === p2.key) return null;
    const DEFS = [
      { name: 'Koniunkcja', symbol: '☌', angle: 0, orb: 8, color: 'text-orange-500' },
      { name: 'Sekstyl', symbol: '⚹', angle: 60, orb: 6, color: 'text-blue-600' },
      { name: 'Kwadratura', symbol: '□', angle: 90, orb: 7, color: 'text-red-600' },
      { name: 'Trygon', symbol: '△', angle: 120, orb: 8, color: 'text-green-600' },
      { name: 'Opozycja', symbol: '☍', angle: 180, orb: 8, color: 'text-purple-600' },
      { name: 'Kwinkunks', symbol: 'ℼ', angle: 150, orb: 2, color: 'text-gray-500' },
      { name: 'Półkwadratura', symbol: '∠', angle: 45, orb: 2, color: 'text-gray-400' },
    ];

    let diff = Math.abs(p1.longitude - p2.longitude);
    if (diff > 180) diff = 360 - diff;

    for (const asp of DEFS) {
      const orbDiff = diff - asp.angle;
      if (Math.abs(orbDiff) <= asp.orb) {
        // Calculate applying vs separating
        const v1 = p1.speed || 0;
        const v2 = p2.speed || 0;
        const relSpeed = v1 - v2;
        
        let dist = p2.longitude - p1.longitude;
        if (dist > 180) dist -= 360;
        if (dist < -180) dist += 360;
        
        const signedOrb = dist - (dist > 0 ? asp.angle : -asp.angle);
        const isApplying = relSpeed * signedOrb < 0;

        return { 
          ...asp, 
          orb: Math.abs(orbDiff), 
          isApplying 
        };
      }
    }
    return null;
  };

  return (
    <div className="bg-white border-y border-[#C9BEB1]/30 overflow-hidden w-full">
      <div className="bg-[#F1E9DE] px-4 py-1.5 border-b border-[#C9BEB1]/30">
        <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1F2226]">{title}</h3>
      </div>
      <div className="bg-white w-full">
        <div className="w-full">
          {gridPlanets.map((p1, rowIndex) => (
            <div key={`row-${p1.key}`} className="flex w-full h-8">
              {/* Row Header (Planet Glyph) */}
              <div className="flex-1 border-r border-b border-[#C9BEB1]/20 flex items-center justify-center bg-[#FBF7F1]">
                <PlanetGlyph name={p1.key} size={12} className={colorClass} />
              </div>
              
              {/* Cells */}
              {gridPlanets.map((p2, colIndex) => {
                const isDiagonal = colIndex === rowIndex;

                if (colIndex > rowIndex) {
                   return <div key={`empty-${colIndex}`} className="flex-1 border-r border-b border-[#C9BEB1]/5 bg-[#FBF7F1]/10" />;
                }

                if (isDiagonal) {
                  return (
                    <div key={`diag-${p1.key}`} className="flex-1 border-r border-b border-[#C9BEB1]/20 flex items-center justify-center bg-[#FBF7F1]">
                      <PlanetGlyph name={p1.key} size={12} className={colorClass} />
                    </div>
                  );
                }

                const aspect = getAspect(p1, p2);
                return (
                  <div 
                    key={`cell-${p1.key}-${p2.key}`} 
                    className="flex-1 border-r border-b border-[#C9BEB1]/10 flex flex-col items-center justify-center relative group hover:bg-[#D4AF37]/10 transition-colors cursor-help bg-white"
                    onMouseEnter={(e) => {
                      if (aspect) {
                        const typeLabel = aspect.isApplying ? 'aplikacyjny' : 'separacyjny';
                        onHover?.(e, `${t(p1.name || p1.key)} ${aspect.name} ${t(p2.name || p2.key)} (${aspect.orb.toFixed(1)}° - ${typeLabel})`);
                      }
                    }}
                    onMouseLeave={onLeave}
                  >
                    {aspect && (
                      <>
                        <span className={`${aspect.color} text-base leading-none font-bold`}>{aspect.symbol}</span>
                        <div className="absolute bottom-1 right-1.5 flex items-baseline gap-1">
                           <span className={`text-[8px] font-mono font-black uppercase ${aspect.isApplying ? 'text-green-700' : 'text-red-700'}`}>
                             {aspect.isApplying ? 'a' : 's'}
                           </span>
                           <span className="text-[8px] font-mono text-[#1F2226] font-bold">
                             {Math.floor(aspect.orb)}°
                           </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriangularAspectGrid;
