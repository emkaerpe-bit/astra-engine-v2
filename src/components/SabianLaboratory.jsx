import React, { useState, useEffect } from 'react';
import { X, Sparkles, Award, AlertTriangle, Star } from 'lucide-react';
import { PlanetGlyph, ZodiacGlyph } from './Glyphs';

import sabianSymbols from '../data/sabianSymbols.json';

function getSabianData(index) {
  return sabianSymbols.find(s => s.id === index) || { symbol: `Symbol ${index}`, interpretation: "Brak opisu w bazie." };
}

function getCriticalDegreeInfo(degree) {
  if (degree === 15) return { type: 'Kulminacyjny', color: '#D4AF37', icon: Award };
  if (degree === 29) return { type: 'Karmiczny', color: '#8B4513', icon: AlertTriangle };
  return null;
}

const SabianLaboratory = ({ chartData, onClose }) => {
  const [sabianData, setSabianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chartData?.input) return;
    
    const fetchSabians = async () => {
      try {
        const response = await fetch('/api/sabians', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: chartData.input.date,
            time: chartData.input.time,
          }),
        });
        
        if (!response.ok) throw new Error('Calculation failed');
        
        const data = await response.json();
        setSabianData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSabians();
  }, [chartData]);

  if (!chartData) return null;

  const planets = chartData?.planets || [];
  const natalData = planets.reduce((acc, p) => {
    acc[p.key] = p;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F1E9DE] flex flex-col animate-in fade-in duration-500 font-sans overflow-y-auto">
      {/* HEADER */}
      <header className="px-6 py-3 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <Sparkles size={20} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-xl tracking-tight">Sabian Laboratory</h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              360 archetypów · Reguła ceiling (zawsze w górę)
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#F1E9DE]/20 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <X size={18} />
        </button>
      </header>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full" />
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500 rounded-xl text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && sabianData && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* INFO CARD */}
            <div className="bg-[#FBF7F1] border border-[#D4AF37]/30 rounded-xl p-4">
              <p className="text-xs text-[#8C8883] italic text-center">
                Każda planeta niesie archetypowy obraz odpowiadający jej dokładnemu stopniowi w znaku.
                <br />
                <span className="text-[#D4AF37]">Reguła ceiling:</span> 0°00' = 30° poprzedniego, 0°01' = 1° bieżącego
              </p>
            </div>

            {/* PLANETS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(sabianData).map(([planet, data]) => {
                if (data.error) return null;
                
                const critical = getCriticalDegreeInfo(data.degree);
                const natal = natalData[planet];
                
                return (
                  <div 
                    key={planet}
                    className={`bg-[#FBF7F1] border rounded-xl p-4 transition-all hover:shadow-lg ${
                      critical 
                        ? 'border-2 shadow-md' 
                        : 'border-[#C9BEB1]'
                    }`}
                    style={critical ? { borderColor: critical.color } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        <PlanetGlyph planet={planet} size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-bold text-[#1F2226]">{planet}</span>
                          {critical && (
                            <critical.icon size={12} style={{ color: critical.color }} />
                          )}
                        </div>
                        
                        <div className="text-lg font-serif italic text-[#1F2226] mb-2">
                          {data.signDegree}
                        </div>
                        
                        <div className="text-xs text-[#8C8883] mb-2">
                          Index: {data.sabianIndex} · Long: {data.longitude}°
                        </div>
                        
                        {critical && (
                          <div 
                            className="text-xs font-bold uppercase tracking-widest py-1 px-2 rounded mb-2 inline-block"
                            style={{ backgroundColor: critical.color + '20', color: critical.color }}
                          >
                            Stopień {critical.type}
                          </div>
                        )}
                        
                        <div className="text-xs text-[#1F2226] leading-relaxed border-t border-[#C9BEB1]/30 pt-2 font-serif italic">
                          <div className="font-bold mb-1">{getSabianData(data.sabianIndex).symbol}</div>
                          <div className="text-[#555]">{getSabianData(data.sabianIndex).interpretation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SabianLaboratory;