import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './Css.css';

const Profile = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id;

      fetch(`http://localhost:5000/api/patients/${id}`)
        .then((res) => res.json())
        .then((data) => setPatient(data))
        .catch((err) => console.error('Error fetching patient profile:', err));
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  if (!patient) return <p>Loading patient profile...</p>;

  // Helper: Calculate age from birthdate
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const ageDiff = Date.now() - birth.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <Card className="p-4">
      <h4>👤 Patient Profile</h4>
      <p><strong>Name:</strong> {patient.fullName}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phoneNumber}</p>
      <p><strong>Type of Disease:</strong> {patient.medicalConditions || 'N/A'}</p>
      <p><strong>Skin Type:</strong> {patient.skinType}</p>
      <p><strong>Age:</strong> {calculateAge(patient.birthDate)}</p>
    </Card>
  );
};

export default Profile;
