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
  trainNumber = '17646',
  trainKey = 'secunderabad_repalle_express',
  platform = '2',
  status = 'arriving', // 'arriving' | 'arrived' | 'ready_to_leave' | 'running_late' | 'cancelled'
  delayHours = 0,
  delayMinutes = 15
} = {}) {
  const sequence = [];
  const digits = String(trainNumber).replace(/\D/g, '').split('');
  const platNum = parseInt(platform, 10) || 1;

  if (language === 'english') {
    // 1. Attention Please
    sequence.push('/audio_assets/phrases/attention_please.mp3');

    // 2. Train Number
    sequence.push('/audio_assets/phrases/train_number.mp3');

    // 3. Train Number Digits
    digits.forEach(d => {
      sequence.push(`/audio_assets/numbers_en/${d}.mp3`);
    });

    // 4. Train Name
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }

    // 5. Status / Platform
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

    // 6. Thank you
    sequence.push('/audio_assets/phrases/thank_you.mp3');

  } else if (language === 'hindi') {
    // 1. Yatrigan kripya dhyan dein
    sequence.push('/audio_assets/phrases_hi/yatrigan_kripya_dhyan_dein.mp3');

    // 2. Gaadi sankhya
    sequence.push('/audio_assets/phrases_hi/gaadi_sankhya.mp3');

    // 3. Train Number Digits
    digits.forEach(d => {
      sequence.push(`/audio_assets/numbers_hi/${d}.mp3`);
    });

    // 4. Train Name
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }

    // 5. Status / Platform
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

    // 6. Dhanyawaad
    sequence.push('/audio_assets/phrases_hi/dhanyawaad.mp3');

  } else if (language === 'telugu') {
    // Telugu Announcement Concatenation
    if (TRAIN_ASSETS[trainKey]) {
      sequence.push(TRAIN_ASSETS[trainKey].file);
    }
    if (status === 'arriving') {
      sequence.push('/audio_assets/phrases_te/number_platform_paiki_raavalasinadi.mp3');
    } else {
      sequence.push('/audio_assets/phrases_te/number_platform_nundi_bayaludeeravalasinadi.mp3');
    }
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
 * Synthesizes the authentic Indian Railway 3-Tone chime via Web Audio API.
 */
export function playRailwayChime(audioContext) {
  return new Promise((resolve) => {
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
    this.audioContext = null;
    this.currentIndex = 0;
    this.sequence = [];
    this.durations = [];
    this.totalDuration = 0;
    this.elapsedBefore = 0;
    this.animId = null;
  }

  async play({ sequence, withChime = true }) {
    this.stop();
    this.isPlaying = true;
    this.sequence = sequence;
    this.currentIndex = 0;
    this.elapsedBefore = 0;

    // 1. Play authentic 3-tone chime first if requested
    if (withChime) {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      await playRailwayChime(this.audioContext);
      if (!this.isPlaying) return; // stopped while chiming
    }

    // 2. Pre-calculate total duration
    const meta = await calculateSequenceDuration(sequence);
    this.totalDuration = meta.total;
    this.durations = meta.durations;

    // 3. Begin chain
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
  }
}
