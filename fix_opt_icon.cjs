const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  /<div style=\{\{\s*fontSize:\s*'2rem',\s*marginBottom:\s*'12px'\s*\}\}>\{opt\.icon\}<\/div>/g,
  '<div style={{ fontSize: \'2rem\', marginBottom: \'12px\', width: \'32px\', height: \'32px\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }} dangerouslySetInnerHTML={{ __html: opt.icon }}></div>'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed opt.icon render');
