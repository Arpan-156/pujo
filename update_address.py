import codecs
import re

with codecs.open('src/data/pujas.ts', 'r', 'utf-8') as f:
    pujas = f.read()

new_area = "Ghordourchati Crossing"

pujas = re.sub(r"(slug:\s*'ghordourchati-sharbojonin'.*?area:\s*')[^']+(\'.*)", f"\\g<1>{new_area}\\g<2>", pujas)

with codecs.open('src/data/pujas.ts', 'w', 'utf-8') as f:
    f.write(pujas)
