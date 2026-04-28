import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const DispositorControl = ({ onOpenLab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[320px] bg-[#FBF7F1] border border-[#C9BEB1] rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[#E6DDD2] flex items-center justify-between border-b border-[#C9BEB1]/50 hover:bg-[#DDD1C3] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-[#1F2226]" />
          <span className="font-mono text-[10px] text-[#1F2226] tracking-widest uppercase font-bold">Laboratorium Dyspozycji [V1]</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            onClick={(e) => { e.stopPropagation(); onOpenLab(); }}
            className="px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest bg-[#1F2226] text-[#F1E9DE] hover:bg-black transition-all"
          >
            Aktywuj
          </div>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <p className="text-[9px] text-[#8C8883] italic leading-tight">
            Analiza hierarchiczna łańcuchów władztwa i terytoriów planetarnych. Tryb zaawansowany z mapą historyczną.
          </p>
          <button 
            onClick={(e) => { e.preventDefault(); onOpenLab(); }}
            className="w-full py-2.5 bg-[#1F2226] text-[#F1E9DE] rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-black group shadow-lg"
          >
            <ExternalLink size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Otwórz Laboratorium</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DispositorControl;
