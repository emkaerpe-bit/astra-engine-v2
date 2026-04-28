import React, { useState } from 'react';
import { X, ShieldCheck, Layers, Activity } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import DispositorAnalysis from './DispositorAnalysis';

const DispositorLaboratory = ({ isOpen, onClose, chartData, activePlanets, activeAspects }) => {
  const [system, setSystem] = useState('traditional');
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  
  if (!isOpen || !chartData) return null;

  const currentDispositors = system === 'traditional' 
    ? chartData.dispositorsTraditional 
    : chartData.dispositorsModern;

  const summary = currentDispositors?.summary || {};

  const dispositorContext = {
    selectedPlanet,
    system,
    subjects: selectedPlanet ? {
      direct: summary[selectedPlanet]?.directSubjects || [],
      indirect: summary[selectedPlanet]?.indirectSubjects || []
    } : null
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F1E9DE] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
      {/* 1. PROFESSIONAL HEADER */}
      <header className="px-6 py-2 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <Layers size={16} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-lg tracking-tight leading-none">Dispositor Laboratory</h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mt-1">
              Hierarchical Chain Analysis [Territory Mode]
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-[#D4AF37]" />
              <span className="text-[8px] font-mono text-white/80 font-bold uppercase tracking-widest">Deep Rulership Protocol</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#F1E9DE]/20 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* 2. MAIN LAB AREA */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Section: Visual Engine (Tightened SVG fills this area naturally) */}
        <div className="flex-[1.5] relative bg-[#F1E9DE] flex flex-col items-center justify-center overflow-hidden border-r border-[#C9BEB1]/30">
          <div className="w-full h-full flex items-center justify-center p-0">
             <ZodiacWheel 
               visible={true}
               chartData={chartData}
               activePlanets={activePlanets}
               activeAspects={activeAspects}
               dispositorContext={dispositorContext}
             />
           </div>
        </div>

        {/* Right Section: Analytical Intelligence */}
        <div className="flex-1 bg-[#FBF7F1] overflow-y-auto custom-scrollbar border-l border-[#C9BEB1]/20">
          <div className="p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="font-serif italic text-3xl text-[#1F2226] font-bold">Macierz Dyspozycji</h3>
              <p className="text-[#8C8883] text-[10px] font-mono mt-1 tracking-widest uppercase font-bold">
                Final Dispositor & Rulership Web
              </p>
            </div>

            <DispositorAnalysis 
              dispositorsTraditional={chartData.dispositorsTraditional}
              dispositorsModern={chartData.dispositorsModern}
              planets={chartData.planets}
              houses={chartData.houses}
              externalSystem={system}
              setExternalSystem={setSystem}
              externalSelectedPlanet={selectedPlanet}
              setExternalSelectedPlanet={setSelectedPlanet}
            />

            <div className="mt-12 space-y-4">
              <h4 className="font-serif italic text-xl text-[#1F2226]">Protokoły Terytorialne</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 rounded-xl border border-[#C9BEB1]/30 bg-white/50 flex gap-4">
                   <div className="w-2 h-full bg-[#D4AF37] opacity-20 rounded-full" />
                   <div>
                     <p className="text-xs font-bold text-[#1F2226]">Tryb Terytorium</p>
                     <p className="text-[10px] text-[#8C8883] mt-1 leading-relaxed">
                       Wybierz planetę z macierzy, aby zobaczyć jej "strefę wpływu" na kole zodiakalnym. Znaki, którymi włada, zostaną podświetlone. 
                       <strong> Pełny kolor</strong> oznacza władztwo bezpośrednie, a <strong>kreskowanie</strong> wpływ pośredni.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. STATUS BAR */}
      <footer className="px-6 py-2 bg-[#F1E9DE] border-t border-[#C9BEB1]/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
           <span className="text-[8px] font-mono uppercase tracking-widest text-[#8C8883]">System: J2000.0</span>
           <span className="text-[8px] font-mono uppercase tracking-widest text-[#8C8883]">House System: {chartData.houses.system}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-[#1F2226] font-bold">Neural Link Active</span>
        </div>
      </footer>
    </div>
  );
};

export default DispositorLaboratory;
