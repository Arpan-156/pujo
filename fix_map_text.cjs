const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  '{p.location}. Map pin is stylised.',
  '{p.location}. Open map for directions.'
);

code = code.replace(
  '{p.location}. Pin position is a placeholder until real coordinates are added.',
  '{p.location}. Exact map pin will be verified soon.'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Updated map text.");
