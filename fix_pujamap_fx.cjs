const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Add imports
if (!code.includes('import { Particles')) {
  code = `import { Particles, Alpana } from '../components/fx';\nimport { PujaScenario } from '../components/PujaScenario';\n` + code;
}

// Add fx components inside <section>
code = code.replace(
  '<section className={`pmap ${className}`} style={{ position: \'relative\', overflow: \'hidden\', paddingBottom: \'40px\' }}>',
  '<section className={`pmap ${className}`} style={{ position: \'relative\', overflow: \'hidden\', paddingBottom: \'40px\' }}>\n      <Particles kind="embers" count={45} />\n      <div style={{ position: \'absolute\', right: \'-20%\', top: \'-10%\', opacity: 0.15, pointerEvents: \'none\' }}><Alpana size={800} spin /></div>\n      <PujaScenario />'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added FX back');
