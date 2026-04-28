import React, { useState, useEffect } from 'react';
import { Globe, Compass, LayoutGrid, Info, X, Map as MapIcon, Loader2, Maximize2, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

// Simple Equirectangular projection
const project = (lon, lat, w, h) => {
  const x = ((lon + 180) * w) / 360;
  const y = ((90 - lat) * h) / 180;
  return [x, y];
};

const AstroCartoGraphy = ({ acgData, isDark = true }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const width = 1200;
  const height = 600;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const planets = acgData ? Object.keys(acgData) : [];

  // Render logic for lines
  const renderLines = () => {
    if (!acgData) return null;
    return planets.map(key => {
      const data = acgData[key];
      if (!data) return null;
      const isHovered = hoveredPlanet === key;
      const color = data.color || "#D4AF37";

      const [mcX] = project(data.mc, 0, width, height);
      const [icX] = project(data.ic, 0, width, height);

      return (
        <g key={key} className="transition-opacity duration-500" style={{ opacity: hoveredPlanet && !isHovered ? 0.15 : 1 }}>
          
          {/* MC LINE (Medium Coeli) */}
          <line 
            x1={mcX} y1={0} x2={mcX} y2={height} 
            stroke={color} strokeWidth={isHovered ? 4 : 1.5} 
            strokeDasharray={isHovered ? "0" : "8,4"}
            filter="url(#inkBleed)"
          />

          {/* IC LINE (Imum Coeli) */}
          <line 
            x1={icX} y1={0} x2={icX} y2={height} 
            stroke={color} strokeWidth={isHovered ? 3 : 1} 
            strokeDasharray="2,6" opacity="0.6"
            filter="url(#inkBleed)"
          />

          {/* RISE CURVE (Ascendant) */}
          {data.rise && data.rise.length > 1 && (
            <path 
              d={data.rise.reduce((acc, pt, i) => {
                const [px, py] = project(pt.lon, pt.lat, width, height);
                if (i === 0) return `M ${px} ${py}`;
                
                const prev = data.rise[i-1];
                const lonDist = Math.abs(pt.lon - prev.lon);
                if (lonDist > 180) return `${acc} M ${px} ${py}`;
                
                return `${acc} L ${px} ${py}`;
              }, "")}
              fill="none" stroke={color} strokeWidth={isHovered ? 4 : 2}
              filter="url(#inkBleed)"
            />
          )}

          {/* SET CURVE (Descendant) */}
          {data.set && data.set.length > 1 && (
            <path 
              d={data.set.reduce((acc, pt, i) => {
                const [px, py] = project(pt.lon, pt.lat, width, height);
                if (i === 0) return `M ${px} ${py}`;
                
                const prev = data.set[i-1];
                const lonDist = Math.abs(pt.lon - prev.lon);
                if (lonDist > 180) return `${acc} M ${px} ${py}`;
                
                return `${acc} L ${px} ${py}`;
              }, "")}
              fill="none" stroke={color} strokeWidth={isHovered ? 4 : 2}
              filter="url(#inkBleed)"
            />
          )}

          {/* MC MARKER */}
          <g 
            transform={`translate(${mcX}, 40)`} 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPlanet(key)}
            onMouseLeave={() => setHoveredPlanet(null)}
          >
             <circle r={12} fill="#1F2226" stroke={color} strokeWidth={2} />
             <text textAnchor="middle" y={4} fontSize={12} fill={color} fontWeight="black" fontFamily="serif">{t(data.name).substring(0,1)}</text>
          </g>
        </g>
      );
    });
  };

  return (
    <div id="acg-map-container" className={`relative ${isDark ? 'bg-[#0F1115] border-white/10' : 'mt-12 bg-[#FBF7F1] border-[#C9BEB1] shadow-2xl'} border-2 border-[#D4AF37]/50 rounded-[2rem] overflow-hidden w-full min-h-[850px] flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.15)] opacity-100`}>
      
      {/* 1. TOP NAVBAR */}
      <header className="h-24 bg-black/60 backdrop-blur-3xl border-b border-white/5 px-12 flex items-center justify-between z-[100]">
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA8B2E] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] group cursor-pointer hover:rotate-6 transition-all duration-500">
              <Globe className="text-black" size={28} />
           </div>
           <div>
              <div className="flex items-center gap-3">
                <h1 className="text-white font-serif italic text-3xl tracking-tight">Astra Atlas ACG</h1>
                <span className="text-[10px] bg-[#D4AF37] text-black px-3 py-0.5 rounded-full font-mono font-black uppercase tracking-widest">Live Engine</span>
              </div>
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.4em] mt-1.5 flex items-center gap-2">
                <ShieldCheck size={10} className="text-[#D4AF37]" /> Mapa Linii Mocy Planetarnej
              </p>
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <nav className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setActiveTab('map')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === 'map' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Karta Vintage
              </button>
           </nav>
           {/* Deep Debug Overlay */}
           <div className="absolute top-0 left-0 z-[1000] bg-red-600 text-white px-4 py-2 font-mono text-[12px] uppercase font-black shadow-2xl">
              SYSTEM DEBUG: {width}x{height} | DATA_STREAM: {planets.length > 0 ? 'ACTIVE' : 'OFFLINE'} | PLANETS: {planets.length}
           </div>
           <div className="text-right">
              <p className={`text-[10px] font-mono uppercase font-black tracking-widest ${planets.length > 0 ? 'text-[#D4AF37]' : 'text-red-500'}`}>
                {planets.length > 0 ? `SYNC: ${planets.length} PLANET` : 'ERROR: NO_DATA'}
              </p>
              <p className="text-white/20 text-[8px] font-mono uppercase tracking-tighter">Atlas Engine v1.0</p>
           </div>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-grow relative flex">
        
        {/* LEFT SIDEBAR (PLANET SELECTOR) */}
        <aside className="w-80 bg-black/40 border-r border-white/5 backdrop-blur-2xl p-8 flex flex-col gap-6 z-40">
           <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-[0.3em] font-black">Konstelacje</span>
              <LayoutGrid size={14} className="text-white/20" />
           </div>
           
           <div className="space-y-2 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {planets.map(key => (
                <div 
                  key={key}
                  onMouseEnter={() => setHoveredPlanet(key)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                    hoveredPlanet === key 
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-xl shadow-[#D4AF37]/10 translate-x-2' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${hoveredPlanet === key ? 'bg-black/10' : 'bg-black/40'}`}>
                      <PlanetGlyph name={key} size={16} style={{ color: hoveredPlanet === key ? '#000' : acgData[key].color }} />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-widest">{t(acgData[key]?.name || key)}</span>
                      <span className={`text-[8px] font-mono uppercase opacity-60`}>MC: {acgData[key]?.mc?.toFixed(1) || '0.0'}°</span>
                   </div>
                </div>
              ))}

              {!acgData && (
                <div className="text-center py-20">
                   <AlertCircle className="mx-auto text-[#D4AF37] opacity-20 mb-4" size={32} />
                   <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">Brak danych</p>
                </div>
              )}
           </div>
        </aside>

        {/* CENTRAL MAP CANVAS */}
        <div className="flex-grow relative bg-[#0F1115] overflow-hidden">
           
           {/* THE VINTAGE MAP BACKGROUND */}
           <img 
             src="/vintage_map.png" 
             className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale"
             alt="Vintage World Map"
           />

           {/* THE SVG OVERLAY (DATA) */}
           <svg 
             viewBox={`0 0 ${width} ${height}`} 
             className="w-full h-full relative z-10"
             preserveAspectRatio="xMidYMid slice"
           >
             <defs>
               <filter id="inkBleed">
                 <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" result="blur" />
                 <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                 <feMerge>
                   <feMergeNode in="offsetBlur" />
                   <feMergeNode in="SourceGraphic" />
                 </feMerge>
               </filter>
             </defs>

             {/* Grid Overlay */}
             {[...Array(13)].map((_, i) => (
                <line 
                  key={`v-${i}`}
                  x1={(i * width) / 12} y1={0} x2={(i * width) / 12} y2={height} 
                  stroke="#D4AF37" strokeOpacity="0.05" strokeWidth="1" 
                />
             ))}

             {/* REAL DATA LINES */}
             {renderLines()}
           </svg>

           {/* Data Ready Indicator */}
           <div className="absolute top-4 right-4 z-[200] px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-[#D4AF37]/20 text-[8px] font-mono text-[#D4AF37] uppercase tracking-widest">
              Live Projection Active
           </div>
        </div>

      </main>

      {/* 3. STATUS BAR */}
      <footer className="h-16 bg-black/80 border-t border-white/5 px-12 flex items-center justify-between text-white/20 font-mono text-[9px] z-[100]">
         <div className="flex items-center gap-8">
            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" /> ENGINE: NOMINAL</span>
            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500 opacity-30" /> ATLAS SOURCE: VINTAGE-1670</span>
         </div>
         <div className="flex items-center gap-4">
            <Zap size={14} className="text-[#D4AF37]/40" />
            <span className="uppercase tracking-widest font-black">Neoromantyzm Precision Astrometry</span>
         </div>
      </footer>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slow-spin {
          animation: spin 30s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AstroCartoGraphy;
