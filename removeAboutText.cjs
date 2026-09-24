const fs = require('fs');
let c = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

c = c.replace(
  /lines=\{\['ABOUT', 'US'\]\} bn="[^"]+" lead="Two communities\. One celebration\."/,
  `lines={[]} bn="" lead=""`
);

fs.writeFileSync('src/pages/Pages.tsx', c);

