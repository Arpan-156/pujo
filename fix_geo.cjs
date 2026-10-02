const fs = require('fs');
let code = fs.readFileSync('src/lib/geo.ts', 'utf8');

// Remove the automatic permission query in useEffect
code = code.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[requestPermission, geo\.status, geo\.isManual\]\);/m, `
  useEffect(() => {
    // Intentionally removed automatic location prompt to respect user privacy.
    // Must be triggered by explicit user action.
  }, []);
`);

fs.writeFileSync('src/lib/geo.ts', code, 'utf8');
