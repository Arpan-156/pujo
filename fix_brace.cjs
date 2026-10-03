const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /\/\/ Throttle updates strictly to prevent React re-render lag\s*if \(now - lastEmitTime < 2000\) \{\s*return;\s*\}\s*\}/m;
const fix = `// Throttle updates strictly to prevent React re-render lag
          if (now - lastEmitTime < 2000) {
            return;
          }`;

code = code.replace(regex, fix);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed brace');
