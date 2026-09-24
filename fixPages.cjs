const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /<Link key=\{p.slug\} to=\{`\/puja\/\$\{p.slug\}`\} className="plist-row" data-cursor="View">/g,
  `{ p.featured ? (
                <Link key={p.slug} to={\`/puja/\${p.slug}\`} className="plist-row" data-cursor="View">
              ) : (
                <div key={p.slug} className="plist-row" style={{ cursor: 'default' }}>
              ) }`
);

c = c.replace(
  /<\/Link>\s*\)\)\}/g,
  `{ p.featured ? </Link> : </div> }
              ))}`
);

fs.writeFileSync('src/pages/Pages.tsx', c);

