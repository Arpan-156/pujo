const fs = require('fs');
let code = fs.readFileSync('src/components/Icons.tsx', 'utf8');

if (!code.includes('export const Navigation =')) {
  code += `\nexport const Navigation = make(<path d="m3 11 19-9-9 19-2-8-8-2z" />);\n`;
  code += `export const CheckCircle = make(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>);\n`;
  fs.writeFileSync('src/components/Icons.tsx', code, 'utf8');
  console.log("Added Navigation & CheckCircle icons");
}
