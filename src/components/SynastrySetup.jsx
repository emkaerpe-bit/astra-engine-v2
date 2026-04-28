import React, { useState } from 'react';
import { Users, Heart, Star, Plus, User, ArrowRight, X } from 'lucide-react';

export default function SynastrySetup({ onCalculate, onBack, history = [], onSelectFromHistory }) {
  const [personA, setPersonA] = useState(null);
  const [personB, setPersonB] = useState(null);
  const [isManualA, setIsManualA] = useState(false);
  const [isManualB, setIsManualB] = useState(false);
  const [manualA, setManualA] = useState({ name: '', date: '1990-01-01', time: '12:00', location: '' });
  const [manualB, setManualB] = useState({ name: '', date: '1995-01-01', time: '12:00', location: '' });
  
  const [zodiacA, setZodiacA] = useState('tropical');
  const [zodiacB, setZodiacB] = useState('draconic');
  const [selectingFor, setSelectingFor] = useState(null); 

  const handleSelect = (person) => {
    if (selectingFor === 'A') {
      setPersonA(person);
      setIsManualA(false);
    }
    if (selectingFor === 'B') {
      setPersonB(person);
      setIsManualB(false);
    }
    setSelectingFor(null);
  };

  const isReady = (personA || (isManualA && manualA.name && manualA.location)) && 
                  (personB || (isManualB && manualB.name && manualB.location));

  const handleCalculateTrigger = () => {
    const finalA = isManualA ? manualA : personA;
    const finalB = isManualB ? manualB : personB;
    onCalculate(finalA, zodiacA, finalB, zodiacB);
  };

  const ZODIAC_TYPES = [
    { value: 'tropical', label: 'Tropikalny' },
    { value: 'sidereal', label: 'Syderyczny' },
    { value: 'draconic', label: 'Drakoniczny' },
    { value: 'heliocentric', label: 'Heliocentryczny' },
    { value: 'galactic', label: 'Galaktyczny' }
  ];

  const ManualForm = ({ data, setData }) => (
    <div className="w-full space-y-3 animate-in fade-in duration-500">
      <input 
        type="text" placeholder="Imię" value={data.name} 
        onChange={e => setData({...data, name: e.target.value})}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
      />
      <div className="flex gap-2">
        <input 
          type="date" value={data.date} 
          onChange={e => setData({...data, date: e.target.value})}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-[#D4AF37]"
        />
        <input 
          type="time" value={data.time} 
          onChange={e => setData({...data, time: e.target.value})}
          className="w-24 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-[#D4AF37]"
        />
      </div>
      <input 
        type="text" placeholder="Miejsce urodzenia" value={data.location} 
        onChange={e => setData({...data, location: e.target.value})}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1E9DE] flex flex-col font-sans text-[#1F2226] overflow-hidden">
      {/* SELECTION OVERLAY */}
      {selectingFor && (
        <div className="fixed inset-0 z-[100] bg-[#1F2226]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-[#F1E9DE] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-[#C9BEB1]/30 flex items-center justify-between">
              <h2 className="font-serif italic text-3xl">Wybierz z bazy [Koło {selectingFor}]</h2>
              <button onClick={() => setSelectingFor(null)} className="p-2 hover:bg-black/5 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-20 opacity-30 italic">Baza danych jest pusta...</div>
              ) : (
                history.map((entry, idx) => (
                  <button 
                    key={entry.id || idx}
                    onClick={() => handleSelect(entry)}
                    className="w-full flex items-center justify-between p-5 rounded-2xl border border-[#C9BEB1]/30 bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full bg-[#1F2226] text-[#D4AF37] flex items-center justify-center font-serif italic text-lg">
                        {entry.name?.[0] || '?'}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1F2226]">{entry.name}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C8883]">{entry.date}</div>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-[#C9BEB1] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* LUXE HEADER */}
      <header className="px-10 py-12 bg-[#1F2226] text-[#F1E9DE] relative overflow-hidden shrink-0 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[radial-gradient(circle_at_center,_#D4AF37_0%,transparent_70%)] opacity-20 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <Heart size={18} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] font-black">Universal Bi-Wheel Setup</span>
            </div>
            <h1 className="font-serif italic text-5xl md:text-6xl tracking-tighter leading-none">
              Cosmic <span className="text-[#D4AF37]/30">—</span> <span className="opacity-40">Intersection</span>
            </h1>
          </div>
          <button onClick={onBack} className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
            <X size={14} /> Zamknij Konfigurator
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-10 flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 w-full justify-center mb-12">
          
          {/* PERSON A */}
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8C8883] text-center">Koło Wewnętrzne (Radix)</div>
            <div 
              className={`flex-1 min-h-[350px] rounded-[2.5rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 relative overflow-hidden ${
                (personA || isManualA) ? 'bg-[#1F2226] border-[#D4AF37] shadow-2xl' : 'bg-white/50 border-[#C9BEB1] hover:border-[#D4AF37] hover:bg-white'
              }`}
            >
              {!personA && !isManualA ? (
                <div className="text-center space-y-4">
                   <button onClick={() => setSelectingFor('A')} className="w-full py-4 bg-[#1F2226] text-white rounded-2xl font-serif italic text-lg hover:bg-black transition-colors px-6">Wybierz z bazy</button>
                   <div className="text-[10px] font-mono uppercase opacity-30">lub</div>
                   <button onClick={() => setIsManualA(true)} className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:underline">Wpisz ręcznie</button>
                </div>
              ) : isManualA ? (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">Wpis Ręczny</span>
                    <button onClick={() => setIsManualA(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
                  </div>
                  <ManualForm data={manualA} setData={setManualA} />
                </div>
              ) : (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <User size={28} className="text-[#1F2226]" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-[#F1E9DE] mb-1">{personA.name}</h3>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] opacity-60">{personA.date}</p>
                  <button onClick={() => setPersonA(null)} className="mt-4 text-[8px] font-mono uppercase text-white/40 hover:text-white underline">Zmień</button>
                </div>
              )}
            </div>
            
            <select 
              value={zodiacA} 
              onChange={(e) => setZodiacA(e.target.value)}
              className="w-full bg-white border border-[#C9BEB1]/50 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1F2226] outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              {ZODIAC_TYPES.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
             <div className="w-16 h-16 rounded-full bg-white shadow-xl border border-[#C9BEB1]/30 flex items-center justify-center">
                <Heart size={24} className={`${isReady ? 'text-red-500 animate-pulse' : 'text-[#C9BEB1]'}`} />
             </div>
             {personA && !isManualB && (
               <button 
                 onClick={() => { setPersonB(personA); setIsManualB(false); }}
                 className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] hover:underline"
               >
                 Klonuj do koła nr 2
               </button>
             )}
          </div>

          {/* PERSON B */}
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8C8883] text-center">Koło Zewnętrzne (Porównanie)</div>
            <div 
              className={`flex-1 min-h-[350px] rounded-[2.5rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 relative overflow-hidden ${
                (personB || isManualB) ? 'bg-[#1F2226] border-[#D4AF37] shadow-2xl' : 'bg-white/50 border-[#C9BEB1] hover:border-[#D4AF37] hover:bg-white'
              }`}
            >
              {!personB && !isManualB ? (
                <div className="text-center space-y-4">
                   <button onClick={() => setSelectingFor('B')} className="w-full py-4 bg-[#1F2226] text-white rounded-2xl font-serif italic text-lg hover:bg-black transition-colors px-6">Wybierz z bazy</button>
                   <div className="text-[10px] font-mono uppercase opacity-30">lub</div>
                   <button onClick={() => setIsManualB(true)} className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:underline">Wpisz ręcznie</button>
                </div>
              ) : isManualB ? (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">Wpis Ręczny</span>
                    <button onClick={() => setIsManualB(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
                  </div>
                  <ManualForm data={manualB} setData={setManualB} />
                </div>
              ) : (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <User size={28} className="text-[#1F2226]" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-[#F1E9DE] mb-1">{personB.name}</h3>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] opacity-60">{personB.date}</p>
                  <button onClick={() => setPersonB(null)} className="mt-4 text-[8px] font-mono uppercase text-white/40 hover:text-white underline">Zmień</button>
                </div>
              )}
            </div>
            
            <select 
              value={zodiacB} 
              onChange={(e) => setZodiacB(e.target.value)}
              className="w-full bg-white border border-[#C9BEB1]/50 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1F2226] outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              {ZODIAC_TYPES.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
          </div>
        </div>

        <button 
          disabled={!isReady}
          onClick={handleCalculateTrigger}
          className={`px-12 py-5 rounded-full font-mono text-xs uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-4 ${
            isReady 
            ? 'bg-[#1F2226] text-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95' 
            : 'bg-[#C9BEB1] text-white opacity-50 cursor-not-allowed'
          }`}
        >
          Generate Intersection <ArrowRight size={16} />
        </button>
      </main>

      {/* OVERLAY FOR HISTORY SELECTION */}
      {selectingFor && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-12 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl max-h-[80vh] bg-[#F1E9DE] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-white/20">
            <div className="p-8 border-b border-[#C9BEB1]/30 flex items-center justify-between">
              <h3 className="font-serif italic text-2xl">Wybierz z Historii</h3>
              <button onClick={() => setSelectingFor(null)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {history.length === 0 ? (
                <div className="py-20 text-center opacity-30 italic font-serif">Brak zapisanych osób</div>
              ) : (
                history.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="p-5 bg-white border border-[#C9BEB1]/20 rounded-2xl hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F1E9DE] flex items-center justify-center group-hover:bg-[#1F2226] group-hover:text-white transition-colors">
                        <User size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className="text-[10px] opacity-60 font-mono tracking-tighter">{item.date} • {item.location}</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[#D4AF37]" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
