const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

// Add distances to GeoState
code = code.replace(/area: string;\n\s*status: 'idle' \| 'loading' \| 'success' \| 'error';/m, `area: string;
    distances?: Record<string, number>;
    status: 'idle' | 'loading' | 'success' | 'error';`);

// Add distances to initial state
code = code.replace(/status: 'idle',\n\s*isManual: false\n\s*\};/m, `status: 'idle',
    distances: {},
    isManual: false
  };`);

// Add OSRM matrix fetcher
const matrixLogic = `
// OSRM Matrix API for real-world road distances
let matrixLock = false;
async function fetchDistanceMatrix(lat: number, lng: number) {
  if (matrixLock) return;
  matrixLock = true;
  try {
    const validPujas = window.__PUJAS_CACHE || []; // We'll inject this from pujas.ts or just import it
    if (validPujas.length === 0) return;
    
    // OSRM accepts: lon,lat;lon,lat;...
    // First coordinate is source (index 0)
    let coords = \`\${lng},\${lat}\`;
    const slugs = [];
    
    // Max 100 coords, we have ~40 pujas, so it fits
    for (const p of validPujas) {
      if (p.map?.lat && p.map?.lng) {
        coords += \`;\${p.map.lng},\${p.map.lat}\`;
        slugs.push(p.slug);
      }
    }
    
    const res = await fetch(\`https://router.project-osrm.org/table/v1/walking/\${coords}?sources=0\`);
    if (!res.ok) return;
    const data = await res.json();
    
    if (data.distances && data.distances[0]) {
      const dists = {};
      const sourceToAll = data.distances[0]; // array of distances from index 0
      // index 0 is distance to self (0), index 1 is distance to slugs[0], etc.
      for (let i = 0; i < slugs.length; i++) {
        if (sourceToAll[i + 1] !== null) {
          dists[slugs[i]] = sourceToAll[i + 1] / 1000; // convert meters to km
        }
      }
      globalGeo = { ...globalGeo, distances: dists };
      emit(globalGeo);
    }
  } catch(e) {
    console.error('OSRM Matrix failed', e);
  } finally {
    matrixLock = false;
  }
}
`;

// Insert logic at the top (after imports)
code = code.replace(/import \{ AREAS \} from '\.\.\/data\/areas';/, `import { AREAS } from '../data/areas';
import { PUJAS } from '../data/pujas';\nwindow.__PUJAS_CACHE = PUJAS;\n` + matrixLogic);

// Call it in watchPosition success
code = code.replace(/fetchExactLocationName\(latitude, longitude\)\.then\(realName => \{/, `fetchDistanceMatrix(latitude, longitude);
        fetchExactLocationName(latitude, longitude).then(realName => {`);


fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Added OSRM Matrix');
