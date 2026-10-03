const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

const regex = /<input\s+type="text"\s+className="geo-search"\s+placeholder="Search map places\.\.\."\s+value=\{searchQuery\}\s+onChange=\{\(e\) => setSearchQuery\(e\.target\.value\)\}\s+\/>/m;

code = code.replace(regex, '');

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Removed search input');
