import React, { useEffect, useRef, useState } from 'react';

/**
 * DialogueShowcaseSection
 * 
 * Luminous High-Bloom Two-Tone Acoustic Wave + Dynamic Dialogue Showcase:
 * 1. Big Cinematic Headline:
 *    - "Never lose a single passenger to noise. Critical travel updates delivered directly to"
 * 2. Rotating Animated Line (Glowing Neon Gradient):
 *    - "their native language in their pocket."
 *    - "Platform 4 amidst the loudest train roar."
 *    - "Bay 12 across crowded bus stands."
 *    - "Gate 18B before boarding closes."
 * 3. Body Matter:
 *    - "EchoTransit bridges the fatal gap between chaotic terminal loudspeakers and personalized, real-time pocket audio."
 * 4. 60fps Zero-Lag Batched GPU Pipeline (Locked 60fps).
 */
export default function DialogueShowcaseSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Rotating dialogue lines for typing & erasing
  const phrases = [
    'their native language in their pocket.',
    'Platform 4 amidst the loudest train roar.',
    'Bay 12 across crowded bus stands.',
    'Gate 18B before boarding closes.'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Precision Typewriter Engine: Forward Type -> Pause -> Backward Erase -> Next Phrase
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      // Forward Typing Mode
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 45); // Natural typing speed
      } else {
        // Fully typed -> Pause for 2000ms so traveler reads comfortably
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Backward Erasing Mode
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 22); // Fast backspacing speed
      } else {
        // Fully erased -> Pause 450ms then advance to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let time = 0;
    let isVisible = false;

    const NUM_PTS = 110;

    // Pre-allocated typed arrays (ZERO runtime memory allocation, ZERO GC stutter)
    const r1X = new Float32Array(NUM_PTS);
    const r1Y_top = new Float32Array(NUM_PTS);
    const r1Y_bot = new Float32Array(NUM_PTS);

    const r2X = new Float32Array(NUM_PTS);
    const r2Y_top = new Float32Array(NUM_PTS);
    const r2Y_bot = new Float32Array(NUM_PTS);

    const r3X = new Float32Array(NUM_PTS);
    const r3Y_top = new Float32Array(NUM_PTS);
    const r3Y_bot = new Float32Array(NUM_PTS);

    let gradHero = null;
    let gradLower = null;
    let gradUpper = null;
    // Radiant multi-tone lattice color
    const crossLatticeColor = 'rgba(216, 180, 254, 0.38)';

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Hero Ribbon: Ultra-Vivid Electric Cyan -> Electric Violet -> Glowing Neon Magenta -> Hot Coral
      gradHero = ctx.createLinearGradient(0, 0, width, 0);
      gradHero.addColorStop(0.0, 'rgba(0, 245, 255, 0.98)');   // Radiant Electric Cyan
      gradHero.addColorStop(0.24, 'rgba(56, 189, 248, 0.98)');  // High-Luminosity Aqua
      gradHero.addColorStop(0.48, 'rgba(168, 85, 247, 0.98)');  // Electric Violet
      gradHero.addColorStop(0.72, 'rgba(244, 63, 94, 0.98)');   // Glowing Neon Pink
      gradHero.addColorStop(0.88, 'rgba(255, 16, 128, 0.98)');  // Vivid Hot Magenta
      gradHero.addColorStop(1.0, 'rgba(251, 113, 133, 0.95)');  // Luminous Rose-Coral

      // Lower Wave: Deep Cobalt Blue -> Electric Sapphire -> Bright Aqua Cyan
      gradLower = ctx.createLinearGradient(0, 0, width, 0);
      gradLower.addColorStop(0.0, 'rgba(30, 58, 138, 0.50)');   // Deep Navy
      gradLower.addColorStop(0.45, 'rgba(37, 99, 235, 0.78)');  // Electric Sapphire
      gradLower.addColorStop(0.75, 'rgba(14, 165, 233, 0.88)'); // Azure Sky
      gradLower.addColorStop(1.0, 'rgba(0, 245, 255, 0.82)');   // Neon Cyan

      // Upper Wave: Hot Magenta -> Electric Orchid -> Radiant Cyan
      gradUpper = ctx.createLinearGradient(0, 0, width, 0);
      gradUpper.addColorStop(0.0, 'rgba(255, 16, 128, 0.92)');  // Hot Magenta
      gradUpper.addColorStop(0.40, 'rgba(192, 132, 252, 0.90)'); // Orchid Violet
      gradUpper.addColorStop(0.75, 'rgba(56, 189, 248, 0.85)');  // Electric Azure
      gradUpper.addColorStop(1.0, 'rgba(0, 245, 255, 0.80)');   // Radiant Cyan
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // 60fps Zero-Lag Render Loop
    const render = () => {
      if (!isVisible) return;
      time += 0.010;

      ctx.clearRect(0, 0, width, height);

      // Compute rails across 100% of canvas width (u: 0.0 -> 1.0)
      for (let i = 0; i < NUM_PTS; i++) {
        const u = i / (NUM_PTS - 1);
        const x = u * width;

        // ---------- RIBBON 1: HERO VOLUMETRIC CENTER MESH ----------
        r1X[i] = x;
        const heroCenter = height * 0.48
          - height * 0.30 * Math.pow(Math.sin(u * Math.PI), 1.25)
          + height * 0.15 * Math.sin(u * 2.8 * Math.PI + time * 0.6)
          - height * 0.16 * Math.cos(u * 1.5 * Math.PI + time * 0.4);

        const heroThickness = (height * 0.15 + height * 0.24 * Math.pow(Math.sin(u * Math.PI), 0.9))
          * (1 + 0.14 * Math.sin(u * 3.5 * Math.PI + time * 0.8));

        r1Y_top[i] = heroCenter - heroThickness * 0.52;
        r1Y_bot[i] = heroCenter + heroThickness * 0.48;

        // ---------- RIBBON 2: LOWER AZURE ACOUSTIC FAN ----------
        r2X[i] = x;
        const blueCenter = height * 0.72 
          + height * 0.12 * Math.sin(u * 2.2 * Math.PI - time * 0.5)
          - height * 0.09 * Math.cos(u * 1.6 * Math.PI);
        const blueThick = height * 0.07 + height * 0.18 * Math.pow(u, 1.3) + height * 0.04 * Math.sin(u * Math.PI);
        r2Y_top[i] = blueCenter - blueThick * 0.5;
        r2Y_bot[i] = blueCenter + blueThick * 0.5;

        // ---------- RIBBON 3: UPPER WAVE (100% CONTINUOUS FLOW) ----------
        r3X[i] = x;
        const upperCenter = height * 0.26 
          + height * 0.22 * Math.sin(u * 1.8 * Math.PI + time * 0.5) 
          + height * 0.12 * Math.cos(u * 2.4 * Math.PI - time * 0.4);
        const upperThick = height * 0.08 + height * 0.11 * Math.sin(u * Math.PI);
        r3Y_top[i] = upperCenter - upperThick * 0.5;
        r3Y_bot[i] = upperCenter + upperThick * 0.5;
      }

      // 1. Draw Ribbon 2 (Lower Azure Fan - 26 Strands) in ONE BATCHED CALL
      ctx.strokeStyle = gradLower;
      ctx.lineWidth = 1.0;
      const BLUE_STRANDS = 26;
      ctx.beginPath();
      for (let s = 0; s <= BLUE_STRANDS; s++) {
        const factor = s / BLUE_STRANDS;
        for (let i = 0; i < NUM_PTS; i++) {
          const y = (1 - factor) * r2Y_top[i] + factor * r2Y_bot[i];
          if (i === 0) ctx.moveTo(r2X[i], y);
          else ctx.lineTo(r2X[i], y);
        }
      }
      ctx.stroke();

      // 2. Draw Ribbon 3 (Upper Continuous Ribbon - 22 Strands) in ONE BATCHED CALL
      ctx.strokeStyle = gradUpper;
      ctx.lineWidth = 1.0;
      const UPPER_STRANDS = 22;
      ctx.beginPath();
      for (let s = 0; s <= UPPER_STRANDS; s++) {
        const factor = s / UPPER_STRANDS;
        for (let i = 0; i < NUM_PTS; i++) {
          const y = (1 - factor) * r3Y_top[i] + factor * r3Y_bot[i];
          if (i === 0) ctx.moveTo(r3X[i], y);
          else ctx.lineTo(r3X[i], y);
        }
      }
      ctx.stroke();

      // 3. Draw Ribbon 1 (Hero Volumetric Wave - 44 Strands) in ONE BATCHED CALL
      ctx.strokeStyle = gradHero;
      ctx.lineWidth = 1.15;
      const HERO_STRANDS = 44;
      ctx.beginPath();
      for (let s = 0; s <= HERO_STRANDS; s++) {
        const factor = s / HERO_STRANDS;
        for (let i = 0; i < NUM_PTS; i++) {
          const y = (1 - factor) * r1Y_top[i] + factor * r1Y_bot[i];
          if (i === 0) ctx.moveTo(r1X[i], y);
          else ctx.lineTo(r1X[i], y);
        }
      }
      ctx.stroke();

      // 4. Draw Transverse 3D Wireframe Lattice Mesh in ONE BATCHED CALL
      ctx.strokeStyle = crossLatticeColor;
      ctx.lineWidth = 0.90;
      ctx.beginPath();
      for (let i = 0; i < NUM_PTS; i += 3) {
        ctx.moveTo(r1X[i], r1Y_top[i]);
        ctx.lineTo(r1X[i], r1Y_bot[i]);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    // Visibility Observer: Pauses completely when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          render();
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    isVisible = true;
    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full relative h-[90vh] sm:h-screen min-h-[580px] max-h-[880px] bg-[#07051A] overflow-hidden flex items-center justify-center border-t border-slate-900/80"
    >
      {/* 60fps High-Volume Parametric Multi-Ribbon Mesh Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transform-gpu will-change-transform z-0"
      />

      {/* Dual High-Bloom Ambient Glows (Electric Cyan Left + Radiant Neon Pink Right) */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_20%_35%,rgba(0,245,255,0.18),transparent_55%),radial-gradient(circle_at_80%_65%,rgba(255,16,128,0.18),transparent_55%)]" 
        aria-hidden="true" 
      />

      {/* Cursor Blink Keyframe */}
      <style>{`
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Content Container (Layered above wave with high readability) */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">

        {/* Main Headline (Big, Bold, Cinematic) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.14] [text-wrap:balance] max-w-4xl mx-auto">
          Never lose a single passenger to noise. Critical travel updates delivered directly to
        </h2>

        {/* Typewriter Display Stage (Direction 1: Live Terminal Protocol in JetBrains Mono) */}
        <div className="mt-4 sm:mt-6 w-full max-w-7xl mx-auto flex items-center justify-center min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8.5rem] py-4 px-2 sm:px-4 overflow-visible">
          {/* Filter drop-shadow moved to parent wrapper to eliminate Chromium Skia descender clipping */}
          <div className="flex items-center justify-center overflow-visible filter drop-shadow-[0_0_32px_rgba(236,72,153,0.55)]">
            <span 
              className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-[2.75rem] xl:text-[3.35rem] 2xl:text-[3.75rem] font-bold tracking-tight whitespace-nowrap text-center bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent inline-block transform-gpu will-change-transform [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{
                lineHeight: 1.6,
                paddingBottom: '0.35em',
                marginBottom: '-0.3em',
                paddingTop: '0.1em'
              }}
            >
              {displayText}
            </span>
            {/* Blinking Cyan Neon Monospace Cursor | */}
            <span 
              className="font-mono inline-block text-cyan-300 font-light text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem] xl:text-[3.35rem] 2xl:text-[3.75rem] ml-2 leading-none select-none drop-shadow-[0_0_18px_rgba(34,211,238,0.9)]"
              style={{ 
                animation: 'cursorBlink 0.9s infinite',
                paddingBottom: '0.25em',
                marginBottom: '-0.2em'
              }}
              aria-hidden="true"
            >
              |
            </span>
          </div>
        </div>

        {/* Kindha Matter */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto font-normal leading-relaxed [text-wrap:balance]">
          EchoTransit bridges the fatal gap between chaotic terminal loudspeakers and personalized, real-time pocket audio.
        </p>

      </div>
    </section>
  );
}
