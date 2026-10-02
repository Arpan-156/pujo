const fs = require('fs');
let css = fs.readFileSync('src/styles/chrome.css', 'utf8');

if (!css.includes('.nav-geo { display: none; }')) {
  css = css.replace(
    '@media (max-width: 900px) {\n  .nav-links { display: none; }',
    '@media (max-width: 900px) {\n  .nav-links { display: none; }\n  .nav-geo { display: none !important; }'
  );
  fs.writeFileSync('src/styles/chrome.css', css, 'utf8');
  console.log('Hid .nav-geo on mobile');
}
