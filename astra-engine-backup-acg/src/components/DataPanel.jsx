import { ZodiacGlyph, PlanetGlyph } from './Glyphs';
import { t } from '../utils/astroTranslations';

const DataPanel = ({ planets, aspects, houses, lots = [], metadata = {} }) => {
  const peakSigns = metadata.peakSigns || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 animate-fade-in">
      
      {/* Left: Hermetic Lots */}
      <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-[#C9BEB1]/30 pb-3">
          <h3 className="font-serif italic text-2xl text-[#1F2226]">Punkty Hermetyczne</h3>
        </div>
        <div className="space-y-4">
          {lots.map(l => (
            <div key={l.key} className="flex items-center justify-between font-mono text-[12px] hover:bg-[#F1E9DE] p-2 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:scale-110 transition-transform">{l.symbol}</span>
                <span className="text-[#8C8883] font-bold uppercase tracking-[0.2em]">{t(l.name)}</span>
              </div>
              <div className="text-[#1F2226] font-bold">
                {l.degree}° {l.minutes}' {t(l.sign)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Peak Periods Analysis */}
      <div className="bg-[#FBF7F1] border border-[#C9BEB1] rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-[#C9BEB1]/30 pb-3">
          <h3 className="font-serif italic text-2xl text-[#1F2226]">Znaki Szczytowe (Peaks)</h3>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8883] mb-6 leading-relaxed">
          Okresy kulminacji losu wyznaczone przez kątową relację do Punktu Fortuny.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {peakSigns.map((sIdx, i) => {
            const signName = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'][sIdx];
            const labels = ["Główny Szczyt", "Mały Szczyt", "Średni Szczyt", "Główny Szczyt (MC)"];
            return (
              <div key={`peak-${i}`} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#C9BEB1]/20">
                <ZodiacGlyph name={signName} size={18} className="text-[#D4AF37]" />
                <div>
                  <div className="text-[10px] font-serif italic text-[#1F2226] font-bold">{t(signName)}</div>
                  <div className="text-[8px] font-mono uppercase text-[#8C8883] font-bold">{labels[i]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DataPanel;
