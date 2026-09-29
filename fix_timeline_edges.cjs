const fs = require('fs');
let code = fs.readFileSync('src/styles/sections.css', 'utf8');

code = code.replace(
  ".tl-track { position: relative; min-width: 1200px; max-width: 1600px; margin-inline: auto; padding-top: 20px; }",
  ".tl-track { position: relative; min-width: 1200px; max-width: 1600px; margin-inline: auto; padding-top: 20px; padding-inline: 14px; }"
);

code = code.replace(
  ".tl-line { position: absolute; left: 0; right: 0; top: 18px; height: 3px; background: rgba(233, 181, 88, 0.15); z-index: 1; border-radius: 2px; }",
  ".tl-line { position: absolute; left: 14px; right: 14px; top: 18px; height: 3px; background: rgba(233, 181, 88, 0.15); z-index: 1; border-radius: 2px; }"
);

fs.writeFileSync('src/styles/sections.css', code, 'utf8');
console.log("Fixed timeline edges clipping.");
