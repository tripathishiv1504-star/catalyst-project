import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Volume2, 
  FileQuestion,
  Headphones
} from 'lucide-react';

const faqs = [
  {
    q: 'क्या मैं हिंदी, हिंग्लिश या अंग्रेज़ी में बोल सकता हूँ?',
    a: 'हाँ! VaaniAccess का AI मॉडल हिंदी (शुद्ध या बोलचाल), Hinglish (जैसे "Main college student hoon") और English तीनों को सहजता से समझता है।'
  },
  {
    q: 'क्या VaaniAccess का उपयोग करने के लिए कोई शुल्क देना पड़ता है?',
    a: 'बिल्कुल नहीं। VaaniAccess एक मुफ़्त सार्वजनिक सेवा पहल है ताकि हर नागरिक बिना किसी बिचौलिए के सही सरकारी योजना तक पहुँच सके।'
  },
  {
    q: 'सरकारी योजनाओं के लिए सामान्यतः कौन से दस्तावेज़ चाहिए होते हैं?',
    a: 'अधिकतर योजनाओं में आधार कार्ड, बैंक खाता पासबुक (DBT सक्रिय), आय प्रमाण पत्र, निवास प्रमाण पत्र और आवश्यकतानुसार संबंधित दस्तावेज़ (जैसे कॉलेज आईडी, ज़मीन की खतौनी, या वेंडिंग सर्टिफिकेट) की आवश्यकता होती है।'
  },
  {
    q: 'योजना मिलने के बाद आवेदन कैसे करें?',
    a: 'हर योजना के परिणाम पृष्ठ पर सीधे केंद्र या राज्य सरकार के आधिकारिक पोर्टल का सीधा लिंक (Official Portal) दिया गया है। आप वहाँ जाकर या नज़दीकी CSC (Common Service Centre) में जाकर ऑनलाइन आवेदन कर सकते हैं।'
  },
  {
    q: 'अगर मेरे पास माइक्रोफोन नहीं है या आवाज़ काम न करे?',
    a: 'मुखपृष्ठ पर एक टेक्स्ट सर्च बॉक्स भी दिया गया है जहाँ आप अपनी आवश्यकता सीधे टाइप करके भी तुरंत सही योजना खोज सकते हैं।'
  },
  {
    q: 'फ्री टैबलेट / स्मार्टफोन योजना (DigiShakti) के लिए कैसे आवेदन करें?',
    a: 'फ्री टैबलेट व स्मार्टफोन योजना के लिए छात्र को अलग से कोई फॉर्म नहीं भरना होता। संबंधित कॉलेज/विश्वविद्यालय द्वारा पात्र विद्यार्थियों का डेटा सीधे डिज़ीशक्ति पोर्टल (digishakti.up.gov.in) पर अपलोड किया जाता है। छात्र पोर्टल पर अपना स्टेटस चेक कर सकते हैं।'
  }
];

const helplines = [
  { name: 'DigiShakti (फ्री टैबलेट/स्मार्टफोन हेल्पलाइन)', num: '0522-2237000 / 1905', hours: 'Office hours' },
  { name: 'National Scholarship Portal Helpline', num: '0120-6619540', hours: 'Mon - Fri' },
  { name: 'Kisan Call Centre (किसान हेल्पलाइन)', num: '1800-180-1551', hours: '6 AM - 10 PM' },
  { name: 'Ayushman Bharat PM-JAY (स्वास्थ्य)', num: '14555 / 1800-111-565', hours: '24x7 Toll Free' },
  { name: 'PM SVANidhi (स्ट्रीट वेंडर लोन)', num: '1800-11-1979', hours: 'Toll Free' },
  { name: 'PMAY Housing Helpline (आवास योजना)', num: '1800-11-6163', hours: 'Office hours' }
];

const HelpFaq = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="main-content">
      <div className="text-center mb-4">
        <h1 style={{ color: '#0f172a' }}>
          सहायता और अक्सर पूछे जाने वाले सवाल
        </h1>
        <p style={{ maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem' }}>
          VaaniAccess के उपयोग से संबंधित सामान्य प्रश्न और राष्ट्रीय सरकारी हेल्पलाइन नंबर।
        </p>
      </div>

      {/* Voice Assistant Tips Box */}
      <div className="card" style={{ maxWidth: '820px', backgroundColor: '#e8f0fe', border: '1.5px solid #bfdbfe', marginBottom: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', marginBottom: '0.5rem' }}>
          <Volume2 size={22} />
          बोलने के आसान सुझाव (Voice Search Tips)
        </h3>
        <ul style={{ paddingLeft: '1.25rem', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: 1.6 }}>
          <li>स्पष्ट और शांत वातावरण में बोलें।</li>
          <li>अपना काम (जैसे विद्यार्थी, किसान, छोटा दुकानदार) अवश्य बताएं।</li>
          <li>आपको क्या मदद चाहिए (जैसे छात्रवृत्ति, लोन, मुफ़्त इलाज, मकान) उसका उल्लेख करें।</li>
        </ul>
      </div>

      {/* FAQ Accordion */}
      <div style={{ width: '100%', maxWidth: '820px', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileQuestion size={22} color="var(--primary)" />
          Frequently Asked Questions (FAQ)
        </h2>

        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <button 
              className="faq-question"
              onClick={() => toggleFaq(idx)}
              aria-expanded={openIdx === idx}
            >
              <span>{faq.q}</span>
              {openIdx === idx ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} />}
            </button>
            {openIdx === idx && (
              <div className="faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Official Helplines Directory */}
      <div className="card" style={{ width: '100%', maxWidth: '820px' }}>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Headphones size={22} color="#137333" />
          राष्ट्रीय कल्याणकारी हेल्पलाइन नंबर (Government Helplines)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {helplines.map((hl, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{hl.name}</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)' }}>{hl.hours}</span>
              </div>
              <a 
                href={`tel:${hl.num.split('/')[0].trim()}`}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', gap: '0.4rem', color: '#137333', borderColor: '#bbf7d0', backgroundColor: '#f0fdf4' }}
              >
                <PhoneCall size={14} />
                {hl.num}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpFaq;
