const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

const regex = /<button className="geo-pill-plain"[\s\S]*?<\/button>/;

const newPill = `<button className="geo-pill" onClick={() => {
        setLoading(true);
        requestPermission();
        setTimeout(() => setLoading(false), 800);
      }} style={{ background: 'transparent', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, padding: '4px 12px', borderRadius: '99px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)', animation: loading ? 'pulse 1s infinite' : 'none' }}></div>
        {geo.status === 'success' ? geo.area : geo.status === 'loading' ? 'Locating...' : 'Enable GPS'}
      </button>`;

code = code.replace(regex, newPill);
fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Reverted GeoPill to green pill');
