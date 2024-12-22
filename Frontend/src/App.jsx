import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Header from './components/Header';
import Login from './pages/login';
import QuizPage from './pages/quizPage.jsx';
import ProtectedRoute from './components/protectedRoute';
import Header2 from './components/Header2';

const App = () => {
  const location = useLocation();

  // Conditionally render the header based on the current path
  const renderHeader = () => {
    if (location.pathname === '/quiz-page') {
      return <Header2 />;  // Use a different header for the quiz page
      // Use the home-specific header for the home page
    } else {
      return <Header />;  // Default header for other pages
    }
  };

  return (
    <div>
      {renderHeader()}  {/* Conditionally render the header */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz-page" element={<QuizPage />} />

        {/* Protected Route for the QuizPage */}
        <Route element={<ProtectedRoute />}>
            <Route path="/quiz-page" element={<QuizPage />} />
          </Route>
    
      </Routes>
    </div>
  );
};

export default App;
