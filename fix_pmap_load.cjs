const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Replace the dependency on geo.lat/lng for POI fetching
const oldEffect = `useEffect(() => {
    if (geo.status !== 'success' || !geo.lat || !geo.lng) return;
    if (activePoiTypes.size === 0) {
      setPois([]);
      return;
    }
    
    const lat = geo.lat;
    const lng = geo.lng;
    
    const timer = setTimeout(() => {
      fetchPOIs(lat, lng, 3000, Array.from(activePoiTypes)).then(res => setPois(res));
    }, 800);
    return () => clearTimeout(timer);
  }, [geo.status, geo.lat, geo.lng, activePoiTypes]);`;

const newEffect = `useEffect(() => {
    if (activePoiTypes.size === 0) {
      setPois([]);
      return;
    }
    
    // Fallback to Burdwan center if GPS is not yet active
    const lat = geo.lat || 23.232421;
    const lng = geo.lng || 87.861479;
    
    const timer = setTimeout(() => {
      fetchPOIs(lat, lng, 3000, Array.from(activePoiTypes)).then(res => setPois(res));
    }, 300); // reduced debounce for hardcoded speed
    return () => clearTimeout(timer);
  }, [geo.lat, geo.lng, activePoiTypes]);`;

code = code.replace(oldEffect, newEffect);

// Wait, the formatting in the file might be slightly different. Let's use regex.
const regex = /useEffect\(\(\) => \{\s*if \(geo\.status !== 'success' \|\| !geo\.lat \|\| !geo\.lng\) return;\s*if \(activePoiTypes\.size === 0\) \{\s*setPois\(\[\]\);\s*return;\s*\}\s*const lat = geo\.lat;\s*const lng = geo\.lng;\s*const timer = setTimeout\(\(\) => \{\s*fetchPOIs\(lat, lng, 3000, Array\.from\(activePoiTypes\)\)\.then\(res => setPois\(res\)\);\s*\}, 800\);\s*return \(\) => clearTimeout\(timer\);\s*\}, \[geo\.status, geo\.lat, geo\.lng, activePoiTypes\]\);/g;

code = code.replace(regex, newEffect);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI loading effect');
