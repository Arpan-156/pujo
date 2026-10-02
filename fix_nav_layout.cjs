const fs = require('fs');
let nav = fs.readFileSync('src/components/Nav.tsx', 'utf8');

// First, extract the old nav-geo
nav = nav.replace(/<div className="nav-geo"[\s\S]*?<\/div>/, '');

// Then wrap nav-brand
nav = nav.replace(
  '<Link to="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }} className="nav-brand" data-cursor="Home" aria-label="Bardhaman Durga Puja 2026, home">',
  '<div style={{ display: \'flex\', alignItems: \'center\', gap: \'16px\' }}>\n          <Link to="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }} className="nav-brand" data-cursor="Home" aria-label="Bardhaman Durga Puja 2026, home">'
);

nav = nav.replace(
  '</Link>\n          <nav className="nav-links"',
  '</Link>\n          <div className="nav-geo" style={{ transform: \'scale(0.8)\', transformOrigin: \'left center\' }}><GeoPill /></div>\n        </div>\n          <nav className="nav-links"'
);

fs.writeFileSync('src/components/Nav.tsx', nav, 'utf8');
console.log('Fixed nav layout');
