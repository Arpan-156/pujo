const fs = require('fs');
let code = fs.readFileSync('src/pages/Pages.tsx', 'utf8');

const regex = /const faqs = \[([\s\S]*?)\];/;

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
    { q: "What should I do if I get lost?", a: "Use the 'Survival Kit' page to find the nearest Police Assistance Booth or Toto stand. You can also share your GPS coordinates directly from the Route Planner." },
    { q: "Which areas in Burdwan have the highest concentration of pandals?", a: "Areas like Alamganj, Kalibazar, Khosbagan, and Ichlabad generally host the highest concentration of major theme and traditional pujas." },
    { q: "Are there any special transport arrangements during Puja?", a: "Yes, special Toto routes and temporary barricades are set up across Bardhaman. Key intersections are managed by traffic police for pedestrian safety." },
    { q: "What is the significance of Sabekiana (Traditional) pujas?", a: "Sabekiana pujas preserve the centuries-old heritage of Bengal. They focus on traditional idol craftsmanship, Daker Saaj (silver foil decorations), and authentic rituals rather than modern thematic art." },
    { q: "How can I share my real-time location with friends?", a: "The Route Planner dashboard displays your exact GPS coordinates. You can copy them and share via WhatsApp to easily locate each other in the crowd." },
    { q: "Is photography allowed inside the pandals?", a: "Generally yes, but avoid using flash near the idol to prevent damage to the artwork. Also, keep moving to avoid holding up the line behind you." },
    { q: "Where can I find food and restrooms?", a: "Major intersections and large pandal grounds (like Town Hall or Police Line) have temporary food stalls and mobile bio-toilets arranged by the municipality." },
    { q: "Can I edit my Top 3 votes after submitting?", a: "No, votes are final once submitted to the global blockchain/database to prevent spam. Take your time to explore before locking in your choices!" },
    { q: "What should I carry during pandal hopping?", a: "Carry a water bottle, an umbrella, some cash (as digital payments may fail in crowded networks), and wear comfortable walking shoes." },
    { q: "Are there any emergency medical facilities available?", a: "Yes, first-aid kiosks and ambulance standby points are established near mega-pandals and major road crossings by local NGOs and the Health Department." },
    { q: "How is the app's walking distance calculated?", a: "We use direct geocoordinate calculations (Haversine formula) to estimate point-to-point distance, assuming a standard walking speed of 4.5 to 5 km/h." },
    { q: "Is Burdwan Puja different from Kolkata Puja?", a: "While Kolkata focuses heavily on avant-garde art, Burdwan Puja strikes a beautiful balance between massive thematic installations and deep-rooted community traditions, often with slightly more manageable crowds." },
    { q: "Are pets allowed during pandal hopping?", a: "It is strictly advised not to bring pets during peak evening hours due to massive crowds, loud dhak sounds, and bright lights that can cause severe anxiety to animals." },
    { q: "What is the Pandal Digital Passport?", a: "It's an upcoming gamified feature! You'll be able to 'check-in' via GPS at each pandal you visit to earn digital stamps and badges." },
    { q: "Who are the Burdwan Capturers?", a: "Burdwan Capturers is a prominent local community of photographers, videographers, and cultural enthusiasts who extensively document and promote Bardhaman's heritage." },
    { q: "Can non-residents easily navigate the town?", a: "Absolutely! The Smart Route Planner in this app is specifically designed to guide tourists and non-residents smoothly through the city's puja circuits." },
    { q: "What happens on Dashami (the last day)?", a: "Dashami features Sindoor Khela in the morning, followed by grand immersion processions (Bhasan) towards the Damodar river and Krishnasayar in the evening." },
    { q: "How are the themes decided by the clubs?", a: "Planning starts months in advance. Committees select themes reflecting social issues, historical events, fantasy realms, or environmental awareness, executed by skilled artisans." },
    { q: "Is the app available in Bengali?", a: "While the primary interface is English, key titles, names, and cultural references are presented bilingually with Bengali text to retain the local essence." },
    { q: "How frequently is the Global Leaderboard updated?", a: "The leaderboard tallies community votes and refreshes dynamically. It accurately reflects the current trending pandals based on live user engagement." },
    { q: "What is the best way to handle parking?", a: "Parking near major pandals is prohibited. Utilize the designated municipal parking zones listed in the Survival Kit and use Totos or walk for the final stretch." }
];`;

code = code.replace(regex, newFaqs);
fs.writeFileSync('src/pages/Pages.tsx', code, 'utf8');
console.log('Added 20 FAQs');
