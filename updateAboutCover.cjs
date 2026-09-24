const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /visual=\{\{ art: 'camera', seed: 67, hue: 350, tone: 'dusk' \}\}/,
  "visual={{ src: '/images/about-cover.jpg', art: 'camera', seed: 67, hue: 350, tone: 'dusk' }}"
);

fs.writeFileSync('src/pages/Pages.tsx', c);

