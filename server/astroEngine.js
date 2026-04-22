/**
 * Astra Engine — Swiss Ephemeris Data Layer (FREE & PRO Edition)
 * Integration: sweph (Native Swiss Ephemeris for Node.js)
 * Precision: Sub-arcsecond (JPL DE431 standard)
 * Cost: 0 PLN
 */

import sweph from 'sweph';
import { DateTime } from 'luxon';
import tzlookup from 'tz-lookup';
// We use the full Swiss Ephemeris data files located in server/ephe
// Using relative path to avoid issues with spaces in directory names on Windows
sweph.set_ephe_path('./server/ephe');

const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const PLANETS = [
  { id: sweph.constants.SE_SUN,     key: 'sun',     name: 'Sun',     symbol: '☉' },
  { id: sweph.constants.SE_MOON,    key: 'moon',    name: 'Moon',    symbol: '☽' },
  { id: sweph.constants.SE_MERCURY, key: 'mercury', name: 'Mercury', symbol: '☿' },
  { id: sweph.constants.SE_VENUS,   key: 'venus',   name: 'Venus',   symbol: '♀' },
  { id: sweph.constants.SE_MARS,    key: 'mars',    name: 'Mars',    symbol: '♂' },
  { id: sweph.constants.SE_JUPITER, key: 'jupiter', name: 'Jupiter', symbol: '♃' },
  { id: sweph.constants.SE_SATURN,  key: 'saturn',  name: 'Saturn',  symbol: '♄' },
  { id: sweph.constants.SE_URANUS,  key: 'uranus',  name: 'Uranus',  symbol: '♅' },
  { id: sweph.constants.SE_NEPTUNE, key: 'neptune', name: 'Neptune', symbol: '♆' },
  { id: sweph.constants.SE_PLUTO,   key: 'pluto',   name: 'Pluto',   symbol: '♇' },
  { id: sweph.constants.SE_TRUE_NODE,key: 'node',   name: 'True Node', symbol: '☊' },
  { id: sweph.constants.SE_MEAN_APOG,key: 'lilith', name: 'Lilith',  symbol: '⚸' },
  { id: sweph.constants.SE_CHIRON,  key: 'chiron',  name: 'Chiron',  symbol: '⚷' },
];

function toSafeFixed(val, digits = 4) {
  const num = Number(val);
  return isNaN(num) ? "0.0000" : num.toFixed(digits);
}

/**
 * Normalizes degree to DMS format: 14° 22' Scorpio
 */
function formatSiderealTime(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.floor((decimalHours * 60) % 60);
  const s = Math.floor((decimalHours * 3600) % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatDegree(totalLng) {
  const lng = ((Number(totalLng || 0) % 360) + 360) % 360;
  const signIdx = Math.floor(lng / 30);
  const signDeg = lng % 30;
  const d = Math.floor(signDeg);
  const m = Math.floor((signDeg - d) * 60);
  const s = Math.floor(((signDeg - d) * 60 - m) * 60);
  
  return {
    formatted: `${d}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}" ${SIGNS[signIdx]}`,
    degreeInSign: `${d}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`,
    sign: SIGNS[signIdx],
    signSymbol: SIGN_SYMBOLS[signIdx],
    signIndex: signIdx,
    raw: lng
  };
}

function formatLatDecl(val) {
  const abs = Math.abs(val);
  const d = Math.floor(abs);
  const m = Math.floor((abs - d) * 60);
  const s = Math.floor(((abs - d) * 60 - m) * 60);
  const dir = val >= 0 ? 'N' : 'S';
  return `${d}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}" ${dir}`;
}

/**
 * Main Calculator — Uses local Swiss Ephemeris engine
 */
export async function calculateChart({ year, month, day, hour, minute, lat, lng, timeKnown = true }) {
  try {
    // 0. Polar Zone Validation (Placidus limitation)
    if (Math.abs(parseFloat(lat)) > 66.5) {
      throw new Error('Placidus house system is not available for polar regions (lat > 66.5°). Please choose a different location or system.');
    }

    // 1. Resolve Time to Julian Day (UTC)
    const tz = tzlookup(lat, lng);
    const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
    const utc = dt.toUTC();
    
    // Calculate Julian Day
    const jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);

    console.log(`[ASTRA] Input: ${year}-${month}-${day} ${hour}:${minute} | TZ: ${tz}`);
    console.log(`[ASTRA] UTC: ${utc.toISO()} | JD: ${jd}`);
    
    // Calculate Delta T (difference between UT and TT)
    const deltaT = sweph.deltat(jd);
    console.log(`[ASTRA] DeltaT: ${deltaT}`);
    const jdEt = jd + deltaT / 86400.0; // Ephemeris Time for internal high precision

    // 2. Calculate Planets
    const planetResults = PLANETS.map(p => {
      const res = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
      
      // sweph returns data in 'longitude' or inside a 'data' array depending on version/build
      let longitude = 0;
      if (res) {
        longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      }
      
      const dms = formatDegree(longitude);
      const isRetrograde = res && res.data && res.data[3] < 0; 
      
      return {
        ...p,
        longitude: parseFloat(toSafeFixed(longitude, 4)),
        speed: parseFloat(toSafeFixed(res.data[3], 4)),
        latitude: parseFloat(toSafeFixed(res.data[1], 4)),
        declination: parseFloat(toSafeFixed(res.data[2], 4)),
        speedFormatted: formatSiderealTime(Math.abs(res.data[3])), // reusing formatter for speed
        latFormatted: formatLatDecl(res.data[1]),
        declFormatted: formatLatDecl(res.data[2]),
        isRetrograde,
        ...dms,
        house: 0 
      };
    });

    // 3. Calculate House Cusps (Placidus)
    let houseRes;
    try {
      houseRes = sweph.houses(jd, parseFloat(lat), parseFloat(lng), 'P');
    } catch (hErr) {
      console.error('[ASTRA] sweph.houses library crash:', hErr);
    }

    let cusps = [];
    let ascendantLng = 0;
    let mcLng = 0;

    // Correctly handle the response format: { data: { houses: [], points: [] } }
    const actualCusps = houseRes?.data?.houses || houseRes?.cusps;
    const actualPoints = houseRes?.data?.points || [];

    if (actualCusps && Array.isArray(actualCusps)) {
      // Handle potential 13-element array or 12-element array
      const rawCusps = actualCusps.length === 13 ? actualCusps.slice(1) : actualCusps;
      
      cusps = rawCusps.map((c, i) => {
        const formatted = formatDegree(c);
        return { 
          house: i + 1, 
          longitude: c, 
          ...formatted
        };
      });

      // In some builds, Ascendant/MC are in 'points' array
      // points[0] = Asc, points[1] = MC
      ascendantLng = actualPoints[0] !== undefined ? actualPoints[0] : (houseRes.ascendant || rawCusps[0]);
      mcLng = actualPoints[1] !== undefined ? actualPoints[1] : (houseRes.mc || rawCusps[9]);
      
      console.log(`[ASTRA] Successfully parsed Placidus: Asc=${ascendantLng}, MC=${mcLng}`);
    } else {
      console.error('[ASTRA] Critical: Swiss Ephemeris returned no house data!', houseRes);
      throw new Error('Astronomical engine failed to generate houses.');
    }

    const asc = formatDegree(ascendantLng);
    // Assign planets to houses
    const cuspValues = cusps.map(c => c.longitude);
    planetResults.forEach(p => {
      p.house = getHouse(p.longitude, cuspValues);
    });

    const sun = planetResults.find(p => p.key === 'sun');
    const moon = planetResults.find(p => p.key === 'moon');

    // 4. Hellenistic Core: Sect & Lots
    const isDayChart = sun.longitude >= cusps[6].longitude || sun.longitude <= cusps[0].longitude; 
    // Note: This is a simplification; a more precise check uses the actual house index or horizon.
    // Let's use the house number for a more robust check in this context.
    const sunHouse = sun.house;
    const sect = (sunHouse >= 7 && sunHouse <= 12) ? 'Day' : 'Night';

    // Lot of Fortune (Tyche) & Lot of Spirit (Daimon)
    // Formula: Day: AC + Moon - Sun | Night: AC + Sun - Moon (Fortune)
    // Spirit is the inverse of Fortune projection.
    let fortuneLng, spiritLng;
    if (sect === 'Day') {
      fortuneLng = (ascendantLng + moon.longitude - sun.longitude + 360) % 360;
      spiritLng = (ascendantLng + sun.longitude - moon.longitude + 360) % 360;
    } else {
      fortuneLng = (ascendantLng + sun.longitude - moon.longitude + 360) % 360;
      spiritLng = (ascendantLng + moon.longitude - sun.longitude + 360) % 360;
    }

    const fortune = { key: 'fortune', name: 'Lot of Fortune', symbol: '⊗', ...formatDegree(fortuneLng) };
    const spirit = { key: 'spirit', name: 'Lot of Spirit', symbol: 'Φ', ...formatDegree(spiritLng) };

    // 5. Calculate Aspects
    const aspects = calculateAspects(planetResults);

    // 6. AI Context Serialization (Ground Truth for LLM)
    const aiContext = serializeForAI({
      input: { year, month, day, hour, minute, lat, lng },
      planets: planetResults,
      houses: cusps,
      aspects,
      hellenistic: { sect, fortune, spirit }
    });

    const mc = formatDegree(mcLng);

    // Calculate Sidereal Time (LST)
    const siderealTimeRaw = sweph.sidtime(jd);
    const siderealTime = formatSiderealTime(siderealTimeRaw);

    return {
      input: { year, month, day, hour, minute, location: { resolved: "User Location", lat, lng } },
      bigThree: {
        sun: { ...sun },
        moon: { ...moon },
        rising: { ...asc, available: timeKnown }
      },
      planets: planetResults,
      houses: {
        system: 'Placidus (Swiss Ephemeris)',
        cusps,
        ascendant: { longitude: ascendantLng, formatted: asc.formatted, declination: formatLatDecl(houseRes?.data?.points?.[2] || 0) },
        midheaven: { longitude: mcLng, formatted: formatDegree(mcLng).formatted, declination: formatLatDecl(houseRes?.data?.points?.[3] || 0) },
        ic: { longitude: (cusps[3]?.longitude), formatted: cusps[3]?.formatted },
        descendant: { longitude: (cusps[6]?.longitude), formatted: cusps[6]?.formatted }
      },
      aspects,
      hellenistic: {
        sect,
        fortune,
        spirit
      },
      aiContext,
      harmonics: {
        h9: calculateHarmonic(planetResults, 9),
        h41: calculateHarmonic(planetResults, 41)
      },
      meta: {
        engine: 'Local Swiss Ephemeris (sweph)',
        houseSystem: 'Placidus',
        zodiac: 'Tropical',
        precision: 'Sub-arcsecond (JPL DE431)',
        calculatedAt: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('[ASTRA] local SwissEph Error Details:', error);
    throw new Error(`Local astronomical engine failed: ${error.message}`);
  }
}

/**
 * Calculates planetary positions for transits (simplified)
 */
export async function calculateTransits({ year, month, day, hour, minute, lat, lng }) {
  try {
    const tz = tzlookup(lat, lng);
    const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
    const utc = dt.toUTC();
    const jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);

    const transitPlanets = PLANETS.map(p => {
      const res = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
      let longitude = 0;
      if (res) {
        longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      }
      return {
        ...p,
        longitude: parseFloat(toSafeFixed(longitude, 4)),
        speed: parseFloat(toSafeFixed(res.data[3], 4)),
        latitude: parseFloat(toSafeFixed(res.data[1], 4)),
        declination: parseFloat(toSafeFixed(res.data[2], 4)),
        speedFormatted: formatSiderealTime(Math.abs(res.data[3])),
        latFormatted: formatLatDecl(res.data[1]),
        declFormatted: formatLatDecl(res.data[2]),
        ...formatDegree(longitude)
      };
    });

    return {
      planets: transitPlanets,
      jd,
      meta: {
        calculatedAt: new Date().toISOString(),
        transitDate: { year, month, day, hour, minute }
      }
    };
  } catch (error) {
    console.error('[ASTRA] Transit Calc Error:', error);
    throw new Error(`Transit calculation failed: ${error.message}`);
  }
}

/**
 * Determines house index for a given longitude
 */
function getHouse(lng, cusps) {
  for (let i = 0; i < 12; i++) {
    const next = (i + 1) % 12;
    let start = cusps[i];
    let end = cusps[next];
    if (end < start) end += 360;
    let l = lng;
    if (l < start) l += 360;
    if (l >= start && l < end) return i + 1;
  }
  return 1;
}

/**
 * Basic Aspect Engine
 */
function calculateAspects(planets) {
  const aspects = [];
  const innerPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars'];
  const DEFS = [
    { name: 'Conjunction', symbol: '☌', angle: 0, orb: 8 },
    { name: 'Sextile', symbol: '⚹', angle: 60, orb: 6 },
    { name: 'Square', symbol: '□', angle: 90, orb: 7 },
    { name: 'Trine', symbol: '△', angle: 120, orb: 8 },
    { name: 'Opposition', symbol: '☍', angle: 180, orb: 8 },
    // Minor Aspects
    { name: 'Semi-Sextile', symbol: '⚺', angle: 30, orb: 2 },
    { name: 'Quincunx', symbol: '⚼', angle: 150, orb: 3 },
    { name: 'Semi-Square', symbol: '∠', angle: 45, orb: 2 },
    { name: 'Sesquiquadrate', symbol: '⚵', angle: 135, orb: 2 },
    { name: 'Quintile', symbol: 'Q', angle: 72, orb: 1.5 },
    { name: 'Bi-Quintile', symbol: 'bQ', angle: 144, orb: 1.5 }
  ];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      const isInner = innerPlanets.includes(p1.key) && innerPlanets.includes(p2.key);
      
      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;

      for (const asp of DEFS) {
        const orb = isInner ? asp.orb : asp.orb * 0.7;
        if (Math.abs(diff - asp.angle) <= orb) {
          aspects.push({
            planet1: { key: p1.key, symbol: p1.symbol },
            planet2: { key: p2.key, symbol: p2.symbol },
            type: asp.name,
            symbol: asp.symbol,
            orb: parseFloat(toSafeFixed(Math.abs(diff - asp.angle), 2))
          });
          break;
        }
      }
    }
  }
  return aspects;
}

/**
 * Serializes chart data into a structured Markdown format for AI ingestion.
 * Prevents hallucinations by providing "Ground Truth" data.
 */
function serializeForAI(data) {
  let context = "### CELESTIAL GROUND TRUTH DATA\n\n";
  
  context += `#### PLACEMENTS\n`;
  data.planets.forEach(p => {
    context += `- ${p.name}: ${p.formatted} (House ${p.house})${p.isRetrograde ? ' [RETROGRADE]' : ''}\n`;
  });
  
  context += `\n#### HOUSES (PLACIDUS)\n`;
  data.houses.forEach(h => {
    context += `- House ${h.house}: ${h.formatted}\n`;
  });
  
  context += `\n#### HELLENISTIC POINTS\n`;
  context += `- Sect: ${data.hellenistic.sect}\n`;
  context += `- Lot of Fortune: ${data.hellenistic.fortune.formatted}\n`;
  context += `- Lot of Spirit: ${data.hellenistic.spirit.formatted}\n`;
  
  context += `\n#### MAJOR ASPECTS\n`;
  data.aspects.forEach(a => {
    context += `- ${a.planet1.key} ${a.type} ${a.planet2.key} (Orb: ${a.orb}°)\n`;
  });
  
  return context;
}

/**
 * Calculates planetary positions for a given harmonic.
 * Formula: (longitude * harmonic) % 360
 */
function calculateHarmonic(planets, harmonic) {
  return planets.map(p => {
    const hLng = (p.longitude * harmonic) % 360;
    return {
      key: p.key,
      name: p.name,
      harmonicLongitude: parseFloat(toSafeFixed(hLng, 4)),
      ...formatDegree(hLng)
    };
  });
}
