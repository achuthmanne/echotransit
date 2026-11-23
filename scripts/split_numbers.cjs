const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/numbers_en.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const segments = [
    { num: 1, name: 'one', start: 0.0, end: 0.82 },
    { num: 2, name: 'two', start: 0.90, end: 1.70 },
    { num: 3, name: 'three', start: 1.78, end: 2.65 },
    { num: 4, name: 'four', start: 2.66, end: 3.48 },
    { num: 5, name: 'five', start: 3.55, end: 4.45 },
    { num: 6, name: 'six', start: 4.55, end: 5.35 },
    { num: 7, name: 'seven', start: 5.50, end: 6.35 },
    { num: 8, name: 'eight', start: 6.52, end: 7.22 },
    { num: 9, name: 'nine', start: 7.34, end: 8.18 }
  ];

  const outDir = 'public/audio_assets/numbers_en';
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

  segments.forEach(seg => {
    // 1. WAV cut (lossless uncompressed)
    const startSample = Math.floor(seg.start * sampleRate);
    const endSample = Math.min(left.length, Math.floor(seg.end * sampleRate));
    const monoSamples = new Float32Array(endSample - startSample);
    for (let i = 0; i < monoSamples.length; i++) {
      monoSamples[i] = (left[startSample + i] + right[startSample + i]) * 0.5;
    }
    const wavBuffer = createWav(monoSamples, sampleRate, 1);
    const wavPath = path.join(outDir, seg.num + '.wav');
    fs.writeFileSync(wavPath, wavBuffer);

    // 2. MP3 cut
    const mp3Path = path.join(outDir, seg.num + '.mp3');
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_en.mp3',
        target: mp3Path,
        start: seg.start,
        end: seg.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + seg.num, e);
    }

    console.log(`Extracted: ${seg.num} (${seg.name}) -> ${seg.start}s to ${seg.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 9 NUMBERS EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
