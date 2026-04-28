import React, { useState, useEffect } from 'react';
import ZodiacWheel from './ZodiacWheel';
import { ArrowLeft, Heart, Zap, Shield, Moon, GitMerge, Users, Star, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3005' : '');

export default function DualDashboard({ 
  chartData, 
  secondChartData, 
  onBack,
  activePlanets,
  activeAspects
}) {
  const [viewMode, setViewMode] = useState('synastry'); // synastry, composite, davison
  const [relationalData, setRelationalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!chartData || !secondChartData) return null;

  const handleModeChange = async (mode) => {
    if (mode === 'synastry') {
      setViewMode('synastry');
      setRelationalData(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/relational`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chart1: chartData,
          chart2: secondChartData,
          type: mode
        })
      });
      const data = await response.json();
      setRelationalData(data);
      setViewMode(mode);
    } catch (err) {
      console.error("Relational analysis failed:", err);
      alert("Błąd analizy: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const displayChart = (viewMode === 'synastry') ? chartData : relationalData;

  return (
    <div className="min-h-screen bg-[#F1E9DE] flex flex-col font-sans text-[#1F2226] animate-in fade-in duration-700">
      {/* MINIMAL LUXE HEADER */}
      <header className="px-8 py-4 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shadow-2xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft size={14} /> Powrót
          </button>
          
          {/* MODE SWITCHER */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 ml-4">
            {[
              { id: 'synastry', label: 'Synastria', icon: <GitMerge size={12}/> },
              { id: 'composite', label: 'Composite', icon: <Users size={12}/> },
              { id: 'davison', label: 'Davison', icon: <Star size={12}/> }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                  viewMode === m.id 
                  ? 'bg-[#D4AF37] text-black shadow-lg' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {isLoading && viewMode !== m.id ? <Loader2 size={10} className="animate-spin" /> : m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] opacity-60">Partner A</div>
            <div className="font-serif italic text-lg">{chartData.input.name || 'Osoba A'}</div>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/5">
            <Heart size={16} className={`text-[#D4AF37] ${viewMode === 'synastry' ? 'animate-pulse' : ''}`} />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#3B82F6] opacity-60">Partner B</div>
            <div className="font-serif italic text-lg">{secondChartData.input.name || 'Osoba B'}</div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-[#F1E9DE]/80 z-40 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
            <Loader2 size={48} className="text-[#D4AF37] animate-spin" />
            <div className="font-serif italic text-xl tracking-widest">Generowanie pola relacji...</div>
          </div>
        )}

        <div className="max-w-[1800px] mx-auto space-y-12">
          
          {/* MAIN VIEW AREA - STACKED FOR MAXIMUM SCALE */}
          <div className={`flex flex-col items-center justify-center gap-12 w-full ${viewMode === 'synastry' ? 'max-w-[1400px]' : 'max-w-[1200px]'}`}>
            
            {/* WHEEL DISPLAY AREA */}
            <div className="w-full relative transition-all duration-700">
               {viewMode === 'synastry' ? (
                 <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                   {/* Partner A */}
                   <div className="w-full max-w-[650px] aspect-square relative bg-white/40 rounded-full shadow-2xl border border-[#C9BEB1]/30 p-10 group hover:border-[#D4AF37]/40 transition-all duration-500">
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-[#1F2226] font-bold opacity-60">PARTNER A</div>
                     <ZodiacWheel 
                       visible={true}
                       chartData={chartData}
                       activePlanets={activePlanets}
                       activeAspects={activeAspects}
                     />
                   </div>
                   
                   {/* Partner B */}
                   <div className="w-full max-w-[650px] aspect-square relative bg-white/40 rounded-full shadow-2xl border border-[#C9BEB1]/30 p-10 group hover:border-[#D4AF37]/40 transition-all duration-500">
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-[#3B82F6] font-bold opacity-60">PARTNER B</div>
                     <ZodiacWheel 
                       visible={true}
                       chartData={secondChartData}
                       activePlanets={activePlanets}
                       activeAspects={activeAspects}
                     />
                   </div>
                 </div>
               ) : relationalData && (
                 <div className="w-full max-w-[900px] mx-auto aspect-square relative bg-white/40 rounded-full shadow-2xl border border-[#C9BEB1]/30 p-10 transition-all duration-700 scale-105">
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[12px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                     {viewMode === 'composite' ? 'POLE COMPOSITE: TRZECIA ENCJA' : 'HOROSKOP DAVISONA: EWOLUCJA RELACJI'}
                   </div>
                   <ZodiacWheel 
                     visible={true}
                     chartData={relationalData}
                     activePlanets={activePlanets}
                     activeAspects={activeAspects}
                   />
                 </div>
               )}
            </div>

            {/* RELATIONAL INTELLIGENCE PANELS - MOVED BELOW KOLA */}
            <div className={`flex flex-col ${viewMode === 'synastry' ? 'md:flex-row' : ''} gap-8 w-full justify-center`}>
               <div className="bg-[#1F2226] text-[#F1E9DE] p-8 rounded-[2.5rem] shadow-2xl border border-[#D4AF37]/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#D4AF37]/10 transition-all duration-1000"></div>
                  
                  <h3 className="font-serif italic text-3xl mb-6 text-[#D4AF37] flex items-center gap-3">
                    {viewMode === 'synastry' ? 'Interakcja' : viewMode === 'composite' ? 'Synteza' : 'Przeznaczenie'}
                  </h3>

                  {displayChart?.interpretation?.finalVerdict && (
                    <div className="mb-8 p-4 bg-white/5 border-l-2 border-[#D4AF37] text-[12px] font-serif italic text-[#F1E9DE]/90 leading-relaxed animate-in slide-in-from-left duration-700">
                      "{displayChart.interpretation.finalVerdict}"
                    </div>
                  )}
                  
                  <div className="space-y-5">
                     <div className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                           <Zap size={16} className="text-[#D4AF37]" />
                           <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Potencjał Harmonii</div>
                        </div>
                        <div className="text-xl font-serif italic text-[#D4AF37]">
                          {(displayChart?.aspects?.filter(a => a.weight > 0.8).length * 10 + 40) || 75}%
                        </div>
                     </div>
                     <div className="w-full h-[1px] bg-white/10"></div>
                     
                     <div className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                           <Shield size={16} className="text-[#D4AF37]" />
                           <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Wsparcie Karmiczne</div>
                        </div>
                        <div className="text-[11px] font-bold text-white uppercase tracking-widest">
                          {displayChart?.interpretation?.karma?.length > 0 ? 'WYKRYTO (FATED)' : 'Standardowe'}
                        </div>
                     </div>
                     <div className="w-full h-[1px] bg-white/10"></div>

                     <div className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                           <Moon size={16} className="text-[#D4AF37]" />
                           <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Rezonans Emocjonalny</div>
                        </div>
                        <div className="text-[11px] font-bold text-white uppercase tracking-widest">
                          {displayChart?.aspects?.some(a => a.type === 'Conjunction' && (a.planet1.key === 'moon' || a.planet2.key === 'moon')) ? 'GŁĘBOKA WIĘŹ' : 'Harmonijny'}
                        </div>
                     </div>
                  </div>
                  
                  <button className="w-full mt-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#AA8B2E] text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#D4AF37]/10">
                    Analiza Zaawansowana
                  </button>
               </div>

               {/* KARMIC LINKS PANEL */}
               {displayChart?.interpretation?.karma?.length > 0 && (
                 <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6 rounded-[2.5rem] animate-in slide-in-from-right duration-500">
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4 flex items-center gap-2">
                       <Star size={12} /> Znaleziono punkty przeznaczenia
                    </div>
                    <div className="space-y-4">
                       {displayChart.interpretation.karma.map((k, i) => (
                         <div key={i} className="space-y-1">
                            <div className="text-[11px] font-black text-[#1F2226] uppercase">{k.involvedPlanet} ⚺ {k.type}</div>
                            <div className="text-[10px] leading-relaxed opacity-70 italic">{k.description}</div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {/* KEY ASPECTS LIST (Weighted) */}
               <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-[#C9BEB1]/40 shadow-xl max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-6 text-center border-b border-[#C9BEB1]/20 pb-3">Dominujące Połączenia</div>
                  <div className="space-y-3">
                     {(displayChart?.aspects || [])
                       .sort((a, b) => (a.orb || 0) - (b.orb || 0))
                       .slice(0, 12)
                       .map((asp, idx) => (
                        <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl border transition-all ${asp.orb < 1.0 ? 'bg-[#1F2226] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'bg-white/50 border-[#C9BEB1]/10 text-[#1F2226]'}`}>
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{asp.planet1.key} & {asp.planet2.key}</span>
                             <span className="text-[9px] font-mono opacity-50 uppercase tracking-tighter">{asp.type}</span>
                           </div>
                           <div className="flex flex-col items-end">
                             <span className={`text-[11px] font-black ${asp.orb < 1.0 ? 'text-[#D4AF37]' : 'text-[#1F2226]'}`}>
                               {asp.orb}°
                             </span>
                             {asp.orb < 1.0 && <span className="text-[7px] uppercase font-bold tracking-widest">Tight Aspect</span>}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* LOWER DATA (Comparative Summaries) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-20">
             {/* DATA A */}
             <div className="p-8 bg-white/40 rounded-[2.5rem] border border-[#C9BEB1]/30 shadow-xl group hover:bg-white/60 transition-all">
                <h4 className="font-serif italic text-xl mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1F2226]"></div> Kosmogram Natalny [A]
                </h4>
                <div className="space-y-3">
                  {chartData.planets.slice(0, 12).map(p => (
                    <div key={p.key} className="flex justify-between border-b border-[#C9BEB1]/10 pb-2 text-[10px] hover:border-[#D4AF37]/30 transition-colors">
                      <span className="font-bold opacity-40 uppercase tracking-[0.2em]">{p.key}</span>
                      <span className="font-mono font-medium">{p.degreeInSign}° {p.sign}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* DATA B */}
             <div className="p-8 bg-white/40 rounded-[2.5rem] border border-[#C9BEB1]/30 shadow-xl group hover:bg-white/60 transition-all">
                <h4 className="font-serif italic text-xl mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Kosmogram Natalny [B]
                </h4>
                <div className="space-y-3">
                  {secondChartData.planets.slice(0, 12).map(p => (
                    <div key={p.key} className="flex justify-between border-b border-[#C9BEB1]/10 pb-2 text-[10px] hover:border-[#3B82F6]/30 transition-colors">
                      <span className="font-bold opacity-40 uppercase tracking-[0.2em] text-[#3B82F6]">{p.key}</span>
                      <span className="font-mono font-medium">{p.degreeInSign}° {p.sign}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* ANALYSIS LAYERS (Derived from Knowledge Base) */}
             <div className="p-8 bg-[#1F2226] text-[#F1E9DE] rounded-[2.5rem] border border-[#D4AF37]/20 shadow-2xl">
                <h4 className="font-serif italic text-xl mb-6 text-[#D4AF37]">Warstwy Analityczne</h4>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Natalna (Potrzeby)</div>
                      <div className="text-[11px] leading-relaxed opacity-80 italic">
                        {displayChart?.interpretation?.purpose || 'Analiza potrzeb w toku...'}
                      </div>
                   </div>
                   <div className="w-full h-[1px] bg-white/5"></div>
                   <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Aktywacja (Domy)</div>
                      <div className="text-[11px] leading-relaxed opacity-80 italic">
                        {displayChart?.interpretation?.houses?.[0]?.text || 'Wykrywanie aktywacji domów...'}
                      </div>
                   </div>
                   <div className="w-full h-[1px] bg-white/5"></div>
                   <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Cel (Trzecia Encja)</div>
                      <div className="text-[11px] leading-relaxed opacity-80 italic">
                        {displayChart?.interpretation?.emotionalClimate || 'Synteza energetyczna pola...'}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
