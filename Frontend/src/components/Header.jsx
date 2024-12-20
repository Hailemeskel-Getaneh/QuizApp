import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/componentstyle/Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <div className="one-links">
          <NavLink className="link" to="/quizPage">
            page
          </NavLink>
        </div>
        <NavLink to="/login">
          <button className="button1">Login</button>
        </NavLink>
      </div>
    </div>
  );
}
