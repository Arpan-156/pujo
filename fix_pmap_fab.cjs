const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const fab = `
                <button 
                  onClick={() => {
                    requestPermission();
                    if (geo.lat && geo.lng && mapObj) {
                      mapObj.flyTo([geo.lat, geo.lng], 16);
                    }
                  }}
                  title="Locate Me"
                  style={{ position: 'absolute', bottom: '24px', right: '16px', zIndex: 400, width: '48px', height: '48px', borderRadius: '50%', background: '#fff', color: '#000', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'grid', placeContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </button>
`;

// wait, the icon for "Locate Me" should be a target or crosshair.
const locateIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;

const realFab = `
                <button 
                  onClick={() => {
                    if (geo.status !== 'success') requestPermission();
                    if (geo.lat && geo.lng && mapObj) {
                      mapObj.flyTo([geo.lat, geo.lng], 16, { duration: 1.5 });
                    }
                  }}
                  title="Recenter on my location"
                  style={{ position: 'absolute', bottom: '24px', right: '16px', zIndex: 400, width: '48px', height: '48px', borderRadius: '50%', background: '#fff', color: '#1d4ed8', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', display: 'grid', placeContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M12 4a8 8 0 0 0-8 8"></path><path d="M12 20a8 8 0 0 0 8-8"></path><path d="M20 12a8 8 0 0 0-8-8"></path><path d="M4 12a8 8 0 0 0 8 8"></path></svg>
                </button>
`;

code = code.replace(
  /<\/MapContainer>/,
  `</MapContainer>\n${realFab}`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added Locate Me FAB');
