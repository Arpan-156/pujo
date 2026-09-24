const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

c = c.replace(
  /return \(\n\s*<article className="pcard"/,
  `const Wrapper: any = p.featured ? Link : 'div';
    const props = p.featured ? { to: \`/puja/\${p.slug}\`, 'data-cursor': 'View' } : { style: { cursor: 'default' } };
  
    return (
      <article className="pcard"`
);

c = c.replace(
  /<Link to=\{`\/puja\/\$\{p\.slug\}`\} className="pcard-body" data-cursor="View">/,
  `<Wrapper className="pcard-body" {...props}>`
);

c = c.replace(
  /<\/Link>\n\s*<\/article>/,
  `</Wrapper>\n      </article>`
);

fs.writeFileSync('src/components/shared.tsx', c);

