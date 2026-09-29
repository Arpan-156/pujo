const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');
const original = Buffer.from('4Kaq4KeB4Kac4KeL4KawIOCmquCnjeCmsOCmuOCnjeCmpOCngeCmpOCmvyDgpprgprLgppvgp4c=', 'base64').toString('utf8');
code = code.replace(/<p className="loader-bn">.*?<\/p>/, `<p className="loader-bn">{decodeURIComponent(escape(window.atob('4Kaq4KeB4Kac4KeL4KawIOCmquCnjeCmsOCmuOCnjeCmpOCngeCmpOCmvyDgpprgprLgppvgp4c=')))}</p>`);
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log("Fixed Bengali string.");
