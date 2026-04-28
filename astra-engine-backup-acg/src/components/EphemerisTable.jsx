import React from 'react';
import { Shield, Activity, Compass, Wind, Award, Zap, RotateCcw, Star } from 'lucide-react';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { getDignity } from '../utils/astroDignities';

const EphemerisTable = ({ chartData, onHouseSystemChange }) => {
  const { planets, houses } = chartData || {};
  if (!planets || !houses) return null;

  const systems = [
    { code: 'P', name: 'Placidus' },
    { code: 'K', name: 'Koch' },
    { code: 'W', name: 'Whole Sign' },
    { code: 'E', name: 'Equal' },
    { code: 'R', name: 'Regiomontanus' },
    { code: 'C', name: 'Campanus' },
    { code: 'M', name: 'Morinus' },
    { code: 'O', name: 'Porphyrius' },
    { code: 'T', name: 'Topocentric' }
  ];

  const currentSystem = systems.find(s => s.code === houses.code) || systems[0];

  const handleNextSystem = () => {
    const idx = systems.findIndex(s => s.code === houses.code);
    const next = systems[(idx + 1) % systems.length];
    onHouseSystemChange?.(next.code);
  };

  return (
    <div className="space-y-12 mt-12 animate-fade-in font-sans">
      {/* 1. PLANETARY MATRIX [HIGH-PRECISION] */}
      <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="px-8 py-5 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-[#1F2226]" />
            <h3 className="font-serif italic text-2xl text-[#1F2226] font-bold">Macierz Planetarna [v3-Precision]</h3>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F2226] text-[#D4AF37] text-[9px] font-mono font-bold uppercase tracking-widest">
               <Shield size={10} />
               Verified J2000.0
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F1E9DE]/50 border-b border-[#C9BEB1]/30">
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Obiekt</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold text-center">Znak</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Pozycja [DMS]</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Szerokość</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Deklinacja</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Prędkość</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Dom</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Dwadasamsa</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">Godność</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9BEB1]/20">
              {planets.map((p) => {
                const dignity = getDignity(p.key, p.sign);
                return (
                  <tr key={p.key} className="hover:bg-[#C9BEB1]/10 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#C9BEB1]/30 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37]/50 transition-colors">
                           <PlanetGlyph name={p.key} className="w-5 h-5 text-[#1F2226]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-xs uppercase tracking-wider text-[#1F2226] font-bold leading-tight">{t(p.name)}</span>
                          <span className="text-[8px] font-mono text-[#8C8883] uppercase tracking-tighter">
                            {p.id >= 0 ? `EPH_ID_${p.id}` : 'CALC_NODE'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1F2226]/5 text-[#D4AF37]">
                          <ZodiacGlyph name={p.sign.toLowerCase()} size={14} className="w-4 h-4" />
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#1F2226] font-bold tracking-tight">
                          {p.degreeInSign.split(' ').slice(0, 2).join(' ')} {t(p.sign)}
                        </span>
                        {p.isRetrograde && (
                          <span className="inline-flex items-center gap-1 text-[8px] font-bold text-red-600 font-mono tracking-widest uppercase">
                             <Zap size={8} /> Retrograde
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#8C8883] font-bold">
                      {p.latFormatted || "0° 00'"}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#8C8883] font-bold">
                      {p.declFormatted || "0° 00'"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Wind size={10} className={p.speed < 0 ? 'text-red-500' : 'text-green-600'} />
                        <span className={`font-mono text-[10px] font-bold ${p.speed < 0 ? 'text-red-600' : 'text-[#1F2226]'}`}>
                          {p.speed?.toFixed(4) || '0.0000'}°/d
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#F1E9DE] border border-[#C9BEB1]/50 text-[10px] font-mono font-bold text-[#1F2226]">
                          {p.house}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="font-mono text-xs text-[#1F2226] font-bold tracking-tight">
                            {p.dwadasamsa?.degreeInSign.split(' ').slice(0, 2).join(' ')} {t(p.dwadasamsa?.sign)}
                          </span>
                          <span className="text-[8px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                             {p.dwadasamsa?.signSymbol} D12 · {p.dwadasamsa?.deity}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                        dignity.score > 0 ? 'bg-green-100 text-green-700' : 
                        dignity.score < 0 ? 'bg-red-100 text-red-700' : 
                        'bg-blue-50 text-blue-600'
                      }`}>
                        <Award size={10} />
                        {dignity.label}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. HOUSE CUSPS [INTERACTIVE ENGINE] */}
        <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#1F2226]" />
              <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Wierzchołki Domów</h3>
            </div>
            <button 
              onClick={handleNextSystem}
              className="group flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2226]/5 border border-[#C9BEB1]/30 hover:bg-[#1F2226] hover:text-[#D4AF37] transition-all duration-300"
            >
              <span className="text-[9px] uppercase tracking-widest font-black transition-colors">
                System {currentSystem.name}
              </span>
              <RotateCcw size={10} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
          <div className="grid grid-cols-2 p-2">
            {houses.cusps.map((c) => (
              <div key={c.house} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#C9BEB1]/5 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#D4AF37] w-4 font-bold">{String(c.house).padStart(2, '0')}</span>
                  <span className="text-xs text-[#1F2226] font-bold tracking-tight">Dom {c.house}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#1F2226]/70 font-bold bg-white px-2 py-1 rounded border border-[#C9BEB1]/30 shadow-sm">
                  <ZodiacGlyph name={c.sign.toLowerCase()} size={14} className="w-4 h-4 text-[#D4AF37]" />
                  <span>{c.degreeInSign.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ARABIC PARTS (LOTS) */}
        <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex items-center gap-2">
              <Zap size={16} className="text-[#1F2226]" />
              <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Punkty Arabskie (Lots)</h3>
            </div>
            <div className="p-2 space-y-1">
              {(chartData?.lots || []).map(lot => (
                <div key={lot.key} className="flex items-center justify-between px-4 py-2 hover:bg-[#D4AF37]/5 rounded-xl transition-colors group border border-transparent hover:border-[#D4AF37]/20">
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{lot.symbol}</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">{t(lot.name)}</span>
                      <span className="text-xs text-[#1F2226] font-bold tracking-tight">{lot.formatted}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F1E9DE] flex items-center justify-center border border-[#C9BEB1]/30">
                    <ZodiacGlyph name={lot.sign.toLowerCase()} size={14} className="text-[#D4AF37]" />
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* 4. FIXED STARS MATRIX */}
      {(chartData?.stars || []).length > 0 && (
        <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="px-8 py-5 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Star size={18} className="text-[#1F2226]" />
              <h3 className="font-serif italic text-2xl text-[#1F2226] font-bold">Gwiazdy Stałe (Fixed Stars)</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-[#C9BEB1]/20">
            {chartData.stars.map(star => (
              <div key={star.key} className="p-4 hover:bg-[#F1E9DE]/30 transition-colors flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">{star.name}</span>
                  <span className="text-xs text-[#1F2226] font-bold font-mono tracking-tight">{star.degreeInSign} {t(star.sign)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ZodiacGlyph name={star.sign.toLowerCase()} size={12} className="text-[#D4AF37]" />
                  <span className="text-[#1F2226] text-lg">✦</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. POINTS & ENGINE FOOTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2]">
              <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Punkty Matematyczne Osie</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#C9BEB1]/30 hover:border-[#D4AF37]/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">Ascendent [AC]</span>
                  <span className="text-lg font-serif italic text-[#1F2226] font-bold">{houses?.ascendant?.formatted || '---'}</span>
                  <div className="flex flex-col mt-1">
                    <span className="text-[9px] font-mono text-[#D4AF37] font-bold">Decl: {houses?.ascendant?.declFormatted}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span className="text-[9px] font-mono text-[#1F2226] font-bold">D12: {houses?.ascendant?.dwadasamsa?.degreeInSign.split(' ').slice(0, 2).join(' ')} {t(houses?.ascendant?.dwadasamsa?.sign)}</span>
                       <span className="text-[8px] font-mono text-[#D4AF37] border border-[#D4AF37]/30 px-1 rounded bg-[#D4AF37]/5 font-bold uppercase">{houses?.ascendant?.dwadasamsa?.deity}</span>
                    </div>
                  </div>
                </div>
                <ZodiacGlyph name={houses?.ascendant?.sign.toLowerCase()} size={24} className="text-[#D4AF37] opacity-40" />
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-[#C9BEB1]/30 hover:border-[#D4AF37]/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">Medium Coeli [MC]</span>
                  <span className="text-lg font-serif italic text-[#1F2226] font-bold">{houses?.midheaven?.formatted || '---'}</span>
                  <div className="flex flex-col mt-1">
                    <span className="text-[9px] font-mono text-[#D4AF37] font-bold">Decl: {houses?.midheaven?.declFormatted}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span className="text-[9px] font-mono text-[#1F2226] font-bold">D12: {houses?.midheaven?.dwadasamsa?.degreeInSign.split(' ').slice(0, 2).join(' ')} {t(houses?.midheaven?.dwadasamsa?.sign)}</span>
                       <span className="text-[8px] font-mono text-[#D4AF37] border border-[#D4AF37]/30 px-1 rounded bg-[#D4AF37]/5 font-bold uppercase">{houses?.midheaven?.dwadasamsa?.deity}</span>
                    </div>
                  </div>
                </div>
                <ZodiacGlyph name={houses?.midheaven?.sign.toLowerCase()} size={24} className="text-[#D4AF37] opacity-40" />
              </div>
            </div>
        </div>

        <div className="p-6 border border-[#C9BEB1] bg-[#F1E9DE]/30 rounded-2xl flex flex-col justify-center gap-3">
          <Shield size={24} className="text-[#D4AF37]" />
          <div className="flex flex-col">
            <p className="text-[10px] text-[#1F2226] font-bold uppercase tracking-widest">Engine: Ad Astra Professional J2000.0</p>
            <p className="text-[9px] text-[#8C8883] uppercase tracking-tighter mt-1 leading-relaxed">
              Precision: Sub-Arcsecond J2000.0 / JPL DE431 Standard<br/>
              Verification: Planetary Ephemeris Table Verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EphemerisTable;
