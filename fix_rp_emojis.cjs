const fs = require('fs');

let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// The corrupted versions:
// Quick: '?' 
// Standard: '??' (walking)
// Marathon: '??' (owl)
// Button map: '???'
// Open in Google Maps map: '???'
// View map pin: '??'
// Sparkles: '??'
// Lightbulb: '??'
// Trophy in share text: '??'

// Replace corrupted icons with exact strings safely
code = code.replace(
  "{ v: 'quick', i: '?', t: 'Quick Express'",
  "{ v: 'quick', i: '⏳', t: 'Quick Express'"
);

code = code.replace(
  "{ v: 'standard', i: '??', t: 'Standard Hop'",
  "{ v: 'standard', i: '🚶', t: 'Standard Hop'"
);

code = code.replace(
  "{ v: 'marathon', i: '??', t: 'Night Marathon'",
  "{ v: 'marathon', i: '🦉', t: 'Night Marathon'"
);

code = code.replace(
  "<span>Generate My Adventure Route</span>\n                  <span style={{ fontSize: '1.5rem' }}>???</span>",
  "<span>Generate My Adventure Route</span>\n                  <span style={{ fontSize: '1.5rem' }}>🗺️</span>"
);

code = code.replace(
  "<button onClick={openGoogleMaps} className=\"map-btn\">\n                  <span>???</span>\n                  <span>Open in Google Maps</span>",
  "<button onClick={openGoogleMaps} className=\"map-btn\">\n                  <span>🗺️</span>\n                  <span>Open in Google Maps</span>"
);

code = code.replace(
  "className=\"print-hide\">\n                          <span>??</span> View Map",
  "className=\"print-hide\">\n                          <span>📍</span> View Map"
);

code = code.replace(
  "<div style={{ display: 'flex', gap: '15px' }}>\n                          <span style={{ fontSize: '1.4rem' }}>??</span>\n                          <div>\n                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Theme</div>",
  "<div style={{ display: 'flex', gap: '15px' }}>\n                          <span style={{ fontSize: '1.4rem' }}>✨</span>\n                          <div>\n                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Theme</div>"
);

code = code.replace(
  "<div style={{ display: 'flex', gap: '15px' }}>\n                          <span style={{ fontSize: '1.4rem' }}>??</span>\n                          <div>\n                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Insider Tip</div>",
  "<div style={{ display: 'flex', gap: '15px' }}>\n                          <span style={{ fontSize: '1.4rem' }}>💡</span>\n                          <div>\n                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--mute)', letterSpacing: '1px', marginBottom: '4px' }}>Insider Tip</div>"
);

code = code.replace(
  "let text = `?? Burdwan Capturers Official - Community Top 3 Pandals:\\n\\n`;",
  "let text = `🏆 Burdwan Capturers Official - Community Top 3 Pandals:\\n\\n`;"
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Emojis fixed in Pages.tsx!");
