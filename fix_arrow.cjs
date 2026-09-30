const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = `<div className="plist-arr"><ArrowRight size={20} /></div>`;
const replacement = `{p.featured && <div className="plist-arr"><ArrowRight size={20} /></div>}`;

code = code.replace(target, replacement);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Removed arrow button for non-featured pujas.");
