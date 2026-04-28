/**
 * ASTRA ENGINE - ASTROCARTOGRAPHY MODULE (ACG)
 * Core logic for calculating planetary lines on Earth.
 */

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const OBLIQUITY = 23.43929; // Earth's axial tilt in degrees

/**
 * Converts Ecliptic Longitude to Equatorial Coordinates (RA/Dec).
 * @param {number} lon - Ecliptic Longitude in degrees.
 * @param {number} lat - Ecliptic Latitude in degrees (usually near 0).
 */
export const eclipticToEquatorial = (lon, lat = 0) => {
  const l = lon * DEG2RAD;
  const b = lat * DEG2RAD;
  const e = OBLIQUITY * DEG2RAD;

  const ra = Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
  const dec = Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));

  let raDeg = ra * RAD2DEG;
  if (raDeg < 0) raDeg += 360;

  return { ra: raDeg, dec: dec * RAD2DEG };
};

/**
 * Calculates Greenwich Mean Sidereal Time (GMST) for a given date/time.
 * @param {Date} date - JS Date object.
 */
export const calculateGMST = (date) => {
  // Simplified GMST formula
  const julianDate = (date / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5;
  const d = julianDate - 2451545.0;
  let gmst = 18.697374558 + 24.06570982441908 * d;
  
  gmst = (gmst % 24) * 15; // Convert hours to degrees
  if (gmst < 0) gmst += 360;
  return gmst;
};

/**
 * Calculates the longitude for MC and IC lines.
 * @param {number} ra - Right Ascension of the planet in degrees.
 * @param {number} lst - Local Sidereal Time at 0° longitude in degrees.
 */
export const calculateMeridianLines = (ra, lst) => {
  // MC: Planet is exactly on the meridian (Zenith)
  // Longitude = RA - LST
  let mcLon = ra - lst;
  while (mcLon > 180) mcLon -= 360;
  while (mcLon < -180) mcLon += 360;

  // IC: Planet is exactly on the nadir
  let icLon = mcLon + 180;
  while (icLon > 180) icLon -= 360;
  while (icLon < -180) icLon += 360;

  return { mc: mcLon, ic: icLon };
};

/**
 * Calculates the coordinates for Ascendant and Descendant curves.
 * @param {number} ra - Right Ascension of the planet in degrees.
 * @param {number} dec - Declination of the planet in degrees.
 * @param {number} lst - Local Sidereal Time at 0° longitude in degrees.
 * @param {boolean} isAsc - Calculate Ascendant (true) or Descendant (false).
 */
export const calculateHorizonCurve = (ra, dec, lst, isAsc = true) => {
  const points = [];
  const raRad = ra * DEG2RAD;
  const decRad = dec * DEG2RAD;
  const lstRad = lst * DEG2RAD;

  // We iterate through latitudes to find corresponding longitudes
  for (let lat = -85; lat <= 85; lat += 2) {
    const latRad = lat * DEG2RAD;
    
    // Formula for hour angle (h) when planet is on horizon:
    // cos(h) = -tan(lat) * tan(dec)
    const cosH = -Math.tan(latRad) * Math.tan(decRad);

    if (Math.abs(cosH) <= 1) {
      const h = Math.acos(cosH) * RAD2DEG;
      
      // Longitude calculation
      // For Ascendant: Lon = RA - h - LST
      // For Descendant: Lon = RA + h - LST
      let lon = isAsc ? (ra - h - lst) : (ra + h - lst);
      
      while (lon > 180) lon -= 360;
      while (lon < -180) lon += 360;

      points.push({ lat, lon });
    }
  }
  return points;
};

/**
 * Main ACG Synthesis
 * @param {Object} planets - Chart data planets (usually ecliptic longitude)
 * @param {Date} birthDate - Date of birth
 */
export const generateACGData = (planets, birthDate) => {
  const acg = {};
  const gmst = calculateGMST(birthDate);
  
  // Normalize planets to an array for processing
  const planetsArray = Array.isArray(planets) 
    ? planets 
    : Object.keys(planets).map(key => ({ ...planets[key], key }));

  planetsArray.forEach(planet => {
    // Check for required data
    const longitude = typeof planet.longitude !== 'undefined' ? planet.longitude : planet.long;
    if (typeof longitude === 'undefined') return;

    const key = planet.key || planet.name || 'unknown';

    // Convert to RA/Dec if not provided
    const { ra, dec } = (planet.ra && planet.dec) 
      ? planet 
      : eclipticToEquatorial(longitude);
    
    const { mc, ic } = calculateMeridianLines(ra, gmst);
    const rise = calculateHorizonCurve(ra, dec, gmst, true);
    const set = calculateHorizonCurve(ra, dec, gmst, false);

    acg[key] = {
      name: planet.name || key,
      color: planet.color || '#D4AF37',
      mc,
      ic,
      rise,
      set
    };
  });

  return acg;
};
