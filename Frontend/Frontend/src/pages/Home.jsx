import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pagesStyle/Home.css';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import FooterPage from '../components/Footer'

import quizPage from '../pages/quizPage.jsx';

export default function Home() {
  return (
    <>
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Quiz App</h1>
        <p>Challenge yourself and test your knowledge!</p>
      </div>
      <div className="home-content">
        <p>
          Take quizzes on various topics like science, history, technology, and more. 
          Compete with your friends and see who scores the highest!
        </p>
        <Link to="login">
          <button className="start-quiz-btn">Start Quiz</button>
        </Link>
      </div>
      <div className="home-footer">
        <p>Ready to level up your knowledge? Let’s begin!</p>
      </div>
      </div>

      <About/>
      <Contact/>
      <quizPage/>
    </>
  );
}
