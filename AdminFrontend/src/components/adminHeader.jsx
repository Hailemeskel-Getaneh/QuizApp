import React, { useState } from "react";
import "../styles/adminHeader.css";
// import "../styles/sidebar.css"

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="admin-header">
      <div className="logo">
        <button onClick={toggleSidebar} className="toggle-btn">
          ☰
        </button>
        Quiz Admin
      </div>
      <nav className="nav-links">
        <a href="dashboard">Dashboard</a>
        <a href="profile">Profile</a>
        <a id="logout" href="logout">Logout</a>
      </nav>
    </header>
    
  );
};

export default AdminHeader;
