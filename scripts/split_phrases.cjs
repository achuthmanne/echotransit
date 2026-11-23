const fs = require('fs');
const path = require('path');

async function main() {
  const { MPEGDecoder } = await import('mpg123-decoder');
  const MP3Cutter = require('mp3-cutter');

  const decoder = new MPEGDecoder();
  await decoder.ready;
  const input = fs.readFileSync('public/audio_raw/phrases.mp3');
  const { channelData, sampleRate } = decoder.decode(input);

  const phrases = [
    { id: 'attention_please', name: 'May I have your attention please', start: 0.0, end: 1.95 },
    { id: 'train_number', name: 'Train number', start: 2.15, end: 3.25 },
    { id: 'from', name: 'from', start: 3.30, end: 3.98 },
    { id: 'to', name: 'to', start: 4.02, end: 4.62 },
    { id: 'via', name: 'via', start: 4.68, end: 5.48 },
    { id: 'bound_for', name: 'bound for', start: 5.52, end: 6.58 },
    { id: 'arriving_shortly_on_platform', name: 'is arriving shortly on platform number', start: 6.62, end: 9.48 },
    { id: 'has_arrived_on_platform', name: 'has arrived on platform number', start: 9.58, end: 11.82 },
    { id: 'ready_to_leave_platform', name: 'is ready to leave from platform number', start: 11.90, end: 14.52 },
    { id: 'running_on_right_time', name: 'is running on right time', start: 14.62, end: 16.45 },
    { id: 'running_late_by', name: 'is running late by', start: 16.62, end: 18.32 },
    { id: 'hours', name: 'hours', start: 18.35, end: 19.18 },
    { id: 'minutes', name: 'minutes', start: 19.25, end: 20.12 },
    { id: 'delayed_indefinitely', name: 'is delayed indefinitely', start: 20.30, end: 22.22 },
    { id: 'rescheduled_to_depart_at', name: 'has been rescheduled to depart at', start: 22.38, end: 24.82 },
    { id: 'will_now_arrive_on_platform', name: 'will now arrive on platform number', start: 24.92, end: 27.42 },
    { id: 'will_now_depart_from_platform', name: 'will now depart from platform number', start: 27.50, end: 29.92 },
    { id: 'has_been_cancelled', name: 'has been cancelled', start: 30.02, end: 31.45 },
    { id: 'partially_cancelled', name: 'has been partially cancelled', start: 31.55, end: 33.38 },
    { id: 'diverted_via', name: 'has been diverted via', start: 33.48, end: 35.30 },
    { id: 'terminates_here', name: 'terminates here', start: 35.38, end: 36.58 },
    { id: 'note_the_change', name: 'Passengers are requested to note the change', start: 36.75, end: 39.52 },
    { id: 'inconvenience_regretted', name: 'Inconvenience caused is deeply regretted', start: 39.62, end: 42.70 }
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
        src: 'public/audio_raw/phrases.mp3',
        target: mp3Path,
        start: p.start,
        end: p.end
      });
    } catch (e) {
      console.error('MP3 cut error for ' + p.id, e);
    }

    console.log(`[${idx + 1}/23] Extracted: "${p.name}" (${p.id}) -> ${p.start}s to ${p.end}s (WAV: ${wavBuffer.length} B)`);
  });

  console.log('\nSUCCESS: ALL 23 CORE RAILWAY PHRASES EXTRACTED CLEANLY!');
}

main().catch(err => console.error(err));
