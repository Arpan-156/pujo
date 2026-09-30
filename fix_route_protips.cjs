const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const target = /tip: \(p\.description && p\.description\.length > 80\) \? p\.description\.substring\(0, 80\) \+ '\.\.\.' : p\.description \|\| 'A must-visit pandal!',/;

const replacement = `tip: (() => {
          // Dynamic Pro Tip Generator
          if (p.featured) return p.description.substring(0, 75) + '... (Award Winner!)';
          
          let tips = [];
          
          if (p.categories.includes('Theme Puja')) {
            tips.push('Take your time to notice the intricate theme details.');
          } else if (p.categories.includes('Traditional')) {
            tips.push('Experience the authentic, traditional Sabeki vibe.');
          }
          
          if (p.themeId === 'architecture') tips.push('Stand back for a wide-angle shot of the grand structure!');
          if (p.themeId === 'eco') tips.push('Look closely at the eco-friendly materials used in the decor.');
          if (p.themeId === 'social') tips.push('Pay attention to the deep social message depicted here.');
          
          if (['Chhotonilpur', 'Baranilpur', 'Alamganj'].includes(p.area)) {
            tips.push('Expect heavy crowds—keep your group together!');
          }
          
          if (time === 'marathon' && Math.random() > 0.6) {
            tips.push('Great spot to grab some phuchka or egg roll nearby!');
          }
          
          // Combine or pick one
          if (tips.length > 0) {
            // Pick a random tip from the pool
            return tips[Math.floor(Math.random() * tips.length)];
          }
          
          return 'Arrive early to beat the massive queues!';
        })(),`;

code = code.replace(target, replacement);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log("Upgraded Pro Tips!");
