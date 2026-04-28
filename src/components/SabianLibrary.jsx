import React, { useState, useMemo } from 'react';
import { Search, X, ChevronLeft, Sparkles, BookOpen, Star, Info } from 'lucide-react';
import sabianSymbols from '../data/sabianSymbols.json';
import { ZodiacGlyph } from './Glyphs';

const SIGNS = [
  'Baran', 'Byk', 'Bliźnięta', 'Rak', 
  'Lew', 'Panna', 'Waga', 'Skorpion', 
  'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
];

export default function SabianLibrary({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSign, setSelectedSign] = useState(null);

  const filteredSymbols = useMemo(() => {
    return sabianSymbols.filter(s => {
      const matchesSearch = s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.interpretation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.id.toString() === searchTerm;
      
      const signIndex = Math.floor((s.id - 1) / 30);
      const matchesSign = selectedSign === null || signIndex === selectedSign;
      
      return matchesSearch && matchesSign;
    });
  }, [searchTerm, selectedSign]);

  const getSignName = (id) => {
    const index = Math.floor((id - 1) / 30);
    return SIGNS[index];
  };

  const getDegreeInSign = (id) => {
    const degree = (id - 1) % 30 + 1;
    return degree;
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-[#F1E9DE] flex flex-col font-sans animate-in fade-in zoom-in-95 duration-500">
      {/* HEADER */}
      <header className="px-6 py-4 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-all text-[#D4AF37]"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3 border-l border-white/10 pl-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <BookOpen size={20} className="text-[#1F2226]" />
            </div>
            <div>
              <h2 className="font-serif italic text-2xl tracking-tight leading-none">Biblioteka Symboli Sabiańskich</h2>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] mt-1">
                360 Obrazów Archetypowych
              </p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
          {SIGNS.map((sign, idx) => (
            <button
              key={sign}
              onClick={() => setSelectedSign(selectedSign === idx ? null : idx)}
              className={`p-2 rounded-full transition-all ${
                selectedSign === idx ? 'bg-[#D4AF37] text-[#1F2226]' : 'text-white/40 hover:text-white/80'
              }`}
              title={sign}
            >
              <ZodiacGlyph name={['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'][idx]} size={16} />
            </button>
          ))}
        </div>
      </header>

      {/* SEARCH BAR AREA */}
      <div className="px-6 py-6 bg-[#E6DDD2] border-b border-[#C9BEB1]/50 sticky top-[72px] z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8883] group-focus-within:text-[#D4AF37] transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Szukaj symbolu, słowa kluczowego lub numeru stopnia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-[#C9BEB1] focus:border-[#D4AF37] outline-none shadow-sm transition-all font-serif italic text-lg"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-4 py-4 bg-white/50 rounded-2xl border border-[#C9BEB1] flex items-center gap-3">
              <Info size={16} className="text-[#D4AF37]" />
              <span className="text-xs text-[#1F2226] font-bold uppercase tracking-wider">
                Znaleziono: <span className="text-[#D4AF37]">{filteredSymbols.length}</span>
              </span>
            </div>
            { (searchTerm || selectedSign !== null) && (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedSign(null); }}
                className="p-4 bg-white hover:bg-red-50 text-red-500 rounded-2xl border border-red-100 transition-all flex items-center justify-center"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SYMBOLS LIST */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-gradient-to-b from-[#F1E9DE] to-[#E6DDD2]">
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((s) => (
              <div 
                key={s.id}
                className="bg-white rounded-3xl border border-[#C9BEB1]/40 shadow-sm overflow-hidden hover:shadow-xl hover:border-[#D4AF37]/40 transition-all group animate-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${(s.id % 10) * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* LEFT INDICATOR */}
                  <div className="w-full md:w-32 bg-[#FBF7F1] border-b md:border-b-0 md:border-r border-[#C9BEB1]/20 p-6 flex flex-col items-center justify-center gap-2 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#1F2226] text-[#D4AF37] flex items-center justify-center font-mono font-bold text-lg">
                      {s.id}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-[#8C8883] uppercase tracking-tighter font-bold">Stopień</span>
                      <span className="text-sm font-serif italic text-[#1F2226]">{getDegreeInSign(s.id)}° {getSignName(s.id)}</span>
                    </div>
                  </div>
                  
                  {/* RIGHT CONTENT */}
                  <div className="flex-1 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className="text-[#D4AF37]" />
                      <h3 className="text-xl font-serif text-[#1F2226] font-bold group-hover:text-[#D4AF37] transition-colors">
                        {s.symbol}
                      </h3>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]/20 rounded-full" />
                      <p className="text-[#555] italic leading-relaxed text-lg font-serif">
                        {s.interpretation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-[#C9BEB1]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-[#C9BEB1]" />
              </div>
              <h3 className="text-2xl font-serif italic text-[#8C8883]">Nie znaleziono symboli pasujących do kryteriów...</h3>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedSign(null); }}
                className="mt-6 text-[#D4AF37] font-bold uppercase tracking-widest hover:underline"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
        
        {/* FOOTER PADDING */}
        <div className="h-20" />
      </div>
    </div>
  );
}
