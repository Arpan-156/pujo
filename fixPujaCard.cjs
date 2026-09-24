const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

c = c.replace(
  /<Link to=\{`\/puja\/\$\{p\.slug\}`\} className="pcard-body" data-cursor="View">/,
  `{p.featured ? (
          <Link to={\`/puja/\${p.slug}\`} className="pcard-body" data-cursor="View">
        ) : (
          <div className="pcard-body" style={{ cursor: 'default' }}>
        )}`
);

c = c.replace(
  /<\/Link>\n\s*<\/article>/,
  `{p.featured ? </Link> : </div>}
      </article>`
);

fs.writeFileSync('src/components/shared.tsx', c);

