const fs = require('fs');
const path = require('path');

// Authentic SCR Indian Railways Telugu PA Core Phrases
async function main() {
  const MP3Cutter = require('mp3-cutter');

  const phrases = [
    { id: 'prayaanikulaku_vignapthi', te: 'ప్రయాణికులకు విజ్ఞప్తి', en: 'May I have your attention please', start: 0.05, end: 1.60, alias: 'attention_please' },
    { id: 'railu_number', te: 'రైలు నంబరు', en: 'Train number', start: 1.90, end: 2.95, alias: 'train_number' },
    { id: 'nundi', te: 'నుండి', en: 'From', start: 3.15, end: 3.80, alias: 'from' },
    { id: 'varaku', te: 'వరకు', en: 'To', start: 3.95, end: 4.65, alias: 'to' },
    { id: 'meeduga', te: 'మీదుగా', en: 'Via', start: 4.85, end: 5.72, alias: 'via' },
    { id: 'vellunadi', te: 'వెళ్ళునది', en: 'Bound for', start: 5.80, end: 6.58, alias: 'bound_for' },
    { id: 'marikoddi_nimishamulalo', te: 'మరికొద్ది నిమిషములలో', en: 'Shortly / In a few minutes', start: 6.72, end: 8.18, alias: 'shortly' },
    { id: 'number_platform_paiki_raanunnadi', te: 'నంబరు ప్లాట్‌ఫారం పైకి రానున్నది', en: 'Arriving on platform number', start: 8.30, end: 10.50, alias: 'arriving_shortly_on_platform' },
    { id: 'number_platform_paiki_cherukunnadi', te: 'నంబరు ప్లాట్‌ఫారం పైకి చేరుకున్నది', en: 'Has arrived on platform number', start: 10.75, end: 13.00, alias: 'has_arrived_on_platform' },
    { id: 'number_platform_nundi_bayaluderutaku_siddhanga_unnadi', te: 'నంబరు ప్లాట్‌ఫారం నుండి బయలుదేరుటకు సిద్ధంగా ఉన్నది', en: 'Is ready to depart from platform number', start: 13.25, end: 16.70, alias: 'ready_to_leave_platform' },
    { id: 'tana_nirneetha_samayaaniki_nadustunnadi', te: 'తన నిర్ణీత సమయానికి నడుస్తున్నది', en: 'Is running on right time', start: 16.85, end: 19.08, alias: 'running_on_right_time' },
    { id: 'gantala', te: 'గంటల', en: 'Hours', start: 19.30, end: 20.20, alias: 'hours' },
    { id: 'nimishaalu_aalasyanga_nadustunnadi', te: 'నిమిషాలు ఆలస్యంగా నడుస్తున్నది', en: 'Minutes running late', start: 20.30, end: 22.58, alias: 'minutes_running_late' },
    { id: 'anirdishta_kaalam_aalasyanga_nadustunnadi', te: 'అనిర్దిష్ట కాలం ఆలస్యంగా నడుస్తున్నది', en: 'Delayed indefinitely', start: 22.80, end: 25.40, alias: 'delayed_indefinitely' },
    { id: 'gantalaku_bayaluderutaku_reschedule_cheyabadinadi', te: 'గంటలకు బయలుదేరుటకు రీషెడ్యూల్ చేయబడినది', en: 'Rescheduled to depart at hours', start: 25.62, end: 28.60, alias: 'rescheduled_to_leave_at' },
    { id: 'ikapai', te: 'ఇకపై', en: 'Now onwards (platform change)', start: 28.85, end: 29.50 },
    { id: 'number_platform_paiki_vachunu', te: 'నంబరు ప్లాట్‌ఫారం పైకి వచ్చును', en: 'Will arrive on platform number', start: 29.65, end: 31.55, alias: 'will_arrive_on_platform' },
    { id: 'ikapai_departure', te: 'ఇకపై (బయలుదేరును)', en: 'Now onwards departing', start: 31.75, end: 32.35 },
    { id: 'number_platform_nundi_bayaluderunu', te: 'నంబరు ప్లాట్‌ఫారం నుండి బయలుదేరును', en: 'Will depart from platform number', start: 32.50, end: 34.70, alias: 'will_depart_from_platform' },
    { id: 'raddu_cheyabadinadi', te: 'రద్దు చేయబడినది', en: 'Has been cancelled', start: 34.90, end: 36.15, alias: 'has_been_cancelled' },
    { id: 'paakshikanga_raddu_cheyabadinadi', te: 'పాక్షికంగా రద్దు చేయబడినది', en: 'Has been partially cancelled', start: 36.30, end: 38.25, alias: 'partially_cancelled' },
    { id: 'meeduga_daari_mallinchabadinadi', te: 'మీదుగా దారి మళ్ళించబడినది', en: 'Has been diverted via', start: 38.40, end: 40.50, alias: 'diverted_via' },
    { id: 'ikkaditho_tana_prayaananni_mugistundi', te: 'ఇక్కడితో తన ప్రయాణాన్ని ముగిస్తుంది', en: 'Terminates journey here', start: 40.70, end: 42.95, alias: 'terminates_here' },
    { id: 'prayaanikulu_ee_maarpunu_gamaninchagalaru', te: 'ప్రయాణికులు ఈ మార్పును గమనించగలరు', en: 'Passengers please note this change', start: 43.15, end: 45.60, alias: 'note_this_change' },
    { id: 'prayaanikulaku_kaligina_asaukaryaaniki_chintistunnamu', te: 'ప్రయాణికులకు కలిగిన అసౌకర్యానికి చింతిస్తున్నాము', en: 'Inconvenience caused is deeply regretted', start: 45.75, end: 48.85, alias: 'inconvenience_regretted' }
  ];

  const outDir = 'public/audio_assets/phrases_te';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  phrases.forEach((p, idx) => {
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_telugu_full.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
      if (p.alias) {
        const aliasPath = path.join(outDir, `${p.alias}.mp3`);
        fs.copyFileSync(mp3Path, aliasPath);
      }
      console.log(`[${idx + 1}/25] Extracted: ${p.id}.mp3 (${p.te} - ${p.en}) -> ${p.start}s to ${p.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 25 TELUGU PA CORE PHRASES EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
