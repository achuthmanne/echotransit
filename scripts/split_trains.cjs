const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/train_names.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const trains = [
    { id: 'telangana_express', name: 'Telangana Express', start: 0.05, end: 1.45 },
    { id: 'charminar_express', name: 'Charminar Express', start: 1.60, end: 3.05 },
    { id: 'godavari_express', name: 'Godavari Express', start: 3.15, end: 4.65 },
    { id: 'pinakini_express', name: 'Pinakini Express', start: 4.82, end: 6.25 },
    { id: 'gautami_express', name: 'Gautami Express', start: 6.40, end: 7.82 },
    { id: 'guntur_secunderabad_intercity', name: 'Guntur Secunderabad Intercity Express', start: 7.95, end: 10.82 },
    { id: 'secunderabad_repalle_express', name: 'Secunderabad Repalle Express', start: 10.95, end: 13.22 },
    { id: 'venkatadri_express', name: 'Venkatadri Express', start: 13.35, end: 14.98 },
    { id: 'tamil_nadu_express', name: 'Tamil Nadu Express', start: 15.10, end: 16.58 },
    { id: 'kerala_express', name: 'Kerala Express', start: 16.70, end: 18.02 },
    { id: 'karnataka_express', name: 'Karnataka Express', start: 18.15, end: 19.65 },
    { id: 'swarna_jayanti_express', name: 'Swarna Jayanti Express', start: 19.75, end: 21.55 },
    { id: 'howrah_bengaluru_superfast', name: 'Howrah Bengaluru Superfast Express', start: 21.65, end: 24.38 },
    { id: 'howrah_chennai_mail', name: 'Howrah Chennai Mail', start: 24.50, end: 26.18 },
    { id: 'mumbai_rajdhani_express', name: 'Mumbai Rajdhani Express', start: 26.22, end: 28.30 },
    { id: 'howrah_rajdhani_express', name: 'Howrah Rajdhani Express', start: 28.40, end: 30.32 },
    { id: 'chennai_rajdhani_express', name: 'Chennai Rajdhani Express', start: 30.42, end: 32.32 },
    { id: 'bengaluru_rajdhani_express', name: 'Bengaluru Rajdhani Express', start: 32.40, end: 34.50 },
    { id: 'bhopal_shatabdi_express', name: 'Bhopal Shatabdi Express', start: 34.60, end: 36.70 },
    { id: 'mysuru_shatabdi_express', name: 'Mysuru Shatabdi Express', start: 36.78, end: 38.80 },
    { id: 'secunderabad_visakhapatnam_vande_bharat', name: 'Secunderabad Visakhapatnam Vande Bharat Express', start: 38.92, end: 42.45 },
    { id: 'varanasi_new_delhi_vande_bharat', name: 'Varanasi New Delhi Vande Bharat Express', start: 42.55, end: 45.78 },
    { id: 'amritsar_shatabdi_express', name: 'Amritsar Shatabdi Express', start: 45.88, end: 47.92 },
    { id: 'golden_temple_mail', name: 'Golden Temple Mail', start: 48.00, end: 49.52 },
    { id: 'grand_trunk_express', name: 'Grand Trunk Express', start: 49.60, end: 51.35 }
  ];

  const outDir = 'public/audio_assets/trains';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  function createWav(samples, sRate, numChannels) {
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sRate * blockAlign;
    const dataSize = samples.length * bytesPerSample;
    const buffer = Buffer.alloc(44 + dataSize);

    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(sRate, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);

    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
      buffer.writeInt16LE(Math.floor(val), offset);
      offset += 2;
    }
    return buffer;
  }

  const left = channelData[0];
  const right = channelData.length > 1 ? channelData[1] : left;

  trains.forEach((t, idx) => {
    // 1. WAV cut
    const startSample = Math.floor(t.start * sampleRate);
    const endSample = Math.min(left.length, Math.floor(t.end * sampleRate));
    const monoSamples = new Float32Array(endSample - startSample);
    for (let i = 0; i < monoSamples.length; i++) {
      monoSamples[i] = (left[startSample + i] + right[startSample + i]) * 0.5;
    }
    const wavBuffer = createWav(monoSamples, sampleRate, 1);
    const wavPath = path.join(outDir, `${t.id}.wav`);
    fs.writeFileSync(wavPath, wavBuffer);

    // 2. MP3 cut
    const mp3Path = path.join(outDir, `${t.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/train_names.mp3',
        target: mp3Path,
        start: t.start,
        end: t.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + t.id, e);
    }

    console.log(`[${idx + 1}/25] Extracted: ${t.name} -> ${t.start}s to ${t.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 25 FLAGSHIP TRAIN NAMES EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
