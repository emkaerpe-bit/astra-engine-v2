import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, Clock, CalendarDays, Settings } from 'lucide-react';

export default function IntakeEngine({ onSubmit }) {
  const formRef = useRef(null);
  const mandalRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      gsap.fromTo('.hero-content',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12, delay: 0.3 }
      );
      gsap.to(mandalRef.current, {
        rotation: 360, duration: 80, repeat: -1, ease: 'none',
        transformOrigin: '50% 50%',
      });
    }, formRef);
    return () => ctxRef.current?.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const values = {
      date: fd.get('date'),
      time: fd.get('time'),
      location: fd.get('location'),
      houseSystem: fd.get('houseSystem'),
    };

    gsap.to('.hero-content', {
      opacity: 0, y: -20,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.06,
      onComplete: () => onSubmit(values),
    });
  };

  return (
    <div ref={formRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#F1E9DE]">
      {/* Background mandala */}
      <svg
        ref={mandalRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.05 }}
      >
        {[30, 70, 110, 160, 220, 290, 370].map((r) => (
          <g key={r}>
            <circle cx="400" cy="400" r={r} fill="none" stroke="#D4AF37" strokeWidth="0.7" />
            {Array.from({ length: 12 }, (_, j) => {
              const angle = (j * 30 * Math.PI) / 180;
              return (
                <line key={j}
                  x1={400 + (r - 20) * Math.cos(angle)} y1={400 + (r - 20) * Math.sin(angle)}
                  x2={400 + r * Math.cos(angle)} y2={400 + r * Math.sin(angle)}
                  stroke="#D4AF37" strokeWidth="0.5" />
              );
            })}
          </g>
        ))}
        {[0, 60, 120, 180, 240, 300].map((d) => {
          const r = (d * Math.PI) / 180;
          return (
            <line key={d}
              x1={400 + 370 * Math.cos(r)} y1={400 + 370 * Math.sin(r)}
              x2={400 - 370 * Math.cos(r)} y2={400 - 370 * Math.sin(r)}
              stroke="#D4AF37" strokeWidth="0.4" />
          );
        })}
      </svg>

      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <div className="hero-content opacity-0">
            <p className="font-mono text-xs text-[#8C8883] mb-3 tracking-widest uppercase font-bold">✦ Protokół Niebiański</p>
          </div>
          <h1 className="hero-content opacity-0"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 6vw, 4rem)', fontWeight: 700, letterSpacing: '-0.02em',
              lineHeight: 1.1, color: '#1F2226', marginBottom: '0.5rem' }}>
            Poznaj Swój Kosmogram
          </h1>
          <p className="hero-content opacity-0 text-[#8C8883] text-sm tracking-wide mt-3 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
            Wprowadź Koordynaty Trójcy, aby rozpocząć analizę.
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className="hero-content opacity-0 p-8 rounded-3xl border border-[#C9BEB1] shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
          style={{ background: 'rgba(241, 233, 222, 0.9)', backdropFilter: 'blur(24px)' }}>

          <div className="mb-5">
            <label className="flex items-center gap-2 mb-2 text-xs font-sans font-bold tracking-widest uppercase text-[#1F2226]">
              <CalendarDays size={12} className="text-[#8C8883]" /> Data urodzenia
            </label>
            <input type="date" name="date" required className="astra-input" defaultValue="1999-04-30" />
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-2 mb-2 text-xs font-sans font-bold tracking-widest uppercase text-[#1F2226]">
              <Clock size={12} className="text-[#8C8883]" /> Godzina urodzenia
            </label>
            <input type="time" name="time" required className="astra-input" defaultValue="14:25" />
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 mb-2 text-xs font-sans font-bold tracking-widest uppercase text-[#1F2226]">
              <MapPin size={12} className="text-[#8C8883]" /> Miejsce urodzenia
            </label>
            <div className="relative">
              <input type="text" name="location" required placeholder="Miasto, Kraj..." className="astra-input pr-10" defaultValue="Żyrardów" />
              <MapPin size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8883] opacity-60 pointer-events-none" />
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-2 mb-2 text-xs font-sans font-bold tracking-widest uppercase text-[#1F2226]">
              <Settings size={12} className="text-[#8C8883]" /> System Domów
            </label>
            <select name="houseSystem" className="astra-input bg-white appearance-none cursor-pointer">
              <option value="P">Placidus (Standard)</option>
              <option value="K">Koch</option>
              <option value="W">Whole Sign (Całe Znaki)</option>
              <option value="E">Equal (Równe Domy)</option>
              <option value="R">Regiomontanus</option>
              <option value="C">Campanus</option>
              <option value="O">Porphyrius</option>
            </select>
          </div>

          <button type="submit"
            className="btn-magnetic w-full py-4 rounded-2xl font-sans font-bold tracking-widest uppercase text-sm shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8952A 50%, #D4AF37 100%)',
              backgroundSize: '200% 100%', color: '#ffffff', letterSpacing: '0.14em' }}>
            ✦ &nbsp; Inicjalizuj Protokół
          </button>
          <p className="text-center text-xs text-[#8C8883] mt-5 opacity-80 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            [szyfrowane] — koordynaty nie są przechowywane
          </p>
        </form>
      </div>
    </div>
  );
}
