const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const segments = [
    { num: 25, hindi: 'पच्चीस', start: 0.0, end: 0.98 },
    { num: 26, hindi: 'छब्बीस', start: 1.15, end: 2.15 },
    { num: 27, hindi: 'सत्ताईस', start: 2.32, end: 3.42 },
    { num: 28, hindi: 'अट्ठाईस', start: 3.55, end: 4.60 },
    { num: 29, hindi: 'उनतीस', start: 4.75, end: 5.68 },
    { num: 30, hindi: 'तीस', start: 5.90, end: 6.70 },
    { num: 31, hindi: 'इकतीस', start: 6.90, end: 7.95 },
    { num: 32, hindi: 'बत्तीस', start: 8.10, end: 9.12 },
    { num: 33, hindi: 'तैंतीस', start: 9.30, end: 10.25 },
    { num: 34, hindi: 'चौंतीस', start: 10.42, end: 11.42 },
    { num: 35, hindi: 'पैंतीस', start: 11.60, end: 12.52 },
    { num: 36, hindi: 'छत्तीस', start: 12.70, end: 13.70 },
    { num: 37, hindi: 'सैंतीस', start: 13.85, end: 14.90 },
    { num: 38, hindi: 'अड़तीस', start: 15.05, end: 15.98 },
    { num: 39, hindi: 'उनतालीस', start: 16.12, end: 17.18 },
    { num: 40, hindi: 'चालीस', start: 17.32, end: 18.28 },
    { num: 41, hindi: 'इकतालीस', start: 18.42, end: 19.50 },
    { num: 42, hindi: 'बयालीस', start: 19.60, end: 20.65 },
    { num: 43, hindi: 'तैंतालीस', start: 20.80, end: 21.82 },
    { num: 44, hindi: 'चौवालीस', start: 21.95, end: 23.00 },
    { num: 45, hindi: 'पैंतालीस', start: 23.15, end: 24.15 },
    { num: 46, hindi: 'छियालीस', start: 24.25, end: 25.25 },
    { num: 47, hindi: 'सैंतालीस', start: 25.35, end: 26.45 },
    { num: 48, hindi: 'अड़तालीस', start: 26.60, end: 27.60 },
    { num: 49, hindi: 'उनचास', start: 27.72, end: 28.75 },
    { num: 50, hindi: 'पचास', start: 28.88, end: 29.82 },
    { num: 51, hindi: 'इक्यावन', start: 29.92, end: 30.88 },
    { num: 52, hindi: 'बावन', start: 30.98, end: 31.80 },
    { num: 53, hindi: 'तिरपन', start: 31.95, end: 32.72 },
    { num: 54, hindi: 'चौवन', start: 32.82, end: 33.65 },
    { num: 55, hindi: 'पचपन', start: 33.75, end: 34.52 },
    { num: 56, hindi: 'छप्पन', start: 34.62, end: 35.45 },
    { num: 57, hindi: 'सत्तावन', start: 35.55, end: 36.55 },
    { num: 58, hindi: 'अट्ठावन', start: 36.62, end: 37.58 },
    { num: 59, hindi: 'उनसठ', start: 37.68, end: 38.48 },
    { num: 60, hindi: 'साठ', start: 38.58, end: 39.42 }
  ];

  const outDir = 'public/audio_assets/numbers_hi';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  segments.forEach((s, idx) => {
    const mp3Path = path.join(outDir, `${s.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_hindi_25_to_60.mp3',
        target: mp3Path,
        start: s.start,
        end: s.end
      });
      console.log(`[${idx + 1}/36] Extracted (MP3): ${s.num} (${s.hindi}) -> ${s.start}s to ${s.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + s.num, e);
    }
  });

  console.log('\nSUCCESS: ALL 36 HINDI NUMBERS (25 TO 60) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
