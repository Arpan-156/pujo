const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

code = code.replace(
  'background: rgba(10, 4, 5, 0.8);',
  'background: transparent;'
);
code = code.replace(
  'border: 1px solid rgba(16, 185, 129, 0.4);',
  'border: 1px solid rgba(16, 185, 129, 0.5);'
);
code = code.replace(
  'padding: 6px 14px;',
  'padding: 7px 16px;'
);
code = code.replace(
  'font-size: 0.9rem;',
  'font-size: 0.95rem;'
);
code = code.replace(
  'width: 10px;\n          height: 10px;',
  'width: 12px;\n          height: 12px;'
);
code = code.replace(
  '<RefreshCw size={14}',
  '<RefreshCw size={16}'
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed GeoBar.tsx styling to match Pic 2');
