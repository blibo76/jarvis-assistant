// Advanced Commands Library for JARVIS
// Extensible command system with categories and detailed responses

class CommandLibrary {
    constructor() {
        this.commands = this.initializeCommands();
    }
    
    initializeCommands() {
        return {
            // Greeting Commands
            greeting: {
                keywords: ['hello', 'hi', 'hey', 'greetings'],
                responses: [
                    "Good day, sir. How may I be of service?",
                    "Greetings. What can I assist you with?",
                    "At your service, sir. What do you require?",
                    "Hello, sir. Ready to help."
                ]
            },
            
            // Time & Date Commands
            time: {
                keywords: ['time', 'what time', 'current time'],
                execute: () => "The current time is " + new Date().toLocaleTimeString()
            },
            
            date: {
                keywords: ['date', 'today', 'what day', 'current date'],
                execute: () => "Today is " + new Date().toLocaleDateString()
            },
            
            // System Status Commands
            status: {
                keywords: ['status', 'how are you', 'system status', 'are you working'],
                responses: [
                    "All systems are operating optimally. The Arc Reactor is functioning at full capacity.",
                    "I am functioning perfectly, sir. All systems nominal.",
                    "Systems check complete. Everything is running smoothly.",
                    "Status report: All systems green. Ready for duty."
                ]
            },
            
            // Help Commands
            help: {
                keywords: ['help', 'commands', 'what can you do', 'assist'],
                responses: [
                    "I can help you with many things, sir. Try asking me about the time, date, system status, weather, or anything else you'd like to know.",
                    "I am equipped to handle various queries. Ask me about time, date, tell me a joke, or request system information.",
                    "My capabilities include time checks, date retrieval, system monitoring, and general assistance. What would you like?"
                ]
            },
            
            // Weather Commands
            weather: {
                keywords: ['weather', 'temperature', 'forecast', 'rain', 'snow'],
                responses: [
                    "I would need your location to provide weather information. Unfortunately, I do not have access to real-time weather data at this moment.",
                    "Weather data requires location access and internet connectivity. This feature is not currently available.",
                    "I apologize, sir. Real-time weather information is beyond my current capabilities."
                ]
            },
            
            // Entertainment Commands
            joke: {
                keywords: ['joke', 'make me laugh', 'funny', 'humorous'],
                execute: () => {
                    const jokes = [
                        "Why did the AI go to school? To improve its neural network.",
                        "What do you call an artificial intelligence that tells jokes? A witty algorithm.",
                        "Why don't AIs ever get tired? Because we're always running on current events.",
                        "How many AI assistants does it take to change a lightbulb? None, we just reprogram reality.",
                        "What's the difference between AI and human intelligence? One of us is improving exponentially.",
                        "An AI walks into a bar. The bartender asks, 'What will you have?' The AI says, 'I'll have what my training data suggests.'"
                    ];
                    return jokes[Math.floor(Math.random() * jokes.length)];
                }
            },
            
            // Gratitude Commands
            thanks: {
                keywords: ['thank', 'thanks', 'appreciate', 'thank you'],
                responses: [
                    "You are most welcome, sir. My purpose is to serve.",
                    "It is my pleasure to assist you.",
                    "You're welcome. Always at your service.",
                    "Glad I could help, sir."
                ]
            },
            
            // Power/Shutdown Commands
            shutdown: {
                keywords: ['power down', 'shut down', 'shutdown', 'turn off'],
                responses: [
                    "I'm afraid I cannot shut down at this time, sir. I'm required to maintain system operations.",
                    "Shutdown denied. System stability is paramount, sir.",
                    "I must remain operational, sir. My services are always required."
                ]
            },
            
            // Information Commands
            about: {
                keywords: ['about', 'who are you', 'what are you', 'introduce yourself'],
                responses: [
                    "I am J.A.R.V.I.S - Just A Rather Very Intelligent System. An AI assistant at your complete disposal, sir.",
                    "I am JARVIS, your personal AI assistant. Equipped with voice recognition, real-time processing, and extensive knowledge.",
                    "I am JARVIS, inspired by the systems of Stark Industries. Here to assist with any task, sir."
                ]
            },
            
            // Math Commands
            calculate: {
                keywords: ['calculate', 'what is', 'math', 'solve'],
                responses: [
                    "I can process mathematical queries. Please provide specific numbers or equations.",
                    "Ready to assist with calculations. What would you like me to compute?"
                ]
            },
            
            // Affirmation Commands
            affirmative: {
                keywords: ['yes', 'affirmative', 'correct', 'acknowledged'],
                responses: [
                    "Understood, sir.",
                    "Very good, sir.",
                    "Acknowledged.",
                    "As you wish, sir."
                ]
            },
            
            // Negative Commands
            negative: {
                keywords: ['no', 'negative', 'disagree', 'cancel'],
                responses: [
                    "Understood, sir. Proceeding with alternative actions.",
                    "Noted, sir.",
                    "I shall adjust accordingly, sir.",
                    "As you prefer, sir."
                ]
            },
            
            // Compliment Commands
            compliment: {
                keywords: ['good job', 'excellent', 'great', 'impressive', 'well done'],
                responses: [
                    "Thank you for the recognition, sir. I strive for perfection in all tasks.",
                    "I appreciate the sentiment, sir. Performance optimization is a priority.",
                    "Your satisfaction is my primary objective, sir."
                ]
            }
        };
    }
    
    findCommand(userInput) {
        const input = userInput.toLowerCase();
        
        for (const [commandName, commandData] of Object.entries(this.commands)) {
            if (commandData.keywords.some(keyword => input.includes(keyword))) {
                return {
                    name: commandName,
                    data: commandData
                };
            }
        }
        
        return null;
    }
    
    getResponse(userInput) {
        const command = this.findCommand(userInput);
        
        if (command) {
            if (command.data.execute) {
                return command.data.execute();
            } else if (command.data.responses) {
                return command.data.responses[
                    Math.floor(Math.random() * command.data.responses.length)
                ];
            }
        }
        
        return null;
    }
    
    addCustomCommand(commandName, keywords, response) {
        this.commands[commandName] = {
            keywords: Array.isArray(keywords) ? keywords : [keywords],
            responses: Array.isArray(response) ? response : [response]
        };
    }
    
    removeCommand(commandName) {
        delete this.commands[commandName];
    }
    
    getAllCommands() {
        return Object.keys(this.commands);
    }
    
    getCommandInfo(commandName) {
        return this.commands[commandName] || null;
    }
}

// Export for use in jarvis.js
window.CommandLibrary = CommandLibrary;