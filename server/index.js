/**
 * Astra Engine — Express API Server
 * Endpoints:
 *   POST /api/chart   — Full natal chart calculation
 *   GET  /api/health  — Health check
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { geocode } from './geocoder.js';
import { calculateChart, calculateTransits } from './astroEngine.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Static Files (Deployment) ───────────────────────────
// Serve the Vite build output (dist folder)
app.use(express.static(path.join(__dirname, '../dist')));

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'Astra Engine v2.7', timestamp: new Date().toISOString() });
});

// ─── Main Chart Calculation ──────────────────────────────
app.post('/api/chart', async (req, res) => {
  try {
    const { date, time, location } = req.body;

    // ── Validate inputs ──
    if (!date || !location) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: { date: 'YYYY-MM-DD', location: 'City, Country', time: 'HH:MM (optional)' },
      });
    }

    // ── Parse date ──
    const [year, month, day] = date.split('-').map(Number);
    if (!year || !month || !day || year < 1900 || year > 2100) {
      return res.status(400).json({ error: 'Invalid date. Use format YYYY-MM-DD, range 1900–2100.' });
    }

    // ── Parse time (fallback to 12:00 if unknown) ──
    let hour = 12, minute = 0, timeKnown = true;
    if (time && time.includes(':')) {
      const parts = time.split(':').map(Number);
      hour = parts[0];
      minute = parts[1] || 0;
    } else {
      timeKnown = false;
    }

    // ── Geocode location ──
    let geo;
    try {
      geo = await geocode(location);
    } catch (geoErr) {
      return res.status(422).json({
        error: 'Location not found',
        detail: geoErr.message,
        suggestion: 'Try a more specific query, e.g. "Warsaw, Poland" or "New York, USA".',
      });
    }

    // ── Calculate chart ──
    const chart = await calculateChart({
      year, month, day,
      hour, minute,
      lat: geo.lat,
      lng: geo.lng,
      timeKnown,
    });

    // ── Add location metadata ──
    chart.input.location = {
      query: location,
      resolved: geo.displayName,
      lat: geo.lat,
      lng: geo.lng,
    };

    if (!timeKnown) {
      chart.warnings = [
        'Birth time unknown — defaulting to 12:00 local. Ascendant and house placements may be inaccurate.',
      ];
    }

    res.json(chart);
  } catch (err) {
    console.error('[ASTRA] Chart calculation error:', err);
    res.status(500).json({ error: 'Internal calculation error', detail: err.message });
  }
});

// ─── Transit Calculation ─────────────────────────────────
app.post('/api/transits', async (req, res) => {
  try {
    const { date, time, location } = req.body;

    if (!date || !location) {
      return res.status(400).json({ error: 'Missing date or location' });
    }

    const [year, month, day] = date.split('-').map(Number);
    let hour = 12, minute = 0;
    if (time && time.includes(':')) {
      const parts = time.split(':').map(Number);
      hour = parts[0];
      minute = parts[1] || 0;
    }

    const geo = await geocode(location);
    const transits = await calculateTransits({
      year, month, day, hour, minute,
      lat: geo.lat, lng: geo.lng
    });

    res.json(transits);
  } catch (err) {
    console.error('[ASTRA] Transit calculation error:', err);
    res.status(500).json({ error: 'Transit calculation failed', detail: err.message });
  }
});

// ─── Catch-all for Frontend Routing ──────────────────────
// Important: This MUST be after API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// ─── Start Server ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦ Astra Engine API — http://localhost:${PORT}`);
  console.log(`  ✦ POST /api/chart`);
  console.log(`  ✦ GET  /api/health\n`);
});
