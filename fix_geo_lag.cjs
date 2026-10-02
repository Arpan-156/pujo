const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /watcherId = navigator\.geolocation\.watchPosition\([\s\S]*?\(pos\) => \{[\s\S]*?const \{ latitude, longitude \} = pos\.coords;[\s\S]*?emit\(\{[\s\S]*?active: true,[\s\S]*?lat: latitude,[\s\S]*?lng: longitude,[\s\S]*?error: null,[\s\S]*?area: getNearestArea\(latitude, longitude\),[\s\S]*?status: 'success',[\s\S]*?isManual: false[\s\S]*?\}\);[\s\S]*?\},/;

const newWatch = `let lastEmitTime = 0;
    watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        
        if (now - lastEmitTime < 3000) return; // Max once every 3 seconds
        
        if (globalGeo.lat && globalGeo.lng) {
           const dist = getDistance(globalGeo.lat, globalGeo.lng, latitude, longitude);
           if (dist < 0.005) return; // Don't update if moved less than 5 meters
        }
        
        lastEmitTime = now;
        emit({
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: getNearestArea(latitude, longitude),
          status: 'success',
          isManual: false
        });
      },`;

if (regex.test(code)) {
  code = code.replace(regex, newWatch);
  fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
  console.log('Fixed geo lag');
} else {
  console.log('Regex did not match geo.ts');
}
