const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<button className="map-btn" onClick=\{openGoogleMaps\}>[\s\S]*?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"><\/polygon><\/svg>[\s\S]*?Open in Maps[\s\S]*?<\/button>/;

code = code.replace(regex, '');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Removed Open in Maps button');
