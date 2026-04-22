import React, { useState } from 'react';
import { Calendar, MapPin, Activity, Zap, Play, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const TransitControl = ({ onCalculate, isActive, onToggle, onOpenLab }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !location) return;
    setLoading(true);
    await onCalculate(date, location);
    onOpenLab?.();
    setLoading(false);
  };

  return (
    <div className="w-full bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm mt-4 transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-[#1F2226]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Moduł Tranzytów [V3-FORCE]</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all ${
              isActive ? 'bg-red-500 text-white' : 'bg-[#1F2226] text-[#F1E9DE]'
            }`}
          >
            {isActive ? 'Wyłącz' : 'Aktywuj'}
          </div>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8883]" size={14} />
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#C9BEB1]/50 rounded-lg text-xs font-mono focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8883]" size={14} />
            <input 
              type="text"
              placeholder="Lokalizacja tranzytu..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#C9BEB1]/50 rounded-lg text-xs font-serif italic focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#B8962B] disabled:bg-[#D4AF37]/50 text-[#1F2226] rounded-lg flex items-center justify-center gap-2 transition-all group"
          >
            {loading ? (
              <Zap size={14} className="animate-spin" />
            ) : (
              <>
                <Play size={12} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Oblicz Tranzyty</span>
              </>
            )}
          </button>
        </form>

        {isActive && (
          <button 
            onClick={(e) => { e.preventDefault(); onOpenLab?.(); }}
            className="w-full py-2.5 bg-[#1F2226] text-[#F1E9DE] rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-black group shadow-lg mt-2"
          >
            <ExternalLink size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Otwórz Laboratorium</span>
          </button>
        )}

        <div className="pt-2 border-t border-[#C9BEB1]/30">
          <p className="text-[9px] text-[#8C8883] italic leading-tight">
            Standard Astro.com: Planety tranzytujące zostaną naniesione na zewnętrzny krąg horoskopu urodzeniowego.
          </p>
        </div>
      </div>}
    </div>
  );
};

export default TransitControl;
