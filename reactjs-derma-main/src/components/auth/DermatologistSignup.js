import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const DermatologistSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '',
    phone: '',
    address: '',
    diploma: [], // changed to array
    cinCard: [], // changed to array
    availableDays: [],
    status: 'pending'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === 'diploma' || name === 'cinCard') {
      setFormData(prev => ({
        ...prev,
        [name]: [...files] // store multiple files
      }));
    } else if (name === 'availableDays') {
      setFormData(prev => ({
        ...prev,
        availableDays: checked
          ? [...prev.availableDays, value]
          : prev.availableDays.filter(day => day !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('fullName', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    formPayload.append('yearsOfExperience', formData.experience);
    formPayload.append('phoneNumber', formData.phone);
    formPayload.append('address', formData.address);

    // append multiple files
    formData.diploma.forEach((file) => {
      formPayload.append('diploma', file);
    });
    formData.cinCard.forEach((file) => {
      formPayload.append('cinCardPhoto', file);
    });

    formData.availableDays.forEach((day) => {
      formPayload.append('availableDays[]', day);
    });

    try {
      const response = await fetch('http://localhost:5000/api/dermatologists/signup', {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Dermatologist Registration</h2>
        <p>Please provide your professional details</p>
      </div>

      <form onSubmit={handleSubmit} className="derma-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your clinic or practice location"
          />
        </div>

        <div className="form-group">
          <label>Diploma/Certificate</label>
          <input
            type="file"
            name="diploma"
            onChange={handleChange}
            required
            accept=".pdf,.jpg,.png"
            multiple
          />
          <small>Upload your medical license or diploma</small>
        </div>

        <div className="form-group">
          <label>CIN Card Photo</label>
          <input
            type="file"
            name="cinCard"
            onChange={handleChange}
            required
            accept=".jpg,.jpeg,.png"
            multiple
          />
          <small>Upload a photo of your CIN card</small>
        </div>

        <div className="form-group">
          <label>Available Days for Consultation</label>
          <div className="day-grid">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <label key={day} className="day-checkbox">
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day}
                  checked={formData.availableDays.includes(day)}
                  onChange={handleChange}
                  
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate('/')}>Back</button>
          <button type="submit" className="primary-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default DermatologistSignup;
