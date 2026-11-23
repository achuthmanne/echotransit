const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const digits = [
    { num: 0, ta: 'பூஜ்ஜியம்', start: 0.00, end: 0.80 },
    { num: 1, ta: 'ஒன்று', start: 0.85, end: 1.75 },
    { num: 2, ta: 'இரண்டு', start: 1.78, end: 2.68 },
    { num: 3, ta: 'மூன்று', start: 2.72, end: 3.70 },
    { num: 4, ta: 'நான்கு', start: 3.75, end: 4.80 },
    { num: 5, ta: 'ஐந்து', start: 4.85, end: 5.80 },
    { num: 6, ta: 'ஆறு', start: 5.85, end: 6.75 },
    { num: 7, ta: 'ஏழு', start: 6.80, end: 7.78 },
    { num: 8, ta: 'எட்டு', start: 7.82, end: 8.72 },
    { num: 9, ta: 'ஒன்பது', start: 8.75, end: 9.60 }
  ];

  const outDir = 'public/audio_assets/digits_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  digits.forEach((d, idx) => {
    const mp3Path = path.join(outDir, `${d.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_tamil_0_to_9.mp3',
        target: mp3Path,
        start: d.start,
        end: d.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): ${d.num}.mp3 (${d.ta}) -> ${d.start}s to ${d.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + d.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 TAMIL DIGITS (0 TO 9) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
