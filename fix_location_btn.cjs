const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

code = code.replace(
  /<button onClick=\{requestPermission\} style=\{\{ background: 'var\(--gold\)', color: '#111', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 \}\}>/,
  '<button onClick={requestPermission} style={{ background: "#e11d48", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "999px", cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "1.05rem", fontFamily: "inherit" }}>\n                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed location button UI');
