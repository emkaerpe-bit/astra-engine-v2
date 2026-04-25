import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const AstroControlPanel = ({ 
  planets, 
  aspects, 
  lots = [],
  activePlanets, 
  setActivePlanets, 
  activeAspects, 
  setActiveAspects,
  activeLots,
  setActiveLots,
  stars = [],
  activeStars,
  setActiveStars,
  patterns = [],
  activePatterns,
  setActivePatterns,
  currentHouseSystem,
  onHouseSystemChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePlanet = (key) => {
    const newSet = new Set(activePlanets);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setActivePlanets(newSet);
  };

  const toggleLot = (key) => {
    const newSet = new Set(activeLots);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setActiveLots(newSet);
  };

  const toggleStar = (key) => {
    const newSet = new Set(activeStars);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setActiveStars(newSet);
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
    <div className="w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
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
          {/* House System Selector */}
          <div>
            <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1">System Domów</h4>
            <select 
              value={currentHouseSystem || 'P'}
              onChange={(e) => onHouseSystemChange?.(e.target.value)}
              className="w-full bg-white border border-[#C9BEB1]/50 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1F2226] focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238C8883\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
            >
              <option value="P">Placidus</option>
              <option value="K">Koch</option>
              <option value="W">Whole Sign</option>
              <option value="E">Equal</option>
              <option value="R">Regiomontanus</option>
              <option value="C">Campanus</option>
              <option value="O">Porphyrius</option>
            </select>
          </div>

          {/* Fixed Stars Visibility */}
          <div>
            <h4 className="font-serif italic text-xs text-[#1F2226] mb-3 border-b border-[#1F2226]/30 pb-1">Gwiazdy Stałe (Fixed Stars)</h4>
            <div className="grid grid-cols-2 gap-2">
              {stars.map(s => (
                <button 
                  key={s.key}
                  onClick={() => toggleStar(s.key)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all ${
                    activeStars.has(s.key) 
                    ? 'bg-[#1F2226] border-[#1F2226] text-[#F1E9DE]' 
                    : 'bg-white border-[#C9BEB1]/50 text-[#8C8883]'
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-tight truncate max-w-[80px]">{s.name}</span>
                  <span className={activeStars.has(s.key) ? 'text-[#D4AF37]' : 'text-current'}>✦</span>
                </button>
              ))}
              {stars.length === 0 && <div className="col-span-2 text-[8px] text-[#8C8883] italic text-center">Brak danych gwiazd...</div>}
            </div>
          </div>

          {/* Arabic Parts (Lots) Visibility */}
          <div>
            <h4 className="font-serif italic text-xs text-[#D4AF37] mb-3 border-b border-[#D4AF37]/30 pb-1">Punkty Arabskie (Lots)</h4>
            <div className="grid grid-cols-1 gap-2">
              {lots.map(l => (
                <button 
                  key={l.key}
                  onClick={() => toggleLot(l.key)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                    activeLots.has(l.key) 
                    ? 'bg-[#1F2226] border-[#D4AF37] text-[#D4AF37]' 
                    : 'bg-white border-[#C9BEB1]/50 text-[#8C8883]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{l.symbol}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{l.name}</span>
                  </div>
                  {activeLots.has(l.key) ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              ))}
              {lots.length === 0 && <div className="text-[8px] text-[#8C8883] italic text-center">Brak danych punktów...</div>}
            </div>
          </div>

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
                  onClick={() => toggleAspect(type)}
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

          {/* Geometric Patterns (Wielkie Figury) */}
          {patterns && patterns.length > 0 && (
            <div>
              <h4 className="font-serif italic text-xs text-[#1F2226] mb-3 border-b border-[#D4AF37]/30 pb-1">Wielkie Figury [Geometry]</h4>
              <div className="space-y-2">
                {patterns.map((p, idx) => {
                  const pKey = `${p.type}-${idx}`;
                  const isActive = activePatterns.has(pKey);
                  return (
                    <button 
                      key={pKey}
                      onClick={() => {
                        const newSet = new Set(activePatterns);
                        if (isActive) newSet.delete(pKey);
                        else newSet.add(pKey);
                        setActivePatterns(newSet);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
                        isActive 
                        ? 'bg-[#1F2226] border-[#D4AF37] text-[#D4AF37] shadow-lg' 
                        : 'bg-white border-[#C9BEB1]/50 text-[#8C8883]'
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{p.type}</span>
                        <span className="text-[8px] opacity-60 font-mono">{p.planets.map(pl => pl.substring(0,3)).join(' • ')}</span>
                      </div>
                      <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-[#D4AF37] text-[#1F2226]' : 'bg-[#FBF7F1] text-[#C9BEB1]'}`}>
                        <Eye size={12} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
