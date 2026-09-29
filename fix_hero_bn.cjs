const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

const bengaliText = Buffer.from('4KaG4Kay4KeL4KawIOCmtuCmueCmsCwg4Kai4Ka+4KaV4KeH4KawIOCmpOCmvuCmsuCnhywg4KaG4Kas4Ka+4Kaw4KaTIOCmq+Cmv+CmsOCmm+CnhyDgpqrgp4Hgppzgp4vgprAg4Kam4Ka/4Kao4KaX4KeB4Kay4Ka/4KWk', 'base64').toString('utf8');

code = code.replace(
  '<p className="hero-bn" lang="bn">???? ???, ????? ????, ????? ????? ????? ????????</p>',
  '<p className="hero-bn" lang="bn">' + bengaliText + '</p>'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Restored Bengali text using base64 decoding.");
