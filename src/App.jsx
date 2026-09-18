import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import VoiceInteraction from './components/VoiceInteraction';
import SchemeResult from './components/SchemeResult';
import AllSchemes from './components/AllSchemes';
import HowItWorks from './components/HowItWorks';
import HelpFaq from './components/HelpFaq';
import { startListening } from './services/speechService';

function App() {
  // Navigation / views: 'home' | 'schemes' | 'how-it-works' | 'help' | 'listening' | 'result'
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [interactionStatus, setInteractionStatus] = useState('idle'); // 'listening' | 'processing' | 'understanding' | 'searching'
  const [transcript, setTranscript] = useState('');
  const [extractedProfile, setExtractedProfile] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [allMatches, setAllMatches] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const recognitionRef = useRef(null);

  const resetApp = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setView('home');
    setActiveTab('home');
    setInteractionStatus('idle');
    setTranscript('');
    setExtractedProfile(null);
    setMatchData(null);
    setAllMatches([]);
    setErrorMsg(null);
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setErrorMsg(null);
    if (tab === 'home') {
      setView('home');
    } else {
      setView(tab);
    }
  };

  const processInput = async (text) => {
    if (!text || !text.trim()) return;

    setView('listening');
    setInteractionStatus('processing');
    setTranscript(text);
    setErrorMsg(null);
    
    try {
      setInteractionStatus('understanding');
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      setInteractionStatus('searching');
      
      if (!response.ok) {
        throw new Error('Server returned an error');
      }
      
      const data = await response.json();
      setExtractedProfile(data.extracted_profile);
      
      setTimeout(() => {
        if (data.matched_schemes && data.matched_schemes.length > 0) {
          setAllMatches(data.matched_schemes);
          setMatchData(data.matched_schemes[0]);
          setView('result');
        } else {
          setErrorMsg(data.audio_message || "Abhi humein aapki information ke basis par suitable scheme nahi mili. Kripya thoda aur vistar se batayein.");
          setView('home');
        }
      }, 700);
      
    } catch (err) {
      console.error("Analysis error:", err);
      setErrorMsg("AI backend se judne mein samasya aayi. Kripya dobara koshish karein.");
      setView('home');
    }
  };

  const startVoiceFlow = () => {
    setView('listening');
    setInteractionStatus('listening');
    setTranscript('');
    setErrorMsg(null);
    let capturedText = '';

    let errorOccurred = false;

    const rec = startListening(
      (finalText, interimText) => {
        capturedText = (finalText + ' ' + interimText).trim();
        setTranscript(capturedText);
      },
      (error) => {
        errorOccurred = true;
        console.warn("Speech error:", error);
        setErrorMsg(error);
        setView('home');
      },
      () => {
        if (errorOccurred) return;
        if (capturedText.trim().length > 0) {
          processInput(capturedText);
        } else {
          setErrorMsg("Humein aapki baat clearly samajh nahi aayi. Kripya dobara bolein ya type karein.");
          setView('home');
        }
      }
    );

    recognitionRef.current = rec;
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Error stopping speech recognition:", e);
      }
    }
    if (transcript.trim().length > 0) {
      processInput(transcript);
    }
  };

  const handleSelectDetailedScheme = (scheme) => {
    setMatchData(scheme);
    setAllMatches([scheme]);
    setView('result');
  };

  return (
    <div className="app-container">
      <Header 
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onHomeClick={resetApp} 
      />
      
      {errorMsg && (
        <div style={{ backgroundColor: '#fee2e2', borderBottom: '1px solid #fca5a5', color: '#991b1b', padding: '0.85rem 1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500 }}>{errorMsg}</span>
          <button 
            onClick={() => setErrorMsg(null)}
            className="btn btn-outline"
            style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem', borderColor: '#f87171', color: '#991b1b', background: 'white' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {view === 'home' && (
        <Home 
          onStartListening={startVoiceFlow} 
          onSearchText={processInput}
        />
      )}

      {view === 'listening' && (
        <VoiceInteraction 
          status={interactionStatus}
          transcript={transcript}
          extractedProfile={extractedProfile}
          onStopListening={handleStopListening}
          onCancel={resetApp}
        />
      )}

      {view === 'result' && matchData && (
        <SchemeResult 
          matchData={matchData}
          allMatches={allMatches}
          onSelectScheme={(scheme) => setMatchData(scheme)}
          onReset={resetApp}
        />
      )}

      {view === 'schemes' && (
        <AllSchemes 
          onSelectScheme={handleSelectDetailedScheme}
        />
      )}

      {view === 'how-it-works' && (
        <HowItWorks 
          onTryNow={() => {
            setActiveTab('home');
            setView('home');
          }}
        />
      )}

      {view === 'help' && (
        <HelpFaq />
      )}

      <footer className="app-footer">
        <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>VaaniAccess</strong> — आवाज़ से सशक्त भारत, कल्याणकारी योजनाओं का सीधा द्वार।
          </div>
          <div style={{ color: 'var(--text-sub)', fontSize: '0.8rem' }}>
            National Welfare Navigator • Public Digital Infrastructure
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
