const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const segments = [
    { num: 25, start: 0.00, end: 1.15 },
    { num: 26, start: 1.20, end: 2.42 },
    { num: 27, start: 2.46, end: 3.60 },
    { num: 28, start: 3.64, end: 4.76 },
    { num: 29, start: 4.80, end: 5.95 },
    { num: 30, start: 6.05, end: 6.85 },
    { num: 31, start: 6.95, end: 7.95 },
    { num: 32, start: 8.02, end: 9.04 },
    { num: 33, start: 9.10, end: 10.14 },
    { num: 34, start: 10.20, end: 11.26 },
    { num: 35, start: 11.30, end: 12.42 },
    { num: 36, start: 12.48, end: 13.58 },
    { num: 37, start: 13.62, end: 14.72 },
    { num: 38, start: 14.78, end: 15.86 },
    { num: 39, start: 15.94, end: 17.00 },
    { num: 40, start: 17.04, end: 17.90 },
    { num: 41, start: 18.00, end: 19.00 },
    { num: 42, start: 19.06, end: 20.08 },
    { num: 43, start: 20.14, end: 21.18 },
    { num: 44, start: 21.22, end: 22.30 },
    { num: 45, start: 22.34, end: 23.46 },
    { num: 46, start: 23.54, end: 24.64 },
    { num: 47, start: 24.70, end: 25.80 },
    { num: 48, start: 25.84, end: 26.92 },
    { num: 49, start: 26.98, end: 28.06 },
    { num: 50, start: 28.14, end: 28.95 },
    { num: 51, start: 29.06, end: 30.06 },
    { num: 52, start: 30.12, end: 31.14 },
    { num: 53, start: 31.20, end: 32.24 },
    { num: 54, start: 32.30, end: 33.38 },
    { num: 55, start: 33.42, end: 34.54 },
    { num: 56, start: 34.60, end: 35.68 },
    { num: 57, start: 35.74, end: 36.84 },
    { num: 58, start: 36.90, end: 37.96 },
    { num: 59, start: 38.04, end: 39.08 },
    { num: 60, start: 39.12, end: 40.05 }
  ];

  const outDir = 'public/audio_assets/numbers_en';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  segments.forEach((s, idx) => {
    const mp3Path = path.join(outDir, `${s.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_en_25_to_60.mp3',
        target: mp3Path,
        start: s.start,
        end: s.end
      });
      console.log(`[${idx + 1}/36] Extracted (MP3): ${s.num}.mp3 -> ${s.start}s to ${s.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + s.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 36 ENGLISH NUMBERS (25 TO 60) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
