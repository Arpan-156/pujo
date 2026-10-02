const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

if (!code.includes('.nav-geo { display: none !important; }')) {
  code = code.replace(
    '@media (max-width: 1120px) {\n  .nav-links { display: none; }',
    '@media (max-width: 1120px) {\n  .nav-links { display: none; }\n  .nav-geo { display: none !important; }'
  );
  fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
  console.log('Hid nav-geo on mobile');
}
