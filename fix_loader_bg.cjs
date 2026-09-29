const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

code = code.replace(
  'background: radial-gradient(ellipse at 50% 40%, #2a0b11, var(--ink) 70%);',
  'background: radial-gradient(circle at 50% 50%, rgba(42,11,17,1) 0%, rgba(10,3,4,1) 100%);'
);

code = code.replace(
  '.loader { position: fixed; inset: 0; z-index: 200;',
  '.loader { position: fixed; inset: 0; z-index: 200; \n  &::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(233,181,88,0.08) 0%, transparent 60%); pointer-events: none; }'
);

fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Loader background updated.");
