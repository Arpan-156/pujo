const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /\{\/\* PRINT ONLY BCO TABLE \*\/\}/,
  '<> {/* PRINT ONLY BCO TABLE */}'
);

code = code.replace(
  /<\/FlipGrid>\n\s*\) : \(/,
  '</FlipGrid>\n            </>\n            ) : ('
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Fixed JSX syntax.");
