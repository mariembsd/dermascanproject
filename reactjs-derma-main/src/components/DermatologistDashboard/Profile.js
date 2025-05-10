import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './DermCss.css';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id;

      fetch(`http://localhost:5000/api/dermatologists/${id}`)
        .then((res) => res.json())
        .then((data) => setProfileData(data))
        .catch((err) => console.error('Error fetching dermatologist:', err));
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <Card className="p-4">
      <h4>👤 Dermatologist Profile</h4>
      <div className="profile-info">
        <p><strong>Name:</strong> {profileData.fullName}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone:</strong> {profileData.phoneNumber}</p>
        <p><strong>Years of Experience:</strong> {profileData.yearsOfExperience}</p>
        <p><strong>Clinic Address:</strong> {profileData.address}</p>
        <p><strong>Available Days:</strong> {profileData.availableDays?.join(', ')}</p>
      </div>
    </Card>
  );
};

export default ProfilePage;
