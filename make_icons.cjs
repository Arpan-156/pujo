const { Jimp } = require('jimp');

async function createIcons() {
  const image = await Jimp.read('public/favicon.jpg');
  
  const img192 = image.clone();
  img192.resize({ w: 192, h: 192 });
  await img192.write('public/pwa-192x192.png');
  
  const img512 = image.clone();
  img512.resize({ w: 512, h: 512 });
  await img512.write('public/pwa-512x512.png');
  
  console.log('Generated PNG icons successfully!');
}

createIcons().catch(console.error);
