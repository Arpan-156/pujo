const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const newClub = `
  { slug: 'baranilpur-friends', name: 'Baranilpur Friends club', area: 'Baranilpur', town: true, themeId: 'contemporary', themeName: 'Unknown', cats: ['Community Puja'], est: 1990, feat: false, art: 'pandal', seed: 125, hue: 15, tone: 'night', x: 50, y: 50, lat: 23.226136, lng: 87.868722, desc: 'Celebrating Durga Puja with grand festivities and devotion.' },`;

code = code.replace(/const ROWS: Row\[\] = \[/, `const ROWS: Row[] = [${newClub}`);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Added Baranilpur Friends Club properly');
