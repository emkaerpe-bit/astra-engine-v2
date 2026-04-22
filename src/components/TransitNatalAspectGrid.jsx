import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const TransitNatalAspectGrid = ({ natalPlanets, transitPlanets, houses, onHover, onLeave }) => {
  if (!natalPlanets || !transitPlanets) return null;

  const getAspect = (p1, p2) => {
    if (!p1 || !p2 || !p1.longitude || !p2.longitude) return null;
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
      if (Math.abs(diff - asp.angle) <= asp.orb) {
        const currentOrb = diff - asp.angle;
        const relSpeed = (p1.speed || 0); // Transit is moving
        const isApplying = (currentOrb > 0 && relSpeed < 0) || (currentOrb < 0 && relSpeed > 0);
        
        return { ...asp, orb: Math.abs(diff - asp.angle), isApplying };
      }
    }
    return null;
  };

  // Standard analytical points
  const natalPoints = [
    ...natalPlanets.slice(0, 10),
    { key: 'node', name: 'Węzeł Północny', longitude: natalPlanets.find(p => p.key === 'node')?.longitude },
    { key: 'chiron', name: 'Chiron', longitude: natalPlanets.find(p => p.key === 'chiron')?.longitude },
    { key: 'asc', name: 'Ascendent', longitude: houses?.ascendant?.longitude },
    { key: 'mc', name: 'Medium Coeli', longitude: houses?.midheaven?.longitude }
  ];

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
              <th className="w-16 h-12 border-b border-r border-[#C9BEB1]/30 sticky left-0 z-10 bg-[#FBF7F1]">
                 <span className="text-[8px] font-mono text-[#8C8883] uppercase rotate-[-45deg] block">T \ N</span>
              </th>
              {natalPoints.map(p => (
                <th key={`natal-h-${p.key}`} className="min-w-[60px] h-12 border-b border-[#C9BEB1]/30 px-2">
                  <div className="flex flex-col items-center gap-1">
                    <PlanetGlyph name={p.key} size={16} className="text-[#1F2226]" />
                    <span className="text-[8px] font-mono text-[#8C8883] uppercase font-bold">{p.key.substring(0,3)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9BEB1]/20">
            {transitPlanets.slice(0, 13).map(tp => (
              <tr key={`transit-row-${tp.key}`} className="hover:bg-[#166534]/5 transition-colors">
                <td className="w-16 h-12 border-r border-[#C9BEB1]/30 sticky left-0 z-10 bg-[#FBF7F1] flex items-center justify-center gap-2 pr-3">
                  <span className="text-[8px] font-mono text-[#166534] uppercase font-bold">{tp.key.substring(0,3)}</span>
                  <PlanetGlyph name={tp.key} size={16} className="text-[#166534]" />
                </td>
                {natalPoints.map(np => {
                  const aspect = getAspect(tp, np);
                  if (!aspect) return (
                    <td key={`cell-${tp.key}-${np.key}`} className="min-w-[60px] h-12 border-r border-[#C9BEB1]/10 bg-white/40"></td>
                  );

                  return (
                    <td 
                      key={`cell-${tp.key}-${np.key}`}
                      className="min-w-[60px] h-12 border-r border-[#C9BEB1]/10 bg-white hover:bg-[#D4AF37]/10 transition-all cursor-help text-center p-1 group"
                      onMouseEnter={(e) => {
                      const typeLabel = aspect.isApplying ? 'aplikacyjny' : 'separacyjny';
                      onHover?.(e, `Tranzytowy ${t(tp.name || tp.key)} ${aspect.name} Urodzeniowy ${t(np.name || np.key)} (${aspect.orb.toFixed(2)}° - ${typeLabel})`);
                    }}
                      onMouseLeave={onLeave}
                    >
                      <div className="flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform">
                        <span className={`${aspect.color} text-xl leading-none font-bold drop-shadow-sm`}>{aspect.symbol}</span>
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
