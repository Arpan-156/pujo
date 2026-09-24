const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

c = c.replace(
  /\{cur\.featured \? \(\s*<Link to=\{\`\/puja\/\$\{cur\.slug\}\`\} className="btn solid"><span>Explore Details<\/span><\/Link>\s*\) : \(\s*<span style=\{\{ color: 'var\(--mute\)', fontSize: '0\.9rem' \}\}>Details not available\.<\/span>\s*\)\}/,
  `<a href={\`https://www.google.com/maps/dir/?api=1&destination=\${mapQuery}\`} target="_blank" rel="noopener noreferrer" className="btn solid"><span>Get Directions</span></a>`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

