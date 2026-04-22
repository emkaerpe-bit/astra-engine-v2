import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const AstroControlPanel = ({ planets, aspects, activePlanets, setActivePlanets, activeAspects, setActiveAspects }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePlanet = (key) => {
    const newSet = new Set(activePlanets);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setActivePlanets(newSet);
  };

  const toggleAspect = (type) => {
    const newSet = new Set(activeAspects);
    if (newSet.has(type)) newSet.delete(type);
    else newSet.add(type);
    setActiveAspects(newSet);
  };

  // Unique aspect types from data
  const aspectTypes = Array.from(new Set(aspects.map(a => a.type)));

  return (
    <div className="w-full lg:w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Settings size={14} className="text-[#1F2226]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Panel Kontrolny [V3-FORCE]</span>
        </div>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto">
          {/* Planets Visibility */}
          <div>
            <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1">Widoczność Planet</h4>
            <div className="grid grid-cols-2 gap-2">
              {planets.map(p => (
                <button 
                  key={p.key}
                  onClick={() => togglePlanet(p.key)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all ${
                    activePlanets.has(p.key) 
                    ? 'bg-[#1F2226] border-[#1F2226] text-[#F1E9DE]' 
                    : 'bg-white border-[#C9BEB1]/50 text-[#1F2226]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PlanetGlyph name={p.key} size={10} className={activePlanets.has(p.key) ? 'text-[#D4AF37]' : 'text-current'} />
                    <span className="text-[10px] font-bold tracking-tighter capitalize">{t(p.name)}</span>
                  </div>
                  {activePlanets.has(p.key) ? <Eye size={10} /> : <EyeOff size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* Aspects Visibility */}
          <div>
            <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1">Filtry Aspektów</h4>
            <div className="flex flex-wrap gap-2">
              {aspectTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => {
                    const newSet = new Set(activeAspects);
                    if (newSet.has(type)) newSet.delete(type);
                    else newSet.add(type);
                    setActiveAspects(newSet);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${
                    activeAspects.has(type)
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1F2226]'
                    : 'bg-white border-[#C9BEB1]/50 text-[#8C8883]'
                  }`}
                >
                  {t(type)}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
             <button 
               onClick={() => {
                 setActivePlanets(new Set(planets.map(p => p.key)));
                 setActiveAspects(new Set(aspectTypes));
               }}
               className="w-full py-2 text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C8883] hover:text-[#1F2226] transition-colors border border-dashed border-[#C9BEB1] rounded"
             >
               Resetuj Widok
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroControlPanel;
