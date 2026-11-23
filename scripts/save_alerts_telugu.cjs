const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/hp/.gemini/antigravity/brain/888771f8-8647-4b68-bda4-e0a9e3e20437/.user_uploaded';
const alertsDir = 'public/audio_assets/station_alerts';
const rawDir = 'public/audio_raw';

const files = [
  { src: 'uploaded_media_0_1795464025117.mp3', target: 'cleanliness_garbage_te.mp3', desc: 'Cleanliness & Garbage (Telugu)' },
  { src: 'uploaded_media_1_1795464025117.mp3', target: 'track_crossing_safety_te.mp3', desc: 'Track Crossing Safety & Foot Over Bridge (Telugu)' },
  { src: 'uploaded_media_2_1795464025117.mp3', target: 'unattended_baggage_te.mp3', desc: 'Unattended Baggage & Suspicious Objects (Telugu)' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const targetPath = path.join(alertsDir, f.target);
  const rawPath = path.join(rawDir, f.target);
  fs.copyFileSync(srcPath, targetPath);
  fs.copyFileSync(srcPath, rawPath);
  console.log(`Saved ${f.target} (${fs.statSync(targetPath).size} bytes) - ${f.desc}`);
});
console.log('SUCCESS: All 3 Telugu Station Safety Broadcasts saved directly!');
