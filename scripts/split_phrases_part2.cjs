const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/phrases_part2.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const phrases = [
    { id: 'scheduled_to_arrive_at', name: 'Scheduled to arrive at', start: 0.0, end: 1.65 },
    { id: 'scheduled_to_depart_at', name: 'Scheduled to depart at', start: 1.75, end: 3.42 },
    { id: 'scheduled_to_arrive_on_platform', name: 'Scheduled to arrive on platform number', start: 3.52, end: 6.02 },
    { id: 'scheduled_to_depart_from_platform', name: 'Scheduled to depart from platform number', start: 6.05, end: 8.58 },
    { id: 'hour', name: 'Hour', start: 8.62, end: 9.30 },
    { id: 'minute', name: 'Minute', start: 9.32, end: 10.08 },
    { id: 'and', name: 'and', start: 10.10, end: 10.78 },
    { id: 'express', name: 'Express', start: 10.82, end: 11.78 },
    { id: 'superfast_express', name: 'Superfast Express', start: 11.80, end: 13.40 },
    { id: 'thank_you', name: 'Thank you', start: 13.44, end: 14.24 }
  ];

  const outDir = 'public/audio_assets/phrases';
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
        src: 'public/audio_raw/phrases_part2.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }

    console.log(`[${idx + 1}/10] Extracted: "${p.name}" (${p.id}) -> ${p.start}s to ${p.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 10 SCHEDULING PHRASES EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
