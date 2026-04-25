import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { calculateAspect } from '../utils/aspectEngine';

const TransitNatalAspectGrid = ({ natalPlanets, transitPlanets, houses, onHover, onLeave }) => {
  if (!natalPlanets || !transitPlanets) return null;

  // Use the centralized aspect engine
  const getAspect = (p1, p2) => calculateAspect(p1, p2);

  // Standard analytical points
  const natalPoints = [
    ...natalPlanets.slice(0, 10),
    { key: 'node', name: 'True Node', longitude: natalPlanets.find(p => p.key === 'node')?.longitude },
    { key: 'south_node', name: 'South Node', longitude: natalPlanets.find(p => p.key === 'south_node')?.longitude },
    { key: 'lilith', name: 'Lilith', longitude: natalPlanets.find(p => p.key === 'lilith')?.longitude },
    { key: 'chiron', name: 'Chiron', longitude: natalPlanets.find(p => p.key === 'chiron')?.longitude },
    { key: 'asc', name: 'Ascendant', longitude: houses?.ascendant?.longitude },
    { key: 'mc', name: 'Midheaven', longitude: houses?.midheaven?.longitude }
  ].filter(p => p.longitude !== undefined);

  return (
    <div className="bg-white border border-[#C9BEB1] rounded-lg shadow-sm overflow-hidden w-full">
      <div className="bg-[#F1E9DE] px-5 py-3 border-b border-[#C9BEB1] flex justify-between items-center">
         <h3 className="text-xs font-bold text-[#1F2226] uppercase tracking-[0.2em]">Interaktywna Macierz Aspektów [Natal - Tranzyty]</h3>
         <span className="text-[10px] font-mono text-[#8C8883] font-bold">Synastry Engine v2.0</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FBF7F1]">
              <th className="w-12 h-10 border-b border-r border-[#C9BEB1]/30 sticky left-0 z-10 bg-[#FBF7F1]">
                 <span className="text-[7px] font-mono text-[#8C8883] uppercase rotate-[-45deg] block">T \ N</span>
              </th>
              {natalPoints.map(p => (
                <th key={`natal-h-${p.key}`} className="min-w-[50px] h-10 border-b border-[#C9BEB1]/30 px-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <PlanetGlyph name={p.key} size={14} className="text-[#1F2226]" />
                    <span className="text-[7px] font-mono text-[#8C8883] uppercase font-bold">{p.key.substring(0,3)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9BEB1]/20">
            {transitPlanets.slice(0, 13).map(tp => (
              <tr key={`transit-row-${tp.key}`} className="hover:bg-[#166534]/5 transition-colors">
                <td className="w-12 h-10 border-r border-[#C9BEB1]/30 sticky left-0 z-10 bg-[#FBF7F1] flex items-center justify-center gap-1 pr-2">
                  <span className="text-[7px] font-mono text-[#166534] uppercase font-bold">{tp.key.substring(0,3)}</span>
                  <PlanetGlyph name={tp.key} size={14} className="text-[#166534]" />
                </td>
                {natalPoints.map(np => {
                  const aspect = getAspect(tp, np);
                  if (!aspect) return (
                    <td key={`cell-${tp.key}-${np.key}`} className="min-w-[60px] h-12 border-r border-[#C9BEB1]/10 bg-white/40"></td>
                  );

                  return (
                    <td 
                      key={`cell-${tp.key}-${np.key}`}
                      className="min-w-[50px] h-10 border-r border-[#C9BEB1]/10 bg-white hover:bg-[#D4AF37]/10 transition-all cursor-help text-center p-0.5 group"
                      onMouseEnter={(e) => {
                      const typeLabel = aspect.isApplying ? 'aplikacyjny' : 'separacyjny';
                      onHover?.(e, `Tranzytowy ${t(tp.name || tp.key)} ${aspect.name} Urodzeniowy ${t(np.name || np.key)} (${aspect.orb.toFixed(2)}° - ${typeLabel})`);
                    }}
                      onMouseLeave={onLeave}
                    >
                      <div className="flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform">
                        <span className={`${aspect.color} text-lg leading-none font-bold drop-shadow-sm`}>{aspect.symbol}</span>
                        <span className="text-[8px] font-mono text-[#1F2226] font-bold mt-1 opacity-70">
                          {Math.floor(aspect.orb)}°{String(Math.round((aspect.orb % 1) * 60)).padStart(2, '0')}
                          {aspect.isApplying ? 'a' : 's'}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransitNatalAspectGrid;
