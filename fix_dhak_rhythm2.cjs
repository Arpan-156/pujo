const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

code = code.replace(
  "const PAT = 't.X.t.X.ttX.X...';",
  "const PAT = 'X.X.ttttX.X.tttt';"
);

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log("Changed Dhak rhythm to Dum Dum TakTakTakTak");
