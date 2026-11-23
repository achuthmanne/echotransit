const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/numbers_hindi.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const numbers = [
    { num: 0, hindi: 'शून्य', start: 0.0, end: 0.85 },
    { num: 1, hindi: 'एक', start: 1.15, end: 1.85 },
    { num: 2, hindi: 'दो', start: 1.95, end: 2.65 },
    { num: 3, hindi: 'तीन', start: 2.85, end: 3.50 },
    { num: 4, hindi: 'चार', start: 3.65, end: 4.45 },
    { num: 5, hindi: 'पाँच', start: 4.55, end: 5.25 },
    { num: 6, hindi: 'छह', start: 5.35, end: 6.00 },
    { num: 7, hindi: 'सात', start: 6.15, end: 6.90 },
    { num: 8, hindi: 'आठ', start: 7.05, end: 7.75 },
    { num: 9, hindi: 'नौ', start: 7.82, end: 8.50 },
    { num: 10, hindi: 'दस', start: 8.56, end: 9.30 },
    { num: 11, hindi: 'ग्यारह', start: 9.50, end: 10.35 },
    { num: 12, hindi: 'बारह', start: 10.35, end: 11.20 },
    { num: 13, hindi: 'तेरह', start: 11.30, end: 12.00 },
    { num: 14, hindi: 'चौदह', start: 12.05, end: 12.95 },
    { num: 15, hindi: 'पंद्रह', start: 13.00, end: 13.75 },
    { num: 16, hindi: 'सोलह', start: 13.80, end: 14.70 },
    { num: 17, hindi: 'सत्रह', start: 14.72, end: 15.70 },
    { num: 18, hindi: 'अठारह', start: 15.80, end: 16.55 },
    { num: 19, hindi: 'उन्नीस', start: 16.70, end: 17.48 },
    { num: 20, hindi: 'बीस', start: 17.55, end: 18.25 },
    { num: 21, hindi: 'इक्कीस', start: 18.68, end: 19.24 },
    { num: 22, hindi: 'बाईस', start: 19.28, end: 20.08 },
    { num: 23, hindi: 'तेईस', start: 20.22, end: 20.95 },
    { num: 24, hindi: 'चौबीस', start: 21.02, end: 21.85 }
  ];

  const outDir = 'public/audio_assets/numbers_hi';
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

  numbers.forEach((n, idx) => {
    // 1. WAV cut
    const startSample = Math.floor(n.start * sampleRate);
    const endSample = Math.min(left.length, Math.floor(n.end * sampleRate));
    const monoSamples = new Float32Array(endSample - startSample);
    for (let i = 0; i < monoSamples.length; i++) {
      monoSamples[i] = (left[startSample + i] + right[startSample + i]) * 0.5;
    }
    const wavBuffer = createWav(monoSamples, sampleRate, 1);
    const wavPath = path.join(outDir, `${n.num}.wav`);
    fs.writeFileSync(wavPath, wavBuffer);

    // 2. MP3 cut
    const mp3Path = path.join(outDir, `${n.num}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/numbers_hindi.mp3',
        target: mp3Path,
        start: n.start,
        end: n.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + n.num, e);
    }

    console.log(`[${idx + 1}/25] Extracted: ${n.num} (${n.hindi}) -> ${n.start}s to ${n.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 25 HINDI NUMBERS (0 TO 24) EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
