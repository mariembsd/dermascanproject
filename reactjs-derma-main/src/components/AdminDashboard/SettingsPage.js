import React, { useState } from 'react';
import './AdminPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    clinicName: 'DermaCare Clinic',
    timezone: 'UTC+2',
    appointmentDuration: 30,
    notificationsEnabled: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>System Settings</h2>
        <p>Configure application preferences</p>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>
      
      <div className="settings-form">
        {activeTab === 'general' && (
          <>
            <div className="form-group">
              <label>Clinic Name</label>
              <input 
                type="text" 
                name="clinicName" 
                value={formData.clinicName} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select 
                name="timezone" 
                value={formData.timezone} 
                onChange={handleChange}
              >
                <option value="UTC+2">UTC+2 (Cairo)</option>
                <option value="UTC+1">UTC+1 (Paris)</option>
                <option value="UTC">UTC (London)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Default Appointment Duration (minutes)</label>
              <input 
                type="number" 
                name="appointmentDuration" 
                value={formData.appointmentDuration} 
                onChange={handleChange} 
                min="15"
                max="60"
                step="5"
              />
            </div>
          </>
        )}
        
        {activeTab === 'notifications' && (
          <>
            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  name="notificationsEnabled" 
                  checked={formData.notificationsEnabled} 
                  onChange={handleChange} 
                />
                Enable Email Notifications
              </label>
            </div>
            <div className="form-group">
              <label>Notification Email Address</label>
              <input 
                type="email" 
                placeholder="notifications@dermacare.com" 
              />
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button className="btn primary">Save Changes</button>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;