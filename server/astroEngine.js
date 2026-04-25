/**
 * Ad Astra — Swiss Ephemeris Data Layer (Professional Edition)
 * Precision: Sub-arcsecond (JPL DE431 standard)
 * Implementation: Solar Fire & Hellenistic Standards
 */

import sweph from 'sweph';
import { DateTime } from 'luxon';
import tzlookup from 'tz-lookup';

sweph.set_ephe_path('./server/ephe');

const PLANET_COLORS = {
  sun: '#FFD700', moon: '#C0C0C0', mercury: '#FFA500', venus: '#4CAF50', mars: '#FF4136',
  jupiter: '#9B51E0', saturn: '#5D4037', uranus: '#00BCD4', neptune: '#2196F3', pluto: '#8B0000',
  node: '#1F2226', chiron: '#B8A456', lilith: '#000000', fortune: '#D4AF37', spirit: '#9B51E0', eros: '#FF69B4'
};

const VALENS_YEARS = {
  0: 15, 1: 8, 2: 20, 3: 25, 4: 19, 5: 20,
  6: 8, 7: 15, 8: 12, 9: 27, 10: 30, 11: 12
};

const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const MODERN_RULERS = {
  'Aries': 'mars', 'Taurus': 'venus', 'Gemini': 'mercury', 'Cancer': 'moon', 'Leo': 'sun', 'Virgo': 'mercury',
  'Libra': 'venus', 'Scorpio': 'pluto', 'Sagittarius': 'jupiter', 'Capricorn': 'saturn', 'Aquarius': 'uranus', 'Pisces': 'neptune'
};

const TRADITIONAL_RULERS = {
  'Aries': 'mars', 'Taurus': 'venus', 'Gemini': 'mercury', 'Cancer': 'moon', 'Leo': 'sun', 'Virgo': 'mercury',
  'Libra': 'venus', 'Scorpio': 'mars', 'Sagittarius': 'jupiter', 'Capricorn': 'saturn', 'Aquarius': 'saturn', 'Pisces': 'jupiter'
};

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
  { id: sweph.constants.SE_CHIRON,  key: 'chiron',  name: 'Chiron',  symbol: '⚷' },
  { id: sweph.constants.SE_MEAN_APOG,key: 'lilith', name: 'Lilith',  symbol: '⚸' },
];

const STARS = [
  "Algol", "Alcyone", "Aldebaran", "Rigel", "Sirius", 
  "Castor", "Pollux", "Regulus", "Spica", "Arcturus", 
  "Antares", "Vega", "Altair", "Fomalhaut", "Deneb Algedi"
];

const HOUSE_SYSTEMS = {
  'P': 'Placidus', 'K': 'Koch', 'W': 'Whole Sign', 'E': 'Equal', 'R': 'Regiomontanus',
  'C': 'Campanus', 'M': 'Morinus', 'O': 'Porphyrius', 'T': 'Topocentric (Polich/Page)'
};

/**
 * UTILITIES
 */
function toSafeFixed(val, digits = 4) {
  const num = Number(val);
  return isNaN(num) ? "0.0000" : num.toFixed(digits);
}

function formatCoord(val) {
  const absVal = Math.abs(val);
  const deg = Math.floor(absVal);
  const min = Math.floor((absVal - deg) * 60);
  const sign = val < 0 ? '-' : '';
  return `${sign}${deg}° ${String(min).padStart(2, '0')}'`;
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

/**
 * ZODIACAL RELEASING HELPER
 */
export function calculateZodiacalReleasing(lotLng, startJD) {
    const startSign = Math.floor(lotLng / 30);
    const periods = [];
    let currentJD = startJD;
    let currentSign = startSign;

    for (let i = 0; i < 12; i++) {
        const signIdx = currentSign % 12;
        const years = VALENS_YEARS[signIdx];
        const days = years * 360; // Valens 360-day year
        
        periods.push({
            sign: SIGNS[signIdx],
            symbol: SIGN_SYMBOLS[signIdx],
            years,
            startDate: DateTime.fromMillis((currentJD - 2440587.5) * 86400000).toISODate(),
            endJD: currentJD + days
        });
        
        currentJD += days;
        currentSign = (currentSign + 1) % 12;
    }
    return periods;
}

/**
 * DISPOSITORS LOGIC
 */
function calculateDispositors(planets, system = 'traditional') {
  const rulers = system === 'modern' ? MODERN_RULERS : TRADITIONAL_RULERS;
  const mainPlanets = system === 'modern' 
    ? ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    : ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
  
  const relevant = planets.filter(p => mainPlanets.includes(p.key));
  const directMap = {};
  relevant.forEach(p => { directMap[p.key] = rulers[p.sign]; });

  const summary = {};
  mainPlanets.forEach(k => {
    summary[k] = { directCount: 0, indirectCount: 0, totalWeight: 0, directSubjects: [], indirectSubjects: [] };
  });

  const mutualReceptions = [];
  const finalDispositors = [];
  const chains = {};

  relevant.forEach(p => {
    const chain = [];
    let current = p.key;
    const visited = new Set();
    while (current && !visited.has(current)) {
      visited.add(current);
      chain.push(current);
      const next = directMap[current];
      if (!next) break;
      if (summary[next]) {
        if (chain.length === 1) { summary[next].directCount++; summary[next].directSubjects.push(p.key); }
        else { summary[next].indirectCount++; summary[next].indirectSubjects.push(p.key); }
      }
      if (next === current) { if (!finalDispositors.includes(current)) finalDispositors.push(current); break; }
      current = next;
    }
    chains[p.key] = chain;
  });

  return { summary, chains, finalDispositors, mutualReceptions };
}

/**
 * MAIN CALCULATION PIPELINE
 */
export async function calculateChart({ year, month, day, hour, minute, lat, lng, houseSystem = 'P' }) {
  try {
    const tz = tzlookup(lat, lng);
    const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
    const utc = dt.toUTC();
    const jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);

    const planetResults = PLANETS.map(p => {
      const res = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
      const resEqu = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_EQUATORIAL | sweph.constants.SEFLG_SWIEPH);
      const longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      return {
        ...p,
        longitude: parseFloat(toSafeFixed(longitude, 4)),
        latitude: parseFloat(toSafeFixed(res.data ? res.data[1] : 0, 4)),
        declination: parseFloat(toSafeFixed(resEqu.data ? resEqu.data[1] : 0, 4)),
        speed: parseFloat(toSafeFixed(res.data[3], 4)),
        isRetrograde: res.data[3] < 0,
        ...formatDegree(longitude),
        house: 0 
      };
    });

    // South Node
    const nNode = planetResults.find(p => p.key === 'node');
    const southNodeLng = (nNode.longitude + 180) % 360;
    planetResults.push({ key: 'south_node', name: 'South Node', symbol: '☋', longitude: southNodeLng, speed: nNode.speed, isRetrograde: nNode.isRetrograde, ...formatDegree(southNodeLng), house: 0 });

    const houseRes = sweph.houses(jd, parseFloat(lat), parseFloat(lng), houseSystem);
    const cusps = houseRes.cusps.map((c, i) => ({ house: i + 1, longitude: c, ...formatDegree(c) }));
    const asc = houseRes.points[0];

    planetResults.forEach(p => {
      const lng = p.longitude;
      for (let i = 0; i < 12; i++) {
        let start = houseRes.cusps[i], end = houseRes.cusps[(i + 1) % 12];
        if (end < start) end += 360;
        let testLng = lng;
        if (testLng < start) testLng += 360;
        if (testLng >= start && testLng < end) { 
          p.house = i + 1; 
          break; 
        }
      }
    });

    // SECT & LOTS (Solar Fire Standards)
    const sun = planetResults.find(p => p.key === 'sun');
    const moon = planetResults.find(p => p.key === 'moon');
    const isDay = sun.house >= 7 && sun.house <= 12;

    const calculateLot = (p1, p2, p3, reverse = false) => {
      let l1 = p1, l2 = p2, l3 = p3;
      if (!isDay) [l2, l3] = [l3, l2]; // Hellenistic inversion for night
      let res = (l1 + l2 - l3 + 720) % 360;
      return { longitude: res, ...formatDegree(res) };
    };

    const lots = [
      { key: 'fortune', name: 'Lot of Fortune', symbol: '⊗', ...calculateLot(asc, moon.longitude, sun.longitude) },
      { key: 'spirit',  name: 'Lot of Spirit',  symbol: '🕯️', ...calculateLot(asc, sun.longitude, moon.longitude) }
    ];

    const spiritLng = lots[1].longitude;
    const venusLng = planetResults.find(p => p.key === 'venus')?.longitude || 0;
    lots.push({ key: 'eros', name: 'Lot of Eros', symbol: '❤', longitude: (asc + (isDay ? venusLng - spiritLng : spiritLng - venusLng) + 720) % 360, ...formatDegree((asc + (isDay ? venusLng - spiritLng : spiritLng - venusLng) + 720) % 360) });

    const aspects = calculateAspects(planetResults);
    const releasing = { fortune: calculateZodiacalReleasing(lots[0].longitude, jd), spirit: calculateZodiacalReleasing(lots[1].longitude, jd) };

    return {
      input: { year, month, day, hour, minute, lat, lng },
      planets: planetResults,
      lots,
      houses: { cusps, ascendant: { longitude: asc, ...formatDegree(asc) } },
      aspects,
      patterns: calculateAspectPatterns(planetResults, aspects),
      releasing,
      sect: isDay ? 'Day' : 'Night',
      metadata: { jd, calculatedAt: new Date().toISOString() }
    };
  } catch (error) { throw new Error(`Engine Error: ${error.message}`); }
}

/**
 * TRANSITS & PROGNOSTICS (Solar Fire Standard)
 */
export async function calculateTransits({ year, month, day, hour, minute, lat, lng }) {
  try {
    const tz = tzlookup(lat, lng);
    const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
    const utc = dt.toUTC();
    const jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);

    const transitPlanets = PLANETS.map(p => {
      const res = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
      let longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      return { ...p, longitude, speed: res.data ? res.data[3] : 0, ...formatDegree(longitude) };
    });

    const nNode = transitPlanets.find(p => p.key === 'node');
    const southNodeLng = (nNode.longitude + 180) % 360;
    transitPlanets.push({ key: 'south_node', name: 'South Node', symbol: '☋', longitude: southNodeLng, ...formatDegree(southNodeLng) });

    return { planets: transitPlanets, jd, metadata: { calculatedAt: new Date().toISOString() } };
  } catch (error) { throw new Error(`Transit Error: ${error.message}`); }
}

export async function calculatePrognostics({ birthDate, targetDate, type, lat, lng }) {
  try {
    const bDt = DateTime.fromISO(birthDate.replace(' ', 'T')).toUTC();
    const tDt = DateTime.fromISO(targetDate.replace(' ', 'T')).toUTC();
    const birthJD = sweph.julday(bDt.year, bDt.month, bDt.day, bDt.hour + bDt.minute / 60, sweph.constants.SE_GREG_CAL);
    const targetJD = sweph.julday(tDt.year, tDt.month, tDt.day, tDt.hour + tDt.minute / 60, sweph.constants.SE_GREG_CAL);
    const diffYears = (targetJD - birthJD) / 365.242199;

    if (type === 'secondary') {
      const progressedJD = birthJD + diffYears;
      const results = PLANETS.map(p => {
        const res = sweph.calc_ut(progressedJD, p.id, sweph.constants.SEFLG_SWIEPH);
        const longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
        return { ...p, longitude, ...formatDegree(longitude) };
      });
      return { planets: results, type: 'Secondary Progressions', years: diffYears };
    } 
    
    if (type === 'solar_arc') {
      const sunBirthRes = sweph.calc_ut(birthJD, sweph.constants.SE_SUN, sweph.constants.SEFLG_SWIEPH);
      const sunTargetRes = sweph.calc_ut(birthJD + diffYears, sweph.constants.SE_SUN, sweph.constants.SEFLG_SWIEPH);
      const arc = (sunTargetRes.longitude - sunBirthRes.longitude + 360) % 360;
      const results = PLANETS.map(p => {
        const res = sweph.calc_ut(birthJD, p.id, sweph.constants.SEFLG_SWIEPH);
        const directedLng = (res.longitude + arc) % 360;
        return { ...p, longitude: directedLng, ...formatDegree(directedLng) };
      });
      return { planets: results, type: 'Solar Arc Directions', arc, years: diffYears };
    }
  } catch (error) { throw new Error(`Prognostic Error: ${error.message}`); }
}

function calculateAspects(planets) {
  const aspects = [];
  const DEFS = [
    { name: 'Conjunction', symbol: '☌', angle: 0, orb: 8 },
    { name: 'Sextile', symbol: '⚹', angle: 60, orb: 6 },
    { name: 'Square', symbol: '□', angle: 90, orb: 7 },
    { name: 'Trine', symbol: '△', angle: 120, orb: 8 },
    { name: 'Quincunx', symbol: 'ㅈ', angle: 150, orb: 3 },
    { name: 'Opposition', symbol: '☍', angle: 180, orb: 8 }
  ];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let diff = Math.abs(planets[i].longitude - planets[j].longitude);
      if (diff > 180) diff = 360 - diff;
      for (const asp of DEFS) {
        if (Math.abs(diff - asp.angle) <= asp.orb) {
          aspects.push({ planet1: { key: planets[i].key, symbol: planets[i].symbol }, planet2: { key: planets[j].key, symbol: planets[j].symbol }, type: asp.name, symbol: asp.symbol, orb: parseFloat(Math.abs(diff - asp.angle).toFixed(2)) });
        }
      }
    }
  }
  return aspects;
}

function calculateAspectPatterns(planets, aspects) {
  const patterns = [];
  const findAspect = (p1k, p2k, type) => aspects.find(a => ((a.planet1.key === p1k && a.planet2.key === p2k) || (a.planet1.key === p2k && a.planet2.key === p1k)) && (!type || a.type === type));
  const MAJOR_POINTS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const keys = planets.filter(p => MAJOR_POINTS.includes(p.key)).map(p => p.key);

  const addPattern = (p) => {
    const pSig = [...p.planets].sort().join('-') + p.type;
    if (!patterns.some(prev => [...prev.planets].sort().join('-') + prev.type === pSig)) patterns.push(p);
  };

  // Grand Trine
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        if (findAspect(keys[i], keys[j], 'Trine') && findAspect(keys[j], keys[k], 'Trine') && findAspect(keys[k], keys[i], 'Trine')) addPattern({ type: 'Grand Trine', planets: [keys[i], keys[j], keys[k]] });
      }
    }
  }

  // T-Square
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = 0; k < keys.length; k++) {
        if (k === i || k === j) continue;
        if (findAspect(keys[i], keys[j], 'Opposition') && findAspect(keys[i], keys[k], 'Square') && findAspect(keys[j], keys[k], 'Square')) addPattern({ type: 'T-Square', planets: [keys[i], keys[j], keys[k]], apex: keys[k] });
      }
    }
  }

  return patterns;
}
