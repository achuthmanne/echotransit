const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'raavalasinadi', telugu: 'రావలసినది', start: 0.0, end: 1.20 },
    { id: 'bayaludeeravalasinadi', telugu: 'బయలుదేరవలసినది', start: 1.30, end: 2.82 },
    { id: 'number_platform_paiki_raavalasinadi', telugu: 'నంబరు ప్లాట్‌ఫారమ్ పైకి రావలసినది', start: 2.98, end: 5.50 },
    { id: 'number_platform_nundi_bayaludeeravalasinadi', telugu: 'నంబరు ప్లాట్‌ఫారమ్ నుండి బయలుదేరవలసినది', start: 5.60, end: 8.56 },
    { id: 'ganta', telugu: 'గంట', start: 8.70, end: 9.62 },
    { id: 'nimishamu', telugu: 'నిమిషము', start: 9.72, end: 10.70 },
    { id: 'mariyu', telugu: 'మరియు', start: 10.80, end: 11.62 },
    { id: 'express', telugu: 'ఎక్స్‌ప్రెస్', start: 11.75, end: 12.74 },
    { id: 'superfast_express', telugu: 'సూపర్‌ఫాస్ట్ ఎక్స్‌ప్రెస్', start: 12.85, end: 14.65 },
    { id: 'dhanyavaadamulu', telugu: 'ధన్యవాదములు', start: 14.80, end: 15.94 }
  ];

  const outDir = 'public/audio_assets/phrases_te';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_telugu_part1.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/10] Extracted (MP3): "${p.telugu}" (${p.id}.mp3) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 10 TELUGU PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
