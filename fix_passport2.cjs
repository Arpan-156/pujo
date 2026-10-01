const fs = require('fs');
let code = fs.readFileSync('src/lib/passport.ts', 'utf8');

const target = `    data = {
      saved: Array.isArray(parsed?.saved) ? parsed.saved : [],
      visited: Array.isArray(parsed?.visited) ? parsed.visited : []
    };`;

const replacement = `    data = {
      saved: Array.isArray(parsed?.saved) ? parsed.saved.filter(s => PUJAS.some(p => p.slug === s)) : [],
      visited: Array.isArray(parsed?.visited) ? parsed.visited.filter(s => PUJAS.some(p => p.slug === s)) : []
    };
    
    // Auto-save cleaned data back to localStorage if anything was removed
    if (parsed && (data.saved.length !== parsed.saved?.length || data.visited.length !== parsed.visited?.length)) {
      setTimeout(() => {
        try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
      }, 100);
    }`;

code = code.replace(target, replacement);

fs.writeFileSync('src/lib/passport.ts', code, 'utf8');
console.log("Updated passport logic carefully.");
