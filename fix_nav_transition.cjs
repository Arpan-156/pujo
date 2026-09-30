const fs = require('fs');
let code = fs.readFileSync('src/styles/chrome.css', 'utf8');

code = code.replace(
  "transition: transform 0.9s var(--ease), background 0.4s, backdrop-filter 0.4s, border-color 0.4s;",
  "transition: transform 0.9s var(--ease), background-color 0.4s, border-color 0.4s;"
);
// I removed backdrop-filter transition because animating backdrop-filter on scroll creates MASSIVE lag on iOS and Android.

code = code.replace(
  "transition: transform 0.9s var(--ease), background 0.4s, backdrop-filter 0.4s, border-color 0.4s;", // fallback if previous regex failed
  "transition: transform 0.9s var(--ease), background-color 0.4s, border-color 0.4s;"
);

fs.writeFileSync('src/styles/chrome.css', code, 'utf8');
console.log("Fixed nav transitions.");
