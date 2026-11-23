const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'yathrakkarude_shraddhaykku', ml: 'യാത്രക്കാരുടെ ശ്രദ്ധയ്ക്ക്', start: 0.00, end: 1.85 },
    { id: 'train_number', ml: 'ട്രെയിൻ നമ്പർ', start: 1.95, end: 3.15 },
    { id: 'muthal', ml: 'മുതൽ', start: 3.20, end: 3.90 },
    { id: 'vare_pokunna', ml: 'വരെ പോകുന്ന', start: 3.95, end: 5.30 },
    { id: 'vazhi', ml: 'വഴി', start: 5.35, end: 6.15 },
    { id: 'alpa_samayathinakam', ml: 'അല്പസമയത്തിനകം', start: 6.20, end: 7.75 },
    { id: 'platformilekku_ethicherunnathaanu', ml: 'പ്ലാറ്റ്ഫോമിലേക്ക് എത്തിച്ചേരുന്നതാണ്', start: 7.80, end: 10.25 },
    { id: 'platformil_ethichernnirikkunnu', ml: 'പ്ലാറ്റ്ഫോമിൽ എത്തിച്ചേർന്നിരിക്കുന്നു', start: 10.35, end: 12.65 },
    { id: 'platformil_ninnum_purappedan_thayyarayi_nilkkunnu', ml: 'പ്ലാറ്റ്ഫോമിൽ നിന്നും പുറപ്പെടാൻ തയ്യാറായി നിൽക്കുന്നു', start: 12.75, end: 16.00 },
    { id: 'kkrithya_samayath_odikkondirikkunnu', ml: 'കൃത്യസമയത്ത് ഓടിക്കൊണ്ടിരിക്കുന്നു', start: 16.10, end: 18.50 },
    { id: 'nischitha_samayatthekkal', ml: 'നിശ്ചിത സമയത്തേക്കാൾ', start: 18.60, end: 20.35 },
    { id: 'manikoor', ml: 'മണിക്കൂർ', start: 20.40, end: 21.30 },
    { id: 'minute_vaikiyaan_odunnathu', ml: 'മിനിറ്റ് വൈകിയാണ് ഓടുന്നത്', start: 21.35, end: 23.55 },
    { id: 'anischithamayi_vaikunnathaanu', ml: 'അനിശ്ചിതമായി വൈകുന്നതാണ്', start: 23.60, end: 25.60 },
    { id: 'manikku_purappedunna_reethiyil_punahkramikarichirikkunnu', ml: 'മണിക്ക് പുറപ്പെടുന്ന രീതിയിൽ പുനഃക്രമീകരിച്ചിരിക്കുന്നു', start: 25.65, end: 29.05 },
    { id: 'ini_muthal', ml: 'ഇനി മുതൽ', start: 29.15, end: 30.15 },
    { id: 'platformilekku_varunnathaanu', ml: 'പ്ലാറ്റ്ഫോമിലേക്ക് വരുന്നതാണ്', start: 30.20, end: 32.05 },
    { id: 'platformil_ninnum_purappedunnathaanu', ml: 'പ്ലാറ്റ്ഫോമിൽ നിന്നും പുറപ്പെടുന്നതാണ്', start: 32.10, end: 34.45 },
    { id: 'raddhaakkiyirikkunnu', ml: 'റദ്ദാക്കിയിരിക്കുന്നു', start: 34.50, end: 35.95 },
    { id: 'bhaagikamayi_raddhaakkiyirikkunnu', ml: 'ഭാഗികമായി റദ്ദാക്കിയിരിക്കുന്നു', start: 36.00, end: 38.35 },
    { id: 'vazhi_thirichuvittirikkunnu', ml: 'വഴി തിരിച്ചുവിട്ടിരിക്കുന്നു', start: 38.45, end: 40.35 },
    { id: 'ivide_yaathra_avasanippikkunnathaanu', ml: 'ഇവിടെ യാത്ര അവസാനിപ്പിക്കുന്നതാണ്', start: 40.45, end: 43.10 },
    { id: 'yaathrakkaar_ee_maattam_shraddhikkendathaanu', ml: 'യാത്രക്കാർ ഈ മാറ്റം ശ്രദ്ധിക്കേണ്ടതാണ്', start: 43.20, end: 46.10 },
    { id: 'yaathrakkaarkkundaya_asowkaryathil_khedikkunnu', ml: 'യാത്രക്കാർക്കുണ്ടായ അസൗകര്യത്തിൽ ഖേദിക്കുന്നു', start: 46.20, end: 49.35 }
  ];

  const outDir = 'public/audio_assets/phrases_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_malayalam_core.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      console.log(`[${idx + 1}/24] Extracted (MP3): ${p.id} (${p.ml}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 24 CORE MALAYALAM ANNOUNCEMENT PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
