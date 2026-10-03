const fs = require('fs');
let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

code = code.replace(/slug: 'radha-ballav-jiu-temple'[\s\S]*?desc: 'A historic heritage puja preserved for generations\.'/, (match) => {
  return match + `, heroImage: '/images/radha-ballab.jpg', gallery: ['/images/radha-ballab.jpg']`;
});

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Fixed Radha image');
