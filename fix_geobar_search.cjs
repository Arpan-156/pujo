const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

// Remove search input
code = code.replace(
  /<div className="geo-search-box">[\s\S]*?<\/div>/,
  ''
);

// We should also modify the props to make searchQuery optional or remove it
code = code.replace(
  'export function GeoBar({ radius, setRadius, searchQuery, setSearchQuery }: { radius?: number; setRadius?: (r: number) => void; searchQuery: string; setSearchQuery: (q: string) => void; })',
  'export function GeoBar({ radius, setRadius, searchQuery, setSearchQuery }: { radius?: number; setRadius?: (r: number) => void; searchQuery?: string; setSearchQuery?: (q: string) => void; })'
);

// If there's any other reference to it inside GeoBar, we don't have it except the input itself, which is now removed.

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Removed search option from GeoBar');
