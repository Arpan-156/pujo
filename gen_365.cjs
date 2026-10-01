const fs = require('fs');

const pujaDays = {
  "2026-10-10": {
    "dayName": "Mahalaya",
    "shloka": "\u09AF\u09BE \u09A6\u09C7\u09AC\u09C0 \u09B8\u09B0\u09CD\u09AC\u09AD\u09C2\u09A4\u09C7\u09B7\u09C1 \u09AE\u09BE\u09A4\u09C3\u09B0\u09C2\u09AA\u09C7\u09A3 \u09B8\u0982\u09B8\u09CD\u09A5\u09BF\u09A4\u09BE",
    "meaning": "To that Goddess who dwells in all beings as a Mother, I bow to her again and again.",
    "fact": "Mahalaya marks the beginning of Devi Paksha. The goddess descends to Earth."
  },
  "2026-10-16": {
    "dayName": "Shasthi",
    "shloka": "\u0993\u0981 \u09AC\u09BF\u09B2\u09CD\u09AC\u09AC\u09C3\u0995\u09CD\u09B7\u09AC\u09BE\u09B8\u09BF\u09A8\u09CD\u09AF\u09C8 \u09A8\u09AE\u0983",
    "meaning": "O Goddess residing in the Bilva tree, please awaken.",
    "fact": "Bodhon is the formal awakening of the Goddess under a Bilva (Bael) tree."
  },
  "2026-10-17": {
    "dayName": "Saptami",
    "shloka": "\u0993\u0981 \u09A8\u09AC\u09AA\u09A4\u09CD\u09B0\u09BF\u0995\u09BE\u09AC\u09BE\u09B8\u09BF\u09A8\u09CD\u09AF\u09C8 \u09A8\u09AE\u0983",
    "meaning": "Salutations to the Goddess residing in the nine sacred plants.",
    "fact": "The Kola Bou is bathed in the river at dawn and placed beside Ganesha."
  },
  "2026-10-18": {
    "dayName": "Ashtami",
    "shloka": "\u099A\u09BE\u09AE\u09C1\u09A3\u09CD\u09A1\u09C7 \u099C\u09AF\u09BC\u09AE\u0999\u09CD\u0997\u09B2\u09C7 \u09AD\u09C1\u0995\u09CD\u09A4\u09BF\u09AE\u09C1\u0995\u09CD\u09A4\u09BF\u09AA\u09CD\u09B0\u09A6\u09BE\u09AF\u09BC\u09BF\u09A8\u09BF",
    "meaning": "O Chamunda, granter of enjoyment and liberation.",
    "fact": "Sandhi Puja occurs at the exact juncture when Ashtami ends and Navami begins."
  },
  "2026-10-19": {
    "dayName": "Navami",
    "shloka": "\u0993\u0981 \u0986\u09AF\u09BC\u09C1\u09B0\u09CD\u09A6\u09C7\u09B9\u09BF \u09A7\u09A8\u0982 \u09A6\u09C7\u09B9\u09BF \u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u0982 \u09A6\u09C7\u09B9\u09BF \u09AE\u09B9\u09C7\u09B6\u09CD\u09AC\u09B0\u09BF",
    "meaning": "Grant me long life, wealth, and knowledge, O Supreme Goddess.",
    "fact": "Navami is the final day of battle. A massive Maha Aarti and Homa are performed."
  },
  "2026-10-20": {
    "dayName": "Dashami",
    "shloka": "\u0997\u099A\u09CD\u099B \u0997\u099A\u09CD\u099B \u09AA\u09B0\u0982 \u09B8\u09CD\u09A5\u09BE\u09A8\u0982 \u09B8\u09CD\u09AC\u09B8\u09CD\u09A5\u09BE\u09A8\u0982 \u09AA\u09B0\u09AE\u09C7\u09B6\u09CD\u09AC\u09B0\u09BF",
    "meaning": "Return to your supreme abode, O Supreme Goddess.",
    "fact": "The idols are immersed, symbolizing her return to Mount Kailash."
  }
};

const dailyPool = [
  {
    "shloka": "\u09B8\u09B0\u09CD\u09AC\u09AE\u0999\u09CD\u0997\u09B2\u09AE\u0999\u09CD\u0997\u09B2\u09CD\u09AF\u09C7 \u09B6\u09BF\u09AC\u09C7 \u09B8\u09B0\u09CD\u09AC\u09BE\u09B0\u09CD\u09A5\u09B8\u09BE\u09A7\u09BF\u0995\u09C7",
    "meaning": "To the auspiciousness of all auspiciousness, to the good, to the accomplisher of all objectives.",
    "fact": "The Goddess represents the ultimate creative energy (Shakti) of the universe."
  },
  {
    "shloka": "\u0993\u0981 \u099C\u09AF\u09BC\u09A8\u09CD\u09A4\u09C0 \u09AE\u0999\u09CD\u0997\u09B2\u09BE \u0995\u09BE\u09B2\u09C0 \u09AD\u09A6\u09CD\u09B0\u0995\u09BE\u09B2\u09C0 \u0995\u09AA\u09BE\u09B2\u09BF\u09A8\u09C0",
    "meaning": "Salutations to Jayanti, Mangala, Kali, Bhadrakali, and Kapalini.",
    "fact": "This mantra invokes the protective and fierce forms of the Divine Mother."
  },
  {
    "shloka": "\u09A6\u09C1\u09B0\u09CD\u0997\u09BE \u0995\u09CD\u09B7\u09AE\u09BE \u09B6\u09BF\u09AC\u09BE \u09A7\u09BE\u09A4\u09CD\u09B0\u09C0 \u09B8\u09CD\u09AC\u09BE\u09B9\u09BE \u09B8\u09CD\u09AC\u09A7\u09BE \u09A8\u09AE\u09CB\u09BD\u09B8\u09CD\u09A4\u09C1\u09A4\u09C7",
    "meaning": "Salutations to Durga, the forgiving one, the auspicious one, the sustainer.",
    "fact": "Durga translates to 'the invincible' or 'one who is difficult to reach'."
  },
  {
    "shloka": "\u09B0\u09C2\u09AA\u0982 \u09A6\u09C7\u09B9\u09BF \u099C\u09AF\u09BC\u0982 \u09A6\u09C7\u09B9\u09BF \u09AF\u09B6\u09CB \u09A6\u09C7\u09B9\u09BF \u09A6\u09CD\u09AC\u09BF\u09B7\u09CB \u099C\u09B9\u09BF",
    "meaning": "Grant me beauty, grant me victory, grant me glory, and destroy my enemies.",
    "fact": "These lines are part of the Argala Stotram chanted before reading the Chandi Path."
  },
  {
    "shloka": "\u09AF\u09BE \u09A6\u09C7\u09AC\u09C0 \u09B8\u09B0\u09CD\u09AC\u09AD\u09C2\u09A4\u09C7\u09B7\u09C1 \u09B6\u0995\u09CD\u09A4\u09BF\u09B0\u09C2\u09AA\u09C7\u09A3 \u09B8\u0982\u09B8\u09CD\u09A5\u09BF\u09A4\u09BE",
    "meaning": "To that Goddess who dwells in all beings in the form of Power.",
    "fact": "Shakti implies both physical strength and spiritual empowerment."
  },
  {
    "shloka": "\u09AF\u09BE \u09A6\u09C7\u09AC\u09C0 \u09B8\u09B0\u09CD\u09AC\u09AD\u09C2\u09A4\u09C7\u09B7\u09C1 \u09B6\u09BE\u09A8\u09CD\u09A4\u09BF\u09B0\u09C2\u09AA\u09C7\u09A3 \u09B8\u0982\u09B8\u09CD\u09A5\u09BF\u09A4\u09BE",
    "meaning": "To that Goddess who dwells in all beings in the form of Peace.",
    "fact": "The Devi Mahatmyam highlights that Goddess embodies every human quality, including profound peace."
  },
  {
    "shloka": "\u09B6\u09B0\u09A3\u09BE\u0997\u09A4 \u09A6\u09C0\u09A8\u09BE\u09B0\u09CD\u09A4 \u09AA\u09B0\u09BF\u09A4\u09CD\u09B0\u09BE\u09A3 \u09AA\u09B0\u09BE\u09AF\u09BC\u09A3\u09C7",
    "meaning": "O Goddess, who is intent upon rescuing the distressed and afflicted who seek refuge in You.",
    "fact": "This verse reaffirms the Goddess as the ultimate shelter for humanity."
  }
];

const days365 = [];
for (let i = 0; i < 365; i++) {
  const quote = dailyPool[i % dailyPool.length];
  days365.push({
    dayName: `Countdown to Pujo (Day ${365 - i})`,
    shloka: quote.shloka,
    meaning: quote.meaning,
    fact: quote.fact
  });
}

const finalJson = {
  pujaDays,
  daily365: days365
};

fs.writeFileSync('public/shlokas.json', JSON.stringify(finalJson, null, 2), 'utf8');
console.log('Generated 365 shlokas structure.');
