const fs = require('fs');

let css = fs.readFileSync('src/styles/base.css', 'utf8');

css = css.replace(
  '.cursor { position: fixed; left: 0; top: 0; z-index: 9999;',
  '.cursor { position: fixed; left: 0; top: 0; z-index: 99999;'
);

fs.writeFileSync('src/styles/base.css', css, 'utf8');
console.log('Fixed cursor z-index');
