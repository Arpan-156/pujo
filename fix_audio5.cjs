const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const replacement = "{ id: 'rupang-dehi', title: 'Rupang Dehi Jayang Deh', mood: 'Mahalaya', src: '/audio/rupang-dehi.mp3' },";

code = code.replace(
  /\{ id: 'mahalaya', title: 'Mahalaya Atmosphere', mood: 'Conch, bells, pre-dawn hush' \},/,
  replacement
);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Replaced mahalaya track!");
