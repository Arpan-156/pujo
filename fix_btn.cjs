const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  '<button className="rp-btn" onClick={generate}>',
  '<button className="rp-btn" onClick={generate} disabled={routeMode === "custom" && selectedCustom.length === 0} style={{ opacity: (routeMode === "custom" && selectedCustom.length === 0) ? 0.5 : 1 }}>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
