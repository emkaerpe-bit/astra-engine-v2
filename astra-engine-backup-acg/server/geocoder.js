/**
 * Geocoder Module — Nominatim (OpenStreetMap)
 * Converts birth city string → { lat, lng, displayName }
 * Free, no API key. Rate limit: 1 req/sec.
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export async function geocode(query) {
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    throw new Error('Invalid location query');
  }

  const params = new URLSearchParams({
    q: query.trim(),
    format: 'jsonv2',
    limit: '1',
    addressdetails: '1',
  });

  const res = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: {
      'User-Agent': 'AstraEngine/1.0 (astrological-chart-app)',
      'Accept-Language': 'en',
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.status}`);
  }

  const data = await res.json();

  if (!data.length) {
    throw new Error(`Location not found: "${query}"`);
  }

  const place = data[0];
  return {
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
    displayName: place.display_name,
  };
}
