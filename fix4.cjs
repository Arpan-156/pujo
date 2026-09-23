const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

const replacement = `
        {showCopyright && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20, 8, 9, 0.92)', backdropFilter: 'blur(10px)' }} onClick={() => setShowCopyright(false)}>
            <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 0.5 }}><KashField /></div>
            <div style={{ position: 'relative', background: 'var(--ink)', padding: '40px', borderRadius: '12px', border: '1px solid var(--gold)', maxWidth: '500px', textAlign: 'center', margin: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: 'var(--gold-2)', fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'var(--f-display)' }}>Copyright Notice</h3>
              <p style={{ color: 'var(--mute)', lineHeight: 1.6, marginBottom: '30px', fontSize: '0.95rem' }}>All content, photographs, videos, and graphics on this website are the exclusive property of <strong>Burdwan Capturers Official</strong> and <strong>Banglar Pujo Official</strong>. Unauthorized use, reproduction, or distribution without prior written permission is strictly prohibited and may result in legal action.</p>
              <button onClick={() => setShowCopyright(false)} style={{ background: 'var(--gold)', color: 'var(--ink)', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}
`;

c = c.replace(/\{showCopyright && \([\s\S]*?\}\)/, replacement.trim());

// Also add a useEffect to lock the body
const effectCode = `  const { pathname } = useRouter();

  useLayoutEffect(() => {
    if (showCopyright) document.documentElement.classList.add('locked');
    else document.documentElement.classList.remove('locked');
    return () => document.documentElement.classList.remove('locked');
  }, [showCopyright]);
`;

c = c.replace(/const \{ pathname \} = useRouter\(\);/, effectCode);

fs.writeFileSync('src/components/shared.tsx', c);

