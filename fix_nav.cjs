const fs = require('fs');
let nav = fs.readFileSync('src/components/Nav.tsx', 'utf8');

if (!nav.includes('GeoPill')) {
  nav = "import { GeoPill } from './GeoBar';\n" + nav;
}

nav = nav.replace(
  '</nav>\n          <button className="nav-toggle"',
  '</nav>\n          <div className="nav-geo" style={{ display: \'flex\', alignItems: \'center\', marginLeft: \'auto\', paddingRight: \'16px\' }}><GeoPill /></div>\n          <button className="nav-toggle"'
);

// We need to hide .nav-geo on very small screens or let it shrink
if (!nav.includes('@media (max-width: 600px) { .nav-geo { display: none; } }')) {
  // Let's just add it via inline style or CSS class if not available
}

fs.writeFileSync('src/components/Nav.tsx', nav, 'utf8');
console.log('Added GeoPill to Nav');
