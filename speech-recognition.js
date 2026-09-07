// Speech Recognition Setup
class JarvisSpeechRecognition {
    constructor() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.isListening = false;
        this.transcript = '';
        
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        this.setupListeners();
    }
    
    setupListeners() {
        this.recognition.onstart = () => {
            this.isListening = true;
            console.log('Speech recognition started');
            this.onStart && this.onStart();
        };
        
        this.recognition.onresult = (event) => {
            this.transcript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    this.transcript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            this.onResult && this.onResult(this.transcript, interimTranscript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.onError && this.onError(event.error);
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            console.log('Speech recognition ended');
            this.onEnd && this.onEnd();
        };
    }
    
    start() {
        this.transcript = '';
        if (!this.isListening) {
            this.recognition.start();
        }
    }
    
    stop() {
        this.recognition.stop();
    }
    
    abort() {
        this.recognition.abort();
    }
}

// Text-to-Speech Setup
class JarvisTextToSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isSpeaking = false;
        this.voiceType = 'default';
    }
    
    speak(text, voiceType = 'default') {
        if (this.isSpeaking) {
            this.synth.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice based on type
        switch(voiceType) {
            case 'deep':
                utterance.pitch = 0.5;
                utterance.rate = 0.9;
                break;
            case 'robotic':
                utterance.pitch = 1.5;
                utterance.rate = 1.2;
                break;
            default:
                utterance.pitch = 1;
                utterance.rate = 1;
        }
        
        utterance.volume = 1;
        
        utterance.onstart = () => {
            this.isSpeaking = true;
            this.onStart && this.onStart();
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
            this.onEnd && this.onEnd();
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            this.onError && this.onError(event.error);
        };
        
        this.synth.speak(utterance);
    }
    
    stop() {
        this.synth.cancel();
        this.isSpeaking = false;
    }
    
    cancel() {
        this.synth.cancel();
    }
}

// Export for use in jarvis.js
window.JarvisSpeechRecognition = JarvisSpeechRecognition;
window.JarvisTextToSpeech = JarvisTextToSpeech;