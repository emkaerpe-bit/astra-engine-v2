import React, { useEffect, useRef, useMemo } from 'react';
import { PlanetGlyph } from './Glyphs';
import { gsap } from 'gsap';

/**
 * ═══════════════════════════════════════════════════════════
 *  ASTRA ZODIAC WHEEL v4.0 — Territory Edition
 * ═══════════════════════════════════════════════════════════
 */

const SIGN_GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const SIGN_NAMES  = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                     'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

const PLANET_GLYPHS = {
  sun:'☉', moon:'☽', mercury:'☿', venus:'♀', mars:'♂',
  jupiter:'♃', saturn:'♄', uranus:'♅', neptune:'♆', pluto:'♇',
  node: '☊', lilith: '⚸', chiron: '⚷'
};

const PLANET_COLORS = {
  sun: '#FFD700', moon: '#C0C0C0', mercury: '#FFA500', venus: '#4CAF50', mars: '#FF4136',
  jupiter: '#9B51E0', saturn: '#5D4037', uranus: '#00BCD4', neptune: '#2196F3', pluto: '#8B0000',
  node: '#1F2226', chiron: '#B8A456', lilith: '#000000'
};

const SIGN_RULERS_TRADITIONAL = {
  0: 'mars', 1: 'venus', 2: 'mercury', 3: 'moon', 4: 'sun', 5: 'mercury',
  6: 'venus', 7: 'mars', 8: 'jupiter', 9: 'saturn', 10: 'saturn', 11: 'jupiter'
};

const SIGN_RULERS_MODERN = {
  0: 'mars', 1: 'venus', 2: 'mercury', 3: 'moon', 4: 'sun', 5: 'mercury',
  6: 'venus', 7: 'pluto', 8: 'jupiter', 9: 'saturn', 10: 'uranus', 11: 'neptune'
};

const S = 600;
const CX = S / 2, CY = S / 2;
const R_OUTER     = 228;
const R_ZODIAC_IN = 198;
const R_PLANET    = 168;
const R_INNER     = 75;

function polar(r, deg) {
  const rad = deg * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function toSVG(lng, asc) {
  return ((asc - lng + 180) % 360 + 360) % 360;
}

function angDist(a, b) {
  let d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function placePlanets(planets, asc, houseCusps = []) {
  if (!planets?.length) return [];
  
  // 1. Inicjalizacja i mapowanie na kąty SVG (True Positions)
  const items = planets.map(p => ({ 
    ...p, 
    trueSa: toSVG(p.longitude, asc),
    sa: toSVG(p.longitude, asc),
    nudgedSa: toSVG(p.longitude, asc),
    r: 182 // Orbita bazowa
  }));
  
  // 2. Sortowanie zodiakalne (Gwarancja Monotoniczności - Rozdział 5.1)
  // Musimy obsłużyć zawijanie 360/0
  items.sort((a, b) => a.sa - b.sa);

  const R_LEVELS = [170, 138, 106]; // Zmniejszone promienie, by etykiety nie wchodziły na znaki
  const GLYPH_SIZE_PX = 30; // Większy margines kolizji
  const axes = houseCusps.length >= 12 
    ? [houseCusps[0], houseCusps[3], houseCusps[6], houseCusps[9]].map(c => toSVG(c.longitude, asc))
    : [];

  const placed = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let bestR = R_LEVELS[0];
    let finalSa = item.sa;

    // [AXIS AVOIDANCE REMOVED - PLANETS MUST STAY AT EXACT LONGITUDE]

    // 4. Detekcja kolizji z poprzednio umieszczonymi planetami (Monotonicity & Overlap)
    // Sprawdzamy czy nasze przesunięcie nie weszło na inną planetę
    let levelFound = false;
    const startLevelIdx = R_LEVELS.indexOf(bestR);

    for (let l = startLevelIdx; l < R_LEVELS.length; l++) {
      const r = R_LEVELS[l];
      const pos = polar(r, finalSa);
      
      const collision = placed.some(other => {
        const dx = pos.x - other.px;
        const dy = pos.y - other.py;
        return Math.sqrt(dx*dx + dy*dy) < GLYPH_SIZE_PX;
      });

      if (!collision) {
        bestR = r;
        levelFound = true;
        break;
      }
    }

    // 5. Ostateczny Nudge (jeśli tłok jest ekstremalny)
    if (!levelFound) {
      let shift = 0;
      while (shift < 45) { 
        shift += 2;
        const testSa = (finalSa + shift) % 360;
        const pos = polar(R_LEVELS[0], testSa);
        const collision = placed.some(other => {
          const dx = pos.x - other.px;
          const dy = pos.y - other.py;
          return Math.sqrt(dx*dx + dy*dy) < GLYPH_SIZE_PX;
        });
        if (!collision) {
          finalSa = testSa;
          bestR = R_LEVELS[0];
          break;
        }
      }
    }

    const finalPos = polar(bestR, finalSa);
    item.r = bestR;
    item.px = finalPos.x;
    item.py = finalPos.y;
    item.nudgedSa = finalSa;
    placed.push(item);
  }

  return placed;
}

function placeOuterPlanets(planets, asc, r, color, houseCusps = [], customMinAng = 10.0) {
  if (!planets?.length) return [];
  
  const axes = houseCusps.length >= 12 
    ? [houseCusps[0], houseCusps[3], houseCusps[6], houseCusps[9]].map(c => toSVG(c.longitude, asc))
    : [];

  // 1. Initial Mapping
  const items = planets.map(p => {
    const sa = toSVG(p.longitude, asc);
    return { 
      ...p, 
      trueSa: sa,
      nudgedSa: sa,
      r
    };
  });
  
  // 2. Sorting to maintain zodiacal order
  items.sort((a, b) => a.nudgedSa - b.nudgedSa);

  // 3. Multi-pass collision resolution (Planets vs Planets & Planets vs Axes)
  for (let pass = 0; pass < 50; pass++) {
    let moved = false;
    
    // A. Check against House Axes (MC, AC, etc.)
    for (let i = 0; i < items.length; i++) {
      axes.forEach(ax => {
        if (angDist(items[i].nudgedSa, ax) < 8.0) {
          const diff = (items[i].nudgedSa - ax + 360) % 360;
          const pushDir = diff < 180 ? 1 : -1;
          items[i].nudgedSa = (items[i].nudgedSa + pushDir * 0.5 + 360) % 360;
          moved = true;
        }
      });
    }

    // B. Check against each other (Maintaining order)
    for (let i = 0; i < items.length; i++) {
      let j = (i + 1) % items.length;
      let diff = items[j].nudgedSa - items[i].nudgedSa;
      if (diff < 0) diff += 360;

      if (diff < customMinAng && diff < 180) {
        let push = (customMinAng - diff) / 2 + 0.1;
        items[i].nudgedSa = (items[i].nudgedSa - push + 360) % 360;
        items[j].nudgedSa = (items[j].nudgedSa + push) % 360;
        moved = true;
      }
    }
    if (!moved) break;
  }

  return items.map(p => {
    const { x, y } = polar(p.r, p.nudgedSa);
    return { ...p, px: x, py: y, color };
  });
}

export default function ZodiacWheel({ visible, chartData, activePlanets, activeAspects, activeLots, activeStars, activePatterns, transitData, prognosticData, dispositorContext }) {
  const svgRef = useRef(null);
  const allPlanets = useMemo(() => chartData?.planets || [], [chartData]);
  const allAspects = useMemo(() => chartData?.aspects || [], [chartData]);
  const planets = useMemo(() => allPlanets.filter(p => !activePlanets || activePlanets.has(p.key)), [allPlanets, activePlanets]);
  const aspects = useMemo(() => allAspects.filter(a => !activeAspects || activeAspects.has(a.type)), [allAspects, activeAspects]);
  const houses  = useMemo(() => chartData?.houses?.cusps || [], [chartData]);
  const asc     = chartData?.houses?.ascendant?.longitude || 0;

  const placed = useMemo(() => placePlanets(planets, asc, houses), [planets, asc, houses]);
  
  const { directTerritories, indirectTerritories } = useMemo(() => {
    if (!dispositorContext || !dispositorContext.selectedPlanet) return { directTerritories: [], indirectTerritories: [] };
    const { selectedPlanet, system } = dispositorContext;
    const rulersMap = system === 'modern' ? SIGN_RULERS_MODERN : SIGN_RULERS_TRADITIONAL;
    
    // 1. Direct: Signs ruled by the planet
    const direct = Object.entries(rulersMap)
      .filter(([_, ruler]) => ruler === selectedPlanet)
      .map(([signIdx]) => parseInt(signIdx));
      
    // 2. Indirect: Signs ruled by planets located in direct signs
    const indirect = [];
    const subjects = dispositorContext.subjects?.direct || [];
    subjects.forEach(subKey => {
      Object.entries(rulersMap).forEach(([signIdx, ruler]) => {
        if (ruler === subKey && !direct.includes(parseInt(signIdx))) {
          indirect.push(parseInt(signIdx));
        }
      });
    });

    return { directTerritories: direct, indirectTerritories: [...new Set(indirect)] };
  }, [dispositorContext]);

  const rulerColor = dispositorContext ? PLANET_COLORS[dispositorContext.selectedPlanet] : null;

  const transitPlaced = useMemo(() => {
    if (!transitData) return [];
    return placeOuterPlanets(transitData.planets, asc, R_OUTER + 25, '#166534', houses);
  }, [transitData, asc, houses]);

  const prognosticPlaced = useMemo(() => {
    if (!prognosticData) return [];
    const rBase = transitData ? R_OUTER + 55 : R_OUTER + 25;
    return placeOuterPlanets(prognosticData.planets, asc, rBase, '#D97706', houses);
  }, [prognosticData, transitData, asc, houses]);

  const lotsPlaced = useMemo(() => {
    if (!chartData?.lots || !activeLots) return [];
    const filtered = chartData.lots.filter(l => activeLots.has(l.key));
    return placeOuterPlanets(filtered, asc, R_ZODIAC_IN - 12, '#D4AF37', houses);
  }, [chartData?.lots, activeLots, asc, houses]);

  const starsPlaced = useMemo(() => {
    if (!chartData?.stars || !activeStars) return [];
    const filtered = chartData.stars.filter(s => activeStars.has(s.key));
    return placeOuterPlanets(filtered, asc, R_ZODIAC_IN - 12, '#5A4E3A', houses, 15.0);
  }, [chartData?.stars, activeStars, asc, houses]);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    gsap.fromTo(svgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
  }, [visible]);

  const houseMids = useMemo(() => {
    if (houses.length < 12) return [];
    return houses.map((h, i) => {
      const next = houses[(i + 1) % 12];
      let diff = next.longitude - h.longitude;
      if (diff < 0) diff += 360;
      let mid = (h.longitude + diff / 2) % 360;
      return { num: h.house, angle: toSVG(mid, asc) };
    });
  }, [houses, asc]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${S + 30} ${S + 30}`} className="w-full h-full" style={{ opacity: 0 }}>
      <defs>
        {/* Territory Pattern (Historical Map Style) */}
        {rulerColor && (
          <pattern id={`territoryPattern-${dispositorContext.selectedPlanet}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={rulerColor} strokeWidth="2.5" opacity="0.2" />
          </pattern>
        )}
        
        {/* Dynamic Pattern based on ruler color for Indirect Planet Rings */}
        {rulerColor && (
          <pattern id={`indirectPattern-${dispositorContext.selectedPlanet}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={rulerColor} strokeWidth="2" opacity="0.35" />
          </pattern>
        )}
      </defs>

      <g transform="translate(15, 15)">
        <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="#F5F0E6" stroke="#C8B57A" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={R_OUTER} fill="#EAE2D0" stroke="#B8A456" strokeWidth="0.5" />
        
        {/* Direct Territories (Solid) */}
        {directTerritories.map(signIdx => {
          const start = toSVG(signIdx * 30, asc);
          const end = toSVG((signIdx + 1) * 30, asc);
          const p1 = polar(R_INNER, start), p2 = polar(R_ZODIAC_IN, start);
          const p3 = polar(R_ZODIAC_IN, end), p4 = polar(R_INNER, end);
          return (
            <path 
              key={`direct-territory-${signIdx}`}
              d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${R_ZODIAC_IN} ${R_ZODIAC_IN} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${R_INNER} ${R_INNER} 0 0 0 ${p1.x} ${p1.y}`}
              fill={rulerColor}
              fillOpacity="0.08"
              stroke={rulerColor}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          );
        })}

        {/* Indirect Territories (Dashed / Pattern) */}
        {indirectTerritories.map(signIdx => {
          const start = toSVG(signIdx * 30, asc);
          const end = toSVG((signIdx + 1) * 30, asc);
          const p1 = polar(R_INNER, start), p2 = polar(R_ZODIAC_IN, start);
          const p3 = polar(R_ZODIAC_IN, end), p4 = polar(R_INNER, end);
          return (
            <path 
              key={`indirect-territory-${signIdx}`}
              d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${R_ZODIAC_IN} ${R_ZODIAC_IN} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${R_INNER} ${R_INNER} 0 0 0 ${p1.x} ${p1.y}`}
              fill={`url(#territoryPattern-${dispositorContext.selectedPlanet})`}
              stroke={rulerColor}
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          );
        })}
        {/* 3. PRECISION DEGREE TICKS (Pro Standard) */}
        {Array.from({ length: 360 }).map((_, deg) => {
          const sa = toSVG(deg, asc);
          const is10 = deg % 10 === 0;
          const is5 = deg % 5 === 0;
          const len = is10 ? 7 : (is5 ? 4 : 2.5);
          
          const p1 = polar(R_ZODIAC_IN, sa), p2 = polar(R_ZODIAC_IN + len, sa);
          const p3 = polar(R_OUTER, sa), p4 = polar(R_OUTER - len, sa);
          
          return (
            <g key={`tick-${deg}`}>
              {/* Inner Ticks */}
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#B8A456" strokeWidth={is10 ? 0.8 : 0.4} opacity={is5 ? 0.6 : 0.3} />
              {/* Outer Ticks */}
              <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#B8A456" strokeWidth={is10 ? 0.8 : 0.4} opacity={is5 ? 0.6 : 0.3} />
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={R_ZODIAC_IN} fill="none" stroke="#B8A456" strokeWidth="0.5" />
        <circle cx={CX} cy={CY} r={R_INNER} fill="#ffffff" stroke="#AAA" strokeWidth="0.5" />
        
        {/* Active Pattern Name in Center */}
        {activePatterns && activePatterns.size > 0 && (
          <g transform={`translate(${CX}, ${CY})`} className="animate-in fade-in zoom-in duration-500">
            <text 
              textAnchor="middle" 
              dominantBaseline="central" 
              className="font-serif italic font-bold uppercase tracking-widest"
              fill="#1F2226"
              fontSize="9"
              opacity="0.9"
            >
              {[...activePatterns][0].split('-')[0].split('_').join(' ')}
            </text>
          </g>
        )}

        {/* GOLDEN PATTERN OUTLINES - The "Blueprint" effect */}
        {activePatterns && activePatterns.size > 0 && chartData.patterns && (
          [...activePatterns].map(pKey => {
            const parts = pKey.split('-');
            const idx = parseInt(parts[parts.length - 1]);
            const pattern = chartData.patterns[idx];
            if (!pattern) return null;
            
            const pts = pattern.planets.map(pk => {
              const p = planets.find(pl => pl.key === pk);
              if (!p) return null;
              return polar(72, toSVG(p.longitude, asc));
            }).filter(Boolean);

            if (pts.length < 2) return null;

            const d = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';

            return (
              <g key={`outline-${pKey}`} className="animate-in fade-in duration-700">
                <path 
                  d={d} 
                  stroke="#D4AF37" 
                  strokeWidth="2.5" 
                  fill="#D4AF37" 
                  fillOpacity="0.08" 
                  strokeLinejoin="round" 
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.4))' }}
                />
                <path d={d} stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
              </g>
            );
          })
        )}

        {SIGN_GLYPHS.map((glyph, i) => {
          const bAngle = toSVG(i * 30, asc), mAngle = toSVG(i * 30 + 15, asc);
          const b1 = polar(R_ZODIAC_IN, bAngle), b2 = polar(R_OUTER, bAngle);
          const mp = polar((R_ZODIAC_IN + R_OUTER) / 2, mAngle);
          const isDirect = directTerritories.includes(i);
          const isIndirect = indirectTerritories.includes(i);
          const isOccupied = isDirect || isIndirect;
          
          return (
            <g key={i}>
              {isDirect && (
                <path 
                  d={`M ${b1.x} ${b1.y} A ${R_ZODIAC_IN} ${R_ZODIAC_IN} 0 0 1 ${polar(R_ZODIAC_IN, toSVG((i+1)*30, asc)).x} ${polar(R_ZODIAC_IN, toSVG((i+1)*30, asc)).y} L ${polar(R_OUTER, toSVG((i+1)*30, asc)).x} ${polar(R_OUTER, toSVG((i+1)*30, asc)).y} A ${R_OUTER} ${R_OUTER} 0 0 0 ${b2.x} ${b2.y} Z`}
                  fill={rulerColor}
                  fillOpacity="0.12"
                />
              )}
              {isIndirect && (
                <path 
                  d={`M ${b1.x} ${b1.y} A ${R_ZODIAC_IN} ${R_ZODIAC_IN} 0 0 1 ${polar(R_ZODIAC_IN, toSVG((i+1)*30, asc)).x} ${polar(R_ZODIAC_IN, toSVG((i+1)*30, asc)).y} L ${polar(R_OUTER, toSVG((i+1)*30, asc)).x} ${polar(R_OUTER, toSVG((i+1)*30, asc)).y} A ${R_OUTER} ${R_OUTER} 0 0 0 ${b2.x} ${b2.y} Z`}
                  fill={`url(#territoryPattern-${dispositorContext.selectedPlanet})`}
                  fillOpacity="0.8"
                />
              )}
              <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} stroke="#B8A456" strokeWidth="0.5" />
              <text x={mp.x} y={mp.y} textAnchor="middle" dominantBaseline="central" fontSize="13" fill={isOccupied && dispositorContext?.selectedPlanet ? rulerColor : "#5A4E3A"} fontFamily="serif" fontWeight={isDirect ? 'bold' : 'normal'}>{glyph}</text>
            </g>
          );
        })}

        {houses.map((h, i) => {
          const sa = toSVG(h.longitude, asc);
          const p1 = polar(R_INNER, sa), p2 = polar(R_ZODIAC_IN, sa);
          const isAxis = [1, 4, 7, 10].includes(h.house);
          const label = h.house === 1 ? 'AC' : h.house === 7 ? 'DC' : h.house === 10 ? 'MC' : h.house === 4 ? 'IC' : null;
          const labelR = R_OUTER + 15;

          return (
            <g key={`h${i}`}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={isAxis ? '#333' : '#CCC'} strokeWidth={isAxis ? '2' : '0.5'} />
              {label && (
                <text 
                  {...polar(labelR, sa)} 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fontSize="11" 
                  fontWeight="bold" 
                  fill="#333" 
                  fontFamily="sans-serif"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}

        {houseMids.map(hm => (
          <text key={`hn${hm.num}`} {...polar(100, hm.angle)} textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#AAA" fontFamily="sans-serif" fontStyle="italic">{hm.num}</text>
        ))}

        {/* 5. NATAL PLANETS */}
        {placed.map(p => {
          const { px, py } = p;
          const isDirect = dispositorContext?.subjects?.direct?.includes(p.key);
          const isIndirect = dispositorContext?.subjects?.indirect?.includes(p.key);
          const isSelected = dispositorContext?.selectedPlanet === p.key;

          return (
            <g key={p.key} className="transition-all duration-700">
              {/* Rim Tick */}
              <line x1={polar(R_ZODIAC_IN, p.trueSa).x} y1={polar(R_ZODIAC_IN, p.trueSa).y} x2={polar(R_ZODIAC_IN - 4, p.trueSa).x} y2={polar(R_ZODIAC_IN - 4, p.trueSa).y} stroke="#333" strokeWidth="1" />
              
              {/* Leader Line if moved radially or angularly */}
              {(angDist(p.trueSa, p.nudgedSa) > 0.5 || p.r !== 170) && (
                <path 
                  d={`M ${polar(R_ZODIAC_IN - 4, p.trueSa).x} ${polar(R_ZODIAC_IN - 4, p.trueSa).y} Q ${polar((R_ZODIAC_IN + p.r)/2, p.trueSa).x} ${polar((R_ZODIAC_IN + p.r)/2, p.trueSa).y} ${px} ${py}`} 
                  stroke="#AAA" 
                  strokeWidth="0.5" 
                  strokeDasharray="1,2" 
                  fill="none"
                />
              )}
              
              {/* Territory Highlighting */}
              {(isDirect || isIndirect || isSelected) && (
                 <circle 
                   cx={px} cy={py} r={14} 
                   fill={isIndirect ? `url(#indirectPattern-${dispositorContext.selectedPlanet})` : (isDirect || isSelected ? rulerColor : 'none')} 
                   fillOpacity={isIndirect ? 1 : 0.2}
                   stroke={rulerColor} 
                   strokeWidth={isSelected ? 1.5 : 0.5}
                   strokeDasharray={isIndirect ? "2,2" : "none"}
                 />
              )}

              {/* Planet Glyph */}
              <foreignObject x={px - 14} y={py - 14} width="28" height="28">
                <div className="flex items-center justify-center w-full h-full">
                  <PlanetGlyph 
                    name={p.key} 
                    size={24} 
                    style={{ color: (dispositorContext?.selectedPlanet ? PLANET_COLORS[p.key] : '#1a1a1a') }}
                  />
                </div>
              </foreignObject>

              <text 
                x={px} y={py + 16} 
                textAnchor="middle" dominantBaseline="central" fontSize="7" fill="#1a1a1a" fontFamily="monospace" fontWeight="900"
              >
                {(p.degreeInSign || "").split(' ')[0]}{(p.degreeInSign || "").split(' ')[1] || "00'"}
              </text>
            </g>
          );
        })}

        {/* 6. TRANSITS (Standard Pro: Concentric + Leader Lines + Rim Ticks) */}
        {transitPlaced.map((p, i) => {
          const rimPos = polar(R_OUTER, p.trueSa);
          const tickPos = polar(R_OUTER + 4, p.trueSa);
          return (
            <g key={`transit-${i}`}>
              {/* Green Rim Tick at exact position */}
              <line x1={rimPos.x} y1={rimPos.y} x2={tickPos.x} y2={tickPos.y} stroke="#166534" strokeWidth="1.5" />
              
              {/* Leader Line if nudged */}
              {angDist(p.trueSa, p.nudgedSa) > 0.1 && (
                <line 
                  x1={tickPos.x} y1={tickPos.y} 
                  x2={p.px} y2={p.py} 
                  stroke="#166534" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6"
                />
              )}
              <foreignObject x={p.px - 15} y={p.py - 15} width="30" height="30">
                <div className="flex flex-col items-center justify-center leading-none text-[#166534]">
                  <PlanetGlyph name={p.key} size={14} />
                  <span className="text-[7px] font-bold whitespace-nowrap mt-0.5">
                    {(p.degreeInSign || "").split(' ')[0]}{(p.degreeInSign || "").split(' ')[1] || "00'"}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* 7. PROGNOSTICS (Standard Pro: Concentric + Leader Lines + Rim Ticks) */}
        {prognosticPlaced.map((p, i) => {
          const rimPos = polar(R_OUTER, p.trueSa);
          const tickPos = polar(R_OUTER + 4, p.trueSa);
          return (
            <g key={`prog-${i}`}>
              {/* Orange Rim Tick at exact position */}
              <line x1={rimPos.x} y1={rimPos.y} x2={tickPos.x} y2={tickPos.y} stroke="#D97706" strokeWidth="1.5" />
              
              {/* Leader Line if nudged */}
              {angDist(p.trueSa, p.nudgedSa) > 0.1 && (
                <line 
                  x1={tickPos.x} y1={tickPos.y} 
                  x2={p.px} y2={p.py} 
                  stroke="#D97706" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6"
                />
              )}
              <foreignObject x={p.px - 15} y={p.py - 15} width="30" height="30">
                <div className="flex flex-col items-center justify-center leading-none text-[#D97706]">
                  <PlanetGlyph name={p.key} size={14} />
                  <span className="text-[7px] font-bold whitespace-nowrap mt-0.5">
                    {(p.degreeInSign || "").split(' ')[0]}{(p.degreeInSign || "").split(' ')[1] || "00'"}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* 8. ARABIC LOTS (Fortune, Spirit, Eros) */}
        {lotsPlaced.map((p, i) => {
          let symbol = '⊗';
          let color = '#D4AF37';
          if (p.key === 'spirit') { symbol = '🕯️'; color = '#9B51E0'; }
          if (p.key === 'eros') { symbol = '❤'; color = '#FF69B4'; }

          return (
            <g key={`lot-${p.key}-${i}`}>
              <text x={p.px} y={p.py} textAnchor="middle" dominantBaseline="central" fontSize="12" fill={color} fontWeight="bold">{symbol}</text>
              <text x={p.px} y={p.py + 10} textAnchor="middle" fontSize="6" fill={color} fontWeight="bold" fontFamily="monospace">
                {(p.degreeInSign || "").split(' ')[0]}{(p.degreeInSign || "").split(' ')[1] || "00'"}
              </text>
            </g>
          );
        })}

        {/* 9. FIXED STARS */}
        {starsPlaced.map((p, i) => (
          <g key={`star-${i}`}>
            <text x={p.px} y={p.py} textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#5A4E3A" opacity="0.7">★</text>
            <text x={p.px} y={p.py + 10} textAnchor="middle" fontSize="5" fill="#5A4E3A" fontWeight="bold">
              {p.name.substring(0,3)} {(p.degreeInSign || "").split(' ')[0]}
            </text>
          </g>
        ))}

        {/* 10. ASPECT LINES (Natal Center) */}
        {aspects.map((asp, i) => {
          const p1 = planets.find(p => p.key === asp.planet1?.key), p2 = planets.find(p => p.key === asp.planet2?.key);
          if (!p1 || !p2) return null;
          const pos1 = polar(R_INNER - 3, toSVG(p1.longitude, asc)), pos2 = polar(R_INNER - 3, toSVG(p2.longitude, asc));
          
          let color = '#1F2226';
          if (['Trine', 'Sextile'].includes(asp.type)) color = '#3B82F6';
          if (['Square', 'Opposition'].includes(asp.type)) color = '#EF4444';
          
          return (
            <line 
              key={i} 
              x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y} 
              stroke={color} 
              strokeWidth="0.8" 
              opacity="0.4" 
            />
          );
        })}
      </g>
    </svg>
  );
}
