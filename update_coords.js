import fs from 'fs';
import path from 'path';

const map = {
  'Vivekananda Pally': { lat: 23.2305, lng: 87.8624 },
  'Curzon Gate': { lat: 23.2404, lng: 87.8675 },
  'Station Bazar': { lat: 23.2500, lng: 87.8700 },
  'Kanchannagar': { lat: 23.2300, lng: 87.8400 },
  'Badamtala': { lat: 23.2450, lng: 87.8600 },
  'Nawabhat': { lat: 23.2684, lng: 87.8325 },
  'Sadarghat': { lat: 23.2200, lng: 87.8650 },
  'Golapbag': { lat: 23.2505, lng: 87.8778 },
  'Khosbagan': { lat: 23.2410, lng: 87.8630 },
  'Barabazar': { lat: 23.2430, lng: 87.8690 },
  'Krishna Sayar': { lat: 23.2500, lng: 87.8770 },
  'Bhatchala': { lat: 23.2350, lng: 87.8850 },
  'Rajbati': { lat: 23.2550, lng: 87.8700 },
  'Kalna Gate': { lat: 23.2450, lng: 87.8900 },
  'Palsit': { lat: 23.2380, lng: 87.8720 }, // Placed artificially within map
  'Shaktigarh': { lat: 23.2320, lng: 87.8750 } // Placed artificially within map
};

let raw = fs.readFileSync('src/data/pujas.ts', 'utf8');

raw = raw.replace(/area: '([^']+)',[\s\S]*?x: \d+, y: \d+(?:, lat: [\d\.]+, lng: [\d\.]+)?/g, (match, area) => {
  const coord = map[area] || { lat: 23.24, lng: 87.86 };
  // Add small random noise to prevent exact overlaps
  const lat = coord.lat + (Math.random() - 0.5) * 0.005;
  const lng = coord.lng + (Math.random() - 0.5) * 0.005;
  
  // replace the x: N, y: N part of the match
  return match.replace(/x: \d+, y: \d+(?:, lat: [\d\.]+, lng: [\d\.]+)?/, `x: 50, y: 50, lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}`);
});

fs.writeFileSync('src/data/pujas.ts', raw);

