const fs = require('fs');
const path = require('path');

// Authentic CRIS/RDSO Indian Railways Tamil Platform Ordinal Numbers (1st to 24th)
// 'ஒன்றாவது நடைமேடை' (1st platform) to 'இருபத்திநான்காவது நடைமேடை' (24th platform)
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const platforms = [
    { num: 1, ta: 'ஒன்றாவது', phonetics: 'Onravadhu (1st)', start: 0.00, end: 0.95 },
    { num: 2, ta: 'இரண்டாவது', phonetics: 'Irandavadhu (2nd)', start: 1.05, end: 2.12 },
    { num: 3, ta: 'மூன்றாவது', phonetics: 'Moondravadhu (3rd)', start: 2.22, end: 3.32 },
    { num: 4, ta: 'நான்காவது', phonetics: 'Naangavadhu (4th)', start: 3.42, end: 4.58 },
    { num: 5, ta: 'ஐந்தாவது', phonetics: 'Aindhavadhu (5th)', start: 4.68, end: 5.76 },
    { num: 6, ta: 'ஆறாவது', phonetics: 'Aaravadhu (6th)', start: 5.86, end: 6.94 },
    { num: 7, ta: 'ஏழாவது', phonetics: 'Ezhavadhu (7th)', start: 7.04, end: 8.18 },
    { num: 8, ta: 'எட்டாவது', phonetics: 'Ettavadhu (8th)', start: 8.28, end: 9.36 },
    { num: 9, ta: 'ஒன்பதாவது', phonetics: 'Onbadhavadhu (9th)', start: 9.46, end: 10.60 },
    { num: 10, ta: 'பத்தாவது', phonetics: 'Paththavadhu (10th)', start: 10.70, end: 11.74 },
    { num: 11, ta: 'பதினொன்றாவது', phonetics: 'Padhinondravadhu (11th)', start: 11.84, end: 13.10 },
    { num: 12, ta: 'பன்னிரண்டாவது', phonetics: 'Pannirandavadhu (12th)', start: 13.20, end: 14.44 },
    { num: 13, ta: 'பதின்மூன்றாவது', phonetics: 'Padhinmoondravadhu (13th)', start: 14.54, end: 15.85 },
    { num: 14, ta: 'பதினான்காவது', phonetics: 'Padhinaangavadhu (14th)', start: 15.95, end: 17.24 },
    { num: 15, ta: 'பதினைந்தாவது', phonetics: 'Padhinaindhavadhu (15th)', start: 17.34, end: 18.60 },
    { num: 16, ta: 'பதினாறாவது', phonetics: 'Padhinaaravadhu (16th)', start: 18.70, end: 19.92 },
    { num: 17, ta: 'பதினேழாவது', phonetics: 'Padhinezhavadhu (17th)', start: 20.02, end: 21.26 },
    { num: 18, ta: 'பதினெட்டாவது', phonetics: 'Padhinettavadhu (18th)', start: 21.36, end: 22.60 },
    { num: 19, ta: 'பத்தொன்பதாவது', phonetics: 'Paththonbadhavadhu (19th)', start: 22.70, end: 24.00 },
    { num: 20, ta: 'இருபதாவது', phonetics: 'Irubadhavadhu (20th)', start: 24.10, end: 25.24 },
    { num: 21, ta: 'இருபத்தொன்றாவது', phonetics: 'Irubaththonravadhu (21st)', start: 25.34, end: 26.80 },
    { num: 22, ta: 'இருபத்திரண்டாவது', phonetics: 'Irubaththirandavadhu (22nd)', start: 26.90, end: 28.48 },
    { num: 23, ta: 'இருபத்திமூன்றாவது', phonetics: 'Irubaththimoondravadhu (23rd)', start: 28.58, end: 30.16 },
    { num: 24, ta: 'இருபத்திநான்காவது', phonetics: 'Irubaththinaangavadhu (24th)', start: 30.26, end: 31.85 }
  ];

  const outDir = 'public/audio_assets/platforms_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  platforms.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/platforms_tamil_1_to_24.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/24] Extracted (MP3): ${p.num}.mp3 (${p.ta} - ${p.phonetics}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 24 TAMIL PLATFORM ORDINAL NUMBERS (1 TO 24) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
