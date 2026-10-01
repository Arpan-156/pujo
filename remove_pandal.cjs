const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const targetLine = "    { slug: 'bandhab-sangha', name: 'Bandhab Sangha', area: 'Bardhaman', town: true, themeId: 'contemporary', themeName: 'Pinjore Pran Muktir Gaan', cats: ['Community Puja', 'Theme Puja'], est: 1991, feat: false, art: 'pandal', seed: 121, hue: 210, tone: 'night', x: 30, y: 75, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },\n";

if (code.includes(targetLine)) {
  code = code.replace(targetLine, "");
  fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
  console.log("Successfully removed Bandhab Sangha!");
} else {
  // Try regex if exact match fails
  const regex = /\s*\{\s*slug:\s*'bandhab-sangha'[\s\S]*?\},\n?/g;
  if (regex.test(code)) {
    code = code.replace(regex, "");
    fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
    console.log("Successfully removed Bandhab Sangha via regex!");
  } else {
    console.log("Could not find Bandhab Sangha.");
  }
}
