const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(/import \{   ArrowLeft, ArrowRight, Mail, Pin,/, 'import { Footprints, ArrowLeft, ArrowRight, Mail, Pin,');

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed Footprints import');
