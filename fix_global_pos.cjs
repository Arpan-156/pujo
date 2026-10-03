const fs = require('fs');

let chromeCode = fs.readFileSync('src/styles/chrome.css', 'utf8');
chromeCode = chromeCode.replace(/object-position: center 15%;/g, 'object-position: center 50%;');
fs.writeFileSync('src/styles/chrome.css', chromeCode, 'utf8');

let pagesCode = fs.readFileSync('src/styles/pages.css', 'utf8');
pagesCode = pagesCode.replace(/object-position: center 15%;/g, 'object-position: center 50%;');
fs.writeFileSync('src/styles/pages.css', pagesCode, 'utf8');

console.log('Fixed global object position');
