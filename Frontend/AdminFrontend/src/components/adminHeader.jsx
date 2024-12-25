import React, { useState } from "react";
import "../styles/adminHeader.css";


const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="admin-header">
      <div className="logo">
      
        Quiz Admin
      </div>
      <nav className="nav-links">
       
         <a href="profile"   className="profile"> </a>
        <a id="logout" href="LoginPage">Logout</a>
      </nav>
    </header>
    
  );
};

export default AdminHeader;
