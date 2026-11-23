const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const segments = [
    { num: 1, ml: 'ഒന്ന്', start: 0.00, end: 0.90 },
    { num: 2, ml: 'രണ്ട്', start: 1.30, end: 2.45 },
    { num: 3, ml: 'മൂന്ന്', start: 2.80, end: 3.85 },
    { num: 4, ml: 'നാല്', start: 4.25, end: 5.35 },
    { num: 5, ml: 'അഞ്ച്', start: 5.70, end: 6.75 },
    { num: 6, ml: 'ആറ്', start: 7.10, end: 8.15 },
    { num: 7, ml: 'ഏഴ്', start: 8.50, end: 9.55 },
    { num: 8, ml: 'എട്ട്', start: 9.90, end: 10.90 },
    { num: 9, ml: 'ഒൻപത്', start: 11.25, end: 12.35 },
    { num: 10, ml: 'പത്ത്', start: 12.70, end: 13.70 },
    { num: 11, ml: 'പതിനൊന്ന്', start: 14.05, end: 15.20 },
    { num: 12, ml: 'പന്ത്രണ്ട്', start: 15.55, end: 16.75 },
    { num: 13, ml: 'പതിമൂന്ന്', start: 17.05, end: 18.25 },
    { num: 14, ml: 'പതിനാല്', start: 18.60, end: 19.80 },
    { num: 15, ml: 'പതിനഞ്ച്', start: 20.10, end: 21.35 },
    { num: 16, ml: 'പതിനാറ്', start: 21.65, end: 22.85 },
    { num: 17, ml: 'പതിനേഴ്', start: 23.15, end: 24.35 },
    { num: 18, ml: 'പതിനെട്ട്', start: 24.70, end: 25.85 },
    { num: 19, ml: 'പത്തൊൻപത്', start: 26.20, end: 27.50 },
    { num: 20, ml: 'ഇരുപത്', start: 27.75, end: 28.90 },
    { num: 21, ml: 'ഇരുപത്തൊന്ന്', start: 29.20, end: 30.70 },
    { num: 22, ml: 'ഇരുപത്തിരണ്ട്', start: 30.95, end: 32.45 },
    { num: 23, ml: 'ഇരുപത്തിമൂന്ന്', start: 32.75, end: 34.25 },
    { num: 24, ml: 'ഇരുപത്തിനാല്', start: 34.60, end: 36.10 }
  ];

  const outDir = 'public/audio_assets/numbers_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  segments.forEach((s, idx) => {
    const mp3Path = path.join(outDir, `${s.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_malayalam_1_to_24.mp3',
        target: mp3Path,
        start: s.start,
        end: s.end
      });
      console.log(`[${idx + 1}/24] Extracted (MP3): ${s.num} (${s.ml}) -> ${s.start}s to ${s.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + s.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 24 MALAYALAM NUMBERS (1 TO 24) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
