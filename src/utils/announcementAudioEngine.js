/**
 * EchoTransit Concatenative Railway Announcement Audio Engine
 * 100% Authentic Indian Railways (CRIS / RDSO IPIS) Speech Concatenation
 * No synthetic/robotic TTS voices - Pure authentic announcer voice clips.
 */

export const TRAIN_ASSETS = {
  'amritsar_shatabdi_express': { name: 'Amritsar Shatabdi Express', file: '/audio_assets/trains/amritsar_shatabdi_express.mp3' },
  'bengaluru_rajdhani_express': { name: 'Bengaluru Rajdhani Express', file: '/audio_assets/trains/bengaluru_rajdhani_express.mp3' },
  'bhopal_shatabdi_express': { name: 'Bhopal Shatabdi Express', file: '/audio_assets/trains/bhopal_shatabdi_express.mp3' },
  'charminar_express': { name: 'Charminar Express', file: '/audio_assets/trains/charminar_express.mp3' },
  'chennai_rajdhani_express': { name: 'Chennai Rajdhani Express', file: '/audio_assets/trains/chennai_rajdhani_express.mp3' },
  'gautami_express': { name: 'Gautami Express', file: '/audio_assets/trains/gautami_express.mp3' },
  'godavari_express': { name: 'Godavari Express', file: '/audio_assets/trains/godavari_express.mp3' },
  'golden_temple_mail': { name: 'Golden Temple Mail', file: '/audio_assets/trains/golden_temple_mail.mp3' },
  'grand_trunk_express': { name: 'Grand Trunk Express', file: '/audio_assets/trains/grand_trunk_express.mp3' },
  'guntur_secunderabad_intercity': { name: 'Guntur Secunderabad Intercity', file: '/audio_assets/trains/guntur_secunderabad_intercity.mp3' },
  'howrah_bengaluru_superfast': { name: 'Howrah Bengaluru Superfast Express', file: '/audio_assets/trains/howrah_bengaluru_superfast.mp3' },
  'howrah_chennai_mail': { name: 'Howrah Chennai Mail', file: '/audio_assets/trains/howrah_chennai_mail.mp3' },
  'howrah_rajdhani_express': { name: 'Howrah Rajdhani Express', file: '/audio_assets/trains/howrah_rajdhani_express.mp3' },
  'karnataka_express': { name: 'Karnataka Express', file: '/audio_assets/trains/karnataka_express.mp3' },
  'kerala_express': { name: 'Kerala Express', file: '/audio_assets/trains/kerala_express.mp3' },
  'mumbai_rajdhani_express': { name: 'Mumbai Rajdhani Express', file: '/audio_assets/trains/mumbai_rajdhani_express.mp3' },
  'mysuru_shatabdi_express': { name: 'Mysuru Shatabdi Express', file: '/audio_assets/trains/mysuru_shatabdi_express.mp3' },
  'pinakini_express': { name: 'Pinakini Express', file: '/audio_assets/trains/pinakini_express.mp3' },
  'secunderabad_repalle_express': { name: 'Secunderabad - Repalle Express', file: '/audio_assets/trains/secunderabad_repalle_express.mp3' },
  'secunderabad_visakhapatnam_vande_bharat': { name: 'Secunderabad Visakhapatnam Vande Bharat', file: '/audio_assets/trains/secunderabad_visakhapatnam_vande_bharat.mp3' },
  'swarna_jayanti_express': { name: 'Swarna Jayanti Express', file: '/audio_assets/trains/swarna_jayanti_express.mp3' },
  'tamil_nadu_express': { name: 'Tamil Nadu Express', file: '/audio_assets/trains/tamil_nadu_express.mp3' },
  'telangana_express': { name: 'Telangana Express', file: '/audio_assets/trains/telangana_express.mp3' },
  'varanasi_new_delhi_vande_bharat': { name: 'Varanasi New Delhi Vande Bharat', file: '/audio_assets/trains/varanasi_new_delhi_vande_bharat.mp3' },
  'venkatadri_express': { name: 'Venkatadri Express', file: '/audio_assets/trains/venkatadri_express.mp3' }
};

export const PHRASE_ASSETS = {
  en: {
    attention_please: '/audio_assets/phrases/attention_please.mp3',
    urgent_attention_please: '/audio_assets/phrases/urgent_attention_please.mp3',
    at: '/audio_assets/phrases/at.mp3',
    is_approaching: '/audio_assets/phrases/is_approaching.mp3',
    arriving_shortly: '/audio_assets/phrases/arriving_shortly_on_platform.mp3',
    has_arrived: '/audio_assets/phrases/has_arrived_on_platform.mp3',
    ready_to_leave: '/audio_assets/phrases/ready_to_leave_platform.mp3',
    running_late: '/audio_assets/phrases/running_late_by.mp3',
    cancelled: '/audio_assets/phrases/has_been_cancelled.mp3',
    thank_you: '/audio_assets/phrases/thank_you.mp3',
  },
  hi: {
    attention_please: '/audio_assets/phrases_hi/yatrigan_kripya_dhyan_dein.mp3',
    urgent_attention_please: '/audio_assets/phrases_hi/aavashyak_soochna.mp3',
    at: '/audio_assets/phrases_hi/bajkar.mp3',
    is_approaching: '/audio_assets/phrases_hi/nikat_aa_rahi_hai.mp3',
    thodi_hi_der_mein: '/audio_assets/phrases_hi/thodi_hi_der_mein.mp3',
    par_aa_chuki_hai: '/audio_assets/phrases_hi/par_aa_chuki_hai.mp3',
    se_prasthan_karne_ke_liye_taiyar_hai: '/audio_assets/phrases_hi/se_prasthan_karne_ke_liye_taiyar_hai.mp3',
    radd_kar_di_gayi_hai: '/audio_assets/phrases_hi/radd_kar_di_gayi_hai.mp3',
    dhanyawaad: '/audio_assets/phrases_hi/dhanyawaad.mp3',
  },
  te: {
    attention_please: '/audio_assets/phrases_te/prayaanikulaku_vignapthi.mp3',
    urgent_attention_please: '/audio_assets/phrases_te/atyavasara_gamanika.mp3',
    at: '/audio_assets/phrases_te/nimishalaku.mp3',
    is_approaching: '/audio_assets/phrases_te/sameepisthunnadi.mp3',
    marikoddi_nimishamulalo: '/audio_assets/phrases_te/marikoddi_nimishamulalo.mp3',
    paiki_raanunnadi: '/audio_assets/phrases_te/number_platform_paiki_raanunnadi.mp3',
    paiki_cherukunnadi: '/audio_assets/phrases_te/number_platform_paiki_cherukunnadi.mp3',
    raddu_cheyabadinadi: '/audio_assets/phrases_te/raddu_cheyabadinadi.mp3',
    dhanyavaadamulu: '/audio_assets/phrases_te/dhanyavaadamulu.mp3',
  },
  ta: {
    attention_please: '/audio_assets/phrases_ta/payanigalin_gavanathirku.mp3',
    urgent_attention_please: '/audio_assets/phrases_ta/avasara_arivippu.mp3',
    at: '/audio_assets/phrases_ta/manikku.mp3',
    is_approaching: '/audio_assets/phrases_ta/nerungi_kondirukkiradhu.mp3',
    nandri: '/audio_assets/phrases_ta/nandri.mp3',
  },
  ml: {
    attention_please: '/audio_assets/phrases_ml/yathrakkarude_shraddhaykku.mp3',
    urgent_attention_please: '/audio_assets/phrases_ml/adiyanthara_ariyippu.mp3',
    at: '/audio_assets/phrases_ml/manikku.mp3',
    is_approaching: '/audio_assets/phrases_ml/aduthethiyirikkunnu.mp3',
    nanni: '/audio_assets/phrases_ml/nanni.mp3',
  },
};

/**
 * Builds the sequence of authentic MP3 file paths for the given announcement configuration.
 */
export function buildRailwayAudioSequence({
  language = 'english',
  trainNumber = '12723',
  trainKey = 'telangana_express',
  fromStation = 'hyderabad',
  toStation = 'new_delhi',
  viaStations = [],
  platform = '4',
  status = 'arriving', // 'approaching' | 'arriving' | 'arrived' | 'ready_to_leave' | 'running_late' | 'cancelled'
  isUrgent = false,
  delayHours = 0,
  delayMinutes = 15,
  depHours = '06',
  depMins = '45'
} = {}) {
  const sequence = [];
  const digits = String(trainNumber).replace(/\D/g, '').split('');
  const platNum = parseInt(platform, 10) || 1;

  if (language === 'english') {
    // 1. Attention Please / Urgent Notice
    if (isUrgent) {
      sequence.push('/audio_assets/phrases/urgent_attention_please.mp3');
    } else {
      sequence.push('/audio_assets/phrases/attention_please.mp3');
    }

    // 2. Train Number ("Train number")
    sequence.push('/audio_assets/phrases/train_number.mp3');

    // 3. Train Number Digits ("1", "2", "7", "2", "3")
    digits.forEach(d => {
      sequence.push(`/audio_assets/numbers_en/${d}.mp3`);
    });

    // 4. Train Name ("Telangana Express")
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }

    // 5. From Station ("from Hyderabad")
    if (fromStation) {
      sequence.push('/audio_assets/phrases/from.mp3');
      sequence.push(`/audio_assets/stations/${fromStation}.mp3`);
    }

    // 6. To Station ("to New Delhi")
    if (toStation && status !== 'terminated') {
      sequence.push('/audio_assets/phrases/to.mp3');
      sequence.push(`/audio_assets/stations/${toStation}.mp3`);
    }

    // 6.1 Via Stations ("via Secunderabad, Bhopal, and Hazrat Nizamuddin")
    if (viaStations && viaStations.length > 0 && status !== 'terminated') {
      sequence.push('/audio_assets/phrases/via.mp3');
      viaStations.forEach((vKey, idx) => {
        if (idx === viaStations.length - 1 && viaStations.length > 1) {
          sequence.push('/audio_assets/phrases/and.mp3');
        }
        sequence.push(`/audio_assets/stations/${vKey}.mp3`);
      });
    }

    // 7. Status / Platform
    if (status === 'approaching') {
      sequence.push('/audio_assets/phrases/arriving_shortly_on_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
    } else if (status === 'arrival' || status === 'arrived') {
      sequence.push('/audio_assets/phrases/has_arrived_on_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
    } else if (status === 'terminated') {
      sequence.push('/audio_assets/phrases/has_arrived_on_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases/terminates_here.mp3');
    } else if (status === 'halting') {
      // Halting scheduled departure time ("scheduled to depart at 6 45")
      sequence.push('/audio_assets/phrases/scheduled_to_depart_at.mp3');
      const hNum = parseInt(depHours, 10) || 6;
      const mNum = parseInt(depMins, 10) || 0;

      // Natural speech: e.g. "6" ("six") instead of "06" ("zero six")
      sequence.push(`/audio_assets/numbers_en/${hNum}.mp3`);

      if (mNum > 0) {
        sequence.push(`/audio_assets/numbers_en/${mNum}.mp3`);
      } else {
        sequence.push('/audio_assets/phrases/hours.mp3');
      }

      // Halting platform arrival ("has arrived on platform number 1")
      sequence.push('/audio_assets/phrases/has_arrived_on_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
    } else if (status === 'ready_to_leave') {
      sequence.push('/audio_assets/phrases/ready_to_leave_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
    } else if (status === 'running_late') {
      sequence.push('/audio_assets/phrases/running_late_by.mp3');
      if (delayHours > 0) {
        sequence.push(`/audio_assets/numbers_en/${delayHours}.mp3`);
        sequence.push(`/audio_assets/phrases/${delayHours === 1 ? 'hour' : 'hours'}.mp3`);
        if (delayMinutes > 0) sequence.push('/audio_assets/phrases/and.mp3');
      }
      if (delayMinutes > 0) {
        sequence.push(`/audio_assets/numbers_en/${delayMinutes}.mp3`);
        sequence.push(`/audio_assets/phrases/${delayMinutes === 1 ? 'minute' : 'minutes'}.mp3`);
      }
    } else if (status === 'cancelled') {
      sequence.push('/audio_assets/phrases/has_been_cancelled.mp3');
      sequence.push('/audio_assets/phrases/inconvenience_regretted.mp3');
    }

    // 8. Thank you ("Thank you.")
    sequence.push('/audio_assets/phrases/thank_you.mp3');

  } else if (language === 'hindi') {
    // 1. Yatrigan kripya dhyan dein / Aavashyak Soochna
    if (isUrgent) {
      sequence.push('/audio_assets/phrases_hi/aavashyak_soochna.mp3');
    } else {
      sequence.push('/audio_assets/phrases_hi/yatrigan_kripya_dhyan_dein.mp3');
    }

    // 2. Gaadi sankhya ("गाड़ी संख्या")
    sequence.push('/audio_assets/phrases_hi/gaadi_sankhya.mp3');

    // 3. Train Number Digits ("एक", "दो", "सात", "दो", "तीन")
    digits.forEach(d => {
      sequence.push(`/audio_assets/numbers_hi/${d}.mp3`);
    });

    // 4. Train Name ("तेलंगाना एक्सप्रेस")
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }

    // 5. From Station ("हैदराबाद से चलकर")
    if (fromStation) {
      sequence.push(`/audio_assets/stations_hi_ml/${fromStation}.mp3`);
      sequence.push('/audio_assets/phrases_hi/se_chalkar.mp3');
    }

    // 5.1 Via Stations ("सिकंदराबाद, भोपाल और हज़रत निज़ामुद्दीन के रास्ते")
    if (viaStations && viaStations.length > 0 && status !== 'terminated') {
      viaStations.forEach((vKey, idx) => {
        if (idx === viaStations.length - 1 && viaStations.length > 1) {
          sequence.push('/audio_assets/phrases_hi/aur.mp3');
        }
        sequence.push(`/audio_assets/stations_hi_ml/${vKey}.mp3`);
      });
      sequence.push('/audio_assets/phrases_hi/ke_raaste.mp3');
    }

    // 6. To Station ("नई दिल्ली को जाने वाली")
    if (toStation && status !== 'terminated') {
      const destFile = toStation === 'new_delhi' ? 'nai_dilli' : toStation;
      sequence.push(`/audio_assets/stations_hi_ml/${destFile}.mp3`);
      sequence.push('/audio_assets/phrases_hi/ko_jaane_wali.mp3');
    }

    // 7. Status / Platform ("थोड़ी ही देर में प्लेटफार्म संख्या 4 पर आ रही है")
    if (status === 'approaching') {
      sequence.push('/audio_assets/phrases_hi/thodi_hi_der_mein.mp3');
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/par_aa_rahi_hai.mp3');
    } else if (status === 'arrival' || status === 'arrived') {
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/par_aa_chuki_hai.mp3');
    } else if (status === 'terminated') {
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/par_aa_chuki_hai.mp3');
      sequence.push('/audio_assets/phrases_hi/yahin_samaapt_hogi.mp3');
    } else if (status === 'halting') {
      // Halting departure first: "06 बजकर 45 मिनट पर प्रस्थान करेगी"
      const hNum = parseInt(depHours, 10) || 6;
      const mNum = parseInt(depMins, 10) || 0;
      sequence.push(`/audio_assets/numbers_hi/${hNum}.mp3`);
      if (mNum > 0) {
        sequence.push('/audio_assets/phrases_hi/bajkar.mp3');
        sequence.push(`/audio_assets/numbers_hi/${mNum}.mp3`);
        sequence.push('/audio_assets/phrases_hi/at.mp3');
      } else {
        sequence.push('/audio_assets/phrases_hi/baje.mp3');
      }
      sequence.push('/audio_assets/phrases_hi/se_prasthan_karegi.mp3');

      // Followed by platform arrival: "प्लेटफार्म संख्या 1 पर आ चुकी है"
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/par_aa_chuki_hai.mp3');
    } else if (status === 'ready_to_leave') {
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/se_prasthan_karne_ke_liye_taiyar_hai.mp3');
    } else if (status === 'running_late') {
      sequence.push('/audio_assets/phrases_hi/apne_nirdharit_samay_se.mp3');
      if (delayHours > 0) {
        sequence.push(`/audio_assets/numbers_hi/${delayHours}.mp3`);
        sequence.push(`/audio_assets/phrases_hi/${delayHours === 1 ? 'ghanta' : 'ghante'}.mp3`);
        if (delayMinutes > 0) sequence.push('/audio_assets/phrases_hi/aur.mp3');
      }
      if (delayMinutes > 0) {
        sequence.push(`/audio_assets/numbers_hi/${delayMinutes}.mp3`);
        sequence.push('/audio_assets/phrases_hi/minute_ki_deri_se_chal_rahi_hai.mp3');
      }
    } else if (status === 'cancelled') {
      sequence.push('/audio_assets/phrases_hi/radd_kar_di_gayi_hai.mp3');
      sequence.push('/audio_assets/phrases_hi/huyi_asuvidha_ke_liye_humein_khed_hai.mp3');
    }

    // 8. Dhanyawaad ("धन्यवाद।")
    sequence.push('/audio_assets/phrases_hi/dhanyawaad.mp3');

  } else if (language === 'telugu') {
    // 1. Attention: Prayaanikulaku vignapthi / Atyavasara Gamanika
    if (isUrgent) {
      sequence.push('/audio_assets/phrases_te/atyavasara_gamanika.mp3');
    } else {
      sequence.push('/audio_assets/phrases_te/prayaanikulaku_vignapthi.mp3');
    }

    // 2. Railu number ("రైలు నంబరు")
    sequence.push('/audio_assets/phrases_te/railu_number.mp3');

    // 3. Train Number Digits (0 to 9 in digits_te) ("ఒకటి", "రెండు", "ఏడు", "రెండు", "మూడు")
    digits.forEach(d => {
      sequence.push(`/audio_assets/digits_te/${d}.mp3`);
    });

    // 4. Train Name ("తెలంగాణ ఎక్స్‌ప్రెస్")
    sequence.push(`/audio_assets/trains_te/${trainKey}.mp3`);

    // 5. From Station ("హైదరాబాద్ నుండి")
    if (fromStation) {
      sequence.push(`/audio_assets/stations_te/${fromStation}.mp3`);
      sequence.push('/audio_assets/phrases_te/nundi.mp3');
    }

    // 5.1 Via Stations ("సికింద్రాబాద్, భోపాల్ మరియు హజ్రత్ నిజాముద్దీన్ మీదుగా")
    if (viaStations && viaStations.length > 0 && status !== 'terminated') {
      viaStations.forEach((vKey, idx) => {
        if (idx === viaStations.length - 1 && viaStations.length > 1) {
          sequence.push('/audio_assets/phrases_te/mariyu.mp3');
        }
        sequence.push(`/audio_assets/stations_te/${vKey}.mp3`);
      });
      sequence.push('/audio_assets/phrases_te/meeduga.mp3');
    }

    // 6. To Station ("న్యూఢిల్లీ వరకు వెళ్ళునది")
    if (toStation && status !== 'terminated') {
      sequence.push(`/audio_assets/stations_te/${toStation}.mp3`);
      sequence.push('/audio_assets/phrases_te/varaku.mp3');
      sequence.push('/audio_assets/phrases_te/vellunadi.mp3');
    }

    // 7. Status & Platform
    if (status === 'approaching') {
      sequence.push('/audio_assets/phrases_te/marikoddi_nimishamulalo.mp3');
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_raanunnadi.mp3');
    } else if (status === 'arrival' || status === 'arrived') {
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_cherukunnadi.mp3');
    } else if (status === 'terminated') {
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_cherukunnadi.mp3');
      sequence.push('/audio_assets/phrases_te/ikkaditho_tana_prayaananni_mugistundi.mp3');
    } else if (status === 'halting') {
      // Halting departure first: "06 గంటల 45 నిమిషములకు బయలుదేరవలసినది"
      const hNum = parseInt(depHours, 10) || 6;
      const mNum = parseInt(depMins, 10) || 0;
      sequence.push(`/audio_assets/numbers_te/${hNum}.mp3`);
      if (mNum > 0) {
        sequence.push('/audio_assets/phrases_te/gantala.mp3');
        sequence.push(`/audio_assets/numbers_te/${mNum}.mp3`);
        sequence.push('/audio_assets/phrases_te/nimishalaku.mp3');
      } else {
        sequence.push('/audio_assets/phrases_te/gantalaku.mp3');
      }
      sequence.push('/audio_assets/phrases_te/bayaludeeravalasinadi.mp3');

      // Followed by platform arrival: "1 వ నంబరు ప్లాట్‌ఫారమ్ పైకి చేరుకున్నది"
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_cherukunnadi.mp3');
    } else if (status === 'ready_to_leave') {
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_nundi_bayaluderutaku_siddhanga_unnadi.mp3');
    } else if (status === 'running_late') {
      if (delayHours > 0) {
        sequence.push(`/audio_assets/numbers_te/${delayHours}.mp3`);
        sequence.push('/audio_assets/phrases_te/gantala.mp3');
      }
      if (delayMinutes > 0) {
        sequence.push(`/audio_assets/numbers_te/${delayMinutes}.mp3`);
        sequence.push('/audio_assets/phrases_te/nimishaalu_aalasyanga_nadustunnadi.mp3');
      }
    } else if (status === 'cancelled') {
      sequence.push('/audio_assets/phrases_te/raddu_cheyabadinadi.mp3');
      sequence.push('/audio_assets/phrases_te/prayaanikulaku_kaligina_asaukaryaaniki_chintistunnamu.mp3');
    }

    // 8. Closing: Dhanyavaadamulu ("ధన్యవాదములు.")
    sequence.push('/audio_assets/phrases_te/dhanyavaadamulu.mp3');

  } else if (language === 'tamil') {
    if (isUrgent) {
      sequence.push('/audio_assets/phrases_ta/avasara_arivippu.mp3');
    } else {
      sequence.push('/audio_assets/phrases_ta/payanigalin_gavanathirku.mp3');
    }
    sequence.push('/audio_assets/phrases_ta/vandi_en.mp3');
    digits.forEach(d => {
      sequence.push(`/audio_assets/digits_ta/${d}.mp3`);
    });
    sequence.push(`/audio_assets/trains_ta/${trainKey}.mp3`);
    if (fromStation) {
      sequence.push(`/audio_assets/stations_ta/${fromStation}.mp3`);
      sequence.push('/audio_assets/phrases_ta/ilirundhu.mp3');
    }
    if (viaStations && viaStations.length > 0) {
      viaStations.forEach((vKey, idx) => {
        if (idx === viaStations.length - 1 && viaStations.length > 1) {
          sequence.push('/audio_assets/phrases_ta/matrum.mp3');
        }
        sequence.push(`/audio_assets/stations_ta/${vKey}.mp3`);
      });
      sequence.push('/audio_assets/phrases_ta/sellum_vazhiyaaga.mp3');
    }
    if (toStation && status !== 'terminated') {
      sequence.push(`/audio_assets/stations_ta/${toStation}.mp3`);
    }
    const safePlat = Math.min(24, Math.max(1, platNum));
    if (status === 'approaching') {
      sequence.push('/audio_assets/phrases_ta/sattru_neerathil.mp3');
      sequence.push(`/audio_assets/platforms_ta/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ta/il_vandhu_serum.mp3');
    } else if (status === 'arrival' || status === 'arrived') {
      sequence.push(`/audio_assets/platforms_ta/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ta/il_vandhu_serndhulladhu.mp3');
    } else if (status === 'terminated') {
      sequence.push(`/audio_assets/platforms_ta/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ta/il_vandhu_serndhulladhu.mp3');
      sequence.push('/audio_assets/phrases_ta/iththudan_thanadhu_payanaththai_mudiththuk_kolgiradhu.mp3');
    } else if (status === 'halting') {
      const hNum = parseInt(depHours, 10) || 6;
      const mNum = parseInt(depMins, 10) || 0;
      sequence.push(`/audio_assets/numbers_ta/${hNum}.mp3`);
      sequence.push('/audio_assets/phrases_ta/manikku.mp3');
      if (mNum > 0) {
        sequence.push(`/audio_assets/numbers_ta/${mNum}.mp3`);
      }
      sequence.push('/audio_assets/phrases_ta/ilirundhu_purappadum.mp3');

      sequence.push(`/audio_assets/platforms_ta/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ta/il_vandhu_serndhulladhu.mp3');
    } else if (status === 'ready_to_leave') {
      sequence.push(`/audio_assets/platforms_ta/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ta/ilirundhu_purappada_thayaaraaga_ulladhu.mp3');
    } else if (status === 'cancelled') {
      sequence.push('/audio_assets/phrases_ta/raththu_seiyyappattulladhu.mp3');
      sequence.push('/audio_assets/phrases_ta/eerpattra_shiramaththirku_varundhugirom.mp3');
    }
    sequence.push('/audio_assets/phrases_ta/nandri.mp3');

  } else if (language === 'malayalam') {
    if (isUrgent) {
      sequence.push('/audio_assets/phrases_ml/adiyanthara_ariyippu.mp3');
    } else {
      sequence.push('/audio_assets/phrases_ml/yathrakkarude_shraddhaykku.mp3');
    }
    sequence.push('/audio_assets/phrases_ml/train_number.mp3');
    digits.forEach(d => {
      sequence.push(`/audio_assets/digits_ml/${d}.mp3`);
    });
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }
    if (fromStation) {
      sequence.push(`/audio_assets/stations_hi_ml/${fromStation}.mp3`);
      sequence.push('/audio_assets/phrases_ml/muthal.mp3');
    }
    if (viaStations && viaStations.length > 0) {
      viaStations.forEach((vKey) => {
        sequence.push(`/audio_assets/stations_hi_ml/${vKey}.mp3`);
      });
      sequence.push('/audio_assets/phrases_ml/vazhi.mp3');
    }
    if (toStation && status !== 'terminated') {
      sequence.push(`/audio_assets/stations_hi_ml/${toStation}.mp3`);
      sequence.push('/audio_assets/phrases_ml/vare_pokunna.mp3');
    }
    const safePlat = Math.min(24, Math.max(1, platNum));
    if (status === 'approaching') {
      sequence.push('/audio_assets/phrases_ml/alpa_samayathinakam.mp3');
      sequence.push(`/audio_assets/platforms_ml/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ml/platformilekku_ethicherunnathaanu.mp3');
    } else if (status === 'arrival' || status === 'arrived') {
      sequence.push(`/audio_assets/platforms_ml/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ml/platformil_ethichernnirikkunnu.mp3');
    } else if (status === 'terminated') {
      sequence.push(`/audio_assets/platforms_ml/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ml/platformil_ethichernnirikkunnu.mp3');
      sequence.push('/audio_assets/phrases_ml/ivide_yaathra_avasanippikkunnathaanu.mp3');
    } else if (status === 'halting') {
      const hNum = parseInt(depHours, 10) || 6;
      const mNum = parseInt(depMins, 10) || 0;
      sequence.push(`/audio_assets/minutes_ml/${hNum}.mp3`);
      sequence.push('/audio_assets/phrases_ml/manikku.mp3');
      if (mNum > 0) {
        sequence.push(`/audio_assets/minutes_ml/${mNum}.mp3`);
      }
      sequence.push('/audio_assets/phrases_ml/platformil_ninnum_purappedunnathaanu.mp3');

      sequence.push(`/audio_assets/platforms_ml/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ml/platformil_ethichernnirikkunnu.mp3');
    } else if (status === 'ready_to_leave') {
      sequence.push(`/audio_assets/platforms_ml/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_ml/platformil_ninnum_purappedan_thayyarayi_nilkkunnu.mp3');
    } else if (status === 'cancelled') {
      sequence.push('/audio_assets/phrases_ml/raddhaakkiyirikkunnu.mp3');
      sequence.push('/audio_assets/phrases_ml/yaathrakkaarkkundaya_asowkaryathil_khedikkunnu.mp3');
    }
    sequence.push('/audio_assets/phrases_ml/nanni.mp3');
  }

  // Opening mic key-tone / chirp (plays right after the 3-tone chime)
  sequence.unshift('/audio_assets/mic_chirp.mp3');

  // Closing mic key-tone / chirp (plays at the very end of the announcement)
  sequence.push('/audio_assets/mic_chirp.mp3');

  return sequence;
}

/**
 * Preloads audio metadata to obtain real total duration before/during playback.
 */
export async function calculateSequenceDuration(filePaths) {
  const promises = filePaths.map(src => {
    return new Promise((resolve) => {
      const audioUrl = typeof src === 'string' ? src : (src?.src || '');
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = audioUrl;

      let resolved = false;
      const done = (dur) => {
        if (!resolved) {
          resolved = true;
          audio.onloadedmetadata = null;
          audio.onerror = null;
          resolve(dur);
        }
      };

      // Failsafe timer (150ms) to prevent slow network from delaying announcement playback
      const timer = setTimeout(() => done(0.8), 150);

      audio.onloadedmetadata = () => {
        clearTimeout(timer);
        done(audio.duration || 0.8);
      };

      audio.onerror = () => {
        clearTimeout(timer);
        done(0.8);
      };
    });
  });
  const durations = await Promise.all(promises);
  const total = durations.reduce((sum, d) => sum + d, 0);
  return { total, durations };
}

/**
 * Plays the authentic Indian Railway 3-Tone chime MP3 recorded clip,
 * with Web Audio API synthesis as fallback.
 */
export function playRailwayChime(audioContext) {
  return new Promise((resolve) => {
    try {
      const audio = new Audio('/audio_assets/railway_chime.mp3');
      let resolved = false;
      const done = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      audio.onended = done;
      audio.onerror = () => {
        synthesizeRailwayChime(audioContext).then(done);
      };
      audio.play().catch(() => {
        synthesizeRailwayChime(audioContext).then(done);
      });
    } catch {
      synthesizeRailwayChime(audioContext).then(resolve);
    }
  });
}

function synthesizeRailwayChime(audioContext) {
  return new Promise((resolve) => {
    try {
      const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const notes = [
        { freq: 523.25, start: 0, dur: 0.42 },     // C5
        { freq: 659.25, start: 0.38, dur: 0.42 },   // E5
        { freq: 783.99, start: 0.76, dur: 0.75 }    // G5
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
      masterGain.connect(ctx.destination);

      notes.forEach(({ freq, start, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur + 0.05);
      });

      setTimeout(() => {
        resolve();
      }, 1550);
    } catch {
      resolve();
    }
  });
}

/**
 * High-performance gapless concatenative player for Indian Railway announcements.
 * Guaranteed zero overlap across language switches, train changes, and operational phases.
 */
export class RailwayAnnouncementPlayer {
  constructor({ onProgress, onEnded, onError } = {}) {
    this.onProgress = onProgress || (() => {});
    this.onEnded = onEnded || (() => {});
    this.onError = onError || (() => {});
    this.isPlaying = false;
    this.currentAudio = null;
    this.ambienceAudio = null;
    this.audioContext = null;
    this.currentIndex = 0;
    this.sequence = [];
    this.durations = [];
    this.totalDuration = 0;
    this.elapsedBefore = 0;
    this.animId = null;
    this.sessionId = 0;
    this.langMeta = null;
  }

  async play({ sequence, withChime = true, withAmbience = true, withChirp = true }) {
    // 1. Invalidate any ongoing run immediately and halt all active sounds
    this.stop();

    // 2. Generate unique execution token for this session
    const currentSessionId = ++this.sessionId;
    this.isPlaying = true;

    // Ensure opening and closing mic chirps are present if withChirp is enabled
    let fullSequence = [...sequence];
    if (withChirp) {
      const firstSrc = typeof fullSequence[0] === 'string' ? fullSequence[0] : (fullSequence[0]?.src || '');
      if (fullSequence.length > 0 && firstSrc !== '/audio_assets/mic_chirp.mp3') {
        fullSequence.unshift({ src: '/audio_assets/mic_chirp.mp3', isChirp: true, lang: null });
      }
      const lastSrc = typeof fullSequence[fullSequence.length - 1] === 'string'
        ? fullSequence[fullSequence.length - 1]
        : (fullSequence[fullSequence.length - 1]?.src || '');
      if (fullSequence.length > 0 && lastSrc !== '/audio_assets/mic_chirp.mp3') {
        fullSequence.push({ src: '/audio_assets/mic_chirp.mp3', isChirp: true, lang: null });
      }
    }
    this.sequence = fullSequence;
    this.currentIndex = 0;
    this.elapsedBefore = 0;

    // 3. Play authentic station ambient background noise from start to finish
    if (withAmbience) {
      try {
        const amb = new Audio('/audio_assets/station_ambience.mp3');
        amb.loop = true;
        amb.volume = 0.28;
        this.ambienceAudio = amb;
        amb.play().catch(e => console.warn('Ambience playback note:', e));
      } catch (e) {
        console.warn('Ambience init note:', e);
      }
    }

    // 4. Play authentic 3-tone chime first if requested
    if (withChime) {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      await playRailwayChime(this.audioContext);
      // Strictly verify session is still active after chime resolves
      if (!this.isPlaying || this.sessionId !== currentSessionId) return;
    }

    // 5. Pre-calculate total duration with fast failsafe
    const meta = await calculateSequenceDuration(this.sequence);
    if (!this.isPlaying || this.sessionId !== currentSessionId) return;

    this.totalDuration = meta.total;
    this.durations = meta.durations;

    // Precompute language boundaries and total durations for live teleprompter
    this.langMeta = {};
    this.sequence.forEach((item, idx) => {
      const l = typeof item === 'object' ? item?.lang : null;
      if (l) {
        if (!this.langMeta[l]) {
          this.langMeta[l] = { total: 0, startIdx: idx, endIdx: idx };
        }
        this.langMeta[l].total += (this.durations[idx] || 0.8);
        this.langMeta[l].endIdx = idx;
      }
    });

    // 6. Begin strictly sequential chain
    this._playNext(currentSessionId);
    this._startProgressLoop(currentSessionId);
  }

  _playNext(currentSessionId) {
    if (!this.isPlaying || this.sessionId !== currentSessionId) return;

    if (this.currentIndex >= this.sequence.length) {
      const finalProgress = {};
      if (this.langMeta) {
        for (const lang of Object.keys(this.langMeta)) {
          finalProgress[lang] = 1.0;
        }
      }
      this.onProgress({
        current: this.totalDuration,
        total: this.totalDuration,
        index: this.sequence.length,
        file: '',
        activeLang: null,
        langProgress: finalProgress
      });
      this.stop();
      this.onEnded();
      return;
    }

    // Clean up any previously attached audio completely
    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.pause();
      } catch (e) {}
      this.currentAudio = null;
    }

    const item = this.sequence[this.currentIndex];
    const src = typeof item === 'string' ? item : (item?.src || '');
    const audio = new Audio(src);
    this.currentAudio = audio;

    let advanced = false;
    const advanceStep = (success = false) => {
      if (advanced) return;
      advanced = true;

      // Unhook listeners to avoid duplicate callbacks
      audio.onended = null;
      audio.onerror = null;

      if (!this.isPlaying || this.sessionId !== currentSessionId) {
        try {
          audio.pause();
        } catch (e) {}
        return;
      }

      if (success) {
        this.elapsedBefore += (this.durations[this.currentIndex] || audio.duration || 0);
      }
      this.currentIndex++;
      this._playNext(currentSessionId);
    };

    audio.onended = () => {
      advanceStep(true);
    };

    audio.onerror = (e) => {
      console.warn(`[AudioEngine] Clip failed to load: ${src}`, e);
      advanceStep(false);
    };

    audio.play().catch((err) => {
      if (err.name === 'AbortError') {
        // Paused or stopped deliberately, do NOT advance
        return;
      }
      console.warn(`[AudioEngine] Playback error: ${src}`, err);
      advanceStep(false);
    });
  }

  _startProgressLoop(currentSessionId) {
    const update = () => {
      if (!this.isPlaying || this.sessionId !== currentSessionId) return;

      const currentItem = this.sequence[this.currentIndex];
      const src = typeof currentItem === 'string' ? currentItem : (currentItem?.src || '');
      const activeLang = typeof currentItem === 'object' ? (currentItem?.lang || null) : null;
      const currentClipTime = this.currentAudio ? this.currentAudio.currentTime : 0;
      const current = Math.min(this.totalDuration, this.elapsedBefore + currentClipTime);

      const langProgress = {};
      if (this.langMeta) {
        for (const lang of Object.keys(this.langMeta)) {
          const meta = this.langMeta[lang];
          if (this.currentIndex > meta.endIdx) {
            langProgress[lang] = 1.0;
          } else if (this.currentIndex < meta.startIdx) {
            langProgress[lang] = 0.0;
          } else {
            let elapsedInLang = 0;
            for (let k = meta.startIdx; k < this.currentIndex; k++) {
              if (this.sequence[k]?.lang === lang) {
                elapsedInLang += (this.durations[k] || 0.8);
              }
            }
            if (this.sequence[this.currentIndex]?.lang === lang) {
              elapsedInLang += currentClipTime;
            }
            const totalInLang = meta.total || 1;
            langProgress[lang] = Math.min(1.0, Math.max(0.0, elapsedInLang / totalInLang));
          }
        }
      }

      this.onProgress({
        current,
        total: this.totalDuration || 10,
        index: this.currentIndex,
        file: src,
        activeLang,
        langProgress
      });

      this.animId = requestAnimationFrame(update);
    };

    this.animId = requestAnimationFrame(update);
  }

  stop() {
    // Invalidate running session immediately
    this.sessionId++;
    this.isPlaying = false;
    this.langMeta = null;

    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
    }

    if (this.ambienceAudio) {
      try {
        const amb = this.ambienceAudio;
        amb.pause();
        amb.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.ambienceAudio = null;
    }
  }
}
