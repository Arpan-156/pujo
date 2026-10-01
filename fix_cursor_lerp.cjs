const fs = require('fs');
let code = fs.readFileSync('src/components/fx.tsx', 'utf8');
code = code.replace(
  'rx += (x - rx) * 0.7; ry += (y - ry) * 0.7;',
  'rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;'
);
fs.writeFileSync('src/components/fx.tsx', code, 'utf8');
console.log("Cursor lerp updated");
