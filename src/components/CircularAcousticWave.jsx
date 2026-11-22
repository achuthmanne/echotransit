import React, { useEffect, useRef } from 'react';

/**
 * CircularAcousticWave
 * 
 * Production-Grade 60fps High-DPI Canvas Component
 * Direct architecture of SoundWaveHero & DeepWaveSection:
 * - High-DPI Retina/4K Canvas rendering (zero SVG blur, razor-sharp white lines)
 * - Large, commanding display radius (fills right-side canvas with high presence)
 * - 100% Pure Code: Mathematical parametric radial audio waveform ring
 * - Pure waves everywhere (no artificial rigid circles; every strand undulates)
 * - Fluid 60fps living acoustic ripple & aerodynamic twist
 * - IntersectionObserver visibility guard for zero CPU/GPU load offscreen
 */
export default function CircularAcousticWave({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = false;
    let time = 0;

    // 13 silky-thin, evenly spaced concentric acoustic wave strands
    const STRAND_COUNT = 13;
    const SAMPLE_COUNT = 720; // 720 precision radial points around 360 deg

    const handleResize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const sectionEl = container.closest('section');

    const render = () => {
      if (!isVisible) return;

      time += 0.009; // Smooth 60fps fluid acoustic clock
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);

      // Expanded radius with generous center void for mic image & massive outer presence (Zero Edge Clipping)
      const baseR = minDim * 0.255;
      const strandGap = minDim * 0.0090;
      const maxAmp = minDim * 0.085;

      // Dynamic smooth 360-degree chromatic spectrum cycle (Speed boosted for clear, vivid transitions)
      const baseHue = (time * 46) % 360;

      // Broadcast synchronized colors to parent section for 100% lockstep sync with headline text & button glow!
      if (sectionEl) {
        sectionEl.style.setProperty('--wave-c1', `hsl(${baseHue.toFixed(1)}, 100%, 65%)`);
        sectionEl.style.setProperty('--wave-c2', `hsl(${((baseHue + 40) % 360).toFixed(1)}, 95%, 62%)`);
        sectionEl.style.setProperty('--wave-c3', `hsl(${((baseHue + 80) % 360).toFixed(1)}, 95%, 58%)`);
      }

      for (let k = 0; k < STRAND_COUNT; k++) {
        const t = k / (STRAND_COUNT - 1); // 0 (innermost) to 1 (outermost)
        
        // Base radius for this strand
        const rBase = baseR + k * strandGap;
        
        // Aerodynamic swirl: progressive phase twist per strand
        const twist = k * 0.048;
        
        // Wave amplitude: even innermost strand undulates organically (no rigid circles!)
        const waveAmp = baseR * 0.10 + maxAmp * Math.pow(t, 1.32);
        
        // Subtle living organic breathing
        const breathe = Math.sin(time + k * 0.14) * 2.2;

        ctx.beginPath();

        for (let i = 0; i <= SAMPLE_COUNT; i++) {
          const ang = (i / SAMPLE_COUNT) * Math.PI * 2;

          // 8 primary acoustic soundwave lobes around 360 degrees
          // Top peak aligned at 12 o'clock (-pi/2 in canvas screen space)
          const theta = ang + Math.PI / 2 - twist;
          const c8 = Math.cos(8.0 * theta);

          // Non-linear shaping: sharp tall crests & smooth wide valleys
          const u = (c8 + 1.0) / 2.0;
          const waveVal = Math.pow(u, 1.42) * 2.0 - 1.0;

          // Circumferential height envelope: top peak is tallest, bottom and sides harmonically balanced
          const topBias = -Math.sin(ang); // 1 at 12 o'clock (top)
          const envelope = 0.86 + 0.20 * Math.max(0.0, topBias) + 0.10 * Math.abs(Math.sin(ang));

          const r = rBase + (waveAmp + breathe) * waveVal * envelope;

          const x = cx + r * Math.cos(ang);
          const y = cy + r * Math.sin(ang);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();

        // Synchronized Harmonic Color Strand Calculation
        // Phase fan across the strands (t * 30 deg) so colors ripple outward in lockstep with the headline
        const strandHue = (baseHue + t * 30) % 360;
        
        // Saturation: 15% at core (pure white) to 100% at outer crests (vivid saturated neon)
        const saturation = Math.round(15 + 85 * Math.pow(t, 0.75));
        // Lightness: 97% at core (crystal white for mic void) to 60% at outer crests (radiant neon glow)
        const lightness = Math.round(97 - 37 * Math.pow(t, 0.85));
        const opacity = (0.44 + 0.56 * t).toFixed(2);

        ctx.strokeStyle = `hsla(${strandHue.toFixed(1)}, ${saturation}%, ${lightness}%, ${opacity})`;
        ctx.lineWidth = 1.3 + 0.4 * t;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isVisible) {
        isVisible = true;
        render();
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    startAnimation();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block transform-gpu will-change-transform" />
    </div>
  );
}
