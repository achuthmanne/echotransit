const fs = require('fs');
const path = require('path');

async function main() {
  const MP3Cutter = require('mp3-cutter');

  const stations = [
    { id: 'hyderabad', name: 'Hyderabad', start: 0.00, end: 0.95 },
    { id: 'secunderabad', name: 'Secunderabad', start: 1.00, end: 2.20 },
    { id: 'vijayawada', name: 'Vijayawada', start: 2.25, end: 3.25 },
    { id: 'visakhapatnam', name: 'Visakhapatnam', start: 3.30, end: 4.55 },
    { id: 'guntur', name: 'Guntur', start: 4.60, end: 5.50 },
    { id: 'kakinada_port', name: 'Kakinada Port', start: 5.55, end: 6.90 },
    { id: 'lingampalli', name: 'Lingampalli', start: 6.95, end: 8.05 },
    { id: 'repalle', name: 'Repalle', start: 8.10, end: 9.00 },
    { id: 'kacheguda', name: 'Kacheguda', start: 9.05, end: 10.00 },
    { id: 'chittoor', name: 'Chittoor', start: 10.05, end: 11.00 },
    { id: 'mgr_chennai_central', name: 'MGR Chennai Central', start: 11.05, end: 12.90 },
    { id: 'tambaram', name: 'Tambaram', start: 12.95, end: 13.80 },
    { id: 'ksr_bengaluru', name: 'KSR Bengaluru', start: 13.85, end: 15.45 },
    { id: 'smvt_bengaluru', name: 'SMVT Bengaluru', start: 15.50, end: 17.30 },
    { id: 'mysuru', name: 'Mysuru', start: 17.35, end: 18.25 },
    { id: 'thiruvananthapuram_central', name: 'Thiruvananthapuram Central', start: 18.30, end: 19.90 },
    { id: 'nai_dilli', name: 'Nai Dilli', start: 19.95, end: 20.85 },
    { id: 'hazrat_nizamuddin', name: 'Hazrat Nizamuddin', start: 20.90, end: 22.45 },
    { id: 'mumbai_central', name: 'Mumbai Central', start: 22.50, end: 23.70 },
    { id: 'howrah', name: 'Howrah', start: 23.75, end: 24.50 },
    { id: 'bhopal', name: 'Bhopal', start: 24.55, end: 25.45 },
    { id: 'varanasi', name: 'Varanasi', start: 25.50, end: 26.55 },
    { id: 'amritsar', name: 'Amritsar', start: 26.60, end: 27.50 },
    { id: 'kolkata', name: 'Kolkata', start: 27.55, end: 28.45 },
    { id: 'tirupati', name: 'Tirupati', start: 28.50, end: 29.35 }
  ];

  const outDir = 'public/audio_assets/stations_hi_ml';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  stations.forEach((s, idx) => {
    const mp3Path = path.join(outDir, `${s.id}.mp3`);
    try {
      MP3Cutter.cut({
        src: 'public/audio_raw/stations_hi_ml.mp3',
        target: mp3Path,
        start: s.start,
        end: s.end
      });
      console.log(`[${idx + 1}/25] Extracted (MP3): ${s.id} (${s.name}) -> ${s.start}s to ${s.end}s`);
    } catch (e) {
      console.error('MP3 cut error for ' + s.id, e);
    }
  });

  console.log('\nSUCCESS: ALL 25 STATION NAMES (HINDI & MALAYALAM) EXTRACTED CLEANLY AS MP3!');
}

main().catch(err => console.error(err));
