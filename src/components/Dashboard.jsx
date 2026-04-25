import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Sun, Moon, ArrowUp, Lock, Star, Zap, Layers } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import EphemerisTable from './EphemerisTable';
import DispositorAnalysis from './DispositorAnalysis';
import AstroHeader from './AstroHeader';
import DataPanel from './DataPanel';
import TriangularAspectGrid from './TriangularAspectGrid';
import AstroControlPanel from './AstroControlPanel';
import TransitControl from './TransitControl';
import TransitLaboratory from './TransitLaboratory';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';
import MoonPhase from './MoonPhase';
import { t } from '../utils/astroTranslations';

const BIG_THREE_ICONS = {
  sun: Sun,
  moon: Moon,
  rising: ArrowUp,
};

export default function Dashboard({ 
  chartData, 
  error,
  activePlanets,
  setActivePlanets,
  activeAspects,
  setActiveAspects,
  activeLots,
  activeStars,
  isTransitActive,
  setIsTransitActive,
  showLaboratory,
  setShowLaboratory,
  transitData,
  prognosticData,
  onTimeChange,
  showTimeMachine,
  onToggleTimeMachine,
  onHouseSystemChange,
  activePatterns,
  setShowDispositorLaboratory
}) {
  const dashRef = useRef(null);
  const ctxRef = useRef(null);
  const [tooltip, setTooltip] = React.useState(null);

  const handleShowTooltip = (e, content) => {
    const tooltipWidth = 220;
    const tooltipHeight = 100;
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    if (x + tooltipWidth > window.innerWidth) x = e.clientX - tooltipWidth - 10;
    if (y + tooltipHeight > window.innerHeight) y = e.clientY - tooltipHeight - 10;

    setTooltip({ x, y, content });
  };

  const handleHideTooltip = () => setTooltip(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      gsap.to('.card-reveal', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
      });
    }, dashRef);

    return () => ctxRef.current?.revert();
  }, [chartData]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 rounded-3xl border border-red-900/50 bg-[#F1E9DE] gold-glow" style={{
        transform: 'translateX(-50%)',
        width: 'min(90vw, 520px)',
        background: 'rgba(251, 247, 241, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(201, 190, 177, 0.4)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.03), 0 0 0 1px rgba(201, 190, 177, 0.1)',
      }}>
          <Zap className="mx-auto mb-4 text-red-500" size={32} />
          <h2 className="font-serif italic text-2xl mb-4">Calculation Failed</h2>
          <p className="text-[#8C8883] text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-magnetic px-6 py-3 rounded-xl bg-[#1F2226] text-[#F1E9DE] font-bold uppercase text-xs tracking-widest">
            Retry Protocol
          </button>
        </div>
      </div>
    );
  }

  if (!chartData) return null;

  const { bigThree, planets, houses, aspects, input } = chartData;

  const getPolishQuality = (q) => {
    if (q === 'Cardinal') return 'Kardynalna';
    if (q === 'Fixed') return 'Stała';
    if (q === 'Mutable') return 'Zmienna';
    return q;
  };

  const getPolishElement = (e) => {
    if (e === 'Fire') return 'Ogień';
    if (e === 'Earth') return 'Ziemia';
    if (e === 'Air') return 'Powietrze';
    if (e === 'Water') return 'Woda';
    return e;
  };

  return (
    <>
      <div ref={dashRef} className="min-h-screen bg-[#F1E9DE] relative">
        
      {/* 1. UPPER DASHBOARD (CONSTRAINED 1500px) */}
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT: Technical Stack */}
          <div className="w-full lg:w-fit space-y-6 flex flex-col items-start min-w-[350px]">
            
            {/* Session Info */}
            <div className="card-reveal translate-y-4 font-mono">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8C8883] animate-pulse" />
                <h1 className="text-[#1F2226] text-sm font-serif italic tracking-tight uppercase">Ad Astra v3.0 Professional</h1>
              </div>
              <div className="text-[10px] text-[#1F2226] uppercase tracking-tighter leading-tight font-bold">
                <div className="bg-[#1F2226] text-[#F1E9DE] px-2 py-0.5 rounded inline-block mb-1">
                  {new Date(input.year, input.month - 1, input.day).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })} · {String(input.hour).padStart(2, '0')}:{String(input.minute).padStart(2, '0')}
                </div>
                <div className="truncate max-w-[320px] text-[#8C8883]">
                  {input.location.resolved.split(',').length > 1 
                    ? `${input.location.resolved.split(',')[0].trim()}, ${input.location.resolved.split(',').pop().trim()}`
                    : input.location.resolved}
                </div>
              </div>
            </div>

            {/* Ephemeris Data */}
            <div className="card-reveal translate-y-4 rounded border border-[#C9BEB1] bg-[#FBF7F1] shadow-sm w-full">
              <div className="bg-[#E6DDD2] px-3 py-1.5 border-b border-[#C9BEB1]/50">
                <h3 className="font-mono text-[9px] text-[#1F2226] tracking-widest uppercase font-bold">— Macierz Efemeryd</h3>
              </div>
              <div className="p-3 space-y-1 font-mono pr-2">
                {planets?.map((p) => (
                  <div key={p?.key} className="flex items-center text-[10px] leading-relaxed hover:bg-[#C9BEB1]/10 px-1 rounded transition-colors gap-3">
                    <div className="flex items-center gap-2 w-[100px]">
                      <div className="w-4 flex items-center justify-center">
                        <PlanetGlyph name={p?.key} size={10} className="text-[#1F2226]" />
                      </div>
                      <div className="text-[#1F2226] font-bold tracking-tighter capitalize truncate">{t(p?.name)}</div>
                    </div>
                    <div className="flex items-center justify-end text-[#1F2226] font-bold gap-1">
                      <span className="w-4 text-right">{(p?.degreeInSign || "").split(' ')[0] || "0"}</span>
                      <span className="opacity-60">{t(p?.sign)?.substring(0,3)}</span>
                      <span className="w-8 text-right">{(p?.degreeInSign || "").split(' ')[1] || "0'"}</span>
                      {p?.isRetrograde && <span className="text-red-600 font-bold ml-1">R</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Distribution (POLISH PROFESSIONAL) */}
            <div className="card-reveal translate-y-4 rounded border border-[#C9BEB1] bg-[#FBF7F1] shadow-sm w-full overflow-hidden">
              <div className="bg-[#E6DDD2] px-3 py-1.5 border-b border-[#C9BEB1]/50">
                <h3 className="font-mono text-[9px] text-[#1F2226] tracking-widest uppercase font-bold">— Analiza Żywiołów i Jakości</h3>
              </div>
              <div className="p-0">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F1E9DE]/50 border-b border-[#C9BEB1]/30">
                      <th className="p-2 border-r border-[#C9BEB1]/30 w-16"></th>
                      {['Cardinal', 'Fixed', 'Mutable'].map(q => (
                        <th key={q} className="p-2 text-[9px] font-mono text-[#1F2226] uppercase border-r border-[#C9BEB1]/20 font-black">
                          {getPolishQuality(q)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['Fire', 'Earth', 'Air', 'Water'].map((el) => (
                      <tr key={el} className="border-b border-[#C9BEB1]/20 last:border-0">
                        <td className="p-2 text-[9px] font-black font-mono text-[#1F2226] uppercase border-r border-[#C9BEB1]/50 bg-[#F1E9DE] text-center w-16">
                          {getPolishElement(el)}
                        </td>
                        {['Cardinal', 'Fixed', 'Mutable'].map((qu) => {
                          const signs = el === 'Fire' ? ['Aries', 'Leo', 'Sagittarius'] :
                                        el === 'Earth' ? ['Taurus', 'Virgo', 'Capricorn'] :
                                        el === 'Air' ? ['Gemini', 'Libra', 'Aquarius'] :
                                        ['Cancer', 'Scorpio', 'Pisces'];
                          const qSigns = qu === 'Cardinal' ? ['Aries', 'Cancer', 'Libra', 'Capricorn'] :
                                         qu === 'Fixed' ? ['Taurus', 'Leo', 'Scorpio', 'Aquarius'] :
                                         ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'];
                          const matches = planets?.filter(p => signs.includes(p.sign) && qSigns.includes(p.sign));
                          return (
                            <td key={qu} className="p-3 border-r border-[#C9BEB1]/20 last:border-0 min-h-[40px]">
                              <div className="flex flex-wrap gap-2 justify-center">
                                {matches?.map(p => (
                                  <PlanetGlyph key={p?.key} name={p?.key} size={16} className="text-[#1F2226] hover:scale-125 transition-transform" />
                                ))}
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

            <MoonPhase 
              sunLng={planets.find(p => p.key === 'sun')?.longitude || 0}
              moonLng={planets.find(p => p.key === 'moon')?.longitude || 0}
            />
          </div>

          {/* RIGHT: Zodiac Wheel */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[850px] aspect-square relative bg-white/20 rounded-full shadow-[0_0_100px_rgba(0,0,0,0.05)] border border-[#C9BEB1]/20">
              <ZodiacWheel 
                visible={true} 
                chartData={chartData} 
                activePlanets={activePlanets}
                activeAspects={activeAspects}
                activeLots={activeLots}
                activeStars={activeStars}
                activePatterns={activePatterns}
                transitData={isTransitActive ? transitData : null}
                prognosticData={prognosticData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. FULL WIDTH ASPECT GRID (EDGE TO EDGE) */}
      <div className="card-reveal translate-y-8 w-full border-y border-[#C9BEB1]/30 bg-white">
        <TriangularAspectGrid 
          planets={planets} 
          title="Siatka Aspektów [Harmonika Geometryczna]" 
          colorClass="text-[#1F2226]"
          onHover={handleShowTooltip}
          onLeave={handleHideTooltip}
        />
      </div>

      {/* 3. LOWER DASHBOARD (CONSTRAINED 1500px) */}
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        {/* Analytical Data Panel */}
        <DataPanel planets={planets} aspects={aspects} houses={houses} />

        {/* Detailed Ephemeris Table */}
        <div className="card-reveal translate-y-8 mt-20 pt-20 border-t border-[#C9BEB1]/20">
          <div className="text-center mb-10">
            <h3 className="font-serif italic text-3xl text-[#1F2226] font-bold">Macierz Astronomiczna</h3>
            <p className="text-[#8C8883] text-xs font-mono mt-2 tracking-widest uppercase font-bold">Protokół Głębokich Danych v1.0</p>
          </div>
          <EphemerisTable 
            planets={planets} 
            houses={houses} 
            onHouseSystemChange={onHouseSystemChange} 
          />
          
        </div>
      </div>

      {/* GLOBAL PREMIUM TOOLTIP (Portal Style) */}
      {tooltip && (
        <div 
          className="fixed z-[9999] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="bg-[#FBF7F1]/95 backdrop-blur-md border border-[#C9BEB1] text-[#1F2226] p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-[11px] whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 -translate-x-1/2 -translate-y-[120%]">
            <div className="font-serif italic text-[#8C8883] mb-1 border-b border-[#C9BEB1]/50 pb-1 font-bold text-[10px]">Aspekt</div>
            <div className="font-mono tracking-tight font-bold">{tooltip.content}</div>
          </div>
        </div>
      )}

      </div>

    {/* TRANSIT LABORATORY */}
    {showLaboratory && (
      <TransitLaboratory 
        chartData={chartData}
        transitData={transitData}
        onClose={() => setShowLaboratory(false)}
        activePlanets={activePlanets}
        activeAspects={activeAspects}
        onTimeChange={onTimeChange}
        showTimeMachine={showTimeMachine}
        onToggleTimeMachine={onToggleTimeMachine}
      />
    )}
  </>
);
}
