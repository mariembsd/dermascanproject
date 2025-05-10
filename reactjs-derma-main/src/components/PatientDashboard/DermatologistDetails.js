import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import moment from 'moment';

const DermatologistDetails = ({ dermatologist }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [confirmation, setConfirmation] = useState('');

  const availableSlots = Array.from({ length: 8 }, (_, i) => `${(i + 9).toString().padStart(2, '0')}:00`);
  const availableDays = dermatologist?.availableDays || [];

  const generateDates = () => {
    const today = moment();
    const dates = [];
    for (let i = 0; i < 28; i++) {
      const date = moment(today).add(i, 'days');
      if (availableDays.includes(date.format('dddd'))) {
        dates.push(date);
      }
    }
    return dates;
  };

  useEffect(() => {
    if (!selectedDate || !dermatologist?._id) return;

    const dateStr = moment(selectedDate).format('YYYY-MM-DD');

    fetch(`http://localhost:5000/api/appointments/available?dermatologistId=${dermatologist._id}&date=${dateStr}`)
      .then(res => res.json())
      .then(data => {
        const hours = Array.isArray(data) ? data.map(item => item.time) : [];
        setBookedSlots(hours);
      })
      .catch(err => {
        console.error('Error loading appointments', err);
        setBookedSlots([]);
      });
  }, [selectedDate, dermatologist]);

  const handleSubmit = async () => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    const appointmentData = {
      dermatologistId: dermatologist._id,
      patientId: JSON.parse(localStorage.getItem('user')).id,
      date: formattedDate,
      time: selectedHour,
    };

    const res = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (res.ok) {
      setConfirmation(`✅ Appointment booked on ${formattedDate} at ${selectedHour}`);
      setBookedSlots(prev => [...prev, selectedHour]);
      setSelectedDate('');
      setSelectedHour('');
    } else {
      const err = await res.json();
      alert(err.message || 'Booking failed.');
    }
  };

  const handleBookAppointment = () => {
    setShowForm(true);
    setConfirmation('');
  };

  const handleSendMessage = () => {
    alert('Messaging feature coming soon...');
  };

  if (!dermatologist) return null;

  return (
    <>
      <Card className="p-4 mt-4">
        <h4>👨‍⚕️ Dermatologist Details</h4>
        <p><strong>Name:</strong> {dermatologist.fullName}</p>
        <p><strong>Years of Experience:</strong> {dermatologist.yearsOfExperience}</p>
        <p><strong>Phone:</strong> {dermatologist.phoneNumber}</p>
        <p><strong>Address:</strong> {dermatologist.address}</p>
        <p><strong>Available Days:</strong> {availableDays.join(', ')}</p>

        <div className="d-flex gap-3 mt-3">
          <Button variant="success" onClick={handleBookAppointment}>📅 Book an Appointment</Button>
          <Button variant="info" onClick={handleSendMessage}>💬 Write a Message</Button>
        </div>
      </Card>

      {showForm && (
        <Card className="p-4 mt-4 bg-light">
          <h5>📌 Book Your Appointment</h5>

          {confirmation && <Alert variant="success">{confirmation}</Alert>}

          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Select
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedHour('');
                }}
              >
                <option value="">-- Select a date --</option>
                {generateDates().map(date => (
                  <option key={date.format()} value={date.format()}>{date.format('dddd, MMM Do')}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Hour</Form.Label>
              <Form.Select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                disabled={!selectedDate}
              >
                <option value="">-- Select an hour --</option>
                {availableSlots
                  .filter(hour => !bookedSlots.includes(hour))
                  .map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedHour}
            >
              ✅ Confirm Booking
            </Button>
          </Form>
        </Card>
      )}
    </>
  );
};

export default DermatologistDetails;
