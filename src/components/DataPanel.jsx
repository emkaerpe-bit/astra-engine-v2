import React, { useMemo } from 'react';
import AspectGrid from './AspectGrid';
import { ZodiacGlyph, PlanetGlyph } from './Glyphs';

const ELEMENTS = {
  Fire: ['Aries', 'Leo', 'Sagittarius'],
  Earth: ['Taurus', 'Virgo', 'Capricorn'],
  Air: ['Gemini', 'Libra', 'Aquarius'],
  Water: ['Cancer', 'Scorpio', 'Pisces']
};

const QUALITIES = {
  Cardinal: ['Aries', 'Cancer', 'Libra', 'Capricorn'],
  Fixed: ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
  Mutable: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces']
};

const DataPanel = ({ planets, aspects, houses }) => {
  const stats = useMemo(() => {
    const elCount = { Fire: [], Earth: [], Air: [], Water: [] };
    const quCount = { Cardinal: [], Fixed: [], Mutable: [] };

    planets.slice(0, 10).forEach(p => {
      for (const [el, signs] of Object.entries(ELEMENTS)) {
        if (signs.includes(p.sign)) elCount[el].push(p.key);
      }
      for (const [qu, signs] of Object.entries(QUALITIES)) {
        if (signs.includes(p.sign)) quCount[qu].push(p.key);
      }
    });

    return { elCount, quCount };
  }, [planets]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-20 animate-fade-in">
      
      {/* Left: Additional Analytics */}
      <div className="space-y-12">
        {/* Placeholder for future deep data panels */}
      </div>

      {/* Right: Empty or Additional Analytics */}
      <div className="h-fit">
         {/* Reserved for future deep data panels */}
      </div>

    </div>
  );
};

export default DataPanel;
