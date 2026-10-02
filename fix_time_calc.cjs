const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const mappedPandals = finalPandals\.map\(\(p, i\) => \{[\s\S]*?timeDesc\n\s*\}\);/m;

const replacement = `
    let totalDist = 0;
    let prevLat = (geo.active && geo.lat) ? geo.lat : null;
    let prevLng = (geo.active && geo.lng) ? geo.lng : null;

    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (p.lat && p.lng && prevLat && prevLng) {
        totalDist += getDistance(prevLat, prevLng, p.lat, p.lng);
      }
      if (p.lat && p.lng) {
        prevLat = p.lat;
        prevLng = p.lng;
      }

      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        if (p.lat && p.lng && nextP.lat && nextP.lng) {
          const dist = getDistance(p.lat, p.lng, nextP.lat, nextP.lng);
          if (dist < 0.5) transit = 'Walk 5-10 mins';
          else if (dist < 1.5) transit = transport === 'walk' ? 'Walk 15-20 mins' : 'Toto 5-10 mins';
          else transit = transport === 'toto' ? 'Toto 15+ mins' : 'Drive/Auto 10 mins';
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        lat: p.lat,
        lng: p.lng,
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
`;

code = code.replace(regex, replacement.trim());
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Replaced calculate time logic');
