const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Stop using radius in desc
code = code.replace(
  'desc: geo.active ? `Optimized for your realtime location (${radius}km radius).` : \'A robust mix of everything that makes Burdwan Durga Puja famous.\',',
  'desc: geo.active ? `Optimized for your realtime location.` : \'A robust mix of everything that makes Burdwan Durga Puja famous.\','
);

// Stop filtering by radius in planner
code = code.replace(
  'if (d > radius) return false;',
  'if (d > 50) return false; // Default max distance'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Removed radius logic from Pages');
