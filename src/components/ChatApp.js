import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const ChatApp = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    try {
      const aiResponse = await fetchAIResponse(input);
      const aiMessage = { text: aiResponse, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }

    setInput('');
  };

  const fetchAIResponse = async (input) => {
    const response = await axios.post(
      process.env.REACT_APP_OPENAI_API_URL,
      {
        model: process.env.REACT_APP_OPENAI_MODEL,
        prompt: input,
        max_tokens: process.env.REACT_APP_OPENAI_MAX_TOKENS,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  };

  const handleChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} sender={message.sender} text={message.text} />
        ))}
      </div>
      <textarea
        rows={3}
        placeholder="Type your message..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
