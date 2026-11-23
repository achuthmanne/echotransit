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

/**
 * Builds the sequence of authentic MP3 file paths for the given announcement configuration.
 */
export function buildRailwayAudioSequence({
  language = 'english',
  trainNumber = '12723',
  trainKey = 'telangana_express',
  fromStation = 'hyderabad',
  toStation = 'new_delhi',
  platform = '4',
  status = 'arriving', // 'arriving' | 'arrived' | 'ready_to_leave' | 'running_late' | 'cancelled'
  delayHours = 0,
  delayMinutes = 15
} = {}) {
  const sequence = [];
  const digits = String(trainNumber).replace(/\D/g, '').split('');
  const platNum = parseInt(platform, 10) || 1;

  if (language === 'english') {
    // 1. Attention Please ("May I have your attention please")
    sequence.push('/audio_assets/phrases/attention_please.mp3');

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
    if (toStation) {
      sequence.push('/audio_assets/phrases/to.mp3');
      sequence.push(`/audio_assets/stations/${toStation}.mp3`);
    }

    // 7. Status / Platform
    if (status === 'arriving') {
      sequence.push('/audio_assets/phrases/arriving_shortly_on_platform.mp3');
      sequence.push(`/audio_assets/numbers_en/${platNum}.mp3`);
    } else if (status === 'arrived') {
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
    // 1. Yatrigan kripya dhyan dein ("यात्रीगण कृपया ध्यान दें")
    sequence.push('/audio_assets/phrases_hi/yatrigan_kripya_dhyan_dein.mp3');

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

    // 6. To Station ("नई दिल्ली को जाने वाली")
    if (toStation) {
      const destFile = toStation === 'new_delhi' ? 'nai_dilli' : toStation;
      sequence.push(`/audio_assets/stations_hi_ml/${destFile}.mp3`);
      sequence.push('/audio_assets/phrases_hi/ko_jaane_wali.mp3');
    }

    // 7. Status / Platform ("थोड़ी ही देर में प्लेटफार्म संख्या 4 पर आ रही है")
    if (status === 'arriving') {
      sequence.push('/audio_assets/phrases_hi/thodi_hi_der_mein.mp3');
      sequence.push('/audio_assets/phrases_hi/platform_sankhya_core.mp3');
      sequence.push(`/audio_assets/numbers_hi/${platNum}.mp3`);
      sequence.push('/audio_assets/phrases_hi/par_aa_rahi_hai.mp3');
    } else if (status === 'arrived') {
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
    // 1. Attention: Prayaanikulaku vignapthi ("ప్రయాణికులకు విజ్ఞప్తి.")
    sequence.push('/audio_assets/phrases_te/prayaanikulaku_vignapthi.mp3');

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

    // 6. To Station ("న్యూఢిల్లీ వరకు వెళ్ళునది")
    if (toStation) {
      sequence.push(`/audio_assets/stations_te/${toStation}.mp3`);
      sequence.push('/audio_assets/phrases_te/varaku.mp3');
      sequence.push('/audio_assets/phrases_te/vellunadi.mp3');
    }

    // 7. Status & Platform
    if (status === 'arriving') {
      sequence.push('/audio_assets/phrases_te/marikoddi_nimishamulalo.mp3');
      const safePlat = Math.min(24, Math.max(1, platNum));
      sequence.push(`/audio_assets/platforms_te/${safePlat}.mp3`);
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_raanunnadi.mp3');
    } else if (status === 'arrived') {
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

  } else if (language === 'malayalam') {
    // Malayalam Train Number Digits
    digits.forEach(d => {
      sequence.push(`/audio_assets/numbers_ml/${d}.mp3`);
    });
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }
    const safePlat = Math.min(24, Math.max(1, platNum));
    sequence.push(`/audio_assets/numbers_ml/${safePlat}.mp3`);
  }

  return sequence;
}

/**
 * Preloads audio metadata to obtain real total duration before/during playback.
 */
export async function calculateSequenceDuration(filePaths) {
  const promises = filePaths.map(src => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = src;
      audio.onloadedmetadata = () => resolve(audio.duration || 1.0);
      audio.onerror = () => resolve(1.0); // fallback 1 sec
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
  }

  async play({ sequence, withChime = true, withAmbience = true }) {
    this.stop();
    this.isPlaying = true;
    this.sequence = sequence;
    this.currentIndex = 0;
    this.elapsedBefore = 0;

    // 1. Play authentic station ambient background noise from start to finish
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

    // 2. Play authentic 3-tone chime first if requested
    if (withChime) {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      await playRailwayChime(this.audioContext);
      if (!this.isPlaying) return; // stopped while chiming
    }

    // 3. Pre-calculate total duration
    const meta = await calculateSequenceDuration(sequence);
    this.totalDuration = meta.total;
    this.durations = meta.durations;

    // 4. Begin chain
    this._playNext();
    this._startProgressLoop();
  }

  _playNext() {
    if (!this.isPlaying) return;

    if (this.currentIndex >= this.sequence.length) {
      this.stop();
      this.onEnded();
      return;
    }

    const src = this.sequence[this.currentIndex];
    const audio = new Audio(src);
    this.currentAudio = audio;

    audio.onended = () => {
      if (!this.isPlaying) return;
      this.elapsedBefore += (this.durations[this.currentIndex] || audio.duration || 0);
      this.currentIndex++;
      this._playNext();
    };

    audio.onerror = (e) => {
      console.warn(`Audio clip failed to load: ${src}`, e);
      if (!this.isPlaying) return;
      this.currentIndex++;
      this._playNext();
    };

    audio.play().catch(err => {
      console.warn('Playback error:', err);
      if (!this.isPlaying) return;
      this.currentIndex++;
      this._playNext();
    });
  }

  _startProgressLoop() {
    const update = () => {
      if (!this.isPlaying) return;

      const currentClipTime = this.currentAudio ? this.currentAudio.currentTime : 0;
      const current = Math.min(this.totalDuration, this.elapsedBefore + currentClipTime);
      this.onProgress({
        current,
        total: this.totalDuration || 10,
        index: this.currentIndex,
        file: this.sequence[this.currentIndex]
      });

      this.animId = requestAnimationFrame(update);
    };

    this.animId = requestAnimationFrame(update);
  }

  stop() {
    this.isPlaying = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.currentAudio) {
      try {
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
        let vol = amb.volume;
        const fadeInterval = setInterval(() => {
          vol -= 0.05;
          if (vol <= 0.02) {
            clearInterval(fadeInterval);
            try {
              amb.pause();
              amb.currentTime = 0;
            } catch (e) {}
          } else {
            amb.volume = Math.max(0, vol);
          }
        }, 40);
      } catch (e) {
        try {
          this.ambienceAudio.pause();
        } catch (err) {}
      }
      this.ambienceAudio = null;
    }
  }
}
