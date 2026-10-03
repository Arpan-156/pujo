const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

// Fix accuracy issue and stale cache
const oldCache = `try {
  const saved = localStorage.getItem('pujo_geo');
  if (saved) globalGeo = JSON.parse(saved);
} catch(e) {}`;

const newCache = `try {
  const saved = localStorage.getItem('pujo_geo');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.isManual) {
      globalGeo = parsed;
    } else {
      // Don't use stale GPS coordinates from a previous session!
      globalGeo = { ...globalGeo, isManual: false, status: 'idle', active: false, lat: null, lng: null };
    }
  }
} catch(e) {}`;

code = code.replace(oldCache, newCache);

const oldWatch = `const { latitude, longitude } = pos.coords;`;
const newWatch = `const { latitude, longitude, accuracy } = pos.coords;
        if (accuracy && accuracy > 1500) return; // Ignore extreme cell-tower estimations`;

code = code.replace(oldWatch, newWatch);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed GPS cache and accuracy');
