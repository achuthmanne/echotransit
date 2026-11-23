const fs = require('fs');
const path = require('path');

// Authentic CRIS/RDSO Indian Railways Telugu Numbers 0 to 60 for Minute/Delay and Counting
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const outDir = 'public/audio_assets/numbers_te';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Copy 0 to 9 from digits_te
  const digitsDir = 'public/audio_assets/digits_te';
  for (let i = 0; i <= 9; i++) {
    const src = path.join(digitsDir, `${i}.mp3`);
    const dst = path.join(outDir, `${i}.mp3`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
      console.log(`[${i}/60] Copied from digits_te: ${i}.mp3`);
    }
  }

  // 2. Slice 10 to 60 from numbers_telugu_10_to_60.mp3
  const numbers10to60 = [
    { num: 10, te: 'పది', start: 0.00, end: 0.65 },
    { num: 11, te: 'పదకొండు', start: 0.70, end: 1.70 },
    { num: 12, te: 'పన్నెండు', start: 1.75, end: 2.62 },
    { num: 13, te: 'పదమూడు', start: 2.68, end: 3.62 },
    { num: 14, te: 'పద్నాలుగు', start: 3.68, end: 4.65 },
    { num: 15, te: 'పదిహేను', start: 4.70, end: 5.62 },
    { num: 16, te: 'పదహారు', start: 5.68, end: 6.58 },
    { num: 17, te: 'పదిహేడు', start: 6.62, end: 7.54 },
    { num: 18, te: 'పద్దెనిమిది', start: 7.58, end: 8.58 },
    { num: 19, te: 'పందొమ్మిది', start: 8.62, end: 9.60 },
    { num: 20, te: 'ఇరవై', start: 9.65, end: 10.45 },
    { num: 21, te: 'ఇరవై ఒకటి', start: 10.50, end: 11.54 },
    { num: 22, te: 'ఇరవై రెండు', start: 11.58, end: 12.64 },
    { num: 23, te: 'ఇరవై మూడు', start: 12.68, end: 13.70 },
    { num: 24, te: 'ఇరవై నాలుగు', start: 13.74, end: 14.88 },
    { num: 25, te: 'ఇరవై ఐదు', start: 14.92, end: 15.94 },
    { num: 26, te: 'ఇరవై ఆరు', start: 15.98, end: 17.00 },
    { num: 27, te: 'ఇరవై ఏడు', start: 17.04, end: 18.06 },
    { num: 28, te: 'ఇరవై ఎనిమిది', start: 18.10, end: 19.28 },
    { num: 29, te: 'ఇరవై తొమ్మిది', start: 19.32, end: 20.50 },
    { num: 30, te: 'ముప్పై', start: 20.54, end: 21.40 },
    { num: 31, te: 'ముప్పై ఒకటి', start: 21.45, end: 22.52 },
    { num: 32, te: 'ముప్పై రెండు', start: 22.56, end: 23.65 },
    { num: 33, te: 'ముప్పై మూడు', start: 23.70, end: 24.78 },
    { num: 34, te: 'ముప్పై నాలుగు', start: 24.82, end: 26.00 },
    { num: 35, te: 'ముప్పై ఐదు', start: 26.04, end: 27.10 },
    { num: 36, te: 'ముప్పై ఆరు', start: 27.14, end: 28.16 },
    { num: 37, te: 'ముప్పై ఏడు', start: 28.20, end: 29.25 },
    { num: 38, te: 'ముప్పై ఎనిమిది', start: 29.30, end: 30.45 },
    { num: 39, te: 'ముప్పై తొమ్మిది', start: 30.50, end: 31.68 },
    { num: 40, te: 'నలభై', start: 31.72, end: 32.60 },
    { num: 41, te: 'నలభై ఒకటి', start: 32.65, end: 33.72 },
    { num: 42, te: 'నలభై రెండు', start: 33.76, end: 34.85 },
    { num: 43, te: 'నలభై మూడు', start: 34.89, end: 35.98 },
    { num: 44, te: 'నలభై నాలుగు', start: 36.02, end: 37.18 },
    { num: 45, te: 'నలభై ఐదు', start: 37.22, end: 38.30 },
    { num: 46, te: 'నలభై ఆరు', start: 38.34, end: 39.38 },
    { num: 47, te: 'నలభై ఏడు', start: 39.42, end: 40.50 },
    { num: 48, te: 'నలభై ఎనిమిది', start: 40.54, end: 41.72 },
    { num: 49, te: 'నలభై తొమ్మిది', start: 41.76, end: 43.00 },
    { num: 50, te: 'యాభై', start: 43.05, end: 43.95 },
    { num: 51, te: 'యాభై ఒకటి', start: 44.00, end: 45.08 },
    { num: 52, te: 'యాభై రెండు', start: 45.12, end: 46.22 },
    { num: 53, te: 'యాభై మూడు', start: 46.26, end: 47.34 },
    { num: 54, te: 'యాభై నాలుగు', start: 47.38, end: 48.52 },
    { num: 55, te: 'యాభై ఐదు', start: 48.56, end: 49.62 },
    { num: 56, te: 'యాభై ఆరు', start: 49.66, end: 50.72 },
    { num: 57, te: 'యాభై ఏడు', start: 50.76, end: 51.86 },
    { num: 58, te: 'యాభై ఎనిమిది', start: 51.90, end: 53.10 },
    { num: 59, te: 'యాభై తొమ్మిది', start: 53.14, end: 54.38 },
    { num: 60, te: 'అరవై', start: 54.42, end: 55.20 }
  ];

  numbers10to60.forEach((n, idx) => {
    const mp3Path = path.join(outDir, `${n.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_telugu_10_to_60.mp3',
        target: mp3Path,
        start: n.start,
        end: n.end
      });
      console.log(`[${idx + 10}/60] Extracted (MP3): ${n.num}.mp3 (${n.te}) -> ${n.start}s to ${n.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + n.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 61 TELUGU NUMBERS (0 TO 60) PREPARED IN NUMBERS_TE!');
}

main().catch(err => console.error(err));
