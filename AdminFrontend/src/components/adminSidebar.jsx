import React, { useState } from "react";
import { FaHome, FaClipboardList, FaQuestionCircle, FaUsers, FaThList, FaChartLine } from "react-icons/fa";  // Importing icons
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav>
        <a href="dashboard">
          <FaHome className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </a>
        <a href="quiz-management">
          <FaClipboardList className="sidebar-icon" />
          <span className="sidebar-text">Quizzes</span>
        </a>
        <a href="question-management">
          <FaQuestionCircle className="sidebar-icon" />
          <span className="sidebar-text">Questions</span>
        </a>
        <a href="user-management">
          <FaUsers className="sidebar-icon" />
          <span className="sidebar-text">Users</span>
        </a>
        <a href="catagory-management">
          <FaThList className="sidebar-icon" />
          <span className="sidebar-text">Categories</span>
        </a>
        <a href="reports">
          <FaChartLine className="sidebar-icon" />
          <span className="sidebar-text">Reports</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
