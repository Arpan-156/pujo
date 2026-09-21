import json
data = [
  ('natural-city', 'Natural City', 'Vivekananda College Road', 'heritage', 'Sabekiana / Traditional Bengal'),
  ('rathtala-barowari', 'Rathtala Barowari', 'Rathtala', 'mythology', 'Mahakal'),
  ('kiran-sangha', 'Kiran Sangha', 'Ichlabad', 'eco', 'Jol-i Jibon / Water is Life'),
  ('padmashree-sangha', 'Padmashree Sangha', 'Susopanna', 'heritage', 'Pushpanjali'),
  ('boro-nilpur', 'Boro Nilpur', 'Boro Nilpur', 'architecture', 'Dubai Swaminarayan Temple'),
  ('alamganj-barowari-kedarnath', 'Alamganj Barowari', 'Alamganj', 'architecture', 'Kedarnath'),
  ('laxmipur-math', 'Laxmipur Math', 'Laxmipur Math', 'contemporary', 'Domino Theme'),
  ('nabin-sangha', 'Nabin Sangha', 'Chhotonilpur', 'architecture', 'Hawa Mahal, Rajasthan'),
  ('ichlabad-kiran-sangha', 'Ichlabad Kiran Sangha', 'Ichlabad', 'mythology', 'Baahubali', True),
  ('keshabganj-choti-barowari', 'Keshabganj Choti Barowari', 'Keshabganj', 'social', 'Ami Nari, Ami Mohiyoshi'),
  ('alamganj-barowari-bhubaneswari', 'Alamganj Barowari', 'Alamganj', 'architecture', 'Bhubaneswari Temple'),
  ('chowringhee-club', 'Chowringhee Club', 'Chhotonilpur', 'contemporary', 'In the Land of the Blue Fairy'),
  ('laltu-smriti-sangha', 'Laltu Smriti Sangha', 'Baranilpur', 'architecture', 'Tirupati Balaji Temple', True),
  ('subhash-athletic-club', 'Subhash Athletic Club', 'Nutanpally', 'contemporary', 'A Piece of Kashmir'),
  ('badamtala-khaluibil-math', 'Badamtala Khaluibil Math', 'Katwa Road', 'social', 'Artanader Itikotha'),
  ('burirbagan-sarbojanin', 'Burirbagan Sarbojanin', 'Burir Bagan', 'social', 'Matririn'),
  ('barsul-yma', 'Barsul Young Mens Association', 'Barsul', 'architecture', 'Red Fort', False, False),
  ('tikrahat-sarbojanin', 'Tikrahat Sarbojanin', 'Tikrahat', 'social', 'The Agony of 46'),
  ('barsul-jagarani', 'Barsul Jagarani', 'Barsul', 'contemporary', 'Rangamanch / Stage', False, False),
  ('kalna-gate-bank-para', 'Kalna Gate Bank Para', 'Kalna Gate', 'mythology', 'Ardhanarishwar'),
  ('sripally-officers-colony', 'Sripally Officers Colony', 'Sripally', 'social', 'Yoga Shakti'),
  ('bandhab-sangha', 'Bandhab Sangha', 'Bardhaman', 'contemporary', 'Pinjore Pran Muktir Gaan'),
  ('shyamlal-sarbojanin', 'Shyamlal Sarbojanin', 'Khosbagan', 'mythology', 'Har Har Mahadev')
]

rows = []
for i, d in enumerate(data):
    slug, name, area, themeId, themeName = d[0:5]
    feat = d[5] if len(d) > 5 else False
    town = d[6] if len(d) > 6 else True
    
    cat = 'Theme Puja' if themeId != 'heritage' else 'Traditional'
    rows.append(f\"\"\"  {{ slug: '{slug}', name: '{name}', area: '{area}', town: {str(town).lower()}, themeId: '{themeId}', themeName: '{themeName}',
    cats: ['Community Puja', '{cat}'], est: {1970 + i}, feat: {str(feat).lower()}, art: 'pandal', seed: {100+i}, hue: {i*10}, tone: 'night', x: {20 + (i%5)*15}, y: {20 + (i//5)*15},
    desc: 'Celebrating Durga Puja with grand festivities and devotion.' }}\"\"\")

print(',\\n'.join(rows))
