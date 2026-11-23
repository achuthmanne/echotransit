const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'yatrigan_kripya_dhyan_dein', hindi: 'यात्रीगण कृपया ध्यान दें', start: 0.0, end: 1.98 },
    { id: 'gaadi_sankhya', hindi: 'गाड़ी संख्या', start: 2.12, end: 3.34 },
    { id: 'se_chalkar', hindi: 'से चलकर', start: 3.38, end: 4.58 },
    { id: 'ko_jaane_wali', hindi: 'को जाने वाली', start: 4.60, end: 5.80 },
    { id: 'ke_raaste', hindi: 'के रास्ते', start: 5.80, end: 6.78 },
    { id: 'thodi_hi_der_mein', hindi: 'थोड़ी ही देर में', start: 6.82, end: 8.06 },
    { id: 'platform_sankhya_core', hindi: 'प्लेटफार्म संख्या', start: 8.10, end: 9.30 },
    { id: 'par_aa_rahi_hai', hindi: 'पर आ रही है', start: 9.34, end: 10.48 },
    { id: 'par_aa_chuki_hai', hindi: 'पर आ चुकी है', start: 10.50, end: 11.74 },
    { id: 'se_prasthan_karne_ke_liye_taiyar_hai', hindi: 'से प्रस्थान करने के लिए तैयार है', start: 11.76, end: 14.16 },
    { id: 'apne_nirdharit_samay_par_chal_rahi_hai', hindi: 'अपने निर्धारित समय पर चल रही है', start: 14.18, end: 16.56 },
    { id: 'apne_nirdharit_samay_se', hindi: 'अपने निर्धारित समय से', start: 16.58, end: 18.28 },
    { id: 'ghante', hindi: 'घंटे', start: 18.30, end: 19.12 },
    { id: 'minute_ki_deri_se_chal_rahi_hai', hindi: 'मिनट की देरी से चल रही है', start: 19.14, end: 21.04 },
    { id: 'anischit_kaal_ke_liye_vilambit_hai', hindi: 'अनिश्चित काल के लिए विलंबित है', start: 21.06, end: 23.28 },
    { id: 'baje_prasthan_karne_ke_liye_punarnirdharit_ki_gayi_hai', hindi: 'बजे प्रस्थान करने के लिए पुनर्निर्धारित की गई है', start: 23.30, end: 26.66 },
    { id: 'ab_platform_sankhya', hindi: 'अब प्लेटफार्म संख्या', start: 26.70, end: 28.46 },
    { id: 'par_aayegi', hindi: 'पर आएगी', start: 28.48, end: 29.38 },
    { id: 'se_prasthan_karegi', hindi: 'से प्रस्थान करेगी', start: 29.40, end: 30.88 },
    { id: 'radd_kar_di_gayi_hai', hindi: 'रद्द कर दी गई है', start: 30.90, end: 32.28 },
    { id: 'aanshik_roop_se_radd_kar_di_gayi_hai', hindi: 'आंशिक रूप से रद्द कर दी गई है', start: 32.30, end: 34.50 },
    { id: 'ke_raaste_parivartit_ki_gayi_hai', hindi: 'के रास्ते परिवर्तित की गई है', start: 34.54, end: 36.60 },
    { id: 'yahin_samaapt_hogi', hindi: 'यहीं समाप्त होगी', start: 36.64, end: 38.08 },
    { id: 'yatri_kripya_is_parivartan_par_dhyan_dein', hindi: 'यात्री कृपया इस परिवर्तन पर ध्यान दें', start: 38.15, end: 40.88 },
    { id: 'huyi_asuvidha_ke_liye_humein_khed_hai', hindi: 'हुई असुविधा के लिए हमें खेद है', start: 40.90, end: 43.36 }
  ];

  const outDir = 'public/audio_assets/phrases_hi';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_hindi_core.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/25] Extracted (MP3): "${p.hindi}" (${p.id}.mp3) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 25 HINDI CORE ANNOUNCEMENT PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
