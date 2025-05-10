import React, { useState } from 'react';
import './AdminPage.css';

const MessagesList = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sarah Johnson', subject: 'Appointment Question', date: '2 hours ago', read: false },
    { id: 2, sender: 'Dr. Michael Brown', subject: 'Patient Referral', date: '1 day ago', read: true },
    { id: 3, sender: 'Support Team', subject: 'System Update Notification', date: '3 days ago', read: true },
    { id: 4, sender: 'Emily Davis', subject: 'Prescription Refill Request', date: '1 week ago', read: false }
  ]);

  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Messages</h2>
        <div className="header-actions">
          <button className="btn primary">New Message</button>
        </div>
      </div>
      
      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${message.read ? '' : 'unread'}`}
            onClick={() => markAsRead(message.id)}
          >
            <div className="message-sender">{message.sender}</div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-date">{message.date}</div>
            {!message.read && <div className="unread-badge"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;