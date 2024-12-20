import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QuizManagement from "./pages/quizManagement";
import UserManagement from "./pages/userManagement";
import CatagoryManagement from "./pages/categoryManagement.jsx";
import AdminProfile from './pages/profile.jsx'
import QuestionManagement from "./pages/QuestionManagement.jsx";
import ParentManager from './components/ParentManager.jsx'; // Import ParentManager

import Reports from "./pages/reports";
import AdminHeader from "./components/adminHeader";
import Sidebar from "./components/adminSidebar";
import "./styles/adminStyles.css";
//Hailemeskel

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle("sidebar-open", sidebarOpen);
  };

  return (
    <div className="admin-app">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar className={sidebarOpen ? "open" : "closed"} />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz-management" element={<QuizManagement />} />
            <Route path="/question-management" element={<QuestionManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/catagory-management" element={<CatagoryManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<AdminProfile />} />
            {/* Add ParentManager route */}
            {/* <Route path="/parent-manager" element={<ParentManager />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
