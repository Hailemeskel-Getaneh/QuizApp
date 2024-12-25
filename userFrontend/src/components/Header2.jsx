import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/componentstyle/Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Update login state
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token from localStorage
    setIsLoggedIn(false); // Update login state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="header">
      <div className="name">
        <span>?</span>Quiz
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <span className="close-icon">✖</span> : <span className="menu-icon">☰</span>}
      </div>

      {/* Navigation Links */}
      <div className={`links ${isMenuOpen ? 'open' : ''}`}>
        
       
               </div>
          <button className="button1" id="log" onClick={handleLogout}>
            Logout
          </button>
        
      
      </div>
    
  );
}