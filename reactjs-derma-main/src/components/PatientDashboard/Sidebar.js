import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import './Css.css';

const Sidebar = ({ setActiveView }) => {
  // State for notification counts
  const [messageNotifications, setMessageNotifications] = useState(3);
  const [appointmentNotifications, setAppointmentNotifications] = useState(2);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // <-- redirect to login page
  };
  const handleMessagesClick = () => {
    setMessageNotifications(0); // Clear message notifications when clicked
  };

  const handleAppointmentsClick = () => {
    setAppointmentNotifications(0); // Clear appointment notifications when clicked
  };

  return (
    <div className="bg-white border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="mb-4 text-primary">Patient Dashboard</h5>
      <ul className="list-unstyled">
        <li>
          <NavLink 
            to="/patient/dashboard/profile" 
            className={({ isActive }) => `btn w-100 text-start mb-2 ${isActive ? 'active' : ''}`}
          >
            👤 Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/patient/dashboard/Messagesp" 
            className={({ isActive }) => `btn w-100 text-start mb-2 ${isActive ? 'active' : ''}`}
            onClick={handleMessagesClick}
          >
            <span className="d-flex align-items-center">
              💬 Messages
              {messageNotifications > 0 && (
                <span className="notification-bell ms-2">
                  🔔
                  <Badge pill bg="danger" className="notification-count">
                    {messageNotifications}
                  </Badge>
                </span>
              )}
            </span>
          </NavLink>
        </li>

        
        
        
        <li>
          <NavLink 
            to="/patient/dashboard/dermatologists" 
            className={({ isActive }) => `btn w-100 text-start mb-2 ${isActive ? 'active' : ''}`}
          >
            👩‍⚕️ Dermatologists
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/patient/dashboard/appointments" 
            className={({ isActive }) => `btn w-100 text-start mb-2 ${isActive ? 'active' : ''}`}
            onClick={handleAppointmentsClick}
          >
            <span className="d-flex align-items-center">
              📅 Appointments
              {appointmentNotifications > 0 && (
                <span className="notification-bell ms-2">
                  🔔
                  <Badge pill bg="danger" className="notification-count">
                    {appointmentNotifications}
                  </Badge>
                </span>
              )}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/patient/dashboard/calendar" 
            className={({ isActive }) => `btn w-100 text-start mb-2 ${isActive ? 'active' : ''}`}
          >
            📅 Calendar
          </NavLink>
        </li>
      </ul>
              <div className="p-3">
        <button
          className="btn btn-outline-light w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
/**import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Css.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="mb-4 text-primary">Patient Dashboard</h5>
      <ul className="list-unstyled">
        <li>
          <button className="btn w-100 text-start mb-2" onClick={() => navigate('/profile')}>
            👤 Profile
          </button>
        </li>
        <li>
          <button className="btn w-100 text-start mb-2" onClick={() => navigate('/dermatologists')}>
            👩‍⚕️ Dermatologists
          </button>
        </li>
        <li>
          <button className="btn w-100 text-start mb-2" onClick={() => navigate('/appointments')}>
            📅 Appointments
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
*/