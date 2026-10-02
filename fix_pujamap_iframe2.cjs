const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  'src={geo.status === \'success\' && !geo.isManual && geo.lat && geo.lng && cur.lat && cur.lng ? `https://maps.google.com/maps?saddr=${geo.lat},${geo.lng}&daddr=${cur.lat},${cur.lng}&t=m&z=15&output=embed` : `https://maps.google.com/maps?q=${mapQuery}&t=m&z=16&output=embed&iwloc=near`}',
  'src={geo.status === \'success\' && geo.lat && geo.lng && cur.lat && cur.lng ? `https://maps.google.com/maps?saddr=${geo.lat},${geo.lng}&daddr=${cur.lat},${cur.lng}&t=m&z=15&output=embed` : `https://maps.google.com/maps?q=${mapQuery}&t=m&z=16&output=embed&iwloc=near`}'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed PujaMap iframe for manual locations too');
