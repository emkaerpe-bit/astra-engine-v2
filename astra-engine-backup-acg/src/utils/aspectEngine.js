/**
 * Ad Astra — Professional Aspect Engine v2.0
 * Correct Applying vs Separating Logic using tiny step projection.
 */

export const ASPECT_DEFS = [
  { name: 'Koniunkcja', symbol: '☌', angle: 0, orb: 8, color: 'text-orange-500' },
  { name: 'Sekstyl', symbol: '⚹', angle: 60, orb: 6, color: 'text-blue-600' },
  { name: 'Kwadratura', symbol: '□', angle: 90, orb: 7, color: 'text-red-600' },
  { name: 'Trygon', symbol: '△', angle: 120, orb: 8, color: 'text-green-600' },
  { name: 'Opozycja', symbol: '☍', angle: 180, orb: 8, color: 'text-purple-600' },
  { name: 'Kwinkunks', symbol: 'ℼ', angle: 150, orb: 2, color: 'text-gray-500' },
  { name: 'Półkwadratura', symbol: '∠', angle: 45, orb: 2, color: 'text-gray-400' },
];

export function getShortestDiff(l1, l2) {
  let diff = Math.abs(l1 - l2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

/**
 * Calculates if an aspect exists and if it is applying or separating.
 * Uses a small time-step projection for absolute accuracy across all aspect types.
 */
export function calculateAspect(p1, p2) {
  if (!p1 || !p2 || p1.longitude === undefined || p2.longitude === undefined) return null;

  const diff = getShortestDiff(p1.longitude, p2.longitude);

  for (const asp of ASPECT_DEFS) {
    const orb = Math.abs(diff - asp.angle);
    if (orb <= asp.orb) {
      // Projection step: epsilon should be large enough to overcome float precision 
      // but small enough to stay within the orb.
      const EPSILON = 0.001; 
      
      const l1_next = (p1.longitude + (p1.speed || 0) * EPSILON + 360) % 360;
      const l2_next = (p2.longitude + (p2.speed || 0) * EPSILON + 360) % 360;
      const diff_next = getShortestDiff(l1_next, l2_next);
      
      const orb_next = Math.abs(diff_next - asp.angle);
      
      // If the next orb is smaller, the aspect is forming (Applying)
      const isApplying = orb_next < orb;

      return {
        ...asp,
        orb: parseFloat(orb.toFixed(2)),
        isApplying
      };
    }
  }
  return null;
}
