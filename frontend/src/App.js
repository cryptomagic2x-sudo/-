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
    <nav data-testid="main-navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FOMO</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors" data-testid="nav-about">About</a>
            <a href="#roadmap" className="text-gray-600 hover:text-gray-900 font-medium transition-colors" data-testid="nav-roadmap">Roadmap</a>
            <a href="#portfolio" className="text-gray-600 hover:text-gray-900 font-medium transition-colors" data-testid="nav-portfolio">Portfolio</a>
            <a href="#partners" className="text-gray-600 hover:text-gray-900 font-medium transition-colors" data-testid="nav-partners">Partners</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors" data-testid="nav-crypto">Crypto</a>
            <a href="#" className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors" data-testid="nav-core">Core</a>
            <a href="#" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all" data-testid="nav-utility">Utility</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 p-2"
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
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 bg-white rounded-2xl shadow-xl mt-2 p-4" data-testid="mobile-menu">
            <div className="flex flex-col gap-3">
              <a href="#about" className="text-gray-700 font-medium py-2">About</a>
              <a href="#roadmap" className="text-gray-700 font-medium py-2">Roadmap</a>
              <a href="#portfolio" className="text-gray-700 font-medium py-2">Portfolio</a>
              <a href="#partners" className="text-gray-700 font-medium py-2">Partners</a>
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <a href="#" className="flex-1 text-center py-2 text-gray-700 font-medium">Crypto</a>
                <a href="#" className="flex-1 text-center py-2 text-gray-700 font-medium">Core</a>
                <a href="#" className="flex-1 text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl">Utility</a>
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
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden" data-testid="hero-section">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Now in Beta v1.1
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" data-testid="hero-title">
              The Future of
              <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Crypto Analytics
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl" data-testid="hero-description">
              Discover a comprehensive platform combining social engagement, 
              data analytics, and seamless access to crypto projects, NFTs, and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12" data-testid="hero-cta">
              <button className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2">
                Explore Platform
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                Buy NFT
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8" data-testid="hero-stats">
              <div>
                <span className="block text-3xl font-bold text-gray-900">10K+</span>
                <span className="text-gray-500 text-sm">Active Users</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <span className="block text-3xl font-bold text-gray-900">$50M+</span>
                <span className="text-gray-500 text-sm">Trading Volume</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <span className="block text-3xl font-bold text-gray-900">666</span>
                <span className="text-gray-500 text-sm">NFT Collection</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-900 font-semibold text-lg">Market Overview</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg">Live</span>
                </div>
                {/* Fake Chart */}
                <div className="h-48 bg-gradient-to-b from-emerald-50 to-white rounded-2xl mb-6 flex items-end justify-around px-4 pb-4">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="w-4 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-teal-500" style={{height: `${h}%`}}></div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-gray-500 text-xs">BTC</span>
                    <span className="block text-gray-900 font-bold">$87,514</span>
                    <span className="text-emerald-500 text-xs">+2.4%</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-gray-500 text-xs">ETH</span>
                    <span className="block text-gray-900 font-bold">$2,961</span>
                    <span className="text-emerald-500 text-xs">+1.8%</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-gray-500 text-xs">SOL</span>
                    <span className="block text-gray-900 font-bold">$123.91</span>
                    <span className="text-red-500 text-xs">-0.5%</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Portfolio</span>
                    <span className="block text-gray-900 font-bold">+24.5%</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Volume 24h</span>
                    <span className="block text-gray-900 font-bold">$101B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      description: "Every user influences the project's development through voting and social engagement.",
      color: "emerald"
    },
    {
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Cross-Platform",
      description: "Access various crypto projects, NFTs, and investments in one unified platform.",
      color: "teal"
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Security First",
      description: "All transactions via secure smart contracts, ensuring maximum protection.",
      color: "cyan"
    },
    {
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      title: "Advanced Analytics",
      description: "Detailed data on projects and markets to help make well-informed decisions.",
      color: "violet"
    }
  ];

  const colorClasses = {
    emerald: "bg-emerald-50 text-emerald-600",
    teal: "bg-teal-50 text-teal-600",
    cyan: "bg-cyan-50 text-cyan-600",
    violet: "bg-violet-50 text-violet-600"
  };

  return (
    <section id="about" className="py-24 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">About Us</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="about-title">
            What is <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">FOMO</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A cutting-edge platform reshaping how users interact with the crypto world
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              FOMO is a cutting-edge platform built to reshape the way users interact with 
              the cryptoworld. Our goal is to create a single, comprehensive ecosystem that 
              combines three essential aspects: <strong className="text-gray-900">social engagement</strong>, 
              <strong className="text-gray-900">data analytics</strong>, and <strong className="text-gray-900">seamless access</strong> to crypto 
              projects, NFTs, funds, nodes, and more.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              With a focus on empowering users, FOMO integrates tools for early-stage investments, 
              community involvement, and a secure OTC marketplace.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-colors" data-testid="whitepaper-btn">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Whitepaper
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4" data-testid="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow" data-testid={`feature-card-${index}`}>
                <div className={`w-12 h-12 rounded-xl ${colorClasses[feature.color]} flex items-center justify-center mb-4`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why FOMO */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12" data-testid="why-fomo">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Why Choose FOMO?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "💎", title: "Not Just Funding", desc: "Access to lawyers, accountants, strategists, and marketing experts." },
              { icon: "🕐", title: "24/7 Support", desc: "Our support never stops. We're here every step of the way." },
              { icon: "⚡", title: "Fast & Efficient", desc: "Launch your project quickly with FOMO's tools and support." },
              { icon: "🔐", title: "Reliable & Secure", desc: "Safety of your assets and transparency of every transaction." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
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

  const getStatusStyles = (status) => {
    switch (status) {
      case 'done': return { dot: 'bg-emerald-500', line: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-600', label: 'Completed' };
      case 'in-progress': return { dot: 'bg-amber-500 animate-pulse', line: 'bg-gradient-to-b from-amber-500 to-gray-200', badge: 'bg-amber-50 text-amber-600', label: 'In Progress' };
      case 'upcoming': return { dot: 'bg-gray-300', line: 'bg-gray-200', badge: 'bg-gray-100 text-gray-500', label: 'Upcoming' };
      default: return {};
    }
  };

  return (
    <section id="roadmap" className="py-24 bg-gray-50" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Journey</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="roadmap-title">
            Project <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-600">Follow our progress as we build the future of crypto</p>
        </div>

        {/* Status Legend */}
        <div className="flex justify-center gap-8 mb-12" data-testid="roadmap-legend">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-gray-600 text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600 text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="text-gray-600 text-sm">Upcoming</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" data-testid="roadmap-timeline">
          {/* Horizontal Line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div className="h-full bg-emerald-500 rounded-full" style={{width: '45%'}}></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {stages.map((stage, index) => {
              const styles = getStatusStyles(stage.status);
              return (
                <div key={index} className="relative" data-testid={`roadmap-stage-${index}`}>
                  {/* Dot */}
                  <div className="hidden lg:flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${styles.dot} flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 relative`}>
                      {stage.stage}
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full ${styles.dot} flex items-center justify-center text-white font-bold`}>
                        {stage.stage}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>{styles.label}</span>
                    </div>
                    <div className="hidden lg:block">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${styles.badge} mb-3`}>{styles.label}</span>
                    </div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-4">{stage.title}</h3>
                    <ul className="space-y-2">
                      {stage.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className={`w-4 h-4 flex-shrink-0 ${stage.status === 'done' ? 'text-emerald-500' : stage.status === 'in-progress' ? 'text-amber-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const projects = [
    { name: "Crypto Vault", category: "DeFi", icon: "🔐", color: "from-violet-500 to-purple-600" },
    { name: "NFT Marketplace", category: "NFT", icon: "🎨", color: "from-pink-500 to-rose-600" },
    { name: "Token Launchpad", category: "Launchpad", icon: "🚀", color: "from-amber-500 to-orange-600" },
    { name: "Staking Protocol", category: "DeFi", icon: "💰", color: "from-emerald-500 to-teal-600" },
    { name: "DEX Aggregator", category: "Exchange", icon: "🔄", color: "from-blue-500 to-cyan-600" },
    { name: "Analytics Hub", category: "Analytics", icon: "📊", color: "from-indigo-500 to-violet-600" }
  ];

  return (
    <section id="portfolio" className="py-24 bg-white" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">Our Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="portfolio-title">
            Project <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600">Explore our ecosystem of cutting-edge crypto solutions</p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300" data-testid={`portfolio-card-${index}`}>
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Project
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-gray-900 font-semibold text-lg mt-1">{project.name}</h3>
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

  const tierColors = {
    Gold: "from-yellow-400 to-amber-500",
    Silver: "from-gray-300 to-gray-400",
    Bronze: "from-amber-600 to-orange-700"
  };

  return (
    <section id="partners" className="py-24 bg-gray-50" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Network</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="partners-title">
            Strategic <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-gray-600">Building the future together with industry leaders</p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100" data-testid={`partner-card-${index}`}>
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tierColors[partner.tier]} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-xl">{partner.name.charAt(0)}</span>
              </div>
              <h3 className="text-gray-900 font-semibold mb-1">{partner.name}</h3>
              <span className="text-xs text-gray-500">{partner.tier} Partner</span>
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div className="text-center mt-12" data-testid="partner-cta">
          <p className="text-gray-600 mb-4">Interested in partnering with FOMO?</p>
          <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection = () => {
  return (
    <section className="py-24 bg-white" data-testid="community-section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="community-title">
          Join the <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Community</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Learn from others, share your work, and extend your tool set with a diverse group 
          of web3 founders, community managers, growth hackers, marketers, and more.
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12" data-testid="social-links">
          <a href="#" className="flex items-center gap-3 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl transition-colors" data-testid="social-twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="font-medium">Twitter</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl transition-colors" data-testid="social-telegram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="font-medium">Telegram</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-4 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-2xl transition-colors" data-testid="social-discord">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
            </svg>
            <span className="font-medium">Discord</span>
          </a>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-50 rounded-3xl p-8" data-testid="newsletter">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates and insights.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FOMO</span>
            </div>
            <p className="text-gray-400">Building the future of crypto analytics</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Crypto</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Core</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Utility</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Whitepaper</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© FOMO, 2025. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
    <div className="App bg-white">
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
