const fs = require('fs');
let code = fs.readFileSync('src/sections/GalleryBoard.tsx', 'utf8');

const targetRegex = /\{list\.length > 0 \? \([\s\S]*?<\/FlipGrid>\n\s*\) : \(/;

const replacement = `{list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {Object.entries(
              list.reduce((acc, g) => {
                const y = g.year || 2025;
                if (!acc[y]) acc[y] = [];
                acc[y].push(g);
                return acc;
              }, {} as Record<number, typeof list>)
            ).sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, items]) => (
              <div key={year}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                  <h2 style={{ fontFamily: 'var(--f-display)', fontSize: '2.5rem', margin: 0, color: 'var(--gold)' }}>{year}</h2>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(233,181,88,0.5), transparent)' }} />
                </div>
                <FlipGrid className="masonry">
                  {items.map((g) => (
                    <button key={g.id} className={\`g-item \${g.tall ? 'tall' : ''} \${g.wide ? 'wide' : ''}\`} onClick={() => setIdx(list.findIndex(x => x.id === g.id))} data-cursor="View" aria-label={\`Open photo: \${g.caption}\`}>
                      <Photo v={g.visual} alt={g.caption} />
                      <span className="g-cap">{g.caption}</span>
                    </button>
                  ))}
                </FlipGrid>
              </div>
            ))}
          </div>
        ) : (`;

code = code.replace(targetRegex, replacement);
fs.writeFileSync('src/sections/GalleryBoard.tsx', code, 'utf8');
console.log("Updated GalleryBoard grouping.");
