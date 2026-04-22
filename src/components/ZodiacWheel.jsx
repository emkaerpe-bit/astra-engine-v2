import React, { useEffect, useRef, useMemo } from 'react';
import { PlanetGlyph } from './Glyphs';
import { gsap } from 'gsap';

/**
 * ═══════════════════════════════════════════════════════════
 *  ASTRA ZODIAC WHEEL v3 — Clean Rebuild
 *  
 *  Coordinate convention (SVG standard):
 *    0°=right, 90°=down, 180°=left, 270°=up
 *  
 *  Astrological orientation:
 *    AC at LEFT (180°), zodiac runs COUNTER-CLOCKWISE
 *    Formula: svgAngle = ascendant - longitude + 180
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

// Layout constants
const S = 540;
const CX = S / 2, CY = S / 2;
const R_OUTER     = 228;
const R_ZODIAC_IN = 198;
const R_PLANET    = 168;
const R_INNER     = 75;

// ─── Math ──────────────────────────────────────────────────

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

// ─── Professional Astro Collision Engine ───────────────────
// Universal script inspired by Urania/Astro.com.
// 1. Gentle tangential fan-out to separate exact conjunctions.
// 2. Strict inward radial stacking to prevent Zodiac Ring overlap.

function placePlanets(planets, asc) {
  if (!planets?.length) return [];

  let items = planets.map(p => ({
    ...p,
    sa: toSVG(p.longitude, asc),
    px: 0, py: 0, r: R_PLANET,
    nudgedSa: toSVG(p.longitude, asc)
  }));

  items.sort((a, b) => a.sa - b.sa);

  // 1. Gentle Tangential Fan-out (creates a clean array of leader lines)
  const MIN_ANG = 7.5; 
  for (let pass = 0; pass < 20; pass++) {
    let moved = false;
    for (let i = 0; i < items.length; i++) {
      let j = (i + 1) % items.length;
      let diff = items[j].nudgedSa - items[i].nudgedSa;
      if (diff < 0) diff += 360;
      if (diff < MIN_ANG && diff < 180) {
        let push = (MIN_ANG - diff) / 2 + 0.1;
        items[i].nudgedSa = ((items[i].nudgedSa - push) % 360 + 360) % 360;
        items[j].nudgedSa = ((items[j].nudgedSa + push) % 360 + 360) % 360;
        moved = true;
      }
    }
    if (!moved) break;
  }

  // 2. Strict Inward Radial Stacking (Safe corridor: 112px to 168px)
  const W = 32; 
  const H = 28;
  function isOverlap(a, b) {
     return Math.abs(a.px - b.px) < W && Math.abs(a.py - b.py) < H;
  }

  let placed = [];
  for (let p of items) {
     let currentR = R_PLANET;
     let currentPos = polar(currentR, p.nudgedSa);
     p.px = currentPos.x;
     p.py = currentPos.y;
     
     let tries = 0;
     let step = 26; 

     // Capped at 2 inward steps (total 3 levels: 168, 142, 116)
     // This keeps symbols out of the house number ring (R=100) and aspect center (R=80)
     while (tries < 2 && placed.some(o => isOverlap(p, o))) {
        tries++;
        currentR = R_PLANET - (tries * step);
        currentPos = polar(currentR, p.nudgedSa);
        p.px = currentPos.x;
        p.py = currentPos.y;
     }
     p.r = currentR;
     placed.push(p);
  }
  return placed;
}

function placeTransitPlanets(planets, asc) {
  if (!planets?.length) return [];
  const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);
  const placed = [];
  const R_TRANSIT = R_OUTER + 18; // Close to zodiac ring like astro.com
  const MIN_ANGLE_DIST = 5; // Degrees of visual separation

  for (let p of sorted) {
    let visualAngle = toSVG(p.longitude, asc);
    
    // Tangential fanning (shift angle if colliding)
    let collision = true;
    while (collision) {
      collision = false;
      for (let other of placed) {
        let diff = Math.abs(other.sa - visualAngle);
        if (diff > 180) diff = 360 - diff;
        if (diff < MIN_ANGLE_DIST) {
          visualAngle += MIN_ANGLE_DIST - diff + 1; // Shift slightly
          collision = true;
        }
      }
    }

    const { x, y } = polar(R_TRANSIT, visualAngle);
    placed.push({ ...p, sa: visualAngle, px: x, py: y, r: R_TRANSIT });
  }
  return placed;
}

// ─── Component ─────────────────────────────────────────────

export default function ZodiacWheel({ visible, chartData, activePlanets, activeAspects, transitData }) {
  const svgRef = useRef(null);

  const allPlanets = useMemo(() => chartData?.planets || [], [chartData]);
  const allAspects = useMemo(() => chartData?.aspects || [], [chartData]);

  // Filter based on control panel state
  const planets = useMemo(() => {
    return allPlanets.filter(p => !activePlanets || activePlanets.has(p.key));
  }, [allPlanets, activePlanets]);

  const aspects = useMemo(() => {
    return allAspects.filter(a => !activeAspects || activeAspects.has(a.type));
  }, [allAspects, activeAspects]);
  const houses  = useMemo(() => chartData?.houses?.cusps || [], [chartData]);
  const asc     = chartData?.houses?.ascendant?.longitude || 0;

  const placed = useMemo(() => placePlanets(planets, asc), [planets, asc]);
  const transitPlaced = useMemo(() => {
    if (!transitData) return [];
    return placeTransitPlanets(transitData.planets, asc);
  }, [transitData, asc]);

  useEffect(() => {
    if (!visible || !svgRef.current) return;
    gsap.fromTo(svgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
  }, [visible]);

  // Mid-angle of each house (for house number label)
  const houseMids = useMemo(() => {
    if (houses.length < 12) return [];
    return houses.map((h, i) => {
      const next = houses[(i + 1) % 12];
      let mid = h.longitude;
      let diff = next.longitude - h.longitude;
      if (diff < 0) diff += 360;
      mid = (h.longitude + diff / 2) % 360;
      return { num: h.house, angle: toSVG(mid, asc) };
    });
  }, [houses, asc]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${S + 120} ${S + 120}`} className="w-full h-full" style={{ opacity: 0 }}>
      <g transform="translate(60, 60)">

      {/* ═══ BACKGROUND ═══ */}
      <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="#F5F0E6" stroke="#C8B57A" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R_OUTER} fill="#EAE2D0" stroke="#B8A456" strokeWidth="0.5" />
      <circle cx={CX} cy={CY} r={R_ZODIAC_IN} fill="#F5F0E6" stroke="#B8A456" strokeWidth="0.5" />
      <circle cx={CX} cy={CY} r={R_INNER} fill="#ffffff" stroke="#AAA" strokeWidth="0.5" />

      {/* ═══ ZODIAC RING — signs, boundaries, ticks ═══ */}
      {SIGN_GLYPHS.map((glyph, i) => {
        const bAngle = toSVG(i * 30, asc);
        const mAngle = toSVG(i * 30 + 15, asc);
        const b1 = polar(R_ZODIAC_IN, bAngle);
        const b2 = polar(R_OUTER, bAngle);
        const mp = polar((R_ZODIAC_IN + R_OUTER) / 2, mAngle);

        // Degree ticks (every 1° within this sign)
        const ticks = [];
        for (let d = 0; d < 30; d++) {
          const ta = toSVG(i * 30 + d, asc);
          const big = d % 10 === 0;
          const t1 = polar(R_ZODIAC_IN, ta);
          const t2 = polar(R_ZODIAC_IN + (big ? 7 : 3), ta);
          ticks.push(
            <line key={d} x1={t1.x} y1={t1.y} x2={t2.x} y2={t2.y}
              stroke="#999" strokeWidth={big ? "0.6" : "0.3"} />
          );
        }

        return (
          <g key={i}>
            <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} stroke="#B8A456" strokeWidth="0.5" />
            {ticks}
            <text x={mp.x} y={mp.y} textAnchor="middle" dominantBaseline="central"
              fontSize="13" fill="#5A4E3A" fontFamily="serif">
              {glyph}
            </text>
          </g>
        );
      })}

      {/* ═══ HOUSES — cusps, axes, numbers ═══ */}
      {houses.map((h, i) => {
        const sa = toSVG(h.longitude, asc);
        const p1 = polar(R_INNER, sa);
        const p2 = polar(R_ZODIAC_IN, sa);
        const isAxis = [1, 4, 7, 10].includes(h.house);
        const label = h.house === 1 ? 'AC' : h.house === 7 ? 'DC' :
                      h.house === 10 ? 'MC' : h.house === 4 ? 'IC' : null;

        return (
          <g key={`h${i}`}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={isAxis ? '#333' : '#CCC'} strokeWidth={isAxis ? '2' : '0.5'} />
            {label && (
              <text {...polar(R_OUTER + 16, sa)}
                textAnchor="middle" dominantBaseline="central"
                fontSize="11" fontWeight="bold" fill="#333" fontFamily="sans-serif">
                {label}
              </text>
            )}
          </g>
        );
      })}

      {/* House numbers — placed in a safe ring (R=100) between aspects and planets */}
      {houseMids.map(hm => (
        <text key={`hn${hm.num}`} {...polar(100, hm.angle)}
          textAnchor="middle" dominantBaseline="central"
          fontSize="9" fill="#AAA" fontFamily="sans-serif" fontStyle="italic"
          stroke="#F5F0E6" strokeWidth="3" paintOrder="stroke fill">
          {hm.num}
        </text>
      ))}

      {/* ═══ PLANETS — with leader lines and degree labels ═══ */}
      {placed.map(p => {
        const rimAngle = toSVG(p.longitude, asc);
        const rim = polar(R_ZODIAC_IN, rimAngle);
        const tick = polar(R_ZODIAC_IN - 4, rimAngle);
        const glyph = PLANET_GLYPHS[p.key] || '?';
        const degLabel = p.degreeInSign || '';

        return (
          <g key={p.key}>
            {/* Tick on rim — marks true ecliptic position */}
            <line x1={rim.x} y1={rim.y} x2={tick.x} y2={tick.y}
              stroke="#333" strokeWidth="1" />
            {/* Leader line — connects staggered glyph to its true ecliptic tick */}
            {(angDist(p.sa, p.nudgedSa) > 1 || p.r !== R_PLANET) && (
              <line x1={tick.x} y1={tick.y} x2={p.px} y2={p.py}
                stroke="#AAA" strokeWidth="0.5" strokeDasharray="1,2" />
            )}
            
            {/* Planet glyph */}
            {p.key === 'jupiter' ? (
              <g transform={`translate(${p.px - 9}, ${p.py - 11})`}>
                <path d="M2,3 C2,0 7,0 7,3 C7,6 2,6 2,9 L14,9 M11,4 L11,16"
                  stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            ) : (
              <text x={p.px} y={p.py - 2} textAnchor="middle" dominantBaseline="central"
                fontSize="20" fill="#1a1a1a" fontFamily="serif" fontWeight="bold">
                {glyph}
              </text>
            )}
            {/* Degree label */}
            <text x={p.px} y={p.py + 14} textAnchor="middle" dominantBaseline="central"
              fontSize="8" fill="#1a1a1a" fontFamily="monospace" fontWeight="bold">
              {degLabel}
            </text>
          </g>
        );
      })}

      {/* ═══ ASPECTS — color coded lines in center ═══ */}
      {aspects.map((asp, i) => {
        const p1 = planets.find(p => p.key === asp.planet1?.key);
        const p2 = planets.find(p => p.key === asp.planet2?.key);
        if (!p1 || !p2) return null;

        // Aspect lines end at R=72 to stay perfectly within the central circle (R_INNER=75)
        const pos1 = polar(72, toSVG(p1.longitude, asc));
        const pos2 = polar(72, toSVG(p2.longitude, asc));

        const color = (asp.type === 'Trine' || asp.type === 'Sextile') ? '#2563EB' :
                      (asp.type === 'Square' || asp.type === 'Opposition') ? '#DC2626' :
                      '#999';

        return (
          <line key={i} x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y}
            stroke={color} strokeWidth={asp.orb < 2 ? '1' : '0.4'}
            strokeOpacity="0.6" />
        );
      })}

      {/* Center dot */}
      <circle cx={CX} cy={CY} r="2" fill="#B8A456" />

      {/* ═══ TRANSIT PLANETS (Outer Ring) ═══ */}
      {transitPlaced.map(p => {
        return (
          <g key={`transit-${p.key}`}>
            <foreignObject x={p.px - 10} y={p.py - 10} width="20" height="20">
              <div className="flex items-center justify-center w-full h-full">
                <PlanetGlyph name={p.key} size={16} className="text-[#166534] drop-shadow-sm" />
              </div>
            </foreignObject>
            {/* Degree label for transit */}
            <text x={p.px} y={p.py + 12} textAnchor="middle" dominantBaseline="central"
              fontSize="7" fill="#166534" fontFamily="monospace" fontWeight="bold">
              {p.degreeInSign.split(' ')[0]}
            </text>
          </g>
        );
      })}

      </g>
    </svg>
  );
}
