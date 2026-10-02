const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /const p = bySlug\(slug\);\s*const \[lb, setLb\] = useState<number \| null>\(null\);/,
  `const p = bySlug(slug);
  const { geo } = useGeo();
  let distStr = '';
  let rawDistKm = 0;
  if (geo.lat && geo.lng && p?.map?.lat && p?.map?.lng) {
    rawDistKm = getDistance(geo.lat, geo.lng, p.map.lat, p.map.lng);
    distStr = rawDistKm < 1 ? \`\${(rawDistKm * 1000).toFixed(0)}m away\` : \`\${rawDistKm.toFixed(1)}km away\`;
  }
  const [lb, setLb] = useState<number | null>(null);`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujaDetail top');
