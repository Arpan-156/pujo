const fs = require('fs');

let code = fs.readFileSync('src/lib/api.ts', 'utf8');

code = code.replace(
  /const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;/,
  'const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL;'
);

code = code.replace(
  /const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;/,
  'const SUPABASE_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;'
);

code = code.replace(
  /return \{ _seeded: true \};/,
  'return {};'
);

fs.writeFileSync('src/lib/api.ts', code, 'utf8');
console.log("Fixed API types.");
