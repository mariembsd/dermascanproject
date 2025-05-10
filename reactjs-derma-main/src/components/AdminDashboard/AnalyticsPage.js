import React from 'react';
import './AdminPage.css';

const AnalyticsPage = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Analytics Dashboard</h2>
        <p>View system metrics and performance indicators</p>
      </div>
      
      <div className="analytics-grid">
        <div className="metric-card">
          <h3>Monthly Visits</h3>
          <div className="metric-value">2,450</div>
          <div className="metric-change positive">+12% from last month</div>
        </div>
        
        <div className="metric-card">
          <h3>Appointment Rate</h3>
          <div className="metric-value">68%</div>
          <div className="metric-change positive">+5% from last month</div>
        </div>
        
        <div className="metric-card">
          <h3>Patient Retention</h3>
          <div className="metric-value">82%</div>
          <div className="metric-change negative">-3% from last month</div>
        </div>
        
        <div className="chart-container">
          <h3>Appointments Trend</h3>
          <div className="chart-placeholder">
            [Chart visualization would go here]
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;