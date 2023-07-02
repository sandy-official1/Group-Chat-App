import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Fetch messages and users from the server
    fetchMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Send the message to the server
    try {
      await axios.post('/messages', {
        content: currentMessage,
      });

      // Clear the message input
      setCurrentMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        <div className="message-container">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p className="message-sender">{message.sender}</p>
              <p className="message-content">{message.content}</p>
            </div>
          ))}
        </div>
        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
