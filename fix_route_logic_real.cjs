const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const generate = \(\) => \{[\s\S]*?setRoute\(\{[\s\S]*?\}\);\n  \};/m;

const newLogic = `const generate = () => {
    // 1. Filter out outskirts immediately
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

    // 6. Logical Geographic Sorting (Real-world layout instead of fake x/y)
    // This physically groups them from North to South along the main town artery
    const AREA_ORDER = [
      'Alamganj', 'Tikrahat', 'Keshabganj', 'Kalna Gate', // North
      'Khosbagan', 'Rathtala', 'Vivekananda Pally', 'Vivekananda College Road', 'Bardhaman', 'Susopanna', // Central-West
      'Baranilpur', 'Chhotonilpur', 'Laxmipur Math', 'Boro Nilpur', // Central-East
      'Sripally', 'Ichlabad', 'Nutanpally', 'Katwa Road', 'Burir Bagan' // South
    ];

    const getAreaIndex = (area: string) => {
      const idx = AREA_ORDER.indexOf(area);
      return idx === -1 ? 99 : idx;
    };

    let available = [...townPujas];
    
    // Sort all available pujas by logical geographic order first, then by featured status within the same area
    available.sort((a, b) => {
      const idxA = getAreaIndex(a.area);
      const idxB = getAreaIndex(b.area);
      if (idxA !== idxB) return idxA - idxB;
      // Same area: featured comes first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    let finalPandals: any[] = [];
    
    // Pick starting point based on vibe, preferably featured
    let startPool = available.filter(p => vibePujas.includes(p));
    if (startPool.length === 0) startPool = available;
    
    // To ensure variety, we don't always start at the absolute North. We can start somewhere in the first few.
    let current = startPool[Math.floor(Math.random() * Math.min(3, startPool.length))];
    if (!current) current = startPool[0];

    finalPandals.push(current);

    // Iteratively pick the next logical stop
    while (finalPandals.length < count) {
      // Find the next pandal in the sorted list that comes AFTER the current one (or wraps around)
      // that matches the vibe, AND isn't already in the list, AND doesn't have the same name!
      
      // Prevent duplicate names!
      const usedNames = finalPandals.map(p => p.name);
      const candidates = startPool.filter(p => !usedNames.includes(p.name));
      
      if (candidates.length === 0) {
        // If we ran out of vibe matches, expand to all town pujas
        const fallbackCandidates = available.filter(p => !usedNames.includes(p.name));
        if (fallbackCandidates.length === 0) break; // Literally no more unique pandals
        
        let next = fallbackCandidates.find(p => getAreaIndex(p.area) >= getAreaIndex(current.area));
        if (!next) next = fallbackCandidates[0]; // Wrap around
        finalPandals.push(next);
        current = next;
      } else {
        let next = candidates.find(p => getAreaIndex(p.area) >= getAreaIndex(current.area));
        if (!next) next = candidates[0]; // Wrap around to start if we reached the end
        finalPandals.push(next);
        current = next;
      }
    }

    // 7. Map to the route format expected by the UI
    const mappedPandals = finalPandals.map((p, i) => {
      let transit = 'Walk 5 mins';
      
      if (i === finalPandals.length - 1) {
        transit = 'End of route';
      } else {
        const nextP = finalPandals[i + 1];
        // Dynamic transit based on whether they are in the same neighborhood!
        if (p.area === nextP.area) {
          transit = 'Walk 5 mins';
        } else {
          // Different neighborhood
          const idxDiff = Math.abs(getAreaIndex(p.area) - getAreaIndex(nextP.area));
          if (transport === 'walk') {
            if (idxDiff > 3) transit = 'Toto / Walk 20+ mins';
            else transit = 'Walk 10-15 mins';
          } else if (transport === 'car') {
            transit = 'Drive / Park 10 mins';
          } else {
            if (idxDiff > 3) transit = 'Toto 15 mins';
            else transit = 'Toto 5 mins';
          }
        }
      }
      
      return {
        name: p.name,
        zone: p.area,
        theme: p.theme || 'Traditional',
        tip: (() => {
          if (p.featured) return (p.description && p.description.length > 70 ? p.description.substring(0, 70) + '...' : p.description) + ' (Award Winner!)';
          let tips = [];
          if (p.categories.includes('Theme Puja')) tips.push('Take your time to notice the intricate theme details.');
          else if (p.categories.includes('Traditional')) tips.push('Experience the authentic, traditional Sabeki vibe.');
          if (p.themeId === 'architecture') tips.push('Stand back for a wide-angle shot of the grand structure!');
          if (p.themeId === 'eco') tips.push('Look closely at the eco-friendly materials used in the decor.');
          if (['Chhotonilpur', 'Baranilpur', 'Alamganj'].includes(p.area)) tips.push('Expect heavy crowds—keep your group together!');
          if (time === 'marathon' && Math.random() > 0.6) tips.push('Great spot to grab some phuchka or egg roll nearby!');
          if (tips.length > 0) return tips[Math.floor(Math.random() * tips.length)];
          return 'Arrive early to beat the massive queues!';
        })(),
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
console.log("Fixed haphazard routing and duplicate names.");
