const fs = require('fs');
let code = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

code = code.replace(
  '<Link to={`/pujo/${f.slug}`} className="fs-link">',
  '<Link to={`/puja/${f.slug}`} className="fs-link">'
);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', code, 'utf8');
console.log("Fixed link in FeaturedShowcase.");
