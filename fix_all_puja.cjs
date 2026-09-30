const fs = require('fs');

function replaceFile(path, search, replace) {
  let code = fs.readFileSync(path, 'utf8');
  code = code.split(search).join(replace);
  fs.writeFileSync(path, code, 'utf8');
}

// site.ts
replaceFile('src/data/site.ts', "'All Puja'", "'Pandals & Themes'");

// router.tsx
replaceFile('src/lib/router.tsx', "'All Puja'", "'Pandals & Themes'");

// Pages.tsx
replaceFile('src/pages/Pages.tsx', 'Show all Puja', 'Show all Pandals');
replaceFile('src/pages/Pages.tsx', 'Back to All Puja', 'Back to Pandals & Themes');
replaceFile('src/pages/Pages.tsx', '> All Puja</Link>', '> Pandals & Themes</Link>');
replaceFile('src/pages/Pages.tsx', '*  All Puja', '*  Pandals & Themes');

// FeaturedRail.tsx
replaceFile('src/sections/FeaturedRail.tsx', '>All Puja</span>', '>Pandals & Themes</span>');

console.log("Replaced All Puja with Pandals & Themes");
