import React, { useState } from 'react';
import { Mic2, Landmark, Compass, HelpCircle, Menu, X, BookOpen, Layers } from 'lucide-react';

const Header = ({ activeTab, onSelectTab, onHomeClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div 
          className="header-logo" 
          onClick={() => { if (onHomeClick) onHomeClick(); onSelectTab('home'); }}
        >
          <div className="logo-icon-wrap">
            <Mic2 size={22} />
          </div>
          <div>
            <span>VaaniAccess</span>
          </div>
        </div>
        <span className="gov-emblem-tag">
          <Landmark size={14} style={{ color: '#e65100' }} />
          National Welfare Navigator
        </span>
      </div>

      {/* Desktop navigation */}
      <nav className="nav-links">
        <button 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleNav('home')}
        >
          <Compass size={17} />
          Voice Assistant
        </button>

        <button 
          className={`nav-link ${activeTab === 'schemes' ? 'active' : ''}`}
          onClick={() => handleNav('schemes')}
        >
          <Layers size={17} />
          All Schemes
        </button>

        <button 
          className={`nav-link ${activeTab === 'how-it-works' ? 'active' : ''}`}
          onClick={() => handleNav('how-it-works')}
        >
          <BookOpen size={17} />
          How It Works
        </button>

        <button 
          className={`nav-link ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => handleNav('help')}
        >
          <HelpCircle size={17} />
          Help & FAQs
        </button>
      </nav>

      {/* Mobile menu toggle */}
      <button 
        className="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <Compass size={18} />
            Voice Assistant
          </button>
          <button 
            className={`nav-link ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => handleNav('schemes')}
          >
            <Layers size={18} />
            All Schemes (सभी योजनाएं)
          </button>
          <button 
            className={`nav-link ${activeTab === 'how-it-works' ? 'active' : ''}`}
            onClick={() => handleNav('how-it-works')}
          >
            <BookOpen size={18} />
            How It Works (कैसे काम करता है)
          </button>
          <button 
            className={`nav-link ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => handleNav('help')}
          >
            <HelpCircle size={18} />
            Help & Helplines (सहायता)
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
