const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /\{\(pathname\.replace\(\/\\\/\\$\/, ''\) \|\| '\/'\) !== '\/featured' && <Footer \/>\}/,
  `{(pathname.replace(/\\/$/, '') || '/') !== '/featured' && <Footer />}
            <PageWipe />`
);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Injected PageWipe');
