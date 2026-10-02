const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

// Replace the faq array
const newFaqs = `const faqs = [
      { q: "What is the Burdwan Puja Guide?", a: "The Burdwan Puja Guide is your complete digital companion for Durga Puja 2026 in Burdwan (Bardhaman). It features curated pandal lists, themes, live voting, a transit survival kit, and an interactive map." },
      { q: "Where can I find Durga Puja pandals in Burdwan?", a: "You can explore our Pandal Directory or use the Interactive Puja Map to find precise locations and themes for all major committees across Bardhaman." },
      { q: "How can I explore the pandals efficiently?", a: "We recommend using our Route Planner to generate optimized walking or toto itineraries based on your current location and available time." },
      { q: "How does the Top 3 Voting work?", a: "You can vote for your 3 favorite pandals on the Top 3 Voter page. Select the best pandals you explored this year to help them win community recognition!" },
      { q: "Is there an offline mode or survival guide?", a: "Yes! Visit our Survival Kit page to find emergency contacts, bus and toto stands, and helpful tips to navigate the crowds safely. It is designed to be your offline companion." },
      { q: "Can I add my club's pandal to the directory?", a: "Absolutely! If your Durga Puja pandal is missing, please contact the Burdwan Capturers Official or Banglar Pujo Official teams through the social links in our footer to get it listed." },
      { q: "Do I need an active internet connection?", a: "While the map and live voting require internet, the Survival Kit and basic pandal directories are cached and can be accessed even with spotty network." },
      { q: "Is this guide free to use?", a: "Yes, the Burdwan Puja Guide is 100% free for all users and devotees." },
      { q: "How are the 'Featured' pandals selected?", a: "Featured pandals are handpicked by the Burdwan Capturers and Banglar Pujo teams based on artistic merit, heritage, and community impact." },
      { q: "Can I use the Route Planner while driving?", a: "The Route Planner allows you to select 'Car / Bike', 'Toto', or 'Walking'. Please follow local traffic restrictions as many roads become pedestrian-only during Puja." },
      { q: "What is the best time to go pandal hopping?", a: "For avoiding crowds, early mornings (4 AM - 8 AM) are best. For the full lighting and carnival experience, 7 PM to midnight is ideal." },
      { q: "Are all pandals wheelchair accessible?", a: "While many major theme pujas provide ramps, older heritage or narrow lane pujas might be challenging. We recommend checking the 'Traditional' filter for wider access." },
      { q: "How do I report an incorrect location on the map?", a: "Please reach out to us via the 'Contact Us' email in the footer, and our team will update the coordinates immediately." },
      { q: "What should I do if I get lost?", a: "Use the 'Survival Kit' page to find the nearest Police Assistance Booth or Toto stand. You can also share your GPS coordinates directly from the Route Planner." }
    ];`;

code = code.replace(/const faqs = \[[\s\S]*?\];/m, newFaqs);

// Make faq-container grid side-by-side on desktop
code = code.replace(
  '.faq-container {',
  '.faq-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;'
);
// Remove margin-bottom from faq-item since gap handles it
code = code.replace(
  'border-radius: 12px; margin-bottom: 16px;',
  'border-radius: 12px; align-self: start;'
);

fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Fixed FAQ layout');
