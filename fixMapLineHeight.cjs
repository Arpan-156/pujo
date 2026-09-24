const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');
c = c.replace(
  "style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500 }}",
  "style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500, lineHeight: 1.3, paddingBottom: '4px' }}"
);
fs.writeFileSync('src/sections/PujaMap.tsx', c);

