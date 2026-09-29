const fs = require('fs');
let code = fs.readFileSync('src/components/Entrance.tsx', 'utf8');

code = code.replace(
  /<p className="loader-en">Preparing the Puja<\/p>\s*<\/div>\s*<\/div>\s*<div className={`loader-tap \$\{needsTap \? 'in' : ''\}`}>/,
  `<p className="loader-en">Preparing the Puja</p>
        </div>
        <div className={\`loader-tap \${needsTap ? 'in' : ''}\`}>`
);
fs.writeFileSync('src/components/Entrance.tsx', code, 'utf8');
console.log("Fixed JSX error.");
