import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { calculateAspect } from '../utils/aspectEngine';

const TriangularAspectGrid = ({ planets, title, colorClass = "text-[#1F2226]", onHover, onLeave }) => {
  if (!planets) return null;

  // Standard set of planets for the grid (Sun to Chiron + Nodes + Lilith)
  const gridPlanets = planets; 

  const getAspect = (p1, p2) => {
    if (p1.key === p2.key) return null;
    return calculateAspect(p1, p2);
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
