import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Clock, MapPin, ChevronRight, Database, Star, Trash2, Info, Users, Heart } from 'lucide-react';

const DatabaseHome = ({ onSelect, onCreateNew, isOverlay, onClose, onOpenSynastry }) => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('astra_history') || '[]');
    // Failsafe: Filter out duplicates if any exist in storage
    const unique = saved.filter((entry, index, self) =>
      index === self.findIndex((t) => (
        t.name === entry.name && t.date === entry.date && t.time === entry.time
      ))
    );
    setHistory(unique);
  }, []);

  const deleteEntry = (e, id) => {
    e.stopPropagation();
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('astra_history', JSON.stringify(updated));
  };

  const filtered = history.filter(h => 
    (h.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (h.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${isOverlay ? 'bg-[#F1E9DE]' : 'min-h-screen bg-[#F1E9DE]'} flex flex-col font-sans text-[#1F2226] selection:bg-[#D4AF37]/20`}>
      {/* 1. MINIMALIST LUXE HEADER */}
      <header className="px-10 py-12 bg-[#1F2226] text-[#F1E9DE] relative overflow-hidden shrink-0 shadow-2xl">
        {isOverlay && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-[100] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <Plus className="rotate-45" size={24} />
          </button>
        )}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[radial-gradient(circle_at_center,_#D4AF37_0%,transparent_70%)] opacity-20 blur-[100px]" />
          <div className="grid grid-cols-12 h-full w-full opacity-5">
             {Array.from({length: 24}).map((_, i) => (
               <div key={i} className="border-l border-white/20" />
             ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <Star size={18} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] font-black">Ad Astra Engine</span>
            </div>
            <h1 className="font-serif italic text-5xl md:text-6xl tracking-tighter leading-none">
              The Database <span className="text-[#D4AF37]/30">—</span> <span className="opacity-40">Blueprints</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
             <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Persistence Registry</span>
             <div className="flex items-center gap-4">
               <div className="flex flex-col">
                 <span className="text-2xl font-serif italic text-[#D4AF37]">{history.length}</span>
                 <span className="text-[7px] font-mono uppercase tracking-widest opacity-40">Total Records</span>
               </div>
               <div className="w-[1px] h-8 bg-white/10" />
               <div className="flex flex-col">
                 <span className="text-2xl font-serif italic text-white/80">{history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length}</span>
                 <span className="text-[7px] font-mono uppercase tracking-widest opacity-40">Added Today</span>
               </div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. REFINED WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: PRIMARY ACTION */}
          <div className="lg:col-span-4 sticky top-10">
            <button 
              onClick={onCreateNew}
              className="w-full bg-[#1F2226] group text-[#F1E9DE] p-10 rounded-[2.5rem] transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-500 group-hover:rotate-90">
                <Plus size={32} className="text-[#D4AF37]" />
              </div>
              <div className="text-center relative z-10">
                <span className="block font-serif italic text-3xl mb-1">Initiate Blueprint</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-bold">New Natal Intelligence</span>
              </div>
            </button>

            {!isOverlay && (
              <button 
                onClick={onOpenSynastry}
                className="w-full mt-6 bg-[#FBF7F1] group text-[#1F2226] p-8 rounded-[2.5rem] transition-all duration-500 shadow-xl flex flex-col items-center gap-4 border border-[#C9BEB1]/30 relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] hover:border-[#D4AF37]/50"
              >
                <div className="w-12 h-12 rounded-full bg-[#1F2226]/5 border border-[#1F2226]/10 group-hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-500">
                  <Heart size={20} className="text-[#D4AF37]" />
                </div>
                <div className="text-center relative z-10">
                  <span className="block font-serif italic text-2xl mb-0.5">Union Analyzer</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C8883] font-bold">Synastry & Comparison</span>
                </div>
              </button>
            )}

            <div className="mt-10 p-6 rounded-3xl border border-[#C9BEB1]/30 bg-white/30 backdrop-blur-sm">
               <h4 className="text-[9px] font-mono uppercase tracking-widest text-[#8C8883] mb-4 flex items-center gap-2">
                 <Info size={12} /> System Integrity
               </h4>
               <p className="text-[10px] text-[#1F2226]/60 leading-relaxed italic font-serif">
                 Wszystkie dane są przechowywane lokalnie w pamięci Twojej przeglądarki. Silnik Ad Astra nie wysyła danych osobowych na zewnętrzne serwery w celach innych niż obliczenia efemerydalne.
               </p>
            </div>
          </div>

          {/* RIGHT: DATABASE LIST WITH INTEGRATED SEARCH */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(201,190,177,0.3)] border border-[#C9BEB1]/20 overflow-hidden flex flex-col min-h-[60vh]">
              
              {/* Search Bar - Sophisticated */}
              <div className="px-10 py-8 border-b border-[#F1E9DE] bg-[#FBF7F1]/30 flex items-center gap-6">
                <Search size={22} className="text-[#D4AF37]" />
                <input 
                  type="text" 
                  placeholder="FILTER BY NAME, LOCATION OR VIBRATION..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 w-full font-serif italic text-2xl text-[#1F2226] placeholder:text-[#C9BEB1] placeholder:italic"
                />
              </div>

              {/* List Area */}
              <div className="flex-1 p-8 space-y-4">
                {filtered.length === 0 ? (
                  <div className="h-full py-20 flex flex-col items-center justify-center opacity-10 grayscale">
                    <Database size={64} strokeWidth={1} className="mb-6" />
                    <p className="font-serif italic text-xl">No active blueprints detected.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filtered.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="group flex items-center justify-between p-6 bg-white border border-[#F1E9DE] rounded-3xl hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#F1E9DE]/50 border border-[#C9BEB1]/20 flex items-center justify-center text-[#1F2226] group-hover:bg-[#1F2226] group-hover:text-[#F1E9DE] transition-all duration-500 group-hover:rotate-6">
                            <User size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="font-serif italic text-2xl text-[#1F2226] leading-none mb-2">{item.name}</h4>
                            <div className="flex items-center gap-4 text-[9px] text-[#8C8883] font-mono font-bold tracking-widest">
                              <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#D4AF37]" /> {item.date} · {item.time}</span>
                              <span className="flex items-center gap-1.5 truncate max-w-[240px] uppercase"><MapPin size={12} className="text-[#D4AF37]" /> {item.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={(e) => deleteEntry(e, item.id)}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-[#8C8883] opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="w-10 h-10 rounded-full border border-[#C9BEB1]/30 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1F2226] transition-all duration-500 group-hover:scale-110 shadow-sm">
                            <ChevronRight size={20} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="p-10 text-center border-t border-[#C9BEB1]/20 text-[9px] font-mono uppercase tracking-[0.5em] text-[#8C8883] opacity-60">
        Ad Astra — Professional Astrological Intelligence System · v4.2.1
      </footer>
    </div>
  );
};

export default DatabaseHome;
