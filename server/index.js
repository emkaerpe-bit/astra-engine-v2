/**
 * Ad Astra — Express API Server
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { geocode } from './geocoder.js';
import { calculateChart, calculateTransits, calculatePrognostics } from './astroEngine.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// ─── Static Files ────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../dist')));

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    engine: 'Ad Astra v3.0', 
    timestamp: new Date().toISOString() 
  });
});

// ─── Main Chart Calculation ──────────────────────────────
app.post('/api/chart', async (req, res) => {
  try {
    const { date, time, location, houseSystem } = req.body;
    if (!date || !location) return res.status(400).json({ error: 'Missing fields' });

    const [year, month, day] = date.split('-').map(Number);
    let hour = 12, minute = 0, timeKnown = true;
    if (time && time.includes(':')) {
      const parts = time.split(':').map(Number);
      hour = parts[0]; minute = parts[1] || 0;
    } else {
      timeKnown = false;
    }

    let geo;
    try {
      geo = await geocode(location);
    } catch (e) {
      console.warn(`[ASTRA] Geocode failed for ${location} (likely rate limit), using defaults.`);
      geo = { lat: 52.2297, lng: 21.0122, displayName: 'Warsaw (Default)' };
    }

    const chart = await calculateChart({
      year, month, day, hour, minute,
      lat: geo.lat, lng: geo.lng, 
      houseSystem: houseSystem || 'P',
      timeKnown,
    });

    chart.input.location = { query: location, resolved: geo.displayName, lat: geo.lat, lng: geo.lng };
    res.json(chart);
  } catch (err) {
    console.error('[ASTRA] Chart error:', err);
    res.status(500).json({ error: 'Calculation failed', detail: err.message });
  }
});

// ─── Transit Calculation ─────────────────────────────────
app.post('/api/transits', async (req, res) => {
  try {
    const { date, time, location } = req.body;
    console.log(`[ASTRA] Transit Request: ${date} ${time} @ ${location}`);
    
    if (!date || !location) {
      return res.status(400).json({ error: 'Missing date or location' });
    }

    const dateParts = date.split('-');
    if (dateParts.length !== 3) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    const [year, month, day] = dateParts.map(Number);
    
    let hour = 12, minute = 0;
    if (time && time.includes(':')) {
      const parts = time.split(':').map(Number);
      hour = parts[0]; minute = parts[1] || 0;
    }

    let geo;
    if (req.body.lat && req.body.lng) {
      geo = { lat: parseFloat(req.body.lat), lng: parseFloat(req.body.lng) };
    } else {
      try {
        geo = await geocode(location);
      } catch (e) {
        console.warn(`[ASTRA] Geocode failed for ${location}, using defaults.`);
        geo = { lat: 52.2297, lng: 21.0122, displayName: 'Warsaw (Default)' };
      }
    }

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

// ─── Prognostics Calculation ──────────────────────────────
app.post('/api/prognostics', async (req, res) => {
  try {
    const { birthDate, targetDate, type, lat, lng } = req.body;
    if (!birthDate || !targetDate) return res.status(400).json({ error: 'Missing dates' });

    const results = await calculatePrognostics({ birthDate, targetDate, type, lat, lng });
    res.json(results);
  } catch (err) {
    console.error('[ASTRA] Prognostic error:', err);
    res.status(500).json({ error: 'Prognostic calculation failed', detail: err.message });
  }
});

// ─── Catch-all ───────────────────────────────────────────
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ✦ Ad Astra API — http://localhost:${PORT}`);
  console.log(`  ✦ Health: /api/health\n`);
});
