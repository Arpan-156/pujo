const fs = require('fs');

// 1. Revert pujas.ts
let pujasCode = fs.readFileSync('src/data/pujas.ts', 'utf8');

const regex = /const CURATED_IMAGES = \[\s*[\s\S]*?const V = \(art: ArtKind, seed: number, hue = 12, tone: Tone = 'night'\): Visual => \(\{ art, seed, hue, tone, src: getImg\(seed\) \}\);/;

const originalV = "const V = (art: ArtKind, seed: number, hue = 12, tone: Tone = 'night'): Visual => ({ art, seed, hue, tone });";

if (pujasCode.match(regex)) {
    pujasCode = pujasCode.replace(regex, originalV);
    fs.writeFileSync('src/data/pujas.ts', pujasCode, 'utf8');
    console.log("Reverted pujas.ts");
} else {
    console.log("Could not match the custom image block in pujas.ts.");
}

// 2. Revert Pages.tsx
let pagesCode = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

pagesCode = pagesCode.replace(
  "visual={{ src: 'https://images.unsplash.com/photo-1596700685934-e408ec2d88c2?auto=format&fit=crop&q=80&w=1200', art: 'mythology', seed: 61, hue: 8, tone: 'night' }}",
  "visual={{ art: 'mythology', seed: 61, hue: 8, tone: 'night' }}"
);
pagesCode = pagesCode.replace(
  "visual={{ src: 'https://images.unsplash.com/photo-1533227260814-1e0bb50d60d3?auto=format&fit=crop&q=80&w=1200', art: 'street', seed: 65, hue: 24, tone: 'night' }}",
  "visual={{ art: 'street', seed: 65, hue: 24, tone: 'night' }}"
);
pagesCode = pagesCode.replace(
  "visual={{ src: 'https://images.unsplash.com/photo-1570777196644-84d5dfaf3b4d?auto=format&fit=crop&q=80&w=1200', art: 'river', seed: 66, hue: 24, tone: 'dawn' }}",
  "visual={{ art: 'river', seed: 66, hue: 24, tone: 'dawn' }}"
);
pagesCode = pagesCode.replace(
  "visual={{ src: 'https://images.unsplash.com/photo-1662890538600-b6ab743eb371?auto=format&fit=crop&q=80&w=1200', art: 'dhunuchi', seed: 68, hue: 22, tone: 'night' }}",
  "visual={{ art: 'dhunuchi', seed: 68, hue: 22, tone: 'night' }}"
);

fs.writeFileSync('src/pages/Pages.tsx', pagesCode, 'utf8');
console.log("Reverted Pages.tsx");
