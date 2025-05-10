import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiBell, FiUser, FiLogOut, FiHome, 
  FiUsers, FiCalendar, FiMessageSquare, FiSettings,
  FiPieChart, FiFileText, FiShield
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard');
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <FiUsers size={20} />, label: 'Dermatologists', path: '/admin/dermatologists' },
    { icon: <FiUsers size={20} />, label: 'Patients', path: '/admin/patients' },
    { icon: <FiCalendar size={20} />, label: 'Appointments', path: '/admin/appointments' },
    { icon: <FiMessageSquare size={20} />, label: 'Messages', path: '/admin/messages' },
    { icon: <FiPieChart size={20} />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <FiFileText size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <FiShield size={20} />, label: 'Admin Tools', path: '/admin/tools' },
    { icon: <FiSettings size={20} />, label: 'Settings', path: '/admin/settings' }
  ];

  // Update page title when route changes
  useEffect(() => {
    const currentItem = menuItems.find(item => location.pathname === item.path);
    setCurrentPageTitle(currentItem?.label || 'Dashboard');
  }, [location]);

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const clearNotifications = () => {
    setUnreadNotifications(0);
  };

  return (
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="mobile-logo">DermaCare Admin</h1>
        <div className="mobile-notification">
          <FiBell size={20} />
          {unreadNotifications > 0 && (
            <span className="notification-badge">{unreadNotifications}</span>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>DermaCare</h2>
          <button 
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
        
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `menu-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && <span className="menu-label">{item.label}</span>}
              {sidebarOpen && item.label === 'Messages' && unreadNotifications > 0 && (
                <span className="menu-notification-badge">{unreadNotifications}</span>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">
              <FiUser size={20} />
            </div>
            {sidebarOpen && (
              <div className="admin-info">
                <div className="admin-name">Admin User</div>
                <div className="admin-role">Super Admin</div>
                <div className="admin-email">admin@dermacare.com</div>
              </div>
            )}
          </div>
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="menu-icon"><FiLogOut size={18} /></span>
            {sidebarOpen && <span className="menu-label">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="admin-header">
          <div className="header-left">
            <h1 className="page-title">{currentPageTitle}</h1>
            <div className="breadcrumbs">
              <span>Admin</span>
              <span>›</span>
              <span>{currentPageTitle}</span>
            </div>
          </div>
          <div className="admin-controls">
            <div className="notification-wrapper">
              <button 
                className="notification-btn"
                onClick={clearNotifications}
                aria-label="Notifications"
              >
                <FiBell size={20} />
                {unreadNotifications > 0 && (
                  <span className="notification-badge">{unreadNotifications}</span>
                )}
              </button>
            </div>
            <div className="admin-profile">
              <div className="admin-avatar">
                <FiUser size={20} />
              </div>
              <div className="admin-info">
                <div className="admin-name">Admin User</div>
                <div className="admin-role">Super Admin</div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="content-area">
          <Outlet />
        </div>
        
        <footer className="admin-footer">
          <p>© {new Date().getFullYear()} DermaCare Admin Portal. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;