const fs = require('fs');
let code = fs.readFileSync('src/sections/Hero.tsx', 'utf8');

code = code.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link } from '../lib/router';"
);

fs.writeFileSync('src/sections/Hero.tsx', code, 'utf8');
console.log("Fixed Link import");
