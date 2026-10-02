const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/\{userR > 0 && <span style=\{\{ color: 'var\(--gold\)', marginLeft: '6px' \}\}> You voted \{userR\}<\/span>\}/, "{userR > 0 && <span style={{ color: 'var(--gold)', marginLeft: '6px' }}>• You voted {userR}</span>}");
code = code.replace(/<span style=\{\{ color: 'rgba\(255,255,255,0\.3\)', fontSize: '0\.85rem' \}\}><\/span>/, "<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>•</span>");
code = code.replace(/Geographic Coordinates: \{p\.map\?\.lat\?\.toFixed\(4\) \|\| 'N\/A'\} N, \{p\.map\?\.lng\?\.toFixed\(4\) \|\| 'N\/A'\} E/, "Geographic Coordinates: {p.map?.lat?.toFixed(4) || 'N/A'}&deg; N, {p.map?.lng?.toFixed(4) || 'N/A'}&deg; E");
code = code.replace(/m from here  \{getWalkTimeStr\(n\.dist\)\}/g, "m from here • {getWalkTimeStr(n.dist)}");
code = code.replace(/km away  \{getWalkTimeStr\(p\.dist\)\}/g, "km away • {getWalkTimeStr(p.dist)}");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed all corrupted lines');
