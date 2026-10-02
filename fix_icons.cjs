const fs = require('fs');
let icons = fs.readFileSync('src/components/Icons.tsx', 'utf8');
if (!icons.includes('RefreshCw')) {
  icons += '\nexport const RefreshCw = make(<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>);\n';
  fs.writeFileSync('src/components/Icons.tsx', icons, 'utf8');
}
console.log('Added RefreshCw');
