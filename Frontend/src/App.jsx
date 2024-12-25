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
import QuizCard from './components/quizCard.jsx';
import QuizList from './components/quizList';
import ResultCard from './components/resultCard';


const App = () => {
  const location = useLocation();

  // Conditionally render the header based on the current path
  const renderHeader = () => {
    if (location.pathname === '/quizPage') {
      return <Header2 />;  // Use a different header for the quiz page
      // Use the home-specific header for the home page
    } else if (location.pathname === '/resultPage' )
    return <Header2 />; 
    else {
      return <Header />;  // Default header for other pages
    }
  };
  const renderFooter = () => {

    if (location.pathname === '/quizPage' ) {

    if (location.pathname === '/quiz-page') {

      return  null ;
      
    } else if (location.pathname === '/resultPage' )
    return  null; // Use the result page
    else {
      return <FooterPage/>;  
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


        <Route element={<ProtectedRoute />}>
          <Route path="/quizPage" element={<QuizPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/quiz-page" element={<QuizPage />} />

          <Route path="/Result" element={<Result />} />
          <Route path="/QuizCard" element={<QuizCard />} />
          
        </Route>


    

      </Routes>
      {renderFooter()} 

        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizCard />} />
        <Route path="/quiz/result/:score" element={<ResultCard />} />


      
      {renderFooter()} 

    </div>
  );
};

export default App;