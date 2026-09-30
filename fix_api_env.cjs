const fs = require('fs');
let code = fs.readFileSync('src/lib/api.ts', 'utf8');

// Replace the type assertions with just import.meta.env
code = code.replace(
  /const SUPABASE_URL = \(import\.meta as any\)\.env\.VITE_SUPABASE_URL;/,
  'const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;'
);
code = code.replace(
  /const SUPABASE_KEY = \(import\.meta as any\)\.env\.VITE_SUPABASE_ANON_KEY;/,
  'const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;'
);

fs.writeFileSync('src/lib/api.ts', code, 'utf8');
console.log("Fixed env variables.");
