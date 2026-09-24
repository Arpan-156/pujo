const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /visual=\{\{ src: '\/images\/featured-cover\.jpg', art: 'gate' \}\}/,
  "visual={{ src: '/images/featured-cover.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' }}"
);
c = c.replace(
  /visual=\{\{ src: '\/images\/burdwan-cover\.jpg', art: 'bridge' \}\}/,
  "visual={{ src: '/images/burdwan-cover.jpg', art: 'bridge', seed: 63, hue: 18, tone: 'night' }}"
);
c = c.replace(
  /visual=\{\{ src: '\/images\/gallery-cover\.jpg', art: 'camera' \}\}/,
  "visual={{ src: '/images/gallery-cover.jpg', art: 'camera', seed: 64, hue: 20, tone: 'dusk' }}"
);

fs.writeFileSync('src/pages/Pages.tsx', c);

