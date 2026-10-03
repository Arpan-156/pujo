const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /watcherId = navigator\.geolocation\.watchPosition\([\s\S]*?\{ timeout: 15000, enableHighAccuracy: true, maximumAge: 0 \}\s*\);/m;

const fix = `watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const now = Date.now();
        
        // If we already have a lock, ignore very coarse cell-tower jumps
        if (globalGeo.status === 'success' && accuracy && accuracy > 2000) {
          return; 
        }

        const isInitialLock = globalGeo.status !== 'success';
        
        // Throttle updates strictly to prevent React re-render lag (unless it's the very first lock)
        if (!isInitialLock && now - lastEmitTime < 2000) {
          return;
        }
        
        lastEmitTime = now;
        
        const syncArea = getNearestArea(latitude, longitude);

        // Keep existing globalGeo area if it was already fetched via Nominatim, otherwise use syncArea
        const newArea = (globalGeo.area && globalGeo.area !== 'Your Location' && globalGeo.area !== 'Outside Burdwan' && globalGeo.area !== 'Burdwan' && !AREAS.some(a => a.name === globalGeo.area)) ? globalGeo.area : syncArea;
        
        globalGeo = {
          ...globalGeo,
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: newArea,
          status: 'success',
          isManual: false
        };
        
        localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
        emit(globalGeo);

        // Always fetch exact real-world location name lazily for maximum accuracy
        fetchExactLocationName(latitude, longitude).then(realName => {
          if (realName && globalGeo.lat === latitude && globalGeo.lng === longitude && globalGeo.area !== realName) {
            globalGeo = { ...globalGeo, area: realName };
            localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
            emit(globalGeo);
          }
        });
      },
      (err) => {
        globalGeo = { ...globalGeo, active: false, status: 'error', error: err.message, isManual: false };
        emit(globalGeo);
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );`;

if (code.match(regex)) {
  code = code.replace(regex, fix);
  fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
  console.log('Fixed properly');
} else {
  console.log('Regex did NOT match');
}
