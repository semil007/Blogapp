import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        onSend(input);
        setInput('');
    };

    return (
        <div className="chat-input">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatInput;
