const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

// Replace  with &deg; or \u00B0
code = code.replace(//g, '\\u00B0');

// Replace {geo.active ? 'GPS Active' : 'Locating...'} 
// with logic based on status
code = code.replace(
  `{geo.active ? 'GPS Active' : 'Locating...'}` ,
  `{geo.status === 'success' ? 'GPS Active' : geo.status === 'loading' ? 'Locating...' : geo.status === 'error' ? 'Location Error' : 'GPS Inactive'}`
);

// We need to change the behavior: if it's idle, we show a button to request permission.
// Let's replace the whole geo-text div.

const newGeoText = `
        <div className="geo-text">
          {geo.status === 'success' ? (
            <>
              <h4>GPS Active {geo.lat && <span>({geo.lat.toFixed(4)}\\u00B0 N, {geo.lng?.toFixed(4)}\\u00B0 E)</span>}</h4>
              <p>Radius: {radius} km from {geo.area}</p>
            </>
          ) : geo.status === 'loading' ? (
            <h4>Locating...</h4>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h4 style={{ color: geo.status === 'error' ? '#ef4444' : '#fff' }}>
                {geo.status === 'error' ? 'Permission Denied' : 'Location Not Enabled'}
              </h4>
              <button className="geo-pill" onClick={requestPermission} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '4px 12px', fontSize: '0.8rem' }}>
                Enable GPS
              </button>
            </div>
          )}
        </div>
`;

code = code.replace(
  /<div className="geo-text">[\s\S]*?<\/div>/,
  newGeoText
);

// Also need to update GeoBar props to use requestPermission
code = code.replace(
  'const { geo, refresh } = useGeo();',
  'const { geo, requestPermission } = useGeo();'
);
code = code.replace(
  'refresh();\n    if (onRefresh) await onRefresh();',
  'requestPermission();\n    if (onRefresh) await onRefresh();'
);

// GeoPill update
code = code.replace(
  'export function GeoPill() {\n  const { geo, refresh } = useGeo();',
  'export function GeoPill() {\n  const { geo, requestPermission } = useGeo();'
);
code = code.replace(
  'refresh();\n      setTimeout',
  'requestPermission();\n      setTimeout'
);

// GeoPill text if inactive
code = code.replace(
  '{geo.area}',
  '{geo.status === "success" ? geo.area : "Enable GPS"}'
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed GeoBar.tsx');
