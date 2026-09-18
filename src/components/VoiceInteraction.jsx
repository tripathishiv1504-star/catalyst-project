import React from 'react';
import { Mic, Loader2, CheckCircle2, XCircle, ArrowRight, UserCheck, BookOpen, Target } from 'lucide-react';

const VoiceInteraction = ({ status, transcript, extractedProfile, onStopListening, onCancel }) => {
  return (
    <div className="main-content" style={{ justifyContent: 'center' }}>
      {status === 'listening' && (
        <div className="text-center w-full" style={{ maxWidth: '640px' }}>
          <div className="mic-hero-container" style={{ margin: '1rem 0' }}>
            <button className="btn-mic listening" aria-label="Listening">
              <Mic size={52} />
            </button>
            <div className="sound-waves">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          </div>

          <h2 style={{ color: 'var(--danger)', marginBottom: '0.4rem' }}>
            सुन रहे हैं... बोलिए
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            अपनी ज़रूरत सामान्य भाषा में बोलें (उदा. "मुझे उच्च शिक्षा के लिए स्कॉलरशिप चाहिए")
          </p>

          {transcript ? (
            <div className="card mt-2" style={{ backgroundColor: '#fff', border: '2px solid #bfdbfe' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                लाइव आवाज़ (Recognized Speech):
              </span>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontStyle: 'italic', fontWeight: 500 }}>
                "{transcript}"
              </p>
            </div>
          ) : (
            <div className="card mt-2" style={{ backgroundColor: '#f8fafc', borderStyle: 'dashed' }}>
              <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>
                बोलना शुरू करें... आपकी आवाज़ यहाँ दिखाई देगी।
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            {onStopListening && (
              <button 
                className="btn btn-primary"
                onClick={onStopListening}
                style={{ padding: '0.8rem 1.8rem' }}
              >
                <ArrowRight size={18} />
                बोलना पूरा हुआ (Search Now)
              </button>
            )}
            {onCancel && (
              <button 
                className="btn btn-outline"
                onClick={onCancel}
              >
                <XCircle size={18} />
                रद्द करें (Cancel)
              </button>
            )}
          </div>
        </div>
      )}

      {(status === 'processing' || status === 'understanding' || status === 'searching') && (
        <div className="text-center w-full" style={{ maxWidth: '600px', margin: '2rem 0' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Loader2 size={44} className="animate-spin" style={{ color: 'var(--primary)' }} />
          </div>
          
          <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {status === 'understanding' ? 'आपकी बात समझ रहे हैं...' : 'पात्र सरकारी योजनाएं खोज रहे हैं...'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Google Gemini AI आपके प्रोफाइल और सरकारी डेटाबेस का मिलान कर रहा है...
          </p>

          {transcript && (
            <div className="card mt-2 text-center" style={{ backgroundColor: '#f8fafc' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>आपने कहा:</span>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 500, marginTop: '0.2rem' }}>
                "{transcript}"
              </p>
            </div>
          )}

          {extractedProfile && (
            <div className="card mt-2 text-left" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#137333" />
                पहचानी गई जानकारी (Extracted Profile):
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {extractedProfile.occupation && (
                  <span className="badge badge-business" style={{ gap: '0.3rem' }}>
                    <UserCheck size={14} /> पेशा: {extractedProfile.occupation}
                  </span>
                )}
                {extractedProfile.education && (
                  <span className="badge badge-education" style={{ gap: '0.3rem' }}>
                    <BookOpen size={14} /> शिक्षा: {extractedProfile.education}
                  </span>
                )}
                {extractedProfile.intent && (
                  <span className="badge badge-success" style={{ gap: '0.3rem' }}>
                    <Target size={14} /> आवश्यकता: {extractedProfile.intent}
                  </span>
                )}
                {extractedProfile.category && (
                  <span className="badge" style={{ background: '#f1f5f9', color: '#334155' }}>
                    श्रेणी: {extractedProfile.category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceInteraction;
