// Wraps the Web Speech API for Hindi voice recognition and speech synthesis

export const startListening = (onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    if (onError) onError("Aapka browser voice recognition support nahi karta.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'hi-IN'; // Hindi
  recognition.interimResults = true; // Get results as user speaks
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let finalTranscript = '';
    let interimTranscript = '';
    
    for (let i = 0; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    
    if (onResult) {
      onResult(finalTranscript, interimTranscript);
    }
  };

  recognition.onerror = (event) => {
    if (onError) onError(`Speech recognition error: ${event.error}`);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
    return recognition;
  } catch (e) {
    if (onError) onError(`Could not start recognition: ${e.message}`);
    return null;
  }
};

export const speakText = (text, onEnd) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }
  
  // Stop any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.9; // Slightly slower for better comprehension
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  window.speechSynthesis.speak(utterance);
};
