const fs = require('fs');
const pujasContent = fs.readFileSync('src/data/pujas.ts', 'utf8');
const regex = /slug:\s*'([^']+)'/g;
let match;
const slugs = new Set();
while ((match = regex.exec(pujasContent)) !== null) {
  slugs.add(match[1]);
}

const staticRoutes = [
  '',
  '/pujas',
  '/map',
  '/timeline',
  '/featured',
  '/bardhaman',
  '/gallery',
  '/about',
  '/planner',
  '/survival',
  '/top3'
];

let xml = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">';

staticRoutes.forEach(route => {
  xml += '\n  <url>\n    <loc>https://burdwanpujo.pages.dev' + route + '</loc>\n    <changefreq>weekly</changefreq>\n    <priority>' + (route === '' ? '1.0' : '0.8') + '</priority>\n  </url>';
});

Array.from(slugs).forEach(slug => {
  xml += '\n  <url>\n    <loc>https://burdwanpujo.pages.dev/puja/' + slug + '</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>';
});

xml += '\n</urlset>';
fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap generated successfully.');
