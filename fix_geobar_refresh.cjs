const fs = require('fs');
let code = fs.readFileSync('src/components/GeoBar.tsx', 'utf8');

// Fix handleRefresh
code = code.replace(
  /const handleRefresh = async \(\) => \{[\s\S]*?if \(onRefresh\) await onRefresh\(\);\n  \};/,
  `const handleRefresh = async () => {
    setLoading(true);
    requestPermission(); // Always fetch real GPS when refresh clicked!
    setTimeout(() => setLoading(false), 800);
    if (onRefresh) await onRefresh();
  };`
);

fs.writeFileSync('src/components/GeoBar.tsx', code, 'utf8');
console.log('Fixed handleRefresh');
