import React from 'react';

export default function TransitConsolePage({ onBackToLanding, activeMode, onSelectMode }) {
  const modeData = [
    {
      id: 'rail',
      modeNum: 'Mode 1',
      title: 'Railways Transit Engine',
      purpose: 'Multi-lingual automated station P.A. broadcasts & real-time passenger mobile audio sync.',
      icon: '/rail_bullet_train.png',
      alt: 'High-Speed Rail Engine',
      specs: [
        'EN • HI • TE (3 Languages)',
        '< 85ms Synthesis Relay',
        'Platform Audio + QR Web Sync',
      ],
      btnText: 'Launch Rail Console',
    },
    {
      id: 'road',
      modeNum: 'Mode 2',
      title: 'Roadways Fleet Engine',
      purpose: 'Terminal dispatch audio, inter-city fleet announcements & passenger mobile sync.',
      icon: '/road_coach_bus.png',
      alt: 'Inter-City Fleet Coach Bus',
      specs: [
        'Multi-Bay Terminal Broadcast',
        'Dynamic Bus Route & Delay Sync',
        'In-Cabin Mobile Zero-Install Audio',
      ],
      btnText: 'Launch Road Console',
    },
    {
      id: 'air',
      modeNum: 'Mode 3',
      title: 'Airways Terminal Engine',
      purpose: 'Boarding gate chime synthesis, baggage claim sync & real-time departure announcements.',
      icon: '/air_plane_cockpit.png',
      alt: 'Aerodynamic Aircraft Engine',
      specs: [
        'Gate & Terminal Multi-Zone Audio',
        'Instant Gate Change Priority Alerts',
        'Personal Mobile Flight Sync via Web',
      ],
      btnText: 'Launch Air Console',
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white flex flex-col font-inter select-none overflow-hidden">
      
      {/* Minimal Floating Top Header */}
      <header className="relative z-20 w-full h-18 sm:h-20 px-6 sm:px-10 flex items-center justify-between border-b border-zinc-800/80 bg-black shrink-0">
        
        {/* Left: Overview Navigation Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 active:scale-[0.98] border border-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-[13px] font-medium transition-colors cursor-pointer select-none"
            aria-label="Back to Overview"
          >
            <svg 
              className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Overview</span>
          </button>
        </div>

        {/* Right: EchoTransit Logo with sharp "CLOUD" text */}
        <div className="flex items-center">
          <button 
            type="button"
            onClick={onBackToLanding}
            className="group flex items-center select-none cursor-pointer focus:outline-none hover:opacity-95 transition-opacity"
            aria-label="Back to EchoTransit Landing Page"
          >
            <div className="relative inline-flex items-start">
              <img 
                src="/logo.png" 
                alt="EchoTransit Logo" 
                className="h-9 sm:h-10 w-auto object-contain brightness-0 invert block"
              />
              <span className="self-start mt-0.5 sm:mt-1 ml-2 text-[10px] sm:text-[11px] font-extrabold tracking-[0.24em] uppercase font-sans text-white select-none antialiased leading-none">
                CLOUD
              </span>
            </div>
          </button>
        </div>

      </header>

      {/* Main Content Area (Centered in viewport with zero scroll) */}
      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-6 sm:px-10 py-4 sm:py-6 overflow-y-auto">
        
        {/* If a Dedicated Mode is Active (/console/rail, /console/road, /console/air) */}
        {activeMode ? (
          <div className="w-full max-w-xl bg-black border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <img
                src={
                  activeMode === 'road'
                    ? '/road_coach_bus.png'
                    : activeMode === 'air'
                    ? '/air_plane_cockpit.png'
                    : '/rail_bullet_train.png'
                }
                alt="Active Mode Vehicle"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Dedicated {activeMode.toUpperCase()} Engine • Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeMode === 'road'
                ? 'Roadways Fleet Console'
                : activeMode === 'air'
                ? 'Airways Terminal Console'
                : 'Railways Control Console'}
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md">
              Route: <span className="font-mono text-white">/console/{activeMode}</span> • Multi-lingual automated dispatch &amp; real-time passenger sync engine.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => onSelectMode ? onSelectMode(null) : null}
                className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-[13px] font-medium text-white transition-colors cursor-pointer select-none"
              >
                ← Switch Mode
              </button>
            </div>
          </div>
        ) : (
          /* 3 Modes Selection Grid with Generous Middle Spacing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-14 max-w-[1380px] w-full px-2">
            {modeData.map((item) => (
              <div
                key={item.id}
                className="group w-full bg-black border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Top Row: Left-Edge Vehicle Icon & Vertically Centered Mode Label */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                    <div className="flex items-center">
                      <img 
                        src={item.icon} 
                        alt={item.alt} 
                        className="h-16 sm:h-20 w-auto object-contain brightness-100 select-none pointer-events-none group-hover:translate-x-1.5 transition-transform duration-300"
                      />
                    </div>

                    <span className="text-sm font-semibold tracking-wide text-zinc-400 font-sans select-none">
                      {item.modeNum}
                    </span>
                  </div>

                  {/* Mode Title & Core Purpose */}
                  <div className="mt-5">
                    <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-zinc-400 leading-relaxed mt-2 font-normal min-h-[40px]">
                      {item.purpose}
                    </p>
                  </div>

                  {/* Flat Solid Hairline Divider */}
                  <div className="w-full h-px bg-zinc-800/80 my-5" />

                  {/* Key Engine Specs (Clean Modern Typography) */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 font-sans select-none">
                      Key Engine Specs
                    </span>
                    <div className="flex flex-col gap-2 pt-0.5">
                      {item.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-[13px] font-medium text-zinc-300 font-sans tracking-tight"
                        >
                          <svg className="w-3.5 h-3.5 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Launch Action (Main Button) */}
                <button
                  type="button"
                  onClick={() => onSelectMode ? onSelectMode(item.id) : null}
                  className="w-full mt-7 py-3 px-4 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-[13px] tracking-tight transition-colors flex items-center justify-center gap-2 select-none cursor-pointer"
                >
                  <span>{item.btnText}</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
