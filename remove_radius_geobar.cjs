const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

// Remove the radius select block
code = code.replace(
  /<select\s+className="geo-input radius-select"[\s\S]*?<\/select>/,
  ''
);

// We should also modify the props to make radius optional or remove it
code = code.replace(
  'export function GeoBar({ radius, setRadius, searchQuery, setSearchQuery }: { radius: number; setRadius: (r: number) => void; searchQuery: string; setSearchQuery: (q: string) => void; })',
  'export function GeoBar({ radius, setRadius, searchQuery, setSearchQuery }: { radius?: number; setRadius?: (r: number) => void; searchQuery: string; setSearchQuery: (q: string) => void; })'
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Removed radius from GeoBar');
