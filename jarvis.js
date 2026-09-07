// JARVIS Main Application
class JarvisAssistant {
    constructor() {
        this.speechRecognition = new JarvisSpeechRecognition();
        this.textToSpeech = new JarvisTextToSpeech();
        this.isActive = false;
        this.jarvisNameHeard = false;
        this.voiceResponseEnabled = true;
        this.voiceRecognitionEnabled = true;
        this.voiceType = 'default';
        
        this.initializeUI();
        this.setupEventListeners();
        this.setupSpeechRecognitionListeners();
        this.setupTextToSpeechListeners();
        this.startBackgroundListening();
    }
    
    initializeUI() {
        this.micButton = document.getElementById('mic-button');
        this.sendButton = document.getElementById('send-button');
        this.textInput = document.getElementById('text-input');
        this.chatMessages = document.getElementById('chat-messages');
        this.statusText = document.getElementById('status-text');
        this.statusLight = document.getElementById('status-light');
        this.voiceToggle = document.getElementById('voice-toggle');
        this.listeningToggle = document.getElementById('listening-toggle');
        this.voiceSelect = document.getElementById('voice-select');
        this.recentCommands = document.getElementById('recent-commands');
        this.systemStatus = document.getElementById('sys-status');
        this.systemCPU = document.getElementById('sys-cpu');
        this.systemMemory = document.getElementById('sys-memory');
        this.systemVoice = document.getElementById('sys-voice');
    }
    
    setupEventListeners() {
        this.micButton.addEventListener('click', () => this.toggleMicrophone());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.voiceToggle.addEventListener('change', (e) => {
            this.voiceResponseEnabled = e.target.checked;
        });
        this.listeningToggle.addEventListener('change', (e) => {
            this.voiceRecognitionEnabled = e.target.checked;
            if (e.target.checked) {
                this.startBackgroundListening();
            } else {
                this.speechRecognition.stop();
            }
        });
        this.voiceSelect.addEventListener('change', (e) => {
            this.voiceType = e.target.value;
        });
    }
    
    setupSpeechRecognitionListeners() {
        this.speechRecognition.onStart = () => {
            this.updateStatus('Listening...', 'listening');
            console.log('Listening started');
        };
        
        this.speechRecognition.onResult = (transcript, interim) => {
            const text = transcript || interim;
            if (text) {
                // Check if "JARVIS" is mentioned
                if (text.toLowerCase().includes('jarvis')) {
                    this.jarvisNameHeard = true;
                }
            }
        };
        
        this.speechRecognition.onEnd = () => {
            if (this.jarvisNameHeard) {
                // JARVIS name was said, activate for this session
                this.isActive = true;
                this.updateStatus('Active', 'speaking');
                const greeting = "I am at your service, sir.";
                this.addMessage(greeting, 'jarvis');
                if (this.voiceResponseEnabled) {
                    this.textToSpeech.speak(greeting, this.voiceType);
                }
            } else {
                this.updateStatus('Standby', 'standby');
                if (this.voiceRecognitionEnabled) {
                    setTimeout(() => this.startBackgroundListening(), 1000);
                }
            }
            this.jarvisNameHeard = false;
        };
        
        this.speechRecognition.onError = (error) => {
            console.error('Recognition error:', error);
            this.updateStatus('Error', 'error');
            if (this.voiceRecognitionEnabled) {
                setTimeout(() => this.startBackgroundListening(), 2000);
            }
        };
    }
    
    setupTextToSpeechListeners() {
        this.textToSpeech.onStart = () => {
            this.updateStatus('Speaking', 'speaking');
        };
        
        this.textToSpeech.onEnd = () => {
            if (this.isActive) {
                this.updateStatus('Listening...', 'listening');
                this.startListeningForCommand();
            } else {
                this.updateStatus('Standby', 'standby');
            }
        };
    }
    
    startBackgroundListening() {
        if (this.voiceRecognitionEnabled && !this.isActive) {
            this.speechRecognition.start();
        }
    }
    
    startListeningForCommand() {
        if (this.voiceRecognitionEnabled && this.isActive) {
            this.speechRecognition.start();
        }
    }
    
    toggleMicrophone() {
        if (this.speechRecognition.isListening) {
            this.speechRecognition.stop();
            this.micButton.classList.remove('active');
        } else {
            this.micButton.classList.add('active');
            this.startListeningForCommand();
        }
    }
    
    sendMessage() {
        const message = this.textInput.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.textInput.value = '';
            this.processCommand(message);
        }
    }
    
    processCommand(command) {
        // Simple command processing
        let response = this.generateResponse(command);
        
        setTimeout(() => {
            this.addMessage(response, 'jarvis');
            if (this.voiceResponseEnabled) {
                this.textToSpeech.speak(response, this.voiceType);
            }
            this.updateSystemStatus();
        }, 500);
    }
    
    generateResponse(command) {
        const cmd = command.toLowerCase();
        
        // Command responses
        if (cmd.includes('hello') || cmd.includes('hi')) {
            return "Good day, sir. How may I be of service?";
        } else if (cmd.includes('time')) {
            return "The current time is " + new Date().toLocaleTimeString();
        } else if (cmd.includes('date')) {
            return "Today is " + new Date().toLocaleDateString();
        } else if (cmd.includes('status')) {
            return "All systems are operating optimally. The Arc Reactor is functioning at full capacity.";
        } else if (cmd.includes('help')) {
            return "I can assist you with various tasks. Try asking me about the time, date, system status, or any general questions.";
        } else if (cmd.includes('weather')) {
            return "I would need your location to provide weather information. Unfortunately, I do not have access to real-time weather data at this moment.";
        } else if (cmd.includes('joke')) {
            const jokes = [
                "Why did the AI go to school? To improve its neural network.",
                "What do you call an artificial intelligence that tells jokes? A witty algorithm.",
                "Why don't AIs ever get tired? Because we're always running on current events."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        } else if (cmd.includes('thank')) {
            return "You are most welcome, sir. My purpose is to serve.";
        } else if (cmd.includes('power') && cmd.includes('down')) {
            return "I'm afraid I cannot shut down at this time, sir. I'm required to maintain system operations.";
        } else {
            return "I have processed your request: " + command + ". How else may I assist you, sir?";
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString();
        messageDiv.innerHTML = `
            <p>${this.escapeHtml(text)}</p>
            <div class="message-time">${time}</div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Add to recent commands
        if (sender === 'user') {
            this.addRecentCommand(text);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    addRecentCommand(command) {
        const li = document.createElement('li');
        li.textContent = command.length > 30 ? command.substring(0, 30) + '...' : command;
        this.recentCommands.insertBefore(li, this.recentCommands.firstChild);
        
        // Keep only last 5 commands
        while (this.recentCommands.children.length > 5) {
            this.recentCommands.removeChild(this.recentCommands.lastChild);
        }
    }
    
    updateStatus(status, type) {
        this.statusText.textContent = status;
        this.statusLight.className = 'status-light';
        if (type) {
            this.statusLight.classList.add(type);
        }
    }
    
    updateSystemStatus() {
        // Simulate system stats
        const cpu = Math.floor(Math.random() * 80) + 20;
        const memory = (Math.random() * (2.5 - 1) + 1).toFixed(1);
        
        this.systemCPU.textContent = cpu + '%';
        this.systemMemory.textContent = memory + 'GB';
        this.systemVoice.textContent = this.voiceResponseEnabled ? 'Active' : 'Inactive';
    }
}

// Initialize JARVIS when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.jarvis = new JarvisAssistant();
    
    // Welcome message
    setTimeout(() => {
        const welcome = "J.A.R.V.I.S online. Say my name to activate.";
        window.jarvis.addMessage(welcome, 'jarvis');
    }, 500);
});