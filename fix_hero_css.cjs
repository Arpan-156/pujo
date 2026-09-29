const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  '.hero { position: relative; min-height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; isolation: isolate; }',
  '.hero { position: relative; min-height: 100vh; overflow: hidden; display: flex; align-items: center !important; justify-content: center !important; padding: 0 !important; isolation: isolate; }'
);

// Fix the corrupted bengali text since node script in powershell messed it up.
// The original was: ???? ???, ????? ????, ????? ????? ????? ????????
code = code.replace(
  '<p className="hero-bn" lang="bn">+ <  1, ?_  ?  _ , +?_" ??>  ? ?o < ??"- ?? </p>',
  '<p className="hero-bn" lang="bn">???? ???, ????? ????, ????? ????? ????? ????????</p>'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed CSS priority and restored Bengali text");
