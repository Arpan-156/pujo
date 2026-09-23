const fs = require('fs');
const path = require('path');

// 1. Fix CSS svh fallbacks
const cssFiles = [
  'src/styles/base.css',
  'src/styles/chrome.css',
  'src/styles/entrance.css',
  'src/styles/pages.css',
  'src/styles/sections.css'
];

for (const file of cssFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace height: Xsvh with height: Xvh; height: Xsvh
  content = content.replace(/height:\s*([\d\.]+)svh/g, 'height: $1vh; height: $1svh');
  content = content.replace(/min-height:\s*([\d\.]+)svh/g, 'min-height: $1vh; min-height: $1svh');
  content = content.replace(/max-height:\s*([\d\.]+)svh/g, 'max-height: $1vh; max-height: $1svh');
  
  // Replace padding/margin clamp with svh fallback? It's harder for clamp, but Safari 15 supports clamp.
  // Actually, if svh is inside clamp(), Safari will throw out the entire declaration if it doesn't understand svh!
  // So we must provide a fallback line before it.
  content = content.replace(/([a-z-]+):\s*(clamp\([^svh]+svh[^)]+\));/g, (match, prop, clampVal) => {
    return `${prop}: ${clampVal.replace(/svh/g, 'vh')}; ${prop}: ${clampVal};`;
  });
  
  fs.writeFileSync(file, content);
}

// 2. Fix Entrance.tsx fontsReady hanging
let entrance = fs.readFileSync('src/components/Entrance.tsx', 'utf8');
entrance = entrance.replace(
  /const fontsReady = \(document\.fonts\?\.ready \?\? Promise\.resolve\(\)\)\.catch\(\(\) => undefined\);/,
  `const fontsReady = Promise.race([(document.fonts?.ready ?? Promise.resolve()), new Promise(r => setTimeout(r, 1000))]).catch(() => undefined);`
);
fs.writeFileSync('src/components/Entrance.tsx', entrance);

