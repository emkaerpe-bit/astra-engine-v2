import React, { useState, useCallback, useEffect } from 'react';
import * as luxon from 'luxon';
const { DateTime } = luxon;
import './index.css';
import Navbar from './components/Navbar';
import IntakeEngine from './components/IntakeEngine';
import CalculationSequence from './components/CalculationSequence';
import Dashboard from './components/Dashboard';
import AstroControlPanel from './components/AstroControlPanel';
import TransitControl from './components/TransitControl';
import PrognosticControl from './components/PrognosticControl';
import PrognosticLaboratory from './components/PrognosticLaboratory';
import DispositorLaboratory from './components/DispositorLaboratory';
import DispositorControl from './components/DispositorControl';
import SabianControl from './components/SabianControl';
import SabianLaboratory from './components/SabianLaboratory';
import TimeMachine from './components/TimeMachine';
import DatabaseHome from './components/DatabaseHome';
import ZodiacalReleasingLaboratory from './components/ZodiacalReleasingLaboratory';
import SabianLibrary from './components/SabianLibrary';
import AnalysisLaboratory from './components/AnalysisLaboratory';
import MidpointLaboratory from './components/MidpointLaboratory';
import SynastrySetup from './components/SynastrySetup';
import DualDashboard from './components/DualDashboard';
// FORCE_RELOAD_TRIGGER: ACG_RENDER_ENGINE_V2.5 (Diagnostics Ready)
import ZodiacalReleasing from './components/ZodiacalReleasing';
import AstroCartoGraphy from './components/AstroCartoGraphy';
import RelocationAtlas from './components/RelocationAtlas';


const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3005' : '');

export default function App() {

  const [stage, setStage] = useState('home');
  const [chartData, setChartData] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Global Control States
  const [activePlanets, setActivePlanets] = useState(new Set());
  const [activeAspects, setActiveAspects] = useState(new Set());
  const [activeLots, setActiveLots] = useState(new Set([]));
  const [activeStars, setActiveStars] = useState(new Set([]));
  const [activePatterns, setActivePatterns] = useState(new Set([]));
  const [isTransitActive, setIsTransitActive] = useState(false);
  const [showLaboratory, setShowLaboratory] = useState(false);
  const [showPrognosticLaboratory, setShowPrognosticLaboratory] = useState(false);
  const [showDispositorLaboratory, setShowDispositorLaboratory] = useState(false);
  const [showReleasingLaboratory, setShowReleasingLaboratory] = useState(false);
  const [showSabianLaboratory, setShowSabianLaboratory] = useState(false);
  const [showSabianLibrary, setShowSabianLibrary] = useState(false);
  const [showAnalysisLaboratory, setShowAnalysisLaboratory] = useState(false);
  const [showMidpointLaboratory, setShowMidpointLaboratory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [transitData, setTransitData] = useState(null);
  const [prognosticData, setPrognosticData] = useState(null);
  const [isPrognosticActive, setIsPrognosticActive] = useState(false);
  const [showTimeMachine, setShowTimeMachine] = useState(false);
  const [showACG, setShowACG] = useState(false);
  const [isStandaloneACG, setIsStandaloneACG] = useState(false);
  const [isDualWheel, setIsDualWheel] = useState(false);
  const [secondChartData, setSecondChartData] = useState(null);
  const [showSecondPersonDB, setShowSecondPersonDB] = useState(false);

  // Relocation Mode Detection
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'relocation_view') {
      const savedRelocated = localStorage.getItem('relocated_chart_data');
      if (savedRelocated) {
        setChartData(JSON.parse(savedRelocated));
        setStage('dashboard');
      }
    } else if (params.get('mode') === 'acg') {
      setStage('acg_standalone');
      const data = localStorage.getItem('acg_chart_data');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setChartData(parsed);
          setIsStandaloneACG(true);
        } catch (e) {
          console.error("Failed to parse ACG data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    // TRIGGER HMR: Visibility Update v2
    if (chartData) {
      const corePlanetKeys = [
        'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 
        'uranus', 'neptune', 'pluto', 'node', 'south_node', 'chiron', 'lilith'
      ];
      
      setActivePlanets(new Set(corePlanetKeys));
      const aspectTypes = (chartData.aspects || []).map(a => a.type);
      setActiveAspects(new Set(aspectTypes));
      setActiveLots(new Set([]));
      setActiveStars(new Set());
    }
  }, [chartData]);

  const handleFormSubmit = useCallback((values) => {
    const history = JSON.parse(localStorage.getItem('astra_history') || '[]');
    const existingIndex = history.findIndex(h => 
      h.name === values.name && 
      h.date === values.date && 
      h.time === values.time &&
      h.location === values.location
    );

    let updatedHistory;
    if (existingIndex !== -1) {
      const existing = history.splice(existingIndex, 1)[0];
      updatedHistory = [{ ...existing, timestamp: new Date().toISOString() }, ...history];
    } else {
      const historyEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...values
      };
      updatedHistory = [historyEntry, ...history];
    }

    localStorage.setItem('astra_history', JSON.stringify(updatedHistory.slice(0, 50)));

    setFormValues(values);
    setApiError(null);
    setChartData(null);
    setStage('calculating');

    fetch(`${API_URL}/api/chart?t=${Date.now()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((data) => {
        setChartData(data);
      })
      .catch((err) => {
        setApiError(err.error || err.message || 'Calculation failed');
      });
  }, []);

  const handleDatabaseSelect = (entry) => {
    const { id, timestamp, ...values } = entry;
    setFormValues(values);
    setApiError(null);
    setChartData(null);
    setStage('calculating');

    fetch(`${API_URL}/api/chart?t=${Date.now()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(err => setApiError(err.message));
  };

  const handleCalculateTransits = async (fullDate, location, lat, lng) => {
    try {
      const parts = (fullDate || '').split(' ');
      const date = parts[0] || new Date().toISOString().split('T')[0];
      const time = parts[1] || "12:00";

      const response = await fetch(`${API_URL}/api/transits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date, time, location, lat, lng,
          zodiacType: formValues?.zodiacType || 'tropical',
          ayanamsa: formValues?.ayanamsa || 1
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setTransitData(data);
      setIsTransitActive(true);
    } catch (err) {
      alert("Failed to calculate transits: " + err.message);
    }
  };

  const handleSettingChange = async (updates) => {
    if (!formValues) return;
    const updatedValues = { ...formValues, ...updates };
    setFormValues(updatedValues);
    try {
      const response = await fetch(`${API_URL}/api/chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedValues),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setChartData(data);
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleSecondPersonSelect = async (entry) => {
    setShowSecondPersonDB(false);
    const { id, timestamp, ...values } = entry;
    try {
      const response = await fetch(`${API_URL}/api/chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      setSecondChartData(data);
    } catch (e) {
      alert("Błąd wczytywania drugiej osoby");
    }
  };

  const handleSynastryCalculate = async (pA, ztA, pB, ztB) => {
    setApiError(null);
    setChartData(null);
    setSecondChartData(null);
    setStage('calculating');

    try {
      // Clean inputs from database metadata
      const cleanA = pA?.id ? (({ id, timestamp, ...o }) => o)(pA) : pA;
      const cleanB = pB?.id ? (({ id, timestamp, ...o }) => o)(pB) : pB;

      // 1. Fetch Person A with its zodiac type
      const resA = await fetch(`${API_URL}/api/chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cleanA, zodiacType: ztA })
      });
      if (!resA.ok) throw new Error("Problem z Kołem 1");
      const dataA = await resA.json();

      // 2. Fetch Person B with its zodiac type
      const resB = await fetch(`${API_URL}/api/chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cleanB, zodiacType: ztB })
      });
      if (!resB.ok) throw new Error("Problem z Kołem 2");
      const dataB = await resB.json();

      setChartData(dataA);
      setSecondChartData(dataB);
      setIsDualWheel(true);
      setStage('dual_dashboard');
    } catch (err) {
      console.error("Synastry Error:", err);
      setApiError("Błąd generowania przecięcia: " + err.message);
      // Wait a bit so user can see the error before going back
      setTimeout(() => setStage('home'), 2000);
    }
  };

  const handleCalculatePrognostics = async (birthDate, targetDate, type) => {
    try {
      const response = await fetch(`${API_URL}/api/prognostics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          birthDate, 
          targetDate, 
          type,
          lat: formValues?.lat,
          lng: formValues?.lng,
          zodiacType: formValues?.zodiacType || 'tropical',
          ayanamsa: formValues?.ayanamsa || 1
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setPrognosticData(data);
      setIsPrognosticActive(true);
    } catch (err) {
      alert("Failed to calculate prognostics: " + err.message);
    }
  };

  const handleAnimationDone = useCallback(() => {
    if (chartData || apiError) {
      setStage('dashboard');
    } else {
      const interval = setInterval(() => {
        setChartData((prev) => {
          if (prev) {
            clearInterval(interval);
            setStage('dashboard');
          }
          return prev;
        });
      }, 200);
      setTimeout(() => {
        clearInterval(interval);
        setStage('dashboard');
      }, 10000);
    }
  }, [chartData, apiError]);

  const [showTimeLordTable, setShowTimeLordTable] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1E9DE] text-[#1F2226] selection:bg-gold/20 relative">
      {stage !== 'acg_standalone' && (
        <Navbar 
          stage={stage} 
          onReset={() => { 
            setStage('home'); 
            setChartData(null); 
            setSecondChartData(null);
            setIsDualWheel(false);
          }} 
          onToggleSettings={() => setShowSettings(!showSettings)}
        />
      )}

      {/* OVERLAY SETTINGS PANEL */}
      {stage === 'dashboard' && showSettings && (
        <div 
          className="fixed top-20 right-8 z-[9999] flex flex-col gap-4 animate-in slide-in-from-right-4 duration-500 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <AstroControlPanel 
              chartData={chartData}
              planets={chartData?.planets}
              aspects={chartData?.aspects}
              lots={chartData?.lots}
              activePlanets={activePlanets}
              setActivePlanets={setActivePlanets}
              activeAspects={activeAspects}
              setActiveAspects={setActiveAspects}
              activeLots={activeLots}
              setActiveLots={setActiveLots}
              stars={chartData?.stars}
              activeStars={activeStars}
              setActiveStars={setActiveStars}
              patterns={chartData?.patterns}
              activePatterns={activePatterns}
              setActivePatterns={setActivePatterns}
              currentHouseSystem={formValues?.houseSystem || 'P'}
              onHouseSystemChange={(sys) => handleSettingChange({ houseSystem: sys })}
              currentZodiacType={formValues?.zodiacType || 'tropical'}
              onZodiacChange={(zt) => handleSettingChange({ zodiacType: zt })}
              currentAyanamsa={formValues?.ayanamsa || 1}
              onAyanamsaChange={(aya) => handleSettingChange({ ayanamsa: aya })}
              showACG={showACG}
              setShowACG={setShowACG}
              isDualWheel={isDualWheel}
              onToggleDualWheel={() => setIsDualWheel(!isDualWheel)}
              secondChartData={secondChartData}
              onLoadSecondChart={() => setShowSecondPersonDB(true)}
              onOpenSynastrySetup={() => setStage('synastry_setup')}
            />
          </div>
          <div className="pointer-events-auto">
            <TransitControl 
              onCalculate={(d, loc) => handleCalculateTransits(d, loc, chartData?.input?.location?.lat, chartData?.input?.location?.lng)}
              isActive={isTransitActive}
              onToggle={() => setIsTransitActive(!isTransitActive)}
              onOpenLab={() => setShowLaboratory(true)}
              showTimeMachine={showTimeMachine}
              onToggleTimeMachine={() => setShowTimeMachine(!showTimeMachine)}
            />
          </div>
          <div className="pointer-events-auto">
            <PrognosticControl 
              birthDate={formValues?.date}
              onCalculate={handleCalculatePrognostics}
              isActive={isPrognosticActive}
              onToggle={() => setIsPrognosticActive(!isPrognosticActive)}
              onOpenLab={() => setShowPrognosticLaboratory(true)}
            />
          </div>
          <div className="pointer-events-auto">
            <DispositorControl 
              onOpenLab={() => setShowDispositorLaboratory(true)}
            />
          </div>
          <div className="pointer-events-auto">
            <SabianControl 
              onOpenLab={() => setShowAnalysisLaboratory(true)}
              onOpenLibrary={() => setShowSabianLibrary(true)}
            />
          </div>
          <div className="w-[320px] space-y-4">
            <div className="pointer-events-auto">
              <button 
                onClick={() => setShowTimeLordTable(!showTimeLordTable)}
                className={`w-full p-4 backdrop-blur-md border rounded-xl flex items-center justify-between transition-all group shadow-xl ${
                  showTimeLordTable ? 'bg-black/60 border-[#D4AF37]' : 'bg-black/40 border-[#D4AF37]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1F2226] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-[#D4AF37]/20">
                    <span className="text-xl">⌛</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Time-Lord [V1]</div>
                    <div className="text-xs text-white/90 font-serif italic">Zodiacal Releasing</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setShowReleasingLaboratory(true); }}
                    className="bg-[#D4AF37] text-[#1F2226] px-3 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-white cursor-pointer"
                  >
                    Lab
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${showTimeLordTable ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/20'}`} />
                </div>
              </button>

              {/* Quick Timeline View (Mini) - TOGGLEABLE */}
              {showTimeLordTable && chartData?.zodiacalReleasing && (
                <div className="mt-2 scale-90 origin-top animate-in fade-in slide-in-from-top-4 duration-500">
                  <ZodiacalReleasing 
                    data={chartData.zodiacalReleasing} 
                    peakSigns={chartData.metadata.peakSigns} 
                    lots={chartData.lots}
                  />
                </div>
              )}
            </div>

            <div className="pointer-events-auto">
              <button 
                onClick={() => setShowMidpointLaboratory(true)}
                className="w-full p-4 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl flex items-center justify-between hover:bg-black/60 transition-all group shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-xl text-[#1F2226]">🎯</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Midpoint Matrix</div>
                    <div className="text-xs text-white/90 font-serif italic">90° Dial Engine</div>
                  </div>
                </div>
                <div className="bg-[#D4AF37] text-[#1F2226] px-3 py-1 rounded-md text-[9px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Uruchom
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'home' && (
        <DatabaseHome 
          onSelect={handleDatabaseSelect} 
          onCreateNew={() => setStage('intake')} 
          onOpenSynastry={() => setStage('synastry_setup')}
        />
      )}

      {stage === 'synastry_setup' && (
        <SynastrySetup 
          history={JSON.parse(localStorage.getItem('astra_history') || '[]')}
          onCalculate={handleSynastryCalculate}
          onBack={() => setStage('home')}
        />
      )}

      {stage === 'intake' && (
        <IntakeEngine onSubmit={handleFormSubmit} />
      )}

      {stage === 'calculating' && (
        <CalculationSequence onComplete={handleAnimationDone} />
      )}

      {showSecondPersonDB && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-12">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-[#F1E9DE] border border-white/20">
            <DatabaseHome 
              onSelect={handleSecondPersonSelect} 
              onCreateNew={() => { setShowSecondPersonDB(false); setStage('intake'); }} 
              isOverlay={true}
              onClose={() => setShowSecondPersonDB(false)}
            />
          </div>
        </div>
      )}

      {stage === 'dual_dashboard' && (
        <DualDashboard 
          chartData={chartData}
          secondChartData={secondChartData}
          onBack={() => setStage('synastry_setup')}
          activePlanets={activePlanets}
          activeAspects={activeAspects}
        />
      )}

      {stage === 'dashboard' && (
        <Dashboard 
          key={chartData.metadata.zodiacType}
          chartData={chartData} 
          error={apiError}
          activePlanets={activePlanets}
          setActivePlanets={setActivePlanets}
          activeAspects={activeAspects}
          setActiveAspects={setActiveAspects}
          activeLots={activeLots}
          activeStars={activeStars}
          isTransitActive={isTransitActive}
          setIsTransitActive={setIsTransitActive}
          showLaboratory={showLaboratory}
          setShowLaboratory={setShowLaboratory}
          transitData={transitData}
          prognosticData={isPrognosticActive ? prognosticData : null}
          onTimeChange={(newDate) => {
            handleCalculateTransits(
              newDate, 
              chartData?.input?.location?.query || "User Location",
              chartData?.input?.location?.lat,
              chartData?.input?.location?.lng
            );
          }}
          showTimeMachine={showTimeMachine}
          onToggleTimeMachine={() => setShowTimeMachine(!showTimeMachine)}
          onHouseSystemChange={(sys) => handleSettingChange({ houseSystem: sys })}
          activePatterns={activePatterns}
          setShowDispositorLaboratory={setShowDispositorLaboratory}
          showACG={showACG}
          isDualWheel={isDualWheel}
          secondChartData={secondChartData}
        />
      )}
      {showPrognosticLaboratory && (
        <PrognosticLaboratory 
          chartData={chartData}
          prognosticData={prognosticData}
          onClose={() => setShowPrognosticLaboratory(false)}
          activePlanets={activePlanets}
          activeAspects={activeAspects}
          activePatterns={activePatterns}
        />
      )}
      {showDispositorLaboratory && (
        <DispositorLaboratory 
          isOpen={showDispositorLaboratory}
          onClose={() => setShowDispositorLaboratory(false)}
          chartData={chartData}
          activePlanets={activePlanets}
          activeAspects={activeAspects}
        />
      )}
      {showReleasingLaboratory && (
        <ZodiacalReleasingLaboratory 
          isOpen={showReleasingLaboratory}
          onClose={() => setShowReleasingLaboratory(false)}
          chartData={chartData}
        />
      )}
      {showSabianLaboratory && (
        <SabianLaboratory 
          chartData={chartData}
          onClose={() => setShowSabianLaboratory(false)}
        />
      )}
      {showAnalysisLaboratory && (
        <AnalysisLaboratory 
          chartData={chartData}
          onClose={() => setShowAnalysisLaboratory(false)}
        />
      )}
      {showSabianLibrary && (
        <SabianLibrary 
          onClose={() => setShowSabianLibrary(false)}
        />
      )}
      {showMidpointLaboratory && (
        <MidpointLaboratory 
          isOpen={showMidpointLaboratory}
          onClose={() => setShowMidpointLaboratory(false)}
          chartData={chartData}
          activePatterns={activePatterns}
        />
      )}
      {stage === 'acg_standalone' && (
        <div className="min-h-screen bg-[#0F1115] flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-[1600px] p-4 md:p-12 pb-32">
            {chartData ? (
              <RelocationAtlas chartData={chartData} />
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center bg-white/5 rounded-[2rem] border border-white/10 text-center p-10">
                 <AlertCircle size={48} className="text-[#D4AF37] mb-6 opacity-50" />
                 <h2 className="text-white font-serif italic text-2xl mb-2">Brak danych astronomicznych</h2>
                 <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest max-w-sm mx-auto">
                    Aby wyświetlić Atlas, musisz najpierw wygenerować horoskop w głównym oknie aplikacji.
                 </p>
                 <button 
                   onClick={() => window.location.href = window.location.origin}
                   className="mt-8 px-8 py-3 bg-[#D4AF37] text-black rounded-full font-bold uppercase text-[10px] tracking-widest"
                 >
                   Wróć do startu
                 </button>
              </div>
            )}
            <div className="mt-12 flex justify-center">
               <button 
                 onClick={() => {
                   setStage('dashboard');
                   window.history.pushState({}, '', '/');
                   // Attempt to close if opened in new tab, but primary is view switch
                   if (window.opener) window.close();
                 }}
                 className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-[#D4AF37] font-mono text-[11px] uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-[#1F2226] transition-all shadow-2xl hover:scale-105"
               >
                 Zamknij Atlas i wróć do Dashboardu
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
