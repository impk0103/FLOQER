import React from 'react';

const ChatMessage = ({ sender, text }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
