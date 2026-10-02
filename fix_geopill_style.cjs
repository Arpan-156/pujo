const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

code = code.replace(/export function GeoPill\(\) \{[\s\S]*\}\s*$/, `export function GeoPill() {
  const { geo, requestPermission } = useGeo();
  const [loading, setLoading] = useState(false);

  return (
    <button className="geo-pill-plain" onClick={() => {
      setLoading(true);
      requestPermission();
      setTimeout(() => setLoading(false), 800);
    }} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--f-display)', fontSize: '1.45rem', fontWeight: 500, padding: '0 8px', letterSpacing: '0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
      {geo.status === 'success' ? geo.area : geo.status === 'loading' ? 'Locating...' : 'Enable GPS'}
      <RefreshCw size={15} strokeWidth={2.5} style={{ animation: loading ? 'spin 1s linear infinite' : 'none', opacity: 0.9, marginTop: '2px', color: '#fff' }} />
    </button>
  );
}
`);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed GeoPill styling');
