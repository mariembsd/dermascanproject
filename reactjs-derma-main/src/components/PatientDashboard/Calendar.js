import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Profile from './Profile';
import DermatologistList from './DermatologistList';
import Appointments from './AppointmentsPatient';

const AppointmentCalendar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [selectedDate, setSelectedDate] = useState(moment());
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState('calendar');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/appointments/patient/${user.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

  const getAppointmentForDate = (date) => {
    const formatted = date.format('YYYY-MM-DD');
    return appointments.find(appt => appt.date === formatted);
  };

  const renderMonthView = () => {
    const startOfMonth = moment(selectedDate).startOf('month');
    const daysInMonth = selectedDate.daysInMonth();
    const firstDay = startOfMonth.day();
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`} className="bg-light"></td>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const day = moment(startOfMonth).date(d);
      const formatted = day.format('YYYY-MM-DD');
      const appointment = getAppointmentForDate(day);

      cells.push(
        <td
          key={d}
          onClick={() => {
            setSelectedDate(day);
            setShowModal(true);
          }}
          className={`selectable ${appointment ? 'bg-success text-white' : ''}`}
        >
          {d}
        </td>
      );

      if ((cells.length % 7 === 0) || d === daysInMonth) {
        rows.push(<tr key={d}>{cells}</tr>);
        cells = [];
      }
    }

    return (
      <table className="table table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const goToPrevious = () => {
    setSelectedDate(prev => moment(prev).subtract(1, 'month'));
  };

  const goToNext = () => {
    setSelectedDate(prev => moment(prev).add(1, 'month'));
  };

  const renderCalendar = () => {
    const appointment = getAppointmentForDate(selectedDate);

    return (
      <>
        <h3 className="text-center mb-4">📅 Appointment Calendar</h3>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Button variant="outline-secondary" onClick={goToPrevious} className="me-2">← Prev</Button>
            <Button variant="outline-secondary" onClick={goToNext}>Next →</Button>
          </div>
          <h5 className="mb-0">
            {selectedDate.format('MMMM YYYY')}
          </h5>
          <div />
        </div>
        {renderMonthView()}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Appointment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {appointment ? (
              <>
                <p><strong>Dermatologist:</strong> {appointment.dermatologistId?.fullName || 'N/A'}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
              </>
            ) : (
              <p>No appointment on this day.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className="d-flex">
      <div className="p-4 flex-grow-1" style={{ backgroundColor: '#f4f6fa', minHeight: '100vh' }}>
        {activeView === 'profile' && <Profile />}
        {activeView === 'dermatologists' && <DermatologistList />}
        {activeView === 'appointments' && <Appointments />}
        {activeView === 'calendar' && renderCalendar()}
      </div>

      <style>{`
        .selectable {
          cursor: pointer;
          transition: 0.3s;
        }
        .selectable:hover {
          background-color: #d4edda;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AppointmentCalendar;