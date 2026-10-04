const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Insert useGeo at top
code = code.replace(/const fine = useFinePointer\(\);/, "const { geo, requestPermission } = useGeo();\n  const fine = useFinePointer();");

// Remove useGeo from inside the IIFE
code = code.replace(/const \{ geo, requestPermission \} = useGeo\(\);\s*/, "");

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Fixed Rules of Hooks in Home.tsx');
