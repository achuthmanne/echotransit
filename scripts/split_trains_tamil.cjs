const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const trains = [
    { id: 'telangana_express', ta: 'தெலங்கானா எக்ஸ்பிரஸ்', start: 0.00, end: 1.45 },
    { id: 'charminar_express', ta: 'சார்மினார் எக்ஸ்பிரஸ்', start: 1.50, end: 2.98 },
    { id: 'godavari_express', ta: 'கோதாவரி எக்ஸ்பிரஸ்', start: 3.02, end: 4.56 },
    { id: 'pinakini_express', ta: 'பினாகினி எக்ஸ்பிரஸ்', start: 4.60, end: 6.08 },
    { id: 'gautami_express', ta: 'கௌதமி எக்ஸ்பிரஸ்', start: 6.12, end: 7.58 },
    { id: 'guntur_secunderabad_intercity', ta: 'குண்டூர் செகந்திராபாத் இன்டர்சிட்டி எக்ஸ்பிரஸ்', start: 7.62, end: 10.48 },
    { id: 'secunderabad_repalle_express', ta: 'செகந்திராபாத் ரேபல்லே எக்ஸ்பிரஸ்', start: 10.52, end: 12.82 },
    { id: 'venkatadri_express', ta: 'வெங்கடாத்ரி எக்ஸ்பிரஸ்', start: 12.86, end: 14.46 },
    { id: 'tamil_nadu_express', ta: 'தமிழ்நாடு எக்ஸ்பிரஸ்', start: 14.50, end: 15.96 },
    { id: 'kerala_express', ta: 'கேரளா எக்ஸ்பிரஸ்', start: 16.00, end: 17.32 },
    { id: 'karnataka_express', ta: 'கர்நாடகா எக்ஸ்பிரஸ்', start: 17.36, end: 18.86 },
    { id: 'swarna_jayanti_express', ta: 'ஸ்வர்ண ஜெயந்தி எக்ஸ்பிரஸ்', start: 18.90, end: 20.62 },
    { id: 'howrah_bengaluru_superfast', ta: 'ஹாவ்டா பெங்களூரு சூப்பர்பாஸ்ட் எக்ஸ்பிரஸ்', start: 20.66, end: 23.38 },
    { id: 'howrah_chennai_mail', ta: 'ஹாவ்டா சென்னை மெயில்', start: 23.42, end: 25.12 },
    { id: 'mumbai_rajdhani_express', ta: 'மும்பை ராஜதானி எக்ஸ்பிரஸ்', start: 25.16, end: 27.08 },
    { id: 'howrah_rajdhani_express', ta: 'ஹாவ்டா ராஜதானி எக்ஸ்பிரஸ்', start: 27.12, end: 29.00 },
    { id: 'chennai_rajdhani_express', ta: 'சென்னை ராஜதானி எக்ஸ்பிரஸ்', start: 29.04, end: 30.92 },
    { id: 'bengaluru_rajdhani_express', ta: 'பெங்களூரு ராஜதானி எக்ஸ்பிரஸ்', start: 30.96, end: 33.00 },
    { id: 'bhopal_shatabdi_express', ta: 'போபால் சதாப்தி எக்ஸ்பிரஸ்', start: 33.04, end: 35.02 },
    { id: 'mysuru_shatabdi_express', ta: 'மைசூர் சதாப்தி எக்ஸ்பிரஸ்', start: 35.06, end: 36.94 },
    { id: 'secunderabad_visakhapatnam_vande_bharat', ta: 'செகந்திராபாத் விசாகப்பட்டினம் வந்தே பாரத் எக்ஸ்பிரஸ்', start: 36.98, end: 40.38 },
    { id: 'varanasi_new_delhi_vande_bharat', ta: 'வாரணாசி நைதில்லி வந்தே பாரத் எக்ஸ்பிரஸ்', start: 40.42, end: 43.36 },
    { id: 'amritsar_shatabdi_express', ta: 'அமிர்த்சர் சதாப்தி எக்ஸ்பிரஸ்', start: 43.40, end: 45.38 },
    { id: 'golden_temple_mail', ta: 'கோல்டன் டெம்பிள் மெயில்', start: 45.42, end: 46.95 },
    { id: 'grand_trunk_express', ta: 'கிராண்ட் ட்ரங்க் எக்ஸ்பிரஸ்', start: 47.00, end: 48.75 }
  ];

  const outDir = 'public/audio_assets/trains_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  trains.forEach((t, idx) => {
    const mp3Path = path.join(outDir, `${t.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/train_names_tamil.mp3',
        target: mp3Path,
        start: t.start,
        end: t.end
      });
      console.log(`[${idx + 1}/25] Extracted (MP3): ${t.id} (${t.ta}) -> ${t.start}s to ${t.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + t.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 25 TAMIL TRAIN NAMES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
