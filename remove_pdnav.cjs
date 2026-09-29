const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /<nav className="pd-pn wrap" aria-label="Previous and next Puja">[\s\S]*?<\/nav>/;
if (code.match(regex)) {
    code = code.replace(regex, '');
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Removed the Previous/Next nav successfully.");
} else {
    console.log("Regex didn't match.");
}
