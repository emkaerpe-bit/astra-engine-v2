import React, { useState } from 'react';
import { X, Target, Info, Search, Filter } from 'lucide-react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const MidpointLaboratory = ({ isOpen, onClose, chartData, activePatterns }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'tree'
  const [search, setSearch] = useState('');
  const [dial, setDial] = useState(90);
  const [tooltip, setTooltip] = useState(null);
  
  if (!isOpen || !chartData) return null;

  const handleShowTooltip = (e, content) => {
    const tooltipWidth = 220;
    const tooltipHeight = 80;
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    if (x + tooltipWidth > window.innerWidth) x = e.clientX - tooltipWidth - 10;
    if (y + tooltipHeight > window.innerHeight) y = e.clientY - tooltipHeight - 10;

    setTooltip({ x, y, content });
  };

  const handleHideTooltip = () => setTooltip(null);

  const midpoints = chartData.midpoints || [];
  const planets = chartData.planets || [];
  const filtered = midpoints.filter(m => 
    m.label.toLowerCase().includes(search.toLowerCase()) ||
    m.interpretation.toLowerCase().includes(search.toLowerCase())
  );

  // Generate Tree View Data: Which midpoints does each planet hit?
  const generateTreeData = () => {
    const orb = 1.5;
    return planets.map(p => {
      const pDial = p.longitude % dial;
      const hits = midpoints.filter(m => {
        const mDial = m.longitude % dial;
        let diff = Math.abs(pDial - mDial);
        if (diff > dial / 2) diff = dial - diff;
        return diff <= orb;
      });
      return { planet: p, hits: hits.sort((a,b) => Math.abs((p.longitude % dial) - (a.longitude % dial)) - Math.abs((p.longitude % dial) - (b.longitude % dial))) };
    }).filter(p => p.hits.length > 0);
  };

  const treeData = generateTreeData();

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F1E9DE] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
      <header className="px-6 py-2 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <Target size={16} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-lg tracking-tight leading-none">Midpoint Laboratory</h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mt-1">
              Hamburg School & Cosmobiology Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-1 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-[#D4AF37] text-[#1F2226]' : 'text-white/40'}`}
            >
              Lista
            </button>
            <button 
              onClick={() => setViewMode('tree')}
              className={`px-4 py-1 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest transition-all ${viewMode === 'tree' ? 'bg-[#D4AF37] text-[#1F2226]' : 'text-white/40'}`}
            >
              Drzewo
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Search size={12} className="text-[#D4AF37]" />
            <input 
              type="text"
              placeholder="SZUKAJ KOMBINACJI..."
              className="bg-transparent border-none text-[8px] font-mono text-white/80 focus:outline-none w-32 uppercase tracking-widest placeholder:text-white/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#F1E9DE]/20 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Midpoint List or Tree */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar border-r border-[#C9BEB1]/30">
          <div className="sticky top-0 bg-[#E6DDD2] px-6 py-3 border-b border-[#C9BEB1] flex justify-between items-center z-10">
            <span className="text-[10px] font-mono font-bold text-[#1F2226] uppercase tracking-widest">
              {viewMode === 'list' ? `Lista Punktów Środkowych (${filtered.length})` : `Struktury Planetarne (${treeData.length})`}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setDial(90)}
                className={`px-3 py-1 rounded-full text-[8px] font-mono font-bold transition-all ${dial === 90 ? 'bg-[#1F2226] text-[#D4AF37]' : 'bg-white/50 text-[#8C8883]'}`}
              >
                DIAL 90°
              </button>
              <button 
                onClick={() => setDial(45)}
                className={`px-3 py-1 rounded-full text-[8px] font-mono font-bold transition-all ${dial === 45 ? 'bg-[#1F2226] text-[#D4AF37]' : 'bg-white/50 text-[#8C8883]'}`}
              >
                DIAL 45°
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-[#C9BEB1]/20">
            {viewMode === 'list' ? (
              filtered.map((m, idx) => (
                <div 
                  key={idx} 
                  className="p-4 hover:bg-[#FBF7F1] transition-colors group cursor-help"
                  onMouseEnter={(e) => handleShowTooltip(e, m.interpretation)}
                  onMouseLeave={handleHideTooltip}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-[#1F2226] border-2 border-white flex items-center justify-center text-[#D4AF37] shadow-sm">
                          <PlanetGlyph name={m.key.split('/')[0]} size={14} />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center text-[#1F2226] shadow-sm">
                          <PlanetGlyph name={m.key.split('/')[1]} size={14} />
                        </div>
                      </div>
                      <span className="text-sm font-serif italic font-bold text-[#1F2226]">{m.label}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                        {dial === 90 ? m.dial90.toFixed(2) : m.dial45.toFixed(2)}°
                      </span>
                      <span className="text-[8px] font-mono text-[#8C8883] uppercase tracking-tighter">
                        {m.degreeInSign} {t(m.sign)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8C8883] leading-relaxed group-hover:text-[#1F2226] transition-colors truncate max-w-md">
                    {m.interpretation}
                  </p>
                </div>
              ))
            ) : (
              treeData.map((node, idx) => (
                <div key={idx} className="p-6 hover:bg-[#FBF7F1] transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#1F2226] flex items-center justify-center text-[#D4AF37] shadow-xl border-2 border-[#D4AF37]/20">
                      <PlanetGlyph name={node.planet.key} size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">{t(node.planet.name)}</h3>
                      <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">Wierzchołek Drzewa: {(node.planet.longitude % dial).toFixed(2)}°</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {node.hits.map((hit, hIdx) => (
                      <div 
                        key={hIdx} 
                        className="p-3 bg-white border border-[#C9BEB1]/30 rounded-xl hover:border-[#D4AF37] transition-all cursor-help flex items-center justify-between"
                        onMouseEnter={(e) => handleShowTooltip(e, hit.interpretation)}
                        onMouseLeave={handleHideTooltip}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1">
                             <div className="w-6 h-6 rounded-full bg-[#F1E9DE] flex items-center justify-center text-[#1F2226] border border-[#C9BEB1]/50">
                               <PlanetGlyph name={hit.key.split('/')[0]} size={10} />
                             </div>
                             <div className="w-6 h-6 rounded-full bg-[#1F2226] flex items-center justify-center text-[#D4AF37] border border-white/10">
                               <PlanetGlyph name={hit.key.split('/')[1]} size={10} />
                             </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#1F2226] uppercase tracking-tight">{hit.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-mono font-bold text-[#D4AF37]">{(hit.longitude % dial).toFixed(2)}°</div>
                          <div className="text-[7px] font-mono text-[#8C8883] uppercase">Orb: {Math.abs((node.planet.longitude % dial) - (hit.longitude % dial)).toFixed(2)}°</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Insight & Rules */}
        <div className="w-full lg:w-96 bg-[#FBF7F1] p-8 overflow-y-auto border-l border-[#C9BEB1]/20 shadow-inner">
           <div className="mb-10">
              <h3 className="font-serif italic text-2xl text-[#1F2226] mb-2 font-bold">Zasada Symetrii</h3>
              <p className="text-[10px] font-mono text-[#8C8883] uppercase tracking-widest mb-6">Cosmobiology Intelligence</p>
              
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white border border-[#C9BEB1]/30 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-5">
                    <Target size={40} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold text-[#1F2226] uppercase tracking-widest mb-3 border-b border-[#C9BEB1]/20 pb-2">Logika Diala</h4>
                  <p className="text-xs text-[#1F2226]/80 leading-relaxed italic font-serif">
                    "Tarcza 90 stopni sprowadza wszystkie aspekty dynamiczne (koniunkcja, kwadratura, opozycja) do jednej płaszczyzny. Jeśli planeta radix znajduje się w tym samym stopniu co midpoint na tarczy – obraz planetarny jest aktywny."
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-bold text-[#8C8883] uppercase tracking-widest">Kluczowe Osie</h4>
                  {[
                    { label: 'Słońce / Księżyc', desc: 'Oś Tożsamości i Małżeństwa' },
                    { label: 'Mars / Saturn', desc: 'Oś Dyscypliny i Pracy' },
                    { label: 'Saturn / Neptun', desc: 'Oś Chronicznych Stanów' },
                    { label: 'Aries Point (AP)', desc: 'Relacja ze Światem Zewnętrznym' }
                  ].map((axis, i) => (
                    <div key={i} className="p-3 bg-[#1F2226]/5 border border-[#C9BEB1]/30 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#1F2226]">{axis.label}</span>
                      <span className="text-[8px] font-mono text-[#8C8883] uppercase">{axis.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-4 rounded-xl bg-[#1F2226] text-[#F1E9DE] border border-[#D4AF37]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={14} className="text-[#D4AF37]" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Wskazówka Techniczna</span>
                  </div>
                  <p className="text-[9px] font-mono leading-relaxed opacity-80 uppercase tracking-widest">
                    Szukaj midpointów, które znajdują się v odległości mniejszej niż 1.5° od Twoich planet urodzeniowych na tarczy 90°.
                  </p>
                </div>

                {/* GEOMETRIC FIGURES SUMMARY */}
                {activePatterns && activePatterns.size > 0 && (
                  <div className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-[10px] font-mono font-bold text-[#8C8883] uppercase tracking-widest mb-4">Wykryte Wielkie Figury</h4>
                    <div className="space-y-3">
                      {[...activePatterns].map(pKey => {
                        const idx = parseInt(pKey.split('-').pop());
                        const pattern = chartData?.patterns?.[idx];
                        if (!pattern) return null;
                        return (
                          <div key={pKey} className="p-4 bg-white border-2 border-[#D4AF37]/30 rounded-2xl shadow-sm">
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-xs font-serif italic font-bold text-[#1F2226]">{pattern.type.split('_').join(' ')}</span>
                               <span className="text-[8px] font-mono bg-[#D4AF37] text-[#1F2226] px-2 py-0.5 rounded font-bold uppercase">Active</span>
                             </div>
                             <div className="flex flex-wrap gap-1">
                               {pattern.planets.map(pk => (
                                 <div key={pk} className="w-6 h-6 rounded-full bg-[#1F2226] flex items-center justify-center text-[#D4AF37] border border-white/10">
                                   <PlanetGlyph name={pk} size={10} />
                                 </div>
                               ))}
                             </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>
      </main>

      {/* TOOLTIP PORTAL */}
      {tooltip && (
        <div 
          className="fixed z-[10000] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="bg-[#1F2226] text-[#F1E9DE] p-4 rounded-2xl shadow-2xl text-[11px] max-w-[280px] animate-in fade-in zoom-in-95 duration-200 -translate-x-1/2 -translate-y-[120%] border border-white/10 backdrop-blur-xl bg-opacity-95">
            <div className="font-serif italic text-[#D4AF37] mb-2 border-b border-white/5 pb-2 font-bold text-[10px]">Interpretacja Midpointu</div>
            <div className="font-mono tracking-tight font-bold leading-relaxed">{tooltip.content}</div>
          </div>
        </div>
      )}

      <footer className="px-6 py-2 bg-[#F1E9DE] border-t border-[#C9BEB1]/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
           <span className="text-[8px] font-mono uppercase tracking-widest text-[#8C8883]">Module: Midpoint Matrix v1.0</span>
           <span className="text-[8px] font-mono uppercase tracking-widest text-[#8C8883]">Calculation: Short Arc Logic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-[#1F2226] font-bold">Uranian Precision Active</span>
        </div>
      </footer>
    </div>
  );
};

export default MidpointLaboratory;
