const fs = require('fs');
let c = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const regex = /export function PujaMap\(\{\s*className\s*=\s*''\s*\}\s*:\s*\{\s*className\?: string\s*\}\) \{[\s\S]*?(?=\/\*\* Small single-pin map)/;

const newCode = `export function PujaMap({ className = '' }: { className?: string }) {
  const { pujas } = useData();
  const [sel, setSel] = useState<string | null>(pujas[0]?.slug ?? null);
  const cur = pujas.find((p) => p.slug === sel) || pujas[0];

  const mapQuery = encodeURIComponent(\`\${cur.name} Durga Puja, \${cur.location}, Bardhaman\`);

  return (
    <section className={\`pmap \${className}\`}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px', height: '75vh', minHeight: '650px', padding: '40px 0' }}>
        
        <aside style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '12px', scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
          {pujas.map((p) => {
            const active = sel === p.slug;
            return (
              <button
                key={p.slug}
                onClick={() => setSel(p.slug)}
                style={{
                  textAlign: 'left',
                  padding: '20px',
                  background: active ? 'rgba(233,181,88,0.12)' : 'rgba(255,255,255,0.02)',
                  border: \`1px solid \${active ? 'var(--gold)' : 'var(--line)'}\`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: 'var(--gold)' }} />}
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: active ? 'var(--gold-2)' : '#fff', fontFamily: 'var(--f-display)', fontWeight: 500 }}>
                  {p.name}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--mute)' }}>{p.location}</p>
                {p.featured && (
                  <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.75rem', color: '#111', background: 'linear-gradient(135deg, var(--gold), var(--gold-2))', padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>FEATURED</span>
                )}
              </button>
            );
          })}
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line-2)' }}>
             <iframe 
               width="100%" 
               height="100%" 
               style={{ border: 0 }}
               loading="lazy" 
               allowFullScreen 
               referrerPolicy="no-referrer-when-downgrade" 
               src={\`https://maps.google.com/maps?q=\${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed\`}
             ></iframe>
           </div>
           
           <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--line)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontFamily: 'var(--f-display)', color: 'var(--gold-2)' }}>{cur.name}</h3>
                <p style={{ margin: '0 0 0 0', color: 'var(--mute)', fontSize: '1rem' }}>{cur.location}</p>
              </div>
              <div>
                {cur.featured ? (
                   <Link to={\`/puja/\${cur.slug}\`} className="btn solid"><span>Explore Details</span></Link>
                ) : (
                   <span style={{ color: 'var(--mute)', fontSize: '0.9rem' }}>Details not available.</span>
                )}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

`;

c = c.replace(regex, newCode);
fs.writeFileSync('src/sections/PujaMap.tsx', c);

