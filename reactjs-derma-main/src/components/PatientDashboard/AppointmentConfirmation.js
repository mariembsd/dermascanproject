import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, date, hour } = location.state || {};

  if (!doctor || !date || !hour) {
    return <p className="text-center mt-5">❌ No appointment data found.</p>;
  }

  return (
    <div className="container my-5">
      <div className="text-center border p-4 rounded shadow">
        <h3 className="mb-4 text-success">✅ Appointment Confirmed!</h3>
        <p><strong>Doctor:</strong> {doctor.name}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Doctor ID:</strong> {doctor.id}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {hour}:00</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
