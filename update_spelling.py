import codecs
import re

with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

pujas = pujas.replace("name: 'Ghordourchati Sharbojonin'", "name: 'Ghordour Choti Sharbojonin Durga Puja'")
pujas = pujas.replace("slug: 'ghordourchati-sharbojonin'", "slug: 'ghordour-choti-sharbojonin'")

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)
