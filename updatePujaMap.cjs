const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

// Add search state
c = c.replace(
  /const \[sel, setSel\] = useState<string \| null>\(pujas\[0\]\?\.slug \?\? null\);/,
  `const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  const [q, setQ] = useState('');
  const filtered = pujas.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase()));`
);

// Add search input before the list
c = c.replace(
  /<aside className="pmap-new-list"/,
  `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '100%' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search Pandals..." 
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--line-2)', background: 'rgba(20,8,9,0.5)', color: '#fff', fontSize: '1.1rem', outline: 'none', backdropFilter: 'blur(8px)', transition: 'border-color 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--line-2)'}
            />
          </div>
          <aside className="pmap-new-list"`
);

// Close the div wrapping the aside and input
c = c.replace(
  /<\/aside>/,
  `</aside>\n        </div>`
);

// Change mapping to filtered
c = c.replace(
  /\{pujas\.map\(\(p\) => \{/,
  `{filtered.map((p) => {`
);

// Fix overflow hidden and padding on button
c = c.replace(
  /overflow: 'hidden'/g,
  `overflow: 'visible'`
);

c = c.replace(
  /paddingBottom: '4px'/g,
  `paddingBottom: '8px'`
);
c = c.replace(
  /lineHeight: 1\.3/g,
  `lineHeight: 1.5`
);

fs.writeFileSync('src/sections/PujaMap.tsx', c);

