const fs = require('fs');
let code = fs.readFileSync('src/components/SEO.tsx', 'utf8');

// Fix 1
code = code.replace('let schemaJson = {};', 'let schemaJson: any = {};');

// Fix 2
code = code.replace(
  'const setOgTag = (property, content) => {',
  'const setOgTag = (property: string, content: string) => {'
);

// Fix 3
code = code.replace(
  'let schemaScript = document.getElementById(\'seo-schema\');',
  'let schemaScript = document.getElementById(\'seo-schema\') as HTMLScriptElement;'
);
code = code.replace(
  'schemaScript = document.createElement(\'script\');',
  'schemaScript = document.createElement(\'script\') as HTMLScriptElement;'
);

fs.writeFileSync('src/components/SEO.tsx', code, 'utf8');
console.log('Fixed TS errors in SEO.tsx');
