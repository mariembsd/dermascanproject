import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    gender: '',
    phone: '',
    skinType: '',
    medicalConditions: '',
    profileImages: [], // Changed to array for multiple images
    documents: []     // Added for multiple documents
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      // For file inputs
      if (name === 'profileImages') {
        setFormData(prev => ({
          ...prev,
          [name]: [...prev.profileImages, ...Array.from(files)]
        }));
      } else if (name === 'documents') {
        setFormData(prev => ({
          ...prev,
          [name]: [...prev.documents, ...Array.from(files)]
        }));
      }
    } else {
      // For regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const removeFile = (fileType, index) => {
    setFormData(prev => ({
      ...prev,
      [fileType]: prev[fileType].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.skinType) newErrors.skinType = 'Skin type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log('Patient form submitted:', formData);
  //     // Add your form submission logic here
  //     navigate('/success');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formPayload = new FormData();
    formPayload.append('fullName', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    formPayload.append('birthDate', formData.birthdate);
    formPayload.append('phoneNumber', formData.phone);
    formPayload.append('gender', formData.gender);
    formPayload.append('skinType', formData.skinType);
    formPayload.append('medicalConditions', formData.medicalConditions);

    // Append multiple images
    formData.profileImages.forEach((file) => {
      formPayload.append('images', file);
    });

    // Append multiple documents
    formData.documents.forEach((file) => {
      formPayload.append('documents', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/patients/signup', {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (response.ok) {
        alert('Patient registered successfully!');
        navigate('/login');
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Patient Registration</h2>
        <p>Please fill in your details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="derma-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="form-group">
          <label>Birthdate</label>
          <input 
            type="date" 
            name="birthdate" 
            value={formData.birthdate} 
            onChange={handleChange}
            className={errors.birthdate ? 'error' : ''}
          />
          {errors.birthdate && <span className="error-message">{errors.birthdate}</span>}
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
          <label>Gender</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
        
        <div className="form-group">
          <label>Skin Type</label>
          <select 
            name="skinType" 
            value={formData.skinType} 
            onChange={handleChange}
            className={errors.skinType ? 'error' : ''}
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="dry">Dry</option>
            <option value="oily">Oily</option>
            <option value="combination">Combination</option>
            <option value="sensitive">Sensitive</option>
          </select>
          {errors.skinType && <span className="error-message">{errors.skinType}</span>}
        </div>
        {/* Multiple Profile Images */} 
        <div className="form-group">
          <label>Images (Multiple allowed)</label>
          <input 
            type="file" 
            name="profileImages" 
            onChange={handleChange} 
            accept="image/*"
            multiple
          />
          <div className="file-list">
            {formData.profileImages.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeFile('profileImages', index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Multiple Documents */}
        <div className="form-group">
          <label>Documents (Multiple allowed)</label>
          <input 
            type="file" 
            name="documents" 
            onChange={handleChange} 
            multiple
          />
          <div className="file-list">
            {formData.documents.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeFile('documents', index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Medical Conditions */}
        <div className="form-group double-row">
          <label>Medical Conditions</label>
          <textarea 
            name="medicalConditions" 
            value={formData.medicalConditions} 
            onChange={handleChange} 
            placeholder="List any skin conditions or allergies"
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate('/')}>
            Back
          </button>
          <button type="submit" className="primary-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientSignup;