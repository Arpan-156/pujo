const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

// The curated array of beautiful real festival photography
const imagesCode = `
const CURATED_IMAGES = [
  'https://images.unsplash.com/photo-1601633519890-48ee7fcb51cb?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1570777196644-84d5dfaf3b4d?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1634629471131-7b0f69da19f5?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1596700685934-e408ec2d88c2?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1662890538600-b6ab743eb371?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1533227260814-1e0bb50d60d3?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1568212629486-9ec6143926cb?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1528696892704-5e1122852276?auto=format&fit=crop&q=80&w=1200'
];
const getImg = (seed: number) => CURATED_IMAGES[seed % CURATED_IMAGES.length];

const V = (art: ArtKind, seed: number, hue = 12, tone: Tone = 'night'): Visual => ({ art, seed, hue, tone, src: getImg(seed) });
`;

// Replace the V function
const oldVRegex = /const V = \(art: ArtKind, seed: number, hue = 12, tone: Tone = 'night'\): Visual => \(\{ art, seed, hue, tone \}\);/;
code = code.replace(oldVRegex, imagesCode);

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log("Images injected into pujas.ts");
