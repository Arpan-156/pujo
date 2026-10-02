const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Add useMemo to imports if not already there
if (!code.includes('useMemo')) {
  code = code.replace('useEffect, useState', 'useEffect, useState, useMemo');
}

// Add nearbyPandals logic
const nearbyLogic = `
  const nearbyPandals = useMemo(() => {
    if (!geo.active || !geo.lat || !geo.lng) return [];
    const withDist = pujas.filter(p => p.lat && p.lng).map(p => ({
      ...p,
      dist: getDistance(geo.lat, geo.lng, p.lat, p.lng)
    }));
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist.slice(0, 4);
  }, [pujas, geo]);
`;

code = code.replace(
  'const { pujas } = useData();\n  const { geo } = useGeo();',
  'const { pujas } = useData();\n  const { geo } = useGeo();\n' + nearbyLogic
);

// Inject UI
const nearbyUI = `
            {nearbyPandals.length > 0 && (
              <div style={{ marginBottom: '30px', background: 'rgba(233,181,88,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(233,181,88,0.2)' }}>
                <h3 style={{ color: 'var(--gold)', margin: '0 0 16px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Near You Right Now
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {nearbyPandals.map(p => (
                    <Link key={p.slug} to={\`/puja/\${p.slug}\`} style={{ display: 'block', background: 'rgba(20,8,9,0.8)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
                      <h4 style={{ margin: '0 0 4px', color: '#fff', fontSize: '1rem' }}>{p.name}</h4>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{p.dist.toFixed(1)} km away • {p.theme || 'Traditional'}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
`;

code = code.replace(
  '<div style={{ animation: \'popIn 0.5s ease\' }}>\n            <div style={{ marginBottom: \'30px\', marginTop: \'20px\' }}>',
  '<div style={{ animation: \'popIn 0.5s ease\' }}>\n' + nearbyUI + '\n            <div style={{ marginBottom: \'30px\', marginTop: \'20px\' }}>'
);

// Fix the radius bug
code = code.replace(
  'return getDistance(geo.lat!, geo.lng!, p.lat, p.lng) <= radius;',
  'return getDistance(geo.lat!, geo.lng!, p.lat, p.lng) <= 50;'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Implemented Nearby Pandals logic');
