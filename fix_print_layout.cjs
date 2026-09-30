const fs = require('fs');
let css = fs.readFileSync('src/styles/pages.css', 'utf8');

// I need to change `.plist { display: block !important; }` to keep the normal grid but maybe just display block for the list container
css = css.replace(
  /\.plist \{ display: block !important; \}/,
  `.plist { display: block !important; }`
);

css = css.replace(
  /\.plist-row \{/,
  `.plist-row { display: grid !important;`
);

// Actually, wait, `.plist` is the <FlipGrid>. Is FlipGrid display: grid? 
// Yes, `.plist { display: grid; }`. If I set it to block, the rows stack vertically, which is perfect for printing.
// `.plist-row` is also a grid. 
// Let's just make sure `.plist-row` retains its internal grid structure so the columns stay side by side if possible.
// Wait! FlipGrid uses standard grid.

fs.writeFileSync('src/styles/pages.css', css, 'utf8');
console.log("Updated print layout.");
