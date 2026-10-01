const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const oldMaps = `  const openGoogleMaps = () => {
    if (!route || route.pandals.length === 0) return;
    const origin = route.pandals[0].lat + ',' + route.pandals[0].lng;
    const destination = route.pandals[route.pandals.length - 1].lat + ',' + route.pandals[route.pandals.length - 1].lng;
    
    let waypointsArr = route.pandals.slice(1, -1);
    if (waypointsArr.length > 8) {
      const step = waypointsArr.length / 8;
      waypointsArr = Array.from({ length: 8 }, (_, i) => waypointsArr[Math.floor(i * step)]);
    }
    const waypoints = waypointsArr.map((p: any) => p.lat + ',' + p.lng).join('|');
    
    let mode = 'driving';
    if (transport === 'walk') mode = 'walking';
    
    const url = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + destination + '&waypoints=' + waypoints + '&travelmode=' + mode;
    window.open(url, '_blank');
  };`;

const newMaps = `  const openGoogleMaps = () => {
    if (!route || route.pandals.length === 0) return;
    const getQuery = (p: any) => p.lat && p.lng ? \`\${p.lat},\${p.lng}\` : encodeURIComponent(\`\${p.name}, Burdwan\`);
    
    const origin = getQuery(route.pandals[0]);
    const destination = getQuery(route.pandals[route.pandals.length - 1]);
    
    let waypointsArr = route.pandals.slice(1, -1);
    if (waypointsArr.length > 8) {
      const step = waypointsArr.length / 8;
      waypointsArr = Array.from({ length: 8 }, (_, i) => waypointsArr[Math.floor(i * step)]);
    }
    const waypoints = waypointsArr.map(getQuery).join('%7C'); // URL encoded pipe
    
    let mode = 'driving';
    if (transport === 'walk') mode = 'walking';
    
    const url = \`https://www.google.com/maps/dir/?api=1&origin=\${origin}&destination=\${destination}&waypoints=\${waypoints}&travelmode=\${mode}\`;
    window.open(url, '_blank');
  };`;

if (code.includes(oldMaps)) {
  code = code.replace(oldMaps, newMaps);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log("Maps routing fixed!");
} else {
  console.log("Could not find openGoogleMaps in Pages.tsx");
}
