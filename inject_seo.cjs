const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { SEO } from \'./components/SEO\'')) {
  code = code.replace(
    'import { RouterProvider, useRouter } from \'./lib/router\';',
    'import { RouterProvider, useRouter } from \'./lib/router\';\nimport { SEO } from \'./components/SEO\';'
  );

  code = code.replace(
    '<Cursor />',
    '<Cursor />\n      <SEO />'
  );
  
  // Remove the old document.title effect
  code = code.replace(
    /useEffect\(\(\) => \{ document\.title = `\$\{label\.en\} . Burdwan Pujo 2026`; \}, \[label\]\);/g,
    '// Title is now managed by SEO component'
  );

  fs.writeFileSync('src/App.tsx', code, 'utf8');
  console.log('Injected SEO into App.tsx');
}
