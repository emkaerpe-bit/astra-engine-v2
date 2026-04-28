import fs from 'fs';

const filePath = 'c:/Users/Dom/Desktop/Wiralowy Chłopiec/astra-engine/src/components/RelocationAtlas.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the entire internal dashboard block
const dashboardRegex = /{\s*view === 'dashboard' && relocatedData && \([\s\S]*?\)\s*}/;

if (dashboardRegex.test(content)) {
    console.log("Internal dashboard block found. Deleting...");
    content = content.replace(dashboardRegex, '');
} else {
    console.log("Internal dashboard block NOT found via regex.");
}

fs.writeFileSync(filePath, content);
console.log("Success.");
