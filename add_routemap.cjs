const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const routeMapCode = `
export function RouteMap({ route }: { route: any }) {
  if (!route || !route.pandals || route.pandals.length === 0) return null;
  const mapCenter = [route.pandals[0].lat, route.pandals[0].lng] as [number, number];
  return (
    <div className="pmap-map-container" style={{ height: '400px', marginTop: '20px' }}>
      <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%', background: '#eee' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route.pandals.map((p: any, i: number) => {
          if (!p.lat || !p.lng) return null;
          return (
            <Marker key={i} position={[p.lat, p.lng]} icon={createPujaIcon(true)}>
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

code = code + '\n' + routeMapCode;

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added RouteMap');
