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
  node: '#1F2226', chiron: '#B8A456', lilith: '#000000', fortune: '#D4AF37', spirit: '#9B51E0', eros: '#FF69B4',
  cupido: '#FFC0CB', hades: '#4B0082', zeus: '#FF0000', kronos: '#00008B', apollon: '#FFFF00', admetos: '#808080', vulkanus: '#FF4500', poseidon: '#ADD8E6'
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

const ZODIAC_SYSTEMS = {
  TROPICAL: 'tropical',
  SIDEREAL: 'sidereal'
};

const AYANAMSAS = {
  FAGAN_BRADLEY: 0,
  LAHIRI: 1,
  DELUCE: 2,
  RAMAN: 3,
  USHASHASHI: 4,
  KRISHNAMURTI: 5,
  DJWHAL_KHUL: 6,
  JN_BHASIN: 7,
  BABYL_KUGLER_1: 8,
  BABYL_HUBER: 10,
  ALDEBARAN_15TAU: 14,
  TRUE_CHITRA: 27,
  TRUE_REVATI: 28,
  TRUE_PUSHYA: 29
};

const D12_DEITIES = ['Ganesha', 'Ashwini Kumar', 'Yama', 'Sarpa'];

const MIDPOINT_INTERPRETATIONS = {
  // Personal & Psychological
  'sun/moon': 'Oś Małżeństwa: Harmonia duszy i ciała, partnerstwo, relacja rodziców, jedność męskości i kobiecości.',
  'sun/mercury': 'Intelekt: Myślenie o sobie, autoekspresja poprzez mowę, świadome przetwarzanie informacji.',
  'sun/venus': 'Urok: Poczucie piękna, miłość do życia, harmonia artystyczna, skłonność do wygody.',
  'sun/mars': 'Witalność: Aktywność, siła woli, przedsiębiorczość, duch walki, zdolności przywódcze.',
  'sun/jupiter': 'Szczęście: Optymizm, sukces, ekspansja, uznanie społeczne, radosna natura.',
  'sun/saturn': 'Zahamowanie: Dyscyplina, trudności, izolacja, starość, powaga, ograniczona witalność.',
  'sun/uranus': 'Rebelia: Nagłe zmiany, innowacja, niezależność, reformator, skłonność do ryzyka.',
  'sun/neptune': 'Wrażliwość: Mistycyzm, osłabienie, iluzja, wizje, brak realizmu, talent artystyczny.',
  'sun/pluto': 'Potęga: Transformacja, dążenie do władzy, fanatyzm, zdolności regeneracyjne, obsesja.',
  
  // Emotional & Social
  'moon/mercury': 'Intuicja: Zrozumienie emocjonalne, komunikacja uczuć, instynktowne myślenie.',
  'moon/venus': 'Czułość: Macierzyństwo, oddanie, zamiłowanie do sztuki, łagodność, płodność.',
  'moon/mars': 'Emocjonalność: Impulsywność, kłótliwość, pasja, silne reakcje instynktowne.',
  'moon/jupiter': 'Hojność: Dobre serce, bogactwo emocjonalne, optymistyczne nastawienie do ludzi.',
  'moon/saturn': 'Depresja: Poczucie osamotnienia, melancholia, chłód emocjonalny, zahamowania.',
  'moon/uranus': 'Pobudliwość: Nagłe zmiany nastroju, silne napięcie emocjonalne, fanatyzm.',
  'moon/neptune': 'Wizjonerstwo: Wybitna intuicja, skłonność do marzeń, uleganie nastrojom otoczenia.',
  'moon/pluto': 'Fanatyzm: Intensywne przeżycia, dążenie do dominacji emocjonalnej, transformacja duszy.',

  // Mental & Communicative
  'mercury/venus': 'Estetyka: Gracja w mowie, talent literacki, dyplomacja, uprzejmość.',
  'mercury/mars': 'Polemiczność: Szybkość myślenia, ostra mowa, gotowość do debaty, zmysł krytyczny.',
  'mercury/jupiter': 'Optymizm: Dobre wieści, sukces w handlu i nauce, sprawność werbalna, dalekie podróże.',
  'mercury/saturn': 'Logika: Koncentracja, głębokie studia, skłonność do pesymizmu, twarde fakty.',
  'mercury/uranus': 'Inwencja: Błyskotliwość, techniczne myślenie, nagłe pomysły, ekscentryczność.',
  'mercury/neptune': 'Fantazja: Wyobraźnia, kłamstwa, niezrozumienie faktów, talent poetycki.',
  'mercury/pluto': 'Przekonywanie: Siła sugestii, badawczy umysł, zdolność manipulacji informacją.',

  // Action & Tension (Critical)
  'mars/saturn': 'Oś Śmierci: Blokada energii, praca pod przymusem, ustanie czynności życiowych, wytrwałość.',
  'mars/uranus': 'Oś Wypadków: Nagłe operacje, gwałtowne zdarzenia, rany cięte, pęknięcia, urazy.',
  'mars/neptune': 'Osłabienie: Brak celu, infekcje, rozczarowanie, niepewne działania.',
  'mars/pluto': 'Super-energia: Nadludzki wysiłek, bezwzględność, sukces po walce, transformacja siły.',
  'saturn/neptune': 'Oś Choroby: Chroniczne dolegliwości, rezygnacja, lęk, infekcje ukryte, wyniszczenie.',
  'saturn/pluto': 'Surowość: Ciężka praca, ograniczenia, trudna transformacja, twardy los.',
  'jupiter/saturn': 'Stabilizacja: Budowanie fundamentów, rozsądna ekspansja, zmiana statusu materialnego.',
  
  // Aries Point (Social Impact)
  'ap/sun': 'Publiczność: Bycie zauważonym, rola publiczna, witalność na widoku.',
  'ap/moon': 'Ludzie: Relacje z tłumem, wpływ na opinię publiczną, wrażliwość społeczna.',
  'ap/jupiter': 'Sukces: Publiczne uznanie, wielkie szczęście, popularność.',
  'ap/saturn': 'Reputacja: Trudności publiczne, surowa ocena otoczenia, ciężka praca dla społeczeństwa.'
};

/**
 * DISPOSITORS LOGIC (Professional)
 */
function calculateDispositors(planets, system = 'traditional') {
  const rulers = system === 'modern' ? MODERN_RULERS : TRADITIONAL_RULERS;
  const mainPlanets = system === 'modern' 
    ? ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    : ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
  
  // Subjects: ALL available planets/points
  // Rulers: The 10 (modern) or 7 (traditional) main bodies
  const directMap = {};
  planets.forEach(p => { 
    if (rulers[p.sign]) {
      directMap[p.key] = rulers[p.sign]; 
    }
  });

  const summary = {};
  mainPlanets.forEach(k => {
    summary[k] = { directCount: 0, indirectCount: 0, totalWeight: 0, directSubjects: [], indirectSubjects: [] };
  });

  const mutualReceptions = [];
  const finalDispositors = [];
  const loops = [];
  const chains = {};

  planets.forEach(p => {
    const chain = [];
    let current = p.key;
    const visited = new Set();
    
    while (current && !visited.has(current)) {
      visited.add(current);
      chain.push(current);
      const next = directMap[current];
      if (!next) break;

      if (summary[next]) {
        if (chain.length === 1) {
          summary[next].directCount++;
          summary[next].directSubjects.push(p.key);
        } else {
          summary[next].indirectCount++;
          summary[next].indirectSubjects.push(p.key);
        }
      }

      if (next === current) {
        if (!finalDispositors.includes(current)) finalDispositors.push(current);
        break;
      }
      current = next;
    }

    if (current && visited.has(current)) {
      const loopStartIndex = chain.indexOf(current);
      const loop = chain.slice(loopStartIndex);
      if (loop.length === 2) {
        const mrKey = [...loop].sort().join('-');
        if (!mutualReceptions.some(mr => [...mr].sort().join('-') === mrKey)) {
          mutualReceptions.push(loop);
        }
      } else if (loop.length > 2) {
        const loopKey = [...loop].sort().join('-');
        if (!loops.some(l => [...l].sort().join('-') === loopKey)) {
          loops.push(loop);
        }
      }
    }
    chains[p.key] = chain;
  });

  let totalScore = 0;
  mainPlanets.forEach(k => {
    const score = (summary[k].directCount * 10) + (summary[k].indirectCount * 5);
    summary[k].totalWeight = score;
    totalScore += score;
  });
  mainPlanets.forEach(k => {
    summary[k].percentage = totalScore > 0 ? (summary[k].totalWeight / totalScore) * 100 : 0;
  });

  return { summary, chains, finalDispositors, mutualReceptions, loops };
}

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
  { id: 40, key: 'cupido', name: 'Cupido', symbol: 'U' },
  { id: 41, key: 'hades', name: 'Hades', symbol: 'U' },
  { id: 42, key: 'zeus', name: 'Zeus', symbol: 'U' },
  { id: 43, key: 'kronos', name: 'Kronos', symbol: 'U' },
  { id: 44, key: 'apollon', name: 'Apollon', symbol: 'U' },
  { id: 45, key: 'admetos', name: 'Admetos', symbol: 'U' },
  { id: 46, key: 'vulkanus', name: 'Vulkanus', symbol: 'U' },
  { id: 47, key: 'poseidon', name: 'Poseidon', symbol: 'U' },
  { id: -1, key: 'ap', name: 'Aries Point', symbol: '♈' }
];

const STARS = [
  "Algol", "Alcyone", "Aldebaran", "Rigel", "Sirius", 
  "Castor", "Pollux", "Regulus", "Spica", "Arcturus", 
  "Antares", "Vega", "Altair", "Fomalhaut", "Deneb Algedi"
];

const STAR_DATA = {
  "Algol": 26.2, "Alcyone": 30.15, "Aldebaran": 69.83, "Rigel": 76.95, "Sirius": 104.18,
  "Castor": 110.35, "Pollux": 113.2, "Regulus": 150.05, "Spica": 203.88, "Arcturus": 204.3,
  "Antares": 249.85, "Vega": 285.4, "Altair": 301.8, "Fomalhaut": 334.05, "Deneb Algedi": 323.5
};

const HOUSE_SYSTEMS = {
  'P': 'Placidus', 'K': 'Koch', 'W': 'Whole Sign', 'E': 'Equal', 'R': 'Regiomontanus',
  'C': 'Campanus', 'M': 'Morinus', 'O': 'Porphyrius', 'T': 'Topocentric (Polich/Page)'
};

function toSafeFixed(val, digits = 4) {
  const num = Number(val);
  return isNaN(num) ? "0.0000" : num.toFixed(digits);
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
    degreeInSign: `${d}° ${String(m).padStart(2, '0')}'`,
    degree: d,
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
    sign: SIGNS[signIdx],
    signSymbol: SIGN_SYMBOLS[signIdx],
    signIndex: signIdx,
    raw: lng
  };
}

function calculateDwadasamsa(totalLng) {
  const normalizedLng = ((totalLng % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedLng / 30);
  const signStart = signIndex * 30;
  const degreeInSign = normalizedLng % 30;
  
  const amsaIndex = Math.floor(degreeInSign / 2.5);
  const deity = D12_DEITIES[amsaIndex % 4];
  
  // D12 Formula: Each sign's 30 degrees is mapped to 360 degrees, 
  // but the starting point of the D12 chart for that sign IS the sign itself.
  const d12Lng = (degreeInSign * 12 + signStart) % 360;
  
  return {
    longitude: parseFloat(toSafeFixed(d12Lng, 4)),
    deity,
    ...formatDegree(d12Lng)
  };
}

function calculateMidpoints(planets) {
  const midpoints = [];
  const activePlanets = planets.filter(p => !['fortune', 'spirit', 'eros', 'lilith'].includes(p.key));
  
  // Add Aries Point (AP) as a virtual reference
  activePlanets.push({ key: 'ap', name: 'Aries Point', symbol: '♈︎', longitude: 0 });

  for (let i = 0; i < activePlanets.length; i++) {
    for (let j = i + 1; j < activePlanets.length; j++) {
      const p1 = activePlanets[i];
      const p2 = activePlanets[j];

      let l1 = p1.longitude;
      let l2 = p2.longitude;

      let rawMid = (l1 + l2) / 2;
      let diff = Math.abs(l1 - l2);

      let finalMid = rawMid;
      if (diff > 180) {
        finalMid = (rawMid + 180) % 360;
      }

      const key = `${p1.key}/${p2.key}`;
      const dial90 = finalMid % 90;
      const dial45 = finalMid % 45;

      midpoints.push({
        key,
        label: `${p1.name}/${p2.name}`,
        longitude: finalMid,
        dial90,
        dial45,
        interpretation: MIDPOINT_INTERPRETATIONS[key] || MIDPOINT_INTERPRETATIONS[`${p2.key}/${p1.key}`] || 'Kombinacja sił planetarnych.',
        ...formatDegree(finalMid)
      });
    }
  }

  return midpoints.sort((a, b) => a.dial90 - b.dial90);
}

function formatCoord(val) {
  const absVal = Math.abs(val);
  const deg = Math.floor(absVal);
  const min = Math.floor((absVal - deg) * 60);
  const sign = val < 0 ? '-' : '';
  return `${sign}${deg}° ${String(min).padStart(2, '0')}'`;
}

/**
 * ADVANCED ZODIACAL RELEASING ENGINE
 */
export function calculateZodiacalReleasing(lotLng, startJD, levelLimit = 4) {
  const result = [];
  const startSign = Math.floor(lotLng / 30);
  const julianYear = 365.25;

  function getPeriods(signIdx, currentJD, level, parentSign) {
    const periods = [];
    let localJD = currentJD;
    let accumulatedMonths = 0;
    let signSequence = [];
    
    // Generate 12 signs sequence
    for (let i = 0; i < 12; i++) {
      signSequence.push((signIdx + i) % 12);
    }

    // Process Level
    for (let i = 0; i < signSequence.length; i++) {
      let sIdx = signSequence[i];
      let isLB = false;

      // LOOSING OF THE BOND (LB) logic for L2
      // If we finished 12 signs but level is still active
      if (level === 2 && accumulatedMonths >= 148) { // ~17.5 years in months
        sIdx = (sIdx + 6) % 12; // Jump to opposite sign
        isLB = true;
        accumulatedMonths = 0; // Reset after jump
      }

      const rawYears = VALENS_YEARS[sIdx];
      let durationDays;
      
      if (level === 1) {
        durationDays = rawYears * julianYear;
      } else if (level === 2) {
        durationDays = (rawYears / 12) * julianYear;
      } else if (level === 3) {
        durationDays = (rawYears / 144) * julianYear;
      } else {
        durationDays = (rawYears / 1728) * julianYear;
      }

      const endJD = localJD + durationDays;
      const period = {
        sign: SIGNS[sIdx],
        symbol: SIGN_SYMBOLS[sIdx],
        level,
        isLB,
        startDate: DateTime.fromMillis((localJD - 2440587.5) * 86400000).toISODate(),
        endDate: DateTime.fromMillis((endJD - 2440587.5) * 86400000).toISODate(),
        startJD: localJD,
        endJD: endJD,
        subPeriods: []
      };

      if (level < levelLimit) {
        period.subPeriods = getPeriods(sIdx, localJD, level + 1, sIdx);
      }

      periods.push(period);
      localJD = endJD;
      
      if (level === 2) accumulatedMonths += rawYears;
    }
    return periods;
  }

  // Calculate L1 for ~100 years
  let globalJD = startJD;
  for (let i = 0; i < 8; i++) { // Approx 8 major periods
    const signIdx = (startSign + i) % 12;
    const years = VALENS_YEARS[signIdx];
    const durationDays = years * julianYear;
    const endJD = globalJD + durationDays;

    const l1 = {
      sign: SIGNS[signIdx],
      symbol: SIGN_SYMBOLS[signIdx],
      level: 1,
      startDate: DateTime.fromMillis((globalJD - 2440587.5) * 86400000).toISODate(),
      endDate: DateTime.fromMillis((endJD - 2440587.5) * 86400000).toISODate(),
      startJD: globalJD,
      endJD: endJD,
      subPeriods: getPeriods(signIdx, globalJD, 2, signIdx)
    };

    result.push(l1);
    globalJD = endJD;
  }

  return result;
}

/**
 * MAIN CALCULATION PIPELINE (Professional Restoration)
 */
export async function calculateChart(params) {
  const { year, month, day, hour, minute, lat, lng, houseSystem = 'P', zodiacType = 'tropical', ayanamsa = 1, timeKnown = true } = params;
  
  try {
    let jd;
    if (params.jd) {
      jd = parseFloat(params.jd);
    } else {
      const tz = tzlookup(lat, lng);
      const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
      const utc = dt.toUTC();
      jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);
    }

    let calcFlag = sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH;
    
    if (zodiacType === 'heliocentric') {
      calcFlag |= sweph.constants.SEFLG_HELCTR;
    } else if (zodiacType === 'sidereal') {
      sweph.set_sid_mode(parseInt(ayanamsa), 0, 0);
      calcFlag |= sweph.constants.SEFLG_SIDEREAL;
    }

    // Calculate base shift for virtual points
    let baseShift = 0;
    if (zodiacType === 'draconic') {
      const nodeRes = sweph.calc_ut(jd, sweph.constants.SE_TRUE_NODE, sweph.constants.SEFLG_SWIEPH);
      baseShift = nodeRes.longitude !== undefined ? nodeRes.longitude : nodeRes.data[0];
    } else if (zodiacType === 'sidereal') {
      baseShift = sweph.get_ayanamsa(jd);
    } else if (zodiacType === 'galactic') {
      // Galactic center is roughly at 26-27 Sagittarius Tropical
      // But Aries Point (0 Tropical) in Galactic coordinates is different
      const galZero = sweph.cotrans(0, 0, 1, 2);
      baseShift = -galZero.data[0];
    }

    const planetResults = PLANETS.map(p => {
      // Heliocentric: Sun is center
      if (zodiacType === 'heliocentric' && p.key === 'sun') {
        return { ...p, longitude: 0, latitude: 0, speed: 0, ...formatDegree(0), house: 0 };
      }

      let flags = calcFlag;
      if (zodiacType === 'heliocentric') flags |= sweph.constants.SEFLG_HELCTR;
      if (zodiacType === 'sidereal') flags |= sweph.constants.SEFLG_SIDEREAL;

      const res = sweph.calc_ut(jd, p.id, flags);
      const resEqu = sweph.calc_ut(jd, p.id, (flags & ~sweph.constants.SEFLG_HELCTR) | sweph.constants.SEFLG_EQUATORIAL);
      
      let longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      const latitude = res.data ? res.data[1] : 0;
      const declination = resEqu.data ? resEqu.data[1] : 0;

      // Galactic Transformation
      if (zodiacType === 'galactic') {
        const gal = sweph.cotrans(longitude, latitude, res.data[2], 2);
        longitude = gal.data[0];
      }

      // Draconic Shift (handled for all planets)
      if (zodiacType === 'draconic') {
        const nodeRes = sweph.calc_ut(jd, sweph.constants.SE_TRUE_NODE, sweph.constants.SEFLG_SWIEPH);
        const nodeLng = nodeRes.longitude !== undefined ? nodeRes.longitude : nodeRes.data[0];
        longitude = (longitude - nodeLng + 360) % 360;
      }

      // IAU (Constellations) Transformation
      if (zodiacType === 'iau') {
        const iauBoundaries = [
          { name: 'Aries', start: 28.53, end: 53.48 },
          { name: 'Taurus', start: 53.48, end: 90.15 },
          { name: 'Gemini', start: 90.15, end: 118.67 },
          { name: 'Cancer', start: 118.67, end: 138.18 },
          { name: 'Leo', start: 138.18, end: 173.87 },
          { name: 'Virgo', start: 173.87, end: 217.82 },
          { name: 'Libra', start: 217.82, end: 241.13 },
          { name: 'Scorpio', start: 241.13, end: 248.00 },
          { name: 'Ophiuchus', start: 248.00, end: 266.38 },
          { name: 'Sagittarius', start: 266.38, end: 299.73 },
          { name: 'Capricorn', start: 299.73, end: 327.65 },
          { name: 'Aquarius', start: 327.65, end: 351.60 },
          { name: 'Pisces', start: 351.60, end: 28.53 }
        ];
        const constellation = iauBoundaries.find(b => {
          if (b.start > b.end) return longitude >= b.start || longitude < b.end;
          return longitude >= b.start && longitude < b.end;
        });
        if (constellation) {
          p.iauConstellation = constellation.name;
        }
      }

      // Handle Virtual Aries Point (AP) - The fix is here
      if (p.key === 'ap') {
        const apLng = (0 - baseShift + 360) % 360;
        return {
          ...p,
          longitude: parseFloat(toSafeFixed(apLng, 4)),
          latitude: 0,
          declination: 0,
          latFormatted: "0° 00'",
          declFormatted: "0° 00'",
          speed: 0,
          isRetrograde: false,
          ...formatDegree(apLng),
          dwadasamsa: calculateDwadasamsa(apLng),
          house: 0
        };
      }

      return {
        ...p,
        longitude: parseFloat(toSafeFixed(longitude, 4)),
        latitude: parseFloat(toSafeFixed(latitude, 4)),
        distance: parseFloat(toSafeFixed(res.data ? res.data[2] : 1.0, 6)),
        declination: parseFloat(toSafeFixed(declination, 4)),
        latFormatted: formatCoord(latitude),
        declFormatted: formatCoord(declination),
        speed: parseFloat(toSafeFixed(res.data ? res.data[3] : 0, 4)),
        isRetrograde: (res.data ? res.data[3] : 0) < 0,
        ...formatDegree(longitude),
        dwadasamsa: calculateDwadasamsa(longitude),
        house: 0 
      };
    });

    // Add Earth for Heliocentric
    if (zodiacType === 'heliocentric') {
      const earthRes = sweph.calc_ut(jd, sweph.constants.SE_EARTH, sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_HELCTR);
      const longitude = earthRes.longitude !== undefined ? earthRes.longitude : earthRes.data[0];
      planetResults.push({
        key: 'earth', name: 'Earth', symbol: '⊕',
        longitude: parseFloat(toSafeFixed(longitude, 4)),
        ...formatDegree(longitude),
        house: 0
      });
    }

    // South Node (Splice logic)
    const nodeIndex = planetResults.findIndex(p => p.key === 'node');
    if (nodeIndex !== -1) {
      const nNode = planetResults[nodeIndex];
      const sNodeLng = (nNode.longitude + 180) % 360;
      planetResults.splice(nodeIndex + 1, 0, {
        key: 'south_node', name: 'South Node', symbol: '☋', 
        longitude: sNodeLng, speed: nNode.speed, isRetrograde: nNode.isRetrograde,
        ...formatDegree(sNodeLng), 
        dwadasamsa: calculateDwadasamsa(sNodeLng),
        house: 0
      });
    }

    // 2. CALCULATE HOUSES & AXES
    let effectiveSystem = houseSystem;
    if (houseSystem === 'P' && Math.abs(parseFloat(lat)) > 66.5) effectiveSystem = 'O';

    const hSys = (zodiacType === 'heliocentric' || zodiacType === 'galactic') ? 'W' : effectiveSystem;
    const houseRes = sweph.houses(jd, parseFloat(lat), parseFloat(lng), hSys);
    const actualCusps = houseRes?.data?.houses || houseRes?.cusps || [];
    const actualPoints = houseRes?.data?.points || [];
    
    // Shift Houses
    let houseShift = 0;
    if (zodiacType === 'sidereal') {
      houseShift = sweph.get_ayanamsa(jd);
    } else if (zodiacType === 'draconic') {
      const nodeRes = sweph.calc_ut(jd, sweph.constants.SE_TRUE_NODE, sweph.constants.SEFLG_SWIEPH);
      houseShift = nodeRes.longitude !== undefined ? nodeRes.longitude : nodeRes.data[0];
    }

    let rawCusps = (actualCusps.length === 13 ? actualCusps.slice(1) : actualCusps);
    let ascendantLng = actualPoints[0] !== undefined ? actualPoints[0] : rawCusps[0];
    let mcLng = actualPoints[1] !== undefined ? actualPoints[1] : rawCusps[9];

    if (zodiacType === 'galactic') {
        const galAsc = sweph.cotrans(ascendantLng, 0, 1, 2);
        const galMC = sweph.cotrans(mcLng, 0, 1, 2);
        ascendantLng = galAsc.data[0];
        mcLng = galMC.data[0];
        rawCusps = rawCusps.map(c => sweph.cotrans(c, 0, 1, 2).data[0]);
    } else {
        rawCusps = rawCusps.map(c => (c - houseShift + 360) % 360);
        ascendantLng = (ascendantLng - houseShift + 360) % 360;
        mcLng = (mcLng - houseShift + 360) % 360;
    }
    
    const cusps = rawCusps.map((c, i) => ({ house: i + 1, longitude: c, ...formatDegree(c) }));

    planetResults.forEach(p => { 
        const lng = p.longitude;
        for (let i = 0; i < 12; i++) {
          let start = rawCusps[i], end = rawCusps[(i + 1) % 12];
          if (end < start) end += 360;
          let testLng = lng;
          if (testLng < start) testLng += 360;
          if (testLng >= start && testLng < end) { p.house = i + 1; break; }
        }
    });

    // 3. ASPECTS & PATTERNS
    const aspects = calculateAspects(planetResults);
    const patterns = calculateAspectPatterns(planetResults, aspects);

    // 4. HERMETIC LOTS (Sect-Aware)
    const sun = planetResults.find(p => p.key === 'sun');
    const moon = planetResults.find(p => p.key === 'moon');
    const saturn = planetResults.find(p => p.key === 'saturn');
    const venus = planetResults.find(p => p.key === 'venus');
    const isDay = sun.house >= 7 && sun.house <= 12;

    const calculateLot = (p1, p2, p3) => {
      let l1 = p1, l2 = p2, l3 = p3;
      if (!isDay) [l2, l3] = [l3, l2];
      let res = (l1 + l2 - l3 + 720) % 360;
      return { longitude: res, ...formatDegree(res) };
    };

    const spiritLot = calculateLot(ascendantLng, sun.longitude, moon.longitude);
    const fortuneLot = calculateLot(ascendantLng, moon.longitude, sun.longitude);
    
    const lots = [
      { key: 'fortune', name: 'Part of Fortune', symbol: '⊗', ...fortuneLot },
      { key: 'spirit',  name: 'Part of Spirit',  symbol: '🕯️', ...spiritLot },
      { 
        key: 'eros', name: 'Part of Eros', symbol: '❤', 
        longitude: (ascendantLng + (isDay ? (venus?.longitude||0) - spiritLot.longitude : spiritLot.longitude - (venus?.longitude||0)) + 720) % 360,
        ...formatDegree((ascendantLng + (isDay ? (venus?.longitude||0) - spiritLot.longitude : spiritLot.longitude - (venus?.longitude||0)) + 720) % 360)
      },
      {
        key: 'nemesis', name: 'Part of Nemesis', symbol: '⚖️',
        longitude: (ascendantLng + (isDay ? (saturn?.longitude||0) - fortuneLot.longitude : fortuneLot.longitude - (saturn?.longitude||0)) + 720) % 360,
        ...formatDegree((ascendantLng + (isDay ? (saturn?.longitude||0) - fortuneLot.longitude : fortuneLot.longitude - (saturn?.longitude||0)) + 720) % 360)
      }
    ];

    // 5. FIXED STARS (Precession corrected)
    const precession = (jd - 2451545.0) / 36525 * (50.3 / 3600); 
    const yearsSince2000 = (jd - 2451545.0) / 365.25;
    const stars = STARS.map(name => {
      const lng = (STAR_DATA[name] + (yearsSince2000 * precession)) % 360;
      return { key: name.toLowerCase().replace(' ', '_'), name, symbol: '✦', longitude: lng, ...formatDegree(lng) };
    });

    const zodiacalReleasing = { 
      fortune: calculateZodiacalReleasing(lots[0].longitude, jd, 2), 
      spirit: calculateZodiacalReleasing(lots[1].longitude, jd, 2) 
    };

    // ASC/MC DECLINATION
    const eclNut = sweph.calc_ut(jd, sweph.constants.SE_ECL_NUT, 0);
    const eps = eclNut.data[0]; 
    const getDecl = (lng) => {
        const rad = Math.PI/180;
        return (Math.asin(Math.sin(lng*rad) * Math.sin(eps*rad))) / rad;
    };

    return {
      input: { 
        year, month, day, hour, minute, lat, lng,
        date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      },
      planets: planetResults,
      lots,
      stars,
      houses: { 
        cusps, 
        ascendant: { longitude: ascendantLng, ...formatDegree(ascendantLng), dwadasamsa: calculateDwadasamsa(ascendantLng), declination: getDecl(ascendantLng), declFormatted: formatCoord(getDecl(ascendantLng)) },
        midheaven: { longitude: mcLng, ...formatDegree(mcLng), dwadasamsa: calculateDwadasamsa(mcLng), declination: getDecl(mcLng), declFormatted: formatCoord(getDecl(mcLng)) }
      },
      aspects,
      patterns,
      dispositorsTraditional: calculateDispositors(planetResults, 'traditional'),
      dispositorsModern: calculateDispositors(planetResults, 'modern'),
      zodiacalReleasing,
      midpoints: calculateMidpoints(planetResults),
      acg: calculateACG(jd, planetResults.filter(p => !['fortune', 'spirit', 'eros', 'lilith', 'south_node', 'ap', 'earth'].includes(p.key))),
      sect: isDay ? 'Day' : 'Night',
      metadata: { 
        jd, 
        zodiacType, 
        ayanamsa, 
        calculatedAt: new Date().toISOString(),
        peakSigns: [
          Math.floor(lots[0].longitude / 30),
          (Math.floor(lots[0].longitude / 30) + 3) % 12,
          (Math.floor(lots[0].longitude / 30) + 6) % 12,
          (Math.floor(lots[0].longitude / 30) + 9) % 12
        ]
      }
    };
  } catch (error) { throw new Error(`Engine Fatal: ${error.message}`); }
}

export async function calculateTransits({ year, month, day, hour, minute, lat, lng }) {
  try {
    const tz = tzlookup(lat, lng);
    const dt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: tz });
    const utc = dt.toUTC();
    const jd = sweph.julday(utc.year, utc.month, utc.day, utc.hour + utc.minute / 60, sweph.constants.SE_GREG_CAL);

    const transitPlanets = PLANETS.map(p => {
      const res = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
      const resEqu = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_EQUATORIAL | sweph.constants.SEFLG_SWIEPH);
      
      const longitude = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
      const speed = res.speed !== undefined ? res.speed : (res.data ? res.data[3] : 0);
      const decl = resEqu.data ? resEqu.data[1] : 0;

      return { 
        ...p, 
        longitude, 
        latitude: res.data ? res.data[1] : 0,
        distance: parseFloat(toSafeFixed(res.data ? res.data[2] : 1.0, 6)),
        speed,
        declination: decl, 
        declFormatted: formatCoord(decl),
        ...formatDegree(longitude),
        dwadasamsa: calculateDwadasamsa(longitude)
      };
    });

    const nNode = transitPlanets.find(p => p.key === 'node');
    if (nNode) {
        transitPlanets.push({ 
            key: 'south_node', 
            name: 'South Node', 
            symbol: '☋', 
            longitude: (nNode.longitude + 180) % 360, 
            ...formatDegree((nNode.longitude + 180) % 360),
            dwadasamsa: calculateDwadasamsa((nNode.longitude + 180) % 360)
        });
    }

    return { 
      planets: transitPlanets, 
      midpoints: calculateMidpoints(transitPlanets),
      jd, 
      metadata: { calculatedAt: new Date().toISOString() } 
    };
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
      const sunBirthLng = sunBirthRes.longitude !== undefined ? sunBirthRes.longitude : (sunBirthRes.data ? sunBirthRes.data[0] : 0);
      const sunTargetLng = sunTargetRes.longitude !== undefined ? sunTargetRes.longitude : (sunTargetRes.data ? sunTargetRes.data[0] : 0);
      const arc = (sunTargetLng - sunBirthLng + 360) % 360;
      const results = PLANETS.map(p => {
        const res = sweph.calc_ut(birthJD, p.id, sweph.constants.SEFLG_SWIEPH);
        const natalLng = res.longitude !== undefined ? res.longitude : (res.data ? res.data[0] : 0);
        return { ...p, longitude: (natalLng + arc) % 360, ...formatDegree((natalLng + arc) % 360) };
      });
      return { planets: results, type: 'Solar Arc Directions', arc, years: diffYears };
    }
  } catch (error) { throw new Error(`Prognostic Error: ${error.message}`); }
}

const BASE_ORBS = {
  sun: 10, moon: 10,
  mercury: 8, venus: 8, mars: 8,
  jupiter: 6, saturn: 6,
  uranus: 5, neptune: 5, pluto: 5,
  node: 4, south_node: 4, chiron: 4, lilith: 4, ap: 4,
  fortune: 3, spirit: 3, eros: 3, nemesis: 3,
  cupido: 2, hades: 2, zeus: 2, kronos: 2, apollon: 2, admetos: 2, vulkanus: 2, poseidon: 2,
  ascendant: 5, midheaven: 5, vertex: 3
};

function calculateAspects(planets) {
  const aspects = [];
  const MAJOR_ASPECTS = [
    { name: 'Conjunction', symbol: '☌', angle: 0 },
    { name: 'Sextile', symbol: '⚹', angle: 60 },
    { name: 'Square', symbol: '□', angle: 90 },
    { name: 'Trine', symbol: '△', angle: 120 },
    { name: 'Opposition', symbol: '☍', angle: 180 }
  ];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      
      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;

      // Weighted Orb Calculation: (OrbA + OrbB) / 2
      const orb1 = BASE_ORBS[p1.key] || 5;
      const orb2 = BASE_ORBS[p2.key] || 5;
      const maxOrb = (orb1 + orb2) / 2;

      for (const asp of MAJOR_ASPECTS) {
        const actualOrb = Math.abs(diff - asp.angle);
        if (actualOrb <= maxOrb) {
          // Weighting: tighter orbs are more important
          const weight = actualOrb < 1.0 ? 1.0 : parseFloat((1 - (actualOrb / maxOrb)).toFixed(2));
          
          aspects.push({
            planet1: { key: p1.key, symbol: p1.symbol, longitude: p1.longitude },
            planet2: { key: p2.key, symbol: p2.symbol, longitude: p2.longitude },
            type: asp.name, 
            symbol: asp.symbol, 
            orb: parseFloat(actualOrb.toFixed(2)),
            maxOrb: parseFloat(maxOrb.toFixed(2)),
            weight,
            isTight: actualOrb < 1.0
          });
        }
      }
    }
  }
  return aspects;
}

/**
 * COMPOSITE CHART ENGINE (Midpoint Method)
 * Creates a synthetic chart from two natal charts.
 */
export async function calculateCompositeChart(chart1, chart2) {
  const compositePlanets = chart1.planets.map(p1 => {
    const p2 = chart2.planets.find(p => p.key === p1.key);
    if (!p2) return null;

    let l1 = p1.longitude;
    let l2 = p2.longitude;

    // Short Arc Midpoint Rule
    let diff = l2 - l1;
    if (Math.abs(Math.abs(diff) - 180) < 0.0001) {
      // Exact opposition: reference Composite Sun for consistency
      // This is a refined rule from the Knowledge Base
      const sun1 = chart1.planets.find(p => p.key === 'sun').longitude;
      const sun2 = chart2.planets.find(p => p.key === 'sun').longitude;
      let sDiff = sun2 - sun1;
      if (sDiff > 180) sDiff -= 360;
      if (sDiff < -180) sDiff += 360;
      const compSun = (sun1 + sDiff / 2 + 360) % 360;
      
      const option1 = (l1 + 90 + 360) % 360;
      const option2 = (l1 - 90 + 360) % 360;
      
      let d1 = Math.abs(option1 - compSun);
      if (d1 > 180) d1 = 360 - d1;
      let d2 = Math.abs(option2 - compSun);
      if (d2 > 180) d2 = 360 - d2;
      
      const midLng = d1 < d2 ? option1 : option2;
      return { ...p1, longitude: midLng, ...formatDegree(midLng), dwadasamsa: calculateDwadasamsa(midLng), house: 0 };
    }

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const midLng = (l1 + diff / 2 + 360) % 360;

    return {
      ...p1,
      longitude: midLng,
      ...formatDegree(midLng),
      dwadasamsa: calculateDwadasamsa(midLng),
      house: 0 // Will be recalculated
    };
  }).filter(Boolean);

  // Composite Ascendant/MC (Midpoint method)
  const asc1 = chart1.houses.ascendant.longitude;
  const asc2 = chart2.houses.ascendant.longitude;
  let ascDiff = asc2 - asc1;
  if (ascDiff > 180) ascDiff -= 360;
  if (ascDiff < -180) ascDiff += 360;
  const compositeAsc = (asc1 + ascDiff / 2 + 360) % 360;

  const mc1 = chart1.houses.midheaven.longitude;
  const mc2 = chart2.houses.midheaven.longitude;
  let mcDiff = mc2 - mc1;
  if (mcDiff > 180) mcDiff -= 360;
  if (mcDiff < -180) mcDiff += 360;
  const compositeMC = (mc1 + mcDiff / 2 + 360) % 360;

  // Composite Houses (Derived from Asc/MC Midpoint or averaged cusps)
  // Professional standard: use Asc/MC midpoints and calculate intermediate cusps
  const cusps = chart1.houses.cusps.map((c1, i) => {
    const c2 = chart2.houses.cusps[i];
    let cDiff = c2.longitude - c1.longitude;
    if (cDiff > 180) cDiff -= 360;
    if (cDiff < -180) cDiff += 360;
    const midCusp = (c1.longitude + cDiff / 2 + 360) % 360;
    return { house: i + 1, longitude: midCusp, ...formatDegree(midCusp) };
  });

  const rawCusps = cusps.map(c => c.longitude);
  compositePlanets.forEach(p => {
    for (let i = 0; i < 12; i++) {
      let start = rawCusps[i], end = rawCusps[(i + 1) % 12];
      if (end < start) end += 360;
      let testLng = p.longitude;
      if (testLng < start) testLng += 360;
      if (testLng >= start && testLng < end) { p.house = i + 1; break; }
    }
  });

  const aspects = calculateAspects(compositePlanets);
  return {
    type: 'Composite',
    planets: compositePlanets,
    houses: {
      cusps,
      ascendant: { longitude: compositeAsc, ...formatDegree(compositeAsc) },
      midheaven: { longitude: compositeMC, ...formatDegree(compositeMC) }
    },
    aspects,
    patterns: calculateAspectPatterns(compositePlanets, aspects),
    metadata: { calculatedAt: new Date().toISOString(), method: 'Midpoint (Short Arc)' }
  };
}

/**
 * DAVISON RELATIONSHIP ENGINE (Space-Time Midpoint)
 * Calculates a real chart for the mean date and location.
 */
export async function calculateDavisonChart(chart1, chart2) {
  // 1. Mean Julian Day
  const jd1 = chart1.metadata.jd;
  const jd2 = chart2.metadata.jd;
  const meanJD = (jd1 + jd2) / 2;

  // 2. Geographic Midpoint (Cartesian 3D Spheroid)
  const deg2rad = Math.PI / 180;
  const rad2deg = 180 / Math.PI;

  const lat1 = parseFloat(chart1.input.lat) * deg2rad;
  const lng1 = parseFloat(chart1.input.lng) * deg2rad;
  const lat2 = parseFloat(chart2.input.lat) * deg2rad;
  const lng2 = parseFloat(chart2.input.lng) * deg2rad;

  const x1 = Math.cos(lat1) * Math.cos(lng1);
  const y1 = Math.cos(lat1) * Math.sin(lng1);
  const z1 = Math.sin(lat1);

  const x2 = Math.cos(lat2) * Math.cos(lng2);
  const y2 = Math.cos(lat2) * Math.sin(lng2);
  const z2 = Math.sin(lat2);

  const xAvg = (x1 + x2) / 2;
  const yAvg = (y1 + y2) / 2;
  const zAvg = (z1 + z2) / 2;

  const meanLng = Math.atan2(yAvg, xAvg) * rad2deg;
  const hyp = Math.sqrt(xAvg * xAvg + yAvg * yAvg);
  const meanLat = Math.atan2(zAvg, hyp) * rad2deg;

  // 3. Generate Chart for Midpoint
  // We reuse calculateChart with a specific JD override
  return calculateChart({
    jd: meanJD,
    lat: meanLat,
    lng: meanLng,
    zodiacType: chart1.metadata.zodiacType,
    ayanamsa: chart1.metadata.ayanamsa
  });
}

function calculateAspectPatterns(planets, aspects) {
  const patterns = [];
  const findAspect = (p1k, p2k, type) => 
    aspects.find(a => 
      ((a.planet1.key === p1k && a.planet2.key === p2k) || (a.planet1.key === p2k && a.planet2.key === p1k)) &&
      (!type || a.type === type)
    );

  const keys = planets.map(p => p.key);

  // 1. GRAND TRINE
  const grandTrines = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        if (findAspect(keys[i], keys[j], 'Trine') && 
            findAspect(keys[j], keys[k], 'Trine') && 
            findAspect(keys[k], keys[i], 'Trine')) {
          const pt = { type: 'Grand Trine', planets: [keys[i], keys[j], keys[k]] };
          patterns.push(pt);
          grandTrines.push(pt);
        }
      }
    }
  }

  // 2. KITE
  grandTrines.forEach(trine => {
    const [p1, p2, p3] = trine.planets;
    keys.forEach(p4 => {
      if (trine.planets.includes(p4)) return;
      [{h:p4, t:p1, w:[p2,p3]}, {h:p4, t:p2, w:[p1,p3]}, {h:p4, t:p3, w:[p1,p2]}].forEach(c => {
        if (findAspect(c.h, c.t, 'Opposition') && findAspect(c.h, c.w[0], 'Sextile') && findAspect(c.h, c.w[1], 'Sextile')) {
          patterns.push({ type: 'Kite', planets: [c.h, c.t, c.w[0], c.w[1]], head: c.h, tail: c.t });
        }
      });
    });
  });

  // 3. YOD
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = 0; k < keys.length; k++) {
        if (k === i || k === j) continue;
        if (findAspect(keys[i], keys[j], 'Sextile') && 
            findAspect(keys[i], keys[k], 'Quincunx') && 
            findAspect(keys[j], keys[k], 'Quincunx')) {
          patterns.push({ type: 'Yod', planets: [keys[i], keys[j], keys[k]], apex: keys[k] });
        }
      }
    }
  }

  // 4. T-SQUARE
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = 0; k < keys.length; k++) {
        if (k === i || k === j) continue;
        if (findAspect(keys[i], keys[j], 'Opposition') && 
            findAspect(keys[i], keys[k], 'Square') && 
            findAspect(keys[j], keys[k], 'Square')) {
          patterns.push({ type: 'T-Square', planets: [keys[i], keys[j], keys[k]], apex: keys[k] });
        }
      }
    }
  }

  // 5. GRAND CROSS
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        for (let l = k + 1; l < keys.length; l++) {
          const combo = [keys[i], keys[j], keys[k], keys[l]];
          let oppositions = 0, squares = 0;
          for (let m = 0; m < 4; m++) {
            for (let n = m + 1; n < 4; n++) {
              if (findAspect(combo[m], combo[n], 'Opposition')) oppositions++;
              if (findAspect(combo[m], combo[n], 'Square')) squares++;
            }
          }
          if (oppositions === 2 && squares === 4) {
            patterns.push({ type: 'Grand Cross', planets: combo });
          }
        }
      }
    }
  }

  // 6. MYSTIC RECTANGLE
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        for (let l = k + 1; l < keys.length; l++) {
          const c = [keys[i], keys[j], keys[k], keys[l]];
          let opps = 0, trines = 0, sextiles = 0;
          for (let m = 0; m < 4; m++) {
            for (let n = m + 1; n < 4; n++) {
              if (findAspect(c[m], c[n], 'Opposition')) opps++;
              if (findAspect(c[m], c[n], 'Trine')) trines++;
              if (findAspect(c[m], c[n], 'Sextile')) sextiles++;
            }
          }
          if (opps === 2 && trines === 2 && sextiles === 2) {
            patterns.push({ type: 'Mystic Rectangle', planets: c });
          }
        }
      }
    }
  }

  // 7. STELLIUM
  const signGroups = {};
  planets.forEach(p => {
    if (!signGroups[p.sign]) signGroups[p.sign] = [];
    signGroups[p.sign].push(p.key);
  });
  Object.keys(signGroups).forEach(sign => {
    if (signGroups[sign].length >= 3) {
      patterns.push({ type: 'Stellium', planets: signGroups[sign], sign });
    }
  });

  return patterns;
}

/**
 * ZODIAC INTERSECTION ENGINE (Astra Cross-Point)
 * Catches "intersections" between two charts (Synastry Midpoints, 90-degree dial).
 * Precision: 1.0 degree orb (Professional Hamburg School standard).
 */
export function calculateZodiacIntersections(chartA, chartB) {
  const intersections = [];
  const orbs = 1.0; 
  
  const midpointsA = chartA.midpoints || [];
  const midpointsB = chartB.midpoints || [];
  const planetsA = chartA.planets || [];
  const planetsB = chartB.planets || [];
  const ariesPoints = [0, 90, 180, 270];

  // 1. Midpoint A -> Planet B
  midpointsA.forEach(mpA => {
    planetsB.forEach(pB => {
      let diff = Math.abs((mpA.longitude % 90) - (pB.longitude % 90));
      if (diff > 45) diff = 90 - diff;
      
      if (diff <= orbs) {
        intersections.push({
          type: 'Midpoint-Planet',
          source: `${mpA.planet1}/${mpA.planet2} [A] ⤄ ${pB.key} [B]`,
          degree: mpA.longitude,
          orb: parseFloat(diff.toFixed(2)),
          sign: mpA.sign,
          nature: 'Impact'
        });
      }
    });
  });

  // 2. Midpoint B -> Planet A
  midpointsB.forEach(mpB => {
    planetsA.forEach(pA => {
      let diff = Math.abs((mpB.longitude % 90) - (pA.longitude % 90));
      if (diff > 45) diff = 90 - diff;
      
      if (diff <= orbs) {
        intersections.push({
          type: 'Midpoint-Planet',
          source: `${mpB.planet1}/${mpB.planet2} [B] ⤄ ${pA.key} [A]`,
          degree: mpB.longitude,
          orb: parseFloat(diff.toFixed(2)),
          sign: mpB.sign,
          nature: 'Impact'
        });
      }
    });
  });

  // 3. Midpoint A -> Midpoint B (Resonance)
  midpointsA.forEach(mpA => {
    midpointsB.forEach(mpB => {
      let diff = Math.abs((mpA.longitude % 90) - (mpB.longitude % 90));
      if (diff > 45) diff = 90 - diff;
      
      if (diff <= orbs) {
        intersections.push({
          type: 'Midpoint-Midpoint',
          source: `${mpA.planet1}/${mpA.planet2} [A] ⚡ ${mpB.planet1}/${mpB.planet2} [B]`,
          degree: mpA.longitude,
          orb: parseFloat(diff.toFixed(2)),
          sign: mpA.sign,
          nature: 'Resonance'
        });
      }
    });
  });

  // 4. Aries Point Crossings (Publicity)
  [...planetsA, ...planetsB].forEach(p => {
    ariesPoints.forEach(ap => {
      let diff = Math.abs((p.longitude % 90) - (ap % 90));
      if (diff > 45) diff = 90 - diff;
      if (diff <= 1.0) {
        intersections.push({
          type: 'Publicity',
          source: `${p.key} hits Aries Point (AP)`,
          degree: p.longitude,
          orb: parseFloat(diff.toFixed(2)),
          sign: p.sign,
          nature: 'Public recognition'
        });
      }
    });
  });

  return intersections.sort((a, b) => a.orb - b.orb);
}

/**
 * ASTROCARTOGRAPHY ENGINE (ACG)
 * Calculates MC, IC, Rise, and Set lines for all planets.
 */
function calculateACG(jd, planets) {
  const gmst = sweph.sidtime(jd) * 15; // Convert hours to degrees
  const results = {};

  planets.forEach(p => {
    if (p.id === undefined || p.id < 0) return;
    const resEqu = sweph.calc_ut(jd, p.id, sweph.constants.SEFLG_EQUATORIAL | sweph.constants.SEFLG_SWIEPH);
    const ra = resEqu.data ? resEqu.data[0] : 0;
    const decl = resEqu.data ? resEqu.data[1] : 0;

    let mcLon = (ra - gmst);
    while (mcLon > 180) mcLon -= 360;
    while (mcLon < -180) mcLon += 360;

    let icLon = (ra + 180 - gmst);
    while (icLon > 180) icLon -= 360;
    while (icLon < -180) icLon += 360;

    const riseCurve = [];
    const setCurve = [];

    const rad = Math.PI / 180;
    for (let lat = -66; lat <= 66; lat += 2) {
      const phi = lat * rad;
      const delta = decl * rad;
      
      const cosH = -Math.tan(phi) * Math.tan(delta);
      
      if (Math.abs(cosH) <= 1) {
        const h = Math.acos(cosH) / rad;
        
        let riseLon = (ra - h - gmst);
        while (riseLon > 180) riseLon -= 360;
        while (riseLon < -180) riseLon += 360;
        
        let setLon = (ra + h - gmst);
        while (setLon > 180) setLon -= 360;
        while (setLon < -180) setLon += 360;
        
        riseCurve.push({ lat, lon: riseLon });
        setCurve.push({ lat, lon: setLon });
      }
    }

    results[p.key] = {
      mc: mcLon,
      ic: icLon,
      rise: riseCurve,
      set: setCurve,
      color: PLANET_COLORS[p.key] || '#8C8883',
      symbol: p.symbol,
      name: p.name
    };
  });

  return results;
}
