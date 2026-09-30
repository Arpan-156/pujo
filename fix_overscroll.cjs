const fs = require('fs');
let code = fs.readFileSync('src/styles/base.css', 'utf8');

code = code.replace(
  "body { background: var(--ink); color: var(--shankha); font-family: var(--f-body); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }",
  "body { background: var(--ink); color: var(--shankha); font-family: var(--f-body); overflow-x: hidden; overscroll-behavior-y: none; -webkit-tap-highlight-color: transparent; }"
);

fs.writeFileSync('src/styles/base.css', code, 'utf8');
console.log("Fixed overscroll-behavior-y.");
