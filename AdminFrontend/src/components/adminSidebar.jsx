import React, { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "<" : ">"}
      </button> */}
      
      <nav>
        <a href="dashboard">Dashboard</a>
        <a href="quiz-management">Quiz </a>
        <a href="question-management">Questions </a>
        <a href="user-management">User </a>
        <a href="catagory-management">Catagory</a>
        <a href="reports">Reports</a>
      </nav>
      
    </aside>
  );
};

export default Sidebar;
