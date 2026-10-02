const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /<span style=\{\{ fontSize: '0\.85rem', color: 'var\(--mute\)', paddingRight: '8px', alignSelf: 'center' \}\}>Find Nearby:<\/span>\s*\{\(\['hospital', 'toilets', 'police', 'atm'\] as POIType\[\]\)\.map\(type => \(\s*<button \s*key=\{type\} \s*className=\{`poi-btn \$\{activePoiTypes\.has\(type\) \? 'active' : ''\}`\}\s*onClick=\{\(\) => togglePoi\(type\)\}\s*>\s*<div className="poi-btn-color" style=\{\{ background: POI_COLORS\[type\] \}\}><\/div>\s*<span style=\{\{ textTransform: 'capitalize' \}\}>\{type\}<\/span>\s*<\/button>\s*\)\)\}/m;

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

if (regex.test(code)) {
  code = code.replace(regex, newBar);
  fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
  console.log('Successfully replaced');
} else {
  console.log('Regex did not match');
}
