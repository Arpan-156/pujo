const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

c = c.replace(
  /return \(\s*<article className="pcard"/,
  `const Wrapper: any = p.featured ? Link : 'div';
  const props = p.featured ? { to: \`/puja/\${p.slug}\`, 'data-cursor': 'View' } : { style: { cursor: 'default' } };

  return (
    <article className="pcard"`
);

c = c.replace(
  /<\/Link>\s*<\/article>/,
  `</Wrapper>
    </article>`
);

fs.writeFileSync('src/components/shared.tsx', c);

