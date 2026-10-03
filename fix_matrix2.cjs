const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

// Insert import at the top
code = "import { PUJAS } from '../data/pujas';\n" + code;

const matrixLogic = `
// OSRM Matrix API for real-world road distances
let matrixLock = false;
async function fetchDistanceMatrix(lat: number, lng: number) {
  if (matrixLock) return;
  matrixLock = true;
  try {
    const validPujas = PUJAS || [];
    if (validPujas.length === 0) return;
    
    // OSRM accepts: lon,lat;lon,lat;...
    let coords = \`\${lng},\${lat}\`;
    const slugs = [];
    
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
      const sourceToAll = data.distances[0]; 
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

// Insert function before watchPosition / useGeo
code = code.replace(/export function useGeo\(\) \{/, matrixLogic + '\nexport function useGeo() {');

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Injected OSRM logic');
