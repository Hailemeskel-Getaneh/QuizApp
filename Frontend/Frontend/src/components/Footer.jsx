import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/componentstyle/footer.css';
import { FaFacebook, FaLinkedin, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
    </div>
  );
}