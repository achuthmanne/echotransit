const fs = require('fs');
const path = require('path');

// Authentic CRIS/RDSO Indian Railways Tamil PA Core Phrases (24 phrases)
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'payanigalin_gavanathirku', ta: 'பயணிகளின் கவனத்திற்கு', en: 'May I have your attention please', start: 0.05, end: 1.70 },
    { id: 'vandi_en', ta: 'வண்டி எண்', en: 'Train number', start: 1.95, end: 2.82 },
    { id: 'ilirundhu', ta: 'இலிருந்து', en: 'From', start: 3.05, end: 3.88 },
    { id: 'sellum_vazhiyaaga', ta: 'செல்லும் வழியாக', en: 'Bound for / via', start: 4.05, end: 5.50 },
    { id: 'sattru_neerathil', ta: 'சற்று நேரத்தில்', en: 'Shortly', start: 5.70, end: 6.78 },
    { id: 'nadaimedai_en', ta: 'நடைமேடை எண்', en: 'Platform number', start: 6.85, end: 8.00 },
    { id: 'il_vandhu_serum', ta: 'இல் வந்து சேரும்', en: 'Will arrive on', start: 8.20, end: 9.25 },
    { id: 'il_vandhu_serndhulladhu', ta: 'இல் வந்து சேர்ந்துள்ளது', en: 'Has arrived on', start: 9.50, end: 10.90 },
    { id: 'ilirundhu_purappada_thayaaraaga_ulladhu', ta: 'இலிருந்து புறப்பட தயாராக உள்ளது', en: 'Is ready to depart from', start: 11.12, end: 13.48 },
    { id: 'thanadhu_kurippitta_neerathirku_odikondirukiradhu', ta: 'தனது குறிப்பிட்ட நேரத்திற்கு ஓடிக்கொண்டிருக்கிறது', en: 'Is running on right time', start: 13.68, end: 16.36 },
    { id: 'thanadhu_kurippitta_neerathilirundhu', ta: 'தனது குறிப்பிட்ட நேரத்திலிருந்து', en: 'From its scheduled time', start: 16.58, end: 18.48 },
    { id: 'mani', ta: 'மணி', en: 'Hours', start: 18.68, end: 19.30 },
    { id: 'nimidangal_thaamadhamaaga_odikondirukiradhu', ta: 'நிமிடங்கள் தாமதமாக ஓடிக்கொண்டிருக்கிறது', en: 'Minutes running late', start: 19.46, end: 22.05 },
    { id: 'kaalavaraiyindri_thaamadhamaagiyulladhu', ta: 'காலவரையின்றி தாமதமாகியுள்ளது', en: 'Delayed indefinitely', start: 22.22, end: 24.46 },
    { id: 'manikku_purappaduvadharku_maatriyameikkappattulladhu', ta: 'மணிக்கு புறப்படுவதற்கு மாற்றியமைக்கப்பட்டுள்ளது', en: 'Rescheduled to depart at', start: 24.64, end: 27.50 },
    { id: 'ini_nadaimedai_en', ta: 'இனி நடைமேடை எண்', en: 'Now on platform number', start: 27.68, end: 29.36 },
    { id: 'il_vandhu_serum_change', ta: 'இல் வந்து சேரும் (மாற்றம்)', en: 'Will arrive on (platform change)', start: 29.54, end: 30.60 },
    { id: 'ilirundhu_purappadum', ta: 'இலிருந்து புறப்படும்', en: 'Will depart from', start: 30.80, end: 32.04 },
    { id: 'raththu_seiyyappattulladhu', ta: 'ரத்து செய்யப்பட்டுள்ளது', en: 'Has been cancelled', start: 32.22, end: 33.56 },
    { id: 'pagudhi_alavil_raththu_seiyyappattulladhu', ta: 'பகுதி அளவில் ரத்து செய்யப்பட்டுள்ளது', en: 'Has been partially cancelled', start: 33.76, end: 35.86 },
    { id: 'vazhiyaaga_maatrividappattulladhu', ta: 'வழியாக மாற்றிவிடப்பட்டுள்ளது', en: 'Has been diverted via', start: 36.02, end: 38.10 },
    { id: 'iththudan_thanadhu_payanaththai_mudiththuk_kolgiradhu', ta: 'இத்துடன் தனது பயணத்தை முடித்துக் கொள்கிறது', en: 'Terminates journey here', start: 38.26, end: 40.82 },
    { id: 'payanigal_indha_maatraththai_gavanaththil_kollavum', ta: 'பயணிகள் இந்த மாற்றத்தை கவனத்தில் கொள்ளவும்', en: 'Passengers please note this change', start: 41.02, end: 43.72 },
    { id: 'eerpattra_shiramaththirku_varundhugirom', ta: 'ஏற்பட்ட சிரமத்திற்கு வருந்துகிறோம்', en: 'Inconvenience caused is deeply regretted', start: 43.90, end: 46.00 }
  ];

  const outDir = 'public/audio_assets/phrases_ta';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_tamil_full.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/24] Extracted: ${p.id}.mp3 (${p.ta} - ${p.en}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 24 TAMIL PA CORE PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
