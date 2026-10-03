const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /\{geo\.status === 'success' \? geo\.area \|\| 'GPS Active' : geo\.status === 'error' \? 'GPS Error' : 'Locating\.\.\.'\}/g;
code = code.replace(regex, "{geo.status === 'success' ? geo.area || 'GPS Active' : geo.status === 'error' ? 'GPS Error' : geo.status === 'loading' ? 'Locating...' : 'Ready to locate'}");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed RoutePlannerPage status text');
