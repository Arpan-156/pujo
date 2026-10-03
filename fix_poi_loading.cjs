const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Add loading state
code = code.replace(/const \[activePoiTypes, setActivePoiTypes\] = useState<Set<POIType>>\(new Set\(\)\);/, `const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());
  const [poiLoading, setPoiLoading] = useState(false);`);

// Toggle single POI logic
const toggleRegex = /const togglePoi = async \(type: POIType\) => \{([\s\S]*?)const center = mapObj \? mapObj\.getCenter\(\) : \{ lat: mapCenter\[0\], lng: mapCenter\[1\] \};\n\s*const lat = center\.lat;\n\s*const lng = center\.lng;\n\s*const fetched = await fetchPOIs\(lat, lng, 3000, \[type\]\);\n\s*setPois\(prev => \[\.\.\.prev, \.\.\.fetched\]\);\n\s*\}\n\s*\};/;
code = code.replace(toggleRegex, `const togglePoi = async (type: POIType) => {
    $1
      setPoiLoading(true);
      const center = mapObj ? mapObj.getCenter() : { lat: mapCenter[0], lng: mapCenter[1] };
      const lat = center.lat;
      const lng = center.lng;
      const fetched = await fetchPOIs(lat, lng, 3000, [type]);
      setPois(prev => [...prev, ...fetched]);
      setPoiLoading(false);
    }
  };`);

// Toggle ALL logic
const allRegex = /const toggleAll = async \(\) => \{([\s\S]*?)const center = mapObj \? mapObj\.getCenter\(\) : \{ lat: mapCenter\[0\], lng: mapCenter\[1\] \};\n\s*const lat = center\.lat;\n\s*const lng = center\.lng;\n\s*const fetched = await fetchPOIs\(lat, lng, 3000, \['hospital', 'police', 'atm', 'toilets'\]\);\n\s*setPois\(fetched\);\n\s*\}\n\s*\};/;
code = code.replace(allRegex, `const toggleAll = async () => {
    $1
      setPoiLoading(true);
      const center = mapObj ? mapObj.getCenter() : { lat: mapCenter[0], lng: mapCenter[1] };
      const lat = center.lat;
      const lng = center.lng;
      const fetched = await fetchPOIs(lat, lng, 3000, ['hospital', 'police', 'atm', 'toilets']);
      setPois(fetched);
      setPoiLoading(false);
    }
  };`);

// Render the loading spinner in the UI header
code = code.replace(/<span style=\{\{ color: 'var\(--mute\)', fontSize: '0\.8rem' \}\}>Find Nearby:<\/span>/, `<span style={{ color: 'var(--mute)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Find Nearby:
                {poiLoading && <svg className="spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>}
              </span>
              <style>{\`.spinner { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }\`}</style>`);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Added POI loading state');
