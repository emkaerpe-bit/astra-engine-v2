import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ChevronLeft, ChevronRight, RotateCcw, FastForward, Rewind } from 'lucide-react';
import * as luxon from 'luxon';
const { DateTime } = luxon;

const TimeMachine = ({ baseDate, onDateChange, isActive }) => {
  const [offset, setOffset] = useState(0); // offset in days
  const [displayDate, setDisplayDate] = useState(DateTime.now());

  useEffect(() => {
    if (!baseDate) return;
    const newDate = DateTime.fromISO(baseDate).plus({ days: offset });
    setDisplayDate(newDate);
    
    // Debounced update
    const timer = setTimeout(() => {
      onDateChange(newDate.toISODate() + ' ' + newDate.toFormat('HH:mm'));
    }, 150);

    return () => clearTimeout(timer);
  }, [offset, baseDate, onDateChange]);

  const handleReset = () => setOffset(0);
  const handleShift = (days) => setOffset(prev => prev + days);

  if (!isActive) return null;

  return (
    <div className="bg-[#1F2226]/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] gold-glow w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[#D4AF37] animate-pulse" />
          <p className="text-[14px] font-serif italic text-[#F1E9DE]">{displayDate.toFormat('dd LLL yyyy, HH:mm')}</p>
        </div>
        
        <button 
          onClick={handleReset}
          className="p-1 rounded-full hover:bg-white/5 text-[#8C8883] transition-colors"
          title="Reset to Present"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="space-y-3">
        <input 
          type="range" 
          min="-3650" 
          max="3650" 
          value={offset} 
          onChange={(e) => setOffset(parseInt(e.target.value))}
          className="w-full h-1 bg-[#F1E9DE]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] transition-all hover:accent-[#D4AF37]/80"
        />
        
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button onClick={() => handleShift(-30)} className="p-1 text-[#8C8883] hover:text-[#D4AF37] transition-colors"><Rewind size={14} /></button>
            <button onClick={() => handleShift(-1)} className="p-1 text-[#8C8883] hover:text-[#D4AF37] transition-colors"><ChevronLeft size={16} /></button>
          </div>

          <div className="text-[8px] font-mono text-[#8C8883] uppercase tracking-widest text-center flex-1">
            {offset === 0 ? 'PRESENT' : `${offset > 0 ? '+' : ''}${offset} DAYS`}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => handleShift(1)} className="p-1 text-[#8C8883] hover:text-[#D4AF37] transition-colors"><ChevronRight size={16} /></button>
            <button onClick={() => handleShift(30)} className="p-1 text-[#8C8883] hover:text-[#D4AF37] transition-colors"><FastForward size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeMachine;
