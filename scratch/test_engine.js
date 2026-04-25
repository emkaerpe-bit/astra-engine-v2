import { calculateChart } from '../server/astroEngine.js';

async function test() {
  try {
    const data = await calculateChart({
      year: 1995,
      month: 11,
      day: 23,
      hour: 12,
      minute: 0,
      lat: 52.2297,
      lng: 21.0122,
      system: 'P'
    });
    console.log("LOTS:", data.lots?.length);
    console.log("STARS COUNT:", data.stars?.length);
    data.stars?.forEach(s => console.log(`  ✦ ${s.name}: ${s.degreeInSign} ${s.sign}`));
    console.log("SECT:", data.sect);
  } catch (e) {
    console.error(e);
  }
}

test();
