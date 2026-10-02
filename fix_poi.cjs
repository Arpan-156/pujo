const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

if (!code.includes('const [showPandals, setShowPandals] = useState(true)')) {
  code = code.replace(/const \[activePoiTypes, setActivePoiTypes\] = useState<Set<POIType>>\(new Set\(\)\);/, "const [activePoiTypes, setActivePoiTypes] = useState<Set<POIType>>(new Set());\n  const [showPandals, setShowPandals] = useState(true);");
}

code = code.replace(/\{pujas\.filter\(p => p\.map\?\.lat && p\.map\?\.lng\)\.map\(p => \(/, "{showPandals && pujas.filter(p => p.map?.lat && p.map?.lng).map(p => (");

const oldBar = `<span style={{ fontSize: '0.85rem', color: 'var(--mute)', paddingRight: '8px', alignSelf: 'center' }}>Find Nearby:</span>
                {(['hospital', 'toilets', 'police', 'atm'] as POIType[]).map(type => (
                  <button 
                    key={type} 
                    className={\`poi-btn \${activePoiTypes.has(type) ? 'active' : ''}\`}
                    onClick={() => togglePoi(type)}
                  >
                    <div className="poi-btn-color" style={{ background: POI_COLORS[type] }}></div>
                    <span style={{ textTransform: 'capitalize' }}>{type}</span>
                  </button>
                ))}`;

const newBar = `<span style={{ fontSize: '0.85rem', color: 'var(--mute)', paddingRight: '8px', alignSelf: 'center' }}>Find Nearby:</span>
                <button className={\`poi-btn \${activePoiTypes.size === 4 && showPandals ? 'active' : ''}\`} onClick={() => { setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm'])); setShowPandals(true); }}>All</button>
                <button className={\`poi-btn \${showPandals ? 'active' : ''}\`} onClick={() => setShowPandals(!showPandals)}><div className="poi-btn-color" style={{ background: '#eab308' }}></div>Pandals</button>
                {(['hospital', 'toilets', 'police', 'atm'] as POIType[]).map(type => (
                  <button 
                    key={type} 
                    className={\`poi-btn \${activePoiTypes.has(type) ? 'active' : ''}\`}
                    onClick={() => togglePoi(type)}
                  >
                    <div className="poi-btn-color" style={{ background: POI_COLORS[type] }}></div>
                    <span style={{ textTransform: 'capitalize' }}>{type}</span>
                  </button>
                ))}`;

code = code.replace(oldBar, newBar);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI bar correctly');
