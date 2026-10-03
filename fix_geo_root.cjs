const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const regex = /watcherId = navigator\.geolocation\.watchPosition\([\s\S]*?\{ timeout: 15000, enableHighAccuracy: true, maximumAge: 0 \}\s*\);/m;

const newWatch = `watcherId = navigator.geolocation.watchPosition(
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
        
        // Update the module-level state so new components get the correct state
        globalGeo = {
          ...globalGeo,
          active: true,
          lat: latitude,
          lng: longitude,
          error: null,
          area: getNearestArea(latitude, longitude),
          status: 'success',
          isManual: false
        };
        
        // Save to cache and broadcast to all React components
        localStorage.setItem('pujo_geo', JSON.stringify(globalGeo));
        emit(globalGeo);
      },
      (err) => {
        globalGeo = { ...globalGeo, active: false, status: 'error', error: err.message, isManual: false };
        emit(globalGeo);
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );`;

code = code.replace(regex, newWatch);
fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo root issue');
