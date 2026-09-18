import React, { useState } from 'react';
import { 
  Mic, 
  Search, 
  GraduationCap, 
  Tractor, 
  Store, 
  HeartPulse, 
  Home as HomeIcon, 
  Wrench, 
  Sparkles,
  ShieldCheck,
  Zap,
  Volume2,
  Tablet
} from 'lucide-react';

const Home = ({ onStartListening, onSearchText }) => {
  const [typedText, setTypedText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typedText.trim()) {
      onSearchText(typedText.trim());
    }
  };

  const quickPrompts = [
    {
      icon: <Tablet size={22} color="#1a73e8" />,
      bg: '#e8f0fe',
      title: 'Free Tablet Yojana',
      text: 'Mujhe padhai ke liye free tablet / smartphone yojana chahiye',
      category: 'Education'
    },
    {
      icon: <GraduationCap size={22} color="#1a73e8" />,
      bg: '#e8f0fe',
      title: 'College Scholarship',
      text: 'Main college student hoon, mujhe scholarship chahiye',
      category: 'Education'
    },
    {
      icon: <Tractor size={22} color="#137333" />,
      bg: '#e6f4ea',
      title: 'PM Kisan Sahayata',
      text: 'Main kisan hoon, kheti ke liye aarthik sahayata chahiye',
      category: 'Agriculture'
    },
    {
      icon: <Store size={22} color="#e65100" />,
      bg: '#fff3e0',
      title: 'Street Vendor Loan',
      text: 'Main thela lagata hoon, mujhe vyapar ke liye loan chahiye',
      category: 'Business'
    },
    {
      icon: <HeartPulse size={22} color="#00838f" />,
      bg: '#e0f7fa',
      title: 'Free Hospital Treatment',
      text: 'Mujhe hospital mein muft ilaj ke liye Ayushman card chahiye',
      category: 'Healthcare'
    },
    {
      icon: <HomeIcon size={22} color="#6a1b9a" />,
      bg: '#f3e5f5',
      title: 'Pucca House Subsidy',
      text: 'Mujhe apna pucca makan banane ke liye aarthik sahayata chahiye',
      category: 'Housing'
    },
    {
      icon: <Wrench size={22} color="#b45309" />,
      bg: '#fef3c7',
      title: 'Artisan Toolkit & Loan',
      text: 'Main karigar / darzi hoon, mujhe vishwakarma toolkit aur loan chahiye',
      category: 'Artisans'
    }
  ];

  return (
    <div className="main-content">
      {/* Hero Badge */}
      <div className="mb-2">
        <span className="badge badge-success" style={{ gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
          <Sparkles size={15} />
          AI-Powered Voice Scheme Navigator
        </span>
      </div>

      {/* Main Titles */}
      <div className="text-center mb-3">
        <h1 className="mb-1" style={{ color: '#0f172a' }}>
          सरकारी योजनाएँ, अब <span style={{ color: 'var(--primary)' }}>आपकी आवाज़</span> में।
        </h1>
        <p style={{ fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto' }}>
          बस अपनी ज़रूरत बोलें या लिखें। VaaniAccess आपकी पात्रता समझकर सबसे सही सरकारी योजना और आवेदन के चरण बताएगा।
        </p>
      </div>

      {/* Hero Big Voice Button */}
      <div className="mic-hero-container">
        <button 
          className="btn-mic" 
          onClick={onStartListening} 
          title="बोलकर पूछें (Click to Speak)"
          aria-label="Start Voice Recognition"
        >
          <Mic size={52} />
        </button>
        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
            🎙 माइक दबाकर बोलें
          </h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
            हिंदी, English या Hinglish में अपनी बात कहें
          </span>
        </div>
      </div>

      {/* Text Omnibox Search Bar */}
      <div className="search-bar-wrap">
        <form onSubmit={handleSubmit} className="search-bar">
          <Search size={20} style={{ color: '#64748b', marginRight: '0.5rem' }} />
          <input 
            type="text"
            placeholder="या यहाँ टाइप करें: 'Main student hoon, scholarship chahiye'..."
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
          />
          <div className="search-bar-actions">
            <button 
              type="button" 
              className="search-mic-btn" 
              onClick={onStartListening}
              title="Speak voice input"
            >
              <Mic size={20} />
            </button>
            <button type="submit" className="search-submit-btn">
              खोजें (Search)
            </button>
          </div>
        </form>
      </div>

      {/* Quick Example Prompts */}
      <div className="w-full mt-2" style={{ maxWidth: '820px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} style={{ color: '#e65100' }} />
            अक्सर पूछे जाने वाले सवाल (Click to try):
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
            Quick Prompts
          </span>
        </div>

        <div className="chip-grid">
          {quickPrompts.map((p, idx) => (
            <div 
              key={idx} 
              className="quick-chip"
              onClick={() => onSearchText(p.text)}
              role="button"
              tabIndex={0}
            >
              <div className="chip-icon" style={{ backgroundColor: p.bg }}>
                {p.icon}
              </div>
              <div className="chip-text">
                <strong>{p.title}</strong>
                <span>"{p.text}"</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="w-full mt-4" style={{ maxWidth: '820px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ marginBottom: 0, padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e8f0fe', color: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Volume2 size={22} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>आवाज़ से मार्गदर्शन</strong>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>योजना की सभी शर्तें और कदम बोलकर सुनाए जाते हैं।</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0, padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e6f4ea', color: '#137333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={22} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>स्मार्ट AI प्रोफाइलिंग</strong>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>कठिन नियमों को सरल भाषा में आपके लिए प्रोसेस करता है।</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0, padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>सत्यापित सरकारी पोर्टल</strong>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>सीधे आधिकारिक सरकारी वेबसाइट से आवेदन करें।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
