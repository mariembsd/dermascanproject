import React from 'react';
import { useLocation } from 'react-router-dom';

const AppointmentInfo = () => {
  const location = useLocation();
  const { doctor, date, hour } = location.state || {};
  console.log("Received:", doctor, date, hour);

  if (!doctor) {
    return <p>No appointment information found.</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📝 Appointment Summary</h2>
      <div className="card p-4 shadow-sm">
        <h4>Doctor Info</h4>
        <p><strong>ID:</strong> {doctor.id}</p>
        <p><strong>Name:</strong> Dr. {doctor.name}</p>

        <h4 className="mt-4">Appointment Details</h4>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Hour:</strong> {hour}:00</p>
      </div>
    </div>
  );
};

export default AppointmentInfo;
