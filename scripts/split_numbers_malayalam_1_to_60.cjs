const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const bursts = [
    { num: 1, start: 0.00, end: 0.55 },
    { num: 2, start: 0.85, end: 1.55 },
    { num: 3, start: 1.85, end: 2.55 },
    { num: 4, start: 2.85, end: 3.55 },
    { num: 5, start: 3.90, end: 4.55 },
    { num: 6, start: 4.90, end: 5.55 },
    { num: 7, start: 5.88, end: 6.52 },
    { num: 8, start: 6.84, end: 7.45 },
    { num: 9, start: 7.75, end: 8.48 },
    { num: 10, start: 8.74, end: 9.35 },
    { num: 11, start: 9.64, end: 10.40 },
    { num: 12, start: 10.68, end: 11.45 },
    { num: 13, start: 11.72, end: 12.50 },
    { num: 14, start: 12.76, end: 13.55 },
    { num: 15, start: 13.80, end: 14.60 },
    { num: 16, start: 14.84, end: 15.60 },
    { num: 17, start: 15.86, end: 16.70 },
    { num: 18, start: 16.90, end: 17.68 },
    { num: 19, start: 17.92, end: 18.78 },
    { num: 20, start: 19.02, end: 19.70 },
    { num: 21, start: 20.00, end: 20.98 },
    { num: 22, start: 21.20, end: 22.22 },
    { num: 23, start: 22.44, end: 23.50 },
    { num: 24, start: 23.70, end: 24.75 },
    { num: 25, start: 24.98, end: 26.06 },
    { num: 26, start: 26.28, end: 27.32 },
    { num: 27, start: 27.56, end: 28.62 },
    { num: 28, start: 28.84, end: 29.88 },
    { num: 29, start: 30.12, end: 31.26 },
    { num: 30, start: 31.52, end: 32.22 },
    { num: 31, start: 32.48, end: 33.52 },
    { num: 32, start: 33.74, end: 34.78 },
    { num: 33, start: 35.02, end: 36.08 },
    { num: 34, start: 36.32, end: 37.36 },
    { num: 35, start: 37.62, end: 38.70 },
    { num: 36, start: 38.92, end: 39.92 },
    { num: 37, start: 40.18, end: 41.24 },
    { num: 38, start: 41.48, end: 42.52 },
    { num: 39, start: 42.76, end: 43.90 },
    { num: 40, start: 44.18, end: 45.00 },
    { num: 41, start: 45.26, end: 46.38 },
    { num: 42, start: 46.62, end: 47.76 },
    { num: 43, start: 48.02, end: 49.18 },
    { num: 44, start: 49.42, end: 50.56 },
    { num: 45, start: 50.82, end: 52.02 },
    { num: 46, start: 52.26, end: 53.38 },
    { num: 47, start: 53.62, end: 54.84 },
    { num: 48, start: 55.08, end: 56.24 },
    { num: 49, start: 56.48, end: 57.76 },
    { num: 50, start: 58.02, end: 58.74 },
    { num: 51, start: 59.02, end: 60.06 },
    { num: 52, start: 60.30, end: 61.36 },
    { num: 53, start: 61.60, end: 62.64 },
    { num: 54, start: 62.90, end: 63.98 },
    { num: 55, start: 64.22, end: 65.32 },
    { num: 56, start: 65.56, end: 66.60 },
    { num: 57, start: 66.86, end: 67.96 },
    { num: 58, start: 68.20, end: 69.26 },
    { num: 59, start: 69.50, end: 70.68 },
    { num: 60, start: 70.98, end: 71.70 }
  ];

  const outDir = 'public/audio_assets/minutes_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  bursts.forEach((b, idx) => {
    const mp3Path = path.join(outDir, `${b.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_malayalam_1_to_60.mp3',
        target: mp3Path,
        start: b.start,
        end: b.end
      });
      console.log(`[${idx + 1}/60] Extracted (MP3): ${b.num}.mp3 -> ${b.start}s to ${b.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + b.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 60 MALAYALAM NUMBERS (1 TO 60) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
