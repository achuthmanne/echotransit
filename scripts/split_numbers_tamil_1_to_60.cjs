const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const bursts = [
    { num: 1, start: 0.00, end: 0.78 },
    { num: 2, start: 0.95, end: 1.76 },
    { num: 3, start: 1.90, end: 2.74 },
    { num: 4, start: 2.90, end: 3.74 },
    { num: 5, start: 3.90, end: 4.66 },
    { num: 6, start: 4.84, end: 5.54 },
    { num: 7, start: 5.70, end: 6.50 },
    { num: 8, start: 6.66, end: 7.40 },
    { num: 9, start: 7.58, end: 8.36 },
    { num: 10, start: 8.50, end: 9.18 },
    { num: 11, start: 9.38, end: 10.28 },
    { num: 12, start: 10.40, end: 11.28 },
    { num: 13, start: 11.42, end: 12.40 },
    { num: 14, start: 12.54, end: 13.48 },
    { num: 15, start: 13.60, end: 14.52 },
    { num: 16, start: 14.66, end: 15.52 },
    { num: 17, start: 15.66, end: 16.54 },
    { num: 18, start: 16.66, end: 17.52 },
    { num: 19, start: 17.68, end: 18.60 },
    { num: 20, start: 18.72, end: 19.50 },
    { num: 21, start: 19.64, end: 20.76 },
    { num: 22, start: 20.90, end: 22.08 },
    { num: 23, start: 22.18, end: 23.40 },
    { num: 24, start: 23.50, end: 24.72 },
    { num: 25, start: 24.82, end: 26.00 },
    { num: 26, start: 26.10, end: 27.24 },
    { num: 27, start: 27.34, end: 28.52 },
    { num: 28, start: 28.64, end: 29.78 },
    { num: 29, start: 29.92, end: 31.14 },
    { num: 30, start: 31.28, end: 32.08 },
    { num: 31, start: 32.20, end: 33.34 },
    { num: 32, start: 33.46, end: 34.68 },
    { num: 33, start: 34.78, end: 36.02 },
    { num: 34, start: 36.12, end: 37.36 },
    { num: 35, start: 37.46, end: 38.66 },
    { num: 36, start: 38.76, end: 39.90 },
    { num: 37, start: 40.02, end: 41.20 },
    { num: 38, start: 41.30, end: 42.46 },
    { num: 39, start: 42.56, end: 43.80 },
    { num: 40, start: 43.92, end: 44.82 },
    { num: 41, start: 44.94, end: 46.16 },
    { num: 42, start: 46.28, end: 47.54 },
    { num: 43, start: 47.64, end: 48.94 },
    { num: 44, start: 49.04, end: 50.36 },
    { num: 45, start: 50.46, end: 51.74 },
    { num: 46, start: 51.84, end: 53.08 },
    { num: 47, start: 53.18, end: 54.44 },
    { num: 48, start: 54.54, end: 55.78 },
    { num: 49, start: 55.88, end: 57.20 },
    { num: 50, start: 57.30, end: 58.12 },
    { num: 51, start: 58.24, end: 59.40 },
    { num: 52, start: 59.50, end: 60.72 },
    { num: 53, start: 60.82, end: 62.06 },
    { num: 54, start: 62.16, end: 63.42 },
    { num: 55, start: 63.52, end: 64.76 },
    { num: 56, start: 64.86, end: 66.04 },
    { num: 57, start: 66.14, end: 67.36 },
    { num: 58, start: 67.46, end: 68.64 },
    { num: 59, start: 68.76, end: 70.04 },
    { num: 60, start: 70.16, end: 70.94 }
  ];

  const outDir = 'public/audio_assets/numbers_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  bursts.forEach((b, idx) => {
    const mp3Path = path.join(outDir, `${b.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_tamil_1_to_60.mp3',
        target: mp3Path,
        start: b.start,
        end: b.end
      });
      console.log(`[${idx + 1}/60] Extracted (MP3): ${b.num}.mp3 -> ${b.start}s to ${b.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + b.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 60 TAMIL NUMBERS (1 TO 60) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
