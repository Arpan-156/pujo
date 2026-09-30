const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const target = /\{ id: 'pujo-theme', title: 'Pujo Theme', mood: 'Shehnai over a tanpura drone' \},/;
const replacement = `{ id: 'pujo-theme', title: 'Pujo Theme', mood: 'Dugga Elo', src: '/audio/pujo-theme.mp3' },`;

code = code.replace(target, replacement);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Updated pujo-theme src.");
