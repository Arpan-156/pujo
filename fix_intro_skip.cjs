const fs = require('fs');
let code = fs.readFileSync('src/styles/entrance.css', 'utf8');

code = code.replace(
  "transition: all 0.3s ease;",
  "transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;"
);

fs.writeFileSync('src/styles/entrance.css', code, 'utf8');
console.log("Fixed iOS entrance.css skip button transition.");
