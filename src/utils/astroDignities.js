
const RULERS = {
  sun: 'Leo',
  moon: 'Cancer',
  mercury: ['Gemini', 'Virgo'],
  venus: ['Taurus', 'Libra'],
  mars: ['Aries', 'Scorpio'],
  jupiter: ['Sagittarius', 'Pisces'],
  saturn: ['Capricorn', 'Aquarius'],
  uranus: 'Aquarius',
  neptune: 'Pisces',
  pluto: 'Scorpio'
};

const EXALTATIONS = {
  sun: 'Aries',
  moon: 'Taurus',
  mercury: 'Virgo',
  venus: 'Pisces',
  mars: 'Capricorn',
  jupiter: 'Cancer',
  saturn: 'Libra',
  node: 'Gemini'
};

const OPPOSITE_SIGNS = {
  'Aries': 'Libra',
  'Taurus': 'Scorpio',
  'Gemini': 'Sagittarius',
  'Cancer': 'Capricorn',
  'Leo': 'Aquarius',
  'Virgo': 'Pisces',
  'Libra': 'Aries',
  'Scorpio': 'Taurus',
  'Sagittarius': 'Gemini',
  'Capricorn': 'Cancer',
  'Aquarius': 'Leo',
  'Pisces': 'Virgo'
};

export function getDignity(planetKey, sign) {
  // Check Domicile
  const rulers = RULERS[planetKey];
  if (Array.isArray(rulers)) {
    if (rulers.includes(sign)) return { type: 'Domicile', label: 'Domicyl', score: 5 };
  } else if (rulers === sign) {
    return { type: 'Domicile', label: 'Domicyl', score: 5 };
  }

  // Check Detriment
  if (Array.isArray(rulers)) {
    if (rulers.some(r => OPPOSITE_SIGNS[r] === sign)) return { type: 'Detriment', label: 'Wygnanie', score: -5 };
  } else if (rulers && OPPOSITE_SIGNS[rulers] === sign) {
    return { type: 'Detriment', label: 'Wygnanie', score: -5 };
  }

  // Check Exaltation
  if (EXALTATIONS[planetKey] === sign) return { type: 'Exaltation', label: 'Wywyższenie', score: 4 };

  // Check Fall
  const exaltation = EXALTATIONS[planetKey];
  if (exaltation && OPPOSITE_SIGNS[exaltation] === sign) return { type: 'Fall', label: 'Upadek', score: -4 };

  return { type: 'Peregrine', label: 'Peregrym', score: 0 };
}
