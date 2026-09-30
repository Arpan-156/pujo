const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const generate = \(\) => \{[\s\S]*?setRoute\(\{[\s\S]*?\}\);\n  \};/m;

const newLogic = `const generate = () => {
    // 1. Define Area Zones
    const ZONES: Record<string, string[]> = {
      central: ['Bardhaman Town', 'Baranilpur', 'Khosbagan', 'Vivekananda Pally', 'Vivekananda College Road', 'Rathtala', 'Chhotonilpur', 'Laxmipur Math', 'Susopanna', 'Boro Nilpur', 'Bardhaman'],
      north: ['Alamganj', 'Amadpur', 'Tikrahat', 'Keshabganj', 'Kalna Gate'],
      south: ['Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan', 'Barsul']
    };

    // 2. Filter by Zone
    let zonePujas = pujas.filter(p => (ZONES[zone] || []).includes(p.area));
    if (zonePujas.length === 0) zonePujas = [...pujas];

    // 3. Filter by Vibe
    let vibePujas = zonePujas.filter(p => {
      if (vibe === 'art') return p.categories.includes('Theme Puja') || p.categories.includes('Heritage');
      if (vibe === 'carnival') return p.categories.includes('Community Puja');
      if (vibe === 'accessible') return p.categories.includes('Traditional') || p.zone === 'Bardhaman Town';
      return true;
    });

    if (vibePujas.length === 0) vibePujas = [...zonePujas]; // Relax if too strict

    // 4. Determine count
    let count = 5;
    let timeDesc = 'A fast-paced 2-hour tour of the highlights.';
    if (time === 'standard') { count = 10; timeDesc = 'A solid 4-5 hour hop covering the major attractions.'; }
    if (time === 'marathon') { count = 18; timeDesc = 'An all-night marathon covering maximum ground!'; }

    // 5. Build route using Nearest Neighbor Algorithm
    // Distance function using map x/y
    const getDist = (a: any, b: any) => {
      const dx = a.map.x - b.map.x;
      const dy = a.map.y - b.map.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    let finalPandals = [];
    
    // Pick starting point: prioritize featured in vibe matches
    let available = [...pujas];
    let startPool = vibePujas.filter(p => p.featured);
    if (startPool.length === 0) startPool = vibePujas;
    
    let current = startPool[Math.floor(Math.random() * startPool.length)];
    finalPandals.push(current);
    available = available.filter(p => p.slug !== current.slug);

    // Iteratively pick the nearest neighbor that matches criteria
    while (finalPandals.length < count && available.length > 0) {
      // Prioritize pandals in the vibe pool first, if they run out, grab from zone pool, then global pool
      let pool = available.filter(p => vibePujas.includes(p));
      if (pool.length === 0) pool = available.filter(p => zonePujas.includes(p));
      if (pool.length === 0) pool = available;

      // Find nearest neighbor in the pool
      let nearest = null;
      let minDist = Infinity;
      for (const p of pool) {
        const d = getDist(current, p);
        // Slightly penalize non-featured to favor featured
        const score = p.featured ? d * 0.8 : d;
        if (score < minDist) {
          minDist = score;
          nearest = p;
        }
      }

      finalPandals.push(nearest);
      current = nearest;
      available = available.filter(p => p.slug !== nearest.slug);
    }

    // 6. Map to the route format expected by the UI
    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const d = getDist(p, finalPandals[i + 1]);
        // Map distance on minimap to transit logic
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

if (regex.test(code)) {
  code = code.replace(regex, newLogic);
  fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
  console.log("Successfully upgraded Route Planner with Nearest Neighbor!");
} else {
  console.error("Regex did not match!");
}
