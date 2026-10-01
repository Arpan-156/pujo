const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// The regex will match: href={'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng}
const oldHref = "href={'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng}";
const newHref = "href={'https://www.google.com/maps/search/?api=1&query=' + (p.lat && p.lng ? `${p.lat},${p.lng}` : encodeURIComponent(`${p.name}, Burdwan`))}";

if (code.includes(oldHref)) {
  code = code.replace(oldHref, newHref);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log("Fixed map search link!");
} else {
  console.log("Could not find old href.");
}
