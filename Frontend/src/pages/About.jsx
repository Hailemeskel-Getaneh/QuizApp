import React from 'react';
import '../styles/pagesStyle/About.css';  // Importing the CSS file

const AboutPage = () => {
  return (
    <div className="container">
      <h1 className="heading">About Our Quiz App</h1>
      <p className="paragraph">
        Welcome to our Quiz App! This app is designed to make learning fun and engaging by testing your knowledge across various topics. Whether you're a student preparing for exams, a trivia enthusiast, or someone who loves a challenge, our quiz app offers a fun and interactive way to learn and grow.
      </p>
      <p className="paragraph">
        Features include:
      </p>
      <ul className="list">
        <li>Multiple categories to choose from</li>
        <li>Timed quizzes for added challenge</li>
        <li>Track your scores and progress</li>
        <li>Questions of varying difficulty levels</li>
        <li>Option to share your results with friends</li>
      </ul>
      <p className="paragraph">
        Our mission is to provide a platform where learning meets entertainment, ensuring users enjoy their journey while acquiring new knowledge. Stay curious, keep quizzing, and see how you compare with others on the leaderboard!
      </p>
      <footer className="footer">
        <p>Created with ❤️ by QuizApp Team</p>
      </footer>
    </div>
  );
};

export default AboutPage;
