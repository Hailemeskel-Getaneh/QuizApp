import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/componentstyle/Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
       
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
