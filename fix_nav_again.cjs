const fs = require('fs');
let nav = fs.readFileSync('src/components/Nav.tsx', 'utf8');

if (!nav.includes('<GeoPill />')) {
  // Use regex to replace carefully
  nav = nav.replace(
    /<\/nav>\s*<button className="nav-toggle"/,
    '</nav>\n        <div className="nav-geo" style={{ display: \'flex\', alignItems: \'center\', marginLeft: \'auto\', paddingRight: \'16px\' }}><GeoPill /></div>\n        <button className="nav-toggle"'
  );
  fs.writeFileSync('src/components/Nav.tsx', nav, 'utf8');
  console.log('Successfully injected GeoPill');
} else {
  console.log('GeoPill already present');
}
