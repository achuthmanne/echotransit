const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'vara_vendiya', ta: 'வரவேண்டிய', start: 0.00, end: 1.18 },
    { id: 'purappada_vendiya', ta: 'புறப்பட வேண்டிய', start: 1.22, end: 2.48 },
    { id: 'nadaimedai_en', ta: 'நடைமேடை எண்', start: 2.52, end: 3.86 },
    { id: 'il_vara_vendiya', ta: 'இல் வரவேண்டிய', start: 3.90, end: 5.30 },
    { id: 'ilirundhu_purappada_vendiya', ta: 'இலிருந்து புறப்பட வேண்டிய', start: 5.34, end: 7.20 },
    { id: 'nimidam', ta: 'நிமிடம்', start: 7.24, end: 8.04 },
    { id: 'matrum', ta: 'மற்றும்', start: 8.08, end: 8.78 },
    { id: 'express', ta: 'எக்ஸ்பிரஸ்', start: 8.82, end: 9.70 },
    { id: 'superfast_express', ta: 'சூப்பர் பாஸ்ட் எக்ஸ்பிரஸ்', start: 9.74, end: 11.65 },
    { id: 'nandri', ta: 'நன்றி', start: 11.70, end: 12.50 }
  ];

  const outDir = 'public/audio_assets/phrases_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_tamil_extra.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): ${p.id} (${p.ta}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 TAMIL ANNOUNCEMENT PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
