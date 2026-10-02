const fs = require('fs');
let code = fs.readFileSync('src/sections/Experiences.tsx', 'utf8');

code = code.replace(
  `<p className="bn" lang="bn">????</p>`,
  `<p className="bn" lang="bn">\u09B6\u09BE\u0981\u0996</p>` // ????
);

fs.writeFileSync('src/sections/Experiences.tsx', code, 'utf8');
console.log('Fixed Bengali in Experiences.tsx');
