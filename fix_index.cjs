const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/https:\/\/burdwanpujo\.dev\//g, 'https://bardwanpuja.pages.dev/');

// Enhance description slightly
code = code.replace(
  'Burdwan Pujo ?" Discover Durga Puja pandals, themes, clubs, traditions, events and celebrations across Bardhaman (Burdwan), West Bengal.',
  'Bardwan Puja Guide 2026 - Discover Durga Puja pandals, themes, local clubs, traditions, maps, and celebrations across Bardhaman (Burdwan), West Bengal.'
);
code = code.replace(
  '<title>Burdwan Pujo 2026 | Durga Puja in Bardhaman</title>',
  '<title>Bardwan Puja Guide 2026 | Burdwan Durga Puja, Pandals & Map</title>'
);

fs.writeFileSync('index.html', code, 'utf8');
console.log('Fixed index.html');
