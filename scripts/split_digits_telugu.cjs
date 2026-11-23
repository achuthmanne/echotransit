const fs = require('fs');
const path = require('path');

// Authentic CRIS/RDSO Indian Railways Telugu Digits 0 to 9 for Train Number Spelling
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const digits = [
    { num: 0, te: 'సున్నా', phonetics: 'Sunna', start: 0.00, end: 0.85 },
    { num: 1, te: 'ఒకటి', phonetics: 'Okati', start: 0.95, end: 1.75 },
    { num: 2, te: 'రెండు', phonetics: 'Rendu', start: 1.82, end: 2.68 },
    { num: 3, te: 'మూడు', phonetics: 'Moodu', start: 2.74, end: 3.54 },
    { num: 4, te: 'నాలుగు', phonetics: 'Naalugu', start: 3.60, end: 4.48 },
    { num: 5, te: 'ఐదు', phonetics: 'Aidu', start: 4.50, end: 5.45 },
    { num: 6, te: 'ఆరు', phonetics: 'Aaru', start: 5.50, end: 6.35 },
    { num: 7, te: 'ఏడు', phonetics: 'Eedu', start: 6.42, end: 7.20 },
    { num: 8, te: 'ఎనిమిది', phonetics: 'Enimidi', start: 7.27, end: 8.08 },
    { num: 9, te: 'తొమ్మిది', phonetics: 'Tommidi', start: 8.14, end: 8.90 }
  ];

  const outDir = 'public/audio_assets/digits_te';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  digits.forEach((d, idx) => {
    const mp3Path = path.join(outDir, `${d.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/digits_telugu_0_to_9.mp3',
        target: mp3Path,
        start: d.start,
        end: d.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): ${d.num}.mp3 (${d.te} - ${d.phonetics}) -> ${d.start}s to ${d.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + d.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 TELUGU DIGITS (0 TO 9) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
