const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Add selectedCustom state
code = code.replace(
  "const [transport, setTransport] = useState('toto');",
  "const [transport, setTransport] = useState('toto');\n    const [selectedCustom, setSelectedCustom] = useState<string[]>([]);"
);

// Add Nearest Neighbor sorting logic before generate
const nnLogic = `
    const sortNearestNeighbor = (pool: any[], startLat: number, startLng: number) => {
      let currentLat = startLat;
      let currentLng = startLng;
      let unvisited = [...pool];
      let sorted = [];
      
      while(unvisited.length > 0) {
        let closestIdx = 0;
        let minDist = 999999;
        for (let i=0; i<unvisited.length; i++) {
          const p = unvisited[i];
          if (!p.lat || !p.lng) {
            if (999 < minDist) { minDist = 999; closestIdx = i; }
            continue;
          }
          const d = getDistance(currentLat, currentLng, p.lat, p.lng);
          if (d < minDist) { minDist = d; closestIdx = i; }
        }
        const closest = unvisited.splice(closestIdx, 1)[0];
        sorted.push(closest);
        if (closest.lat && closest.lng) {
          currentLat = closest.lat; currentLng = closest.lng;
        }
      }
      return sorted;
    };
`;
code = code.replace(
  'const generate = () => {',
  nnLogic + '\n    const generate = () => {'
);

// Modify generate to use selectedCustom
const genLogic = `
      let finalPandals = [];
      let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
      
      if (selectedCustom.length > 0) {
        const customPool = pujas.filter(p => selectedCustom.includes(p.slug));
        const startLat = (geo.active && geo.lat) ? geo.lat : (customPool.find(p=>p.lat)?.lat || 23.2324);
        const startLng = (geo.active && geo.lng) ? geo.lng : (customPool.find(p=>p.lng)?.lng || 87.8615);
        finalPandals = sortNearestNeighbor(customPool, startLat, startLng);
        timeDesc = \`Custom route optimized for shortest travel distance covering \${finalPandals.length} pandals.\`;
      } else {
        let pool = [...pujas];
        if (geo.active && geo.lat && geo.lng) {
          pool = pool.filter(p => {
            if (!p.lat || !p.lng) return true;
            return getDistance(geo.lat!, geo.lng!, p.lat, p.lng) <= 50;
          });
        } else {
          pool = pool.filter(p => p.zone === 'Bardhaman Town');
        }
    
        let vibePujas = pool.filter(p => {
          if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
          if (vibe === 'carnival') return p.categories.includes('Community Puja');
          if (vibe === 'accessible') return p.categories.includes('Traditional');
          return true;
        });
        if (vibePujas.length === 0) vibePujas = pool;
    
        let count = 5;
        if (time === 'standard') { count = 8; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
        if (time === 'marathon') { count = 12; timeDesc = 'An all-night marathon covering maximum ground!'; }
    
        if (geo.active && geo.lat && geo.lng) {
          vibePujas.sort((a, b) => {
            const dA = (a.lat && a.lng) ? getDistance(geo.lat!, geo.lng!, a.lat, a.lng) : 999;
            const dB = (b.lat && b.lng) ? getDistance(geo.lat!, geo.lng!, b.lat, b.lng) : 999;
            return dA - dB;
          });
        }
        finalPandals = vibePujas.slice(0, count);
      }
`;
code = code.replace(
  /let pool = \[\.\.\.pujas\];[\s\S]*?let finalPandals = vibePujas\.slice\(0, count\);/,
  genLogic
);

// UI for Custom Selection
const customUI = `
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Custom Pandal Selection (Optional)</h3>
              <p style={{ color: 'var(--mute)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>Select specific pandals you want to visit, and we'll calculate the shortest path. If you select any here, we will ignore the Time and Vibe preferences above.</p>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'rgba(20,8,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {pujas.map(p => (
                  <label key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', background: selectedCustom.includes(p.slug) ? 'rgba(233,181,88,0.15)' : 'transparent', borderRadius: '4px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedCustom.includes(p.slug)} onChange={(e) => {
                      if (e.target.checked) setSelectedCustom([...selectedCustom, p.slug]);
                      else setSelectedCustom(selectedCustom.filter(s => s !== p.slug));
                    }} style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }} />
                    <div>
                      <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>{p.name}</h4>
                      <p style={{ margin: 0, color: 'var(--mute)', fontSize: '0.8rem' }}>{p.area}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
`;

code = code.replace(
  '</button>\n          </div>\n        ) : (',
  customUI + '\n            <button className="rp-btn" onClick={generate}>\n              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>\n              Generate Optimized Route\n            </button>\n          </div>\n        ) : ('
);
// Remove the existing generate button so we don't duplicate it
code = code.replace(/<button className="rp-btn" onClick=\{generate\}>[\s\S]*?<\/button>\n\s*<\/div>\n\s*\) : \(/, customUI + '\n            <button className="rp-btn" onClick={generate}>\n              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>\n              Generate Optimized Route\n            </button>\n          </div>\n        ) : (');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Implemented Custom Selection logic');
