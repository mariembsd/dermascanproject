import React, { useState, useEffect, useRef } from 'react';
import { Card, ListGroup, Form, Button, Dropdown } from 'react-bootstrap';
import './Css.css';

const Messagesp = () => {
  const [dermatologists, setDermatologists] = useState([]);
  const [selectedDermatologist, setSelectedDermatologist] = useState(null);
  const [discussionId, setDiscussionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const chatEndRef = useRef(null);

  const patient = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:5000/api/dermatologists')
      .then(res => res.json())
      .then(data => setDermatologists(data))
      .catch(err => console.error('Error loading dermatologists:', err));
  }, []);

  useEffect(() => {
    if (discussionId) {
      fetch(`http://localhost:5000/api/chat/messages/${discussionId}`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Error loading messages:', err));
    }
  }, [discussionId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleStartChat = async (dermatologist) => {
    setSelectedDermatologist(dermatologist);
    try {
      const res = await fetch('http://localhost:5000/api/chat/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dermatologistId: dermatologist._id, patientId: patient.id })
      });
      const result = await res.json();
      setDiscussionId(result._id);
    } catch (err) {
      console.error('Error starting chat:', err);
    }
  };

  const handleReplySend = async () => {
    if (reply.trim() && discussionId) {
      try {
        const res = await fetch('http://localhost:5000/api/chat/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            discussionId,
            senderId: patient.id,
            senderRole: 'patient',
            content: reply
          })
        });
        const newMsg = await res.json();
        setMessages(prev => [...prev, newMsg]);
        setReply('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="messenger-container">
      {!discussionId ? (
        <div className="full-message-list">
          <h4 className="mb-4">💬 Start a Chat with a Dermatologist</h4>
          <ListGroup>
            {dermatologists.map((derm) => (
              <ListGroup.Item
                key={derm._id}
                action
                onClick={() => handleStartChat(derm)}
              >
                🧑 {derm.fullName} ({derm.email})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <div className="chat-window">
          <Card className="d-flex flex-column h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>🧑 {selectedDermatologist.fullName}</h5>
              <Button variant="outline-secondary" size="sm" onClick={() => {
                setDiscussionId(null);
                setSelectedDermatologist(null);
                setMessages([]);
              }}>
                ← Back
              </Button>
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.senderRole === 'patient' ? 'text-end' : 'text-start'}`}>
                  <div
                    className={`p-2 rounded ${msg.senderRole === 'patient' ? 'bg-info text-white' : 'bg-light'}`}
                    style={{ display: 'inline-block', maxWidth: '70%' }}
                  >
                    <strong>{msg.senderRole}</strong>
                    <div>{msg.content}</div>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </Card.Body>
            <Card.Footer>
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReplySend()}
                />
                <Button variant="primary" className="ms-2" onClick={handleReplySend}>
                  Send
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Messagesp;
