import fs from 'fs';

const filePath = 'c:/Users/Dom/Desktop/Wiralowy Chłopiec/astra-engine/src/components/RelocationAtlas.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Regex for the filters section in sidebar
const filtersRegex = /<span className="text-\[11px\] text-\[#D4AF37\] font-mono uppercase tracking-\[0.3em\] font-black mb-6">Filtry Planetarne<\/span>\s*<div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-\[300px\] pr-2 custom-scrollbar">[\s\S]*?<\/div>/;

if (filtersRegex.test(content)) {
    console.log("Filters section found. Wrapping...");
    content = content.replace(filtersRegex, (match) => {
        return `{atlasMode === 'acg' && (\n                 <>\n                   ${match}\n                 </>\n               )}`;
    });
    fs.writeFileSync(filePath, content);
    console.log("Success.");
} else {
    console.log("Filters section NOT found. Check regex.");
}
