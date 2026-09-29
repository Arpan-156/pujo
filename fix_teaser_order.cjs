const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Extract the teaser
const teaserRegex = /<section className="surv-teaser"[\s\S]*?<\/section>/;
const match = code.match(teaserRegex);

if (match) {
    const teaserCode = match[0];
    
    // Remove it from its current position (before <Social />)
    code = code.replace(teaserRegex, '');
    
    // Insert it AFTER <Social />
    code = code.replace('<Social />', '<Social />\n' + teaserCode);
    
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log("Successfully moved teaser below Social");
} else {
    console.log("Teaser not found");
}
