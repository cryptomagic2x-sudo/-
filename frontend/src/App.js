import { useEffect, useState } from "react";
import "@/App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav data-testid="main-navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="logo-glow">
              <span className="text-3xl font-black tracking-wider neon-text">FOMO</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="nav-link" data-testid="nav-about">About</a>
            <a href="#roadmap" className="nav-link" data-testid="nav-roadmap">Roadmap</a>
            <a href="#portfolio" className="nav-link" data-testid="nav-portfolio">Portfolio</a>
            <a href="#partners" className="nav-link" data-testid="nav-partners">Partners</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="nav-btn-outline" data-testid="nav-crypto">Crypto</a>
            <a href="#" className="nav-btn-outline" data-testid="nav-core">Core</a>
            <a href="#" className="nav-btn-primary" data-testid="nav-utility">Utility</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4" data-testid="mobile-menu">
            <div className="flex flex-col gap-4">
              <a href="#about" className="nav-link">About</a>
              <a href="#roadmap" className="nav-link">Roadmap</a>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#partners" className="nav-link">Partners</a>
              <div className="flex gap-3 mt-4">
                <a href="#" className="nav-btn-outline flex-1 text-center">Crypto</a>
                <a href="#" className="nav-btn-outline flex-1 text-center">Core</a>
                <a href="#" className="nav-btn-primary flex-1 text-center">Utility</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="hero-section" data-testid="hero-section">
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="grid-overlay"></div>
        <div className="sun-glow"></div>
        <div className="horizon-line"></div>
        <div className="stars"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center">
          {/* Glitch Title */}
          <h1 className="hero-title" data-testid="hero-title">
            <span className="glitch" data-text="FOMO">FOMO</span>
          </h1>
          
          {/* Tagline */}
          <p className="hero-tagline" data-testid="hero-tagline">
            <span className="tagline-glow">DAO</span>
            <span className="tagline-separator">+</span>
            <span className="tagline-glow">NFT</span>
            <span className="tagline-separator">+</span>
            <span className="tagline-glow">Early Stage</span>
            <span className="tagline-separator">=</span>
            <span className="tagline-highlight">FUTURE</span>
          </p>

          {/* Description */}
          <p className="hero-description" data-testid="hero-description">
            Discover a comprehensive analytics platform designed for the crypto world.
            Access unique tools and services, uniting the entire crypto ecosystem in one place.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta" data-testid="hero-cta">
            <button className="cta-primary">
              <span>Explore Platform</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="cta-secondary">
              <span>Buy NFT</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" data-testid="hero-stats">
            <div className="stat-item">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">$50M+</span>
              <span className="stat-label">Trading Volume</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">666</span>
              <span className="stat-label">NFT Collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" data-testid="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const features = [
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Community-Driven",
      description: "Every user influences the project's development through voting and social engagement."
    },
    {
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Cross-Platform",
      description: "Access various crypto projects, NFTs, and investments in one unified platform."
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Security First",
      description: "All transactions via secure smart contracts, ensuring maximum protection."
    },
    {
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      title: "Advanced Analytics",
      description: "Detailed data on projects and markets to help make well-informed decisions."
    }
  ];

  return (
    <section id="about" className="about-section" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Who We Are</span>
          <h2 className="section-title" data-testid="about-title">
            About <span className="gradient-text">FOMO</span>
          </h2>
          <p className="section-subtitle">
            A cutting-edge platform reshaping how users interact with the crypto world
          </p>
        </div>

        {/* Main Content */}
        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              FOMO is a cutting-edge platform built to reshape the way users interact with 
              the cryptoworld. Our goal is to create a single, comprehensive ecosystem that 
              combines three essential aspects: <strong>social engagement</strong>, 
              <strong>data analytics</strong>, and <strong>seamless access</strong> to crypto 
              projects, NFTs, funds, nodes, and more.
            </p>
            <p className="about-paragraph">
              With a focus on empowering users, FOMO integrates tools for early-stage investments, 
              community involvement, and a secure OTC marketplace, allowing users to explore and 
              manage their crypto investments with ease.
            </p>
            <button className="whitepaper-btn" data-testid="whitepaper-btn">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Whitepaper</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="features-grid" data-testid="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" data-testid={`feature-card-${index}`}>
                <div className="feature-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why FOMO */}
        <div className="why-fomo" data-testid="why-fomo">
          <h3 className="why-title">Why Choose <span className="gradient-text">FOMO</span>?</h3>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">💎</div>
              <h4>Not Just Funding</h4>
              <p>Access to lawyers, accountants, business strategists, and marketing experts.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🕐</div>
              <h4>24/7 Support</h4>
              <p>Our support never stops. We're here offering guidance every step of the way.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⚡</div>
              <h4>Fast & Efficient</h4>
              <p>Launch your project quickly with FOMO's tools and support.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🔒</div>
              <h4>Reliable & Secure</h4>
              <p>Safety of your assets and transparency of every transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Roadmap Section
const RoadmapSection = () => {
  const stages = [
    {
      stage: 1,
      title: "Genesis Phase",
      status: "done",
      items: ["Platform Architecture", "Core Team Formation", "Alpha Version Launch", "Community Building"]
    },
    {
      stage: 2,
      title: "Evolution Phase",
      status: "done",
      items: ["Beta Version v1.0", "NFT Box 666 Mint", "Wallet Integration", "Analytics Dashboard"]
    },
    {
      stage: 3,
      title: "Expansion Phase",
      status: "in-progress",
      items: ["Beta Version v1.1", "OTC Marketplace", "Mobile App Development", "Partnership Programs"]
    },
    {
      stage: 4,
      title: "Acceleration Phase",
      status: "upcoming",
      items: ["Global Marketing Campaign", "DEX Integration", "Governance Launch", "Staking Mechanism"]
    },
    {
      stage: 5,
      title: "Dominance Phase",
      status: "upcoming",
      items: ["Cross-Chain Bridge", "AI Analytics Engine", "Institutional Partners", "Global Expansion"]
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'done': return 'status-done';
      case 'in-progress': return 'status-progress';
      case 'upcoming': return 'status-upcoming';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'done': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'upcoming': return 'Upcoming';
      default: return '';
    }
  };

  return (
    <section id="roadmap" className="roadmap-section" data-testid="roadmap-section">
      <div className="roadmap-bg">
        <div className="roadmap-grid"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Our Journey</span>
          <h2 className="section-title" data-testid="roadmap-title">
            Project <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="section-subtitle">
            Follow our progress as we build the future of crypto
          </p>
        </div>

        {/* Status Legend */}
        <div className="roadmap-legend" data-testid="roadmap-legend">
          <div className="legend-item">
            <span className="legend-dot done"></span>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot progress"></span>
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot upcoming"></span>
            <span>Upcoming</span>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="roadmap-timeline" data-testid="roadmap-timeline">
          {stages.map((stage, index) => (
            <div key={index} className={`timeline-item ${getStatusClass(stage.status)}`} data-testid={`roadmap-stage-${index}`}>
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <span>{stage.stage}</span>
                </div>
                {index < stages.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{stage.title}</h3>
                  <span className={`timeline-status ${stage.status}`}>{getStatusLabel(stage.status)}</span>
                </div>
                <ul className="timeline-items">
                  {stage.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const projects = [
    { name: "Crypto Vault", category: "DeFi", image: "vault" },
    { name: "NFT Marketplace", category: "NFT", image: "nft" },
    { name: "Token Launchpad", category: "Launchpad", image: "launch" },
    { name: "Staking Protocol", category: "DeFi", image: "stake" },
    { name: "DEX Aggregator", category: "Exchange", image: "dex" },
    { name: "Analytics Hub", category: "Analytics", image: "analytics" }
  ];

  return (
    <section id="portfolio" className="portfolio-section" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Our Work</span>
          <h2 className="section-title" data-testid="portfolio-title">
            Project <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="section-subtitle">
            Explore our ecosystem of cutting-edge crypto solutions
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid" data-testid="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card" data-testid={`portfolio-card-${index}`}>
              <div className="portfolio-image">
                <div className={`portfolio-placeholder ${project.image}`}>
                  <div className="placeholder-icon">
                    {project.image === 'vault' && '🔐'}
                    {project.image === 'nft' && '🎨'}
                    {project.image === 'launch' && '🚀'}
                    {project.image === 'stake' && '💰'}
                    {project.image === 'dex' && '🔄'}
                    {project.image === 'analytics' && '📊'}
                  </div>
                </div>
                <div className="portfolio-overlay">
                  <button className="portfolio-btn">View Project</button>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-name">{project.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partners Section
const PartnersSection = () => {
  const partners = [
    { name: "CryptoVenture", tier: "Gold" },
    { name: "BlockChain Labs", tier: "Gold" },
    { name: "DeFi Alliance", tier: "Silver" },
    { name: "NFT Studios", tier: "Silver" },
    { name: "Token Fund", tier: "Bronze" },
    { name: "Web3 Capital", tier: "Bronze" },
    { name: "Crypto Exchange", tier: "Bronze" },
    { name: "Chain Protocol", tier: "Bronze" }
  ];

  return (
    <section id="partners" className="partners-section" data-testid="partners-section">
      <div className="partners-bg">
        <div className="partners-gradient"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Our Network</span>
          <h2 className="section-title" data-testid="partners-title">
            Strategic <span className="gradient-text">Partners</span>
          </h2>
          <p className="section-subtitle">
            Building the future together with industry leaders
          </p>
        </div>

        {/* Partners Grid */}
        <div className="partners-grid" data-testid="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className={`partner-card ${partner.tier.toLowerCase()}`} data-testid={`partner-card-${index}`}>
              <div className="partner-logo">
                <span className="partner-initial">{partner.name.charAt(0)}</span>
              </div>
              <span className="partner-name">{partner.name}</span>
              <span className={`partner-tier ${partner.tier.toLowerCase()}`}>{partner.tier} Partner</span>
            </div>
          ))}
        </div>

        {/* Become Partner CTA */}
        <div className="partner-cta" data-testid="partner-cta">
          <p>Interested in partnering with FOMO?</p>
          <button className="cta-secondary">Become a Partner</button>
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection = () => {
  return (
    <section className="community-section" data-testid="community-section">
      <div className="community-bg">
        <div className="community-waves"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="community-content">
          <h2 className="community-title" data-testid="community-title">
            Join the <span className="gradient-text">Community</span>
          </h2>
          <p className="community-description">
            Learn from others, share your work, and extend your tool set with a diverse group 
            of web3 founders, community managers, growth hackers, marketers, and more.
          </p>
          
          {/* Social Links */}
          <div className="social-links" data-testid="social-links">
            <a href="#" className="social-link twitter" data-testid="social-twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link telegram" data-testid="social-telegram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Telegram</span>
            </a>
            <a href="#" className="social-link discord" data-testid="social-discord">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              <span>Discord</span>
            </a>
          </div>

          {/* Newsletter */}
          <div className="newsletter" data-testid="newsletter">
            <h3>Stay Updated</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-logo">FOMO</span>
            <p className="footer-tagline">Building the future of crypto</p>
          </div>

          {/* Links */}
          <div className="footer-links">
            <h4>Platform</h4>
            <a href="#">Crypto</a>
            <a href="#">Core</a>
            <a href="#">Utility</a>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Whitepaper</a>
            <a href="#">FAQ</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© FOMO, 2025. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="Telegram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App retrowave-theme">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <PortfolioSection />
      <PartnersSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}

export default App;
