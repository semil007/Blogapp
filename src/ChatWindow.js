import React, { useState } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);

    const handleSend = async (message) => {
        const userMessage = { sender: 'user', text: message };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generate`, { prompt: message });
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
            </div>
            <ChatInput onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;
