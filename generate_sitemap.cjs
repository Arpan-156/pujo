const fs = require('fs');

// Read pujas data to generate sitemap
let pujasCode = fs.readFileSync('src/data/pujas.ts', 'utf8');

// Quick and dirty way to extract slugs
const slugs = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(pujasCode)) !== null) {
  slugs.push(match[1]);
}

const baseUrl = 'https://burdwanpujo.pages.dev';
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

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (path, priority = '0.8', changefreq = 'weekly') => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${baseUrl}${path}</loc>\n`;
  sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
  sitemap += `    <priority>${priority}</priority>\n`;
  sitemap += `  </url>\n`;
};

// Add static routes
staticRoutes.forEach(route => {
  addUrl(route, route === '' ? '1.0' : '0.8');
});

// Add dynamic puja routes
slugs.forEach(slug => {
  addUrl(`/puja/${slug}`, '0.9', 'monthly');
});

sitemap += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
console.log('Generated sitemap.xml with ' + (staticRoutes.length + slugs.length) + ' URLs');

const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync('public/robots.txt', robots, 'utf8');
console.log('Generated robots.txt');


