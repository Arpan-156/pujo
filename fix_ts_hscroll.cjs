const fs = require('fs');
let code = fs.readFileSync('src/sections/HScroll.tsx', 'utf8');

code = code.replace(
  'if (dist === 0) { t.parentElement.style.justifyContent = "center"; } else { t.parentElement.style.justifyContent = "flex-start"; }',
  'if (t.parentElement) { if (dist === 0) { t.parentElement.style.justifyContent = "center"; } else { t.parentElement.style.justifyContent = "flex-start"; } }'
);

code = code.replace(
  'if (dist === 0) bar.current.parentElement.style.opacity = "0";\n        else { bar.current.parentElement.style.opacity = "1"; bar.current.style.transform = `scaleX(${p.toFixed(4)})`; }',
  'if (bar.current.parentElement) {\n          if (dist === 0) bar.current.parentElement.style.opacity = "0";\n          else { bar.current.parentElement.style.opacity = "1"; bar.current.style.transform = `scaleX(${p.toFixed(4)})`; }\n        }'
);

fs.writeFileSync('src/sections/HScroll.tsx', code, 'utf8');
console.log('Fixed TS errors in HScroll');
