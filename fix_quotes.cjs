const fs = require('fs');
let code = fs.readFileSync('src/sections/DailyShloka.tsx', 'utf8');
code = code.replace("Ganesha\\\\'s", "Ganesha\\'s"); // Wait, let's just replace all \' inside '' to proper escaped quote.
code = code.replace(/Ganesha\\\\\'s/g, "Ganesha's");
code = code.replace(/Ganesha\\\'s/g, "Ganesha\\'s");
fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
