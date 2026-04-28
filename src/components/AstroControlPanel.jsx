import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Eye, EyeOff, Compass, Star, Globe, ExternalLink } from 'lucide-react';
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
  onHouseSystemChange,
  currentZodiacType = 'tropical',
  onZodiacChange,
  onAyanamsaChange,
  showACG,
  setShowACG,
  chartData,
  isDualWheel,
  onToggleDualWheel,
  secondChartData,
  onLoadSecondChart,
  onOpenSynastrySetup
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGeometry, setShowGeometry] = useState(false);

  const handleOpenACG = () => {
    if (chartData) {
      localStorage.setItem('acg_chart_data', JSON.stringify(chartData));
      window.open(window.location.origin + window.location.pathname + '?mode=acg', '_blank');
    }
  };

  const handleReset = (e) => {
    if (e) e.stopPropagation();
    const standard = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'node', 'south_node', 'chiron', 'lilith'];
    setActivePlanets(new Set(standard));
    const aspectTypes = Array.from(new Set(aspects.map(a => a.type)));
    setActiveAspects(new Set(aspectTypes));
    setActiveLots(new Set(lots.map(l => l.key)));
    setActiveStars(new Set(stars.map(s => s.key)));
    setActivePatterns(new Set(patterns.map(p => p.type)));
  };

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

  const aspectTypes = Array.from(new Set(aspects.map(a => a.type)));

  return (
    <div className="w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Eye size={14} className="text-[#1F2226]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Widoczność i Systemy [V5-LUXE]</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            onClick={handleReset}
            className="px-3 py-1 bg-[#1F2226] text-[#D4AF37] rounded-full text-[8px] font-bold uppercase tracking-widest hover:bg-black transition-all"
          >
            Resetuj
          </div>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar pr-2 pb-8 animate-in slide-in-from-top-2 duration-300">
          {/* AstroCartoGraphy Toggle */}
          <div className="bg-[#1F2226] p-4 rounded-xl border border-[#D4AF37]/30 shadow-lg">
            <h4 className="font-serif italic text-sm text-[#D4AF37] mb-3 border-b border-[#D4AF37]/20 pb-1 flex items-center gap-2">
              <Globe size={14} /> Atlas Relokacji 3D
            </h4>
            <button 
              onClick={handleOpenACG}
              className="w-full flex items-center justify-between p-6 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#AA8B2E] text-black group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center">
                  <Globe className="animate-spin-slow" size={24} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest">Atlas Relokacji 3D</span>
                    <span className="bg-black text-[#D4AF37] text-[8px] px-2 py-0.5 rounded-full font-bold animate-pulse">NEW</span>
                  </div>
                  <p className="text-[9px] font-medium opacity-70">Symulacja Twoich osi na całym globie</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <ExternalLink size={18} />
              </div>
            </button>
          </div>

          {/* DUAL WHEEL (Synastry) Toggle */}
          <div className="bg-[#1F2226] p-4 rounded-xl border border-[#D4AF37]/30 shadow-lg space-y-4">
            <h4 className="font-serif italic text-sm text-[#D4AF37] mb-1 border-b border-[#D4AF37]/20 pb-1 flex items-center gap-2">
              <Star size={14} /> Porównanie [SYNSTRIA]
            </h4>
            
            <button 
              onClick={onOpenSynastrySetup}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                isDualWheel 
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Otwórz Konfigurator</span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${isDualWheel ? 'bg-black' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${isDualWheel ? 'left-4.5 bg-[#D4AF37]' : 'left-0.5 bg-white/40'}`} />
              </div>
            </button>

            {isDualWheel && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <button 
                  onClick={onLoadSecondChart}
                  className="w-full py-3 bg-[#D4AF37] text-black rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Star size={12} /> {secondChartData ? 'Zmień Partnera' : 'Załaduj drugą osobę'}
                </button>
                
                {secondChartData && (
                  <div className="p-3 bg-black/40 border border-[#D4AF37]/20 rounded-lg">
                    <div className="text-[8px] text-[#D4AF37]/60 uppercase tracking-widest mb-1">Porównujesz z:</div>
                    <div className="text-[10px] font-bold text-[#F1E9DE] truncate">{secondChartData.input.name}</div>
                    <div className="text-[8px] text-[#D4AF37] font-mono mt-1 italic">
                      {secondChartData.input.date} • {secondChartData.input.time}
                    </div>
                  </div>
                )}

                <button 
                  onClick={onToggleDualWheel}
                  className="w-full py-2 bg-white/5 border border-white/10 text-white/40 hover:text-white rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all"
                >
                  Wyłącz Porównanie
                </button>
              </div>
            )}
          </div>

          {/* Zodiac & Ayanamsa (NEW) */}
          <div className="space-y-4">
            <div>
              <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1 flex items-center gap-2">
                <Compass size={12} /> System Zodiakalny
              </h4>
              <select 
                value={currentZodiacType}
                onChange={(e) => onZodiacChange?.(e.target.value)}
                className="w-full bg-white border border-[#C9BEB1]/50 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1F2226] focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 24 24\' fill=\'none\' stroke=\'%238C8883\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
              >
                <option value="tropical">Tropikalny (Zachodni)</option>
                <option value="sidereal">Syderyczny (Wedyjski)</option>
                <option value="draconic">Drakoniczny (Dusza)</option>
                <option value="heliocentric">Heliocentryczny (Słońce)</option>
                <option value="galactic">Galaktyczny (Centrum)</option>
                <option value="iau">IAU (Konstelacje)</option>
              </select>
            </div>

            {currentZodiacType === 'sidereal' && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                <h4 className="font-serif italic text-xs text-[#D4AF37] mb-3 border-b border-[#D4AF37]/30 pb-1">Ajanamsza</h4>
                <select 
                  value={currentAyanamsa}
                  onChange={(e) => onAyanamsaChange?.(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1F2226] focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23D4AF37\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                >
                  <option value="1">Lahiri (Standard)</option>
                  <option value="0">Fagan/Bradley</option>
                  <option value="3">Raman</option>
                  <option value="5">Krishnamurti</option>
                  <option value="27">True Chitra</option>
                </select>
              </div>
            )}
          </div>

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

          {/* Standard Planets Visibility */}
          <div>
            <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1 flex items-center justify-between">
              <span>Planety Główne</span>
              <button 
                onClick={() => {
                  const standard = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'node', 'south_node', 'chiron', 'lilith'];
                  const newSet = new Set(activePlanets);
                  const allVisible = standard.every(k => newSet.has(k));
                  standard.forEach(k => allVisible ? newSet.delete(k) : newSet.add(k));
                  setActivePlanets(newSet);
                }}
                className="text-[8px] font-mono uppercase text-[#D4AF37] hover:underline"
              >
                Toggle All
              </button>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {planets.filter(p => !['cupido', 'hades', 'zeus', 'kronos', 'apollon', 'admetos', 'vulkanus', 'poseidon', 'ap'].includes(p.key)).map(p => (
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

          {/* Uranian Planets Visibility (Hamburg School) */}
          <div>
            <h4 className="font-serif italic text-xs text-[#D4AF37] mb-3 border-b border-[#D4AF37]/30 pb-1 flex items-center justify-between">
              <span className="flex items-center gap-2">Techniki Uraniczne <Star size={10} /></span>
              <button 
                onClick={() => {
                  const uranian = ['cupido', 'hades', 'zeus', 'kronos', 'apollon', 'admetos', 'vulkanus', 'poseidon', 'ap'];
                  const newSet = new Set(activePlanets);
                  const allVisible = uranian.every(k => newSet.has(k));
                  uranian.forEach(k => allVisible ? newSet.delete(k) : newSet.add(k));
                  setActivePlanets(newSet);
                }}
                className="text-[8px] font-mono uppercase text-[#D4AF37] hover:underline"
              >
                Toggle All
              </button>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {planets.filter(p => ['cupido', 'hades', 'zeus', 'kronos', 'apollon', 'admetos', 'vulkanus', 'poseidon', 'ap'].includes(p.key)).map(p => (
                <button 
                  key={p.key}
                  onClick={() => togglePlanet(p.key)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all ${
                    activePlanets.has(p.key) 
                    ? 'bg-[#1F2226] border-[#1F2226] text-[#D4AF37]' 
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
          {patterns.length > 0 && (
            <div className="border-t border-[#C9BEB1]/20 pt-4 mt-2">
              <button 
                onClick={() => setShowGeometry(!showGeometry)}
                className="w-full flex items-center justify-between font-serif italic text-xs text-[#1F2226] mb-3 hover:opacity-60 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Star size={12} className={showGeometry ? 'text-[#D4AF37]' : ''} /> Wielkie Figury [Geometry]
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${showGeometry ? 'rotate-180' : ''}`} />
              </button>
              
              {showGeometry && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
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
                          <span className="text-[10px] font-bold uppercase tracking-widest">{p.type.split('_').join(' ')}</span>
                          <span className="text-[8px] opacity-60 font-mono">{p.planets.map(pl => pl.substring(0,3)).join(' • ')}</span>
                        </div>
                        <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-[#D4AF37] text-[#1F2226]' : 'bg-[#FBF7F1] text-[#C9BEB1]'}`}>
                          <Eye size={12} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Fixed Stars Visibility */}
          {stars.length > 0 && (
            <div>
              <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1">Gwiazdy Stałe</h4>
              <div className="grid grid-cols-2 gap-2">
                {stars.map(s => (
                  <button 
                    key={s.key}
                    onClick={() => toggleStar(s.key)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all ${
                      activeStars.has(s.key) 
                      ? 'bg-[#5A4E3A] border-[#5A4E3A] text-white' 
                      : 'bg-white border-[#C9BEB1]/50 text-[#5A4E3A]/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold tracking-tighter">{s.name}</span>
                    {activeStars.has(s.key) ? <Eye size={10} /> : <EyeOff size={10} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Arabic Lots Visibility */}
          {lots.length > 0 && (
            <div>
              <h4 className="font-serif italic text-xs text-[#8C8883] mb-3 border-b border-[#C9BEB1]/30 pb-1">Punkty Arabskie</h4>
              <div className="grid grid-cols-1 gap-2">
                {lots.map(l => (
                  <button 
                    key={l.key}
                    onClick={() => toggleLot(l.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
                      activeLots.has(l.key) 
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1F2226]' 
                      : 'bg-white border-[#C9BEB1]/50 text-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[12px]">{l.symbol}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{t(l.name)}</span>
                    </div>
                    {activeLots.has(l.key) ? <Eye size={10} /> : <EyeOff size={10} />}
                  </button>
                ))}
              </div>
            </div>
          )}



        </div>
      )}
    </div>
  );
};

export default AstroControlPanel;
