/**
 * Astra Placement Engine
 * Pure mathematical engine for precise planetary positioning on a circular chart.
 * Handles collision detection, radial stacking, and coordinate transformation.
 */

export const calculatePlanetaryPositions = (planets, config) => {
  const { cx, cy, baseR, paddingR = 22, minDistance = 5 } = config;

  if (!planets || !planets.length) return [];

  // Sort by longitude to process them in order
  const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);
  
  const placed = [];

  sorted.forEach((planet) => {
    let currentR = baseR;
    let collision = true;
    let attempts = 0;

    // Check for collisions with already placed planets
    while (collision && attempts < 10) {
      collision = placed.some(other => {
        // Calculate angular distance
        let diff = Math.abs(planet.longitude - other.longitude);
        if (diff > 180) diff = 360 - diff;
        
        // If they are angularly close AND at the same radius, we have a collision
        const isAngularlyClose = diff < minDistance;
        const isSameRadius = Math.abs(currentR - other.radius) < paddingR / 2;
        
        return isAngularlyClose && isSameRadius;
      });

      if (collision) {
        currentR -= paddingR; // Push inward (or outward)
        attempts++;
      }
    }

    // Calculate final X, Y coordinates
    const rad = ((planet.longitude - 180) * Math.PI) / 180;
    const x = cx + currentR * Math.cos(rad);
    const y = cy + currentR * Math.sin(rad);

    placed.push({
      ...planet,
      x,
      y,
      radius: currentR,
      // Angle for label orientation (counter-rotation)
      labelRotation: 0 // Will be handled by the component
    });
  });

  return placed;
};

export const polarToXY = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};
