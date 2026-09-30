const fs = require('fs');

// --- 1. Modify src/data/pujas.ts ---
let pujasCode = fs.readFileSync('src/data/pujas.ts', 'utf8');

// Remove Boro Nilpur row
pujasCode = pujasCode.replace(
  /.*\{ slug: 'boro-nilpur', name: 'Boro Nilpur'.*\},?\n?/g,
  ''
);

// Update Vivekananda Sevak Sangha area
pujasCode = pujasCode.replace(
  /area: 'Vivekananda Pally'/g,
  "area: 'Sankhari Pukur ln, Sripally'"
);

fs.writeFileSync('src/data/pujas.ts', pujasCode, 'utf8');


// --- 2. Modify src/pages/Pages.tsx ---
let pagesCode = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Update ZONES
pagesCode = pagesCode.replace(
  /'Vivekananda Pally', /g,
  '' // Just remove it from Central
);
pagesCode = pagesCode.replace(
  /, 'Boro Nilpur'/g,
  '' // Remove Boro Nilpur from Central
);
pagesCode = pagesCode.replace(
  /'Sripally', /g,
  "'Sripally', 'Sankhari Pukur ln, Sripally', " // Add to South
);

// Update AREA_ORDER
pagesCode = pagesCode.replace(
  /'Vivekananda Pally', /g,
  '' 
);
pagesCode = pagesCode.replace(
  /, 'Boro Nilpur'/g,
  '' 
);
pagesCode = pagesCode.replace(
  /'Sripally', /g,
  "'Sripally', 'Sankhari Pukur ln, Sripally', " 
);

fs.writeFileSync('src/pages/Pages.tsx', pagesCode, 'utf8');

console.log("Updated data and routes.");
