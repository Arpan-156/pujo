const fs = require('fs');
let c = fs.readFileSync('src/sections/Hero.tsx', 'utf8');
c = c.replace(
  '<Btn to="/featured" variant="ghost" cursor="Open">Featured Pandals</Btn>',
  '<Btn to="/featured" variant="ghost" cursor="Open">Featured Pandals</Btn>\n          <Btn to="/map" variant="ghost" cursor="Open">Pandal Map</Btn>'
);
fs.writeFileSync('src/sections/Hero.tsx', c);

