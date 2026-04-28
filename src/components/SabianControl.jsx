import React, { useState } from 'react';
import { Sparkles, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const SabianControl = ({ onOpenLab, onOpenLibrary, isActive, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Symbole Sabiańskie</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
            className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all ${
              isActive ? 'bg-[#D4AF37] text-[#1F2226]' : 'bg-[#1F2226] text-[#F1E9DE]'
            }`}
          >
            {isActive ? 'Aktywne' : 'Wyłączone'}
          </div>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <p className="text-[10px] text-[#8C8883] italic leading-relaxed">
            360 archetypowych obrazów — każdy stopień zodiaku niesie unikalną energię. 
            Obliczamy z regułą ceiling (zawsze w górę).
          </p>

          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={(e) => { e.preventDefault(); onOpenLab?.(); }}
              className="w-full py-2.5 bg-[#1F2226] text-[#F1E9DE] rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-black group shadow-lg"
            >
              <ExternalLink size={12} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Otwórz Laboratorium</span>
            </button>

            <button 
              onClick={(e) => { e.preventDefault(); onOpenLibrary?.(); }}
              className="w-full py-2.5 bg-[#D4AF37] text-[#1F2226] rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-[#C19B2E] group shadow-md"
            >
              <BookOpen size={12} className="text-[#1F2226]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Pełna Biblioteka</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SabianControl;