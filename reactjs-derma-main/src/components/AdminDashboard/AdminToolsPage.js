import React, { useState } from 'react';
import './AdminPage.css';

const AdminToolsPage = () => {
  const [activeTab, setActiveTab] = useState('system');

  const tools = {
    system: [
      { name: 'Database Backup', description: 'Create a full system backup' },
      { name: 'Cache Clear', description: 'Clear system cache' },
      { name: 'Server Status', description: 'Check server health' }
    ],
    users: [
      { name: 'Bulk User Import', description: 'Import multiple users at once' },
      { name: 'Permission Manager', description: 'Manage user permissions' },
      { name: 'Activity Logs', description: 'View user activity history' }
    ],
    content: [
      { name: 'CMS Manager', description: 'Manage website content' },
      { name: 'Email Templates', description: 'Edit system emails' },
      { name: 'Form Builder', description: 'Create custom forms' }
    ]
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Administrator Tools</h2>
        <p>System management and configuration</p>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System Tools
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={`tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content Tools
        </button>
      </div>
      
      <div className="tools-grid">
        {tools[activeTab].map((tool, index) => (
          <div key={index} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <button className="btn">Run Tool</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminToolsPage;