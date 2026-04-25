import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Clock, MapPin, ChevronRight, Database, Star, Trash2 } from 'lucide-react';

const DatabaseHome = ({ onSelect, onCreateNew }) => {
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
    <div className="min-h-screen bg-[#F1E9DE] flex flex-col font-sans text-[#1F2226]">
      {/* 1. PREMIUM HERO HEADER */}
      <header className="relative h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-[#1F2226] text-[#F1E9DE] p-8">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
          <div className="grid grid-cols-12 h-full w-full opacity-10">
             {Array.from({length: 48}).map((_, i) => (
               <div key={i} className="border-[0.5px] border-white/20" />
             ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-6 animate-pulse">
            <Star size={32} className="text-[#D4AF37]" />
          </div>
          <h1 className="font-serif italic text-5xl md:text-6xl tracking-tighter mb-4">Ad Astra — Database</h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] opacity-80">
            Celestial Blueprint Management System v4.1
          </p>
        </div>
      </header>

      {/* 2. DASHBOARD TOOLS */}
      <main className="flex-1 max-w-6xl w-full mx-auto -mt-12 relative z-20 px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: ACTIONS & STATS */}
          <div className="lg:col-span-4 space-y-6">
            <button 
              onClick={onCreateNew}
              className="w-full bg-[#1F2226] hover:bg-[#D4AF37] group text-[#F1E9DE] hover:text-[#1F2226] p-8 rounded-3xl transition-all duration-500 shadow-2xl flex flex-col items-center gap-4 border border-white/5"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                <Plus size={24} />
              </div>
              <div className="text-center">
                <span className="block font-serif italic text-2xl">Initiate Blueprint</span>
                <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Create New Natal Record</span>
              </div>
            </button>

            <div className="bg-[#FBF7F1] border border-[#C9BEB1]/40 rounded-3xl p-6 shadow-sm">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#8C8883] mb-4 flex items-center gap-2">
                <Database size={12} /> Registry Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#C9BEB1]/20">
                  <span className="block text-2xl font-serif italic">{history.length}</span>
                  <span className="text-[8px] font-mono uppercase text-[#8C8883]">Total Profiles</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#C9BEB1]/20">
                  <span className="block text-2xl font-serif italic">{history.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length}</span>
                  <span className="text-[8px] font-mono uppercase text-[#8C8883]">Added Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: DATABASE LIST */}
          <div className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-xl border border-[#C9BEB1]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[70vh]">
              
              {/* Search Bar */}
              <div className="p-6 border-b border-[#C9BEB1]/20 bg-[#FBF7F1]/50 flex items-center gap-4">
                <Search size={18} className="text-[#8C8883]" />
                <input 
                  type="text" 
                  placeholder="Search Blueprints (Name or Location)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 w-full font-serif italic text-xl placeholder:text-[#C9BEB1]"
                />
              </div>

              {/* List Area */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-3">
                {filtered.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale italic">
                    <Database size={48} className="mb-4" />
                    <p>No records found in current frequency.</p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => onSelect(item)}
                      className="group flex items-center justify-between p-4 bg-white border border-[#C9BEB1]/20 rounded-2xl hover:border-[#D4AF37] hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-[#F1E9DE] flex items-center justify-center group-hover:bg-[#1F2226] group-hover:text-[#F1E9DE] transition-colors">
                          <User size={20} />
                        </div>
                        <div>
                          <h4 className="font-serif italic text-xl text-[#1F2226] leading-none mb-1">{item.name}</h4>
                          <div className="flex items-center gap-3 text-[10px] text-[#8C8883] font-mono">
                            <span className="flex items-center gap-1"><Clock size={10} /> {item.date} · {item.time}</span>
                            <span className="flex items-center gap-1 truncate max-w-[200px]"><MapPin size={10} /> {item.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => deleteEntry(e, item.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="w-8 h-8 rounded-full border border-[#C9BEB1]/30 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1F2226] transition-all">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-8 text-center border-t border-[#C9BEB1]/20 text-[9px] font-mono uppercase tracking-[0.3em] text-[#8C8883]">
        Astra Intelligence © 2026 · Local Persistence Enabled · Neoromantyzm Edition
      </footer>
    </div>
  );
};

export default DatabaseHome;
