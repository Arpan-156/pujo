const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

// Find the useEffect block
code = code.replace(
  /useEffect\(\(\) => \{[\s\S]*?\}\, \[requestPermission, geo\.status, geo\.isManual\]\);/,
  `useEffect(() => {
    if (geo.status === 'idle' && !geo.isManual) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
          if (res.state === 'granted' || res.state === 'prompt') {
            requestPermission();
          }
        });
      } else {
        requestPermission();
      }
    }
  }, [requestPermission, geo.status, geo.isManual]);`
);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed auto detect');
