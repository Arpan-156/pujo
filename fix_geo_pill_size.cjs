const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

code = code.replace(
  'padding: 7px 16px;',
  'padding: 4px 12px;'
);
code = code.replace(
  'font-size: 0.95rem;',
  'font-size: 0.85rem;'
);
code = code.replace(
  'gap: 8px;',
  'gap: 6px;'
);
code = code.replace(
  '.geo-dot {\n          width: 12px;\n          height: 12px;',
  '.geo-dot {\n          width: 10px;\n          height: 10px;\n          flex-shrink: 0;'
);
code = code.replace(
  '<RefreshCw size={16}',
  '<RefreshCw size={14}'
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed pill sizing');
