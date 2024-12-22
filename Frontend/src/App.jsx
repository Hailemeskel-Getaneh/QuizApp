import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Header from './components/Header';
import Login from './pages/login';
import QuizPage from './pages/quizPage.jsx';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (
    <div>  
        <Header/>       
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz-page" element={<QuizPage />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/quiz-page" element={<QuizPage />} />
          </Route>
    
      </Routes>
    </div>
  );
};

export default App;
