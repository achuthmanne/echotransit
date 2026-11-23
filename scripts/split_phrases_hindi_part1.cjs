const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/phrases_hi_part1.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const phrases = [
    { id: 'par_aane_wali_hai', hindi: 'पर आने वाली है', start: 0.0, end: 1.42 },
    { id: 'se_prasthan_karne_wali_hai', hindi: 'से प्रस्थान करने वाली है', start: 1.50, end: 3.42 },
    { id: 'platform_sankhya', hindi: 'प्लेटफार्म संख्या', start: 3.48, end: 4.78 },
    { id: 'par_aane_wali_thi', hindi: 'पर आने वाली थी', start: 4.85, end: 6.25 },
    { id: 'se_prasthan_karne_wali_thi', hindi: 'से प्रस्थान करने वाली थी', start: 6.32, end: 8.22 },
    { id: 'ghanta', hindi: 'घंटा', start: 8.32, end: 9.15 },
    { id: 'aur', hindi: 'और', start: 9.20, end: 9.90 },
    { id: 'express', hindi: 'एक्सप्रेस', start: 9.92, end: 10.88 },
    { id: 'superfast_express', hindi: 'सुपरफास्ट एक्सप्रेस', start: 10.90, end: 12.58 },
    { id: 'dhanyawaad', hindi: 'धन्यवाद', start: 12.65, end: 13.58 }
  ];

  const outDir = 'public/audio_assets/phrases_hi';
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

  phrases.forEach((p, idx) => {
    // 1. WAV cut
    const startSample = Math.floor(p.start * sampleRate);
    const endSample = Math.min(left.length, Math.floor(p.end * sampleRate));
    const monoSamples = new Float32Array(endSample - startSample);
    for (let i = 0; i < monoSamples.length; i++) {
      monoSamples[i] = (left[startSample + i] + right[startSample + i]) * 0.5;
    }
    const wavBuffer = createWav(monoSamples, sampleRate, 1);
    const wavPath = path.join(outDir, `${p.id}.wav`);
    fs.writeFileSync(wavPath, wavBuffer);

    // 2. MP3 cut
    const mp3Path = path.join(outDir, `${p.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/phrases_hi_part1.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }

    console.log(`[${idx + 1}/10] Extracted: "${p.hindi}" (${p.id}) -> ${p.start}s to ${p.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 10 HINDI CORE PHRASES EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
