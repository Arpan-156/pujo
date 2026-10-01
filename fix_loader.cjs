const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

code = code.replace(
  'padding: 60px 80px; border-radius: 24px;',
  'width: 90%; max-width: 500px; padding: 60px 30px; border-radius: 24px; box-sizing: border-box;'
);

fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Fixed loader width!");
