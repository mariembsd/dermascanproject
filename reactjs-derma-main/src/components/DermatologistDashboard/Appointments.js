import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import './DermCss.css';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const dermatologistId = JSON.parse(localStorage.getItem('user')).id; // Assuming logged-in dermatologist

    fetch(`http://localhost:5000/api/appointments/dermatologist/${dermatologistId}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

  return (
    <Card className="p-4">
      <h4>📅 Appointments</h4>
      <ListGroup variant="flush">
        {appointments.map((appointment, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between">
            <span>{appointment.date} at {appointment.time}</span>
            <span>{appointment.patientName || 'Unknown Patient'}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default AppointmentPage;