const fs = require('fs');
let code = fs.readFileSync('src/lib/overpass.ts', 'utf8');

const regex = /const data = await res\.json\(\);\s*return data\.elements\.map\(\(el: any\) => \(\{/m;

const newFetch = `
      if (!res.ok) { console.error('Overpass error', res.status); return []; }
      const data = await res.json();
      if (!data || !data.elements) return [];
      
      return data.elements.map((el: any) => ({
`;

code = code.replace(regex, newFetch);
fs.writeFileSync('src/lib/overpass.ts', code, 'utf8');
console.log('Fixed POI fetching safety');
