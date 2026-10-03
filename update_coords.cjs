const fs = require('fs');

const coordsData = `Laltu smriti sangha - Lat-23.229232, lon- 87.869135
Jagoroni sangha club - Lat- 23.220459 , lon- 87.865717
Natural city- Lat- 23.224648 , lon- 87.859631
Rathtala para baroari- Lat- 23.392550 , lon- 88.504036
Kiran sangha- Lat- 23.228645 , lon- 87.881031
Padmashree sangha - lat- 23.227816 , lon- 87.875306
Alamganj baroari - Lat- 23.232791 , Lena 87.849424
Laxmipur math - Lat- 23.255559 , Lon-87.863531
Nabin sangha -Lat- 23.226692 , Lon- 87.865346
Kesabganjchatti barowari- Lat- 23.258469 , Lon- 87.848110 
Chourongi club - Lat- 23.218459 ,Lena 87.868430
Shubash atheletic club natunpally- Lat- 23.236069 , Lon- 87.878219
Burir bagan sarbojonin- Lat- 23.246270 , Lon- 87.864909 
Borsul young men's association - Lat- 23.184082, Lon- 87.963031
Tikorhat sarbojonin- Lat- 23.039375 , Lena 87.974222
Borsul jagoronin - Lat - 23.183059 , Lon- 87.957238
Sripally officers colony- Lat- 26.535867 , Lon- 89.533845
Youth club - Lat- 23.228660 ,lon- 87.879957
Shaymlal sarbojonin- Lat- 23.2325 , Lon- 87.8634
amdpur zamidar bari - Lat- 23.2326 , Lon- 88.0903`;

let code = fs.readFileSync('src/data/pujas.ts', 'utf8');

const updates = coordsData.split('\n').map(line => {
  const parts = line.split('-');
  const name = parts[0].trim().toLowerCase();
  
  // extract lat and lon using regex
  const latMatch = line.match(/Lat(?:itude)?[-: ]*([0-9.]+)/i);
  const lonMatch = line.match(/(?:lon|lena|longitude)[-: ]*([0-9.]+)/i);
  
  if (latMatch && lonMatch) {
    return { name, lat: parseFloat(latMatch[1]), lng: parseFloat(lonMatch[1]) };
  }
  return null;
}).filter(Boolean);

updates.forEach(u => {
  // Find the closest name in the code
  const regexSearchName = u.name.split(' ')[0].replace(/[^a-z]/g, '');
  const blockRegex = new RegExp(`name: ['"\`]?[^'",\`]*${regexSearchName}[^'",\`]*['"\`]?[\\s\\S]*?map:\\s*\\{[^}]*\\}`, 'i');
  
  if (blockRegex.test(code)) {
    code = code.replace(blockRegex, match => {
      // update the map block inside this match
      return match.replace(/map:\s*\{[^}]*\}/, `map: { x: 50, y: 50, lat: ${u.lat}, lng: ${u.lng} }`);
    });
  } else {
    console.log('Could not find:', u.name);
  }
});

// Add the new club "Baranilpur Friends club"
if (!code.includes('Baranilpur Friends club')) {
  const newClub = `
  {
    slug: 'baranilpur-friends',
    name: 'Baranilpur Friends club',
    area: 'Baranilpur',
    location: 'Baranilpur, Bardhaman',
    categories: ['Community Puja'],
    theme: 'Unknown',
    featured: false,
    map: { x: 50, y: 50, lat: 23.226136, lng: 87.868722 }
  },`;
  code = code.replace(/export const pujas: Puja\[\] = \[/, `export const pujas: Puja[] = [${newClub}`);
}

fs.writeFileSync('src/data/pujas.ts', code, 'utf8');
console.log('Updated coordinates and added new club');
