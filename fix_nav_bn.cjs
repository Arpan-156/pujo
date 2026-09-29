const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

const galleryBn = Buffer.from('4KaX4KeN4Kav4Ka+4Kay4Ka+4Kaw4Ka/', 'base64').toString('utf8');
const routeBn = Buffer.from('4Kaq4KalIOCmqOCmv+CmsOCnjeCmpuCnh+CmtuCmv+CmleCmvg==', 'base64').toString('utf8');
const top3Bn = Buffer.from('4Ka44KeH4Kaw4Ka+IOCnqSDgpqjgpr/gprDgp43gpqzgpr7gpprgpqg=', 'base64').toString('utf8');

code = code.replace(
  "{ label: 'Gallery', bn: '????????', to: '/gallery' },",
  "{ label: 'Gallery', bn: '" + galleryBn + "', to: '/gallery' },"
);
code = code.replace(
  "{ label: 'Route Planner', bn: '??? ?????', to: '/planner' },",
  "{ label: 'Route Planner', bn: '" + routeBn + "', to: '/planner' },"
);
code = code.replace(
  "{ label: 'Top 3 Voter', bn: '????? ?', to: '/top3' },",
  "{ label: 'Top 3 Voter', bn: '" + top3Bn + "', to: '/top3' },"
);

fs.writeFileSync('src/data/site.ts', code, 'utf8');
console.log("Restored Bengali navigation strings safely.");
