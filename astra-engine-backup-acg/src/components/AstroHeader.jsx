import React from 'react';
import { MapPin, Clock, Star, Globe } from 'lucide-react';

const AstroHeader = ({ input, meta }) => {
  if (!input || !meta) return null;

  const formattedDate = new Date(input.year, input.month - 1, input.day).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="card-reveal opacity-0 translate-y-8 w-full border-b border-gold/10 bg-void/50 backdrop-blur-md pb-8 mb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          
          {/* Left: Subject Info */}
          <div>
            <p className="font-mono text-[9px] text-gold tracking-widest uppercase mb-2">✦ Natal Analysis</p>
            <h1 className="font-serif italic text-4xl md:text-5xl text-ivory mb-4 tracking-tight">
              {input.name || "Natal Chart Analysis"}
            </h1>
            <div className="flex flex-wrap gap-4 text-ash font-mono text-[10px] uppercase tracking-wider">
              <div className="flex items-center gap-1.5 border-r border-gold/10 pr-4">
                <Clock size={12} className="text-gold/50" />
                <span>{formattedDate} · {String(input.hour).padStart(2, '0')}:{String(input.minute).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gold/50" />
                <span>{input.location.resolved}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Metadata */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gold/5 border border-gold/10 p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-[8px] text-gold/40 uppercase tracking-widest">Sid. Time</span>
              <span className="font-mono text-xs text-ivory">{meta.siderealTime}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-gold/40 uppercase tracking-widest">Julian Day</span>
              <span className="font-mono text-xs text-ivory">{parseFloat(meta.julianDay).toFixed(4)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-gold/40 uppercase tracking-widest">House System</span>
              <span className="font-mono text-xs text-ivory">{meta.houseSystem}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-gold/40 uppercase tracking-widest">Coordinates</span>
              <span className="font-mono text-xs text-ivory">{parseFloat(input.location.lat).toFixed(2)}N, {parseFloat(input.location.lng).toFixed(2)}E</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AstroHeader;
