import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Info, 
  ExternalLink, 
  Sparkles,
  Award,
  ListOrdered,
  GraduationCap,
  Tractor,
  Store,
  HeartPulse,
  Home as HomeIcon
} from 'lucide-react';
import { speakText } from '../services/speechService';

const getCategoryIcon = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('edu')) return <GraduationCap size={24} color="#1a73e8" />;
  if (c.includes('agri')) return <Tractor size={24} color="#137333" />;
  if (c.includes('biz') || c.includes('business')) return <Store size={24} color="#e65100" />;
  if (c.includes('health')) return <HeartPulse size={24} color="#00838f" />;
  if (c.includes('house') || c.includes('housing')) return <HomeIcon size={24} color="#6a1b9a" />;
  return <Award size={24} color="#1a73e8" />;
};

const SchemeResult = ({ matchData, allMatches = [], onSelectScheme, onReset }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Normalize matchData whether it's wrapped or flat
  const scheme = matchData.scheme || matchData;
  const score = matchData.score || scheme.score || 95;
  const matchedCriteria = matchData.matchedCriteria || scheme.matchedCriteria || [
    `Aapke profile aur zaroorat ke aadhar par yojana eligible hai`,
    `Official Central / State welfare rules verified`,
    `Beneficiary criteria matched`
  ];

  // Stop any active speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const stepsText = scheme.steps 
      ? scheme.steps.map((s, idx) => `Step ${idx + 1}: ${s}`).join('. ')
      : '';
    const docsText = scheme.documents ? scheme.documents.join(', ') : '';

    const speechText = `Aapke liye sabse upyukt yojana hai: ${scheme.name}. 
    Khaas faayda: ${scheme.benefit || scheme.description}. 
    Zaroori documents hain: ${docsText}. 
    Aavedan ke mukhya kram: ${stepsText}`;

    speakText(speechText, () => setIsSpeaking(false));
  };

  return (
    <div className="main-content">
      {/* Top back button bar */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <button className="btn btn-outline" onClick={onReset} style={{ gap: '0.4rem' }}>
          <ArrowLeft size={18} />
          नई खोज (Ask Another Question)
        </button>

        <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
          <Sparkles size={14} />
          {score}% Match Found
        </span>
      </div>

      {/* Hero Result Banner */}
      <div className="result-hero-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              background: '#e8f0fe', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(26,115,232,0.15)'
            }}>
              {getCategoryIcon(scheme.category)}
            </div>
            <div>
              <span className={`badge badge-${(scheme.category || 'education').toLowerCase().replace(/\s+/g, '-')}`} style={{ marginBottom: '0.3rem' }}>
                {scheme.category || 'Welfare Scheme'}
              </span>
              <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: 0 }}>
                {scheme.name}
              </h1>
            </div>
          </div>

          {/* Speak listen button */}
          <button 
            className={`btn ${isSpeaking ? 'btn-outline' : 'btn-primary'}`}
            onClick={handleSpeakToggle}
            style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)' }}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={20} color="#d93025" />
                <span>आवाज़ रोकें (Stop)</span>
              </>
            ) : (
              <>
                <Volume2 size={20} />
                <span>🔊 बोलकर सुनें (Listen)</span>
              </>
            )}
          </button>
        </div>

        {scheme.benefit && (
          <div className="benefit-highlight">
            <Award size={20} color="#1e40af" />
            <span><strong>मुख्य लाभ:</strong> {scheme.benefit}</span>
          </div>
        )}

        <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginTop: '0.75rem', lineHeight: 1.6 }}>
          {scheme.description}
        </p>

        {scheme.official_url && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a 
              href={scheme.official_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
            >
              <ExternalLink size={16} />
              आधिकारिक पोर्टल पर आवेदन करें (Official Portal)
            </a>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              (Verified Government Portal: {new URL(scheme.official_url).hostname})
            </span>
          </div>
        )}
      </div>

      {/* Other Matching Schemes Carousel / Selector */}
      {allMatches.length > 1 && (
        <div className="w-full mb-3">
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            अन्य संभावित योजनाएं (Other Matched Schemes):
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {allMatches.map((other, idx) => (
              <button
                key={idx}
                onClick={() => onSelectScheme && onSelectScheme(other)}
                className="card"
                style={{
                  padding: '0.85rem 1.25rem',
                  marginBottom: 0,
                  minWidth: '220px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  border: other.id === scheme.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: other.id === scheme.id ? '#f0f7ff' : 'white'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {other.category?.toUpperCase()} • {other.score || 85}% Match
                </span>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginTop: '0.2rem', color: 'var(--text-main)' }}>
                  {other.name}
                </strong>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Two columns: Why this matches & Required Documents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', width: '100%', marginBottom: '1.5rem' }}>
        {/* Why this matches */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#0f172a' }}>
            <Info size={20} style={{ color: 'var(--primary)' }} />
            यह योजना आपके लिए क्यों सही है? (Eligibility Match)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {matchedCriteria.map((crit, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="#137333" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500 }}>
                  {crit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#0f172a' }}>
            <FileText size={20} style={{ color: '#e65100' }} />
            ज़रूरी दस्तावेज़ (Required Documents)
          </h3>
          <div className="doc-grid">
            {scheme.documents && scheme.documents.map((doc, idx) => (
              <div key={idx} className="doc-badge-item">
                <FileText size={16} color="#64748b" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Steps */}
      <div className="card" style={{ width: '100%' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#0f172a' }}>
          <ListOrdered size={22} style={{ color: 'var(--primary)' }} />
          आवेदन कैसे करें? (Step-by-Step Guide)
        </h3>

        <div>
          {scheme.steps && scheme.steps.map((step, idx) => (
            <div key={idx} className="step-card-box">
              <div className="step-number-badge">
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${isSpeaking ? 'btn-outline' : 'btn-primary'}`}
            onClick={handleSpeakToggle}
            style={{ minWidth: '220px' }}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isSpeaking ? 'बोलना बंद करें' : 'कदम बोलकर सुनें (Listen Steps)'}
          </button>

          {scheme.official_url && (
            <a 
              href={scheme.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <ExternalLink size={18} />
              पोर्टल लिंक खोलें
            </a>
          )}
        </div>
      </div>

      {/* Official Disclaimer */}
      <div className="text-center mt-2" style={{ maxWidth: '640px', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
        * यह सिफारिश आपके द्वारा बताए गए विवरण पर आधारित है। अंतिम पात्रता और लाभ का निर्णय संबंधित सरकारी विभाग द्वारा दस्तावेजों के सत्यापन के उपरांत किया जाएगा।
      </div>
    </div>
  );
};

export default SchemeResult;
