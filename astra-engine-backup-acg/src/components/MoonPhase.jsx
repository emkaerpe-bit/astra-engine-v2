import React from 'react';
import { Moon } from 'lucide-react';

const MOON_PHASES = [
  { name: 'Nów', icon: '🌑', range: [0, 22.5] },
  { name: 'Przybywający Sierp', icon: '🌒', range: [22.5, 67.5] },
  { name: 'Pierwsza Kwadra', icon: '🌓', range: [67.5, 112.5] },
  { name: 'Przybywający Garb', icon: '🌔', range: [112.5, 157.5] },
  { name: 'Pełnia', icon: '🌕', range: [157.5, 202.5] },
  { name: 'Ubywający Garb', icon: '🌖', range: [202.5, 247.5] },
  { name: 'Ostatnia Kwadra', icon: '🌗', range: [247.5, 292.5] },
  { name: 'Ubywający Sierp', icon: '🌘', range: [292.5, 337.5] },
  { name: 'Nów', icon: '🌑', range: [337.5, 360] },
];

export default function MoonPhase({ sunLng, moonLng }) {
  const angle = (moonLng - sunLng + 360) % 360;
  
  const phase = MOON_PHASES.find(p => angle >= p.range[0] && angle < p.range[1]) || MOON_PHASES[0];
  
  const illumination = Math.round((1 - Math.cos(angle * Math.PI / 180)) / 2 * 100);

  return (
    <div className="card-reveal translate-y-4 rounded border border-[#C9BEB1] bg-[#FBF7F1] shadow-sm w-full overflow-hidden mt-4">
      <div className="bg-[#E6DDD2] px-3 py-1.5 border-b border-[#C9BEB1]/50 flex items-center justify-between">
        <h3 className="font-mono text-[9px] text-[#1F2226] tracking-widest uppercase font-bold">— Faza Księżyca</h3>
        <span className="text-[8px] font-mono text-[#8C8883] font-bold uppercase tracking-tighter">Luminancja: {illumination}%</span>
      </div>
      
      <div className="p-4 flex items-center gap-6">
        <div className="relative w-16 h-16 flex items-center justify-center bg-[#1F2226] rounded-full shadow-inner border-2 border-[#C9BEB1]/20">
           <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
             {phase.icon}
           </div>
           {/* Subtle Orbit Effect */}
           <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
        </div>
        
        <div className="flex-1">
          <div className="text-[10px] font-mono text-[#8C8883] uppercase tracking-widest mb-1 font-bold">Aktualna Faza</div>
          <div className="font-serif italic text-xl text-[#1F2226] font-bold leading-tight">
            {phase.name}
          </div>
          <div className="mt-2 h-1 w-full bg-[#E6DDD2] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4AF37] transition-all duration-1000" 
              style={{ width: `${illumination}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="px-3 py-2 bg-[#F1E9DE]/50 border-t border-[#C9BEB1]/20 flex justify-between items-center">
         <span className="text-[8px] font-mono text-[#8C8883] uppercase font-bold tracking-widest">Kąt fazowy:</span>
         <span className="text-[10px] font-mono text-[#1F2226] font-bold">{angle.toFixed(1)}°</span>
      </div>
    </div>
  );
}
