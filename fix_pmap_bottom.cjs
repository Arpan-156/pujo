const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const injection = `
        <div className="wrap" style={{ marginTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div style={{ background: 'rgba(20,8,9,0.5)', border: '1px solid var(--line)', padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 Nearby Pandals
              </h3>
              {validPujas.slice(0, 4).map(p => (
                 <div key={p.slug} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#fff' }}>{p.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--mute)', fontSize: '0.85rem' }}>
                       <span>{p.location}</span>
                       {p.distance !== undefined && <span style={{ color: 'var(--gold)' }}>{(p.distance * 1000).toFixed(0)}m away</span>}
                    </div>
                 </div>
              ))}
            </div>

            <div style={{ background: 'rgba(20,8,9,0.5)', border: '1px solid var(--line)', padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--gold)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 Essential Services
              </h3>
              <p style={{ color: 'var(--mute)', fontSize: '0.85rem', marginBottom: '16px' }}>Toggle categories on the map to find specific places. Here are the closest results:</p>
              {pois.length > 0 ? (
                pois.slice(0, 5).map(poi => (
                  <div key={poi.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: '#fff', textTransform: 'capitalize' }}>{poi.type}: {poi.name || 'Unnamed Location'}</h4>
                    <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>
                      {(poi.dist * 1000).toFixed(0)}m away
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic', padding: '20px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                  Select "Hospital", "Police", or "ATM" on the map to see closest results here.
                </div>
              )}
            </div>

            <div style={{ background: 'rgba(20,8,9,0.5)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '24px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}></div>
              <h3 style={{ color: '#ef4444', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                 Emergency Helplines
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
                <li style={{ marginBottom: '16px' }}>
                  <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Police Station</div>
                  <a href="tel:100" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>100 / 0342-2662495</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Burdwan Medical College (BMCH)</div>
                  <a href="tel:03422558641" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>0342-2558641</a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <div style={{ color: 'var(--mute)', fontSize: '0.85rem' }}>Women's Helpline / Ambulance</div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="tel:1091" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>1091</a>
                    <a href="tel:102" style={{ color: '#fff', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>102</a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
`;

code = code.replace(
  /<\/div>\s*<\/section>/,
  `</div>\n${injection}\n      </section>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Injected suggestions and helplines below map');
