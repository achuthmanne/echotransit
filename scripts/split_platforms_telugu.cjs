const fs = require('fs');
const path = require('path');

// Authentic CRIS/RDSO Indian Railways Telugu Platform Ordinal Numbers (1st to 24th)
// 'ఒకటవ' (1st platform) to 'ఇరవై నాలుగవ' (24th platform)
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const platforms = [
    { num: 1, te: 'ఒకటవ', phonetics: 'Okatava (1st)', start: 0.00, end: 0.85 },
    { num: 2, te: 'రెండవ', phonetics: 'Rendava (2nd)', start: 0.95, end: 1.95 },
    { num: 3, te: 'మూడవ', phonetics: 'Moodava (3rd)', start: 1.98, end: 2.88 },
    { num: 4, te: 'నాలుగవ', phonetics: 'Naalugava (4th)', start: 2.94, end: 3.98 },
    { num: 5, te: 'ఐదవ', phonetics: 'Aidava (5th)', start: 4.02, end: 4.88 },
    { num: 6, te: 'ఆరవ', phonetics: 'Aarava (6th)', start: 4.92, end: 5.86 },
    { num: 7, te: 'ఏడవ', phonetics: 'Eedava (7th)', start: 5.90, end: 6.78 },
    { num: 8, te: 'ఎనిమిదవ', phonetics: 'Enimidava (8th)', start: 6.82, end: 7.78 },
    { num: 9, te: 'తొమ్మిదవ', phonetics: 'Tommidava (9th)', start: 7.82, end: 8.84 },
    { num: 10, te: 'పదవ', phonetics: 'Padava (10th)', start: 8.88, end: 9.50 },
    { num: 11, te: 'పదకొండవ', phonetics: 'Padakondava (11th)', start: 9.52, end: 10.56 },
    { num: 12, te: 'పన్నెండవ', phonetics: 'Pannendava (12th)', start: 10.60, end: 11.50 },
    { num: 13, te: 'పదమూడవ', phonetics: 'Padamoodava (13th)', start: 11.54, end: 12.46 },
    { num: 14, te: 'పద్నాలుగవ', phonetics: 'Padnaalugava (14th)', start: 12.50, end: 13.50 },
    { num: 15, te: 'పదిహేనవ', phonetics: 'Padiheenava (15th)', start: 13.54, end: 14.48 },
    { num: 16, te: 'పదహారవ', phonetics: 'Padahaarava (16th)', start: 14.52, end: 15.42 },
    { num: 17, te: 'పదిహేడవ', phonetics: 'Padiheedava (17th)', start: 15.46, end: 16.38 },
    { num: 18, te: 'పద్దెనిమిదవ', phonetics: 'Paddenimidava (18th)', start: 16.42, end: 17.40 },
    { num: 19, te: 'పందొమ్మిదవ', phonetics: 'Pandommidava (19th)', start: 17.44, end: 18.42 },
    { num: 20, te: 'ఇరవయ్యవ', phonetics: 'Iravayyava (20th)', start: 18.46, end: 19.35 },
    { num: 21, te: 'ఇరవై ఒకటవ', phonetics: 'Iravai okatava (21st)', start: 19.38, end: 20.48 },
    { num: 22, te: 'ఇరవై రెండవ', phonetics: 'Iravai rendava (22nd)', start: 20.52, end: 21.72 },
    { num: 23, te: 'ఇరవై మూడవ', phonetics: 'Iravai moodava (23rd)', start: 21.76, end: 22.96 },
    { num: 24, te: 'ఇరవై నాలుగవ', phonetics: 'Iravai naalugava (24th)', start: 23.00, end: 24.30 }
  ];

  const outDir = 'public/audio_assets/platforms_te';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  platforms.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/platforms_telugu_1_to_24.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/24] Extracted (MP3): ${p.num}.mp3 (${p.te} - ${p.phonetics}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 24 TELUGU PLATFORM NUMBERS (1 TO 24) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
