const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/numbers_10_to_24.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const segments = [
    { num: 10, start: 0.0, end: 0.78 },
    { num: 11, start: 0.92, end: 1.82 },
    { num: 12, start: 1.94, end: 2.85 },
    { num: 13, start: 2.92, end: 3.90 },
    { num: 14, start: 3.98, end: 4.95 },
    { num: 15, start: 4.98, end: 5.90 },
    { num: 16, start: 5.98, end: 7.00 },
    { num: 17, start: 7.00, end: 8.05 },
    { num: 18, start: 8.10, end: 9.00 },
    { num: 19, start: 9.05, end: 10.05 },
    { num: 20, start: 10.10, end: 10.95 },
    { num: 21, start: 11.05, end: 12.08 },
    { num: 22, start: 12.10, end: 13.12 },
    { num: 23, start: 13.15, end: 14.20 },
    { num: 24, start: 14.25, end: 15.25 }
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
        src: 'public/audio_raw/numbers_10_to_24.mp3',
        target: mp3Path,
        start: seg.start,
        end: seg.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + seg.num, e);
    }

    console.log(`Extracted: ${seg.num} -> ${seg.start}s to ${seg.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL NUMBERS 10 TO 24 EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
