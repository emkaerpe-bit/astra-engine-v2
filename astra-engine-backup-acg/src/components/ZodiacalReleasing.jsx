import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronDown, Info, Star, Zap, Clock } from 'lucide-react';
import { ZodiacGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const ZODIAC_COLORS = {
  Aries: '#FF4136', Taurus: '#FF851B', Gemini: '#FFDC00', Cancer: '#2ECC40',
  Leo: '#0074D9', Virgo: '#B10DC9', Libra: '#F012BE', Scorpio: '#85144b',
  Sagittarius: '#39CCCC', Capricorn: '#3D9970', Aquarius: '#01FF70', Pisces: '#7FDBFF'
};

const ZodiacalReleasing = ({ data, peakSigns = [], lots = [], isDark = false }) => {
  const [activeLot, setActiveLot] = useState('spirit');
  const [expandedL1, setExpandedL1] = useState(null);

  if (!data) return null;

  const currentTimeline = data[activeLot] || [];
  const activeLotData = lots.find(l => l.key === activeLot);

  return (
    <div className={`card-reveal translate-y-8 ${isDark ? 'bg-transparent border-white/10' : 'mt-12 bg-[#FBF7F1] border-[#C9BEB1] shadow-sm'} border rounded-2xl overflow-hidden`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-white/5 border-b border-white/10' : 'bg-[#E6DDD2] border-b border-[#C9BEB1]/50'} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Calendar className={isDark ? 'text-white' : 'text-[#1F2226]'} size={20} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-serif italic text-xl ${isDark ? 'text-white' : 'text-[#1F2226]'} leading-none`}>Zodiacal Releasing</h3>
              {activeLotData && (
                <span className={`font-mono text-[10px] ${isDark ? 'bg-white/10 text-white' : 'bg-[#1F2226] text-[#F1E9DE]'} px-2 py-0.5 rounded`}>
                  {activeLotData.degree}° {activeLotData.minutes}' {t(activeLotData.sign)}
                </span>
              )}
            </div>
            <p className={`text-[9px] font-mono uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-[#8C8883]'} mt-1 font-bold`}>Chronometryczny System Uwalniania Losu</p>
          </div>
        </div>
        
        <div className={`flex ${isDark ? 'bg-black/20' : 'bg-white/50'} p-1 rounded-lg border ${isDark ? 'border-white/5' : 'border-[#C9BEB1]/30'}`}>
          <button 
            onClick={() => setActiveLot('spirit')}
            className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-widest transition-all ${
              activeLot === 'spirit' 
                ? (isDark ? 'bg-white/10 text-white shadow-lg' : 'bg-[#1F2226] text-[#F1E9DE] shadow-md')
                : (isDark ? 'text-white/40 hover:text-white' : 'text-[#1F2226]/50 hover:text-[#1F2226]')
            }`}
          >
            Punkt Ducha
          </button>
          <button 
            onClick={() => setActiveLot('fortune')}
            className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-widest transition-all ${
              activeLot === 'fortune' 
              ? (isDark ? 'bg-white/10 text-white shadow-lg' : 'bg-[#1F2226] text-[#F1E9DE] shadow-md')
              : (isDark ? 'text-white/40 hover:text-white' : 'text-[#1F2226]/50 hover:text-[#1F2226]')
            }`}
          >
            Punkt Fortuny
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {currentTimeline.map((l1, idx) => {
            const isPeak = peakSigns.includes(Object.keys(ZODIAC_COLORS).indexOf(l1.sign));
            const isExpanded = expandedL1 === idx;

            return (
              <div key={`l1-${idx}`} className={`rounded-xl border transition-all duration-300 ${
                isExpanded 
                  ? (isDark ? 'border-[#D4AF37] bg-white/5 shadow-xl' : 'border-[#D4AF37] bg-white shadow-md')
                  : (isDark ? 'border-white/5 hover:border-white/20' : 'border-[#C9BEB1]/30 hover:border-[#C9BEB1]')
              }`}>
                {/* L1 Header */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedL1(isExpanded ? null : idx)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#F1E9DE] border border-[#C9BEB1]/20'}`}>
                      <ZodiacGlyph name={l1.sign} size={20} style={{ color: ZODIAC_COLORS[l1.sign] }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-serif italic text-lg ${isDark ? 'text-white' : 'text-[#1F2226]'}`}>{t(l1.sign)}</span>
                        {isPeak && (
                          <span className="flex items-center gap-1 bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">
                            <Zap size={8} /> Peak
                          </span>
                        )}
                      </div>
                      <div className={`font-mono text-[10px] ${isDark ? 'text-white/40' : 'text-[#8C8883]'} font-bold`}>
                        {new Date(l1.startDate).toLocaleDateString('pl-PL')} — {new Date(l1.endDate).toLocaleDateString('pl-PL')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                     <div className="text-right">
                        <div className={`text-[10px] font-mono uppercase ${isDark ? 'text-white/20' : 'text-[#8C8883]'} font-bold`}>Poziom 1</div>
                        <div className={`text-xs font-serif italic ${isDark ? 'text-white/60' : 'text-[#1F2226]'} font-bold`}>Władca Czasu</div>
                     </div>
                     <div className={isDark ? 'text-white/20' : 'text-[#1F2226]/50'}>
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                     </div>
                  </div>
                </div>

                {/* L2 Subperiods */}
                {isExpanded && (
                  <div className={`px-4 pb-4 border-t ${isDark ? 'border-white/5' : 'border-[#F1E9DE]'} animate-in slide-in-from-top-2 duration-300`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
                      {l1.subPeriods?.map((l2, sIdx) => {
                        const l2Peak = peakSigns.includes(Object.keys(ZODIAC_COLORS).indexOf(l2.sign));
                        return (
                          <div key={`l2-${sIdx}`} className={`p-3 rounded-lg border relative overflow-hidden transition-all ${
                            l2Peak 
                              ? (isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30' : 'bg-[#D4AF37]/5 border-[#D4AF37]/30')
                              : (isDark ? 'bg-black/20 border-white/5' : 'bg-[#FBF7F1] border-[#C9BEB1]/20')
                          }`}>
                            {l2.isLB && (
                              <div className="absolute top-0 right-0 bg-[#FF4136] text-white text-[7px] px-1.5 py-0.5 font-bold uppercase tracking-tighter rounded-bl">
                                LB (Bond)
                              </div>
                            )}
                            <div className="flex items-center gap-2 mb-1">
                              <ZodiacGlyph name={l2.sign} size={12} style={{ color: ZODIAC_COLORS[l2.sign] }} />
                              <span className={`font-serif italic text-xs ${isDark ? 'text-white/90' : 'text-[#1F2226]'}`}>{t(l2.sign)}</span>
                            </div>
                            <div className={`font-mono text-[8px] ${isDark ? 'text-white/40' : 'text-[#8C8883]'} leading-none mb-1 font-bold`}>
                              {new Date(l2.startDate).toLocaleDateString('pl-PL')}
                            </div>
                            {l2Peak && <div className="text-[7px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest mt-1">Sub-Peak Period</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer / Legend */}
      <div className={`${isDark ? 'bg-black/40 border-t border-white/5' : 'bg-[#F1E9DE] border-t border-[#C9BEB1]/30'} px-6 py-3 flex flex-wrap gap-6 items-center`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className={`text-[9px] font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-[#8C8883]'} font-bold`}>Peak (Okres Szczytowy)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF4136]" />
          <span className={`text-[9px] font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-[#8C8883]'} font-bold`}>LB (Rozwiązanie Więzi)</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Clock size={12} className={isDark ? 'text-white/20' : 'text-[#8C8883]'} />
          <span className={`text-[9px] font-mono uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-[#8C8883]'} font-bold italic`}>Standard Valensa (Julian 365.25)</span>
        </div>
      </div>
    </div>
  );
};

export default ZodiacalReleasing;
