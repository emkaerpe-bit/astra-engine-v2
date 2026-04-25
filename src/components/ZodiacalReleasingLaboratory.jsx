import React from 'react';
import ZodiacalReleasing from './ZodiacalReleasing';

export default function ZodiacalReleasingLaboratory({ isOpen, onClose, chartData }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500" 
                onClick={onClose}
            />
            
            {/* Content Container */}
            <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-3xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37]">
                            <span className="text-xl">⌛</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif text-white leading-tight">Time-Lord Laboratory</h2>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">Zodiacal Releasing (Valens System)</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-white/50 hover:text-white transition-all border border-white/5"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row p-6 gap-6">
                    
                    {/* Left: Releasing Table */}
                    <div className="w-full md:w-1/2 h-full">
                        <ZodiacalReleasing data={chartData} />
                    </div>

                    {/* Right: Insights & Theory */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex-1 overflow-y-auto custom-scrollbar">
                            <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Analiza Epok</h3>
                            <div className="space-y-4 text-sm text-white/70 leading-relaxed font-light">
                                <p>
                                    Technika <span className="text-white font-medium">Zodiacal Releasing</span> to jedna z najpotężniejszych metod predykcyjnych starożytnej astrologii. 
                                    Pozwala ona zidentyfikować kluczowe okresy zwrotne w życiu, dzieląc je na sferę materialną (Fortuna) oraz duchową/zawodową (Spirit).
                                </p>
                                
                                <div className="grid grid-cols-1 gap-3 mt-6">
                                    <div className="p-4 rounded-lg bg-black/40 border-l-2 border-[#D4AF37]">
                                        <div className="text-[10px] uppercase text-[#D4AF37] font-bold mb-1">Okresy Szczytowe (Peak)</div>
                                        <p className="text-[11px] text-white/60">
                                            Moment największej aktywności występuje, gdy planeta władająca okresem znajduje się w znakach kątowych (I, IV, VII, X) względem znaku Fortuny. To wtedy Twoje działania zyskują największy impet.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-black/40 border-l-2 border-[#9B51E0]">
                                        <div className="text-[10px] uppercase text-[#9B51E0] font-bold mb-1">Loosing of the Bond</div>
                                        <p className="text-[11px] text-white/60">
                                            Zjawisko "Zrywania Więzi" następuje podczas drugiego przejścia przez ten sam znak w cyklu. Często oznacza to radykalną zmianę kierunku życia lub domknięcie ważnego rozdziału.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="text-white font-medium mb-2">Jak interpretować?</h4>
                                    <ul className="list-disc list-inside space-y-2 text-[12px] text-white/50">
                                        <li>Lot of Spirit: Twoja wola, kariera, prestiż i kierunek życiowy.</li>
                                        <li>Lot of Fortune: Zdrowie, ciało, materialne zasoby i "to, co Ci się przydarza".</li>
                                        <li>Zwróć uwagę na planety w znaku okresu – ich natura zdefiniuje "kolor" danej epoki.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* CTA Squeeze Card Placeholder */}
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30">
                            <h4 className="text-[#D4AF37] font-bold text-xs uppercase mb-2">Raport Premium Ad Astra</h4>
                            <p className="text-xs text-white/80 mb-4 font-light">Chcesz wiedzieć, kiedy dokładnie nastąpi Twój kolejny "Peak Period"? Zamów pełną interpretację swojej linii czasu.</p>
                            <button className="w-full py-3 bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20">
                                Pobierz Pełny Fragment E-booka (Gratis)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
