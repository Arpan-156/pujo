const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /export function PujaMap\(\{ className = '' \}: \{ className\?: string \}\) \{/,
  "export function PujaMap({ className = '', isHome = false }: { className?: string, isHome?: boolean }) {"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added isHome prop');
