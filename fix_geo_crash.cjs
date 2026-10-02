const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(
  /if \(navigator\.permissions\) \{[\s\S]*?\}\s*\}/,
  `if (navigator.permissions && navigator.permissions.query) {
        try {
          navigator.permissions.query({ name: 'geolocation' }).then(res => {
            if (res.state === 'granted') {
              requestPermission();
            }
          }).catch(() => {});
        } catch(e) {}
      }`
);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo crash');
