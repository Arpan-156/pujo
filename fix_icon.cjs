const fs = require('fs');
let code = fs.readFileSync('src/sections/DailyShloka.tsx', 'utf8');

// Replace Rupee with a Sparkle/Sun icon
const rupee = `<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`;
const flame = `<path d="M12 2L15 8H21L16 12L18 18L12 15L6 18L8 12L3 8H9L12 2Z" fill="currentColor"/>`;
code = code.replace(rupee, flame);

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
