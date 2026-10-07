import codecs
import re

with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    content = f.read()

new_pandal = "\n  { slug: 'olaichanditala-sarbojonin', name: 'Olaichanditala Sarbojonin', area: '5 Ichlabad, Sripally, Bardhaman', town: true, themeId: 'heritage', themeName: 'Sabekiana', cats: ['Community Puja', 'Traditional'], est: 1980, feat: false, art: 'pandal', seed: 130, hue: 45, tone: 'night', x: 75, y: 55, lat: 23.228367614577127, lng: 87.88417692671021, desc: 'Celebrating Durga Puja with grand festivities and devotion.' }"

if 'olaichanditala-sarbojonin' not in content:
    # Insert right before "];\n\nexport const PUJAS"
    content = content.replace("];\n\nexport const PUJAS", f"  ,{new_pandal}\n];\n\nexport const PUJAS")

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(content)

