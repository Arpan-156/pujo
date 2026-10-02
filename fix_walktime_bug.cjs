const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Inside PujaDetail we have:
// const d = getDistance(geo.lat, geo.lng, p.map?.lat, p.map?.lng);
// Let's make `d` accessible or just parse the string safely. But wait, `d` is scoped inside an `if` block.
code = code.replace(
  /let distStr = '';\s*if \(geo.lat && geo.lng && p\?.map\?.lat && p\?.map\?.lng\) \{[\s\S]*?\}/,
  `let distStr = '';
      let rawDistKm = 0;
      if (geo.lat && geo.lng && p?.map?.lat && p?.map?.lng) {
        rawDistKm = getDistance(geo.lat, geo.lng, p.map?.lat, p.map?.lng);
        distStr = rawDistKm < 1 ? \`\${(rawDistKm * 1000).toFixed(0)}m away\` : \`\${rawDistKm.toFixed(1)}km away\`;
      }`
);

code = code.replace(
  /Approximately \{distStr \? getWalkTimeStr\(parseFloat\(distStr\)\) : 'calculating\.\.\.'\}/g,
  `Approximately {distStr ? getWalkTimeStr(rawDistKm) : 'calculating...'}`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed walk time bug');
