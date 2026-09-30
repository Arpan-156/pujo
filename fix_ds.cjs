const fs = require('fs');
let code = fs.readFileSync('src/sections/DailyShloka.tsx', 'utf8');

const replacement = `
          const keys = Object.keys(json).filter(k => k !== 'fallback');
          
          // Use a random index for the off-season so users can see different insights
          // Or base it on the day of the year more reliably
          const index = Math.floor(Math.random() * keys.length);
          const rotatedData = json[keys[index]];
`;

code = code.replace(
  /const keys = Object\.keys\(json\)\.filter\(k => k !== 'fallback'\);[\s\S]*?const rotatedData = json\[keys\[index\]\];/,
  replacement.trim()
);

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
console.log("Fixed DailyShloka.");
