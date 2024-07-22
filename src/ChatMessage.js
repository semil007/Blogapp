import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
        </div>
    );
};

export default ChatMessage;
