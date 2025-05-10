import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css"; // Updated CSS file name

const DermaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Dermatology Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I understand your concern about skin conditions. Could you provide more details about your symptoms?",
        "For dermatological issues, I recommend consulting with a dermatologist for proper diagnosis.",
        "Common skin conditions include eczema, psoriasis, and acne. Are you experiencing any of these?",
        "Proper skincare routine is important. Are you following any specific regimen?",
        "I suggest keeping the affected area clean and moisturized until you can see a specialist."
      ];
      const botResponse = {
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot"
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="derma-chat-container">
      {/* Chat Trigger Button */}
      <div className={`derma-chat-trigger ${isOpen ? 'derma-active' : ''}`} onClick={toggleChat}>
        <div className="derma-chat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M8 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-4 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
        <span>Skin Health Assistant</span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="derma-chat-window">
          <div className="derma-chat-header">
            <div className="derma-header-content">
              <div className="derma-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                </svg>
              </div>
              <div className="derma-header-text">
                <h5>Dermatology Assistant</h5>
                <small>Ask about skin conditions, treatments, and care</small>
              </div>
            </div>
            <button className="derma-close-btn" onClick={toggleChat}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="derma-chat-body">
            <div className="derma-welcome-msg">
              <p>Welcome to your dermatology assistant. I can provide general information about skin conditions, but please consult a doctor for medical advice.</p>
            </div>
            
            {messages.map((message, index) => (
              <div key={index} className={`derma-msg ${message.sender}`}>
                <div className="derma-msg-content">
                  {message.sender === 'bot' && (
                    <div className="derma-bot-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                        <path d="M8 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-4 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  )}
                  <div className={`derma-msg-bubble ${message.sender}`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="derma-chat-footer">
            <div className="derma-input-container">
              <input
                type="text"
                placeholder="Ask about skin conditions, treatments..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            <div className="derma-disclaimer">
              <small>Note: This is not a substitute for professional medical advice.</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DermaChat;