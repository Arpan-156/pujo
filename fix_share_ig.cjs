const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const shareBracket = \(\) => \{[\s\S]*?setTimeout\(\(\) => setToast\(false\), 3000\);\s*\}\);\s*\};/;

const newShare = `const shareBracket = () => {
    let text = \`?? Burdwan Capturers Official - Community Top 3 Pandals:\\n\\n\`;
    for(let i=0; i<3; i++) {
        text += \`\${i+1}. \${sorted[i].name}\\n\`;
    }
    text += \`\\nSent from the Official Burdwan Puja App. View the live leaderboard now!\`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        setToast(true);
        setTimeout(() => setToast(false), 3000);
    });

    // Open Instagram Direct Message to Burdwan Capturers
    window.open('https://ig.me/m/burdwan_capturers', '_blank');
  };`;

if(code.match(regex)) {
    code = code.replace(regex, newShare);
    fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
    console.log("Successfully updated share to IG DM.");
} else {
    console.log("Regex didn't match!");
}
