import React, { useEffect, useRef } from 'react';

export default function SoundWaveHero({ children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);
    let isVisible = false;

    const handleResize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    // 3D Orbital Sound Waves (Circular In/Out & Up/Down Harmonic Motion)
    const render = () => {
      if (!isVisible) return;

      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.48; // Shared central focal position

      // 3 Distinct 3D Harmonic Forms sharing the exact same central position
      const forms = [
        {
          // Form 1: Main sweeping helical orbital ribbon
          linesCount: 18,
          radiusY: height * 0.20,
          radiusZ: 50, // In/Out depth amplitude
          freq: 2.8,
          orbitSpeed: 1.0,
          vertSpeed: 0.7,
          phase: 0,
          baseSpread: 50,
          opacity: 0.40
        },
        {
          // Form 2: Counter-orbiting complementary wave (weaves in when Form 1 goes out)
          linesCount: 14,
          radiusY: height * 0.16,
          radiusZ: 42,
          freq: 3.4,
          orbitSpeed: -0.85, // Counter-rotational circular motion
          vertSpeed: 0.9,
          phase: Math.PI * 0.65,
          baseSpread: 38,
          opacity: 0.28
        },
        {
          // Form 3: High-frequency resonant toroidal filament
          linesCount: 12,
          radiusY: height * 0.13,
          radiusZ: 32,
          freq: 4.2,
          orbitSpeed: 1.25,
          vertSpeed: 1.1,
          phase: Math.PI * 1.35,
          baseSpread: 28,
          opacity: 0.22
        }
      ];

      forms.forEach((form) => {
        const { linesCount, radiusY, radiusZ, freq, orbitSpeed, vertSpeed, phase, baseSpread, opacity } = form;

        for (let i = 0; i < linesCount; i++) {
          const progress = i / (linesCount - 1); // 0 to 1
          const centerWeight = 1 - Math.abs(progress - 0.5) * 2;
          const lineOffset = (progress - 0.5) * 0.65; // phase fan across ribbon strands

          ctx.beginPath();

          const steps = 90;
          for (let s = 0; s <= steps; s++) {
            const x = (s / steps) * width;
            const normX = s / steps;

            // Organic natural envelope (tapers cleanly at the borders)
            const envelope = Math.sin(normX * Math.PI);

            // 1. CIRCULAR 3D ORBITAL ANGLE (Circular rotation along the curve)
            const orbitAngle = normX * freq * Math.PI + (time * orbitSpeed) + phase + lineOffset;

            // 2. LOPALIKI & BAYATIKI (In-and-Out 3D Depth / Z-axis)
            const depthZ = Math.cos(orbitAngle) * radiusZ * envelope;
            
            // Perspective depth factor (when coming outward, expands; when dipping inward, contracts)
            const perspectiveScale = 1 + (depthZ / 140);

            // 3. KINDHA & PAIKI (Up-and-Down Vertical Motion)
            const orbitalY = Math.sin(orbitAngle) * radiusY * envelope;
            const macroVerticalBreath = Math.sin(time * vertSpeed + normX * 2.2) * (height * 0.06) * envelope;

            // Ribbon strand fanning with twist
            const twistSpread = Math.sin(orbitAngle * 1.5 + progress * Math.PI) * baseSpread * envelope * perspectiveScale;

            const y = centerY + orbitalY + macroVerticalBreath + twistSpread;

            // Dynamic depth opacity: Brighter when bayatiki (closer), softer when lopaliki (deeper)
            const depthAlphaMod = Math.max(0.2, Math.min(1.4, perspectiveScale));
            const currentAlpha = (opacity * (0.35 + centerWeight * 0.65) * depthAlphaMod).toFixed(3);

            ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha})`;
            ctx.lineWidth = depthZ > 0 ? 1.15 : 0.85;

            if (s === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isVisible) {
        isVisible = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // Immediately start on mount so hero waves are visible on 0ms page open/refresh!
    startAnimation();

    // IntersectionObserver: PAUSES hero animation when scrolled out of view
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
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      stopAnimation();
    };
  }, []);

  return (
    /* EXACT 1-SCREEN VIEWPORT HEIGHT (Navbar 80px + Hero = 100vh) */
    <div ref={containerRef} className="relative w-full h-[calc(100vh-5rem)] min-h-[580px] overflow-hidden select-none bg-white flex flex-col items-center justify-center px-6">
      
      {/* Seamless Eased Black to White Gradient Falloff right at bottom edge */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              180deg,
              #000000 0%,
              #000000 38%,
              rgba(0, 0, 0, 0.98) 50%,
              rgba(0, 0, 0, 0.88) 62%,
              rgba(0, 0, 0, 0.70) 74%,
              rgba(0, 0, 0, 0.44) 84%,
              rgba(0, 0, 0, 0.18) 92%,
              rgba(0, 0, 0, 0.04) 97%,
              rgba(0, 0, 0, 0.00) 100%
            )
          `
        }}
      />

      {/* 3D Circular Orbiting Acoustic Waves Canvas with GPU layer promotion */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none transform-gpu will-change-transform"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.15) 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.15) 92%, transparent 100%)'
        }}
      />

      {/* Hero Content Container - Centered in Viewport */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center -mt-4">
        {children}
      </div>

    </div>
  );
}
