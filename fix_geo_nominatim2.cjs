const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /globalGeo = \{\s*\.\.\.globalGeo,\s*active: true,\s*lat: latitude,\s*lng: longitude,\s*error: null,\s*area: [\s\S]*?status: 'success',\s*isManual: false\s*\};\s*localStorage\.setItem\('pujo_geo', JSON\.stringify\(globalGeo\)\);\s*emit\(globalGeo\);/m;

const fix = `const syncArea = getNearestArea(latitude, longitude);
        globalGeo = {
          ...globalGeo,
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: globalGeo.area && globalGeo.area !== 'Your Location' && globalGeo.area !== 'Outside Burdwan' && globalGeo.area !== 'Burdwan' ? globalGeo.area : syncArea,
          status: 'success',
          isManual: false
        };
        
        localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
        emit(globalGeo);

        // Fetch exact real-world location name lazily if they are out of town
        if (syncArea === 'Your Location') {
          fetchExactLocationName(latitude, longitude).then(realName => {
            if (realName && globalGeo.lat === latitude && globalGeo.lng === longitude) {
              globalGeo = { ...globalGeo, area: realName };
              localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
              emit(globalGeo);
            }
          });
        }`;

code = code.replace(regex, fix);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed Nominatim logic');
