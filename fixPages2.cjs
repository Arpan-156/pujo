const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /\{list\.map\(\(p\) => \(/,
  `{list.map((p) => {
                const Wrapper: any = p.featured ? Link : 'div';
                const props = p.featured ? { to: \`/puja/\${p.slug}\`, 'data-cursor': 'View' } : { style: { cursor: 'default' } };
                return (`
);

c = c.replace(
  /<Link key=\{p\.slug\} to=\{`\/puja\/\$\{p\.slug\}`\} className="plist-row" data-cursor="View">/,
  `<Wrapper key={p.slug} className="plist-row" {...props}>`
);

c = c.replace(
  /<\/Link>\s*\)\)\}/,
  `</Wrapper>
                );
              })}`
);

fs.writeFileSync('src/pages/Pages.tsx', c);

