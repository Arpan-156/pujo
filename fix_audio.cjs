const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const target = /\{ id: 'dhaker-taal', title: 'Dhaker Taal', mood: 'Dhak and kansor, mid tempo' \},/;
const replacement = `{ id: 'dhaker-taal', title: 'Dhaker Taal', mood: 'Real Dhak beats', src: '/audio/dhak.mp3' },`;

code = code.replace(target, replacement);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Updated dhaker-taal with audio src.");
