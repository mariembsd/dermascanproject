import React from 'react';
import './AdminPage.css';

const ReportsPage = () => {
  const reports = [
    { id: 1, title: 'Monthly Patient Report', date: 'May 2023', type: 'Patient' },
    { id: 2, title: 'Dermatologist Performance', date: 'May 2023', type: 'Performance' },
    { id: 3, title: 'Financial Summary', date: 'Q1 2023', type: 'Financial' },
    { id: 4, title: 'System Usage Report', date: 'April 2023', type: 'System' }
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Reports Management</h2>
        <div className="header-actions">
          <button className="btn primary">Generate New Report</button>
        </div>
      </div>
      
      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-info">
              <h3>{report.title}</h3>
              <div className="report-meta">
                <span>{report.type} Report</span>
                <span>•</span>
                <span>{report.date}</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn">View</button>
              <button className="btn">Download</button>
              <button className="btn danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;