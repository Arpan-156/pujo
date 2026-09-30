const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const targetFunction = /export function RoutePlannerPage\(\) \{[\s\S]*?const generate = \(\) => \{[\s\S]*?setRoute\(\{ \.\.\.r, pandals: finalPandals, timeDesc \}\);\n    \};/m;

const replacement = `
export function RoutePlannerPage() {
  const { pujas } = useData();
  const [zone, setZone] = useState('central');
  const [time, setTime] = useState('quick');
  const [vibe, setVibe] = useState('accessible');
  const [route, setRoute] = useState<any>(null);

  const generate = () => {
    // 1. Define Area Zones
    const ZONES: Record<string, string[]> = {
      central: ['Bardhaman Town', 'Baranilpur', 'Khosbagan', 'Vivekananda Pally', 'Vivekananda College Road', 'Rathtala', 'Chhotonilpur', 'Laxmipur Math', 'Susopanna', 'Boro Nilpur', 'Bardhaman'],
      north: ['Alamganj', 'Amadpur', 'Tikrahat', 'Keshabganj', 'Kalna Gate'],
      south: ['Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan', 'Barsul']
    };

    // 2. Filter by Zone
    let available = pujas.filter(p => {
      const allowedAreas = ZONES[zone] || [];
      return allowedAreas.includes(p.area);
    });

    // Fallback if empty zone (shouldn't happen but just in case)
    if (available.length === 0) available = [...pujas];

    // 3. Filter by Vibe
    let vibeFiltered = available.filter(p => {
      if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
      if (vibe === 'carnival') return p.categories.includes('Community Puja');
      if (vibe === 'accessible') return p.categories.includes('Traditional') || p.town;
      return true;
    });

    // If vibe filter is too strict, relax it
    if (vibeFiltered.length < 2) vibeFiltered = [...available];

    // 4. Sort to prioritize featured ones, then random shuffle to make it feel fresh
    vibeFiltered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return Math.random() - 0.5;
    });

    // 5. Pick N based on time
    let count = 2;
    let timeDesc = 'taking roughly 2 hours.';
    if (time === 'standard') { count = 4; timeDesc = 'taking roughly 4 hours.'; }
    if (time === 'marathon') { count = 6; timeDesc = 'keeping you up all night!'; }

    let finalPandals = vibeFiltered.slice(0, count);

    // If we couldn't get enough, pad with global featured ones
    if (finalPandals.length < count) {
      const globalExtras = pujas.filter(p => !finalPandals.includes(p)).sort(() => Math.random() - 0.5);
      finalPandals = [...finalPandals, ...globalExtras].slice(0, count);
    }

    // 6. Map to the route format expected by the UI
    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 10 mins';
      if (i === finalPandals.length - 1) transit = 'End of route';
      else if (Math.random() > 0.5) transit = 'Toto ride (10 mins)';
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        tip: p.desc.substring(0, 80) + '...',
        transit
      };
    });

    const routeTitles: Record<string, string> = {
      'central': 'The Heart of Bardhaman Walk',
      'north': 'The Heritage & Royal Trail',
      'south': 'The Sripally Serenade'
    };

    const routeDescs: Record<string, string> = {
      'art': 'A curated journey through breathtaking thematic installations and award-winning artistry.',
      'carnival': 'Dive into massive crowds, giant wheels, endless street food, and ultimate celebration.',
      'accessible': 'An easy-to-navigate route focusing on comfort, tradition, and minimal walking.'
    };

    setRoute({
      title: routeTitles[zone] || 'Your Custom Puja Trail',
      desc: routeDescs[vibe] || 'A robust mix of everything that makes Burdwan Durga Puja famous.',
      pandals: mappedPandals,
      timeDesc
    });
  };
`;

code = code.replace(targetFunction, replacement.trim());

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Upgraded Route Planner logic.");
