import React, { useEffect, useMemo, useRef, useState } from 'react';
import SoundWaveHero from './components/SoundWaveHero';
import DeepWaveSection from './components/DeepWaveSection';
import DialogueShowcaseSection from './components/DialogueShowcaseSection';

// Custom Dual-Tone Hand-Crafted Icons with Crimson Red Accents
function IconVolumeX() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#1e293b" strokeWidth="1.75" />
      <line x1="22" y1="9" x2="16" y2="15" stroke="#ef4444" strokeWidth="2.2" />
      <line x1="16" y1="9" x2="22" y2="15" stroke="#ef4444" strokeWidth="2.2" />
    </svg>
  );
}

function IconPlatformShift() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m15 3 5 4-5 4" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M20 17H4" stroke="#ef4444" strokeWidth="2.2" />
      <path d="m9 13-5 4 5 4" stroke="#ef4444" strokeWidth="2.2" />
    </svg>
  );
}

function IconEarOff() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1" stroke="#1e293b" strokeWidth="1.75" />
      <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.2" />
    </svg>
  );
}

function IconLanguages() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h12" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M7 2h1" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m5 8 6 6" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m4 14 6-6 2-3" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m22 22-5-10-5 10" stroke="#ef4444" strokeWidth="2.2" />
      <path d="M14 18h6" stroke="#ef4444" strokeWidth="2.2" />
    </svg>
  );
}

// Custom Dual-Tone Solution Icons with Emerald Green Accents (#10b981)
function IconVolumeSync() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#10b981" strokeWidth="2.2" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#10b981" strokeWidth="2.2" />
    </svg>
  );
}

function IconPlatformSync() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m15 3 5 4-5 4" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M4 17h16" stroke="#10b981" strokeWidth="2.2" />
      <path d="m15 13 5 4-5 4" stroke="#10b981" strokeWidth="2.2" />
    </svg>
  );
}

function IconEarSync() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M19 6c2 2 2 5 0 7" stroke="#10b981" strokeWidth="2.2" />
      <path d="M22 3.5c3.5 3.5 3.5 9 0 12" stroke="#10b981" strokeWidth="2.2" />
    </svg>
  );
}

function IconLanguagesSync() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h12" stroke="#1e293b" strokeWidth="1.75" />
      <path d="M7 2h1" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m5 8 6 6" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m4 14 6-6 2-3" stroke="#1e293b" strokeWidth="1.75" />
      <path d="m22 22-5-10-5 10" stroke="#10b981" strokeWidth="2.2" />
      <path d="M14 18h6" stroke="#10b981" strokeWidth="2.2" />
    </svg>
  );
}

const WAVEFORM_BASE = [
  24, 38, 55, 78, 92, 68, 42, 28, 48, 70, 88, 62, 35, 20, 32, 58, 
  82, 95, 75, 48, 65, 86, 100, 78, 52, 34, 46, 68, 89, 72, 45, 26, 
  38, 64, 84, 96, 74, 50, 32, 44, 66, 85, 70, 48, 36, 28, 20, 16
];

const TRANSIT_MODES = [
  { id: 'metro', label: 'Metro' },
  { id: 'rail', label: 'Rail' },
  { id: 'bus', label: 'Bus' },
  { id: 'flight', label: 'Flight' }
];

const TRANSIT_DATA = {
  metro: {
    name: "Metro Rapid Transit",
    legacyLabel: "Legacy Metro Station CRT & Horns",
    terminal: "Ameerpet Interchange - Platform 1",
    announcements: {
      english: {
        headline: "Metro train towards Raidurg is arriving on Platform 1. Please stand behind the yellow line and let passengers deboard first.",
        subtext: "Platform 1 • Hyderabad Metro Rail",
        totalDuration: 9.8,
        defaultTime: "00:00 / 00:10",
        platform: "1",
        fontClass: "font-inter"
      },
      telugu: {
        headline: "రాయదుర్గం వైపు వెళ్లే మెట్రో రైలు ప్లాట్‌ఫారమ్ 1 పైకి చేరుకుంటోంది. ప్రయాణికులు దయచేసి పసుపు గీత వెనుక వేచి ఉండండి.",
        subtext: "ప్లాట్‌ఫారమ్ 1 • హైదరాబాద్ మెట్రో రైల్",
        totalDuration: 10.4,
        defaultTime: "00:00 / 00:10",
        platform: "1",
        fontClass: "font-telugu"
      },
      hindi: {
        headline: "रायदुर्ग की ओर जाने वाली मेट्रो ट्रेन प्लेटफार्म 1 पर आ रही है। कृपया पीली रेखा के पीछे खड़े रहें।",
        subtext: "प्लेटफार्म 1 • हैदराबाद मेट्रो रेल",
        totalDuration: 9.5,
        defaultTime: "00:00 / 00:10",
        platform: "1",
        fontClass: "font-hindi"
      }
    },
    board: {
      title: "Platform Departures",
      subtitle: "Ameerpet Interchange Station",
      cols: ["Line / Destination", "ETA", "Platform"],
      items: [
        { no: "Blue Line", name: "Towards Raidurg (Hi-Tec)", time: "1 min", status: "Approaching", badge: "PF 1", key: "active" },
        { no: "Red Line", name: "Towards LB Nagar", time: "3 min", status: "On Time", badge: "PF 2", key: "m1" },
        { no: "Blue Line", name: "Towards Nagole", time: "6 min", status: "On Time", badge: "PF 3", key: "m2" },
        { no: "Red Line", name: "Towards Miyapur", time: "8 min", status: "Scheduled", badge: "PF 2", key: "m3" },
        { no: "Green Line", name: "Towards MGBS Central", time: "11 min", status: "Scheduled", badge: "PF 4", key: "m4" }
      ]
    }
  },

  rail: {
    name: "Rail Transit",
    legacyLabel: "Legacy Station Horns & LED Display Board",
    terminal: "Secunderabad Jn - Platform 2",
    announcements: {
      english: {
        headline: "Train number 1 7 6 4 6, Repalle Secunderabad Express, will arrive shortly on platform number 2.",
        subtext: "Platform 2 • Secunderabad Junction",
        totalDuration: 11.16,
        defaultTime: "00:00 / 00:11",
        platform: "2",
        fontClass: "font-inter"
      },
      telugu: {
        headline: "రైలు నంబర్ 1 7 6 4 5, సికింద్రాబాద్ - రేపల్లె ఎక్స్ప్రెస్, మరికొద్ది నిమిషములలో ఒకటోవ నంబరు ప్లాట్ఫామ్నకు రానున్నది.",
        subtext: "ప్లాట్‌ఫారమ్ 1 • సికింద్రాబాద్ జంక్షన్",
        totalDuration: 10.8,
        defaultTime: "00:00 / 00:11",
        platform: "1",
        fontClass: "font-telugu"
      },
      hindi: {
        headline: "यात्री कृपया ध्यान दें, गाड़ी क्रमांक 1 2 8 0 4, सुपरफास्ट स्वर्ण जयंती एक्सप्रेस, थोड़ी ही देर में प्लेटफार्म क्रमांक तीन पर आ रही है।",
        subtext: "प्लेटफार्म 3 • सिकंदराबाद जंक्शन",
        totalDuration: 15.1,
        defaultTime: "00:00 / 00:15",
        platform: "3",
        fontClass: "font-hindi"
      }
    },
    board: {
      title: "Station Board",
      subtitle: "Secunderabad Junction",
      cols: ["Train", "Time", "Platform"],
      items: [
        { no: "17646", name: "Repalle - Secunderabad Exp.", time: "03:30", status: "Arriving", badge: "PF 2", key: "english" },
        { no: "17645", name: "Secunderabad - Repalle Exp.", time: "04:15", status: "Arriving", badge: "PF 1", key: "telugu" },
        { no: "12804", name: "Swarna Jayanti SF Exp.", time: "05:20", status: "Arriving", badge: "PF 3", key: "hindi" },
        { no: "12760", name: "Charminar Express", time: "06:00", status: "On Time", badge: "PF 4", key: "other1" },
        { no: "12723", name: "Telangana Express", time: "07:15", status: "Scheduled", badge: "PF 5", key: "other2" }
      ]
    }
  },

  bus: {
    name: "Smart Bus Transit",
    legacyLabel: "Legacy Bus Depot Horns & Chalkboard",
    terminal: "MGBS Central Bus Station - Bay 12",
    announcements: {
      english: {
        headline: "Garuda Plus AC Express to Bengaluru scheduled at 10:30 is now boarding at Bay 12. Passengers please have your tickets ready.",
        subtext: "Bay 12 • MGBS Central Intercity Terminal",
        totalDuration: 10.2,
        defaultTime: "00:00 / 00:10",
        platform: "12",
        fontClass: "font-inter"
      },
      telugu: {
        headline: "ఉదయం 10:30 గంటలకు బెంగళూరు వెళ్ళే గరుడ ప్లస్ ఎక్స్‌ప్రెస్ బస్సు బే నెంబరు 12 వద్ద సిద్ధంగా ఉంది. ప్రయాణికులు ఎక్కవచ్చును.",
        subtext: "బే 12 • మహాత్మా గాంధీ బస్ స్టేషన్ (MGBS)",
        totalDuration: 11.0,
        defaultTime: "00:00 / 00:11",
        platform: "12",
        fontClass: "font-telugu"
      },
      hindi: {
        headline: "सुबह 10:30 बजे बेंगलुरु जाने वाली गरुड़ प्लस एसी एक्सप्रेस प्लेटफॉर्म/बे 12 पर तैयार है। कृपया टिकट तैयार रखें।",
        subtext: "बे 12 • एमजीबीएस सेंट्रल बस स्टेशन",
        totalDuration: 10.5,
        defaultTime: "00:00 / 00:11",
        platform: "12",
        fontClass: "font-hindi"
      }
    },
    board: {
      title: "Intercity Bay Schedule",
      subtitle: "MGBS Central Bus Terminal",
      cols: ["Service / Route", "Time", "Bay"],
      items: [
        { no: "TS-09-Z-4412", name: "Garuda Plus • Bengaluru (KBS)", time: "10:30", status: "Boarding", badge: "Bay 12", key: "active" },
        { no: "TS-07-Z-8819", name: "Rajadhani AC • Vijayawada", time: "10:50", status: "On Time", badge: "Bay 06", key: "b1" },
        { no: "KA-01-F-9921", name: "Airavat Club • Mysuru", time: "11:15", status: "Scheduled", badge: "Bay 14", key: "b2" },
        { no: "TS-10-Z-3301", name: "Super Luxury • Warangal", time: "11:30", status: "On Time", badge: "Bay 03", key: "b3" },
        { no: "AP-29-Z-1055", name: "Ultra Deluxe • Tirupati", time: "12:00", status: "Scheduled", badge: "Bay 09", key: "b4" }
      ]
    }
  },

  flight: {
    name: "Airport Aviation",
    legacyLabel: "Legacy Airport Gate PA & Split-Flap Display",
    terminal: "RGIA Hyderabad - Gate 14B",
    announcements: {
      english: {
        headline: "This is the final boarding call for IndiGo flight 6E 2154 to Dubai (DXB). All passengers please proceed to Gate 14B immediately.",
        subtext: "Gate 14B • Rajiv Gandhi International Airport",
        totalDuration: 10.5,
        defaultTime: "00:00 / 00:11",
        platform: "14B",
        fontClass: "font-inter"
      },
      telugu: {
        headline: "హైదరాబాద్ నుండి దుబాయ్ వెళ్ళే ఇండిగో విమానం 6E 2154 కి ఇది ఆఖరి బోర్డింగ్ పిలుపు. ప్రయాణికులు వెంటనే గేట్ 14B వద్దకు చేరుకోండి.",
        subtext: "గేట్ 14B • రాజీవ్ గాంధీ అంతర్జాతీయ విమానాశ్రయం",
        totalDuration: 11.2,
        defaultTime: "00:00 / 00:11",
        platform: "14B",
        fontClass: "font-telugu"
      },
      hindi: {
        headline: "इंडिगो की उड़ान 6E 2154, हैदराबाद से दुबई के लिए अंतिम बोर्डिंग कॉल। सभी यात्री तुरंत गेट 14B पर पहुंचे।",
        subtext: "गेट 14B • राजीव गांधी अंतर्राष्ट्रीय हवाई अड्डा",
        totalDuration: 10.8,
        defaultTime: "00:00 / 00:11",
        platform: "14B",
        fontClass: "font-hindi"
      }
    },
    board: {
      title: "Flight Gate Board",
      subtitle: "Hyderabad RGIA Terminal 1",
      cols: ["Flight", "Time", "Gate"],
      items: [
        { no: "6E 2154", name: "Dubai (DXB) • IndiGo", time: "10:15", status: "Final Call", badge: "Gate 14B", key: "active" },
        { no: "AI 840", name: "Delhi (DEL) • Air India", time: "10:45", status: "Boarding", badge: "Gate 08A", key: "f1" },
        { no: "EK 527", name: "Dubai (DXB) • Emirates", time: "11:20", status: "On Time", badge: "Gate 12", key: "f2" },
        { no: "QP 1302", name: "Mumbai (BOM) • Akasa Air", time: "11:40", status: "Scheduled", badge: "Gate 04", key: "f3" },
        { no: "6E 6128", name: "Bengaluru (BLR) • IndiGo", time: "12:05", status: "Scheduled", badge: "Gate 06B", key: "f4" }
      ]
    }
  }
};

export default function App() {
  const [bentoVisible, setBentoVisible] = useState(false);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [transitMode, setTransitMode] = useState('rail');
  const [phoneLang, setPhoneLang] = useState('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState({ current: 0, total: 0 });
  const bentoRef = useRef(null);
  const solutionRef = useRef(null);
  const audioRef = useRef(null);
  const animFrameRef = useRef(null);

  const currentTransit = TRANSIT_DATA[transitMode];
  const activeAnnouncement = currentTransit.announcements[phoneLang];

  const sortedBoardItems = useMemo(() => {
    return [...currentTransit.board.items].sort((a, b) => {
      if (transitMode === 'rail') {
        if (a.key === phoneLang) return -1;
        if (b.key === phoneLang) return 1;
        return 0;
      }
      if (a.key === 'active') return -1;
      if (b.key === 'active') return 1;
      return 0;
    });
  }, [transitMode, phoneLang, currentTransit]);

  const formatAudioTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const totalSec = Math.round(sec);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startAnimLoop = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const loop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setAudioProgress({
          current: audioRef.current.currentTime,
          total: audioRef.current.duration || activeAnnouncement.totalDuration
        });
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };
    animFrameRef.current = requestAnimationFrame(loop);
  };

  const stopAnimLoop = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  // Multi-Modal Transit Chime Synthesizer (Rail, Flight, Metro, Bus)
  const playTransitChime = (mode, onComplete) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        if (onComplete) onComplete();
        return;
      }
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      let chimeNotes = [];
      let totalWait = 920;

      if (mode === 'flight') {
        // Iconic Airport Gate Two-Tone Chime: F5 (698.46) -> C5 (523.25)
        chimeNotes = [
          { freq: 698.46, start: 0.0, dur: 0.35 },
          { freq: 523.25, start: 0.34, dur: 0.55 }
        ];
        totalWait = 950;
      } else if (mode === 'metro') {
        // High-Pitched Sleek Metro Departure Beep: E5 (659.25) -> B5 (987.77)
        chimeNotes = [
          { freq: 659.25, start: 0.0, dur: 0.20 },
          { freq: 987.77, start: 0.22, dur: 0.35 }
        ];
        totalWait = 650;
      } else if (mode === 'bus') {
        // Classic Intercity Bus Terminal Bell: G4 (392.00) -> D5 (587.33)
        chimeNotes = [
          { freq: 392.00, start: 0.0, dur: 0.24 },
          { freq: 587.33, start: 0.26, dur: 0.42 }
        ];
        totalWait = 800;
      } else {
        // Authentic Indian Railway 3-Tone Chime: C5 (523.25) -> E5 (659.25) -> G5 (783.99)
        chimeNotes = [
          { freq: 523.25, start: 0.0, dur: 0.22 },
          { freq: 659.25, start: 0.24, dur: 0.22 },
          { freq: 783.99, start: 0.48, dur: 0.42 }
        ];
        totalWait = 920;
      }

      chimeNotes.forEach(({ freq, start, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      });

      setTimeout(() => {
        if (onComplete) onComplete();
      }, totalWait);
    } catch {
      if (onComplete) onComplete();
    }
  };

  const stopAudio = () => {
    stopAnimLoop();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setAudioProgress({ current: 0, total: 0 });
  };

  const playTransitFallback = () => {
    playTransitChime(transitMode, () => {
      if (!('speechSynthesis' in window)) {
        setTimeout(() => {
          setIsPlaying(false);
          setAudioProgress({ current: 0, total: 0 });
        }, 4000);
        return;
      }

      window.speechSynthesis.cancel();
      const text = activeAnnouncement.headline;
      const utterance = new SpeechSynthesisUtterance(text);

      if (phoneLang === 'telugu') {
        utterance.lang = 'te-IN';
      } else if (phoneLang === 'hindi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      const voices = window.speechSynthesis.getVoices();
      const langPrefix = utterance.lang.slice(0, 2).toLowerCase();
      const matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      if (matched) {
        utterance.voice = matched;
      }

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const startTime = Date.now();
      const totalDur = activeAnnouncement.totalDuration || 10;
      setAudioProgress({ current: 0, total: totalDur });

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const synthLoop = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed < totalDur) {
          setAudioProgress({ current: elapsed, total: totalDur });
          animFrameRef.current = requestAnimationFrame(synthLoop);
        }
      };
      animFrameRef.current = requestAnimationFrame(synthLoop);

      utterance.onend = () => {
        stopAnimLoop();
        setIsPlaying(false);
        setAudioProgress({ current: 0, total: 0 });
      };

      utterance.onerror = () => {
        stopAnimLoop();
        setIsPlaying(false);
        setAudioProgress({ current: 0, total: 0 });
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    stopAudio();

    if (transitMode === 'rail') {
      const audioFile = `/audio/announcement-${phoneLang}.mp3`;
      const audio = new Audio(audioFile);
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        setAudioProgress({ current: 0, total: audio.duration || activeAnnouncement.totalDuration });
      };

      audio.onended = () => {
        stopAnimLoop();
        setIsPlaying(false);
        setAudioProgress({ current: 0, total: 0 });
      };

      audio.onerror = () => {
        stopAnimLoop();
        playTransitFallback();
      };

      setIsPlaying(true);
      audio.play().then(() => {
        startAnimLoop();
      }).catch(() => {
        stopAnimLoop();
        playTransitFallback();
      });
    } else {
      setIsPlaying(true);
      playTransitFallback();
    }
  };

  const handleModeChange = (mode) => {
    stopAudio();
    setTransitMode(mode);
  };

  const handleLangChange = (lang) => {
    stopAudio();
    setPhoneLang(lang);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === bentoRef.current) {
            if (entry.isIntersecting) {
              setBentoVisible(true);
            } else if (entry.boundingClientRect.top > 0) {
              setBentoVisible(false);
            }
          } else if (entry.target === solutionRef.current) {
            if (entry.isIntersecting) {
              setSolutionVisible(true);
            } else if (entry.boundingClientRect.top > 0) {
              setSolutionVisible(false);
            }
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (bentoRef.current) observer.observe(bentoRef.current);
    if (solutionRef.current) observer.observe(solutionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* ENTERPRISE SAAS NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 px-8 sm:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="EchoTransit" 
            className="h-12 sm:h-14 w-auto object-contain select-none"
          />
        </div>

        {/* Right: Direct Enterprise Action in Pure Solid Black */}
        <div className="flex items-center">
          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors">
            Open Console
          </button>
        </div>

      </header>

      {/* HERO SECTION */}
      <section className="relative w-full">
        <SoundWaveHero>
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Title: Flagship Typography in 2 Lines */}
            <h1 className="text-3xl sm:text-5xl md:text-[3.15rem] lg:text-[3.65rem] font-extrabold text-white tracking-tight leading-[1.12] text-center">
              <span className="block whitespace-nowrap">Unified Real-Time Announcements</span>
              <span className="block mt-1 sm:mt-1.5">for Stations, Terminals & Airports.</span>
            </h1>

            {/* Subtitle: High-clarity Silver-White */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-lg lg:text-xl font-normal text-slate-300 max-w-2xl sm:max-w-3xl leading-relaxed [text-wrap:balance]">
              Broadcast studio-grade PA audio across terminals while pushing instant, localized voice and vibration alerts directly to passenger phones — with zero app installs.
            </p>

            {/* HERO CTA BUTTONS */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black text-sm sm:text-base font-bold tracking-tight hover:bg-slate-100 transition-all active:scale-[0.98] select-none shadow-sm">
                Explore Modes
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm sm:text-base font-semibold tracking-tight transition-all active:scale-[0.98] select-none">
                View Architecture
              </button>
            </div>

          </div>
        </SoundWaveHero>
      </section>

      {/* SECTION 2: THE PROBLEM (Reversed Offsets with Wider Equal Cards) */}
      <section className="w-full bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 px-6 sm:px-12 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Question Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] [text-wrap:balance] max-w-4xl">
            Why are public transit announcements still failing passengers?
          </h2>

          {/* ASYMMETRIC BENTO GRID (FULL-WIDTH 12-COLUMN) */}
          <div ref={bentoRef} className="w-full mt-14 sm:mt-20 space-y-6 text-left">
            
            {/* ROW 1: 7-Col (60%) + 5-Col (40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              
              {/* Card 1 (Loudspeaker Noise: 7 Cols) */}
              <div 
                className={`lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  bentoVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconVolumeX />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Loudspeaker announcements get lost in terminal noise.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Crowded railway platforms, bus stands, and airport concourses operate under constant engine roar, crowd chatter, and ceiling echoes. Passengers wearing headphones, waiting in lounges, or sitting far from speakers regularly miss vital boarding calls and delays.
                  </p>
                </div>
              </div>

              {/* Card 2 (Platform Shift: 5 Cols) */}
              <div 
                className={`lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  bentoVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconPlatformShift />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Sudden platform & gate shifts trigger crowd confusion.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Last-minute platform changes announced over crackling mics create immediate chaos. Thousands of passengers rush across narrow foot-overbridges simultaneously, causing dangerous bottlenecks and missed connections.
                  </p>
                </div>
              </div>

            </div>

            {/* ROW 2: 5-Col (40%) + 7-Col (60%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">

              {/* Card 3 (Accessibility: 5 Cols) */}
              <div 
                className={`lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  bentoVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '850ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconEarOff />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Audio-only systems completely exclude deaf passengers.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Traditional loudspeakers rely 100% on auditory hearing. Millions of deaf, hard-of-hearing, and elderly travelers have zero real-time awareness when a train platform changes or an emergency delay is broadcast.
                  </p>
                </div>
              </div>

              {/* Card 4 (Language Barriers: 7 Cols) */}
              <div 
                className={`lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  bentoVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '850ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconLanguages />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Language barriers leave multi-regional travelers stranded.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Non-local travelers navigating regional transport hubs struggle to comprehend fast, heavily-accented audio over distorted speakers — creating anxiety, confusion, and wrong boardings.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: THE SOLUTION (Continuous Same BG, Zero Divider Lines) */}
      <section className="w-full bg-white pt-16 pb-24 sm:pt-24 sm:pb-32 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Solution Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] [text-wrap:balance] max-w-4xl">
            We built the fix. Here is how EchoTransit solves every single one!
          </h2>

          {/* ASYMMETRIC BENTO GRID (FULL-WIDTH 12-COLUMN) */}
          <div ref={solutionRef} className="w-full mt-14 sm:mt-20 space-y-6 text-left">
            
            {/* ROW 1: 5-Col (40% Small) + 7-Col (60% Large) - REVERSED to Problem Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
              
              {/* Solution Card 1 (Studio Audio & Dual Broadcast: 5 Cols) */}
              <div 
                className={`lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  solutionVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconVolumeSync />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Dual-pipeline studio audio cuts through terminal roar.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Edge-TTS neural voice synthesis combined with harmonic multi-tone chimes cuts through the loudest terminal noise. Simultaneously, passengers stream synchronized crystal-clear audio directly on their phones via WebSockets.
                  </p>
                </div>
              </div>

              {/* Solution Card 2 (Platform Sync: 7 Cols) */}
              <div 
                className={`lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  solutionVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconPlatformSync />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Instant synchronized dispatch eliminates platform chaos.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    A single station controller click updates terminal display boards, triggers localized audio, and pushes instant push banners to passenger screens in under 100 milliseconds — preventing dangerous crowd surges.
                  </p>
                </div>
              </div>

            </div>

            {/* ROW 2: 7-Col (60% Large) + 5-Col (40% Small) - REVERSED to Problem Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">

              {/* Solution Card 3 (Haptic & Visual Inclusion: 7 Cols) */}
              <div 
                className={`lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  solutionVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '850ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconEarSync />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Haptic vibration and visual cards include every traveler.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Deaf and hard-of-hearing passengers receive real-time visual alert modals and distinct device vibration pulses for platform shifts and boarding alerts — achieving true, 100% accessible transit.
                  </p>
                </div>
              </div>

              {/* Solution Card 4 (Multi-Lingual Translation: 5 Cols) */}
              <div 
                className={`lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-start ${
                  solutionVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '850ms' }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-6 shadow-sm">
                    <IconLanguagesSync />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] sm:min-h-[4.25rem] flex items-start">
                    Instant multi-lingual translation delivers native clarity.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                    Broadcast payloads automatically render in the passenger's preferred regional language — Telugu, Hindi, or English. Travelers read and listen in their native tongue with zero confusion, regardless of which terminal they are in.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FLAGSHIP DEEP WAVE SECTION (Black Canvas with Parametric Magenta-Red Wave) */}
      <DeepWaveSection />

      {/* SECTION 5: THE OPERATING ARCHITECTURE */}
      <section className="w-full bg-white py-24 sm:py-32 px-6 sm:px-12 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Main Title Only */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] [text-wrap:balance] max-w-4xl text-center">
            From single dispatch to synchronized reality.
          </h2>

          {/* 3-Column Clean Flow (No Boxes, No Image BG, Just Icon on Top & Matter Below) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full mt-20 sm:mt-24 max-w-7xl px-4 sm:px-8 text-left items-stretch">

            {/* STEP 1: CONTROLLER */}
            <div className="relative flex flex-col">
              {/* Clean Icon (Zero background container) */}
              <div className="h-44 sm:h-52 flex items-center justify-center mb-8 sm:mb-10">
                <img 
                  src="/step1-controller.png" 
                  alt="Controller Console" 
                  className="h-36 sm:h-40 w-auto object-contain"
                />
              </div>

              {/* Title (Locked Baseline) */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] min-h-[3.5rem] sm:min-h-[4rem] flex items-start">
                Controller triggers one-click broadcast.
              </h3>

              {/* Matter (Calibrated 154 Chars for Exact Line Unity) */}
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Station controller selects the route and platform on the cloud console. In under 100 milliseconds, neural synthesis compiles synchronized audio and data.
              </p>

              {/* Vertical Divider (Between Step 1 & Step 2) */}
              <div 
                className="hidden md:block absolute -right-6 md:-right-8 lg:-right-10 xl:-right-12 top-1/2 -translate-y-1/2 w-px h-48 lg:h-56 bg-slate-300" 
                aria-hidden="true" 
              />
            </div>

            {/* STEP 2: TERMINAL QR */}
            <div className="relative flex flex-col">
              {/* Clean Icon (Zero background container) */}
              <div className="h-44 sm:h-52 flex items-center justify-center mb-8 sm:mb-10">
                <img 
                  src="/step2-scan.png" 
                  alt="Terminal QR Scanner" 
                  className="h-36 sm:h-40 w-auto object-contain"
                />
              </div>

              {/* Title (Locked Baseline) */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] min-h-[3.5rem] sm:min-h-[4rem] flex items-start">
                Terminals display instant dynamic QR.
              </h3>

              {/* Matter (Calibrated 153 Chars for Exact Line Unity) */}
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Dynamic QR codes sync across platform LED boards and station pillars. Travelers scan with their default phone camera with zero app downloads or signups.
              </p>

              {/* Vertical Divider (Between Step 2 & Step 3) */}
              <div 
                className="hidden md:block absolute -right-6 md:-right-8 lg:-right-10 xl:-right-12 top-1/2 -translate-y-1/2 w-px h-48 lg:h-56 bg-slate-300" 
                aria-hidden="true" 
              />
            </div>

            {/* STEP 3: PASSENGER RECEPTION */}
            <div className="relative flex flex-col">
              {/* Clean Icon (Zero background container) */}
              <div className="h-44 sm:h-52 flex items-center justify-center mb-8 sm:mb-10">
                <img 
                  src="/step3-receive.png" 
                  alt="Passenger Pocket Reception" 
                  className="h-36 sm:h-40 w-auto object-contain"
                />
              </div>

              {/* Title (Locked Baseline) */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug [text-wrap:balance] min-h-[3.5rem] sm:min-h-[4rem] flex items-start">
                Passengers listen in their native voice.
              </h3>

              {/* Matter (Calibrated 153 Chars for Exact Line Unity) */}
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Travelers stream studio audio in their chosen native language live. Directional haptics and real-time captions ensure nobody misses their departure call.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: PRODUCT DIALOGUE & WIREFRAME MESH SHOWCASE */}
      <DialogueShowcaseSection />

      {/* SECTION 7: HARDWARE TO SOFTWARE TRANSFORMATION */}
      <section className="w-full bg-white py-24 sm:py-32 px-6 sm:px-12 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Main Title Only (No Subtitle, Covers All 4 Modes) */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] [text-wrap:balance] max-w-4xl text-center">
            Transforming transit hardware into pocket software.
          </h2>

          {/* MULTI-MODAL PILL SWITCHER: Metro, Rail, Bus, Flight (Pure Typography, Zero Emojis) */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] gap-1">
              {TRANSIT_MODES.map((mode) => {
                const isActive = transitMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleModeChange(mode.id)}
                    className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-[13px] tracking-tight transition-all duration-200 select-none cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/70 font-medium'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side: Only the Two Physical Images on the Left Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center mt-20 sm:mt-24 max-w-7xl w-full">

            {/* Left Side: Attached Legacy Hardware Unit (fine_neg_80_front) */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
              
              {/* Suspended Hardware Assembly (Speakers & Board Integrated with Red Cross Strike-Through) */}
              <div className="relative w-full flex justify-center lg:justify-start items-center">
                <img 
                  src="/fine_neg_80_front.png" 
                  alt="Legacy Station Hardware Unit" 
                  className="w-full h-auto object-contain block"
                />

                {/* Natural Organic Red Cross Strike-Through (Clean, No Glow, Balanced Size) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img 
                    src="/natural_cross.png" 
                    alt="Legacy Hardware Decommissioned" 
                    className="w-[48%] sm:w-[50%] h-auto max-w-[220px] select-none -rotate-1 transition-transform duration-300"
                  />
                </div>
              </div>

            </div>

            {/* Right Side: Realistic Phone Mockup with High-End SaaS Acoustic UI (Shifted Towards Right End) */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
              
              {/* Realistic Smartphone Chassis (Right-End Anchored on Desktop) */}
              <div className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto lg:ml-auto lg:mr-2 xl:mr-6 rounded-[52px] p-[11px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
                
                {/* Physical Hardware Buttons */}
                <div className="absolute -left-[3px] top-28 w-[3px] h-9 bg-zinc-600 rounded-l-sm" />
                <div className="absolute -left-[3px] top-40 w-[3px] h-9 bg-zinc-600 rounded-l-sm" />
                <div className="absolute -right-[3px] top-32 w-[3px] h-12 bg-zinc-600 rounded-r-sm" />

                {/* Inner Screen Surface (With Smooth Native Mobile Scrolling) */}
                <div className="rounded-[42px] bg-[#0A0D14] text-slate-100 overflow-hidden border border-white/[0.08] h-[610px] max-h-[610px] font-inter select-none flex flex-col relative">
                  
                  {/* Fixed Top Status Bar & Dynamic Island */}
                  <div className="px-5 pt-3.5 pb-2 shrink-0 bg-[#0A0D14]/95 backdrop-blur-md z-20 border-b border-white/[0.04]">
                    <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 px-1">
                      <span className="font-semibold text-zinc-300">09:41</span>
                      {/* Dynamic Island */}
                      <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center border border-white/[0.08]">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700/60" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-inter font-semibold text-zinc-400">5G</span>
                        <div className="w-4 h-2 border border-zinc-400 rounded-sm p-0.5 flex items-center">
                          <div className="w-full h-full bg-zinc-300 rounded-[1px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Screen Body (Smooth Mobile Scroll) */}
                  <div className="flex-1 overflow-y-auto px-5 py-3 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* 1. TOP ANNOUNCEMENT DISPLAY */}
                    <div className="text-center flex flex-col items-center w-full">
                      <div className="text-xs font-semibold text-zinc-300 font-inter tracking-tight h-5 flex items-center">
                        {currentTransit.terminal}
                      </div>
                      <div className="mt-2 px-4 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 h-[122px] max-h-[122px] flex flex-col justify-center w-full overflow-hidden shrink-0">
                        <p className={`text-[13px] sm:text-[13.5px] font-semibold text-white tracking-normal leading-[1.38] transition-opacity duration-150 line-clamp-4 ${activeAnnouncement.fontClass}`}>
                          {activeAnnouncement.headline}
                        </p>
                        <p className={`text-[11px] text-zinc-400 mt-1.5 font-normal tracking-tight transition-opacity duration-150 truncate ${activeAnnouncement.fontClass}`}>
                          {activeAnnouncement.subtext}
                        </p>
                      </div>
                    </div>

                    {/* 2. BLUE & ORANGE BLENDED PLAYLIST AUDIO WAVES + 3. PLAY CONTROLS + 4. LANGUAGES */}
                    <div className="w-full flex flex-col gap-3 shrink-0">
                      
                      {/* Dynamic Soundwave Visualizer Card (Blue & Orange Blended) */}
                      <div className="w-full rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-3 sm:p-3.5 flex flex-col gap-2.5">
                        
                        {/* Equalizer Waveform Needle Strings (SaaS High-Definition Acoustic Waveform) */}
                        <div className="relative w-full h-14 flex items-center justify-between px-1 overflow-hidden">
                          {/* Symmetrical Equilibrium Center Guideline */}
                          <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-800/40 pointer-events-none" />

                          {WAVEFORM_BASE.map((baseHeight, idx) => {
                            const totalBars = WAVEFORM_BASE.length;
                            const barProgress = idx / (totalBars - 1);
                            const totalDuration = activeAnnouncement.totalDuration || 11;
                            const playbackRatio = totalDuration > 0 ? (audioProgress.current / totalDuration) : 0;
                            const isPlayed = isPlaying ? barProgress <= playbackRatio : false;
                            const isCurrentPlayhead = isPlaying && Math.abs(barProgress - playbackRatio) < (1.6 / totalBars);

                            // Symmetrical TOP-BOTTOM dynamic acoustic oscillation from center axis
                            const dynamicHeight = isPlaying
                              ? Math.min(100, Math.max(16, baseHeight * (0.65 + 0.35 * Math.sin(audioProgress.current * 10 + idx * 0.45))))
                              : baseHeight;

                            // Refined SaaS Gradient: Tech Cyan/Blue (#0284c7 -> #06b6d4) transitioning into Radiant Amber (#f97316 -> #fb923c)
                            const activeColor = barProgress < 0.5
                              ? `rgb(${Math.round(2 + barProgress * 2 * 8)}, ${Math.round(132 + barProgress * 2 * 50)}, ${Math.round(212)})`
                              : `rgb(${Math.round(249 + (barProgress - 0.5) * 2 * 2)}, ${Math.round(115 + (barProgress - 0.5) * 2 * 31)}, ${Math.round(22 + (barProgress - 0.5) * 2 * 38)})`;

                            return (
                              <div
                                key={idx}
                                className="h-full flex items-center justify-center shrink-0 z-10"
                                style={{ width: '2px' }}
                              >
                                <div
                                  className={`w-[2px] rounded-[0.5px] transition-all duration-75 ${
                                    isCurrentPlayhead
                                      ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                                      : ''
                                  }`}
                                  style={{
                                    height: `${dynamicHeight}%`,
                                    backgroundColor: isCurrentPlayhead
                                      ? '#ffffff'
                                      : isPlaying
                                      ? (isPlayed ? activeColor : 'rgba(82, 82, 91, 0.4)')
                                      : activeColor,
                                    opacity: isPlaying && !isPlayed && !isCurrentPlayhead ? 0.35 : 1
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Wave Player Controls Row (Play/Listen Button + Timestamp) */}
                        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-xs">
                          {/* Play / Listen Button */}
                          <button 
                            type="button" 
                            onClick={handlePlayToggle}
                            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-zinc-950 font-inter font-semibold text-xs shadow-md hover:bg-zinc-100 active:scale-95 transition-all shrink-0 cursor-pointer"
                            aria-label={isPlaying ? "Pause Announcement" : "Play Announcement"}
                          >
                            {isPlaying ? (
                              <>
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                                <span>Listen</span>
                              </>
                            )}
                          </button>

                          {/* Audio Timestamp in Pure Inter Tabular Numbers */}
                          <div className="font-inter font-medium text-zinc-400 tabular-nums text-xs">
                            {isPlaying && audioProgress.current > 0
                              ? `${formatAudioTime(audioProgress.current)} / ${formatAudioTime(activeAnnouncement.totalDuration)}`
                              : activeAnnouncement.defaultTime}
                          </div>
                        </div>

                      </div>

                      {/* 4. LANGUAGES SELECTOR (Telugu | English in Middle | Hindi) */}
                      <div className="flex items-center justify-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-full w-full h-9 shrink-0">
                        <button 
                          type="button" 
                          onClick={() => handleLangChange('telugu')}
                          className={`flex-1 py-1 rounded-full text-xs transition-all ${
                            phoneLang === 'telugu'
                              ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm'
                              : 'text-zinc-400 hover:text-zinc-200 font-medium'
                          }`}
                        >
                          Telugu
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleLangChange('english')}
                          className={`flex-1 py-1 rounded-full text-xs transition-all ${
                            phoneLang === 'english'
                              ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm'
                              : 'text-zinc-400 hover:text-zinc-200 font-medium'
                          }`}
                        >
                          English
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleLangChange('hindi')}
                          className={`flex-1 py-1 rounded-full text-xs transition-all ${
                            phoneLang === 'hindi'
                              ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm'
                              : 'text-zinc-400 hover:text-zinc-200 font-medium'
                          }`}
                        >
                          Hindi
                        </button>
                      </div>

                    </div>

                    {/* 5. DIGITAL TRANSIT BOARD (Icon-free, High-Clarity Typography) */}
                    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-4 flex flex-col gap-2.5">
                      
                      {/* Board Header (Dynamic Title & Subtitle) */}
                      <div className="flex items-baseline justify-between pb-2 border-b border-zinc-800/60">
                        <h4 className="text-xs sm:text-[13px] font-semibold text-white tracking-tight font-inter">
                          {currentTransit.board.title}
                        </h4>
                        <span className="text-[11px] font-medium text-zinc-400 font-inter">
                          {currentTransit.board.subtitle}
                        </span>
                      </div>

                      {/* Board Column Titles */}
                      <div className="grid grid-cols-12 text-[11px] font-medium text-zinc-400 font-inter px-2 pt-1 pb-0.5">
                        <span className="col-span-6">{currentTransit.board.cols[0]}</span>
                        <span className="col-span-3 text-center">{currentTransit.board.cols[1]}</span>
                        <span className="col-span-3 text-right">{currentTransit.board.cols[2]}</span>
                      </div>

                      {/* Rows (Pure Inter Clarity, Zero Icons, Active Item Always First in Emerald) */}
                      <div className="flex flex-col gap-1.5">
                        {sortedBoardItems.map((item, idx) => {
                          const isActive = idx === 0;
                          return (
                            <div 
                              key={item.no + idx}
                              className={`grid grid-cols-12 items-center transition-all duration-200 ${
                                isActive 
                                  ? 'p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30' 
                                  : 'px-2.5 py-2 rounded-lg border-b border-zinc-800/40'
                              }`}
                            >
                              <div className="col-span-6">
                                <div className={`font-inter text-xs font-bold tabular-nums ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                  {item.no}
                                </div>
                                <div className={`text-xs font-semibold tracking-tight truncate ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                                  {item.name}
                                </div>
                              </div>
                              <div className="col-span-3 text-center">
                                <div className={`font-inter text-xs tabular-nums ${isActive ? 'text-zinc-100 font-semibold' : 'text-zinc-300 font-medium'}`}>
                                  {item.time}
                                </div>
                                <div className={`text-[10px] font-medium ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                  {item.status}
                                </div>
                              </div>
                              <div className="col-span-3 text-right">
                                {isActive ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-zinc-950 font-inter font-bold text-xs">
                                    {item.badge}
                                  </span>
                                ) : (
                                  <span className="text-zinc-300 font-inter font-semibold text-xs">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                  </div>

                  {/* Fixed Bottom Home Swipe Indicator */}
                  <div className="py-2 shrink-0 flex justify-center bg-[#0A0D14]/95 backdrop-blur-md z-20 border-t border-white/[0.04]">
                    <div className="w-28 h-1 bg-zinc-700 rounded-full" />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Continuation Canvas */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Next sections */}
      </main>

    </div>
  );
}
