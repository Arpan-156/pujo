const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

code = code.replace(
  "    { id: 'mahalaya', title: 'Mahalaya Atmosphere', mood: 'Conch, bells, pre-dawn hush' },\n",
  ""
);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Deleted mahalaya classic");
