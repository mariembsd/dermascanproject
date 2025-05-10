import React, { useState, useEffect, useRef } from 'react';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import './DermCss.css';

const PatientMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [reply, setReply] = useState('');
  const [conversations, setConversations] = useState([]);
  const chatEndRef = useRef(null);

  const dermatologist = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!dermatologist?.id) return;

    fetch(`http://localhost:5000/api/chat/discussions/dermatologist/${dermatologist.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setConversations(data);
        } else {
          console.error('Expected an array of conversations, got:', data);
          setConversations([]);
        }
      })
      .catch(err => console.error('Failed to load discussions:', err));
  }, [dermatologist]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations, selectedChat]);

  const handleReplySend = async () => {
    if (!reply.trim() || selectedChat === null) return;

    const discussion = conversations[selectedChat];

    const newMessage = {
      discussionId: discussion._id,
      senderRole: 'dermatologist',
      senderId: dermatologist.id,
      content: reply,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });

      if (res.ok) {
        const saved = await res.json();
        const updated = [...conversations];
        updated[selectedChat].messages.push(saved);
        setConversations(updated);
        setReply('');
      }
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const handleSelectChat = (index) => setSelectedChat(index);

  return (
    <div className="messenger-container">
      {/* Sidebar List */}
      {selectedChat !== null && (
        <div className="sidebar-list">
          <h5 className="p-3">📨 Messages</h5>
          <ListGroup variant="flush">
            {conversations.map((conv, index) => (
              <ListGroup.Item
                key={conv._id}
                action
                onClick={() => handleSelectChat(index)}
                className={`message-item ${selectedChat === index ? 'active' : ''}`}
              >
                <strong>{conv.patientId?.fullName || 'Patient'}</strong>
                <div className="text-muted small">
                  {conv.messages?.[conv.messages.length - 1]?.content.slice(0, 30) || 'No messages'}...
                </div>
                <small className="text-muted d-block">
                  {conv.messages?.length > 0
                    ? new Date(conv.messages[conv.messages.length - 1].createdAt).toLocaleDateString()
                    : ''}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {/* Message List Overview */}
      {selectedChat === null && (
        <div className="full-message-list">
          <h4 className="mb-4">💬 Patient Messages</h4>
          <div className="message-list-vertical">
            {conversations.map((conv, index) => (
              <Card key={conv._id} className="message-bar" onClick={() => handleSelectChat(index)}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{conv.patientId?.fullName || 'Patient'}</h6>
                    <small className="text-muted">{conv.messages?.[0]?.content.slice(0, 60) || 'No messages'}...</small>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">
                      {conv.messages?.length > 0
                        ? new Date(conv.messages[conv.messages.length - 1].createdAt).toLocaleDateString()
                        : ''}
                    </small>
                    <br />
                    <span className="badge bg-success">Chat</span>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Chat Window */}
      {selectedChat !== null && (
        <div className="chat-window">
          <Card className="d-flex flex-column h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>🧑 {conversations[selectedChat].patientId?.fullName || 'Patient'}</h5>
              <Button variant="outline-secondary" size="sm" onClick={() => setSelectedChat(null)}>← Back</Button>
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              {conversations[selectedChat].messages?.map((msg, i) => (
                <div key={msg._id || i} className={`mb-3 ${msg.senderRole === 'dermatologist' ? 'text-end' : 'text-start'}`}>
                  <div
                    className={`p-2 rounded ${msg.senderRole === 'dermatologist' ? 'bg-info text-white' : 'bg-light'}`}
                    style={{ display: 'inline-block', maxWidth: '70%' }}
                  >
                    <strong>{msg.senderRole}</strong>
                    <div>{msg.content}</div>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </Card.Body>
            <Card.Footer>
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReplySend()}
                />
                <Button variant="primary" className="ms-2" onClick={handleReplySend}>Send</Button>
              </Form>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientMessages;
