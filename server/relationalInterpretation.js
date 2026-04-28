/**
 * RELATIONAL INTERPRETATION ENGINE
 * Based on the Antygravity Astrology Knowledge Base.
 * This module provides logic-driven text interpretations for Synastry, Composite, and Davison charts.
 */

const THEMES = {
  PERSONAL: ['sun', 'moon', 'mercury', 'venus', 'mars'],
  SOCIAL: ['jupiter', 'saturn'],
  OUTER: ['uranus', 'neptune', 'pluto'],
  FATED: ['node', 'south_node', 'vertex', 'chiron']
};

const HOUSE_OVERLAYS = {
  1: 'POTENCJAŁ TOŻSAMOŚCI: Twoja obecność silnie wpływa na to, jak Partner postrzega siebie. Jesteś katalizatorem jego zmian wizerunkowych i osobistych.',
  2: 'WARTOŚCI I ZASOBY: Ta relacja aktywuje sferę finansową i poczucie własnej wartości. Partner może wspierać Twoją stabilność lub uczyć Cię doceniania tego, co posiadasz.',
  3: 'KOMUNIKACJA: Nieustanna wymiana myśli, wspólne podróże i nauka. Czujesz, że Partner jest Twoim "intelektualnym lustrem".',
  4: 'FUNDAMENT DUSZY: Partner dotyka Twoich najgłębszych korzeni. Czujesz przy nim spokój, jakbyś w końcu "wrócił/a do domu". Idealne dla stałego związku.',
  5: 'ROMANS I KREACJA: Czysta radość, flirty i twórcza ekspresja. Partner budzi w Tobie wewnętrzne dziecko i pasję do życia.',
  6: 'CODZIENNOŚĆ I SŁUŻBA: Wspólne rytuały, praca i dbanie o zdrowie. Relacja, która uczy dyscypliny i wzajemnej troski w małych rzeczach.',
  7: 'LUSTRO PARTNERSTWA: Naturalne poczucie "My". Partner idealnie dopełnia Twoje brakujące cechy. Najsilniejszy wskaźnik trwałego sojuszu.',
  8: 'TRANSFORMACJA I INTYMNOŚĆ: Najgłębszy poziom połączenia. Relacja dotyka tematów tabu, wspólnych finansów i potężnej chemii, która zmienia DNA obu osób.',
  9: 'EKSPANSJA I DUCHOWOŚĆ: Wspólne poszukiwanie prawdy, dalekie podróże i rozwój filozoficzny. Partner otwiera przed Tobą nowe horyzonty.',
  10: 'STATUS I AMBICJA: Relacja, która pcha Cię w stronę sukcesu publicznego. Razem budujecie imperium lub prestiż społeczny.',
  11: 'WSPÓLNA WIZJA: Najpierw przyjaźń, potem miłość. Wspólne cele, grupy społeczne i poczucie wolności wewnątrz związku.',
  12: 'MISTYKA I KARMA: Więź trudna do opisania słowami. Intuicyjne rozumienie bez słów, ale i ryzyko zagubienia się w iluzji partnera.'
};

const ASPECT_INTERPRETATIONS = {
  'sun-sun': {
    harmonious: 'Zbieżność celów i podstawowej energii. Razem świecicie jaśniej.',
    challenging: 'Walka o dominację i wzajemne przyćmiewanie się. Dwa silne ego w jednym pokoju.'
  },
  'sun-moon': {
    harmonious: 'Klasyczny "małżeński" aspekt. Naturalne zrozumienie potrzeb i celów. Yin i Yang w równowadze.',
    challenging: 'Napięcie między tym, czego chcesz, a tym, czego potrzebujesz emocjonalnie.'
  },
  'sun-venus': {
    harmonious: 'Silna, naturalna sympatia i estetyczne przyciąganie. Wspólne wartości i łatwość w okazywaniu uczuć.',
    challenging: 'Rozbieżność w gustach lub sposobie okazywania wartości. Potrzeba kompromisu w kwestiach estetyki.'
  },
  'moon-venus': {
    harmonious: 'Niezwykła czułość, ciepło i opiekuńczość. Relacja pełna słodyczy i emocjonalnego komfortu.',
    challenging: 'Przesadna pobłażliwość lub emocjonalna zależność, która może dusić rozwój.'
  },
  'moon-mars': {
    harmonious: 'Wysoka temperatura emocjonalna, pasja i instynktowna ochrona partnera.',
    challenging: 'Ryzyko irytacji, emocjonalnych spięć i niecierpliwości. Reaktywność biorąca górę.'
  },
  'venus-mars': {
    harmonious: 'Czysta chemia seksualna. Idealne połączenie pragnienia (Mars) i przyciągania (Wenus).',
    challenging: 'Namiętność, która łatwo przechodzi w konflikt. "Od miłości do nienawiści".'
  },
  'venus-saturn': {
    harmonious: 'Lojalność, trwałość i poważne podejście do relacji. Miłość, która buduje fundamenty.',
    challenging: 'Poczucie chłodu, dystansu lub zbyt dużej odpowiedzialności. Ryzyko emocjonalnego chłodu.'
  },
  'venus-pluto': {
    harmonious: 'Transformująca miłość, wielka pasja i lojalność do grobu. Relacja zmieniająca życie.',
    challenging: 'Zazdrość, obsesja i próby manipulacji uczuciami. Miłość, która może spalać.'
  },
  'mercury-mercury': {
    harmonious: 'Płynna wymiana myśli. Rozumiecie się bez kończenia zdań.',
    challenging: 'Ciągłe debaty, nieporozumienia i różnice w przetwarzaniu informacji.'
  }
};

const KARMIC_DEFINITIONS = {
  'node': 'WSPÓLNA MISJA: Połączenie z Węzłem Północnym wskazuje na relację, która pcha obie osoby w stronę ich przeznaczenia i wzrostu.',
  'south_node': 'DŁUG KARMICZNY: Kontakt z Węzłem Południowym sugeruje znajomość z poprzednich wcieleń i niedokończone sprawy, które wymagają domknięcia.',
  'vertex': 'SPOTKANIE PRZEZNACZONE: Vertex to punkt fated encounters. Jego aktywacja przez planetę partnera często oznacza moment "uderzenia pioruna" i poczucie, że spotkanie było nieuniknione.',
  'chiron': 'UZDRAWIAJĄCA RANA: Relacja, która dotyka najgłębszych zranień, ale daje unikalną szansę na ich wspólne przepracowanie i uleczenie.'
};

/**
 * Specifically detects fated and karmic connections.
 */
export function detectKarmicLinks(aspects) {
  const karmicLinks = [];
  aspects.forEach(asp => {
    const isFated1 = THEMES.FATED.includes(asp.planet1.key);
    const isFated2 = THEMES.FATED.includes(asp.planet2.key);
    
    if (isFated1 || isFated2) {
      const fatedKey = isFated1 ? asp.planet1.key : asp.planet2.key;
      const planetKey = isFated1 ? asp.planet2.key : asp.planet1.key;
      
      // Tight orb requirement for fated points (max 3 degrees)
      if (asp.orb <= 3.0) {
        karmicLinks.push({
          type: fatedKey,
          description: KARMIC_DEFINITIONS[fatedKey],
          involvedPlanet: planetKey,
          orb: asp.orb,
          intensity: asp.orb < 1.0 ? 'KRYTYCZNA' : 'SILNA'
        });
      }
    }
  });
  return karmicLinks;
}

/**
 * Generates a high-impact summary of the relationship.
 */
export function generateFinalVerdict(reports) {
  const hasStrongKarma = reports.karma.length > 0;
  const hasTightChemistry = reports.chemistry.some(c => c.weight > 0.9);
  
  if (hasStrongKarma && hasTightChemistry) return "ARCHETYP PRZEZNACZENIA: Więź o rzadkiej intensywności, łącząca głęboką chemię z nieuniknionym długiem karmicznym.";
  if (hasStrongKarma) return "MISTYCZNE SPOTKANIE: Relacja, w której czas traci znaczenie, a dusze rozpoznają się natychmiast.";
  if (hasTightChemistry) return "EKSPLOZJA ENERGII: Sojusz oparty na magnetyzmie, który wymaga świadomego prowadzenia, by nie spłonąć.";
  return "SOJUSZ EWOLUCYJNY: Relacja nastawiona na wspólny wzrost i budowanie nowej jakości życia.";
}

/**
 * Generates a structured interpretation report for Synastry.
 */
export function interpretSynastry(chart1, chart2, aspects) {
  const reports = {
    chemistry: [],
    stability: [],
    karma: detectKarmicLinks(aspects),
    houses: []
  };

  aspects.forEach(asp => {
    const key = [asp.planet1.key, asp.planet2.key].sort().join('-');
    const isHarmonious = ['Trine', 'Sextile', 'Conjunction'].includes(asp.type);
    
    const interpretation = ASPECT_INTERPRETATIONS[key];
    if (interpretation) {
      const text = isHarmonious ? interpretation.harmonious : interpretation.challenging;
      
      if (THEMES.PERSONAL.includes(asp.planet1.key) && THEMES.PERSONAL.includes(asp.planet2.key)) {
        reports.chemistry.push({ pair: key, type: asp.type, text, weight: asp.weight });
      } else if (asp.planet1.key === 'saturn' || asp.planet2.key === 'saturn') {
        reports.stability.push({ pair: key, type: asp.type, text, weight: asp.weight });
      }
    }

    if (THEMES.FATED.includes(asp.planet1.key) || THEMES.FATED.includes(asp.planet2.key)) {
      if (asp.orb < 2.0) {
        reports.karma.push({ pair: key, type: asp.type, text: 'Silne połączenie przeznaczenia (Fated Connection).', weight: asp.weight });
      }
    }
  });

  // Simplified House Overlays for report
  chart2.planets.forEach(p => {
    if (HOUSE_OVERLAYS[p.house] && THEMES.PERSONAL.includes(p.key)) {
      reports.houses.push({ planet: p.name, house: p.house, text: HOUSE_OVERLAYS[p.house] });
    }
  });

  const finalVerdict = generateFinalVerdict(reports);
  return { ...reports, finalVerdict };
}

/**
 * Generates interpretation for Composite/Davison.
 */
export function interpretSynthesis(chart) {
  const sun = chart.planets.find(p => p.key === 'sun');
  const moon = chart.planets.find(p => p.key === 'moon');
  
  return {
    purpose: `Słońce w ${sun.house}. domu: Głównym celem tej relacji jest ${HOUSE_OVERLAYS[sun.house].toLowerCase()}`,
    emotionalClimate: `Księżyc w ${moon.sign}: Emocjonalny fundament oparty na ${moon.sign === 'Cancer' ? 'opiece i wrażliwości' : 'wspólnych celach'}.`,
    topAspects: chart.aspects.slice(0, 5).map(a => `${a.planet1.key} ${a.type} ${a.planet2.key} (Orb: ${a.orb}°)`)
  };
}
