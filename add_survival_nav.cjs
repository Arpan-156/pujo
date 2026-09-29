const fs = require('fs');
let code = fs.readFileSync('src/data/site.ts', 'utf8');

if (!code.includes("href: '/survival'")) {
    code = code.replace(
        "{ label: { bn: '??? ?????????', en: 'Route Planner' }, href: '/planner' }",
        "{ label: { bn: '??? ?????????', en: 'Route Planner' }, href: '/planner' },\n  { label: { bn: '????????? ???', en: 'Survival Kit' }, href: '/survival' }"
    );
    fs.writeFileSync('src/data/site.ts', code, 'utf8');
}
