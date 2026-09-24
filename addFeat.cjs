const fs = require('fs');
let c = fs.readFileSync('src/data/pujas.ts', 'utf8');
c = c.replace(
  /export const FEATURED: FeaturedPandal\[\] = \[/,
  `export const FEATURED: FeaturedPandal[] = [\n  { slug: 'amadpur-zomidar-bari', tagline: 'A timeless legacy preserving centuries of devotion.', note: 'Heritage' },`
);
fs.writeFileSync('src/data/pujas.ts', c);

