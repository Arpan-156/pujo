const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

// Add Link to imports
code = code.replace(
  "import { Btn } from '../components/shared';",
  "import { Btn } from '../components/shared';\nimport { Link } from 'react-router-dom';"
);

// Replace Btn with Link
code = code.replace(
  '<Btn to="/pujas" className="primary" cursor="Explore">Explore Puja</Btn>',
  '<Link to="/pujas" className="btn primary" data-cursor="Explore">Explore Puja</Link>'
);
code = code.replace(
  '<Btn to="/featured" className="glass" cursor="Open">Featured Pandals</Btn>',
  '<Link to="/featured" className="btn glass" data-cursor="Open">Featured Pandals</Link>'
);
code = code.replace(
  '<Btn to="/map" className="glass" cursor="Open">Pandal Map</Btn>',
  '<Link to="/map" className="btn glass" data-cursor="Open">Pandal Map</Link>'
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed Btn to Link");
