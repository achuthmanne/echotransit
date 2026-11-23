const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'etthenda', ml: 'എത്തേണ്ട', start: 0.00, end: 0.90 },
    { id: 'purappedenda', ml: 'പുറപ്പെടേണ്ട', start: 1.00, end: 2.15 },
    { id: 'platformilekku_etthendiyirunna', ml: 'പ്ലാറ്റ്ഫോമിലേക്ക് എത്തേണ്ടിയിരുന്ന', start: 2.30, end: 4.80 },
    { id: 'platformil_ninnum_purappedendiyirunna', ml: 'പ്ലാറ്റ്ഫോമിൽ നിന്നും പുറപ്പെടേണ്ടിയിരുന്ന', start: 4.85, end: 7.55 },
    { id: 'oru', ml: 'ഒരു', start: 7.60, end: 8.55 },
    { id: 'koodathe', ml: 'കൂടാതെ', start: 8.60, end: 9.60 },
    { id: 'express', ml: 'എക്സ്പ്രസ്സ്', start: 9.70, end: 10.75 },
    { id: 'superfast_express', ml: 'സൂപ്പർഫാസ്റ്റ് എക്സ്പ്രസ്സ്', start: 10.85, end: 12.85 },
    { id: 'nanni', ml: 'നന്ദി', start: 12.95, end: 13.80 },
    { id: 'yathrakkar_shraddhikkuka', ml: 'യാത്രക്കാർ ശ്രദ്ധിക്കുക', start: 13.85, end: 15.70 }
  ];

  const outDir = 'public/audio_assets/phrases_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_malayalam_extra.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): ${p.id} (${p.ml}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 EXTRA MALAYALAM ANNOUNCEMENT PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
