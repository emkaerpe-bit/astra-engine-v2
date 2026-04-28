import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Download, Layers, Activity, Compass, Wind, Award, Clock } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { getDignity } from '../utils/astroDignities';
import TriangularAspectGrid from './TriangularAspectGrid';

const PrognosticLaboratory = ({ chartData, prognosticData, onClose, activePlanets, activeAspects, activePatterns }) => {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  const filteredPlanets = React.useMemo(() => {
    if (!prognosticData?.planets) return [];
    return prognosticData.planets.filter(p => !activePlanets || activePlanets.has(p.key));
  }, [prognosticData, activePlanets]);

  if (!chartData || !prognosticData) return null;

  const handleHover = (e, text) => {
    const tooltipWidth = 220;
    const tooltipHeight = 100;
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    if (x + tooltipWidth > window.innerWidth) x = e.clientX - tooltipWidth - 10;
    if (y + tooltipHeight > window.innerHeight) y = e.clientY - tooltipHeight - 10;

    setTooltip({ show: true, text, x, y });
  };

  const handleLeave = () => {
    setTooltip({ ...tooltip, show: false });
  };

  const progTypeLabel = prognosticData.type === 'secondary' ? 'Secondary Progressions' : 'Solar Arc Directions';

  return (
    <div className="fixed inset-0 z-[10000] bg-[#F1E9DE] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
      {/* TOOLTIP */}
      {tooltip.show && (
        <div 
          className="fixed z-[10001] pointer-events-none bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-3 min-w-[180px] animate-in zoom-in-95 duration-200"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-serif italic text-[#8C8883] text-[10px] mb-0.5 border-b border-[#C9BEB1]/30 pb-0.5">Aspekt</p>
          <p className="font-mono text-xs text-[#1F2226] font-bold tracking-tight">
            {tooltip.text}
          </p>
        </div>
      )}

      {/* HEADER */}
      <header className="px-6 py-2 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center">
            <Sparkles size={16} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-lg tracking-tight leading-none">Time Laboratory</h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#D97706] mt-1">
              Method: {progTypeLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-[#D97706]" />
              <span className="text-[8px] font-mono text-white/80 font-bold uppercase tracking-widest">Temporal Sync: J2000</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#F1E9DE]/20 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-[1400px] mx-auto space-y-16 pb-20">
          
          {/* SECTION A: THE BI-WHEEL */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[750px] aspect-square relative bg-white/30 rounded-full shadow-[0_0_80px_rgba(0,0,0,0.05)] border border-[#C9BEB1]/30">
              <ZodiacWheel 
                visible={true} 
                chartData={chartData} 
                prognosticData={prognosticData}
                activePlanets={activePlanets}
                activeAspects={activeAspects}
                activePatterns={activePatterns}
              />
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#D97706] bg-[#D97706]/5 border border-[#D97706]/20 px-4 py-1.5 rounded-full">
              <Activity size={12} />
              <p className="text-[8px] font-bold uppercase tracking-widest italic">Time Compression Active</p>
            </div>
          </div>

          {/* SECTION B: LOGICAL DATA LAYERS (PDF STYLE) */}
          <div className="grid grid-cols-1 gap-12">
            
            {/* LAYER 1: NATAL DATA */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-l-4 border-[#1F2226] pl-4">
                  <h2 className="font-serif italic text-xl text-[#1F2226]">1. Natal Layer</h2>
                  <span className="text-[9px] font-mono text-[#8C8883] uppercase tracking-widest">Birth Data Sheet</span>
               </div>
               
               <div className="bg-white border border-[#C9BEB1] rounded shadow-sm overflow-hidden">
                  <div className="bg-[#F1E9DE] px-3 py-1.5 border-b border-[#C9BEB1]">
                     <h3 className="text-[9px] font-bold text-[#1F2226] uppercase tracking-widest">Natal Positions [Matrix]</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#C9BEB1] bg-[#FBF7F1] text-[9px] font-bold text-[#8C8883] uppercase tracking-wider">
                          <th className="px-4 py-1.5">Planet</th>
                          <th className="px-4 py-1.5">Longitude</th>
                          <th className="px-4 py-1.5">House</th>
                          <th className="px-4 py-1.5 border-l border-[#C9BEB1]/30">Dignity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C9BEB1]/10 font-mono text-[11px]">
                        {chartData?.planets?.map(p => {
                          const dignity = getDignity(p.key, p.sign);
                          return (
                            <tr key={`lab-nt-${p.key}`} className="hover:bg-[#D4AF37]/5 transition-colors">
                              <td className="px-4 py-1 flex items-center gap-2">
                                <PlanetGlyph name={p.key} className="w-3.5 h-3.5 text-[#1F2226]" />
                                <span className="text-[#1F2226] font-bold text-xs">{t(p.name)}</span>
                              </td>
                              <td className="px-4 py-1 text-[#1F2226]">
                                <div className="flex items-center gap-1">
                                  <ZodiacGlyph name={p.sign.toLowerCase()} className="w-2.5 h-2.5" />
                                  <span className="font-bold">{p.degreeInSign.split(' ').slice(0, 2).join(' ')}</span>
                                </div>
                              </td>
                              <td className="px-4 py-1 text-[#1F2226] font-bold">{p.house}</td>
                              <td className={`px-4 py-1 border-l border-[#C9BEB1]/30 text-[8px] font-bold uppercase tracking-tight ${
                                dignity.score > 0 ? 'text-green-700' : 
                                dignity.score < 0 ? 'text-red-700' : 
                                'text-[#8C8883]'
                              }`}>
                                {dignity.label}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>

            {/* LAYER 2: PROGNOSTIC DATA */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-l-4 border-[#D97706] pl-4">
                  <h2 className="font-serif italic text-xl text-[#D97706]">2. Prognostic Layer ({progTypeLabel})</h2>
                  <span className="text-[9px] font-mono text-[#8C8883] uppercase tracking-widest">Calculated for {prognosticData.targetDate}</span>
               </div>
               
               <div className="bg-white border border-[#C9BEB1] rounded shadow-sm overflow-hidden">
                  <div className="bg-[#F1E9DE] px-3 py-1.5 border-b border-[#C9BEB1]">
                     <h3 className="text-[9px] font-bold text-[#1F2226] uppercase tracking-widest">Prognostic Matrix [Positions]</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#C9BEB1] bg-[#FBF7F1] text-[9px] font-bold text-[#8C8883] uppercase tracking-wider">
                          <th className="px-4 py-1.5">Planet</th>
                          <th className="px-4 py-1.5">Longitude</th>
                          <th className="px-4 py-1.5">Movement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C9BEB1]/10 font-mono text-[11px]">
                        {filteredPlanets?.map(p => (
                          <tr key={`lab-pr-${p.key}`} className="hover:bg-[#D97706]/5 transition-colors">
                            <td className="px-4 py-1 flex items-center gap-2">
                              <PlanetGlyph name={p.key} className="w-3.5 h-3.5 text-[#D97706]" />
                              <span className="text-[#1F2226] font-bold text-xs">{t(p.name)}</span>
                            </td>
                            <td className="px-4 py-1 text-[#1F2226]">
                               <div className="flex items-center gap-1">
                                  <ZodiacGlyph name={p.sign.toLowerCase()} className="w-2.5 h-2.5" />
                                  <span className="font-bold">{p.degreeInSign.split(' ').slice(0, 2).join(' ')}</span>
                               </div>
                            </td>
                            <td className="px-4 py-1 text-[#8C8883]">
                               {p.isRetrograde ? 'Retrograde' : 'Direct'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>

               <TriangularAspectGrid 
                  planets={filteredPlanets} 
                  title="Prognostic Aspects [Temporal Interference]" 
                  colorClass="text-[#D97706]"
                  onHover={handleHover}
                  onLeave={handleLeave}
                  patterns={prognosticData.patterns}
                  activePatterns={activePatterns}
                />
            </div>

            {/* NATAL COMPARISON PLACEHOLDER */}
            <div className="p-12 border-2 border-dashed border-[#C9BEB1]/50 rounded-2xl flex flex-col items-center justify-center text-center">
               <Layers className="text-[#C9BEB1] mb-4" size={48} />
               <h3 className="font-serif italic text-2xl text-[#1F2226]">Natal Comparison Matrix</h3>
               <p className="text-[#8C8883] text-sm max-w-md mt-2 font-serif italic">
                 Analiza aspektów między planetami progresywnymi a horoskopem urodzeniowym jest w trakcie kalibracji J2000.
               </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PrognosticLaboratory;
