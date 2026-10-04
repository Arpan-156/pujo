const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

// Find the Route Planner object
const match = code.match(/\{ label: 'Route Planner', bn: '.*?', to: '\/planner' \},/);
if (match) {
  // Remove it from current location
  code = code.replace(match[0], '');
  
  // Insert it after Pandals & Themes
  const ptMatch = code.match(/\{ label: 'Pandals & Themes', bn: '.*?', to: '\/pujas' \},/);
  if (ptMatch) {
    code = code.replace(ptMatch[0], ptMatch[0] + '\n  ' + match[0]);
  }
}

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log('Fixed Nav correctly');
