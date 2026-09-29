const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Remove from old position
code = code.replace("      <DailyShloka />\n", "");
code = code.replace("      <DailyShloka />\r\n", "");

// Add below PujaMap
if (!code.includes('<PujaMap />\n      <DailyShloka />') && !code.includes('<PujaMap />\r\n      <DailyShloka />')) {
    code = code.replace("<PujaMap />", "<PujaMap />\n      <DailyShloka />");
}

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
