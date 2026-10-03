const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /\/\/ Throttle updates to UI components to prevent lag[\s\S]*?if \(now - lastEmitTime < 2000[\s\S]*?\}[\s\S]*?\}/;

const newThrottle = `// Throttle updates strictly to prevent React re-render lag
          if (now - lastEmitTime < 2000) {
            return;
          }`;

code = code.replace(regex, newThrottle);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed GPS throttle');
