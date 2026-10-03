const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /\/\/ Always clear loading state immediately![\s\S]*?if \(\s*globalGeo\.status === 'loading'\s*\) \{[\s\S]*?globalGeo\.status = 'success';[\s\S]*?\}/;

const fix = `
        if (globalGeo.status === 'loading') {
          emit({ ...globalGeo, status: 'success' });
        }
`;

code = code.replace(regex, fix);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo status mutation');
