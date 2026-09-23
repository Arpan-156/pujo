const fs = require('fs');
let c = fs.readFileSync('src/sections/FeaturedShowcase.tsx', 'utf8');

const wheelReplacement = `    const handleWheel = (e: WheelEvent) => {
      if (animating.current) return;
      if (Math.abs(e.deltaY) < 30) return;
      
      const target = e.target as HTMLElement;
      const inFooter = target.closest('.fs-footer-wrap');
      if (inFooter) {
        if (e.deltaY > 0) return; // Allow scrolling down in footer
        if (inFooter.scrollTop > 0) return; // Allow scrolling up if not at top
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      
      setActive(curr => {`;

const touchReplacement = `    const handleTouchMove = (e: TouchEvent) => {
      if (animating.current) return;
      
      const target = e.target as HTMLElement;
      const inFooter = target.closest('.fs-footer-wrap');
      const dy = touchStartY - e.touches[0].clientY;
      
      if (inFooter) {
        if (dy > 0) return; // Allow swiping up (scrolling down) in footer
        if (inFooter.scrollTop > 0) return; // Allow swiping down if not at top
      }

      if (Math.abs(dy) > 50) {
        const dir = dy > 0 ? 1 : -1;
        setActive(curr => {`;

c = c.replace(/const handleWheel = \(e: WheelEvent\) => \{\s*if \(animating\.current\) return;\s*if \(Math\.abs\(e\.deltaY\) < 30\) return;\s*const dir = e\.deltaY > 0 \? 1 : -1;\s*setActive\(curr => \{/, wheelReplacement);

c = c.replace(/const handleTouchMove = \(e: TouchEvent\) => \{\s*if \(animating\.current\) return;\s*const dy = touchStartY - e\.touches\[0\]\.clientY;\s*if \(Math\.abs\(dy\) > 50\) \{\s*const dir = dy > 0 \? 1 : -1;\s*setActive\(curr => \{/, touchReplacement);

// Add class to footer wrapper
c = c.replace(/<div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>/, `<div className="fs-footer-wrap" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>`);

fs.writeFileSync('src/sections/FeaturedShowcase.tsx', c);

