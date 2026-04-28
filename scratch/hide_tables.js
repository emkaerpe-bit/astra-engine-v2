import fs from 'fs';

const filePath = 'c:/Users/Dom/Desktop/Wiralowy Chłopiec/astra-engine/src/components/RelocationAtlas.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove LOCAL ACG INFLUENCE ANALYSIS from the sidebar
const influenceRegex = /{\/\* LOCAL ACG INFLUENCE ANALYSIS \*\/}\s*<div className="mb-6 space-y-3">[\s\S]*?<\/div>\s*<\/div>/;

if (influenceRegex.test(content)) {
    console.log("Influence section found. Removing...");
    content = content.replace(influenceRegex, '');
}

// 2. Alternatively, wrap it in atlasMode check if we want to keep it in ACG mode but hide in Relocation
// The user said "usuń mi pozostałności", so I'll wrap it.
const influenceSection = /{\/\* LOCAL ACG INFLUENCE ANALYSIS \*\/}\s*<div className="mb-6 space-y-3">[\s\S]*?<\/div>/;
if (influenceSection.test(content)) {
    console.log("Wrapping influence section in atlasMode check...");
    content = content.replace(influenceSection, (match) => {
        return `{atlasMode === 'acg' && (\n                 ${match}\n               )}`;
    });
}

fs.writeFileSync(filePath, content);
console.log("Success.");
