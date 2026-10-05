import codecs
import re

# Update pujas.ts
with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

new_pandal = "{ slug: 'ghordourchati-sharbojonin', name: 'Ghordourchati Sharbojonin', area: 'Ghordourchati Crossing', town: true, themeId: 'contemporary', themeName: 'Mayachakra', cats: ['Community Puja', 'Theme Puja'], est: 2000, feat: false, art: 'pandal', seed: 126, hue: 130, tone: 'night', x: 60, y: 35, lat: 23.2558, lng: 87.8592, desc: 'Celebrating Durga Puja with grand festivities and devotion.' }"
pujas = re.sub(r"\{\s*slug:\s*'ghordourchati-sharbojonin'[^}]*\}", new_pandal, pujas)

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)

# Update geo.ts
with codecs.open('src/lib/geo.ts', 'r', 'utf-8') as f:
    geo = f.read()

geo = geo.replace("lat: 23.238437, lng: 87.854812", "lat: 23.2558, lng: 87.8592")

with codecs.open('src/lib/geo.ts', 'w', 'utf-8') as f:
    f.write(geo)
