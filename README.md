# J.A.R.V.I.S - AI Assistant

> **Just A Rather Very Intelligent System** - An AI assistant inspired by Iron Man's JARVIS with an Arc Reactor UI and voice interaction capabilities.

## 🎯 Features

### Core Functionality
- **Arc Reactor UI** - Animated glowing Arc Reactor design with pulsing effects
- **Voice Recognition** - Real-time speech-to-text capabilities
- **Text-to-Speech** - Natural voice responses in multiple voice types
- **Command Processing** - Intelligent command recognition and response generation
- **Chat Interface** - Beautiful chat display with message history

### Voice Features
- **Wake Word Detection** - Activate JARVIS by saying "JARVIS"
- **Multiple Voice Types** - Choose from Default, Deep, or Robotic voices
- **Voice Toggle** - Enable/disable voice responses
- **Listening Indicator** - Visual feedback when listening
- **Real-time Transcription** - See what JARVIS hears in real-time

### UI Components
- **Animated Arc Reactor Core** - Glowing central core with rotating rings
- **Status Indicator** - Real-time status display (Standby, Listening, Speaking, etc.)
- **Control Panel** - Microphone button and chat interface
- **System Status Panel** - CPU, Memory, and Voice system monitoring
- **Recent Commands** - Track command history

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Speech API support (Chrome, Edge, Safari, Firefox)
- Microphone permission enabled
- Speaker for voice feedback

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blibo76/jarvis-assistant.git
cd jarvis-assistant
```

2. Open `index.html` in your web browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open the file
open index.html
```

3. Grant microphone permissions when prompted

## 📖 Usage

### Voice Commands
1. **Activate JARVIS**: Say "JARVIS" or click the microphone button
2. **Give Commands**: Say your command after JARVIS responds with "I am at your service, sir."
3. **Example Commands**:
   - "What time is it?"
   - "What's today's date?"
   - "What's your status?"
   - "Tell me a joke"
   - "Help"

### Text Commands
1. Type your message in the text input field
2. Press Enter or click the Send button
3. JARVIS will respond with voice and text

### Settings
- **Voice Response Toggle**: Enable/disable JARVIS voice responses
- **Voice Recognition Toggle**: Enable/disable listening mode
- **Voice Type Selection**: Choose between Default, Deep, or Robotic voice

## 🛠️ Technical Architecture

### Core Files

#### `index.html`
- Main HTML structure
- Arc Reactor visualization elements
- Chat interface layout
- Control panel and settings

#### `styles.css`
- Comprehensive styling (11KB+)
- Arc Reactor animations:
  - Core pulsing effect
  - Ring rotation animations
  - Glow effects
  - Status light blinking
- Responsive design
- Dark theme with cyan accents

#### `speech-recognition.js`
**JarvisSpeechRecognition Class**
- Wraps Web Speech API
- Continuous listening with interim results
- Transcript accumulation
- Error handling

**JarvisTextToSpeech Class**
- Speech Synthesis API integration
- Multiple voice types (Default, Deep, Robotic)
- Pitch and rate adjustments
- Volume control

#### `jarvis.js`
**JarvisAssistant Class**
- Main application controller
- Command processing pipeline
- Message display management
- System status updates
- Event listener management

### Key Classes

```javascript
// Speech Recognition
JarvisSpeechRecognition
  - start()
  - stop()
  - abort()
  - onStart callback
  - onResult callback
  - onError callback
  - onEnd callback

// Text-to-Speech
JarvisTextToSpeech
  - speak(text, voiceType)
  - stop()
  - cancel()
  - onStart callback
  - onEnd callback
  - onError callback

// Main Assistant
JarvisAssistant
  - toggleMicrophone()
  - sendMessage()
  - processCommand(command)
  - generateResponse(command)
  - addMessage(text, sender)
  - updateStatus(status, type)
  - startBackgroundListening()
```

## 🎨 UI Components Explained

### Arc Reactor
- **Core**: Central glowing yellow/orange sphere
- **Rings**: Three rotating concentric circles
- **Glow**: Outer radial gradient for depth
- **Pulse**: Expanding ring animation

### Status Indicator
- **Green**: Ready/Standby
- **Yellow**: Listening
- **Magenta**: Speaking

### Chat Messages
- **System**: Cyan background (JARVIS initialization)
- **User**: Green background (user input)
- **JARVIS**: Yellow background (JARVIS responses)

## 🔧 Customization

### Add New Commands
Edit the `generateResponse()` method in `jarvis.js`:

```javascript
} else if (cmd.includes('your command')) {
    return "Your custom response here";
```

### Change Colors
Modify CSS variables in `styles.css`:
- Primary color: `#00d4ff` (cyan)
- Accent color: `#ffeb3b` (yellow)
- Background: `#0a0e27` (dark blue)

### Adjust Voice Parameters
In `JarvisTextToSpeech.speak()`:
```javascript
utterance.pitch = 1.0;      // 0.1 to 2.0
utterance.rate = 1.0;       // 0.1 to 10.0
utterance.volume = 1.0;     // 0 to 1.0
```

### Change Language
In `JarvisSpeechRecognition.constructor()`:
```javascript
this.recognition.lang = 'es-ES'; // Spanish
this.recognition.lang = 'fr-FR'; // French
```

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best compatibility |
| Edge | ✅ Full | Chromium-based |
| Safari | ✅ Full | macOS/iOS 14.5+ |
| Firefox | ✅ Good | Speech recognition supported |
| Opera | ✅ Good | Chromium-based |

## ⚡ Performance

- **Lightweight**: ~15KB total code
- **No External Dependencies**: Pure JavaScript
- **Responsive**: Works on desktop and tablet
- **Optimized Animations**: CSS-based for smooth 60fps

## 🔒 Privacy

- All processing happens locally in your browser
- No data is sent to external servers
- Microphone access is browser-controlled
- Speech recognition may use your device's local engine or cloud service (browser-dependent)

## 🐛 Known Limitations

1. Web Speech API support varies by browser
2. Microphone must be granted permission
3. Some browsers may have limited speech recognition accuracy
4. Text-to-speech voices available depend on OS/browser

## 📚 Resources

- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

## 🎬 Future Enhancements

- [ ] Integration with real APIs (weather, news, calendar)
- [ ] Machine learning-based response generation
- [ ] Custom wake words
- [ ] Command macros/scripting
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Cloud sync for settings
- [ ] Extended command library

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Include browser type and OS
4. Provide error messages or console output

## 🎓 Learning Resources

This project demonstrates:
- Web Audio API usage
- Speech Recognition API
- Speech Synthesis API
- Modern JavaScript (ES6 classes)
- CSS animations and gradients
- DOM manipulation
- Event-driven architecture
- UI/UX design principles

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Created with ❤️ by blibo76**

*"I am at your service, sir."*