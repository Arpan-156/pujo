const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /let lastEmitTime = 0;[\s\S]*?watcherId = navigator\.geolocation\.watchPosition\([\s\S]*?\(pos\) => \{[\s\S]*?status: 'success',[\s\S]*?isManual: false[\s\S]*?\}\);[\s\S]*?\},/;

const newWatch = `let lastEmitTime = 0;
    watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = Date.now();
        
        // Always clear loading state immediately!
        if (globalGeo.status === 'loading') {
          globalGeo.status = 'success';
        }

        // Throttle updates to UI components to prevent lag
        if (now - lastEmitTime < 2000 && globalGeo.lat && globalGeo.lng) {
           const dist = getDistance(globalGeo.lat, globalGeo.lng, latitude, longitude);
           if (dist < 0.002) {
             // Just update status to success without triggering a massive coordinate change
             emit({ ...globalGeo, active: true, status: 'success', isManual: false, error: null });
             return;
           }
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

code = code.replace(regex, newWatch);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo throttle getting stuck on loading');
