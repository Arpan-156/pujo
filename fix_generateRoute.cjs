const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const generateRouteStart = code.indexOf('const generateRoute = (e: FormEvent) => {');
const openGoogleMapsStart = code.indexOf('const openGoogleMaps = () => {');

if (generateRouteStart !== -1 && openGoogleMapsStart !== -1) {
  const newGenerateRoute = `const generateRoute = (e: FormEvent) => {
    e.preventDefault();
    let finalPandals = [];
    const count = parseInt(time);

    if (routeMode === 'custom') {
      finalPandals = selectedCustom.map(slug => pujas.find(p => p.slug === slug)).filter(Boolean);
      if (geo.active && geo.lat && geo.lng) {
        finalPandals = sortNearestNeighbor(finalPandals, geo.lat, geo.lng);
      }
    } else {
      let vibePujas = pujas;
      if (vibe === 'theme') vibePujas = pujas.filter(p => p.theme && p.theme.length > 3);
      if (vibe === 'heritage') vibePujas = pujas.filter(p => !p.theme || p.theme.toLowerCase().includes('traditional'));
      
      if (geo.active && geo.lat && geo.lng) {
        vibePujas.sort((a, b) => {
          const dA = (a.map?.lat && a.map?.lng) ? getDistance(geo.lat, geo.lng, a.map.lat, a.map.lng) : 999;
          const dB = (b.map?.lat && b.map?.lng) ? getDistance(geo.lat, geo.lng, b.map.lat, b.map.lng) : 999;
          return dA - dB;
        });
      }
      finalPandals = vibePujas.slice(0, count);
    }

    let totalDist = 0;
    let prevLat = (geo.active && geo.lat) ? geo.lat : null;
    let prevLng = (geo.active && geo.lng) ? geo.lng : null;

    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (p.map?.lat && p.map?.lng && prevLat && prevLng) {
        totalDist += getDistance(prevLat, prevLng, p.map.lat, p.map.lng);
      }
      if (p.map?.lat && p.map?.lng) {
        prevLat = p.map.lat;
        prevLng = p.map.lng;
      }

      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        if (p.map?.lat && p.map?.lng && nextP.map?.lat && nextP.map?.lng) {
          const dist = getDistance(p.map.lat, p.map.lng, nextP.map.lat, nextP.map.lng);
          if (dist < 0.5) transit = 'Walk 5-10 mins';
          else if (dist < 1.5) transit = transport === 'walk' ? 'Walk 15-20 mins' : 'Toto 5-10 mins';
          else transit = transport === 'toto' ? 'Toto 15+ mins' : 'Drive/Auto 10 mins';
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        lat: p.map?.lat,
        lng: p.map?.lng,
        tip: p.featured ? 'Award Winner! Highly recommended.' : 'Expect crowds during peak hours.',
        transit
      };
    });

    let speed = 4.5;
    if (transport === 'toto') speed = 12;
    if (transport === 'car') speed = 18;
    
    const travelMins = Math.round((totalDist / speed) * 60);
    const viewMins = finalPandals.length * 15;
    const totalMins = travelMins + viewMins;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    const timeStr = h > 0 ? \`\${h} hr \${m} mins\` : \`\${m} mins\`;
    const transStr = transport.charAt(0).toUpperCase() + transport.slice(1);
    
    const finalTimeDesc = \`Estimated: ~\${timeStr} by \${transStr} (\${totalDist.toFixed(1)} km total)\`;

    setRoute({
      title: geo.active ? \`Dynamic Route from \${geo.area}\` : (routeMode === 'custom' ? 'Your Custom Puja Trail' : 'Specialized Route'),
      desc: geo.active ? \`Optimized for your realtime location.\` : 'A robust mix of everything that makes Burdwan Durga Puja famous.',
      pandals: mappedPandals,
      timeDesc: finalTimeDesc
    });
  };

  `;

  const before = code.substring(0, generateRouteStart);
  const after = code.substring(openGoogleMapsStart);
  fs.writeFileSync('src/pages/Pages.tsx', before + newGenerateRoute + after, 'utf8');
  console.log('Fixed generateRoute entirely');
}
