const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /const RecenterControl = \(\{ center \}: \{ center: \[number, number\] \}\) => \{[\s\S]*?map\.flyTo\(center, 15, \{ animate: true, duration: 1\.5 \}\); \}\}/;

const newCode = `const RecenterControl = ({ center, userCoords }: { center: [number, number], userCoords: [number, number] | null }) => {
  const map = useMap();
  return (
    <div className="leaflet-top leaflet-right" style={{ zIndex: 1000, pointerEvents: 'none' }}>
      <div className="leaflet-control leaflet-bar" style={{ margin: '10px', pointerEvents: 'auto' }}>
        <button 
          onClick={(e) => { e.preventDefault(); map.flyTo(userCoords || center, 15, { animate: true, duration: 1.5 }); }}`;

code = code.replace(regex, newCode);

const regex2 = /<RecenterControl center=\{mapCenter\} \/>/;
const newCode2 = `<RecenterControl center={mapCenter} userCoords={geo.lat && geo.lng ? [geo.lat, geo.lng] : null} />`;
code = code.replace(regex2, newCode2);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed Recenter to use user location');
