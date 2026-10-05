import codecs
import re

# Update pujas.ts
with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

new_area = "6VCM+MCH, Bamchandaipur, Bardhaman, West Bengal 713103"
new_lat = "23.2384"
new_lng = "87.8548"

# We need to replace the area, lat, and lng
pujas = re.sub(r"(slug:\s*'ghordourchati-sharbojonin'.*?area:\s*')[^']+(\'.*?lat:\s*)[\d\.]+(,\s*lng:\s*)[\d\.]+", f"\\g<1>{new_area}\\g<2>{new_lat}\\g<3>{new_lng}", pujas)

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)

# Update geo.ts
with codecs.open('src/lib/geo.ts', 'r', 'utf-8') as f:
    geo = f.read()

geo = re.sub(r"(name:\s*'Ghordourchati',\s*lat:\s*)[\d\.]+(,\s*lng:\s*)[\d\.]+", f"\\g<1>{new_lat}\\g<2>{new_lng}", geo)

with codecs.open('src/lib/geo.ts', 'w', 'utf-8') as f:
    f.write(geo)
