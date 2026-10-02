const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

code = code.replace(
  '</div>\n            </div>\n\n            <button className="rp-btn"',
  '</div>\n            </div>\n            )}\n\n            <button className="rp-btn"'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed TS custom parenthesis');
