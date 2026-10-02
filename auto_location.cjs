const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /\/\/ Silent auto-fetch if permission was ALREADY granted\.[\s\S]*?if \(globalGeo\.status === 'idle' && !globalGeo\.isManual\) \{[\s\S]*?if \(navigator\.permissions && navigator\.permissions\.query\) \{[\s\S]*?try \{[\s\S]*?navigator\.permissions\.query\(\{ name: 'geolocation' \}\)\.then\(res => \{[\s\S]*?if \(res\.state === 'granted'\) \{[\s\S]*?requestPermission\(\);[\s\S]*?\}[\s\S]*?\}\)\.catch\(\(\) => \{\}\);[\s\S]*?\} catch\(e\) \{\}[\s\S]*?\}[\s\S]*?\}/;

const autoReq = `// Automatically ask for location access on mount
    if (globalGeo.status === 'idle' && !globalGeo.isManual) {
      requestPermission();
    }`;

code = code.replace(regex, autoReq);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Set auto request location');
