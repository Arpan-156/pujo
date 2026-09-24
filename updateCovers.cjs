const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /visual=\{\{ art: 'gate', seed: 62, hue: 14, tone: 'dusk' \}\}/,
  "visual={{ src: '/images/featured-cover.jpg', art: 'gate' }}"
);
c = c.replace(
  /visual=\{\{ art: 'bridge', seed: 63, hue: 18, tone: 'night' \}\}/,
  "visual={{ src: '/images/burdwan-cover.jpg', art: 'bridge' }}"
);
c = c.replace(
  /visual=\{\{ art: 'camera', seed: 64, hue: 20, tone: 'dusk' \}\}/,
  "visual={{ src: '/images/gallery-cover.jpg', art: 'camera' }}"
);

fs.writeFileSync('src/pages/Pages.tsx', c);

