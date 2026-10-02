const fs = require('fs');

// Remove margin: 0 auto from css
let css = fs.readFileSync('src/styles/sections.css', 'utf8');
css = css.replace(
  '.hs.pinned .hs-track { width: max-content; margin: 0 auto; }',
  '.hs.pinned .hs-track { width: max-content; }'
);
fs.writeFileSync('src/styles/sections.css', css, 'utf8');

// Add conditional justify-content to HScroll
let code = fs.readFileSync('src/sections/HScroll.tsx', 'utf8');
code = code.replace(
  'if (h !== lastH) { o.style.height = `${h}px`; lastH = h; }',
  'if (h !== lastH) { o.style.height = `${h}px`; lastH = h; }\n      if (dist === 0) { t.parentElement.style.justifyContent = "center"; } else { t.parentElement.style.justifyContent = "flex-start"; }'
);
fs.writeFileSync('src/sections/HScroll.tsx', code, 'utf8');

console.log('Fixed HScroll dynamic centering');
