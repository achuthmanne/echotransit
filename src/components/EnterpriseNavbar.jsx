import React, { useState, useEffect, useRef } from 'react';

export default function EnterpriseNavbar({ onNavigate, onModeChange }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActivePillar, setMobileActivePillar] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (pillar) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(pillar);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (item.mode && onModeChange) {
      onModeChange(item.mode);
    }
    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const NAV_PILLARS = [
    {
      id: 'products',
      name: 'Products',
      width: 'w-[580px]',
      cols: 'grid-cols-2',
      footerText: 'Zero mobile app downloads required • 100% instant web sync',
      items: [
        {
          title: 'Transit Cloud Console',
          subtext: 'Station master dispatch & real-time PA audio routing',
          targetId: 'console',
          route: '/products/transit-console',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          )
        },
        {
          title: 'Passenger Mobile Sync',
          subtext: 'Instant zero-app web audio stream via QR scan',
          targetId: 'solution',
          route: '/products/passenger-sync',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          )
        },
        {
          title: 'Authentic Voice Engine',
          subtext: '100% authentic CRIS/RDSO Indian Railways neural speech',
          targetId: 'console',
          route: '/products/voice-engine',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          )
        },
        {
          title: 'Acoustic Visualizer',
          subtext: 'Live dynamic waveforms & synchronized departure boards',
          targetId: 'deep-wave',
          route: '/products/acoustic-display',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'solutions',
      name: 'Solutions',
      width: 'w-[640px]',
      cols: 'grid-cols-3',
      footerText: 'Engineered for Rail, Bus & Airport transit authorities',
      items: [
        {
          title: 'Railways',
          subtext: 'Multi-platform junction alerts & real-time delay tracking',
          targetId: 'console',
          mode: 'rail',
          route: '/solutions/railways',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3" width="16" height="16" rx="2" />
              <path d="M4 11h16" />
              <path d="M12 3v8" />
              <path d="m8 19-3 3" />
              <path d="m16 19 3 3" />
            </svg>
          )
        },
        {
          title: 'Roadways',
          subtext: 'Depot bay dispatch cutting through ambient engine noise',
          targetId: 'console',
          mode: 'bus',
          route: '/solutions/roadways',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="14" rx="2" />
              <path d="M3 10h18" />
              <path d="m7 17-2 3" />
              <path d="m17 17 2 3" />
            </svg>
          )
        },
        {
          title: 'Airways',
          subtext: 'Silent terminal operations, boarding calls & lounge sync',
          targetId: 'console',
          mode: 'flight',
          route: '/solutions/airports',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'platform',
      name: 'Platform',
      width: 'w-[580px]',
      cols: 'grid-cols-2',
      footerText: 'Sub-100ms WebSocket & Web Audio API end-to-end latency',
      items: [
        {
          title: 'Operating Architecture',
          subtext: '3-tier zero-latency cloud-to-passenger sync pipeline',
          targetId: 'architecture',
          route: '/platform/architecture',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          )
        },
        {
          title: 'Acoustic Clarity Engine',
          subtext: 'Dynamic sound isolation penetrating reverberant stations',
          targetId: 'dialogue',
          route: '/platform/acoustics',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
            </svg>
          )
        },
        {
          title: 'Multi-Lingual Matrix',
          subtext: 'Real-time regional multi-lingual voice synthesis',
          targetId: 'ecosystem',
          route: '/platform/languages',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )
        },
        {
          title: 'Station Edge Resiliency',
          subtext: 'Offline-first terminal redundancy for zero network dropouts',
          targetId: 'ecosystem',
          route: '/platform/edge',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'business',
      name: 'Business',
      width: 'w-[580px]',
      cols: 'grid-cols-2',
      footerText: 'Turn terminal audio cost centers into recurring revenue',
      items: [
        {
          title: 'Hardware Cost Savings',
          subtext: '90% reduction in horn speakers, copper wiring & repair costs',
          targetId: 'problem',
          route: '/business/cost-savings',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12" />
              <path d="M6 8h12" />
              <path d="m6 13 8.5 8" />
              <path d="M6 13h3" />
              <path d="M9 13c6.667 0 6.667-10 0-10" />
            </svg>
          )
        },
        {
          title: 'Terminal Audio Ads (ROI)',
          subtext: 'Sponsored audio promotions & geo-fenced retail announcements',
          targetId: 'monetization',
          route: '/business/ad-network',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          )
        },
        {
          title: 'Enterprise Subscriptions',
          subtext: 'Predictable SaaS tiers for municipal & commercial operators',
          targetId: 'monetization',
          route: '/pricing',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          )
        },
        {
          title: 'RFP & Govt Procurement',
          subtext: 'Public sector compliant technical specs and SLA contracts',
          targetId: 'footer',
          route: '/procurement',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'company',
      name: 'Company',
      width: 'w-[560px]',
      cols: 'grid-cols-2',
      footerText: 'EchoTransit Enterprise Systems • All rights reserved',
      items: [
        {
          title: 'About EchoTransit',
          subtext: 'Eliminating transit announcement chaos with cloud audio',
          targetId: 'hero',
          route: '/company/about',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          )
        },
        {
          title: 'Scale & Infrastructure',
          subtext: 'Designed for high concurrency across thousands of stations',
          targetId: 'ecosystem',
          route: '/company/ecosystem',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          )
        },
        {
          title: 'Accessibility & Inclusion',
          subtext: 'Haptic vibration alerts & visual cards for hearing impaired',
          targetId: 'solution',
          route: '/company/accessibility',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          )
        },
        {
          title: 'Contact Enterprise Sales',
          subtext: 'Schedule technical pilot or on-site demonstration',
          targetId: 'footer',
          route: '/contact',
          icon: (
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-200 font-inter antialiased bg-white border-b border-zinc-200/80 ${
      scrolled 
        ? 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]' 
        : ''
    }`}>
      <div className="w-full px-8 sm:px-12 h-20 flex items-center justify-between relative bg-white">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, { targetId: 'hero' })}
            className="flex items-center select-none cursor-pointer focus:outline-none"
            aria-label="EchoTransit Home"
          >
            <img 
              src="/logo.png" 
              alt="EchoTransit Logo" 
              className="h-10 sm:h-11 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation (DEAD CENTER) */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_PILLARS.map((pillar) => {
            const isOpen = activeDropdown === pillar.id;

            return (
              <div 
                key={pillar.id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(pillar.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors select-none cursor-pointer tracking-[-0.01em] ${
                    isOpen
                      ? 'text-zinc-950 bg-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{pillar.name}</span>
                  <svg 
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-zinc-950' : 'group-hover:text-zinc-600'}`} 
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

                {/* Clean Solid White Dropdown Panel with Upward Arrow Pointer */}
                {isOpen && (
                  <div 
                    className={`absolute top-[calc(100%+36px)] left-1/2 -translate-x-1/2 ${pillar.width} z-50 animate-in fade-in zoom-in-95 duration-150 origin-top before:absolute before:-top-10 before:inset-x-0 before:h-10 before:content-['']`}
                  >
                    <div className="relative">
                      
                      {/* Top Upward Arrow Caret (Completely below navbar border, pointing up) */}
                      <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-t border-l border-zinc-200 rotate-45 rounded-tl-[1px] z-20 shadow-[-2px_-2px_4px_rgba(0,0,0,0.02)]" />

                      {/* Main Dropdown Panel (No Top Header Bar - Clean Direct Items) */}
                      <div className="relative z-10 rounded-2xl bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">

                        {/* Grid of Items */}
                        <div className={`p-3 grid ${pillar.cols} gap-2 bg-white`}>
                          {pillar.items.map((item, idx) => (
                            <a
                              key={idx}
                              href={item.route}
                              onClick={(e) => handleLinkClick(e, item)}
                              className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-all text-left select-none cursor-pointer border border-transparent hover:border-zinc-200/50"
                            >
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200/60 flex items-center justify-center shrink-0 text-zinc-800 group-hover/item:bg-black group-hover/item:text-white group-hover/item:border-black transition-all duration-150 mt-0.5 shadow-sm">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-semibold text-zinc-950 group-hover/item:text-black tracking-[-0.015em] leading-snug">
                                  {item.title}
                                </div>
                                <p className="text-[11.5px] text-zinc-500 font-normal leading-relaxed mt-1 line-clamp-2 tracking-[-0.005em]">
                                  {item.subtext}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Dropdown Bottom Centered Info Bar */}
                        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-100 text-center">
                          <p className="text-[11.5px] font-medium text-zinc-500 tracking-[-0.01em]">
                            {pillar.footerText}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </nav>

        {/* Right: Direct Enterprise Action & Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Primary High-Contrast Action: Open Transit Console */}
          <a
            href="#console"
            onClick={(e) => handleLinkClick(e, { targetId: 'console' })}
            className="px-5 py-2.5 rounded-lg bg-black text-white text-[13px] font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-colors select-none cursor-pointer tracking-[-0.01em] shadow-sm"
          >
            Open Transit Console
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 active:scale-95 transition-all select-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>

        </div>

      </div>

      {/* MOBILE FULL-SCREEN ACCORDION DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white border-t border-zinc-200/80 z-40 overflow-y-auto px-6 py-6 flex flex-col justify-between font-inter antialiased animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Navigation & Modules
            </div>

            {NAV_PILLARS.map((pillar) => {
              const isPillarOpen = mobileActivePillar === pillar.id;

              return (
                <div key={pillar.id} className="border-b border-zinc-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileActivePillar(isPillarOpen ? null : pillar.id)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-zinc-800 hover:text-black select-none cursor-pointer tracking-[-0.01em]"
                  >
                    <span>{pillar.name}</span>
                    <svg
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isPillarOpen ? 'rotate-180 text-black' : ''}`}
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

                  {isPillarOpen && (
                    <div className="flex flex-col gap-1 pl-2 pt-1 pb-2">
                      {pillar.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.route}
                          onClick={(e) => handleLinkClick(e, item)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-md bg-zinc-100 border border-zinc-200/60 flex items-center justify-center shrink-0 text-zinc-800">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-zinc-900 tracking-tight">{item.title}</div>
                            <div className="text-[10px] text-zinc-500 line-clamp-1">{item.subtext}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Bottom Action */}
          <div className="pt-6 border-t border-zinc-200/80 flex flex-col gap-2.5">
            <a
              href="#console"
              onClick={(e) => handleLinkClick(e, { targetId: 'console' })}
              className="w-full py-3 rounded-lg bg-black text-white text-sm font-semibold text-center flex items-center justify-center tracking-[-0.01em] shadow-sm"
            >
              Open Transit Console
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
