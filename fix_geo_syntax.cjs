const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

const correctUseEffect = `
  useEffect(() => {
    // Only auto-fetch if permission was ALREADY granted (silent).
    if (geo.status === 'idle' && !geo.isManual) {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          navigator.permissions.query({ name: 'geolocation' }).then(res => {
            if (res.state === 'granted') {
              requestPermission();
            }
          }).catch(() => {});
        } catch(e) {}
      }
    }
  }, []);
`;

code = code.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, correctUseEffect.trim());

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
console.log('Fixed geo.ts syntax');
