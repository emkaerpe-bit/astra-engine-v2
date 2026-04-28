import fs from 'fs';

const filePath = 'c:/Users/Dom/Desktop/Wiralowy Chłopiec/astra-engine/src/components/RelocationAtlas.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the broken selectedCity block and remove all table remnants
const brokenBlockRegex = /<h3 className="text-\[#D4AF37\] font-serif italic text-2xl mb-4">{selectedCity\.name}<\/h3>[\s\S]*?{relocatedData \? \(/;

if (brokenBlockRegex.test(content)) {
    console.log("Broken block found. Re-structuring cleanly...");
    const replacement = `<h3 className="text-[#D4AF37] font-serif italic text-2xl mb-4">{selectedCity.name}</h3>
                 
                 {relocatedData ? (`;
    content = content.replace(brokenBlockRegex, replacement);
}

fs.writeFileSync(filePath, content);
console.log("Success.");
