import React from 'react';
import { Star, RefreshCcw } from 'lucide-react';

export default function Navbar({ stage, onReset }) {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 py-4 border-b border-[#C9BEB1]/20"
      style={{
        background: 'rgba(251, 247, 241, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1F2226] flex items-center justify-center">
          <Star size={16} className="text-[#D4AF37]" />
        </div>
        <div>
          <h2 className="font-serif italic text-sm tracking-tight text-[#1F2226] font-bold">Astra Engine</h2>
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#8C8883] font-bold">V2.7 Professional</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {stage === 'dashboard' && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C9BEB1]/50 text-[#1F2226] text-[10px] font-bold uppercase tracking-wider hover:bg-[#1F2226] hover:text-[#F1E9DE] transition-all duration-300"
          >
            <RefreshCcw size={12} className="opacity-60" />
            Zmień dane
          </button>
        )}

        <a
          href="#"
          className="text-[#8C8883] text-xs font-sans font-bold tracking-wide hover:text-[#1F2226] transition-colors duration-200"
        >
          Zaloguj się
        </a>
        
        {stage === 'intake' && (
          <button
            className="btn-magnetic px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wider"
            style={{
              background: 'rgba(201, 190, 177, 0.15)',
              border: '1px solid #C9BEB1',
              color: '#1F2226',
              letterSpacing: '0.08em',
            }}
          >
            Rozpocznij Analizę
          </button>
        )}
        {stage === 'dashboard' && (
          <span className="font-mono text-xs font-bold" style={{ color: '#D4AF37' }}>
            <span className="animate-star-shine mr-1.5">✦</span> Aktywna Sesja
          </span>
        )}
      </div>
    </nav>
  );
}
