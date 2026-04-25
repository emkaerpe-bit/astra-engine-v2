import React from 'react';

/**
 * Zodiacal Releasing Dashboard — Professional Hellenistic Timing
 * Logic based on Solar Fire implementation & Vettius Valensa standards.
 */
export default function ZodiacalReleasing({ data }) {
    if (!data || !data.releasing) return null;

    const { fortune, spirit } = data.releasing;

    const renderLevel = (title, periods, color) => (
        <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center" style={{ color }}>
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                {title}
            </h3>
            <div className="space-y-1">
                {periods.map((p, i) => (
                    <div 
                        key={i} 
                        className="group flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg leading-none" style={{ color }}>{p.symbol}</span>
                            <div>
                                <div className="text-[10px] font-bold text-white/90 uppercase">{p.sign}</div>
                                <div className="text-[9px] text-white/50">{p.startDate} — {p.years} lat</div>
                            </div>
                        </div>
                        <div className="text-[10px] font-mono text-white/40 group-hover:text-white/80">
                            {p.years}Y
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-serif text-white tracking-tight">Zodiacal Releasing</h2>
                <div className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-[8px] font-bold uppercase tracking-tighter">
                    Vettius Valensa Standard
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {renderLevel("Lot of Fortune (Material/Body)", fortune, "#D4AF37")}
                {renderLevel("Lot of Spirit (Soul/Career)", spirit, "#9B51E0")}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-[9px] text-white/30 italic leading-relaxed">
                Technika Zwolnień Zodiakalnych dzieli życie na fraktalne cykle. 
                Okresy "Peak" występują, gdy znak okresu tworzy kwadraturę lub opozycję do znaku Fortuny.
            </div>
        </div>
    );
}
