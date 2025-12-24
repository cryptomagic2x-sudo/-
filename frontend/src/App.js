import { useEffect, useState, useRef, useCallback } from "react";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ==================== DRAWER CARD COMPONENT (Horizontal Fan - like browsing cards with finger) ====================
const ProjectDrawer = ({ cards }) => {
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(0.5);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setMouseX(Math.max(0, Math.min(1, x)));
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMouseX(0.5);
    setHoveredIndex(null);
  };

  const getCardStyle = (index, total) => {
    // Horizontal fan spread - like flipping through cards with finger
    const stackOffset = 6; // pixels between stacked cards (when not hovering)
    const fanSpread = 140; // horizontal spread when hovering
    
    let translateX, translateY, rotateY, rotateZ, scale, zIndex;
    
    if (isHovering) {
      // Calculate position based on mouse X
      // mouseX = 0 (left) -> focus left cards
      // mouseX = 1 (right) -> focus right cards
      const focusIndex = mouseX * (total - 1);
      const distanceFromFocus = index - focusIndex;
      
      // Horizontal spread - cards fan out to the side
      translateX = distanceFromFocus * fanSpread;
      
      // Slight vertical offset for depth perception
      translateY = Math.abs(distanceFromFocus) * 8;
      
      // Rotate cards like a fan (perspective from above)
      rotateY = distanceFromFocus * -15;
      rotateZ = distanceFromFocus * 2;
      
      // Scale: focused card slightly larger
      const focusDistance = Math.abs(distanceFromFocus);
      scale = hoveredIndex === index ? 1.05 : 1 - focusDistance * 0.03;
      
      // Z-index: card closest to focus on top
      zIndex = hoveredIndex === index ? 100 : Math.round(50 - focusDistance * 10);
    } else {
      // Stacked state - slight offset to show it's a stack
      translateX = index * stackOffset;
      translateY = index * 3;
      rotateY = 0;
      rotateZ = index * 0.5;
      scale = 1 - index * 0.015;
      zIndex = total - index;
    }
    
    // Z translation for 3D effect
    const translateZ = hoveredIndex === index ? 50 : isHovering ? -Math.abs(index - mouseX * (total - 1)) * 20 : 0;
    
    return {
      transform: `
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `,
      zIndex,
      opacity: isHovering && hoveredIndex !== null && hoveredIndex !== index ? 0.8 : 1,
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="drawer-empty">
        <p>No projects yet. Add cards from Admin panel.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="drawer-container-horizontal"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="project-drawer"
    >
      <div className="drawer-fan">
        {cards.map((card, index) => (
          <a
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`drawer-card-fan ${hoveredIndex === index ? 'hovered' : ''}`}
            style={getCardStyle(index, cards.length)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-testid={`drawer-card-${index}`}
          >
            <div className="drawer-card-content">
              <img 
                src={card.image_url.startsWith('/') ? `${BACKEND_URL}${card.image_url}` : card.image_url} 
                alt={card.title}
                loading="lazy"
              />
              <div className="drawer-card-overlay">
                <div className="drawer-card-info">
                  <span className="drawer-card-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="drawer-card-name">{card.title}</span>
                  <svg className="drawer-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="drawer-hint-horizontal">Move mouse to browse • Click to open</p>
    </div>
  );
};

// ==================== ADMIN PANEL ====================
const AdminPanel = ({ isOpen, onClose, cards, onCardsUpdate }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', link: '', image_url: '', order: 0 });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ title: '', link: '', image_url: '', order: cards.length });
    setEditingCard(null);
    setError('');
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ title: card.title, link: card.link, image_url: card.image_url, order: card.order });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload PNG, JPEG, or WebP image');
      return;
    }

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image_url: response.data.url }));
      setError('');
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link || !formData.image_url) {
      setError('All fields are required');
      return;
    }

    try {
      if (editingCard) {
        await axios.put(`${API}/drawer-cards/${editingCard.id}`, formData);
      } else {
        await axios.post(`${API}/drawer-cards`, formData);
      }
      onCardsUpdate();
      resetForm();
    } catch (err) {
      setError('Failed to save card');
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;
    try {
      await axios.delete(`${API}/drawer-cards/${cardId}`);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to delete card');
    }
  };

  const moveCard = async (cardId, direction) => {
    const index = cards.findIndex(c => c.id === cardId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const newOrders = cards.map((card, i) => {
      if (i === index) return { id: card.id, order: newIndex };
      if (i === newIndex) return { id: card.id, order: index };
      return { id: card.id, order: i };
    });

    try {
      await axios.post(`${API}/drawer-cards/reorder`, newOrders);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to reorder');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={e => e.stopPropagation()} data-testid="admin-panel">
        <div className="admin-header">
          <h2>Drawer Cards Admin</h2>
          <button onClick={onClose} className="admin-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format Info */}
        <div className="admin-info">
          <strong>Image Format:</strong> PNG or WebP recommended<br/>
          <strong>Size:</strong> 1200x800px (3:2 ratio) for best results
        </div>

        {error && <div className="admin-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project name"
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input
              type="url"
              value={formData.link}
              onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                id="image-upload"
              />
              <label htmlFor="image-upload" className="upload-btn">
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </label>
              {formData.image_url && (
                <div className="image-preview">
                  <img src={formData.image_url.startsWith('/') ? `${BACKEND_URL}${formData.image_url}` : formData.image_url} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingCard ? 'Update Card' : 'Add Card'}
            </button>
            {editingCard && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Cards List */}
        <div className="admin-cards-list">
          <h3>Existing Cards ({cards.length})</h3>
          {cards.map((card, index) => (
            <div key={card.id} className="admin-card-item">
              <div className="card-preview">
                <img src={card.image_url.startsWith('/') ? `${BACKEND_URL}${card.image_url}` : card.image_url} alt={card.title} />
              </div>
              <div className="card-info">
                <strong>{card.title}</strong>
                <span className="card-link">{card.link}</span>
              </div>
              <div className="card-actions">
                <button onClick={() => moveCard(card.id, 'up')} disabled={index === 0} title="Move up">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => moveCard(card.id, 'down')} disabled={index === cards.length - 1} title="Move down">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button onClick={() => handleEdit(card)} title="Edit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(card.id)} className="btn-danger" title="Delete">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== ANIMATED ICONS ====================
const AnimatedIcon = ({ type, className = "" }) => {
  const icons = {
    diamond: <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path className="icon-path" d="M12 2L2 9L12 22L22 9L12 2Z" /><path className="icon-shine" d="M12 2L7 9H17L12 2Z" opacity="0.5" /></svg>,
    clock: <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle className="icon-circle" cx="12" cy="12" r="10" /><path className="icon-hand" d="M12 6V12L16 14" /></svg>,
    lightning: <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path className="icon-bolt" d="M13 2L3 14H12L11 22L21 10H12L13 2Z" /></svg>,
    shield: <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path className="icon-shield" d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" /><path className="icon-check" d="M9 12L11 14L15 10" /></svg>,
  };
  return icons[type] || null;
};

// ==================== NAVIGATION ====================
const Navigation = ({ onAdminClick }) => {
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
            {['About', 'Projects', 'Roadmap', 'Evolution', 'Team', 'Partners'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onAdminClick} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors" data-testid="admin-btn">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
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
            {['About', 'Projects', 'Roadmap', 'Evolution', 'Team', 'Partners'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 font-medium py-2">{item}</a>
            ))}
            <button onClick={onAdminClick} className="block w-full text-left text-gray-700 font-medium py-2">Admin Panel</button>
          </div>
        )}
      </div>
    </nav>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = ({ drawerCards }) => (
  <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden" data-testid="hero-section">
    <div className="hero-background">
      <div className="hero-blob blob-1"></div>
      <div className="hero-blob blob-2"></div>
      <div className="hero-blob blob-3"></div>
      <div className="hero-grid"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Now in Beta v1.1
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" data-testid="hero-title">
          The Future of
          <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Crypto Analytics</span>
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Discover a comprehensive platform combining social engagement, data analytics, and seamless access to crypto projects.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2">
            Explore Platform
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">Buy NFT</button>
        </div>
      </div>

      {/* PROJECT DRAWER - "Галочка" */}
      <div id="projects" className="py-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Our Projects</h2>
        <p className="text-gray-500 text-center mb-8">Explore our portfolio</p>
        <ProjectDrawer cards={drawerCards} />
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {[{ value: '10K+', label: 'Active Users' }, { value: '$50M+', label: 'Trading Volume' }, { value: '666', label: 'NFT Collection' }].map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="text-center">
              <span className="block text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
            {i < 2 && <div className="w-px h-12 bg-gray-200 ml-4"></div>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== ABOUT SECTION ====================
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <div key={index} className="feature-card-animated">
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

// ==================== ROADMAP SECTION ====================
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

  const stats = { done: tasks.filter(t => t.status === 'done').length, progress: tasks.filter(t => t.status === 'progress').length, upcoming: tasks.filter(t => t.status === 'upcoming').length };

  return (
    <section id="roadmap" className="py-24 bg-gray-50" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Progress</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Project <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Roadmap</span></h2>
        </div>

        <div className="roadmap-progress-bar mb-8">
          <div className="progress-fill" style={{ width: `${(stats.done / tasks.length) * 100}%` }}></div>
          <span className="progress-label">{Math.round((stats.done / tasks.length) * 100)}% Complete</span>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[{ key: 'all', label: 'All' }, { key: 'done', label: `Done (${stats.done})` }, { key: 'progress', label: `Progress (${stats.progress})` }, { key: 'upcoming', label: `Upcoming (${stats.upcoming})` }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="roadmap-tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`roadmap-task-card ${task.status}`}>
              <div className="task-status-dot"><span className={`dot ${statusConfig[task.status].color}`}></span></div>
              <div className="task-content">
                <span className={`task-category ${statusConfig[task.status].bgLight} ${statusConfig[task.status].textColor}`}>{task.category}</span>
                <h4 className="task-name">{task.name}</h4>
              </div>
              <span className={`task-status-badge ${statusConfig[task.status].bgLight} ${statusConfig[task.status].textColor}`}>{statusConfig[task.status].label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== EVOLUTION SECTION ====================
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
        </div>
        <div className="evolution-path">
          {levels.map((level, index) => (
            <div key={index} className="evolution-level">
              <div className="evolution-connector">
                <div className="evolution-node"><span className="node-level">{level.level}</span></div>
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

// ==================== TEAM SECTION ====================
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
        </div>
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">Core Team</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => (
              <div key={index} className="team-card-core">
                <div className="team-avatar-large"><span>{member.avatar}</span></div>
                <h4 className="text-gray-900 font-semibold text-lg mt-4">{member.name}</h4>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-lg font-semibold text-gray-500 uppercase tracking-wider mb-8">Team Members</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card-member">
                <div className="team-avatar-small"><span>{member.avatar}</span></div>
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

// ==================== PARTNERS SECTION ====================
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
    <section id="partners" className="py-24 bg-gray-50" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">Our Network</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Strategic <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Partners</span></h2>
        </div>
        <div className="partners-grid-large">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card-large">
              <div className={`partner-logo-large bg-gradient-to-br ${tierStyles[partner.tier].gradient}`}><span>{partner.name.charAt(0)}</span></div>
              <div className="partner-info">
                <h3 className="text-gray-900 font-semibold text-lg">{partner.name}</h3>
                <p className="text-gray-500 text-sm">{partner.desc}</p>
              </div>
              <span className={`partner-tier-badge ${tierStyles[partner.tier].badge}`}>{partner.tier}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">Become a Partner</button>
        </div>
      </div>
    </section>
  );
};

// ==================== COMMUNITY & FOOTER ====================
const CommunitySection = () => (
  <section className="py-24 bg-white" data-testid="community-section">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Join the <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Community</span></h2>
      <p className="text-xl text-gray-600 mb-10">Connect with web3 founders, developers, and crypto enthusiasts.</p>
      <div className="flex justify-center gap-4 mb-12">
        {[{ name: 'Twitter', color: 'bg-gray-900', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
          { name: 'Telegram', color: 'bg-[#0088cc]', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' }]
          .map((social) => (
            <a key={social.name} href="#" className={`flex items-center gap-3 px-6 py-4 ${social.color} hover:opacity-90 text-white rounded-2xl transition-colors`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
              <span className="font-medium">{social.name}</span>
            </a>
          ))}
      </div>
      <div className="bg-gray-50 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay Updated</h3>
        <div className="flex gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl">Subscribe</button>
        </div>
      </div>
    </div>
  </section>
);

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
      </div>
    </div>
  </footer>
);

// ==================== MAIN APP ====================
function App() {
  const [drawerCards, setDrawerCards] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${API}/drawer-cards`);
      setDrawerCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="App bg-white">
      <Navigation onAdminClick={() => setIsAdminOpen(true)} />
      <HeroSection drawerCards={drawerCards} />
      <AboutSection />
      <RoadmapSection />
      <EvolutionSection />
      <TeamSection />
      <PartnersSection />
      <CommunitySection />
      <Footer />
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        cards={drawerCards} 
        onCardsUpdate={fetchCards} 
      />
    </div>
  );
}

export default App;
