const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(/Ichlabad Kiran Sangha/g, 'Ichlabad Youth Club');
code = code.replace(/ichlabad-kiran-sangha/g, 'ichlabad-youth-club');

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Renamed Ichlabad Kiran Sangha to Ichlabad Youth Club.");
