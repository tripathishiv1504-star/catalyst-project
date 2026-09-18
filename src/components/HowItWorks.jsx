import React from 'react';
import { Mic, BrainCircuit, Database, Volume2, ArrowRight, ShieldCheck } from 'lucide-react';

const HowItWorks = ({ onTryNow }) => {
  const steps = [
    {
      num: 1,
      icon: <Mic size={28} color="#1a73e8" />,
      bg: '#e8f0fe',
      title: '1. बोलकर या लिखकर बताएं (Speak or Type)',
      desc: 'माइक बटन दबाएं और अपनी साधारण भाषा में बताएं कि आप क्या करते हैं और आपको किस तरह की सरकारी सहायता चाहिए (जैसे "मैं किसान हूँ, मुझे सहायता चाहिए")।'
    },
    {
      num: 2,
      icon: <BrainCircuit size={28} color="#9333ea" />,
      bg: '#f3e8ff',
      title: '2. AI द्वारा पात्रता पहचान (AI Profile Extraction)',
      desc: 'Google Gemini AI आपकी आवाज़ और भाषा का विश्लेषण करके आपका पेशा (Occupation), शिक्षा (Education) और ज़रूरत (Intent) को स्वचालित रूप से पहचानता है।'
    },
    {
      num: 3,
      icon: <Database size={28} color="#137333" />,
      bg: '#e6f4ea',
      title: '3. सरकारी नियमों से मिलान (Smart Scheme Match)',
      desc: 'पहचाने गए प्रोफाइल को केंद्र और राज्य सरकार के कल्याणकारी डेटाबेस से मिलान करके सबसे सटीक और लाभकारी योजनाएं निकाली जाती हैं।'
    },
    {
      num: 4,
      icon: <Volume2 size={28} color="#e65100" />,
      bg: '#fff3e0',
      title: '4. आवाज़ से मार्गदर्शन व आवेदन (Audio Guide & Apply)',
      desc: 'ज़रूरी दस्तावेज़ और आवेदन के चरण बोलकर सुनाए जाते हैं, साथ ही सीधे आधिकारिक सरकारी पोर्टल (जैसे NSP, PM Kisan, PM-JAY) का लिंक प्रदान किया जाता है।'
    }
  ];

  return (
    <div className="main-content">
      <div className="text-center mb-4">
        <h1 style={{ color: '#0f172a' }}>
          VaaniAccess कैसे काम करता है?
        </h1>
        <p style={{ maxWidth: '620px', margin: '0 auto', fontSize: '1.1rem' }}>
          जटिल सरकारी प्रक्रियाओं और फॉर्म्स को सरल आवाज़-आधारित तकनीक में बदलने की पूरी यात्रा।
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '880px', marginBottom: '2.5rem' }}>
        {steps.map((s) => (
          <div key={s.num} className="card" style={{ marginBottom: 0, padding: '1.75rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: 0, color: '#0f172a' }}>
                {s.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.975rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="card text-center" style={{ maxWidth: '880px', background: 'linear-gradient(135deg, #f0fdf4, #e8f0fe)', border: '1px solid #bbf7d0', padding: '2rem' }}>
        <ShieldCheck size={36} color="#137333" style={{ margin: '0 auto 0.75rem' }} />
        <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          100% सुरक्षित और नागरिक-केंद्रित
        </h2>
        <p style={{ maxWidth: '560px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          VaaniAccess केवल आधिकारिक और सत्यापित सरकारी स्रोतों से जानकारी साझा करता है। कोई व्यक्तिगत गोपनीय डेटा स्टोर नहीं किया जाता।
        </p>
        <button 
          className="btn btn-primary"
          onClick={onTryNow}
          style={{ padding: '0.8rem 2rem', fontSize: '1.05rem' }}
        >
          अभी अपनी योजना खोजें (Try Voice Assistant)
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
