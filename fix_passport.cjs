const fs = require('fs');
let code = fs.readFileSync('src/lib/passport.ts', 'utf8');

code = code.replace(
  "import { useSyncExternalStore } from 'react';", 
  "import { useSyncExternalStore } from 'react';\nimport { PUJAS } from '../data/pujas';"
);

const replaceLogic = `    data = {
      saved: Array.isArray(parsed?.saved) ? parsed.saved.filter(s => PUJAS.some(p => p.slug === s)) : [],
      visited: Array.isArray(parsed?.visited) ? parsed.visited.filter(s => PUJAS.some(p => p.slug === s)) : []
    };`;

code = code.replace(/data = \{\n\s*saved: Array\.isArray\(parsed\?\.saved\) \? parsed\.saved : \[\],\n\s*visited: Array\.isArray\(parsed\?\.visited\) \? parsed\.visited : \[\]\n\s*\};/, replaceLogic);

fs.writeFileSync('src/lib/passport.ts', code, 'utf8');
console.log("Updated passport logic.");
