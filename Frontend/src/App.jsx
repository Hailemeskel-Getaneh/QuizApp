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
import Result from './pages/resultPage.jsx';
import FooterPage from './components/Footer.jsx';
import QuizList from './components/quizList';
import QuizCard from './components/quizCard';
import ResultCard from './components/resultCard';

const App = () => {
  const location = useLocation();

  // Conditionally render the header based on the current path
  const renderHeader = () => {
    // List all quiz-related paths that should use Header2
    const quizRelatedPaths = ['/quizPage', '/resultPage', '/quiz/'];

    // Check if the current path is one of the quiz-related pages
    if (quizRelatedPaths.some(path => location.pathname.startsWith(path))) {
      return <Header2 />; 
    }
    return <Header />; // Default header for other pages
  };

  // Conditionally render the footer based on the current path
  const renderFooter = () => {
    const quizRelatedPaths = ['/quizPage', '/resultPage', '/quiz/'];
    
    // Hide the footer on quiz-related pages
    if (quizRelatedPaths.some(path => location.pathname.startsWith(path))) {
      return null; // Do not render footer on quiz pages
    }
    return <FooterPage />; // Default footer for other pages
  };

  return (
    <div>
      {renderHeader()} {/* Conditionally render the header */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/quizPage" element={<QuizPage />} />
          <Route path="/resultPage" element={<Result />} />
        </Route>

        {/* Quiz-related routes */}
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizCard />} />
        <Route path="/quiz/result/:score" element={<ResultCard />} />
      </Routes>

      {renderFooter()} {/* Conditionally render the footer */}
    </div>
  );
};

export default App;
