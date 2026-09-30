const fs = require('fs');

function fixTransitions(file) {
    let code = fs.readFileSync(file, 'utf8');
    // We can't trivially replace 'all' blindly because it might be 'all 0.3s' but we can change 'all' to 'opacity, transform, background-color, border-color, color'
    code = code.replace(/transition:\s*all\s/g, "transition: transform "); 
    // Wait, replacing 'all' with 'transform' might break hover color changes.
    // Let's just remove the transition of 'all' in backdrop-filters.
    fs.writeFileSync(file, code, 'utf8');
}
// I will just manually fix the specific known culprits.
