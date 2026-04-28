import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as topojson from "topojson-client";
import { Globe, Crosshair, MapPin, Zap, Info, Compass, LayoutGrid, Loader2, Search, Target, ArrowLeft, BarChart3 } from 'lucide-react';
import ZodiacWheel from './ZodiacWheel';
import EphemerisTable from './EphemerisTable';
import DataPanel from './DataPanel';
import { generateACGData } from '../utils/astrocartographyEngine';

// --- GEOGRAPHIC TO 3D TRANSFORMATION ---
const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const INITIAL_CITIES = [
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Warsaw', lat: 52.2297, lon: 21.0122 }
];

const RelocationAtlas = ({ chartData }) => {
  const mountRef = useRef(null);
  const globeGroupRef = useRef(null);
  const markersGroupRef = useRef(null);
  const controlsRef = useRef(null);
  const orbitingPlanetsRef = useRef([]);
  const acgGroupRef = useRef(null);
  const [acgData, setAcgData] = useState(null);
  const [activeACGPlanets, setActiveACGPlanets] = useState(new Set()); // Set of planet keys
  const [showAllLines, setShowAllLines] = useState(true);
  
  const [selectedCity, setSelectedCity] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true);
  const cometRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Relocation State
  const [relocatedData, setRelocatedData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // View State
  const [view, setView] = useState('globe'); // 'globe' or 'dashboard'
  const [atlasMode, setAtlasMode] = useState('acg'); // 'acg' or 'relocation'

  // --- SAFETY CHECK: Prevent crash if no data exists ---
  if (!chartData && !localStorage.getItem('natalChart')) {
    return (
      <div className="h-screen w-full bg-[#1F2226] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="text-[#D4AF37] animate-spin mx-auto" size={48} />
          <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.5em]">Oczekiwanie na dane horoskopu...</p>
        </div>
      </div>
    );
  }

  const natalData = chartData || JSON.parse(localStorage.getItem('natalChart'));
  
  if (!natalData || !natalData.metadata) {
    return (
      <div className="h-screen w-full bg-[#1F2226] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="text-[#D4AF37] animate-spin mx-auto" size={48} />
          <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.5em]">Inicjalizacja macierzy astrologicznej...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Load original chart data from localStorage OR props
    const saved = localStorage.getItem('acg_chart_data');
    const dataToUse = saved ? JSON.parse(saved) : originalData;

    if (dataToUse) {
      console.log("ACG_DEBUG: Data Source Found", saved ? "localStorage" : "Props");
      setOriginalData(dataToUse);
      
      // GENERATE ACG DATA ON THE FLY
      if (dataToUse.planets && dataToUse.input?.date) {
        console.log("ACG_DEBUG: Generating data for", dataToUse.input.date);
        const birthDate = new Date(`${dataToUse.input.date}T${dataToUse.input.time || '12:00'}:00Z`);
        const generated = generateACGData(dataToUse.planets, birthDate);
        console.log("ACG_DEBUG: Data Generated", Object.keys(generated).length, "planets");
        setAcgData(generated);
        // Initially activate all planets
        setActiveACGPlanets(new Set(Object.keys(generated)));
      } else {
        console.warn("ACG_DEBUG: Missing planet data or birth date in chart object");
      }
    } else {
      console.warn("ACG_DEBUG: No chart data available (localStorage empty & props null)");
    }
  }, [chartData]);

  useEffect(() => {
    if (acgGroupRef.current && acgData) {
      if (atlasMode === 'acg' && showAllLines) {
        // Filter acgData based on active planets
        const filteredData = {};
        activeACGPlanets.forEach(key => {
          if (acgData[key]) filteredData[key] = acgData[key];
        });
        renderACGLines(filteredData);
      } else {
        acgGroupRef.current.clear();
      }
    }
  }, [acgData, activeACGPlanets, showAllLines, atlasMode]);

  const togglePlanetLine = (key) => {
    const next = new Set(activeACGPlanets);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setActiveACGPlanets(next);
  };

  const handleRelocation = async () => {
    if (!selectedCity || !originalData || !originalData.input) return;
    setIsAnalyzing(true);
    
    try {
      const birthDate = originalData.input.date;
      const birthTime = originalData.input.time;

      const API_URL = import.meta.env.VITE_API_URL || 
        (window.location.hostname === 'localhost' ? 'http://localhost:3005' : '');

      const response = await fetch(`${API_URL}/api/chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: birthDate,
          time: birthTime,
          lat: selectedCity.lat,
          lng: selectedCity.lon,
          jd: originalData.metadata.jd,
          location: selectedCity.name,
          houseSystem: originalData.input.houseSystem || 'P',
          zodiacType: originalData.input.zodiacType || 'tropical'
        })
      });
      const data = await response.json();
      
      if (data.error) {
        console.error("API Error:", data.error);
        return;
      }
      
      setRelocatedData(data);
      // Save for the new window
      localStorage.setItem('relocated_chart_data', JSON.stringify(data));
    } catch (err) {
      console.error("Relocation failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- RENDER ACG LINES ON 3D GLOBE ---
  const renderACGLines = (data) => {
    console.log("ACG_DEBUG: Initializing 3D Line Rendering...");
    if (!acgGroupRef.current) {
      console.error("ACG_DEBUG: acgGroupRef is missing!");
      return;
    }
    const group = acgGroupRef.current;
    group.clear();

    const RADIUS = 100.5; // Slightly above globe surface to prevent flickering

    Object.keys(data).forEach(planetKey => {
      const p = data[planetKey];
      const color = new THREE.Color(p.color);
      
      // 1. Render MC/IC (Vertical Meridians)
      const renderMeridian = (lon, isDashed = false) => {
        const points = [];
        for (let lat = -89; lat <= 89; lat += 2) {
          points.push(latLonToVector3(lat, lon, RADIUS));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        let material;
        if (isDashed) {
          material = new THREE.LineDashedMaterial({ 
            color, 
            transparent: true, 
            opacity: 0.2,
            dashSize: 3,
            gapSize: 2,
            blending: THREE.AdditiveBlending
          });
        } else {
          material = new THREE.LineBasicMaterial({ 
            color, 
            transparent: true, 
            opacity: 0.7,
            blending: THREE.AdditiveBlending
          });
        }
        
        const line = isDashed ? new THREE.LineSegments(geometry, material) : new THREE.Line(geometry, material);
        if (isDashed) line.computeLineDistances();
        group.add(line);
      };

      renderMeridian(p.mc, false); // MC
      renderMeridian(p.ic, true);  // IC (Dashed/Subtle)

      // 2. Render RISE/SET (Horizon Curves)
      const renderCurve = (points, isRise = true) => {
        if (!points || points.length < 2) return;
        
        const threePoints = points.map(pt => latLonToVector3(pt.lat, pt.lon, RADIUS));
        const geometry = new THREE.BufferGeometry().setFromPoints(threePoints);
        const material = new THREE.LineBasicMaterial({ 
          color, 
          transparent: true, 
          opacity: 0.8,
          linewidth: 2,
          blending: THREE.AdditiveBlending
        });
        const line = new THREE.Line(geometry, material);
        group.add(line);
      };

      renderCurve(p.rise, true);
      renderCurve(p.set, false);
    });
  };

  // --- PROXIMITY ANALYSIS ---
  const getNearbyInfluences = () => {
    if (!selectedCity || !acgData) return [];
    const influences = [];
    
    Object.keys(acgData).forEach(key => {
      const p = acgData[key];
      
      // Check MC/IC (Longitude proximity)
      const mcDist = Math.abs(selectedCity.lon - p.mc);
      if (mcDist < 5 || (360 - mcDist) < 5) {
        influences.push({ planet: key, line: 'MC', dist: Math.min(mcDist, 360-mcDist) });
      }
      const icDist = Math.abs(selectedCity.lon - p.ic);
      if (icDist < 5 || (360 - icDist) < 5) {
        influences.push({ planet: key, line: 'IC', dist: Math.min(icDist, 360-icDist) });
      }

      // Check Curves (ASC/DSC)
      const findMinDist = (points, label) => {
        let min = 999;
        points.forEach(pt => {
          const d = Math.sqrt(Math.pow(pt.lat - selectedCity.lat, 2) + Math.pow(pt.lon - selectedCity.lon, 2));
          if (d < min) min = d;
        });
        if (min < 5) {
          influences.push({ planet: key, line: label, dist: min });
        }
      };
      
      findMinDist(p.rise, 'ASC');
      findMinDist(p.set, 'DSC');
    });

    return influences.sort((a, b) => a.dist - b.dist);
  };
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await res.json();
      setSearchResults(data.map(item => ({
        name: item.display_name.split(',')[0],
        fullName: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      })));
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setRelocatedData(null); // Reset analysis for new city
    setSearchQuery('');
    setSearchResults([]);
    
    // Add new marker if it doesn't exist in INITIAL_CITIES
    if (!INITIAL_CITIES.find(c => c.name === city.name)) {
      addMarkerToGlobe(city);
    }
  };

  const addMarkerToGlobe = (city) => {
    if (!markersGroupRef.current) return;
    const pos = latLonToVector3(city.lat, city.lon, 101);
    
    // --- ACG Lines Layer ---
    const acgGroup = new THREE.Group();
    acgGroupRef.current = acgGroup;
    globeGroupRef.current.add(acgGroup);

    const markerGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xF1E9DE });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.copy(pos);
    markersGroupRef.current.add(marker);

    const haloGeo = new THREE.CircleGeometry(4, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xF1E9DE, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(pos.clone().multiplyScalar(1.002));
    halo.lookAt(new THREE.Vector3(0,0,0));
    markersGroupRef.current.add(halo);
  };

  // --- Premium Texture Generator ---
  const generatePlanetTexture = (name, baseColor, worldData = null) => {
    const canvas = document.createElement('canvas');
    // UPGRADED TO 4K ULTRA HD FOR EARTH
    const isEarth = (name === 'Ziemia' && worldData);
    canvas.width = isEarth ? 4096 : 1024; 
    canvas.height = isEarth ? 2048 : 512;
    const ctx = canvas.getContext('2d');
    
    if (isEarth) {
      // --- MINIMALIST ELEGANT EARTH (4K ULTRA HD) ---
      // Water: Deep Midnight Blue
      ctx.fillStyle = '#05162a';
      ctx.fillRect(0, 0, 4096, 2048);

      const projection = (lon, lat) => [
        (lon + 180) * (4096 / 360),
        (90 - lat) * (2048 / 180)
      ];

      // Draw Land
      ctx.fillStyle = '#b7ab9a'; // Elegant Sand/Beige
      // DRAW LAND WITH SEAM FIX AND POLAR BLENDING
      const landFeatures = topojson.feature(worldData, worldData.objects.countries).features;
      
      landFeatures.forEach(feature => {
        const drawPolygon = (ring) => {
          let minX = 4096, minY = 2048, maxX = 0, maxY = 0;
          let prevX = null;
          
          const projectedPoints = ring.map(coord => {
            const [x, y] = projection(coord[0], coord[1]);
            minX = Math.min(minX, x); minY = Math.min(minY, y);
            maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
            return [x, y];
          });

          const width = maxX - minX;
          const height = maxY - minY;
          
          // Skip artificial frames/belts (thresholds adjusted for 4K)
          if (width > 4000 && height < 50) return;
          if (projectedPoints.length < 5) return;

          ctx.beginPath();
          projectedPoints.forEach((p, i) => {
            // SEAM FIX: If we jump across the entire map, don't draw a line
            if (prevX !== null && Math.abs(p[0] - prevX) > 2000) {
              ctx.moveTo(p[0], p[1]);
            } else if (i === 0) {
              ctx.moveTo(p[0], p[1]);
            } else {
              ctx.lineTo(p[0], p[1]);
            }
            prevX = p[0];
          });
          ctx.fill();
          ctx.closePath();
        };

        if (feature.geometry.type === 'Polygon') {
          drawPolygon(feature.geometry.coordinates[0]);
        } else if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach(multi => {
            drawPolygon(multi[0]);
          });
        }
      });

      // --- LUXE POLAR CAPS (4K Optimized) ---
      const drawIceCap = (isNorth) => {
        const height = 80; // Adjusted for 4K
        const yStart = isNorth ? 0 : 2048 - height;
        const grad = ctx.createLinearGradient(0, isNorth ? 0 : 2048, 0, isNorth ? height : 2048 - height);
        
        const iceColor = '#f8fafc'; // Polar White
        grad.addColorStop(0, iceColor);
        grad.addColorStop(0.5, 'rgba(248, 250, 252, 0.5)');
        grad.addColorStop(1, 'rgba(248, 250, 252, 0)');
        
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillRect(0, yStart, 4096, height);
      };

      drawIceCap(true);  // North Pole
      drawIceCap(false); // South Pole

      // --- PREMIUM DASHED CELESTIAL GRID (4K Adjusted) ---
      ctx.setLineDash([20, 30]); // Scaled for 4K
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1.5; // Optimized for 4K
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#d4af37';
      ctx.globalAlpha = 0.6;

      // 1. Dashed Gold Equator
      ctx.beginPath();
      ctx.moveTo(0, 1024);
      ctx.lineTo(4096, 1024);
      ctx.stroke();

      // 2. Very Subtle Dashed Tropics
      ctx.setLineDash([10, 60]);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.shadowBlur = 0;
      // Tropic of Cancer
      ctx.beginPath(); ctx.moveTo(0, 760); ctx.lineTo(4096, 760); ctx.stroke();
      // Tropic of Capricorn
      ctx.beginPath(); ctx.moveTo(0, 1288); ctx.lineTo(4096, 1288); ctx.stroke();
      ctx.setLineDash([]); // Reset
    } else {
      // Base Gradient for other planets
      const colorStr = new THREE.Color(baseColor).getStyle();
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, new THREE.Color(baseColor).multiplyScalar(0.8).getStyle());
      grad.addColorStop(0.5, colorStr);
      grad.addColorStop(1, new THREE.Color(baseColor).multiplyScalar(0.6).getStyle());
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Procedural Noise
      ctx.globalAlpha = 0.3;
      for(let i=0; i<1000; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#000' : '#fff';
        if (name === 'Mars') ctx.fillStyle = i % 5 === 0 ? '#400' : '#844';
        if (name === 'Jowisz' || name === 'Saturn') {
          const y = Math.random() * 512;
          ctx.fillRect(0, y, 1024, Math.random() * 20);
        } else {
          ctx.beginPath();
          ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // --- Real Astronomy Converter ---
  const astroToCartesian = (lng, lat, dist, sunPos) => {
    // Logarithmic scaling to keep planets within a viewable range (400 to 4500 units)
    const scaledDist = 500 + (Math.log10(dist + 0.1) + 1) * 1500;
    
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng) * (Math.PI / 180);
    
    return new THREE.Vector3(
      sunPos.x + scaledDist * Math.sin(phi) * Math.cos(theta),
      sunPos.y + scaledDist * Math.cos(phi),
      sunPos.z + scaledDist * Math.sin(phi) * Math.sin(theta)
    );
  };

  const PLANET_NAME_MAP = {
    'Sun': 'Słońce', 'Moon': 'Księżyc', 'Mercury': 'Merkury', 'Venus': 'Wenus',
    'Mars': 'Mars', 'Jupiter': 'Jowisz', 'Saturn': 'Saturn', 'Uranus': 'Uran',
    'Neptune': 'Neptun', 'Pluto': 'Pluton', 'Chiron': 'Chiron',
    'Lilith': 'Lilith', 'True Node': 'Węzeł Północny'
  };

  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer, controls, raycaster, mouse;
    let isMounted = true;
    const planetsInScene = [];

    const init = async () => {
      const response = await fetch('/world-data.json');
      const worldData = await response.json();
      window.worldData = worldData; // Make accessible for texture generator
      const land = topojson.feature(worldData, worldData.objects.land);
      const landFeatures = land.features || [land];

      if (!isMounted) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      scene = new THREE.Scene();
      
      const markersGroup = new THREE.Group();
      markersGroupRef.current = markersGroup;

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      // --- HYPNOTIC STARFIELD (15,000 Stars) ---
      const starGeo = new THREE.BufferGeometry();
      const starPos = [];
      const starAlphas = new Float32Array(15000);
      for(let i=0; i<15000; i++) {
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 4000;
        const z = (Math.random() - 0.5) * 4000;
        starPos.push(x, y, z);
        starAlphas[i] = Math.random();
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
      starGeo.setAttribute('alpha', new THREE.BufferAttribute(starAlphas, 1));
      
      const starMat = new THREE.PointsMaterial({ 
        color: 0xD4AF37, 
        size: 1.2, 
        transparent: true, 
        opacity: 0.6,
        sizeAttenuation: true
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // Nebula clouds removed for minimalist design

      // --- COMET SYSTEM ---
      const createComet = () => {
        const cometGroup = new THREE.Group();
        const headG = new THREE.SphereGeometry(2, 8, 8);
        const headM = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        cometGroup.add(new THREE.Mesh(headG, headM));
        
        const tailGeo = new THREE.BufferGeometry();
        const tailPos = [];
        for(let i=0; i<100; i++) tailPos.push(0, 0, 0);
        tailGeo.setAttribute('position', new THREE.Float32BufferAttribute(tailPos, 3));
        const tailMat = new THREE.PointsMaterial({ color: 0xD4AF37, size: 1, transparent: true, opacity: 0.3 });
        const tail = new THREE.Points(tailGeo, tailMat);
        cometGroup.add(tail);
        
        cometGroup.position.set(-2000, 1000, -2000);
        cometGroup.userData = { active: false, velocity: new THREE.Vector3(10, -5, 5) };
        scene.add(cometGroup);
        cometRef.current = cometGroup;
      };
      createComet();

      // --- CELESTIAL ALIGNMENT (Full Solar System) ---
      const PLANET_CONFIG = [
        { name: 'Słońce', r: 180, color: 0xFFD700, pos: {x: -1200, y: -600, z: -1500}, glow: 1.2, emissive: 0xFFCC00, isSun: true },
        { name: 'Merkury', r: 8, color: 0xD67D3E, orbitRadius: 400, speed: 0.008, glow: 0.1 },
        { name: 'Wenus', r: 18, color: 0xE3BB76, orbitRadius: 700, speed: 0.005, glow: 0.4 },
        { name: 'Mars', r: 12, color: 0xFF4500, orbitRadius: 1400, speed: 0.002, glow: 0.3 },
        { name: 'Jowisz', r: 55, color: 0xD3A361, orbitRadius: 2000, speed: 0.001, glow: 0.2 },
        { name: 'Saturn', r: 45, color: 0xD4AF37, orbitRadius: 2600, speed: 0.0006, glow: 0.2, hasRings: true },
        { name: 'Uran', r: 30, color: 0xAFDBF5, orbitRadius: 3200, speed: 0.0003, glow: 0.1 },
        { name: 'Neptun', r: 30, color: 0x3B82F6, orbitRadius: 3800, speed: 0.00015, glow: 0.1 },
        { name: 'Pluton', r: 6, color: 0x949494, orbitRadius: 4400, speed: 0.0001, glow: 0.05 },
        { name: 'Chiron', r: 10, color: 0x00FFFF, orbitRadius: 2300, speed: 0.0012, geo: 'crystal' }
      ];

      const createPlanet = (conf) => {
        const sunPos = PLANET_CONFIG[0].pos;
        const group = new THREE.Group();
        
        if (conf.isSun) {
          // --- CINEMATIC MULTI-LAYER SUN ---
          const sunGroup = new THREE.Group();
          
          // 1. Core
          const sunG = new THREE.SphereGeometry(conf.r, 64, 64);
          const sunM = new THREE.MeshStandardMaterial({ 
            color: 0xFFD700, 
            emissive: 0xFF8C00, 
            emissiveIntensity: 2,
            roughness: 0.1,
            metalness: 0.1
          });
          const sunCore = new THREE.Mesh(sunG, sunM);
          sunGroup.add(sunCore);

          // 2. Inner Corona
          const coronaG = new THREE.SphereGeometry(conf.r * 1.15, 64, 64);
          const coronaM = new THREE.MeshBasicMaterial({ 
            color: 0xFFD700, 
            transparent: true, 
            opacity: 0.4, 
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending 
          });
          sunGroup.add(new THREE.Mesh(coronaG, coronaM));

          // 3. Outer Nebula Glow
          const nebulaG = new THREE.SphereGeometry(conf.r * 1.8, 64, 64);
          const nebulaM = new THREE.MeshBasicMaterial({ 
            color: 0xFF8C00, 
            transparent: true, 
            opacity: 0.15, 
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending 
          });
          sunGroup.add(new THREE.Mesh(nebulaG, nebulaM));

          sunGroup.position.set(conf.pos.x, conf.pos.y, conf.pos.z);
          sunGroup.userData = { name: 'Słońce' };
          scene.add(sunGroup);

          // Hitbox
          const sunHitbox = new THREE.Mesh(new THREE.SphereGeometry(conf.r * 1.5, 16, 16), new THREE.MeshBasicMaterial({ visible: false }));
          sunHitbox.userData = { name: 'Słońce' };
          sunHitbox.position.copy(sunGroup.position);
          scene.add(sunHitbox);
          planetsInScene.push(sunHitbox);
          return;
        }

        // --- PREMIUM PLANET RENDERING ---
        let planetG;
        if (conf.geo === 'crystal') planetG = new THREE.IcosahedronGeometry(conf.r, 0);
        else if (conf.geo === 'diamond') planetG = new THREE.OctahedronGeometry(conf.r, 0);
        else if (conf.geo === 'torus') planetG = new THREE.TorusGeometry(conf.r * 0.8, conf.r * 0.2, 16, 32);
        else planetG = new THREE.SphereGeometry(conf.r, 48, 48);

        const planetM = new THREE.MeshStandardMaterial({ 
          map: conf.geo ? null : generatePlanetTexture(conf.name, conf.color, window.worldData),
          color: conf.geo ? conf.color : 0xffffff,
          roughness: conf.geo === 'crystal' ? 0.1 : 0.7, 
          metalness: conf.geo === 'crystal' ? 0.9 : 0.2,
          emissive: conf.color,
          emissiveIntensity: conf.geo ? 0.5 : 0.05,
          transparent: conf.geo ? true : false,
          opacity: conf.geo ? 0.8 : 1
        });
        const p = new THREE.Mesh(planetG, planetM);
        p.userData = { name: conf.name };
        group.add(p);
        
        // Atmospheric Rim Glow (Fresnel)
        const rimG = new THREE.SphereGeometry(conf.r * 1.05, 48, 48);
        const rimM = new THREE.MeshBasicMaterial({ 
          color: conf.color, 
          transparent: true, 
          opacity: 0.2, 
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        group.add(new THREE.Mesh(rimG, rimM));

        // --- EARTH SPECIAL: PREMIUM MOON ---
        if (conf.name === 'Ziemia') {
           const moonGroup = new THREE.Group();
           const moonG = new THREE.SphereGeometry(6, 32, 32);
           const moonM = new THREE.MeshStandardMaterial({ 
             map: generatePlanetTexture('Księżyc', 0x888888),
             roughness: 0.9,
             metalness: 0.1
           });
           const moonMesh = new THREE.Mesh(moonG, moonM);
           moonGroup.add(moonMesh);
           
           // Moon Glow
           const moonGlow = new THREE.Mesh(
             new THREE.SphereGeometry(6.5, 32, 32),
             new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.1, side: THREE.BackSide })
           );
           moonGroup.add(moonGlow);
           
           group.add(moonGroup);
           window.moonGroup = moonGroup; // For animation
        }

        const hitboxG = new THREE.SphereGeometry(conf.r * 2.5, 16, 16);
        const hitboxM = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false });
        const hitbox = new THREE.Mesh(hitboxG, hitboxM);
        hitbox.userData = { name: conf.name };
        group.add(hitbox);
        planetsInScene.push(hitbox);
        
        if (conf.hasRings) {
          const ringGeo = new THREE.RingGeometry(conf.r * 1.4, conf.r * 2.8, 64);
          const ringMat = new THREE.MeshStandardMaterial({ 
            color: conf.color, 
            transparent: true, 
            opacity: 0.5, 
            side: THREE.DoubleSide,
            metalness: 0.4,
            roughness: 0.2
          });
          const rings = new THREE.Mesh(ringGeo, ringMat);
          rings.rotation.x = Math.PI / 3;
          group.add(rings);
        }

        const orbitPoints = [];
        const radiusX = conf.orbitRadius;
        const radiusY = radiusX * 0.4;
        for (let i = 0; i <= 128; i++) {
           const angle = (i / 128) * Math.PI * 2;
           orbitPoints.push(new THREE.Vector3(
             sunPos.x + Math.cos(angle) * radiusX,
             sunPos.y + Math.sin(angle) * radiusY * 0.5,
             sunPos.z + Math.sin(angle) * radiusX
           ));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineDashedMaterial({ color: 0xD4AF37, dashSize: 10, gapSize: 10, transparent: true, opacity: 0 }); // Hidden for cleaner view
        const orbit = new THREE.Line(orbitGeo, orbitMat);
        orbit.computeLineDistances();
        scene.add(orbit);

        orbitingPlanetsRef.current.push({ 
           group, 
           radiusX, 
           speed: conf.speed, 
           offset: Math.random() * Math.PI * 2 
        });
        scene.add(group);
      };


      PLANET_CONFIG.forEach(createPlanet);

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      camera.position.z = 350;
      const globeGroup = new THREE.Group();
      globeGroupRef.current = globeGroup;
      scene.add(globeGroup);

      // --- THE MAIN GLOBE (MINIMALIST ELEGANT) ---
      const globeG = new THREE.SphereGeometry(100, 64, 64);
      const globeM = new THREE.MeshStandardMaterial({ 
        map: generatePlanetTexture('Ziemia', 0x05162a, worldData),
        roughness: 0.6,
        metalness: 0.2
      });
      const earthMesh = new THREE.Mesh(globeG, globeM);
      earthMesh.userData = { name: 'Ziemia' };
      globeGroup.add(earthMesh);
      
      // --- Earth Hitbox ---
      const earthHitbox = new THREE.Mesh(
        new THREE.SphereGeometry(120, 32, 32),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false })
      );
      earthHitbox.userData = { name: 'Ziemia' };
      globeGroup.add(earthHitbox);
      planetsInScene.push(earthHitbox);

      // --- MOON (Orbiting Earth) ---
      const moonGroup = new THREE.Group();
      const moonG = new THREE.SphereGeometry(6, 32, 32);
      const moonM = new THREE.MeshStandardMaterial({ 
        map: generatePlanetTexture('Księżyc', 0x888888, worldData),
        roughness: 0.9,
        metalness: 0.1
      });
      const moon = new THREE.Mesh(moonG, moonM);
      moon.userData = { name: 'Księżyc' };
      moonGroup.add(moon);

      // Moon Glow
      const moonGlow = new THREE.Mesh(
        new THREE.SphereGeometry(6.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.1, side: THREE.BackSide })
      );
      moonGroup.add(moonGlow);
      
      const moonHitbox = new THREE.Mesh(
        new THREE.SphereGeometry(15, 16, 16),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false })
      );
      moonHitbox.userData = { name: 'Księżyc' };
      moonGroup.add(moonHitbox);
      planetsInScene.push(moonHitbox);
      
      globeGroup.add(moonGroup);

      globeGroup.add(markersGroup);
      INITIAL_CITIES.forEach(city => addMarkerToGlobe(city));

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const pLight = new THREE.PointLight(0xFFD700, 2.5); // Sun-like light
      pLight.position.set(-1000, 300, -800);
      scene.add(pLight);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 150; controls.maxDistance = 1200;
      controlsRef.current = controls;
      controls.autoRotate = isRotating;

      const onMouseMove = (event) => {
        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
        setTooltipPos({ x: event.clientX, y: event.clientY });
      };
      mountRef.current.addEventListener('mousemove', onMouseMove);
      
      const animate = () => {
        if (!isMounted) return;
        requestAnimationFrame(animate);
        const time = Date.now() * 0.005;
        
        // --- Star Twinkle ---
        stars.rotation.y += 0.0001;
        const alphas = stars.geometry.attributes.alpha.array;
        for(let i=0; i<15000; i++) {
          alphas[i] = 0.3 + Math.abs(Math.sin(time * 0.1 + i)) * 0.7;
        }
        stars.geometry.attributes.alpha.needsUpdate = true;

        // --- Comet Animation ---
        if (cometRef.current) {
          const comet = cometRef.current;
          if (!comet.userData.active && Math.random() < 0.002) {
             comet.userData.active = true;
             comet.position.set(-2500 + Math.random() * 500, 1500, -2000);
          }
          if (comet.userData.active) {
             comet.position.add(comet.userData.velocity);
             if (comet.position.x > 2500) comet.userData.active = false;
          }
        }
        
        // --- Pulsating Sun ---
        const sun = planetsInScene.find(p => p.userData.name === 'Słońce');
        if (sun) {
           const scale = 1 + Math.sin(time * 0.5) * 0.02;
           sun.scale.set(scale, scale, scale);
        }


        // --- Raycasting (Interactivity) ---
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planetsInScene, true);
        if (intersects.length > 0) {
          const obj = intersects[0].object;
          if (obj.userData?.name) setHoveredPlanet(obj.userData.name);
        } else {
          setHoveredPlanet(null);
        }

        markersGroup.children.forEach(child => {
          if (child.geometry.type === 'CircleGeometry') {
            child.scale.setScalar(1 + Math.sin(time) * 0.3);
            child.material.opacity = 0.2 + Math.sin(time) * 0.1;
          }
        });
        
        if (controls) {
          controls.autoRotate = isRotatingRef.current;
          controls.update();
        }

        // --- Orbiting Planets Movement (Real vs Simulation) ---
        const sunPos = PLANET_CONFIG[0].pos;
        const currentData = relocatedData || originalData;

        orbitingPlanetsRef.current.forEach(p => {
          const planetName = p.group.children[0].userData.name;
          const apiPlanet = currentData?.planets?.find(ap => PLANET_NAME_MAP[ap.name] === planetName);

          if (apiPlanet && apiPlanet.distance) {
            // Use Real Astronomical Position
            const realPos = astroToCartesian(apiPlanet.longitude, apiPlanet.latitude || 0, apiPlanet.distance, sunPos);
            p.group.position.lerp(realPos, 0.05); // Smooth transition to real position
          } else {
            // Default Simulation (Circular/Elliptical Orbit)
            const angle = time * p.speed + p.offset;
            const rx = p.radiusX;
            const ry = rx * 0.4;
            p.group.position.set(
              sunPos.x + Math.cos(angle) * rx,
              sunPos.y + Math.sin(angle) * ry * 0.5,
              sunPos.z + Math.sin(angle) * rx
            );
          }
        });

        // --- Moon Movement ---
        if (moonGroup) {
          const moonAngle = time * 0.05;
          moonGroup.position.set(Math.cos(moonAngle) * 130, 0, Math.sin(moonAngle) * 130);
          moonGroup.rotation.y += 0.01;
        }
        
        renderer.render(scene, camera);
      };
      animate();
      setIsLoaded(true);
    };

    init();
    return () => { 
      isMounted = false; 
      if (scene) scene.clear(); 
      if (mountRef.current && renderer && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array - only init once

  // Sync ref with state
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  return (
    <div className="w-full h-full min-h-[850px] bg-[#F1E9DE] rounded-[3rem] border border-[#C9BEB1]/30 overflow-hidden flex flex-col shadow-[0_50px_150px_rgba(0,0,0,0.15)] relative animate-fade-in font-sans text-[#1F2226]">
      {/* LUXE HEADER (Matching Synastry/Dashboard) */}
      <header className="px-10 py-8 bg-[#1F2226] text-[#F1E9DE] relative overflow-hidden shrink-0 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[radial-gradient(circle_at_center,_#D4AF37_0%,transparent_70%)] opacity-20 blur-[100px]" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Globe size={24} className="text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif italic text-4xl tracking-tighter">Relocation <span className="text-[#D4AF37]/30">—</span> <span className="opacity-40">Atlas 3D</span></h1>
                <span className="text-[9px] bg-[#D4AF37] text-black px-3 py-0.5 rounded-full font-mono font-black uppercase tracking-widest">Global Engine Active</span>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] mt-1 opacity-70">Precyzyjna Nawigacja Astrokartograficzna</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             {/* MODE SWITCHER */}
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1 shadow-2xl mr-4">
                <button 
                  onClick={() => setAtlasMode('acg')}
                  className={`px-6 py-2.5 rounded-xl transition-all font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 ${
                    atlasMode === 'acg' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Globe size={12} />
                  Astrokartografia
                </button>
                <button 
                  onClick={() => setAtlasMode('relocation')}
                  className={`px-6 py-2.5 rounded-xl transition-all font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 ${
                    atlasMode === 'relocation' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <MapPin size={12} />
                  Relokacja
                </button>
             </div>

             {atlasMode === 'acg' && (
               <button 
                  onClick={() => setShowAllLines(!showAllLines)} 
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${showAllLines ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37]' : 'bg-white/5 border-white/10 text-white/40'}`}
               >
                  <Zap size={14} className={showAllLines ? 'animate-pulse' : ''} />
                  {showAllLines ? 'Warstwy Aktywne' : 'Warstwy Ukryte'}
               </button>
             )}
             
             <button onClick={() => setIsRotating(!isRotating)} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${isRotating ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30'}`}>
                {isRotating ? 'Zatrzymaj' : 'Wznów'}
             </button>
             <button onClick={() => window.history.back()} className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                <ArrowLeft size={18} />
             </button>
          </div>
        </div>
      </header>

      <main className="flex-grow relative flex p-6 gap-6">
        {/* ASIDE: NAVIGATION DECK */}
        <aside className="w-[400px] bg-[#1F2226] rounded-[2.5rem] p-10 flex flex-col gap-8 z-40 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.05)_0%,transparent_50%)]" />
           
           <form onSubmit={handleSearch} className="relative group z-10">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj miasta..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-mono placeholder:text-white/20 focus:border-[#D4AF37]/50 focus:bg-white/10 outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
              {isSearching && <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 text-[#D4AF37] animate-spin" size={16} />}
           </form>

           {searchResults.length > 0 && (
             <div className="space-y-2 animate-in fade-in slide-in-from-top-2 z-10 relative">
                {searchResults.map((res, i) => (
                  <button key={i} onClick={() => selectCity(res)} className="w-full p-4 bg-white/5 border border-white/5 rounded-xl text-left text-[10px] text-white/40 hover:bg-[#D4AF37] hover:text-black transition-all">
                     <div className="font-bold uppercase tracking-widest mb-1">{res.name}</div>
                     <div className="opacity-60 truncate">{res.fullName}</div>
                  </button>
                ))}
             </div>
           )}

           <div className="flex flex-col border-t border-white/10 pt-8 mt-4 z-10 relative">
              <span className="text-[11px] text-[#D4AF37] font-mono uppercase tracking-[0.3em] font-black mb-6">Węzły Mocy (Miasta)</span>
              <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar mb-8">
                {INITIAL_CITIES.map(city => (
                  <button key={city.name} onClick={() => selectCity(city)} className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${selectedCity?.name === city.name ? 'bg-[#D4AF37] text-black shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/5 text-white/20 hover:bg-white/10'}`}>
                    <div className="flex items-center gap-4"><MapPin size={12} /><span className="text-[9px] font-bold uppercase tracking-widest">{city.name}</span></div>
                    <div className="text-[7px] font-mono opacity-60">{city.lat.toFixed(1)}°</div>
                  </button>
                ))}
              </div>

              {atlasMode === 'acg' && (
                 <>
                   <span className="text-[11px] text-[#D4AF37] font-mono uppercase tracking-[0.3em] font-black mb-6">Filtry Planetarne</span>
              <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {acgData && Object.keys(acgData).map(key => (
                  <button 
                    key={key} 
                    onClick={() => togglePlanetLine(key)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${activeACGPlanets.has(key) ? 'bg-white/10 border-[#D4AF37]/30 text-white' : 'bg-transparent border-white/5 text-white/20'}`}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: acgData[key].color }} />
                    <span className="text-[8px] font-bold uppercase tracking-tighter truncate">{acgData[key].name}</span>
                    {activeACGPlanets.has(key) && <div className="ml-auto w-1 h-1 rounded-full bg-[#D4AF37] animate-pulse" />}
                  </button>
                ))}
              </div>
                 </>
               )}
           </div>

           {selectedCity && (
             <div className="mt-auto p-8 rounded-[2rem] bg-[#D4AF37]/10 border border-[#D4AF37]/30 animate-in fade-in slide-in-from-bottom-6 z-10 relative">
                <h3 className="text-[#D4AF37] font-serif italic text-2xl mb-4">{selectedCity.name}</h3>
                 
                 {relocatedData ? (
                  <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                     <div className="p-4 bg-black/40 rounded-xl border border-[#D4AF37]/20">
                        <div className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-widest mb-2">Relokowany Ascendent</div>
                        <div className="text-[#F1E9DE] text-lg font-serif italic">
                           {relocatedData.houses.ascendant.sign} {Math.floor(relocatedData.houses.ascendant.longitude % 30)}°
                        </div>
                     </div>
                     <div className="p-4 bg-black/40 rounded-xl border border-[#D4AF37]/20">
                        <div className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-widest mb-2">Relokowane Medium Coeli</div>
                        <div className="text-[#F1E9DE] text-lg font-serif italic">
                           {relocatedData.houses.midheaven.sign} {Math.floor(relocatedData.houses.midheaven.longitude % 30)}°
                        </div>
                     </div>
                     
                     <button 
                        onClick={() => window.open('/?mode=relocation_view', '_blank')}
                        className="w-full py-4 bg-[#D4AF37] text-black rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105 active:scale-95"
                     >
                        <BarChart3 size={16} /> Otwórz Pełny Horoskop
                     </button>

                     <button className="w-full py-2 text-white/20 hover:text-[#D4AF37] text-[8px] font-mono uppercase tracking-widest transition-all" onClick={() => setRelocatedData(null)}>
                        Wróć do wyboru
                     </button>
                  </div>
                ) : (
                  <>
                    <p className="text-white/40 text-[10px] font-mono leading-relaxed mb-6">Współrzędne: {selectedCity.lat.toFixed(4)}N / {selectedCity.lon.toFixed(4)}E. Gotowy do relokacji.</p>
                    <button 
                      onClick={handleRelocation}
                      disabled={isAnalyzing}
                      className="w-full py-4 bg-[#D4AF37] text-black rounded-2xl font-bold uppercase text-[11px] tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isAnalyzing ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Analizuj Miasto'}
                    </button>
                  </>
                )}
             </div>
           )}
        </aside>

        <div className="flex-grow relative rounded-[2.5rem] overflow-hidden border border-[#C9BEB1]/50 bg-[#1F2226] shadow-inner">
           <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
           
           {/* ACG LEGEND (Floating Bottom Right) */}
           {atlasMode === 'acg' && showAllLines && activeACGPlanets.size > 0 && (
             <div className="absolute bottom-10 right-10 z-[100] p-8 bg-[#1F2226]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-10 duration-700 w-72">
                <div className="flex items-center gap-3 mb-6">
                   <Compass size={18} className="text-[#D4AF37]" />
                   <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Klucz Geometrii</h5>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                      <div>
                         <div className="text-[10px] font-bold text-white uppercase tracking-widest">Linia MC (Zenit)</div>
                         <div className="text-[8px] text-white/40 uppercase tracking-tighter">Sukces, Kariera, Widoczność</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-[2px] border-t border-dashed border-[#D4AF37] opacity-40" />
                      <div>
                         <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Linia IC (Nadir)</div>
                         <div className="text-[8px] text-white/40 uppercase tracking-tighter">Dom, Rodzina, Fundamenty</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-3 rounded-sm bg-gradient-to-r from-[#D4AF37] to-transparent opacity-80" />
                      <div>
                         <div className="text-[10px] font-bold text-white uppercase tracking-widest">Linia ASC (Wschód)</div>
                         <div className="text-[8px] text-white/40 uppercase tracking-tighter">Ekspresja, Jaźń, Nowy Początek</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group">
                      <div className="w-10 h-3 rounded-sm bg-gradient-to-l from-[#D4AF37] to-transparent opacity-80" />
                      <div>
                         <div className="text-[10px] font-bold text-white uppercase tracking-widest">Linia DSC (Zachód)</div>
                         <div className="text-[8px] text-white/40 uppercase tracking-tighter">Relacje, Miłość, Partnerstwo</div>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                   <p className="text-[7px] font-mono text-white/20 leading-loose uppercase tracking-widest">Wpływ jest najsilniejszy w promieniu 150km od linii. Każda planeta wnosi unikalną sygnaturę energetyczną do danego regionu.</p>
                </div>
             </div>
           )}
           
        {/* INTERACTIVE CELESTIAL TOOLTIP */}
        {hoveredPlanet && (
          <div 
            className="fixed pointer-events-none z-[300] px-6 py-3 bg-[#1F2226]/80 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
            style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 40 }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-1">Ciało Niebieskie</div>
            <div className="font-serif italic text-2xl text-[#F1E9DE]">{hoveredPlanet}</div>
          </div>
        )}

         className="mb-10 flex items-center gap-3 text-[#1F2226] hover:opacity-60 font-mono text-[10px] uppercase tracking-widest">
                   <ArrowLeft size={16} /> Powrót do Globusa
                </button>
                
                <div className="max-w-6xl mx-auto space-y-12">
                   <header className="flex items-center justify-between border-b border-[#C9BEB1]/30 pb-8">
                      <div>
                         <h2 className="text-4xl font-serif italic text-[#1F2226] mb-2">Relokacja: {selectedCity.name}</h2>
                         <p className="text-[#8C8883] font-mono text-xs uppercase tracking-widest">Analiza Horoskopu Relokacyjnego (Baza: {originalData.input.location?.resolved || 'Urodzeniowy'})</p>
                      </div>
                   </header>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="bg-white rounded-[3.5rem] p-12 border border-[#C9BEB1]/30 flex items-center justify-center shadow-2xl relative overflow-hidden">
                         <ZodiacWheel 
                           visible={true}
                           chartData={relocatedData} 
                           activePlanets={new Set(relocatedData.planets.map(p => p.key))}
                           activeAspects={new Set(['conjunction', 'sextile', 'square', 'trine', 'opposition'])}
                         />
                      </div>
                      <div className="space-y-10">
                         <div className="bg-white rounded-[2.5rem] p-8 border border-[#C9BEB1]/30 shadow-lg">
                            <h3 className="text-[#8C8883] font-mono text-[10px] uppercase tracking-[0.4em] mb-6 opacity-40">Planetary Matrix</h3>
                            <EphemerisTable 
                               chartData={relocatedData}
                            />
                         </div>
                         <DataPanel 
                            planets={relocatedData.planets}
                            aspects={relocatedData.aspects}
                            houses={relocatedData.houses}
                            lots={relocatedData.lots}
                            metadata={relocatedData.metadata}
                         />
                      </div>
                   </div>
                </div>
             </div>
           )}

           {!isLoaded && <div className="absolute inset-0 z-50 bg-[#1F2226] flex flex-col items-center justify-center gap-6"><Loader2 className="text-[#D4AF37] animate-spin" size={48} /><p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Inicjalizacja HD Navigation...</p></div>}
           
           <div className="absolute top-10 right-10 flex flex-col gap-4 pointer-events-none">
              <div className="p-4 bg-[#1F2226]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-white/10" /><span className="text-[10px] text-white/60 font-mono uppercase tracking-[0.2em]">Reference Grid: Disabled</span></div>
              <div className="p-4 bg-[#1F2226]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4"><Target size={14} className="text-[#D4AF37]/40" /><span className="text-[10px] text-white/60 font-mono uppercase tracking-[0.2em]">Geocoding: Global</span></div>
           </div>
        </div>
      </main>

      <footer className="h-16 bg-[#1F2226] border-t border-white/5 px-12 flex items-center justify-between text-[#D4AF37]/30 font-mono text-[9px] z-[100]">
         <div className="flex items-center gap-8 font-black uppercase tracking-widest">
            <span>Precyzyjna Geometria Astrokartograficzna</span>
            <span className="h-4 w-px bg-white/5" />
            <span className="italic text-[#D4AF37]/60">Standard: 110m TopoJSON / HD Vector / OpenStreetSearch</span>
         </div>
      </footer>
    </div>
  );
};

export default RelocationAtlas;
