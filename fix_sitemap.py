import xml.etree.ElementTree as ET

ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
tree = ET.parse('public/sitemap.xml')
root = tree.getroot()
seen = set()
to_remove = []
ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

for url in root.findall('ns:url', ns):
    loc = url.find('ns:loc', ns).text
    if loc in seen:
        to_remove.append(url)
    else:
        seen.add(loc)

for url in to_remove:
    root.remove(url)

tree.write('public/sitemap.xml', encoding='UTF-8', xml_declaration=True)
