const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /<section className=\{`pmap \$\{className\}`\}>/;
const styleBlock = `<style>{\`
  .pmap-new-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; height: 75vh; min-height: 650px; padding: 40px 0; }
  @media (max-width: 900px) {
    .pmap-new-grid { grid-template-columns: 1fr; height: auto; min-height: auto; }
    .pmap-new-list { max-height: 350px; }
    .pmap-new-iframe { height: 400px; }
    .pmap-new-bot { flex-direction: column; text-align: center; gap: 16px; }
  }
\`}</style>
    <section className={\`pmap \${className}\`}>`;

c = c.replace(regex, styleBlock);
c = c.replace(/className="wrap" style=\{\{ display: 'grid', gridTemplateColumns: 'minmax\(300px, 1fr\) 2fr', gap: '30px', height: '75vh', minHeight: '650px', padding: '40px 0' \}\}/, 'className="wrap pmap-new-grid"');
c = c.replace(/<aside style=\{\{ overflowY: 'auto'/, '<aside className="pmap-new-list" style={{ overflowY: \'auto\'');
c = c.replace(/<div style=\{\{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var\(--line-2\)' \}\}/, '<div className="pmap-new-iframe" style={{ flex: 1, borderRadius: \'16px\', overflow: \'hidden\', border: \'1px solid var(--line-2)\' }}');
c = c.replace(/justifyContent: 'space-between', alignItems: 'center' \}\}/, 'justifyContent: \'space-between\', alignItems: \'center\' }} className="pmap-new-bot"');

fs.writeFileSync('src/sections/PujaMap.tsx', c);

