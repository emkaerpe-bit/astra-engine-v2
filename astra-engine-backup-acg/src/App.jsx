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
import ZodiacalReleasing from './components/ZodiacalReleasing';


const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3005' : '');

export default function App() {

  const [stage, setStage] = useState('home');
  const [chartData, setChartData] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Global Control States
  const [activePlanets, setActivePlanets] = useState(new Set());
  const [activeAspects, setActiveAspects] = useState(new Set());
  const [activeLots, setActiveLots] = useState(new Set(['fortune', 'spirit']));
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

  useEffect(() => {
    if (chartData) {
      const lilithIndex = (chartData.planets || []).findIndex(p => p.key === 'lilith');
      const planetKeys = (chartData.planets || [])
        .map(p => p.key)
        .filter((key, index) => index <= lilithIndex || lilithIndex === -1);
      
      const aspectTypes = (chartData.aspects || []).map(a => a.type);
      
      setActivePlanets(new Set(planetKeys));
      setActiveAspects(new Set(aspectTypes));
      setActiveLots(new Set(['fortune', 'spirit', 'eros']));
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
      <Navbar 
        stage={stage} 
        onReset={() => { setStage('home'); setChartData(null); }} 
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      {/* OVERLAY SETTINGS PANEL */}
      {stage === 'dashboard' && showSettings && (
        <div 
          className="fixed top-20 right-8 z-[9999] flex flex-col gap-4 animate-in slide-in-from-right-4 duration-500 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <AstroControlPanel 
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
        />
      )}

      {stage === 'intake' && (
        <IntakeEngine onSubmit={handleFormSubmit} />
      )}

      {stage === 'calculating' && (
        <CalculationSequence onComplete={handleAnimationDone} />
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
    </div>
  );
}
