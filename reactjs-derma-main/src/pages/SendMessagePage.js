import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const SendMessagePage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: send message to backend
    alert('Message sent: ' + message);
    setMessage('');
  };

  return (
    <Card className="p-4 mt-4">
      <h4>💬 Send a Message to the Dermatologist</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="messageTextArea" className="mb-3">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Send Message</Button>
      </Form>
    </Card>
  );
};

export default SendMessagePage;
