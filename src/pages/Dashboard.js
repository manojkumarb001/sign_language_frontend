import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Dashboard.css'; // Add styles

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Menu Icon */}
      <button className="menu-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
      {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h3>Dashboard</h3>
      </div>
    </div>
  );
};

export default Dashboard;
