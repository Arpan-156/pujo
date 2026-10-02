const fs = require('fs');

// Fix in chrome.css
let chrome = fs.readFileSync('src/styles/chrome.css', 'utf8');
chrome = chrome.replace(
  'img.photo { width: 100%; height: 100%; object-fit: cover; }',
  'img.photo { width: 100%; height: 100%; object-fit: cover; object-position: center 15%; }'
);
fs.writeFileSync('src/styles/chrome.css', chrome, 'utf8');

// Fix in pages.css
let pages = fs.readFileSync('src/styles/pages.css', 'utf8');
pages = pages.replace(
  '.fs-bg .photo { object-fit: cover; width: 100%; height: 100%; }',
  '.fs-bg .photo { object-fit: cover; width: 100%; height: 100%; object-position: center 15%; }'
);
fs.writeFileSync('src/styles/pages.css', pages, 'utf8');

console.log('Fixed face crop');
