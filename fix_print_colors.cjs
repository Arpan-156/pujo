const fs = require('fs');
let css = fs.readFileSync('src/styles/pages.css', 'utf8');

css = css.replace(
  /\.plist-name, \.plist-cats, \.plist-addr p, \.plist-addr strong, \.plist-theme p, \.plist-theme strong \{ color: #000 !important; \}/,
  `.plist-name, .plist-cats, .plist-label, .plist-loc, .plist-theme, .plist-col p, .plist-col h3 { color: #000 !important; }`
);

fs.writeFileSync('src/styles/pages.css', css, 'utf8');
console.log("Fixed print colors.");
