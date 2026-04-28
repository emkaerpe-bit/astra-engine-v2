import React, { useState } from 'react';
import { Sparkles, Calendar, Zap, Play, ChevronDown, ChevronUp, History } from 'lucide-react';

const PrognosticControl = ({ onCalculate, isActive, onToggle, birthDate, onOpenLab }) => {
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('secondary');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onCalculate(birthDate, targetDate, type);
    onOpenLab?.();
    setLoading(false);
  };

  return (
    <div className="w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Laboratorium Czasu [V1]</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all ${
              isActive ? 'bg-amber-600 text-white' : 'bg-[#1F2226] text-[#F1E9DE]'
            }`}
          >
            {isActive ? 'Ukryj' : 'Pokaz'}
          </div>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-3">
             <div className="flex gap-2 p-1 bg-[#F1E9DE] rounded-lg border border-[#C9BEB1]/30">
               <button 
                 onClick={() => setType('secondary')}
                 className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-tighter rounded-md transition-all ${type === 'secondary' ? 'bg-[#1F2226] text-[#F1E9DE]' : 'text-[#8C8883]'}`}
               >
                 Progresje
               </button>
               <button 
                 onClick={() => setType('solar_arc')}
                 className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-tighter rounded-md transition-all ${type === 'solar_arc' ? 'bg-[#1F2226] text-[#F1E9DE]' : 'text-[#8C8883]'}`}
               >
                 Dyrekcje
               </button>
             </div>

             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8883]" size={14} />
               <input 
                 type="date"
                 value={targetDate}
                 onChange={(e) => setTargetDate(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 bg-white border border-[#C9BEB1]/50 rounded-lg text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
               />
             </div>

             <button 
               onClick={handleSubmit}
               disabled={loading}
               className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#B8962B] text-[#1F2226] rounded-lg flex items-center justify-center gap-2 transition-all group font-bold text-[10px] uppercase tracking-widest"
             >
               {loading ? <Zap size={14} className="animate-spin" /> : <Play size={12} />}
               Podróżuj w Czasie
             </button>
          </div>

          {isActive && (
            <button 
              onClick={(e) => { e.preventDefault(); onOpenLab?.(); }}
              className="w-full py-2.5 bg-[#1F2226] text-[#F1E9DE] rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-black group shadow-lg mt-2"
            >
              <History size={12} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Otwórz Lab Progresji</span>
            </button>
          )}

          <div className="pt-2 border-t border-[#C9BEB1]/30 flex items-center gap-2 text-[9px] text-[#8C8883] italic">
            <History size={10} />
            Metoda: {type === 'secondary' ? 'Wtórna (1d=1y)' : 'Łuk Słońca'}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrognosticControl;
