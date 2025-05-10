import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './Css.css';


const AppointmentsPatient = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/appointments/patient/${user.id}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error('Error fetching appointments:', err));
  }, [user]);

  return (
    <Card className="p-4">
      <h4>📅 My Appointments</h4>
      {appointments.length === 0 ? (
        <p className="mt-3 text-muted">No appointments found.</p>
      ) : (
        <ul className="list-group mt-3">
          {appointments.map((appt) => (
            <li key={appt._id} className="list-group-item">
              <strong>{appt.dermatologistId?.fullName || 'Unknown Dermatologist'}</strong> <br />
              {appt.date}, {appt.time}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default AppointmentsPatient;
