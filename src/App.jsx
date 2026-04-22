import React, { useState, useCallback, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import IntakeEngine from './components/IntakeEngine';
import CalculationSequence from './components/CalculationSequence';
import Dashboard from './components/Dashboard';
import AstroControlPanel from './components/AstroControlPanel';
import TransitControl from './components/TransitControl';


const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

export default function App() {

  const [stage, setStage] = useState('intake');
  const [chartData, setChartData] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Global Control States (Lifted from Dashboard for Root Stability)
  const [activePlanets, setActivePlanets] = useState(new Set());
  const [activeAspects, setActiveAspects] = useState(new Set());
  const [isTransitActive, setIsTransitActive] = useState(false);
  const [showLaboratory, setShowLaboratory] = useState(false);
  const [transitData, setTransitData] = useState(null);

  // Initialize visibility when chartData loads
  useEffect(() => {
    if (chartData) {
      setActivePlanets(new Set(chartData.planets.map(p => p.key)));
      setActiveAspects(new Set(chartData.aspects.map(a => a.type)));
    }
  }, [chartData]);

  const handleFormSubmit = useCallback((values) => {
    setFormValues(values);
    setApiError(null);
    setChartData(null); // Clear old data to ensure we wait for new results
    setStage('calculating');

    fetch(`${API_URL}/api/chart`, {

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
        console.error('[ASTRA] API error:', err);
        setApiError(err.error || err.message || 'Calculation failed');
      });
  }, []);

  const handleCalculateTransits = async (date, location) => {
    try {
      const response = await fetch(`${API_URL}/api/transits`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, location })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setTransitData(data);
      setIsTransitActive(true);
    } catch (err) {
      console.error("Transit calculation error:", err);
      alert("Failed to calculate transits: " + err.message);
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

  return (
    <div className="min-h-screen bg-[#F1E9DE] text-[#1F2226] selection:bg-gold/20 relative">
      <Navbar stage={stage} onReset={() => setStage('intake')} />

      {/* IMMOBILE CONTROL LAYER (ROOT LEVEL - FIXED TO VIEWPORT) */}
      {stage === 'dashboard' && chartData && (
        <div 
          className="absolute top-24 right-10 z-[9999] hidden xl:flex flex-col gap-4 w-[320px] pointer-events-none"
          style={{ transform: 'none' }}
        >
          <div className="pointer-events-auto">
            <AstroControlPanel 
              planets={chartData.planets}
              aspects={chartData.aspects}
              activePlanets={activePlanets}
              setActivePlanets={setActivePlanets}
              activeAspects={activeAspects}
              setActiveAspects={setActiveAspects}
            />
          </div>
          <div className="pointer-events-auto">
            <TransitControl 
              onCalculate={handleCalculateTransits}
              isActive={isTransitActive}
              onToggle={() => setIsTransitActive(!isTransitActive)}
              onOpenLab={() => setShowLaboratory(true)}
            />
          </div>
        </div>
      )}

      {stage === 'intake' && (
        <IntakeEngine onSubmit={handleFormSubmit} />
      )}

      {stage === 'calculating' && (
        <CalculationSequence onComplete={handleAnimationDone} />
      )}

      {stage === 'dashboard' && (
        <Dashboard 
          chartData={chartData} 
          error={apiError}
          activePlanets={activePlanets}
          setActivePlanets={setActivePlanets}
          activeAspects={activeAspects}
          setActiveAspects={setActiveAspects}
          isTransitActive={isTransitActive}
          setIsTransitActive={setIsTransitActive}
          showLaboratory={showLaboratory}
          setShowLaboratory={setShowLaboratory}
          transitData={transitData}
        />
      )}
    </div>
  );
}
