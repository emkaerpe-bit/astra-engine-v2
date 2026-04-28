pe/**
 * Standalone Pattern Detection Script - FULL VERSION
 * Detects: Grand Trine, Kite, Yod, T-Square, Grand Cross, Mystic Rectangle, Stellium
 */

function detectPatterns(planets, aspects) {
  const patterns = [];
  const findAspect = (p1k, p2k, type) => 
    aspects.find(a => 
      ((a.planet1 === p1k && a.planet2 === p2k) || (a.planet1 === p2k && a.planet2 === p1k)) &&
      (!type || a.type === type)
    );

  const keys = planets.map(p => p.key);

  // 1. GRAND TRINE
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        if (findAspect(keys[i], keys[j], 'Trine') && 
            findAspect(keys[j], keys[k], 'Trine') && 
            findAspect(keys[k], keys[i], 'Trine')) {
          patterns.push({ type: 'Grand Trine', planets: [keys[i], keys[j], keys[k]] });
        }
      }
    }
  }

  // 2. KITE
  patterns.filter(p => p.type === 'Grand Trine').forEach(trine => {
    const [p1, p2, p3] = trine.planets;
    keys.forEach(p4 => {
      if (trine.planets.includes(p4)) return;
      [{h:p4, t:p1, w:[p2,p3]}, {h:p4, t:p2, w:[p1,p3]}, {h:p4, t:p3, w:[p1,p2]}].forEach(c => {
        if (findAspect(c.h, c.t, 'Opposition') && findAspect(c.h, c.w[0], 'Sextile') && findAspect(c.h, c.w[1], 'Sextile')) {
          patterns.push({ type: 'Kite', planets: [c.h, c.t, c.w[0], c.w[1]], head: c.h, tail: c.t });
        }
      });
    });
  });

  // 3. YOD (Finger of God)
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = 0; k < keys.length; k++) {
        if (k === i || k === j) continue;
        const baseSextile = findAspect(keys[i], keys[j], 'Sextile');
        const q1 = findAspect(keys[i], keys[k], 'Quincunx');
        const q2 = findAspect(keys[j], keys[k], 'Quincunx');
        if (baseSextile && q1 && q2) {
          patterns.push({ type: 'Yod', planets: [keys[i], keys[j], keys[k]], apex: keys[k] });
        }
      }
    }
  }

  // 4. T-SQUARE
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = 0; k < keys.length; k++) {
        if (k === i || k === j) continue;
        const opp = findAspect(keys[i], keys[j], 'Opposition');
        const sq1 = findAspect(keys[i], keys[k], 'Square');
        const sq2 = findAspect(keys[j], keys[k], 'Square');
        if (opp && sq1 && sq2) {
          patterns.push({ type: 'T-Square', planets: [keys[i], keys[j], keys[k]], apex: keys[k] });
        }
      }
    }
  }

  // 5. GRAND CROSS
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        for (let l = k + 1; l < keys.length; l++) {
          const combo = [keys[i], keys[j], keys[k], keys[l]];
          let oppositions = 0, squares = 0;
          for (let m = 0; m < 4; m++) {
            for (let n = m + 1; n < 4; n++) {
              if (findAspect(combo[m], combo[n], 'Opposition')) oppositions++;
              if (findAspect(combo[m], combo[n], 'Square')) squares++;
            }
          }
          if (oppositions === 2 && squares === 4) {
            patterns.push({ type: 'Grand Cross', planets: combo });
          }
        }
      }
    }
  }

  // 6. MYSTIC RECTANGLE
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      for (let k = j + 1; k < keys.length; k++) {
        for (let l = k + 1; l < keys.length; l++) {
          const c = [keys[i], keys[j], keys[k], keys[l]];
          let opps = 0, trines = 0, sextiles = 0;
          for (let m = 0; m < 4; m++) {
            for (let n = m + 1; n < 4; n++) {
              if (findAspect(c[m], c[n], 'Opposition')) opps++;
              if (findAspect(c[m], c[n], 'Trine')) trines++;
              if (findAspect(c[m], c[n], 'Sextile')) sextiles++;
            }
          }
          if (opps === 2 && trines === 2 && sextiles === 2) {
            patterns.push({ type: 'Mystic Rectangle', planets: c });
          }
        }
      }
    }
  }

  // 7. STELLIUM
  const signGroups = {};
  planets.forEach(p => {
    if (!signGroups[p.sign]) signGroups[p.sign] = [];
    signGroups[p.sign].push(p.key);
  });
  Object.keys(signGroups).forEach(sign => {
    if (signGroups[sign].length >= 3) {
      patterns.push({ type: 'Stellium', planets: signGroups[sign], sign });
    }
  });

  return patterns;
}

// TEST DATA (Example: Grand Cross)
const mockPlanets = [
  {key: 'sun', sign: 'Aries'}, 
  {key: 'moon', sign: 'Cancer'}, 
  {key: 'mars', sign: 'Libra'}, 
  {key: 'jupiter', sign: 'Capricorn'}
];
const mockAspects = [
  {planet1: 'sun', planet2: 'mars', type: 'Opposition'},
  {planet1: 'moon', planet2: 'jupiter', type: 'Opposition'},
  {planet1: 'sun', planet2: 'moon', type: 'Square'},
  {planet1: 'moon', planet2: 'mars', type: 'Square'},
  {planet1: 'mars', planet2: 'jupiter', type: 'Square'},
  {planet1: 'jupiter', planet2: 'sun', type: 'Square'}
];

console.log("--- ASTRO FULL PATTERN DETECTION TEST ---");
const result = detectPatterns(mockPlanets, mockAspects);
console.log(JSON.stringify(result, null, 2));
