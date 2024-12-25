import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QuizManagement from "./pages/QuizManagement.jsx";
import UserManagement from "./pages/userManagement";
import CatagoryManagement from "./pages/categoryManagement.jsx";
import AdminProfile from './pages/profile.jsx'
import QuestionManagement from "./pages/QuestionManagement.jsx";
import ParentManager from './components/ParentManager.jsx'; // Import ParentManager

import Reports from "./pages/reports";
import AdminHeader from "./components/adminHeader";
import Sidebar from "./components/adminSidebar";

import "./styles/adminStyles.css";
import "./styles/adminStyles.css"; // Ensure the CSS file is imported
import LoginPage from "./pages/adminLogin.jsx";
import Signup from "./pages/signup.jsx";``

const App = () => {
 

  return (
    <>
    
    
    <div className="admin-app">
     
      <AdminHeader />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/logging" element={<LoginPage />} />
            <Route path="/Signup" element={<Signup />} />
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
    </>

  );
};

export default App;
