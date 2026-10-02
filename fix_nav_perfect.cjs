const fs = require('fs');
let nav = fs.readFileSync('src/components/Nav.tsx', 'utf8');

// Ensure GeoPill is imported
if (!nav.includes('GeoPill')) {
  nav = "import { GeoPill } from './GeoBar';\n" + nav;
}

// Find the start of the <header> and the <Link> inside it
const linkStart = nav.indexOf('<Link to="/" onClick={(e)');
const linkEnd = nav.indexOf('</Link>', linkStart) + 7;

if (linkStart > -1 && linkEnd > -1 && !nav.substring(linkStart - 20, linkStart).includes('display: \'flex\'')) {
  const linkStr = nav.substring(linkStart, linkEnd);
  
  const wrapped = `<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          ${linkStr}
          <div className="nav-geo" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
            <GeoPill />
          </div>
        </div>`;
        
  nav = nav.substring(0, linkStart) + wrapped + nav.substring(linkEnd);
}

fs.writeFileSync('src/components/Nav.tsx', nav, 'utf8');
console.log('Fixed nav perfectly');
