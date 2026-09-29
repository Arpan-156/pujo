const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '<TuniLights style={{ position: \'absolute\', top: 0, left: 0, width: \'100%\', opacity: 0.6 }} />',
  '<TuniLights className="sabeki-tuni" />'
);

code = code.replace(
  '.sabeki-corner { position: absolute; top: 0; width: clamp(200px, 30vw, 400px); height: clamp(200px, 30vw, 400px); pointer-events: none; z-index: 1; opacity: 0.15; color: #f9d77e; }',
  '.sabeki-tuni { position: absolute; top: 0; left: 0; width: 100%; opacity: 0.6; z-index: 2; }\n        .sabeki-corner { position: absolute; top: 0; width: clamp(200px, 30vw, 400px); height: clamp(200px, 30vw, 400px); pointer-events: none; z-index: 1; opacity: 0.15; color: #f9d77e; }'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed TuniLights props");
