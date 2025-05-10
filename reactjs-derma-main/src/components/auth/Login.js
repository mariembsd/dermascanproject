import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Forms.css"; // custom CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      role === 'patient'
        ? 'http://localhost:5000/api/patients/signin'
        : 'http://localhost:5000/api/dermatologists/signin';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        if (result.user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (result.user.role === 'dermatologist') {
          navigate('/dermatologist/dashboard');
        } else {
          navigate('/');
        }
      } else {
        if (response.status === 403 && role === 'dermatologist') {
          alert('Your account is not approved yet. Please wait for admin approval.');
        } else {
          alert(result.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };


  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-box shadow">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Login as</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="dermatologist">Dermatologist</option>
            </select>
          </div>

          <button type="submit" className="btn btn-brown w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
