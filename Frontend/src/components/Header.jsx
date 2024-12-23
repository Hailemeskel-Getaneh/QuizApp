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
        <div className="one-links">
          <NavLink className="link" to="/" exact>
            Home
          </NavLink>
        </div>
        <div className="one-links">
          <NavLink className="link" to="/about">
            About
          </NavLink>
        </div>
        <div className="one-links">
          <NavLink className="link" to="/help">
            Help
          </NavLink>
        </div>
        <div className="one-links">
          <NavLink className="link" to="/contact">
            Contact
          </NavLink>
        </div>
        
        {/* Dynamic Login/Logout Button */}
        {isLoggedIn ? (
          <button className="button1" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="button1">Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}