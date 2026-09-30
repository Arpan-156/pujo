const fs = require('fs');
let css = fs.readFileSync('src/styles/pages.css', 'utf8');

// First remove the old .plist overrides in @media print
css = css.replace(/\.plist \{ display: block !important; \}/, '');
css = css.replace(/\.plist-row \{ display: grid !important;[\s\S]*?\}/, '');

// Append the new print styles
const newStyles = `
/* Hide print-only elements by default */
.print-only { display: none; }

@media print {
  /* Show print-only table and hide screen-only grid */
  .print-only { display: block !important; }
  .plist { display: none !important; }
  
  /* BCO Table Styling */
  .bco-print-wrapper {
    width: 100%;
    color: #000;
    font-family: Arial, sans-serif;
  }
  .bco-header {
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #000;
    padding-bottom: 10px;
  }
  .bco-header h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
  .bco-header p {
    margin: 5px 0 0 0;
    font-style: italic;
    color: #333;
  }
  .bco-table {
    width: 100%;
    border-collapse: collapse;
  }
  .bco-table th, .bco-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
    font-size: 14px;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .bco-table th {
    background-color: #f5f5f5 !important;
    font-weight: bold;
  }
  .bco-table td strong {
    display: block;
    font-size: 16px;
    margin-bottom: 2px;
  }
}
`;

css += newStyles;
fs.writeFileSync('src/styles/pages.css', css, 'utf8');
console.log("Updated print CSS.");
