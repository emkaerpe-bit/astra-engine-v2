export const ASTRO_TRANS = {
  // Planets
  Sun: "Słońce",
  Moon: "Księżyc",
  Mercury: "Merkury",
  Venus: "Wenus",
  Mars: "Mars",
  Jupiter: "Jowisz",
  Saturn: "Saturn",
  Uranus: "Uran",
  Neptune: "Neptun",
  Pluto: "Pluton",
   "True Node": "Węzeł Płn.",
   "South Node": "Węzeł Połdn.",
   Lilith: "Lilit",
  Chiron: "Chiron",
  Ascendant: "Ascendent",
  Midheaven: "Medium Coeli",

  // Signs
  Aries: "Baran",
  Taurus: "Byk",
  Gemini: "Bliźnięta",
  Cancer: "Rak",
  Leo: "Lew",
  Virgo: "Panna",
  Libra: "Waga",
  Scorpio: "Skorpion",
  Sagittarius: "Strzelec",
  Capricorn: "Koziorożec",
  Aquarius: "Wodnik",
  Pisces: "Ryby",

  // Aspects
  Opposition: "Opozycja",
  Conjunction: "Koniunkcja",
  Trine: "Trygon",
  Square: "Kwadratura",
  Sextile: "Sekstyl",
  "Semi-Sextile": "Półsekstyl",
  Quincunx: "Kwinkunks",
  "Semi-Square": "Półkwadrat",
  Sesquiquadrate: "Półtorakwadrat",
  Quintile: "Kwintyl",
  "Bi-Quintile": "Bikwintyl",

  // Elements
  Fire: "Ogień",
  Earth: "Ziemia",
  Air: "Powietrze",
  Water: "Woda",

  // Qualities
  Cardinal: "Kardynalny",
  Fixed: "Stały",
  Mutable: "Zmienny"
};

export const t = (term) => ASTRO_TRANS[term] || term;
