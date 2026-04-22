import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LOGS = [
  '[sys] Inicjalizacja Astra Engine v2.7...',
  '[sys] Ładowanie danych efemerydalnych J2000.0...',
  '[ast] Wyrównywanie współrzędnych zodiaku...',
  '[sys] Obliczanie stopnia Ascendentu — 14°22\'...',
  '[ast] Pobieranie Węzłów Księżycowych (Rahu/Ketu)...',
  '[sys] Przetwarzanie ingresu Słońca → Skorpion...',
  '[ast] Faza Księżyca: 87.3% ubywający garbaty...',
  '[sys] Syntetyzowanie konfiguracji T-Kwadratu...',
  '[ast] Dominująca modalność: Stała (68.4%)...',
  '[sys] Obliczanie Medium Coeli (oś MC/IC)...',
  '[ast] Wykryto domy przechwycone: III, IX...',
  '[sys] Nakładanie systemu domów Placidusa...',
  '[ast] Orby aspektów → trygon 4.2°, kwadrat 2.1°...',
  '[sys] Rektyfikacja kosmogramu zakończona.',
  '[ast] Profil cienia: kompilowanie...',
  '[sys] ✦ Protokół zainicjalizowany. Generowanie wykresu.',
];

export default function CalculationSequence({ onComplete }) {
  const containerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      // Rotating rings with absolute centering
      gsap.to(ring1Ref.current, {
        rotation: 360, duration: 4, repeat: -1, ease: 'none',
        transformOrigin: '50% 50%',
      });
      gsap.to(ring2Ref.current, {
        rotation: -360, duration: 3.2, repeat: -1, ease: 'none',
        transformOrigin: '50% 50%',
      });

      // Type out log lines sequentially
      const lines = containerRef.current?.querySelectorAll('.log-line');
      if (lines) {
        gsap.set(lines, { opacity: 0, x: -8 });
        gsap.to(lines, {
          opacity: 1, x: 0,
          stagger: 0.15,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.delayedCall(0.5, onComplete);
          },
        });
      }
    }, containerRef);

    return () => ctxRef.current?.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-[#F1E9DE]">
      
      {/* Geometric loader: interlocking rings (WIDE VIEWBOX TO PREVENT CLIPPING) */}
      <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
          <defs>
            <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Static outer ring */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(212,175,55,0.05)" strokeWidth="0.5" />
          
          {/* Dynamic orbital rings */}
          <g ref={ring1Ref}>
            <ellipse cx="60" cy="60" rx="50" ry="18"
              fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="1.2"
              filter="url(#gold-glow)"
            />
          </g>
          <g ref={ring2Ref}>
            <ellipse cx="60" cy="60" rx="18" ry="50"
              fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8"
            />
          </g>
          
          {/* Central Monad */}
          <circle cx="60" cy="60" r="4.5" fill="#D4AF37" className="animate-pulse" />
        </svg>
      </div>

      {/* Terminal feed */}
      <div className="w-full max-w-lg bg-[#FBF7F1]/80 backdrop-blur-sm border border-[#C9BEB1] rounded-2xl p-8 shadow-[0_15px_50px_rgba(0,0,0,0.04)]">
        <div className="flex items-center mb-5 border-b border-[#C9BEB1]/30 pb-3">
          <div className="flex gap-1.5 mr-3">
            <div className="w-2 h-2 rounded-full bg-red-400/30" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
            <div className="w-2 h-2 rounded-full bg-green-400/30" />
          </div>
          <span className="font-mono text-[9px] text-[#8C8883] font-black uppercase tracking-[0.2em]">astra_engine — system_protocol</span>
        </div>
        <div className="space-y-1 h-[260px] overflow-hidden">
          {LOGS.map((log, i) => (
            <div key={i} className="log-line terminal-line font-bold text-[#1F2226] text-[11px] leading-relaxed">
              <span className="text-[#D4AF37] opacity-40 mr-2">›</span>{log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
