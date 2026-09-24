const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

c = c.replace(
  /<div className="fs-bg" style=\{\{ background: 'var\(--ink\)' \}\}>/,
  `<div className="fs-bg">\n              <Photo v={{ src: '/images/featured-cover.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' }} />`
);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

