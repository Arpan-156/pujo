const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(/Bardwan Puja/g, 'Burdwan Puja');
fs.writeFileSync('index.html', index, 'utf8');

let seo = fs.readFileSync('src/components/SEO.tsx', 'utf8');
seo = seo.replace(/Bardwan Puja/g, 'Burdwan Puja');
fs.writeFileSync('src/components/SEO.tsx', seo, 'utf8');

console.log('Fixed Burdwan title');
