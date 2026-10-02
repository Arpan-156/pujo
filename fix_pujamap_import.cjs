const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  'import { PujaScenario } from \'../components/PujaScenario\';',
  ''
);

code = code.replace(
  'import { Particles, Alpana } from \'../components/fx\';',
  'import { Particles, Alpana, PujaScenario } from \'../components/fx\';'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed PujaScenario import');
