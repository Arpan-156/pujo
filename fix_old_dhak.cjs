const fs = require('fs');
let code = fs.readFileSync('src/components/Art.tsx', 'utf8');

code = code.replace(
  /<path d="M28 60 L8 55 M28 65 L12 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" \/>\s*<\/g>/g,
  `<path d="M28 60 L8 55 M28 65 L12 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />\n              <path d="M25 48 L15 35 M30 52 L20 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />\n            </g>`
);

fs.writeFileSync('src/components/Art.tsx', code, 'utf8');
console.log("Added sticks to old Dhak.");
