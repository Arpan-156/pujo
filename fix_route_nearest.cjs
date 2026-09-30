const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const generate = \(\) => \{[\s\S]*?setRoute\(\{[\s\S]*?\}\);\n  \};/m;

const newLogic = `const generate = () => {
    // 1. Filter out outskirts immediately (no Amadpur, no Barsul for town routes)
    const townPujas = pujas.filter(p => p.zone === 'Bardhaman Town');

    // 2. Define Area Zones
    const ZONES: Record<string, string[]> = {
      central: ['Bardhaman Town', 'Baranilpur', 'Khosbagan', 'Vivekananda Pally', 'Vivekananda College Road', 'Rathtala', 'Chhotonilpur', 'Laxmipur Math', 'Susopanna', 'Boro Nilpur', 'Bardhaman'],
      north: ['Alamganj', 'Tikrahat', 'Keshabganj', 'Kalna Gate'],
      south: ['Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan']
    };

    // 3. Filter by Zone
    let zonePujas = townPujas.filter(p => (ZONES[zone] || []).includes(p.area));
    if (zonePujas.length === 0) zonePujas = [...townPujas];

    // 4. Filter by Vibe
    let vibePujas = zonePujas.filter(p => {
      if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
      if (vibe === 'carnival') return p.categories.includes('Community Puja');
      if (vibe === 'accessible') return p.categories.includes('Traditional') || p.zone === 'Bardhaman Town';
      return true;
    });

    if (vibePujas.length === 0) vibePujas = [...zonePujas];

    // 5. Determine count
    let count = 5;
    let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
    if (time === 'standard') { count = 10; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
    if (time === 'marathon') { count = 18; timeDesc = 'An all-night marathon covering maximum ground!'; }

    // 6. Build route using Nearest Neighbor Algorithm
    const getDist = (a: any, b: any) => {
      const dx = a.map.x - b.map.x;
      const dy = a.map.y - b.map.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    let finalPandals: any[] = [];
    let available = [...townPujas]; // Only use town pujas for fallback to ensure we never get Amadpur
    
    // Pick starting point
    let startPool = vibePujas.filter(p => p.featured);
    if (startPool.length === 0) startPool = vibePujas;
    
    let current = startPool[Math.floor(Math.random() * startPool.length)];
    if (!current) current = townPujas[0];

    finalPandals.push(current);
    available = available.filter(p => p.slug !== current.slug);

    while (finalPandals.length < count && available.length > 0) {
      let pool = available.filter(p => vibePujas.includes(p));
      if (pool.length === 0) pool = available.filter(p => zonePujas.includes(p));
      if (pool.length === 0) pool = available;

      let nearest: any = null;
      let minDist = Infinity;
      for (const p of pool) {
        const d = getDist(current, p);
        const score = p.featured ? d * 0.7 : d; // Pull strongly towards featured if nearby
        if (score < minDist) {
          minDist = score;
          nearest = p;
        }
      }

      if (!nearest) break;
      finalPandals.push(nearest);
      current = nearest;
      available = available.filter(p => p.slug !== nearest.slug);
    }

    // 7. Map to the route format expected by the UI
    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const d = getDist(p, finalPandals[i + 1]);
        if (transport === 'walk') {
          if (d > 20) transit = 'Toto / Walk 20+ mins';
          else if (d > 10) transit = 'Walk 10-15 mins';
          else transit = 'Walk 5 mins';
        } else if (transport === 'car') {
          if (d > 25) transit = 'Drive 15 mins';
          else transit = 'Drive / Park 5 mins';
        } else {
          if (d > 20) transit = 'Toto 15 mins';
          else if (d > 8) transit = 'Toto 5 mins';
          else transit = 'Walk 5 mins (Too close for Toto)';
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        tip: (p.description && p.description.length > 80) ? p.description.substring(0, 80) + '...' : p.description || 'A must-visit pandal!',
        transit
      };
    });

    const routeTitles: Record<string, string> = {
      'central': 'The Central Core Trail',
      'north': 'The Northern Heritage Route',
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
  };`;

code = code.replace(regex, newLogic);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Excluded outskirts and solidified map proximity routing.");
