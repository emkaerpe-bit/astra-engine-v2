import sweph from 'sweph';
import path from 'path';

const ephePath = './server/ephe';
console.log('Testing Ephemeris Path:', ephePath);
sweph.set_ephe_path(ephePath);

const jd = sweph.julday(2024, 4, 22, 12, sweph.constants.SE_GREG_CAL);
console.log('Julian Day:', jd);

const chironId = sweph.constants.SE_CHIRON;
console.log('Chiron ID:', chironId);

try {
  const res = sweph.calc_ut(jd, chironId, sweph.constants.SEFLG_SPEED | sweph.constants.SEFLG_SWIEPH);
  console.log('Chiron Result:', JSON.stringify(res, null, 2));
} catch (err) {
  console.error('Error calculating Chiron:', err);
}
