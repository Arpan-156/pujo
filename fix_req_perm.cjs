const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /const p = bySlug\(slug\);\s*const \{ geo \} = useGeo\(\);/,
  `const p = bySlug(slug);
  const { geo, requestPermission } = useGeo();`
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed requestPermission import in PujaDetail');
