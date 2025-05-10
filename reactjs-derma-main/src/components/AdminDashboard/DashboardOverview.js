import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiUser, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
import './DashboardOverview.css';
import { FiMessageSquare } from 'react-icons/fi';

const DashboardOverview = () => {
  // Sample data
  const stats = [
    { 
      title: 'Total Patients', 
      value: '1,245', 
      change: '12%', 
      trend: 'up',
      icon: <FiUser className="stat-icon" />,
      color: 'var(--primary-color)'
    },
    { 
      title: 'Active Dermatologists', 
      value: '42', 
      change: '5%', 
      trend: 'up',
      icon: <FiUser className="stat-icon" />,
      color: 'var(--success-color)'
    },
    { 
      title: 'Today\'s Appointments', 
      value: '28', 
      change: '3%', 
      trend: 'down',
      icon: <FiCalendar className="stat-icon" />,
      color: 'var(--warning-color)'
    },
    { 
      title: 'Pending Approvals', 
      value: '7', 
      change: '2', 
      trend: 'neutral',
      icon: <FiClock className="stat-icon" />,
      color: 'var(--danger-color)'
    }
  ];

  const recentAppointments = [
    { 
      id: 1, 
      patient: 'Sarah Johnson', 
      dermatologist: 'Dr. Smith', 
      date: 'Today, 10:30 AM', 
      status: 'confirmed',
      avatar: 'SJ'
    },
    { 
      id: 2, 
      patient: 'Michael Brown', 
      dermatologist: 'Dr. Lee', 
      date: 'Today, 11:45 AM', 
      status: 'confirmed',
      avatar: 'MB'
    },
    { 
      id: 3, 
      patient: 'Emily Davis', 
      dermatologist: 'Dr. Wilson', 
      date: 'Tomorrow, 9:15 AM', 
      status: 'pending',
      avatar: 'ED'
    }
  ];

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <div className="header-actions">
          <button className="btn primary">Generate Report</button>
          <button className="btn secondary">Export Data</button>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon-container" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <FiTrendingUp /> : stat.trend === 'down' ? <FiTrendingDown /> : <FiCheckCircle />}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recent Appointments</h3>
          <button className="btn link">View All</button>
        </div>
        <div className="appointments-table">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Dermatologist</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">{appointment.avatar}</div>
                      <div className="patient-name">{appointment.patient}</div>
                    </div>
                  </td>
                  <td>{appointment.dermatologist}</td>
                  <td>{appointment.date}</td>
                  <td>
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn small view">View</button>
                      {appointment.status === 'pending' && (
                        <button className="btn small primary">Confirm</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn">
            <div className="action-icon">
              <FiUser size={20} />
            </div>
            <span>Add New Dermatologist</span>
          </button>
          <button className="quick-action-btn">
            <div className="action-icon">
              <FiCalendar size={20} />
            </div>
            <span>Schedule Appointment</span>
          </button>
          <button className="quick-action-btn">
            <div className="action-icon">
              <FiMessageSquare size={20} />
            </div>
            <span>Send Announcement</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;