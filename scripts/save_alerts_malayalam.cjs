const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/hp/.gemini/antigravity/brain/888771f8-8647-4b68-bda4-e0a9e3e20437/.user_uploaded';
const alertsDir = 'public/audio_assets/station_alerts';
const rawDir = 'public/audio_raw';

const files = [
  { src: 'uploaded_media_0_1795466808780.mp3', target: 'cleanliness_garbage_ml.mp3', desc: 'Cleanliness & Waste Disposal (Malayalam)' },
  { src: 'uploaded_media_1_1795466808780.mp3', target: 'track_crossing_safety_ml.mp3', desc: 'Track Crossing Safety & Foot Over Bridge (Malayalam)' },
  { src: 'uploaded_media_2_1795466808780.mp3', target: 'unattended_baggage_ml.mp3', desc: 'Unattended Baggage & Suspicious Objects (Malayalam)' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const targetPath = path.join(alertsDir, f.target);
  const rawPath = path.join(rawDir, f.target);
  fs.copyFileSync(srcPath, targetPath);
  fs.copyFileSync(srcPath, rawPath);
  console.log(`Saved ${f.target} (${fs.statSync(targetPath).size} bytes) - ${f.desc}`);
});
console.log('SUCCESS: All 3 Malayalam Station Safety Broadcasts saved directly!');
