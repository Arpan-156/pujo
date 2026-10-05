import codecs
import re

# Update pujas.ts
with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

pujas = re.sub(r"(slug:\s*'ghordourchati-sharbojonin'.*?lat:\s*)[\d\.]+(,\s*lng:\s*)[\d\.]+", r"\g<1>23.2307\g<2>87.8732", pujas)

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)

# Update geo.ts
with codecs.open('src/lib/geo.ts', 'r', 'utf-8') as f:
    geo = f.read()

geo = re.sub(r"(name:\s*'Ghordourchati',\s*lat:\s*)[\d\.]+(,\s*lng:\s*)[\d\.]+", r"\g<1>23.2307\g<2>87.8732", geo)

with codecs.open('src/lib/geo.ts', 'w', 'utf-8') as f:
    f.write(geo)
