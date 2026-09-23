const fs = require('fs');
let content = fs.readFileSync('src/data/content.ts', 'utf8');

content = content.replace(/\{ id: 'curzon', title: 'Curzon Gate', bn: '[^']*', kind: 'Landmark',/g, "{ id: 'curzon', title: 'Curzon Gate', bn: 'কার্জন গেট', kind: 'Landmark',");
content = content.replace(/\{ id: 'station', title: 'Bardhaman Railway Station', bn: '[^']*', kind: 'Transit',/g, "{ id: 'station', title: 'Bardhaman Railway Station', bn: 'বর্ধমান জংশন', kind: 'Transit',");
content = content.replace(/\{ id: 'overbridge', title: 'The Railway Overbridge', bn: '[^']*', kind: 'Night view',/g, "{ id: 'overbridge', title: 'The Railway Overbridge', bn: 'রেল ওভারব্রিজ', kind: 'Night view',");
content = content.replace(/\{ id: 'damodar', title: 'Damodar River', bn: '[^']*', kind: 'River',/g, "{ id: 'damodar', title: 'Damodar River', bn: 'দামোদর', kind: 'River',");
content = content.replace(/\{ id: 'temples', title: 'The 108 Shiva Temples', bn: '[^']*', kind: 'Historic temples',/g, "{ id: 'temples', title: 'The 108 Shiva Temples', bn: 'নবাবহাট মন্দির', kind: 'Historic temples',");
content = content.replace(/\{ id: 'lake', title: 'Krishna Sayar', bn: '[^']*', kind: 'Water and birds',/g, "{ id: 'lake', title: 'Krishna Sayar', bn: 'কৃষ্ণসায়র', kind: 'Water and birds',");
content = content.replace(/\{ id: 'streets', title: 'Local streets', bn: '[^']*', kind: 'Streets',/g, "{ id: 'streets', title: 'Local streets', bn: 'গলি', kind: 'Streets',");
content = content.replace(/\{ id: 'food', title: 'Sitabhog and Mihidana', bn: '[^']*', kind: 'Food',/g, "{ id: 'food', title: 'Sitabhog and Mihidana', bn: 'সীতাভোগ ও মিহিদানা', kind: 'Food',");
content = content.replace(/\{ id: 'market', title: 'Markets', bn: '[^']*', kind: 'Markets',/g, "{ id: 'market', title: 'Markets', bn: 'বাজার', kind: 'Markets',");
content = content.replace(/\{ id: 'zones', title: 'Puja zones', bn: '[^']*', kind: 'Pandal hopping',/g, "{ id: 'zones', title: 'Puja zones', bn: 'পুজো এলাকা', kind: 'Pandal hopping',");

fs.writeFileSync('src/data/content.ts', content);

