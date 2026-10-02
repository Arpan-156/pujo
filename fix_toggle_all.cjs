const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const toggleAllCode = `  const toggleAll = async () => {
    if (activePoiTypes.size === 4 && showPandals) {
      setActivePoiTypes(new Set());
      setShowPandals(false);
      setPois([]);
    } else {
      setActivePoiTypes(new Set(['hospital', 'toilets', 'police', 'atm']));
      setShowPandals(true);
      if (mapCenter) {
        const fetched = await fetchPOIs(mapCenter[0], mapCenter[1], 3000);
        setPois(fetched);
      }
    }
  };`;

// Insert after togglePoi
const togglePoiRegex = /const togglePoi = async \(type: POIType\) => \{[\s\S]*?\}\s*?\};\s*/;
code = code.replace(togglePoiRegex, match => match + toggleAllCode + '\n\n');

// Update the All button
const allButtonRegex = /<button className=\{`poi-btn \$\{activePoiTypes\.size === 4 && showPandals \? 'active' : ''\}`\} onClick=\{\(\) => \{ setActivePoiTypes\(new Set\(\['hospital', 'toilets', 'police', 'atm'\]\)\); setShowPandals\(true\); \}\}>All<\/button>/;
code = code.replace(allButtonRegex, `<button className={\`poi-btn \${activePoiTypes.size === 4 && showPandals ? 'active' : ''}\`} onClick={toggleAll}>All</button>`);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed toggleAll');
