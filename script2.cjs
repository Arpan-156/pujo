
const fs = require('fs');
let content = fs.readFileSync('src/data/pujas.ts', 'utf8');

const coords = [
  {x: 45, y: 65}, {x: 52, y: 60}, {x: 58, y: 68}, {x: 65, y: 62}, {x: 48, y: 55},
  {x: 62, y: 52}, {x: 55, y: 75}, {x: 68, y: 72}, {x: 40, y: 60}, {x: 35, y: 68},
  {x: 42, y: 78}, {x: 75, y: 65}, {x: 72, y: 55}, {x: 80, y: 70}, {x: 55, y: 45},
  {x: 65, y: 40}, {x: 72, y: 42}, {x: 80, y: 50}, {x: 45, y: 40}, {x: 35, y: 45},
  {x: 25, y: 50}, {x: 28, y: 60}, {x: 30, y: 75}, {x: 50, y: 82}
];

let i = 0;
content = content.replace(/x: \d+, y: \d+/g, () => {
  if (i < coords.length) {
    let c = coords[i++];
    return 'x: ' + c.x + ', y: ' + c.y;
  }
  return 'x: 50, y: 50';
});

fs.writeFileSync('src/data/pujas.ts', content);
console.log('done');

