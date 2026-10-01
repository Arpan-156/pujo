const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const restoreStr = `  { slug: 'bandhab-sangha', name: 'Bandhab Sangha', area: 'Bardhaman', town: true, themeId: 'contemporary', themeName: 'Pinjore Pran Muktir Gaan', cats: ['Community Puja', 'Theme Puja'], est: 1991, feat: false, art: 'pandal', seed: 121, hue: 210, tone: 'night', x: 30, y: 75, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },
  { slug: 'shyamlal-sarbojanin'`;

code = code.replace(/\{\s*slug:\s*'shyamlal-sarbojanin'/, restoreStr);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Restored Bandhab Sangha");
