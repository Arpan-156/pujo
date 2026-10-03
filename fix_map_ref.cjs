const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// 1. Add map state
code = code.replace(/const \[activePoiTypes, setActivePoiTypes\] = useState<Set<POIType>>\(new Set\(\)\);/, `const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());
  const [mapObj, setMapObj] = useState<L.Map | null>(null);`);

// 2. Add ref to MapContainer
code = code.replace(/<MapContainer \n\s*center=\{mapCenter\} /, `<MapContainer ref={setMapObj}\n                center={mapCenter} `);

// 3. Update toggle logic to use mapObj.getCenter() if available
code = code.replace(/const lat = geo\.lat \|\| mapCenter\[0\];\n\s*const lng = geo\.lng \|\| mapCenter\[1\];/g, `const center = mapObj ? mapObj.getCenter() : { lat: mapCenter[0], lng: mapCenter[1] };
        const lat = center.lat;
        const lng = center.lng;`);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed Map center for POIs');
