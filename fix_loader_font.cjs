const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

code = code.replace(
  'font-size: clamp(1.8rem, 5vw, 2.4rem);',
  'font-size: clamp(1.3rem, 6vw, 2.4rem); line-height: 1.4; text-align: center; max-width: 100%; white-space: normal;'
);

fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Fixed loader text width!");
