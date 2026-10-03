const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// 1. Add deselect logic
code = code.replace(/onClick=\{\(\) => setSel\(p\.slug\)\}/g, "onClick={() => setSel(sel === p.slug ? null : p.slug)}");
code = code.replace(/eventHandlers=\{\{ click: \(\) => setSel\(p\.slug\) \}\}/g, "eventHandlers={{ click: () => setSel(sel === p.slug ? null : p.slug) }}");

// 2. Add RecenterControl component definition
const mapCompRegex = /export function PujaMap\(\{ className = '' \}: \{ className\?: string \}\) \{/;

const recenterComp = `
const RecenterControl = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  return (
    <div className="leaflet-top leaflet-right" style={{ zIndex: 1000, pointerEvents: 'none' }}>
      <div className="leaflet-control leaflet-bar" style={{ margin: '10px', pointerEvents: 'auto' }}>
        <button 
          onClick={(e) => { e.preventDefault(); map.flyTo(center, 15, { animate: true, duration: 1.5 }); }}
          style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: 'none', cursor: 'pointer', color: '#000', borderRadius: '4px', boxShadow: '0 1px 5px rgba(0,0,0,0.65)' }}
          title="Recenter Map"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
        </button>
      </div>
    </div>
  );
};
`;

if (!code.includes('RecenterControl')) {
  code = code.replace(mapCompRegex, recenterComp + '\nexport function PujaMap({ className = \'\' }: { className?: string }) {');
}

// 3. Inject it inside <MapContainer>
const mapContainerRegex = /<MapContainer center=\{mapCenter\} zoom=\{14\} scrollWheelZoom=\{true\} style=\{\{ flex: 1, width: '100%' \}\}>/;
const newMapContainer = `<MapContainer center={mapCenter} zoom={14} scrollWheelZoom={true} style={{ flex: 1, width: '100%' }}>\n                  <RecenterControl center={mapCenter} />`;

if (!code.includes('<RecenterControl center={mapCenter} />')) {
  code = code.replace(mapContainerRegex, newMapContainer);
}

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Injected recenter control and deselect logic');
