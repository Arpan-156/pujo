const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  '<button className="map-btn" onClick={() => setRoute(null)} style={{ background: \'transparent\', borderColor: \'rgba(255,255,255,0.2)\', color: \'#fff\' }}>',
  '<button className="map-btn" onClick={() => setRoute(null)} style={{ background: \'rgba(255,255,255,0.1)\', borderColor: \'rgba(255,255,255,0.3)\', color: \'#fff\', padding: \'10px 24px\', borderRadius: \'8px\' }}>\n<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{marginRight:"8px"}}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Back button');
