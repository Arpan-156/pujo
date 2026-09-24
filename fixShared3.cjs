const fs = require('fs');
let c = fs.readFileSync('src/components/shared.tsx', 'utf8');

c = c.replace(/\\}\\)\\n\\s*<\\/div>\\n\\s*<\\/footer>\\n\\s*<\\/>/, '), document.body)}\n      </div>\n    </footer>\n    </>');

fs.writeFileSync('src/components/shared.tsx', c);

