import React, { useState } from 'react';
import { X, ShieldCheck, Download, Layers, Activity, Compass, Wind, Award } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { getDignity } from '../utils/astroDignities';
import TransitNatalAspectGrid from './TransitNatalAspectGrid';
import TriangularAspectGrid from './TriangularAspectGrid';
import TimeMachine from './TimeMachine';
import * as luxon from 'luxon';
const { DateTime } = luxon;

const getHouse = (lng, cusps) => {
  if (!cusps || cusps.length < 12) return '?';
  for (let i = 0; i < 12; i++) {
    const next = (i + 1) % 12;
    let start = cusps[i];
    let end = cusps[next];
    if (end < start) end += 360;
    let l = lng;
    if (l < start) l += 360;
    if (l >= start && l < end) return i + 1;
  }
  return 1;
};

const TransitLaboratory = ({ chartData, transitData, onClose, activePlanets, activeAspects, onTimeChange, showTimeMachine, onToggleTimeMachine }) => {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  if (!chartData || !transitData) return null;

  const natalHouseCusps = chartData?.houses?.cusps?.map(c => c.longitude);

  const handleHover = (e, content) => {
    const tooltipWidth = 220;
    const tooltipHeight = 100;
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    if (x + tooltipWidth > window.innerWidth) x = e.clientX - tooltipWidth - 10;
    if (y + tooltipHeight > window.innerHeight) y = e.clientY - tooltipHeight - 10;

    setTooltip({ show: true, text: content, x, y });
  };

  const handleLeave = () => {
    setTooltip({ ...tooltip, show: false });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F1E9DE] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
      {/* TOOLTIP: MIDNIGHT LUXE STYLE */}
      {tooltip.show && (
        <div 
          className="fixed z-[10000] pointer-events-none bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-3 min-w-[180px] animate-in zoom-in-95 duration-200"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-serif italic text-[#8C8883] text-[10px] mb-0.5 border-b border-[#C9BEB1]/30 pb-0.5">Aspekt</p>
          <p className="font-mono text-xs text-[#1F2226] font-bold tracking-tight">
            {tooltip.text}
          </p>
        </div>
      )}

      {/* 1. PROFESSIONAL HEADER */}
      <header className="px-6 py-2 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <Layers size={16} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-lg tracking-tight leading-none">Transit Laboratory</h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mt-1">
              Subject: {chartData?.input?.name || 'Michał Krupiński'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
              <span className="text-[8px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest">Time Machine</span>
              <button 
                onClick={(e) => { e.preventDefault(); onToggleTimeMachine?.(); }}
                className={`w-8 h-4 rounded-full relative transition-all duration-300 ${
                  showTimeMachine ? 'bg-[#D4AF37]' : 'bg-white/10'
                }`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-[#1F2226] rounded-full transition-all duration-300 ${
                  showTimeMachine ? 'left-4.5' : 'left-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-[#D4AF37]" />
              <span className="text-[8px] font-mono text-white/80 font-bold uppercase tracking-widest">Precision J2000</span>
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

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F1E9DE]">
        
        {/* TEMPORAL CONTROL BAR (Integrated) */}
        {showTimeMachine && (
          <div className="w-full bg-[#1F2226] border-b border-[#D4AF37]/20 py-6 px-8 flex justify-center animate-in slide-in-from-top duration-500">
            <TimeMachine 
              baseDate={chartData?.input?.date || DateTime.now().toISO()}
              isActive={true}
              onDateChange={onTimeChange}
            />
          </div>
        )}

        <div className="max-w-[1400px] mx-auto p-8 space-y-16 pb-20">
          
          {/* SECTION A: THE BI-WHEEL (CENTERPIECE) */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[750px] aspect-square relative bg-white/30 rounded-full shadow-[0_0_80px_rgba(0,0,0,0.05)] border border-[#C9BEB1]/30">
              <ZodiacWheel 
                visible={true} 
                chartData={chartData} 
                transitData={transitData}
                activePlanets={activePlanets}
                activeAspects={activeAspects}
              />
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#166534] bg-[#166534]/5 border border-[#166534]/20 px-4 py-1.5 rounded-full">
              <Activity size={12} />
              <p className="text-[8px] font-bold uppercase tracking-widest italic">Ad Astra Active</p>
            </div>
          </div>

          {/* SECTION B: LOGICAL DATA LAYERS (PDF STYLE) */}
          <div className="grid grid-cols-1 gap-12">
            
            {/* LAYER 1: NATAL DATA & ASPECTS */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-l-4 border-[#1F2226] pl-4">
                  <h2 className="font-serif italic text-xl text-[#1F2226]">1. Natal Layer</h2>
                  <span className="text-[9px] font-mono text-[#8C8883] uppercase tracking-widest">Birth Data Sheet</span>
               </div>
               
               <div className="space-y-4">
                  {/* MATRIX TOP */}
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
                             <th className="px-4 py-1.5 text-center">House</th>
                             <th className="px-4 py-1.5">Speed</th>
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
                                     <ZodiacGlyph name={p.sign.toLowerCase()} className="w-2.5 h-2.5 text-[#1F2226]" />
                                     <span className="font-bold">{p.degreeInSign.split(' ').slice(0, 2).join(' ')}</span>
                                   </div>
                                 </td>
                                 <td className="px-4 py-1 text-center text-[#1F2226] font-bold text-sm">{p.house}</td>
                                 <td className="px-4 py-1 text-[#1F2226]">{p.speed?.toFixed(3) || '0.000'}°</td>
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
                  
                  {/* TRIANGLE BELOW */}
                  <TriangularAspectGrid 
                    planets={chartData?.planets} 
                    title="Natal Aspects [Internal Reference]" 
                    colorClass="text-[#1F2226]"
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
               </div>
            </div>

            {/* LAYER 2: TRANSIT DATA & ASPECTS */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 border-l-4 border-[#166534] pl-4">
                  <h2 className="font-serif italic text-xl text-[#166534]">2. Transit Layer</h2>
                  <span className="text-[9px] font-mono text-[#8C8883] uppercase tracking-widest">Active Influence Layer</span>
               </div>
               
               <div className="space-y-4">
                  {/* MATRIX TOP */}
                  <div className="bg-white border border-[#C9BEB1] rounded shadow-sm overflow-hidden">
                     <div className="bg-[#F1E9DE] px-3 py-1.5 border-b border-[#C9BEB1]">
                        <h3 className="text-[9px] font-bold text-[#1F2226] uppercase tracking-widest">Transit Positions [Matrix]</h3>
                     </div>
                     <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                         <thead>
                           <tr className="border-b border-[#C9BEB1] bg-[#FBF7F1] text-[9px] font-bold text-[#8C8883] uppercase tracking-wider">
                             <th className="px-4 py-1.5">Planet</th>
                             <th className="px-4 py-1.5">Longitude</th>
                             <th className="px-4 py-1.5 text-center">nat.h</th>
                             <th className="px-4 py-1.5">Speed</th>
                             <th className="px-4 py-1.5">Declination</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-[#C9BEB1]/10 font-mono text-[11px]">
                           {transitData?.planets?.map(p => (
                             <tr key={`lab-tr-${p.key}`} className="hover:bg-[#166534]/5 transition-colors">
                               <td className="px-4 py-1 flex items-center gap-2">
                                 <PlanetGlyph name={p.key} className="w-3.5 h-3.5 text-[#166534]" />
                                 <span className="text-[#166534] font-bold text-xs">{t(p.name)}</span>
                               </td>
                               <td className="px-4 py-1 text-[#166534]">
                                 <div className="flex items-center gap-1">
                                   <ZodiacGlyph name={p.sign.toLowerCase()} className="w-2.5 h-2.5 text-[#166534]" />
                                   <span className="font-bold">{p.degreeInSign.split(' ').slice(0, 2).join(' ')}</span>
                                   {p.speed < 0 && <span className="text-red-600 font-bold ml-1">R</span>}
                                 </div>
                               </td>
                               <td className="px-4 py-1 text-center text-[#1F2226] font-bold text-sm">
                                  {getHouse(p.longitude, natalHouseCusps)}
                               </td>
                               <td className="px-4 py-1 text-[#1F2226]">{p.speed?.toFixed(3) || '0.000'}°</td>
                               <td className="px-4 py-1 text-[#8C8883] font-bold text-[10px]">{p.declFormatted}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                  </div>
                  
                  {/* TRIANGLE BELOW */}
                  <TriangularAspectGrid 
                    planets={transitData?.planets} 
                    title="Transit Aspects [Sky Weather]" 
                    colorClass="text-[#166534]"
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
               </div>
            </div>

            {/* LAYER 3: COMPARISON (NATAL-TRANSIT) */}
            <div className="space-y-6">
               <div className="flex items-center gap-4 border-l-8 border-[#D4AF37] pl-6">
                  <h2 className="font-serif italic text-2xl text-[#D4AF37]">3. Interactive Layer</h2>
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase tracking-widest font-bold">Natal - Transit Synastry</span>
               </div>
               
               <TransitNatalAspectGrid 
                  natalPlanets={chartData?.planets}
                  transitPlanets={transitData?.planets}
                  houses={chartData?.houses}
                  onHover={handleHover}
                  onLeave={handleLeave}
                />
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default TransitLaboratory;
