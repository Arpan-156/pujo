const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

code = code.replace(
  /navigator\.geolocation\.getCurrentPosition\([\s\S]*?\(pos\) => \{/,
  `navigator.geolocation.getCurrentPosition(
      (pos) => {`
);

// Actually it's easier to just do a string replace on the exact call
code = code.replace(
  /navigator\.geolocation\.getCurrentPosition\(\s*\(pos\) => \{/,
  `navigator.geolocation.getCurrentPosition(
      (pos) => {`
);

code = code.replace(
  /setGeo\(g => \(\{ \.\.\.g, status: 'error', error: err\.message \}\)\);\s*\}\s*\);/,
  `setGeo(g => ({ ...g, status: 'error', error: err.message }));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );`
);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed high accuracy');
