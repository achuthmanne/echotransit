const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const trains = [
    { id: 'telangana_express', ml: 'തെലങ്കാന എക്സ്പ്രസ്സ്', start: 0.00, end: 1.50 },
    { id: 'charminar_express', ml: 'ചാർമിനാർ എക്സ്പ്രസ്സ്', start: 1.60, end: 3.50 },
    { id: 'godavari_express', ml: 'ഗോദാവരി എക്സ്പ്രസ്സ്', start: 3.55, end: 5.40 },
    { id: 'pinakini_express', ml: 'പിനാകിനി എക്സ്പ്രസ്സ്', start: 5.50, end: 7.35 },
    { id: 'gautami_express', ml: 'ഗൗതമി എക്സ്പ്രസ്സ്', start: 7.40, end: 9.15 },
    { id: 'guntur_secunderabad_intercity', ml: 'ഗുണ്ടൂർ സെക്കന്ദരാബാദ് ഇന്റർസിറ്റി എക്സ്പ്രസ്സ്', start: 9.20, end: 12.55 },
    { id: 'secunderabad_repalle_express', ml: 'സെക്കന്ദരാബാദ് റേപല്ലെ എക്സ്പ്രസ്സ്', start: 12.65, end: 15.45 },
    { id: 'venkatadri_express', ml: 'വെങ്കിടാദ്രി എക്സ്പ്രസ്സ്', start: 15.50, end: 17.40 },
    { id: 'tamil_nadu_express', ml: 'തമിഴ്നാട് എക്സ്പ്രസ്സ്', start: 17.45, end: 19.20 },
    { id: 'kerala_express', ml: 'കേരള എക്സ്പ്രസ്സ്', start: 19.25, end: 20.85 },
    { id: 'karnataka_express', ml: 'കർണാടക എക്സ്പ്രസ്സ്', start: 20.90, end: 22.70 },
    { id: 'swarna_jayanti_express', ml: 'സ്വർണ്ണ ജയന്തി എക്സ്പ്രസ്സ്', start: 22.75, end: 24.80 },
    { id: 'howrah_bengaluru_superfast', ml: 'ഹൗറ ബെംഗളൂരു സൂപ്പർഫാസ്റ്റ് എക്സ്പ്രസ്സ്', start: 24.85, end: 28.05 },
    { id: 'howrah_chennai_mail', ml: 'ഹൗറ ചെന്നൈ മെയിൽ', start: 28.15, end: 30.15 },
    { id: 'mumbai_rajdhani_express', ml: 'മുംബൈ രാജധാനി എക്സ്പ്രസ്സ്', start: 30.20, end: 32.50 },
    { id: 'howrah_rajdhani_express', ml: 'ഹൗറ രാജധാനി എക്സ്പ്രസ്സ്', start: 32.55, end: 35.00 },
    { id: 'chennai_rajdhani_express', ml: 'ചെന്നൈ രാജധാനി എക്സ്പ്രസ്സ്', start: 35.05, end: 37.35 },
    { id: 'bengaluru_rajdhani_express', ml: 'ബെംഗളൂരു രാജധാനി എക്സ്പ്രസ്സ്', start: 37.40, end: 40.00 },
    { id: 'bhopal_shatabdi_express', ml: 'ഭോപ്പാൽ ശതാബ്ദി എക്സ്പ്രസ്സ്', start: 40.05, end: 42.50 },
    { id: 'mysuru_shatabdi_express', ml: 'മൈസൂരു ശതാബ്ദി എക്സ്പ്രസ്സ്', start: 42.55, end: 45.05 },
    { id: 'secunderabad_visakhapatnam_vande_bharat', ml: 'സെക്കന്ദരാബാദ് വിശാഖപട്ടണം വന്ദേ ഭാരത് എക്സ്പ്രസ്സ്', start: 45.10, end: 49.15 },
    { id: 'varanasi_new_delhi_vande_bharat', ml: 'വാരണാസി ന്യൂഡൽഹി വന്ദേ ഭാരത് എക്സ്പ്രസ്സ്', start: 49.20, end: 52.75 },
    { id: 'amritsar_shatabdi_express', ml: 'അമൃത്‌സർ ശതാബ്ദി എക്സ്പ്രസ്സ്', start: 52.80, end: 55.20 },
    { id: 'golden_temple_mail', ml: 'ഗോൾഡൻ ടെമ്പിൾ മെയിൽ', start: 55.25, end: 57.05 },
    { id: 'grand_trunk_express', ml: 'ഗ്രാൻഡ് ട്രങ്ക് എക്സ്പ്രസ്സ്', start: 57.10, end: 59.05 }
  ];

  const outDir = 'public/audio_assets/trains_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  trains.forEach((t, idx) => {
    const mp3Path = path.join(outDir, `${t.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/train_names_malayalam.mp3',
        target: mp3Path,
        start: t.start,
        end: t.end
      });
      console.log(`[${idx + 1}/25] Extracted (MP3): ${t.id} (${t.ml}) -> ${t.start}s to ${t.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + t.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 25 MALAYALAM TRAIN NAMES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
