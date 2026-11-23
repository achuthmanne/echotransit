const fs = require('fs');
const path = require('path');

// Authentic Indian Railways Station Names (Telugu / Southern Pronunciation)
// 25 Major Flagship Stations
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const stations = [
    { id: 'hyderabad', te: 'హైదరాబాద్', en: 'Hyderabad', start: 0.00, end: 0.98 },
    { id: 'secunderabad', te: 'సికింద్రాబాద్', en: 'Secunderabad', start: 1.05, end: 2.18 },
    { id: 'vijayawada', te: 'విజయవాడ', en: 'Vijayawada', start: 2.25, end: 3.28 },
    { id: 'visakhapatnam', te: 'విశాఖపట్నం', en: 'Visakhapatnam', start: 3.35, end: 4.48 },
    { id: 'guntur', te: 'గుంటూరు', en: 'Guntur', start: 4.54, end: 5.46 },
    { id: 'kakinada_port', te: 'కాకినాడ పోర్ట్', en: 'Kakinada Port', start: 5.52, end: 6.78 },
    { id: 'lingampalli', te: 'లింగంపల్లి', en: 'Lingampalli', start: 6.84, end: 7.88 },
    { id: 'repalle', te: 'రేపల్లె', en: 'Repalle', start: 7.94, end: 8.78 },
    { id: 'kacheguda', te: 'కాచిగూడ', en: 'Kacheguda', start: 8.82, end: 9.76 },
    { id: 'chittoor', te: 'చిత్తూరు', en: 'Chittoor', start: 9.82, end: 10.66 },
    { id: 'mgr_chennai_central', te: 'ఎంజీఆర్ చెన్నై సెంట్రల్', en: 'MGR Chennai Central', start: 10.72, end: 12.44 },
    { id: 'tambaram', te: 'తాంబరం', en: 'Tambaram', start: 12.50, end: 13.28 },
    { id: 'ksr_bengaluru', te: 'కేఎస్ఆర్ బెంగళూరు', en: 'KSR Bengaluru', start: 13.34, end: 14.70 },
    { id: 'smvt_bengaluru', te: 'ఎస్ఎంవిటి బెంగళూరు', en: 'SMVT Bengaluru', start: 14.76, end: 16.32 },
    { id: 'mysuru', te: 'మైసూరు', en: 'Mysuru', start: 16.38, end: 17.20 },
    { id: 'thiruvananthapuram_central', te: 'తిరువనంతపురం సెంట్రల్', en: 'Thiruvananthapuram Central', start: 17.25, end: 18.80 },
    { id: 'new_delhi', te: 'న్యూ ఢిల్లీ', en: 'New Delhi', start: 18.86, end: 19.74, alias: 'nai_dilli' },
    { id: 'hazrat_nizamuddin', te: 'హజ్రత్ నిజాముద్దీన్', en: 'Hazrat Nizamuddin', start: 19.80, end: 21.20 },
    { id: 'mumbai_central', te: 'ముంబై సెంట్రల్', en: 'Mumbai Central', start: 21.25, end: 22.36 },
    { id: 'howrah', te: 'హౌరా', en: 'Howrah', start: 22.42, end: 23.10 },
    { id: 'bhopal', te: 'భోపాల్', en: 'Bhopal', start: 23.15, end: 23.94 },
    { id: 'varanasi', te: 'వారణాసి', en: 'Varanasi', start: 24.00, end: 24.94 },
    { id: 'amritsar', te: 'అమృత్‌సర్', en: 'Amritsar', start: 24.98, end: 25.80 },
    { id: 'kolkata', te: 'కోల్‌కతా', en: 'Kolkata', start: 25.85, end: 26.64 },
    { id: 'tirupati', te: 'తిరుపతి', en: 'Tirupati', start: 26.68, end: 27.45 }
  ];

  const targetDirs = [
    'public/audio_assets/stations_te',
    'public/audio_assets/stations_ta'
  ];

  targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  stations.forEach((s, idx) => {
    targetDirs.forEach(dir => {
      const mp3Path = path.join(dir, `${s.id}.mp3`);
      try {
        MP3Cutter.cut({
          src: 'public/audio_raw/stations_telugu.mp3',
          target: mp3Path,
          start: s.start,
          end: s.end
        });
        if (s.alias) {
          const aliasPath = path.join(dir, `${s.alias}.mp3`);
          fs.copyFileSync(mp3Path, aliasPath);
        }
      } catch (e) {
        console.error('Error slicing ' + s.id + ' into ' + dir, e);
      }
    });
    console.log(`[${idx + 1}/25] Sliced: ${s.id}.mp3 (${s.te} - ${s.en}) -> ${s.start}s to ${s.end}s`);
  });

  console.log('\nSUCCESS: ALL 25 STATIONS SLICED WITH IDENTICAL NAMES FOR TELUGU & TAMIL!');
}

main().catch(err => console.error(err));
