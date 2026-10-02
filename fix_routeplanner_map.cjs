const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Import RouteMap from PujaMap
code = code.replace(/import \{ MiniMap, PujaMap \} from '\.\.\/sections\/PujaMap';/, "import { MiniMap, PujaMap, RouteMap } from '../sections/PujaMap';");

// Render RouteMap right before the Start Navigating button
const rpBtnRegex = /<button className="rp-btn" onClick=\{openGoogleMaps\} style=\{\{ marginTop: '20px' \}\}>/;

code = code.replace(rpBtnRegex, `<RouteMap route={route} />\n              <button className="rp-btn" onClick={openGoogleMaps} style={{ marginTop: '20px' }}>`);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Added RouteMap to RoutePlannerPage');
