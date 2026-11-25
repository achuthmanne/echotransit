import React, { useState, useRef, useEffect } from 'react';

const RAILWAY_TRAINS = [
  { no: '12723', name: 'Telangana Express', from: 'HYB (Hyderabad)', to: 'NDLS (New Delhi)', type: 'Superfast', platform: 'PF 1', sta: '06:25' },
  { no: '20833', name: 'Vande Bharat Express', from: 'SC (Secunderabad)', to: 'VSKP (Visakhapatnam)', type: 'Vande Bharat', platform: 'PF 1', sta: '15:00' },
  { no: '12760', name: 'Charminar Express', from: 'HYB (Hyderabad)', to: 'TBM (Tambaram)', type: 'Superfast', platform: 'PF 5', sta: '18:00' },
  { no: '12806', name: 'Janmabhoomi Express', from: 'LPI (Lingampalli)', to: 'VSKP (Visakhapatnam)', type: 'Express', platform: 'PF 2', sta: '07:00' },
  { no: '12604', name: 'Chennai Central Mail', from: 'HYB (Hyderabad)', to: 'MAS (Chennai)', type: 'Mail', platform: 'PF 4', sta: '16:45' },
];

const OPERATIONAL_PHASES = [
  { id: 'approaching', label: 'Approaching' },
  { id: 'arriving', label: 'Arriving' },
  { id: 'on_platform', label: 'On Platform' },
  { id: 'ready_to_depart', label: 'Ready to Depart' },
  { id: 'delayed', label: 'Delayed' },
  { id: 'platform_change', label: 'Platform Change' },
];

const PLATFORMS = ['PF 1', 'PF 2', 'PF 3', 'PF 4', 'PF 5', 'PF 6', 'PF 7', 'PF 8'];

const DELAY_OPTIONS = [
  { id: 'on_time', label: 'On Time' },
  { id: '10m', label: '+10 Min' },
  { id: '20m', label: '+20 Min' },
  { id: '45m', label: '+45 Min' },
  { id: '60m', label: '+1 Hr' },
];

export default function TransitConsolePage({ onBackToLanding, activeMode, onSelectMode }) {
  const [selectedTrain, setSelectedTrain] = useState(RAILWAY_TRAINS[0]);
  const [isTrainDropdownOpen, setIsTrainDropdownOpen] = useState(false);
  const [trainSearchQuery, setTrainSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('arriving');
  const [selectedPlatform, setSelectedPlatform] = useState('PF 1');
  const [selectedDelay, setSelectedDelay] = useState('on_time');
  const [scheduledTime, setScheduledTime] = useState('06:25');
  const dropdownRef = useRef(null);

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    if (train.platform) setSelectedPlatform(train.platform);
    if (train.sta) setScheduledTime(train.sta);
    setIsTrainDropdownOpen(false);
    setTrainSearchQuery('');
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTrainDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTrains = RAILWAY_TRAINS.filter(
    (t) =>
      t.no.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.from.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.to.toLowerCase().includes(trainSearchQuery.toLowerCase())
  );
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
        
        {/* Dedicated Rail Console View (/console/rail) */}
        {activeMode === 'rail' ? (
          <div className="w-full max-w-[1380px] bg-black border border-zinc-800 rounded-xl p-6 sm:p-8 flex flex-col">
            
            {/* Top Center: Station Name & Code */}
            <div className="w-full py-2 flex items-center justify-center text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans select-none">
                Secunderabad Junction (SC)
              </h1>
            </div>

            {/* Hairline Divider Line */}
            <div className="w-full h-px bg-zinc-800/80 my-5" />

            {/* Controls Section: 2-Column Input Grid (Wider Columns) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-7 items-start">
              
              {/* Row 1 - Column 1: Train Selection Input */}
              <div className="relative z-20 w-full" ref={dropdownRef}>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-2 select-none">
                  Select Train
                </label>

                <button
                  type="button"
                  onClick={() => setIsTrainDropdownOpen(!isTrainDropdownOpen)}
                  className="w-full h-11 px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/50 text-left flex items-center justify-between text-xs sm:text-[13px] font-sans transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <svg className="w-4 h-4 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="3" width="16" height="15" rx="2" />
                      <line x1="4" y1="11" x2="20" y2="11" />
                      <line x1="8" y1="15" x2="8.01" y2="15" strokeWidth="2.5" />
                      <line x1="16" y1="15" x2="16.01" y2="15" strokeWidth="2.5" />
                      <path d="m8 18-2 3" />
                      <path d="m16 18 2 3" />
                    </svg>
                    {selectedTrain ? (
                      <span className="text-white font-normal truncate">
                        <span className="font-medium text-zinc-300">{selectedTrain.no}</span> — {selectedTrain.name}
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-normal">Search Train Number or Name...</span>
                    )}
                  </div>
                  <svg 
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isTrainDropdownOpen ? 'rotate-180 text-white' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu (Full Width of Column) */}
                {isTrainDropdownOpen && (
                  <div className="absolute left-0 top-[calc(100%+6px)] w-full rounded-lg bg-black border border-white/20 shadow-2xl z-30 overflow-hidden font-sans">
                    <div className="p-2 border-b border-white/10">
                      <input
                        type="text"
                        placeholder="Search train no or name..."
                        value={trainSearchQuery}
                        onChange={(e) => setTrainSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/25 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 font-normal"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto divide-y divide-zinc-900">
                      {filteredTrains.length > 0 ? (
                        filteredTrains.map((train) => (
                          <button
                            key={train.no}
                            type="button"
                            onClick={() => handleSelectTrain(train)}
                            className="w-full p-3 text-left hover:bg-zinc-900/60 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <div>
                              <div className="text-xs sm:text-[13px] font-normal text-white tracking-tight">
                                <span className="font-medium text-zinc-300">{train.no}</span> • {train.name}
                              </div>
                              <div className="text-[11px] text-zinc-400 mt-0.5 font-normal">
                                {train.from} → {train.to}
                              </div>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-300 px-2 py-0.5 rounded bg-transparent border border-white/20">
                              {train.type}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-zinc-500 font-normal">
                          No train found matching "{trainSearchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 1 - Column 2: Operational Phase Pills (6 Phases) */}
              <div className="w-full">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-2 select-none">
                  Operational Phase
                </label>

                {/* 6 Phases in a Single Unified Row (No wrapping) */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar">
                  {OPERATIONAL_PHASES.map((phase) => {
                    const isSelected = selectedPhase === phase.id;

                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => setSelectedPhase(phase.id)}
                        className={`h-11 px-2.5 sm:px-3 rounded-lg text-xs font-sans whitespace-nowrap shrink-0 transition-colors cursor-pointer select-none flex items-center justify-center ${
                          isSelected
                            ? 'bg-white text-black font-semibold border border-white shadow-sm'
                            : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                        }`}
                      >
                        {phase.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2 - Column 1: Assigned Platform (PF 1 to PF 8 in Single Row) */}
              <div className="w-full">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-2 select-none">
                  Assigned Platform
                </label>

                {/* PF 1 to PF 8 in a Single Unified Row (No wrapping) */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar">
                  {PLATFORMS.map((pf) => {
                    const isSelected = selectedPlatform === pf;

                    return (
                      <button
                        key={pf}
                        type="button"
                        onClick={() => setSelectedPlatform(pf)}
                        className={`h-11 px-2.5 sm:px-3 rounded-lg text-xs font-sans whitespace-nowrap shrink-0 transition-colors cursor-pointer select-none flex items-center justify-center flex-1 ${
                          isSelected
                            ? 'bg-white text-black font-semibold border border-white shadow-sm'
                            : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                        }`}
                      >
                        {pf}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2 - Column 2: Live Timings & Delay Status */}
              <div className="w-full">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-2 select-none">
                  Live Timings &amp; Delay Status
                </label>

                {/* Single Unified Row: Scheduled Time Box + Delay Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar">
                  
                  {/* Scheduled Time Box */}
                  <div className="h-11 px-3 rounded-lg bg-transparent border border-white/25 flex items-center gap-2 shrink-0 select-none">
                    <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">STA</span>
                    <input
                      type="text"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-13 bg-transparent text-xs font-mono font-medium text-white focus:outline-none text-center cursor-text"
                      title="Scheduled Time of Arrival / Departure"
                    />
                  </div>

                  {/* Delay Status Pills */}
                  {DELAY_OPTIONS.map((delay) => {
                    const isSelected = selectedDelay === delay.id;

                    return (
                      <button
                        key={delay.id}
                        type="button"
                        onClick={() => setSelectedDelay(delay.id)}
                        className={`h-11 px-2.5 sm:px-3 rounded-lg text-xs font-sans whitespace-nowrap shrink-0 transition-colors cursor-pointer select-none flex items-center justify-center flex-1 ${
                          isSelected
                            ? 'bg-white text-black font-semibold border border-white shadow-sm'
                            : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                        }`}
                      >
                        {delay.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        ) : activeMode ? (
          <div className="w-full max-w-xl bg-black border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <img
                src={
                  activeMode === 'road'
                    ? '/road_coach_bus.png'
                    : '/air_plane_cockpit.png'
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
                : 'Airways Terminal Console'}
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
