const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(
  /\/\/ Intentionally removed automatic location prompt to respect user privacy\.[\s\S]*?\/\/ Must be triggered by explicit user action\./,
  `
    // Only auto-fetch if permission was ALREADY granted (silent).
    if (geo.status === 'idle' && !geo.isManual) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
          if (res.state === 'granted') {
            requestPermission();
          }
        });
      }
    }
  `
);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Geo silent check added');
