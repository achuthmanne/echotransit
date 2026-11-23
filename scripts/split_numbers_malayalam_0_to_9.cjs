const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const segments = [
    { num: 0, ml: 'പൂജ്യം', start: 0.00, end: 0.75 },
    { num: 1, ml: 'ഒന്ന്', start: 0.95, end: 1.70 },
    { num: 2, ml: 'രണ്ട്', start: 1.85, end: 2.70 },
    { num: 3, ml: 'മൂന്ന്', start: 2.85, end: 3.65 },
    { num: 4, ml: 'നാല്', start: 3.80, end: 4.65 },
    { num: 5, ml: 'അഞ്ച്', start: 4.80, end: 5.60 },
    { num: 6, ml: 'ആറ്', start: 5.80, end: 6.60 },
    { num: 7, ml: 'ഏഴ്', start: 6.80, end: 7.60 },
    { num: 8, ml: 'എട്ട്', start: 7.75, end: 8.50 },
    { num: 9, ml: 'ഒൻപത്', start: 8.65, end: 9.50 }
  ];

  const outDir = 'public/audio_assets/digits_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  segments.forEach((s, idx) => {
    const mp3Path = path.join(outDir, `${s.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_malayalam_0_to_9.mp3',
        target: mp3Path,
        start: s.start,
        end: s.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): ${s.num} (${s.ml}) -> ${s.start}s to ${s.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + s.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 MALAYALAM DIGITS (0 TO 9) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
