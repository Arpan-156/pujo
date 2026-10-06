import codecs

with codecs.open('src/components/HallOfFameV2.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Update guard condition
old_guard = "if (!p || (p.slug !== 'vivekananda-sevak-sangha' && p.slug !== 'jagoroni-sangha')) return null;"
new_guard = "if (!p || (p.slug !== 'vivekananda-sevak-sangha' && p.slug !== 'jagoroni-sangha' && p.slug !== 'ichlabad-youth-club')) return null;"

content = content.replace(old_guard, new_guard)

# Inject Ichlabad awards block right before Jagarani block
ichlabad_awards = """
  if (p.slug === 'ichlabad-youth-club') {
    awards = [
      { title: 'ABP Ananda', year: 'Award Winner', Icon: LogoABP },
      { title: 'Mukto Bangla', year: 'Award Winner', Icon: GenericLogo },
      { title: 'TV9 Bangla', year: 'Award Winner', Icon: LogoTV9 },
      { title: 'News18 Bangla', year: 'Award Winner', Icon: LogoNews18 },
      { title: 'Tara News', year: 'Award Winner', Icon: GenericLogo },
      { title: 'News 10', year: 'Award Winner', Icon: GenericLogo },
      { title: 'Sahara', year: 'Award Winner', Icon: GenericLogo },
      { title: 'Jela Prashasanik', year: 'Award Winner', Icon: GenericLogo },
      { title: 'Burdwan Durga Samman', year: 'Award Winner', Icon: GenericLogo },
      { title: 'Gana Bondhu Media', year: 'Award Winner', Icon: GenericLogo },
      { title: 'Matir Baag', year: 'Award Winner', Icon: GenericLogo },
    ];
  }
"""

# Find where to inject
if "if (p.slug === 'jagoroni-sangha') {" in content:
    content = content.replace("if (p.slug === 'jagoroni-sangha') {", ichlabad_awards.lstrip() + "\n  if (p.slug === 'jagoroni-sangha') {")

with codecs.open('src/components/HallOfFameV2.tsx', 'w', 'utf-8') as f:
    f.write(content)

