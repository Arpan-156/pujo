const fs = require('fs');

// Clean Pages.tsx
let pagesCode = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
pagesCode = pagesCode.replace(/const \[q, setQ\] = useState\(''\);\n/g, '');
pagesCode = pagesCode.replace(/searchQuery=\{q\} setSearchQuery=\{setQ\}/g, '');
fs.writeFileSync('src/pages/Pages.tsx', pagesCode, 'utf8');

// Clean PujaMap.tsx
let mapCode = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');
mapCode = mapCode.replace(/const \[q, setQ\] = useState\(''\);\n/g, '');
mapCode = mapCode.replace(/searchQuery=\{q\} setSearchQuery=\{setQ\}/g, '');
// Also remove q from the filter
mapCode = mapCode.replace(
  'const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase());',
  'const matchQ = true;'
);
fs.writeFileSync('src/sections/PujaMap.tsx', mapCode, 'utf8');

console.log('Cleaned up dead search code');
