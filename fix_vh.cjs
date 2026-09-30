const fs = require('fs');

function fixVh(file) {
    let code = fs.readFileSync(file, 'utf8');
    // Replace min-height: 100vh with min-height: 100svh
    code = code.replace(/min-height:\s*100vh/g, "min-height: 100svh");
    // Replace height: 100vh with height: 100dvh
    code = code.replace(/height:\s*100vh/g, "height: 100dvh");
    fs.writeFileSync(file, code, 'utf8');
}

fixVh('src/styles/sections.css');
fixVh('src/styles/pages.css');
fixVh('src/styles/passport.css');
fixVh('src/styles/entrance.css');
fixVh('src/styles/base.css');

console.log("Fixed 100vh to 100svh/100dvh globally.");
