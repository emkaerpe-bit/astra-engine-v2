import React from 'react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const DispositorAnalysis = ({ 
  dispositorsTraditional, 
  dispositorsModern, 
  planets,
  houses,
  externalSystem,
  setExternalSystem,
  externalSelectedPlanet,
  setExternalSelectedPlanet
}) => {
  const MODERN_RULERS = {
    'Aries': 'mars', 'Taurus': 'venus', 'Gemini': 'mercury', 'Cancer': 'moon', 'Leo': 'sun', 'Virgo': 'mercury',
    'Libra': 'venus', 'Scorpio': 'pluto', 'Sagittarius': 'jupiter', 'Capricorn': 'saturn', 'Aquarius': 'uranus', 'Pisces': 'neptune'
  };

  const TRADITIONAL_RULERS = {
    'Aries': 'mars', 'Taurus': 'venus', 'Gemini': 'mercury', 'Cancer': 'moon', 'Leo': 'sun', 'Virgo': 'mercury',
    'Libra': 'venus', 'Scorpio': 'mars', 'Sagittarius': 'jupiter', 'Capricorn': 'saturn', 'Aquarius': 'saturn', 'Pisces': 'jupiter'
  };

  const RULER_INTERPRETATIONS = {
    sun: "Słońce jako Władca Horoskopu wskazuje na życie skoncentrowane na ekspresji własnej tożsamości, potrzebie uznania i promieniowaniu autorytetem. Droga życiowa to poszukiwanie autentyczności.",
    moon: "Księżyc jako Władca Horoskopu podkreśla dominację emocji, intuicji i potrzebę bezpieczeństwa. Życie toczy się wokół opieki, domu i instynktownych reakcji.",
    mercury: "Merkury jako Władca Horoskopu kieruje uwagę na komunikację, intelekt i wymianę informacji. Droga życiowa to ciągła nauka, ruch i analiza.",
    venus: "Wenus jako Władca Horoskopu skupia życie wokół harmonii, relacji i estetyki. Kluczowe jest poszukiwanie piękna, wartości i przyjemności.",
    mars: "Mars jako Władca Horoskopu nadaje życiu dynamizm, wolę walki i potrzebę działania. Droga życiowa to wyzwania, inicjatywa i odwaga.",
    jupiter: "Jowisz jako Władca Horoskopu wskazuje na ekspansję, poszukiwanie sensu i optymizm. Życie to podróż ku mądrości, rozwojowi i obfitości.",
    saturn: "Saturn jako Władca Horoskopu przynosi lekcje dyscypliny, odpowiedzialności i struktury. Droga życiowa to budowanie trwałych fundamentów przez pracę.",
    uranus: "Uran jako Władca Horoskopu oznacza potrzebę wolności, innowacji i buntu. Życie to ciągłe zmiany, przebudzenia i kroczenie własną ścieżką.",
    neptune: "Neptun jako Władca Horoskopu wskazuje na transcendencję, wyobraźnię i duchowość. Droga życiowa to świat snów, sztuki i empatii.",
    pluto: "Pluton jako Władca Horoskopu przynosi transformację, moc i intensywność. Życie to proces odrodzenia, badania głębi i konfrontacji z cieniem."
  };

  const currentData = externalSystem === 'traditional' ? dispositorsTraditional : dispositorsModern;
  const summary = currentData?.summary || {};
  const finalDispositors = currentData?.finalDispositors || [];
  const mutualReceptions = currentData?.mutualReceptions || [];
  const loops = currentData?.loops || [];

  const ascSign = houses?.ascendant?.sign;
  const chartRulerKey = externalSystem === 'traditional' ? TRADITIONAL_RULERS[ascSign] : MODERN_RULERS[ascSign];
  const chartRuler = planets.find(p => p.key === chartRulerKey);

  if (!summary || !planets) return null;

  const sorted = Object.entries(summary)
    .sort((a, b) => b[1].totalWeight - a[1].totalWeight)
    .filter(([_, data]) => data.totalWeight > 0);

  const toggleExpand = (key) => {
    setExternalSelectedPlanet(prev => (prev === key ? null : key));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. CHART RULER & ADVANCED INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chartRuler && (
          <div className="bg-[#FBF7F1] p-4 rounded-2xl border-2 border-[#1F2226] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <PlanetGlyph name={chartRulerKey} size={80} />
            </div>
            <h4 className="text-[#1F2226] text-[10px] font-mono uppercase tracking-[0.3em] font-black mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Władca Horoskopu
            </h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1F2226] flex items-center justify-center text-[#D4AF37] shadow-lg">
                <PlanetGlyph name={chartRulerKey} size={24} />
              </div>
              <div>
                <span className="block text-xl font-serif italic font-black text-[#1F2226] leading-none">
                  {t(chartRuler.name)}
                </span>
                <span className="text-[9px] font-mono uppercase text-[#8C8883] tracking-widest mt-1 block">
                   Władca Ascendentu w {t(ascSign)}
                </span>
              </div>
            </div>
            <div className="p-3 bg-[#1F2226] rounded-xl border border-[#D4AF37]/20">
              <p className="text-[10px] text-[#F1E9DE] leading-relaxed italic font-serif">
                "{RULER_INTERPRETATIONS[chartRulerKey]}"
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
               <span className="text-[7px] font-mono text-[#8C8883] uppercase tracking-[0.2em]">Neural Engine v3.0</span>
               <div className="px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[7px] text-[#D4AF37] font-bold uppercase tracking-widest">
                 Dominanta Aktywna
               </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {finalDispositors.length > 0 && (
            <div className="bg-[#1F2226] p-4 rounded-2xl border border-[#D4AF37]/50 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <RotateCcw size={60} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-3">Władca Finalny</h4>
              <div className="flex flex-wrap gap-3">
                {finalDispositors.map(pk => (
                  <div key={pk} className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/10 hover:border-[#D4AF37] transition-all">
                    <PlanetGlyph name={pk} size={20} className="text-[#D4AF37]" />
                    <span className="text-white text-xs font-serif italic font-bold">{t(planets.find(pl => pl.key === pk)?.name || pk)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-white/50 mt-4 italic font-mono uppercase">Najwyższa instancja decyzyjna w kosmogramie.</p>
            </div>
          )}

          {mutualReceptions.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#C9BEB1]/30 shadow-lg relative group">
               <h4 className="text-[#1F2226] text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-3">Wzajemna Recepcja</h4>
               <div className="space-y-2">
                 {mutualReceptions.map((pair, idx) => (
                   <div key={idx} className="flex items-center gap-2 p-2 bg-[#FBF7F1] rounded-xl border border-[#C9BEB1]/20">
                     <div className="flex items-center gap-1">
                       <PlanetGlyph name={pair[0]} size={16} />
                       <div className="w-4 h-[1px] bg-[#C9BEB1]" />
                       <PlanetGlyph name={pair[1]} size={16} />
                     </div>
                     <span className="text-[9px] font-bold uppercase tracking-tighter text-[#8C8883]">Partnerstwo Strategiczne</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN MATRIX */}
      <div className="bg-white border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Analiza Władztwa</h3>
            <p className="text-[8px] font-mono text-[#8C8883] uppercase tracking-widest mt-0.5">Weighted Hierarchy [Deep Chain v2]</p>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExternalSystem(externalSystem === 'traditional' ? 'modern' : 'traditional');
            }}
            className="group flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#1F2226] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-black transition-all duration-300 shadow-md"
          >
            <div className="flex flex-col items-end">
              <span className="text-[7px] uppercase tracking-widest font-black opacity-60">System</span>
              <span className="text-[9px] uppercase tracking-widest font-black">
                {externalSystem === 'traditional' ? 'Tradycyjny' : 'Nowoczesny'}
              </span>
            </div>
            <RotateCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sorted.map(([key, data]) => {
              const planet = planets.find(p => p.key === key);
              const isExpanded = externalSelectedPlanet === key;
              
              return (
                <div 
                  key={key} 
                  onClick={() => toggleExpand(key)}
                  className={`relative flex flex-col cursor-pointer transition-all duration-500 rounded-xl bg-white border overflow-hidden shadow-sm hover:shadow-md
                    ${isExpanded ? 'ring-2 ring-[#D4AF37] border-transparent shadow-xl' : 'border-[#C9BEB1]/30 hover:border-[#D4AF37]/50'}`}
                >
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-[#D4AF37] transition-all duration-700" 
                    style={{ width: `${data.percentage}%` }}
                  />
                  
                  <div className="p-3 flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1F2226]/5 flex items-center justify-center text-[#1F2226]">
                      <PlanetGlyph name={key} className="w-4 h-4" />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] uppercase font-bold tracking-wider text-[#1F2226]">
                        {t(planet?.name || key)}
                      </span>
                      <span className="text-[16px] font-serif italic text-[#D4AF37] font-black leading-none">
                        {data.percentage.toFixed(1)}%
                      </span>
                    </div>
  
                    <div className="w-full pt-1.5 mt-1 border-t border-[#C9BEB1]/20 flex justify-between px-1 items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[6px] font-mono text-[#8C8883] uppercase">Dir</span>
                        <span className="text-[9px] font-bold text-[#1F2226]">{data.directCount}</span>
                      </div>
                      {isExpanded ? <ChevronUp size={10} className="text-[#D4AF37]" /> : <ChevronDown size={10} className="text-[#8C8883]" />}
                      <div className="flex flex-col items-center">
                        <span className="text-[6px] font-mono text-[#8C8883] uppercase">Ind</span>
                        <span className="text-[9px] font-bold text-[#1F2226]">{data.indirectCount}</span>
                      </div>
                    </div>
                  </div>
  
                  {isExpanded && (
                    <div className="px-3 pb-3 animate-slide-up">
                       <div className="pt-3 border-t border-[#C9BEB1]/20 space-y-3">
                         {data.directSubjects.length > 0 && (
                           <div>
                             <p className="text-[7px] font-mono uppercase text-[#D4AF37] font-black tracking-widest mb-1.5">Bezpośrednio włada:</p>
                             <div className="flex flex-wrap gap-1">
                               {data.directSubjects.map(s => (
                                 <div key={s} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1F2226]/5 border border-[#C9BEB1]/20">
                                   <PlanetGlyph name={s} className="w-2.5 h-2.5 text-[#1F2226]" />
                                   <span className="text-[8px] font-mono uppercase font-bold text-[#1F2226]">{t(s)}</span>
                                  </div>
                               ))}
                             </div>
                           </div>
                         )}
                         
                         {data.indirectSubjects.length > 0 && (
                           <div>
                             <p className="text-[7px] font-mono uppercase text-[#8C8883] font-black tracking-widest mb-1.5">Pośrednio:</p>
                             <div className="flex flex-wrap gap-1">
                               {[...new Set(data.indirectSubjects)].filter(s => !data.directSubjects.includes(s)).map(s => (
                                 <div key={s} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FBF7F1] border border-[#C9BEB1]/10">
                                   <PlanetGlyph name={s} className="w-2 h-2 text-[#8C8883]" />
                                   <span className="text-[7px] font-mono uppercase text-[#8C8883]">{t(s)}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispositorAnalysis;
