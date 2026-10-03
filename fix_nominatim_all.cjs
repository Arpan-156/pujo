const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /\/\/ Fetch exact real-world location name lazily if they are out of town\s*if \(syncArea === 'Your Location'\) \{\s*fetchExactLocationName\(latitude, longitude\)\.then\(realName => \{\s*if \(realName && globalGeo\.lat === latitude && globalGeo\.lng === longitude\) \{\s*globalGeo = \{ \.\.\.globalGeo, area: realName \};\s*localStorage\.setItem\('pujo_geo', JSON\.stringify\(globalGeo\)\);\s*emit\(globalGeo\);\s*\}\s*\}\);\s*\}/m;

const fix = `// Always fetch exact real-world location name lazily for maximum accuracy
        fetchExactLocationName(latitude, longitude).then(realName => {
          if (realName && globalGeo.lat === latitude && globalGeo.lng === longitude && globalGeo.area !== realName) {
            globalGeo = { ...globalGeo, area: realName };
            localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
            emit(globalGeo);
          }
        });`;

code = code.replace(regex, fix);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed nominatim for all');
