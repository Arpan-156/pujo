import codecs

with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    content = f.read()

ghordourchati = "\n  { slug: 'ghordourchati-sharbojonin', name: 'Ghordourchati Sharbojonin', area: 'Ghordourchati Crossing', town: true, themeId: 'contemporary', themeName: 'Mayachakra', cats: ['Community Puja', 'Theme Puja'], est: 2000, feat: false, art: 'pandal', seed: 126, hue: 130, tone: 'night', x: 60, y: 35, lat: 23.2558, lng: 87.8592, desc: 'Celebrating Durga Puja with grand festivities and devotion.' }"

if 'ghordourchati-sharbojonin' not in content:
    content = content.replace(
        "desc: 'Celebrating Durga Puja with grand festivities and devotion.' }",
        "desc: 'Celebrating Durga Puja with grand festivities and devotion.' }," + ghordourchati,
        1 # Only replace the first occurrence (or last if we match a specific one)
    )
    
    # Better to just insert it before the closing bracket of ROWS
    # Let's find "];\n\nexport const PUJAS"
    if "];\n\nexport const PUJAS" in content:
        content = content.replace("];\n\nexport const PUJAS", f"  ,{ghordourchati}\n];\n\nexport const PUJAS")

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(content)
