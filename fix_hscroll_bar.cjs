const fs = require('fs');
let code = fs.readFileSync('src/sections/HScroll.tsx', 'utf8');

code = code.replace(
  'if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;',
  'if (bar.current) {\n        if (dist === 0) bar.current.parentElement.style.opacity = "0";\n        else { bar.current.parentElement.style.opacity = "1"; bar.current.style.transform = `scaleX(${p.toFixed(4)})`; }\n      }'
);

fs.writeFileSync('src/sections/HScroll.tsx', code, 'utf8');
console.log('Fixed HScroll progress bar visibility');
