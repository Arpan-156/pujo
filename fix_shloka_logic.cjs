const fs = require('fs');
let code = fs.readFileSync('src/sections/DailyShloka.tsx', 'utf8');

const replacement = `
        if (json.pujaDays && json.pujaDays[today]) {
          setData(json.pujaDays[today]);
        } else if (json[today]) {
          // Fallback to old format just in case
          setData(json[today]);
        } else {
          // Calculate day of the year (1-365)
          const start = new Date(d.getFullYear(), 0, 0);
          const diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);
          
          if (json.daily365 && json.daily365.length > 0) {
            const rotatedData = json.daily365[(dayOfYear - 1) % json.daily365.length];
            setData({
               ...rotatedData,
               dayName: \`Daily Insight: \${rotatedData.dayName}\`
            });
          } else {
            // Old fallback
            const keys = Object.keys(json).filter(k => k !== 'fallback' && k !== 'pujaDays' && k !== 'daily365');
            const index = dayOfYear % keys.length;
            const rotatedData = json[keys[index]];
            setData({
               ...rotatedData,
               dayName: \`Pre-Puja Focus: \${rotatedData.dayName}\`
            });
          }
        }
`;

// Replace the old block inside fetchToday
code = code.replace(
  /if \(json\[today\]\) \{[\s\S]*?dayName: \`Pre-Puja Focus: \$\{rotatedData\.dayName\}\`\s*\}\);\s*\}/,
  replacement.trim()
);

fs.writeFileSync('src/sections/DailyShloka.tsx', code, 'utf8');
console.log('Fixed DailyShloka logic');
