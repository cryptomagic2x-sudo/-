import { useEffect, useState, useRef } from "react";
import "@/App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animated Icon Components
const AnimatedIcon = ({ type, className = "" }) => {
  const icons = {
    diamond: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-path" d="M12 2L2 9L12 22L22 9L12 2Z" />
        <path className="icon-shine" d="M12 2L7 9H17L12 2Z" opacity="0.5" />
      </svg>
    ),
    clock: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle className="icon-circle" cx="12" cy="12" r="10" />
        <path className="icon-hand" d="M12 6V12L16 14" />
      </svg>
    ),
    lightning: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-bolt" d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>
    ),
    shield: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-shield" d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
        <path className="icon-check" d="M9 12L11 14L15 10" />
      </svg>
    ),
  };
  return icons[type] || null;
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav data-testid="main-navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FOMO</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Roadmap', 'Evolution', 'Team', 'Portfolio', 'Partners'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">Crypto</a>
            <a href="#" className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">Core</a>
            <a href="#" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all">Utility</a>
          </div>

          <button className="md:hidden text-gray-700 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-btn">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl p-4" data-testid="mobile-menu">
            {['About', 'Roadmap', 'Evolution', 'Team', 'Portfolio', 'Partners'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 font-medium py-2">{item}</a>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <a href="#" className="flex-1 text-center py-2 text-gray-700 font-medium">Crypto</a>
              <a href="#" className="flex-1 text-center py-2 text-gray-700 font-medium">Core</a>
              <a href="#" className="flex-1 text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl">Utility</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Interactive Chart Component
const InteractiveChart = () => {
  const [data, setData] = useState([40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(v => Math.max(20, Math.min(100, v + (Math.random() - 0.5) * 15))));
    }, 2000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="text-gray-900 font-semibold text-lg">Market Overview</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAnimating(!isAnimating)} 
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${isAnimating ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}
          >
            {isAnimating ? 'Live' : 'Paused'}
          </button>
        </div>
      </div>
      <div className="chart-area">
        {data.map((h, i) => (
          <div 
            key={i} 
            className="chart-bar-container"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className={`chart-bar ${hoveredIndex === i ? 'hovered' : ''}`}
              style={{ height: `${h}%` }}
            />
            {hoveredIndex === i && (
              <div className="chart-tooltip">
                ${(h * 1000).toFixed(0)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chart-stats">
        <div className="stat-box">
          <span className="text-gray-500 text-xs">BTC</span>
          <span className="text-gray-900 font-bold">$87,514</span>
          <span className="stat-change positive">+2.4%</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-500 text-xs">ETH</span>
          <span className="text-gray-900 font-bold">$2,961</span>
          <span className="stat-change positive">+1.8%</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-500 text-xs">SOL</span>
          <span className="text-gray-900 font-bold">$123.91</span>
          <span className="stat-change negative">-0.5%</span>
        </div>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden" data-testid="hero-section">
      <div className="hero-background">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Now in Beta v1.1
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" data-testid="hero-title">
              The Future of
              <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Crypto Analytics</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Discover a comprehensive platform combining social engagement, data analytics, and seamless access to crypto projects, NFTs, and more.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2">
                Explore Platform
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">Buy NFT</button>
            </div>

            <div className="flex flex-wrap gap-8">
              {[{ value: '10K+', label: 'Active Users' }, { value: '$50M+', label: 'Trading Volume' }, { value: '666', label: 'NFT Collection' }].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div>
                    <span className="block text-3xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-gray-500 text-sm">{stat.label}</span>
                  </div>
                  {i < 2 && <div className="w-px h-12 bg-gray-200 ml-4"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <InteractiveChart />
            <div className="floating-card top-card">
              <div className="card-icon positive">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div><span className="text-gray-500 text-xs">Portfolio</span><span className="block text-gray-900 font-bold">+24.5%</span></div>
            </div>
            <div className="floating-card bottom-card">
              <div className="card-icon purple">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div><span className="text-gray-500 text-xs">Volume 24h</span><span className="block text-gray-900 font-bold">$101B</span></div>
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
    { icon: 'diamond', title: 'Community-Driven', description: 'Every user influences the project through voting and social engagement.', color: 'emerald' },
    { icon: 'clock', title: '24/7 Support', description: 'Our support never stops. We are here offering guidance every step.', color: 'teal' },
    { icon: 'lightning', title: 'Fast & Efficient', description: 'Launch your project quickly with FOMO tools and support.', color: 'cyan' },
    { icon: 'shield', title: 'Secure & Reliable', description: 'All transactions via secure smart contracts for max protection.', color: 'violet' },
  ];

  return (
    <section id="about" className="py-24 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">About Us</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What is <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">FOMO</span>?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">A cutting-edge platform reshaping how users interact with the crypto world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              FOMO is a cutting-edge platform built to reshape the way users interact with the cryptoworld. 
              Our goal is to create a single, comprehensive ecosystem that combines <strong className="text-gray-900">social engagement</strong>, 
              <strong className="text-gray-900">data analytics</strong>, and <strong className="text-gray-900">seamless access</strong> to crypto projects, NFTs, funds, and more.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Whitepaper
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-animated" data-testid={`feature-card-${index}`}>
                <div className={`feature-icon-animated ${feature.color}`}>
                  <AnimatedIcon type={feature.icon} />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Roadmap Section - Parallel Tasks
const RoadmapSection = () => {
  const tasks = [
    { id: 1, name: 'Platform Architecture', status: 'done', category: 'Development' },
    { id: 2, name: 'Core Team Formation', status: 'done', category: 'Team' },
    { id: 3, name: 'Alpha Version Launch', status: 'done', category: 'Development' },
    { id: 4, name: 'Community Building', status: 'done', category: 'Marketing' },
    { id: 5, name: 'Beta Version v1.0', status: 'done', category: 'Development' },
    { id: 6, name: 'NFT Box 666 Mint', status: 'done', category: 'NFT' },
    { id: 7, name: 'Wallet Integration', status: 'done', category: 'Development' },
    { id: 8, name: 'Analytics Dashboard', status: 'done', category: 'Development' },
    { id: 9, name: 'Beta Version v1.1', status: 'progress', category: 'Development' },
    { id: 10, name: 'OTC Marketplace', status: 'progress', category: 'Development' },
    { id: 11, name: 'Mobile App Development', status: 'progress', category: 'Development' },
    { id: 12, name: 'Partnership Programs', status: 'progress', category: 'Business' },
    { id: 13, name: 'Global Marketing Campaign', status: 'upcoming', category: 'Marketing' },
    { id: 14, name: 'DEX Integration', status: 'upcoming', category: 'Development' },
    { id: 15, name: 'Governance Launch', status: 'upcoming', category: 'DAO' },
    { id: 16, name: 'Staking Mechanism', status: 'upcoming', category: 'DeFi' },
    { id: 17, name: 'Cross-Chain Bridge', status: 'upcoming', category: 'Development' },
    { id: 18, name: 'AI Analytics Engine', status: 'upcoming', category: 'AI' },
  ];

  const [filter, setFilter] = useState('all');
  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const statusConfig = {
    done: { label: 'Completed', color: 'bg-emerald-500', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50' },
    progress: { label: 'In Progress', color: 'bg-amber-500', textColor: 'text-amber-600', bgLight: 'bg-amber-50' },
    upcoming: { label: 'Upcoming', color: 'bg-gray-400', textColor: 'text-gray-500', bgLight: 'bg-gray-100' },
  };

  const stats = {
    done: tasks.filter(t => t.status === 'done').length,
    progress: tasks.filter(t => t.status === 'progress').length,
    upcoming: tasks.filter(t => t.status === 'upcoming').length,
  };

  return (
    <section id="roadmap" className="py-24 bg-gray-50" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Progress</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Project <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Roadmap</span></h2>
          <p className="text-xl text-gray-600">Track our development progress in real-time</p>
        </div>

        {/* Progress Bar */}
        <div className="roadmap-progress-bar mb-8">
          <div className="progress-fill" style={{ width: `${(stats.done / tasks.length) * 100}%` }}></div>
          <span className="progress-label">{Math.round((stats.done / tasks.length) * 100)}% Complete</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[{ key: 'all', label: 'All Tasks' }, { key: 'done', label: `Completed (${stats.done})` }, { key: 'progress', label: `In Progress (${stats.progress})` }, { key: 'upcoming', label: `Upcoming (${stats.upcoming})` }].map((f) => (
            <button 
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="roadmap-tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`roadmap-task-card ${task.status}`}>
              <div className="task-status-dot">
                <span className={`dot ${statusConfig[task.status].color}`}></span>
              </div>
              <div className="task-content">
                <span className={`task-category ${statusConfig[task.status].bgLight} ${statusConfig[task.status].textColor}`}>{task.category}</span>
                <h4 className="task-name">{task.name}</h4>
              </div>
              <span className={`task-status-badge ${statusConfig[task.status].bgLight} ${statusConfig[task.status].textColor}`}>
                {statusConfig[task.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// User Evolution Section
const EvolutionSection = () => {
  const levels = [
    { name: 'Stellar Awakening', level: 1, xp: '0 - 1,000', perks: 'Basic Access' },
    { name: 'Cosmic Explorer', level: 2, xp: '1,000 - 5,000', perks: 'Early Access' },
    { name: 'Galactic Navigator', level: 3, xp: '5,000 - 15,000', perks: 'Priority Support' },
    { name: 'Celestial Master', level: 4, xp: '15,000 - 50,000', perks: 'Exclusive Events' },
    { name: 'Astral Sage', level: 5, xp: '50,000 - 150,000', perks: 'Governance Rights' },
    { name: 'Universal Enlightenment', level: 6, xp: '150,000+', perks: 'Full Benefits' },
  ];

  return (
    <section id="evolution" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" data-testid="evolution-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-emerald-400 text-sm font-medium mb-4">NFT Journey</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">User <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Evolution</span></h2>
          <p className="text-xl text-gray-400">Progress through levels and unlock exclusive benefits</p>
        </div>

        <div className="evolution-path">
          {levels.map((level, index) => (
            <div key={index} className="evolution-level" data-testid={`evolution-level-${index}`}>
              <div className="evolution-connector">
                <div className="evolution-node">
                  <span className="node-level">{level.level}</span>
                </div>
                {index < levels.length - 1 && <div className="evolution-line"></div>}
              </div>
              <div className="evolution-card">
                <h3 className="evolution-name">{level.name}</h3>
                <div className="evolution-details">
                  <span className="xp-range">{level.xp} XP</span>
                  <span className="perks">{level.perks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const coreTeam = [
    { name: 'Alex Chen', role: 'Founder & CEO', avatar: 'AC' },
    { name: 'Maria Lopez', role: 'CTO', avatar: 'ML' },
    { name: 'David Kim', role: 'Head of Product', avatar: 'DK' },
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Lead Developer', avatar: 'SJ' },
    { name: 'Mike Brown', role: 'UI/UX Designer', avatar: 'MB' },
    { name: 'Emily White', role: 'Marketing Lead', avatar: 'EW' },
    { name: 'James Wilson', role: 'Community Manager', avatar: 'JW' },
    { name: 'Lisa Anderson', role: 'Business Dev', avatar: 'LA' },
    { name: 'Tom Harris', role: 'Smart Contracts', avatar: 'TH' },
  ];

  return (
    <section id="team" className="py-24 bg-white" data-testid="team-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">Our People</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet the <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Team</span></h2>
          <p className="text-xl text-gray-600">The talented people behind FOMO</p>
        </div>

        {/* Core Team */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">Core Team</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => (
              <div key={index} className="team-card-core" data-testid={`core-team-${index}`}>
                <div className="team-avatar-large">
                  <span>{member.avatar}</span>
                </div>
                <h4 className="text-gray-900 font-semibold text-lg mt-4">{member.name}</h4>
                <p className="text-emerald-600 font-medium">{member.role}</p>
                <div className="team-socials">
                  <a href="#" className="social-icon"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="#" className="social-icon"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h3 className="text-center text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">Team Members</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card-member" data-testid={`team-member-${index}`}>
                <div className="team-avatar-small">
                  <span>{member.avatar}</span>
                </div>
                <h4 className="text-gray-900 font-medium text-sm mt-3">{member.name}</h4>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section - Compact
const PortfolioSection = () => {
  const projects = [
    { name: 'Crypto Vault', category: 'DeFi', icon: '🔐', color: 'from-violet-500 to-purple-600' },
    { name: 'NFT Marketplace', category: 'NFT', icon: '🎨', color: 'from-pink-500 to-rose-600' },
    { name: 'Token Launchpad', category: 'Launchpad', icon: '🚀', color: 'from-amber-500 to-orange-600' },
    { name: 'Staking Protocol', category: 'DeFi', icon: '💰', color: 'from-emerald-500 to-teal-600' },
    { name: 'DEX Aggregator', category: 'Exchange', icon: '🔄', color: 'from-blue-500 to-cyan-600' },
    { name: 'Analytics Hub', category: 'Analytics', icon: '📊', color: 'from-indigo-500 to-violet-600' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Work</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Project <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Portfolio</span></h2>
        </div>

        <div className="portfolio-grid-compact">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card-compact" data-testid={`portfolio-card-${index}`}>
              <div className={`portfolio-icon bg-gradient-to-br ${project.color}`}>
                <span>{project.icon}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-gray-900 font-semibold">{project.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partners Section - Larger
const PartnersSection = () => {
  const partners = [
    { name: 'CryptoVenture', tier: 'Gold', desc: 'Leading Crypto VC' },
    { name: 'BlockChain Labs', tier: 'Gold', desc: 'Infrastructure Partner' },
    { name: 'DeFi Alliance', tier: 'Silver', desc: 'DeFi Ecosystem' },
    { name: 'NFT Studios', tier: 'Silver', desc: 'NFT Innovation' },
    { name: 'Token Fund', tier: 'Bronze', desc: 'Investment Partner' },
    { name: 'Web3 Capital', tier: 'Bronze', desc: 'Strategic Investor' },
    { name: 'Crypto Exchange', tier: 'Bronze', desc: 'Trading Partner' },
    { name: 'Chain Protocol', tier: 'Bronze', desc: 'Tech Partner' },
  ];

  const tierStyles = {
    Gold: { gradient: 'from-yellow-400 to-amber-500', badge: 'bg-yellow-50 text-yellow-700' },
    Silver: { gradient: 'from-gray-300 to-gray-400', badge: 'bg-gray-100 text-gray-600' },
    Bronze: { gradient: 'from-amber-600 to-orange-700', badge: 'bg-amber-50 text-amber-700' },
  };

  return (
    <section id="partners" className="py-24 bg-white" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">Our Network</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Strategic <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Partners</span></h2>
          <p className="text-xl text-gray-600">Building the future together with industry leaders</p>
        </div>

        <div className="partners-grid-large">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card-large" data-testid={`partner-card-${index}`}>
              <div className={`partner-logo-large bg-gradient-to-br ${tierStyles[partner.tier].gradient}`}>
                <span>{partner.name.charAt(0)}</span>
              </div>
              <div className="partner-info">
                <h3 className="text-gray-900 font-semibold text-lg">{partner.name}</h3>
                <p className="text-gray-500 text-sm">{partner.desc}</p>
              </div>
              <span className={`partner-tier-badge ${tierStyles[partner.tier].badge}`}>{partner.tier}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Interested in partnering with FOMO?</p>
          <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">Become a Partner</button>
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection = () => (
  <section className="py-24 bg-gray-50" data-testid="community-section">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Join the <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Community</span></h2>
      <p className="text-xl text-gray-600 mb-10">Connect with web3 founders, developers, and crypto enthusiasts from around the world.</p>
      
      <div className="flex justify-center gap-4 mb-12">
        {[{ name: 'Twitter', color: 'bg-gray-900', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
          { name: 'Telegram', color: 'bg-[#0088cc]', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
          { name: 'Discord', color: 'bg-[#5865F2]', icon: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z' }]
          .map((social) => (
            <a key={social.name} href="#" className={`flex items-center gap-3 px-6 py-4 ${social.color} hover:opacity-90 text-white rounded-2xl transition-colors`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
              <span className="font-medium">{social.name}</span>
            </a>
          ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay Updated</h3>
        <div className="flex gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all">Subscribe</button>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center"><span className="text-white font-bold text-lg">F</span></div>
            <span className="text-xl font-bold">FOMO</span>
          </div>
          <p className="text-gray-400">Building the future of crypto analytics</p>
        </div>
        {[{ title: 'Platform', links: ['Crypto', 'Core', 'Utility'] }, { title: 'Resources', links: ['Documentation', 'Whitepaper', 'FAQ'] }, { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Disclaimer'] }].map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-4">{section.title}</h4>
            <div className="space-y-3">{section.links.map((link) => (<a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">{link}</a>))}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© FOMO, 2025. All rights reserved.</p>
        <div className="flex gap-4">
          {['M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'].map((d, i) => (
            <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d}/></svg></a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="App bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <EvolutionSection />
      <TeamSection />
      <PortfolioSection />
      <PartnersSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}

export default App;
