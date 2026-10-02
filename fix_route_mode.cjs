const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Add routeMode state
code = code.replace(
  "const [selectedCustom, setSelectedCustom] = useState<string[]>([]);",
  "const [selectedCustom, setSelectedCustom] = useState<string[]>([]);\n    const [routeMode, setRouteMode] = useState<'specialized' | 'custom'>('specialized');"
);

// Add the switcher UI right after the geo bar / reminder and before "Near You Right Now" or "Time Available"
const switcherUI = `
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', background: 'rgba(233,181,88,0.05)', padding: '6px', borderRadius: '16px' }}>
            <button onClick={() => setRouteMode('specialized')} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: routeMode === 'specialized' ? 'var(--gold)' : 'transparent', color: routeMode === 'specialized' ? '#000' : 'var(--gold)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', transition: 'all 0.3s ease' }}>Our Specialized Routes</button>
            <button onClick={() => setRouteMode('custom')} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: routeMode === 'custom' ? 'var(--gold)' : 'transparent', color: routeMode === 'custom' ? '#000' : 'var(--gold)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', transition: 'all 0.3s ease' }}>Build Custom Route</button>
          </div>
`;

code = code.replace(
  "<div style={{ animation: 'popIn 0.5s ease' }}>",
  "<div style={{ animation: 'popIn 0.5s ease' }}>\n" + switcherUI
);

// Wrap Time Available and Vibe
code = code.replace(
  "<div style={{ marginBottom: '30px', marginTop: '20px' }}>\n              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Time Available</h3>",
  "{routeMode === 'specialized' && (<>\n              <div style={{ marginBottom: '30px', marginTop: '20px' }}>\n              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Time Available</h3>"
);

code = code.replace(
  /<\/label>\n                  \}\)\}\n                <\/div>\n              <\/div>\n\n              <div style=\{\{ marginBottom: '30px' \}\}>\n                <h3 style=\{\{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' \}\}>Transport Mode<\/h3>/,
  "</label>\n                  }))}\n                </div>\n              </div>\n              </>)}\n\n              <div style={{ marginBottom: '30px' }}>\n                <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Transport Mode</h3>"
);

// Wrap Custom Selection
code = code.replace(
  "<div style={{ marginBottom: '30px' }}>\n              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Custom Pandal Selection (Optional)</h3>\n              <p style={{ color: 'var(--mute)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>Select specific pandals you want to visit, and we'll calculate the shortest path. If you select any here, we will ignore the Time and Vibe preferences above.</p>",
  "{routeMode === 'custom' && (\n            <div style={{ marginBottom: '30px' }}>\n              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Custom Pandal Selection</h3>\n              <p style={{ color: 'var(--mute)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>Select specific pandals you want to visit, and we'll calculate the absolute shortest path for you.</p>"
);

code = code.replace(
  /<\/div>\n                    <\/label>\n                  \}\)\}\n                <\/div>\n              <\/div>\n\n            <button className="rp-btn" onClick=\{generate\}>/,
  "</div>\n                    </label>\n                  }))}\n                </div>\n              </div>\n            )}\n\n            <button className=\"rp-btn\" onClick={generate} disabled={routeMode === 'custom' && selectedCustom.length === 0} style={{ opacity: (routeMode === 'custom' && selectedCustom.length === 0) ? 0.5 : 1 }}>"
);

// Modify logic in generate
code = code.replace(
  "if (selectedCustom.length > 0) {",
  "if (routeMode === 'custom' && selectedCustom.length > 0) {"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Done replacing UI logic');
