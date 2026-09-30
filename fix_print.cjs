const fs = require('fs');

let css = fs.readFileSync('src/styles/pages.css', 'utf8');

const printStyles = `

/* ================= PRINT SPECIFIC PDF EXPORT ================= */
@media print {
  body { background: #fff !important; color: #000 !important; }
  .nav, .music-fab, .footer, .global-brand, .cursor, .no-print, .dir-bar, .dir-count, .page-head, .hero, .ds-wrap { display: none !important; }
  
  /* Reset colors for the print chart */
  .directory { background: transparent !important; padding: 0 !important; }
  .wrap { padding: 0 !important; }
  .plist { display: block !important; }
  .plist-row {
    break-inside: avoid;
    page-break-inside: avoid;
    border: 1px solid #ccc !important;
    background: #fff !important;
    color: #000 !important;
    margin-bottom: 10px !important;
    border-radius: 8px !important;
    box-shadow: none !important;
  }
  .plist-name, .plist-cats, .plist-addr p, .plist-addr strong, .plist-theme p, .plist-theme strong { color: #000 !important; }
  .feat-tag { color: #d63384 !important; border-color: #d63384 !important; }
  
  /* Hide the download PDF button in print */
  button { display: none !important; }
  
  /* Ensure SVGs or decorative elements print nicely if they exist */
  svg { display: none !important; }
}
`;

css += printStyles;

fs.writeFileSync('src/styles/pages.css', css, 'utf8');
console.log("Added print styles.");
