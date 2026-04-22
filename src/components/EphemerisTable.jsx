import React from 'react';
import { Shield, Activity, Compass, Wind, Award, Zap } from 'lucide-react';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';
import { getDignity } from '../utils/astroDignities';

const EphemerisTable = ({ planets, houses }) => {
  if (!planets || !houses) return null;

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
                          {p.degreeInSign} {t(p.sign)}
                        </span>
                        {p.isRetrograde && (
                          <span className="inline-flex items-center gap-1 text-[8px] font-bold text-red-600 font-mono tracking-widest uppercase">
                             <Zap size={8} /> Retrograde
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#8C8883] font-bold">
                      {p.latFormatted || '0° 00\' 00"'}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#8C8883] font-bold">
                      {p.declFormatted || '0° 00\' 00"'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Wind size={10} className={p.speed < 0 ? 'text-red-500' : 'text-green-600'} />
                        <span className={`font-mono text-[10px] font-bold ${p.speed < 0 ? 'text-red-600' : 'text-[#1F2226]'}`}>
                          {p.speed.toFixed(4)}°/d
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#F1E9DE] border border-[#C9BEB1]/50 text-[10px] font-mono font-bold text-[#1F2226]">
                          {p.house}
                       </span>
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
        {/* 2. HOUSE CUSPS [PLACIDUS ENGINE] */}
        <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#1F2226]" />
              <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Wierzchołki Domów</h3>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#8C8883] font-bold">System Placidusa</span>
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
                  <span>{c.degreeInSign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CALCULATED NODES & POINTS */}
        <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-[#C9BEB1]/50 bg-[#E6DDD2]">
              <h3 className="font-serif italic text-xl text-[#1F2226] font-bold">Punkty Matematyczne</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-[#C9BEB1]/30">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">Ascendent [AC]</span>
                  <span className="text-sm font-serif italic text-[#1F2226] font-bold">{houses.ascendant.formatted}</span>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-[#1F2226]/60">Decl: {houses.ascendant.declination}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-[#C9BEB1]/30">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">Medium Coeli [MC]</span>
                  <span className="text-sm font-serif italic text-[#1F2226] font-bold">{houses.midheaven.formatted}</span>
                </div>
                <div className="text-right">
                   <div className="text-[9px] font-mono text-[#1F2226]/60">Decl: {houses.midheaven.declination}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-[#C9BEB1]/30 bg-[#F1E9DE]/50 flex items-center gap-3">
            <Shield size={14} className="text-[#D4AF37]" />
            <div className="flex flex-col">
              <p className="text-[8px] text-[#1F2226] font-bold uppercase tracking-widest">Engine: Swiss Ephemeris Native 2.10.03</p>
              <p className="text-[8px] text-[#8C8883] uppercase tracking-tighter">Calculation: Topocentric / JPL DE441 Standard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EphemerisTable;
