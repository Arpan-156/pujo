import codecs
import re

with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

new_lat = "23.2384"
new_lng = "87.8548"

pujas = re.sub(r"(slug:\s*'ghordour-choti-sharbojonin'.*?lat:\s*)[\d\.]+(,\s*lng:\s*)[\d\.]+", f"\\g<1>{new_lat}\\g<2>{new_lng}", pujas)

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)
