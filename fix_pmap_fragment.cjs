const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// I will wrap the MapContainer and button in a fragment
code = code.replace(
  /\{mapCenter && \(\s*<MapContainer/g,
  "{mapCenter && (<>\n                <MapContainer"
);

code = code.replace(
  /<\/button>\s*\)\}/g,
  "</button>\n              </>)}"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Wrapped MapContainer and FAB in fragment');
