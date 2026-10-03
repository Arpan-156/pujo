const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The block to move
const mapBlockRegex = /<div className="wrap map-head">[\s\S]*?<PujaMap \/>/;
const mapBlockMatch = code.match(mapBlockRegex);
if (mapBlockMatch) {
  const mapBlock = mapBlockMatch[0];
  code = code.replace(mapBlockRegex, '');
  
  // Insert it after </section> of dir-preview
  const dirPreviewRegex = /<\/section>\s*\{\/\* <ThemesGrid \/> \*\/\}\s*<Experiences \/>/;
  
  code = code.replace(/<\/section>\s*\{\/\* <ThemesGrid \/> \*\/\}\s*<Experiences \/>/, `</section>\n      ${mapBlock}\n      {/* <ThemesGrid /> */}\n      <Experiences />`);
  fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
  console.log('Moved Puja Map');
} else {
  console.log('Could not find Map Block');
}
