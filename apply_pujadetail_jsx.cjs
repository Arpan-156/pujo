const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');
const newJSX = fs.readFileSync('new_pujadetail.jsx', 'utf8');

const regex = /<section className="pd-info wrap">[\s\S]*?<\/section>\s*<section className="pd-story wrap">[\s\S]*?<\/section>/;
code = code.replace(regex, newJSX);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed PujaDetail jsx');
