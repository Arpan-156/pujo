const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const touristSpotsCode = `
const BURDWAN_SPOTS = [
  { id: 't1', name: 'Curzon Gate', type: 'Monument', lat: 23.2393, lon: 87.8631, desc: 'Historical gateway built in 1903' },
  { id: 't2', name: '108 Shiva Temple', type: 'Temple', lat: 23.2355, lon: 87.8931, desc: 'Nawab Hat, 108 distinct Shiva lingas' },
  { id: 't3', name: 'Krishnasayar Park', type: 'Park / Lake', lat: 23.2504, lon: 87.8542, desc: 'Beautiful lake dug by King Krishnachandra' },
  { id: 't4', name: 'Sarbamangala Temple', type: 'Temple', lat: 23.2424, lon: 87.8639, desc: 'Ancient temple of goddess Sarbamangala' },
  { id: 't5', name: 'Meghnad Saha Planetarium', type: 'Science / Museum', lat: 23.2483, lon: 87.8576, desc: 'Built by University of Burdwan' },
  { id: 't6', name: 'Burdwan Rajbari', type: 'Palace', lat: 23.2541, lon: 87.8504, desc: 'Palace of the Bardhaman Maharaja' }
];
`;

// Insert the constant at the top of the file before `export function PujaMap`
code = code.replace(
  /export function PujaMap/,
  touristSpotsCode + '\nexport function PujaMap'
);

// Now let's inject the new "Visiting Spots" card right after the "Essential Services" card.
const visitingSpotsCard = `
                  <div style={{ background: 'linear-gradient(145deg, rgba(20, 30, 20, 0.8) 0%, rgba(10, 15, 10, 0.9) 100%)', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ color: '#10B981', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                       Visiting Spots
                    </h3>
                    <p style={{ color: 'var(--mute)', fontSize: '0.85rem', marginBottom: '16px' }}>Top attractions and heritage sites around Burdwan:</p>
                    
                    {BURDWAN_SPOTS.map(spot => {
                      const dist = (geo.lat && geo.lng) ? getDistance(geo.lat, geo.lng, spot.lat, spot.lon) : undefined;
                      return (
                        <div key={spot.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#fff' }}>{spot.name}</h4>
                            <div style={{ color: 'var(--mute)', fontSize: '0.8rem' }}>{spot.type} &bull; {spot.desc}</div>
                          </div>
                          {dist !== undefined && (
                            <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                              {dist.toFixed(1)} km
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
`;

code = code.replace(
  /<div style=\{\{ background: 'linear-gradient\(145deg, rgba\(40, 10, 10, 0\.8\)/,
  visitingSpotsCard + "\n\n                  <div style={{ background: 'linear-gradient(145deg, rgba(40, 10, 10, 0.8)"
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Injected Burdwan visiting spots hardcoded list');
