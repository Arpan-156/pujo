const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Fix 1: let nearest = null; -> let nearest: any = null;
code = code.replace(/let nearest = null;/, "let nearest: any = null;");

// Fix 2: Add break if nearest is null
code = code.replace(/finalPandals\.push\(nearest\);\n\s*current = nearest;/m, "if (!nearest) break;\n      finalPandals.push(nearest);\n      current = nearest;");

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
