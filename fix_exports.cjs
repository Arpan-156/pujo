const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const exportsCode = `

export function MiniMap({ name, lat, lng }: { x?: number; y?: number; name: string; lat?: number; lng?: number }) {
  const mapQuery = lat && lng ? \`\${lat},\${lng}\` : encodeURIComponent(\`\${name} Durga Puja, Bardhaman\`);

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(233, 181, 88, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }}
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade" 
        src={\`https://maps.google.com/maps?q=\${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed\`}
      ></iframe>
    </div>
  );
}


export function RouteMap({ route }: { route: any }) {
  if (!route || !route.pandals || route.pandals.length === 0) return null;
  const mapCenter = [route.pandals[0].lat, route.pandals[0].lng] as [number, number];
  return (
    <div className="pmap-map-container" style={{ height: '400px', marginTop: '20px', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
        {route.pandals.map((p: any, i: number) => {
          if (!p.lat || !p.lng) return null;
          return (
            <Marker key={i} position={[p.lat, p.lng]} icon={activePujaIcon}>
              <Popup>
                <strong>{p.name}</strong><br/>
                {i + 1}. {p.transit}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
`;

code += exportsCode;
fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Restored MiniMap and RouteMap');
