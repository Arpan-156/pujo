const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

c = c.replace(
  /<Photo v=\{\{ src: '\/images\/featured-cover\.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' \}\} \/>/,
  `<Photo v={{ src: '/images/featured-cover.jpg', art: 'gate', seed: 62, hue: 14, tone: 'dusk' }} />\n              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(20,8,9,0.85) 100%)', zIndex: 1 }} />`
);

c = c.replace(
  /className="fs-title" style=\{\{([^}]+)\}\}/,
  `className="fs-title" style={{$1, textShadow: '0 8px 40px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)'}}`
);

c = c.replace(
  /className="fs-lead" style=\{\{([^}]+)color: 'var\(--mute\)'([^}]+)\}\}/,
  `className="fs-lead" style={{$1color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.9)'$2}}`
);

c = c.replace(
  /className="fs-scroll-indicator" style=\{\{([^}]+)opacity: 0\.8([^}]+)\}\}/,
  `className="fs-scroll-indicator" style={{$1opacity: 1, textShadow: '0 4px 15px rgba(0,0,0,0.9)'$2}}`
);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

