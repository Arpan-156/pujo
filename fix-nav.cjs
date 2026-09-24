const fs = require('fs');
let c = fs.readFileSync('src/components/Nav.tsx', 'utf8');

c = c.replace(
  /<Link to="\/" className="nav-brand"/g,
  '<Link to="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }} className="nav-brand"'
);

c = c.replace(
  /aria-current=\{active\(n\.to\) \? 'page' : undefined\}>/g,
  `aria-current={active(n.to) ? 'page' : undefined} onClick={(e) => { if (pathname === n.to) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>`
);

fs.writeFileSync('src/components/Nav.tsx', c);
