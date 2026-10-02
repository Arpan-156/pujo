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
    }} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--f-display)', fontSize: '1.4rem', fontWeight: 500 }}>
      <span style={{ color: 'var(--mute)', opacity: 0.5, margin: '0 4px', fontFamily: 'sans-serif' }}>|</span>
      {geo.status === 'success' ? geo.area : geo.status === 'loading' ? 'Locating...' : 'Enable GPS'}
      <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none', opacity: 0.8, marginTop: '2px' }} />
    </button>
  );
}
`);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed GeoPill fully');
