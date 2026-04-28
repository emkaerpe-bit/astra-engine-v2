import express from 'express';
import cors from 'cors';
import path from 'path';
import { 
  calculateChart, 
  calculateTransits, 
  calculatePrognostics,
  calculateCompositeChart, 
  calculateDavisonChart,
  calculateZodiacIntersections
} from './astroEngine.js';
import { interpretSynastry, interpretSynthesis } from './relationalInterpretation.js';
import { geocode } from './geocoder.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3005;

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'Astra Engine Active', timestamp: new Date() });
});

// ─── Relational Analysis (Composite, Davison, Synastry Cross-Point) ─────────────
app.post('/api/relational', async (req, res) => {
  try {
    const { chart1, chart2, type } = req.body;
    if (!chart1 || !chart2) return res.status(400).json({ error: 'Two charts are required' });

    let result;
    if (type === 'composite') {
      result = await calculateCompositeChart(chart1, chart2);
      const interpretation = interpretSynthesis(result);
      return res.json({ ...result, interpretation });
    } else if (type === 'davison') {
      result = await calculateDavisonChart(chart1, chart2);
      const interpretation = interpretSynthesis(result);
      return res.json({ ...result, interpretation });
    } else {
      // Default: Synastry with Cross-Point Intersections
      const intersections = calculateZodiacIntersections(chart1, chart2);
      const interpretation = interpretSynastry(chart1, chart2, chart1.aspects || []);
      return res.json({ type: 'synastry', interpretation, intersections });
    }

  } catch (err) {
    console.error('[ASTRA] Relational error:', err);
    res.status(500).json({ error: 'Relational analysis failed', detail: err.message });
  }
});

// ─── Main Chart Calculation ───────────────────────────────
app.post('/api/chart', async (req, res) => {
  try {
    const { date, time, location, lat, lng, houseSystem, zodiacType, ayanamsa } = req.body;
    
    if (!date || !time) {
      return res.status(400).json({ error: 'Missing date or time' });
    }

    let geo;
    if (lat !== undefined && lng !== undefined) {
      geo = { lat: parseFloat(lat), lng: parseFloat(lng) };
    } else if (location) {
      geo = await geocode(location);
    } else {
      geo = { lat: 52.2297, lng: 21.0122, displayName: 'Warsaw (Default)' };
    }

    if (!date) return res.status(400).json({ error: "Date is required" }); const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = (time || "12:00").split(":").map(Number);

    const chart = await calculateChart({
      year, month, day, hour, minute,
      lat: geo.lat, lng: geo.lng,
      jd: req.body.jd,
      houseSystem: houseSystem || 'P',
      zodiacType: zodiacType || 'tropical',
      ayanamsa: ayanamsa !== undefined ? ayanamsa : 1
    });

    res.json({
      ...chart,
      input: {
        ...chart.input,
        location: {
          resolved: geo.displayName || location,
          lat: geo.lat,
          lng: geo.lng
        }
      }
    });
  } catch (err) {
    console.error('[ASTRA] Calculation error:', err);
    res.status(500).json({ error: 'Calculation failed', detail: err.message });
  }
});

// ─── Transits Calculation ───────────────────────────────
app.post('/api/transits', async (req, res) => {
  try {
    const { date, time, location } = req.body;
    
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

    if (!date) return res.status(400).json({ error: "Date is required" }); const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = (time || "12:00").split(":").map(Number);

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

// ─── Sabian Symbols ─────────────────────────────────────
app.post('/api/sabians', async (req, res) => {
  try {
    const { date, time, lat, lng } = req.body;
    if (!date) return res.status(400).json({ error: 'Missing date' });
    
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = (time || "12:00").split(':').map(Number);

    const chart = await calculateChart({ 
      year, month, day, hour, minute, 
      lat: lat || 52.2297, 
      lng: lng || 21.0122 
    });

    const sabians = [
      ...chart.planets.map(p => ({
        key: p.key,
        name: p.name,
        longitude: p.longitude,
        sabianIndex: Math.floor(p.longitude) + 1,
        dwadasamsa: p.dwadasamsa
      })),
      ...chart.houses.cusps.map((c, i) => ({
        key: `house_${i+1}`,
        name: `Wierzchołek Domu ${i+1}`,
        longitude: c.longitude,
        sabianIndex: Math.floor(c.longitude) + 1,
        dwadasamsa: c.dwadasamsa
      })),
      {
        key: 'ascendant',
        name: 'Ascendent',
        longitude: chart.houses.ascendant.longitude,
        sabianIndex: Math.floor(chart.houses.ascendant.longitude) + 1,
        dwadasamsa: chart.houses.ascendant.dwadasamsa
      },
      {
        key: 'midheaven',
        name: 'Medium Coeli',
        longitude: chart.houses.midheaven.longitude,
        sabianIndex: Math.floor(chart.houses.midheaven.longitude) + 1,
        dwadasamsa: chart.houses.midheaven.dwadasamsa
      },
      ...chart.lots.map(l => ({
        key: l.key,
        name: l.name,
        longitude: l.longitude,
        sabianIndex: Math.floor(l.longitude) + 1,
        dwadasamsa: l.dwadasamsa
      }))
    ];
    
    res.json({ planets: sabians });
  } catch (err) {
    console.error('[ASTRA] Sabian error:', err);
    res.status(500).json({ error: 'Sabian calculation failed', detail: err.message });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/:path*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
  ✦ Ad Astra API — http://localhost:${PORT}
  ✦ Health: /api/health
  `);
});
