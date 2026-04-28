import React, { useMemo } from 'react';
import { X, FileText, Zap, Shield, Heart, Crown, Compass, Star, TrendingUp } from 'lucide-react';
import { PlanetGlyph } from './Glyphs';

import sabianSymbols from '../data/sabianSymbols.json';

const AnalysisLaboratory = ({ chartData, onClose }) => {
  const [sabianData, setSabianData] = React.useState(null);
  const [loadingSabian, setLoadingSabian] = React.useState(false);

  React.useEffect(() => {
    if (!chartData?.input) return;
    const fetchSabians = async () => {
      setLoadingSabian(true);
      try {
        const res = await fetch('/api/sabians', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: chartData.input.date,
            time: chartData.input.time,
          }),
        });
        const data = await res.json();
        setSabianData(data);
      } catch (err) { console.error("Sabian Fetch Error:", err); }
      finally { setLoadingSabian(false); }
    };
    fetchSabians();
  }, [chartData]);

  if (!chartData) return null;

  const getSabianInfo = (planetKey) => {
    if (!sabianData) return null;
    const pData = sabianData.planets.find(p => p.key === planetKey);
    if (!pData) return null;
    return sabianSymbols.find(s => s.id === pData.sabianIndex);
  };

  const analysis = useMemo(() => {
    const planets = chartData.planets || [];
    const elements = { fire: 0, earth: 0, air: 0, water: 0 };
    const modalities = { cardinal: 0, fixed: 0, mutable: 0 };
    
    const elementMap = {
      Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
      Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
      Gemini: 'air', Libra: 'air', Aquarius: 'air',
      Cancer: 'water', Scorpio: 'water', Pisces: 'water'
    };

    const modalityMap = {
      Aries: 'cardinal', Cancer: 'cardinal', Libra: 'cardinal', Capricorn: 'cardinal',
      Taurus: 'fixed', Leo: 'fixed', Scorpio: 'fixed', Aquarius: 'fixed',
      Gemini: 'mutable', Virgo: 'mutable', Sagittarius: 'mutable', Pisces: 'mutable'
    };

    planets.forEach(p => {
      const weight = (p.key === 'sun' || p.key === 'moon') ? 3 : 1;
      const el = elementMap[p.sign];
      const mod = modalityMap[p.sign];
      if (el) elements[el] += weight;
      if (mod) modalities[mod] += weight;
    });

    const dominantElement = Object.entries(elements).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const dominantModality = Object.entries(modalities).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return { elements, modalities, dominantElement, dominantModality };
  }, [chartData]);

  const getElementDescription = (el) => {
    const desc = {
      fire: "Twoja energia jest dynamiczna, inicjująca i pełna pasji. Działasz z impulsu, inspirując innych do ruchu.",
      earth: "Fundamentem Twojej osobowości jest stabilność, pragmatyzm i zdolność do manifestacji idei w świecie fizycznym.",
      air: "Poruszasz się w świecie idei, komunikacji i intelektualnej wymiany. Twoja siła tkwi w obiektywizmie.",
      water: "Głęboka intuicja, empatia i świat emocjonalny stanowią o Twojej unikalnej sile przyciągania."
    };
    return desc[el];
  };

  const sun = chartData.planets.find(p => p.key === 'sun');
  const moon = chartData.planets.find(p => p.key === 'moon');
  const asc = chartData.houses.ascendant;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#F1E9DE] flex flex-col font-sans animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* HEADER */}
      <header className="px-8 py-6 bg-[#1F2226] text-[#F1E9DE] flex items-center justify-between shrink-0 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8A456] flex items-center justify-center shadow-lg rotate-3">
            <FileText size={24} className="text-[#1F2226]" />
          </div>
          <div>
            <h2 className="font-serif italic text-3xl tracking-tight">Raport Kosmogramu</h2>
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] mt-1">
              Syntetyczna Analiza Potencjału
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full border border-[#F1E9DE]/10 flex items-center justify-center hover:bg-white/5 transition-all"
        >
          <X size={20} />
        </button>
      </header>

      {/* REPORT CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F1E9DE] selection:bg-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
          
          {/* THE BIG THREE */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-[#C9BEB1]/30 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="text-[#D4AF37]" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8883]">Tożsamość (Słońce)</span>
              </div>
              <div className="text-4xl mb-4"><PlanetGlyph name="sun" size={48} /></div>
              <h3 className="text-2xl font-serif italic mb-2">{sun.sign}</h3>
              <p className="text-sm text-[#555] leading-relaxed">Twoja świadoma wola i esencja bytu wyraża się poprzez archetyp {sun.sign}. To Twoje centrum dowodzenia i źródło witalności.</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-[#C9BEB1]/30 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="text-[#D4AF37]" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8883]">Emocje (Księżyc)</span>
              </div>
              <div className="text-4xl mb-4"><PlanetGlyph name="moon" size={48} /></div>
              <h3 className="text-2xl font-serif italic mb-2">{moon.sign}</h3>
              <p className="text-sm text-[#555] leading-relaxed">Świat wewnętrzny i instynktowne reakcje są ukształtowane przez energię {moon.sign}. To tutaj szukasz bezpieczeństwa i emocjonalnego ukojenia.</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-[#C9BEB1]/30 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[#D4AF37]" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8883]">Maska (Ascendent)</span>
              </div>
              <div className="text-4xl mb-4 text-[#D4AF37] font-serif font-bold italic">AC</div>
              <h3 className="text-2xl font-serif italic mb-2">{asc.sign}</h3>
              <p className="text-sm text-[#555] leading-relaxed">Sposób, w jaki postrzega Cię świat i jak wchodzisz w nowe sytuacje. {asc.sign} to Twoja brama do rzeczywistości i pierwszy filtr percepcji.</p>
            </div>
          </section>

          {/* ELEMENTAL SYNTHESIS */}
          <section className="bg-[#1F2226] rounded-[3rem] p-10 text-[#F1E9DE] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="flex items-center gap-4 mb-10">
              <Zap className="text-[#D4AF37]" size={32} />
              <h2 className="text-3xl font-serif italic">Synteza Żywiołów</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {Object.entries(analysis.elements).map(([el, val]) => (
                  <div key={el} className="space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                      <span className={analysis.dominantElement === el ? 'text-[#D4AF37]' : 'text-[#8C8883]'}>
                        {el === 'fire' ? 'Ogień' : el === 'earth' ? 'Ziemia' : el === 'air' ? 'Powietrze' : 'Woda'}
                      </span>
                      <span>{val} pkt</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${analysis.dominantElement === el ? 'bg-[#D4AF37]' : 'bg-white/20'}`}
                        style={{ width: `${(val / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Star size={14} /> Dominujący Żywioł
                </div>
                <h3 className="text-2xl font-serif italic mb-4 capitalize">
                  {analysis.dominantElement === 'fire' ? 'Ogień' : analysis.dominantElement === 'earth' ? 'Ziemia' : analysis.dominantElement === 'air' ? 'Powietrze' : 'Woda'}
                </h3>
                <p className="text-white/70 italic leading-relaxed">
                  {getElementDescription(analysis.dominantElement)}
                </p>
              </div>
            </div>
          </section>

          {/* COMPLETE SABIAN MATRIX */}
          <section className="bg-white rounded-[3rem] border border-[#C9BEB1]/30 p-10">
            <div className="flex items-center gap-4 mb-10">
              <Compass className="text-[#D4AF37]" size={32} />
              <div>
                <h2 className="text-3xl font-serif italic text-[#1F2226]">Kompletna Matryca Sabiańska</h2>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8883] mt-1">Symboliczny Zapis Każdego Punktu Kosmogramu</p>
              </div>
            </div>

            {loadingSabian ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                <p className="text-xs font-serif italic text-[#8C8883]">Analizowanie symboli dla wszystkich punktów...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {[
                  { title: 'Planety Osobiste & Społeczne', keys: ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'] },
                  { title: 'Planety Pokoleniowe', keys: ['uranus', 'neptune', 'pluto'] },
                  { title: 'Węzły & Punkty Obliczane', keys: ['node', 'south_node', 'chiron', 'lilith', 'fortune', 'spirit'] },
                  { title: 'Osie Horoskopu', keys: ['ascendant', 'midheaven'] },
                  { title: 'Matryca Domów', keys: ['house_1', 'house_2', 'house_3', 'house_4', 'house_5', 'house_6', 'house_7', 'house_8', 'house_9', 'house_10', 'house_11', 'house_12'] }
                ].map(group => (
                  <div key={group.title} className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">{group.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {sabianData?.planets?.filter(p => group.keys.includes(p.key)).map((p) => {
                        const sInfo = sabianSymbols.find(s => s.id === p.sabianIndex);
                        return (
                          <div key={p.key} className="group border-b border-[#C9BEB1]/20 pb-6 hover:border-[#D4AF37]/50 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#F1E9DE] flex items-center justify-center text-[#1F2226]">
                                  {p.key.startsWith('house') ? <span className="text-[10px] font-bold">H{p.key.split('_')[1]}</span> : <PlanetGlyph name={p.key} size={16} />}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#1F2226]">{p.name}</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#D4AF37]">{Math.floor(p.longitude % 30) + 1}° Stopień</span>
                            </div>
                            <div className="pl-11">
                              <h4 className="text-sm font-serif italic font-bold text-[#1F2226] mb-1">{sInfo?.symbol}</h4>
                              <p className="text-[11px] text-[#555] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all cursor-default">
                                {sInfo?.interpretation}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* KEY DYNAMICS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-10 rounded-[2.5rem] border border-[#C9BEB1]/30">
                <div className="flex items-center gap-3 mb-8">
                  <Compass className="text-[#D4AF37]" size={24} />
                  <h2 className="text-2xl font-serif italic text-[#1F2226]">Dynamika Działania</h2>
                </div>
                <p className="text-[#555] leading-relaxed italic mb-8">
                  Twoja dominująca jakość to <span className="font-bold text-[#1F2226] uppercase tracking-wider">{analysis.dominantModality === 'cardinal' ? 'Kardynalna' : analysis.dominantModality === 'fixed' ? 'Stała' : 'Zmienna'}</span>. 
                  Oznacza to, że najlepiej sprawdzasz się w {analysis.dominantModality === 'cardinal' ? 'inicjowaniu nowych projektów i przełamywaniu barier' : analysis.dominantModality === 'fixed' ? 'utrzymywaniu status quo, budowaniu fundamentów i lojalności' : 'adaptowaniu się do zmian, łączeniu ludzi i elastycznym myśleniu'}.
                </p>
             </div>

             <div className="bg-[#E6DDD2] p-10 rounded-[2.5rem] border border-[#C9BEB1]/50 relative group">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-[#1F2226]" size={24} />
                  <h2 className="text-2xl font-serif italic text-[#1F2226]">Rekomendacja Astro-Marketingowa</h2>
                </div>
                <div className="space-y-4 text-sm text-[#1F2226]/80 leading-relaxed">
                  <p>Wykorzystaj swoją przewagę żywiołu <span className="font-bold">{analysis.dominantElement}</span>, aby budować autentyczną markę osobistą. Twój przekaz powinien być {analysis.dominantElement === 'fire' ? 'odważny i wizualnie uderzający' : analysis.dominantElement === 'earth' ? 'merytoryczny, oparty na wynikach i konkretach' : analysis.dominantElement === 'air' ? 'lekki, edukacyjny i nastawiony na dialog' : 'emocjonalny, oparty na storytellingu i głębokich więziach'}.</p>
                </div>
                <div className="mt-8 pt-8 border-t border-[#1F2226]/10 flex items-center justify-between">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#1F2226]/40">Astra Engine v3.0 // Pattern Analysis</span>
                  <div className="w-8 h-8 rounded-full bg-[#1F2226] text-[#D4AF37] flex items-center justify-center text-xs">A</div>
                </div>
             </div>
          </section>

        </div>
      </div>
      
      {/* FOOTER CTA */}
      <footer className="p-6 bg-[#1F2226] border-t border-white/5 flex items-center justify-center">
        <p className="text-[10px] text-[#8C8883] italic">Raport wygenerowany na podstawie efemeryd szwajcarskich z dokładnością sub-sekundową.</p>
      </footer>
    </div>
  );
};

export default AnalysisLaboratory;
