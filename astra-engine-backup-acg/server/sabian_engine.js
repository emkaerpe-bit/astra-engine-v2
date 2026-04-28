/**
 * Sabian Symbols Engine
 * Reguła zaokrąglania: ZAWSZE ceiling (zaokrąglaj w górę)
 * 0°00' = 30° poprzedniego znaku, 0°01' = 1° bieżącego znaku
 */

import sweph from 'sweph';

const PLANET_IDS = {
  Sun: sweph.constants.SE_SUN,
  Moon: sweph.constants.SE_MOON,
  Mercury: sweph.constants.SE_MERCURY,
  Venus: sweph.constants.SE_VENUS,
  Mars: sweph.constants.SE_MARS,
  Jupiter: sweph.constants.SE_JUPITER,
  Saturn: sweph.constants.SE_SATURN,
  Uranus: sweph.constants.SE_URANUS,
  Neptune: sweph.constants.SE_NEPTUNE,
  Pluto: sweph.constants.SE_PLUTO,
  NorthNode: sweph.constants.SE_TRUENODE,
};

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function dateToJD(year, month, day, hour = 12, minute = 0) {
  return sweph.julday(year, month, day, hour + minute / 60, 1);
}

function sabianCeiling(longitude) {
  const normalized = ((longitude % 360) + 360) % 360;
  const degreeInSign = normalized % 30;
  const rounded = Math.ceil(degreeInSign);
  if (rounded === 1 && degreeInSign < 0.0001) return 30;
  return rounded === 0 ? 30 : rounded;
}

function getSabianForPlanet(jd, planetName) {
  const planetId = PLANET_IDS[planetName];
  if (!planetId) return { error: `Unknown planet: ${planetName}` };
  
  try {
    const flags = sweph.constants.SEFLG_SWIEPH;
    const result = sweph.calc_ut(jd, planetId, flags);
    if (!result || result[0] === undefined) return { error: `Failed to calculate ${planetName}` };
    
    const longitude = result[0];
    const degree = sabianCeiling(longitude);
    const signIndex = Math.floor(longitude / 30) % 12;
    const sign = SIGNS[signIndex];
    const isCritical = degree === 15 || degree === 29;
    
    return {
      planet: planetName,
      longitude: longitude.toFixed(4),
      sign,
      degree,
      signDegree: `${degree}° ${sign}`,
      isCritical,
      sabianIndex: Math.floor(longitude) + 1,
    };
  } catch (e) {
    return { error: e.message };
  }
}

export async function calculateSabians(year, month, day, hour = 12, minute = 0) {
  const jd = dateToJD(year, month, day, hour, minute);
  const results = {};
  
  for (const planetName of Object.keys(PLANET_IDS)) {
    const sabian = getSabianForPlanet(jd, planetName);
    if (!sabian.error) results[planetName] = sabian;
  }
  
  return results;
}

export default { calculateSabians };