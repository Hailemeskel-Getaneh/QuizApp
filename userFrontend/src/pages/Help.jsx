import React from 'react';
import '../styles/pagesStyle/help.css';  // Importing the CSS file

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1 className="help-heading">Help and Support</h1>

      <section className="section">
        <h2>How to Play</h2>
        <p className='text'>To start, select a quiz category and choose your preferred difficulty level. Once you're ready, click "Start Quiz" and begin answering the questions. You can navigate through questions by clicking "Next" or choose to skip a question. After completing the quiz, your score will be displayed.</p>
      </section>

      <section className="section">
        <h2>Scoring System</h2>
        <p className='text'>You earn points for each correct answer. There are no penalties for incorrect answers, but time is a factor, so answering quickly will help you score higher. Your final score will be shown at the end of the quiz.</p>
      </section>

      <section className="section">
        <h2>Leaderboard</h2>
        <p className='text'> Your scores are ranked based on your performance. You can view the leaderboard to see how you compare with others!</p>
      </section>

      <section className="section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li className='text'><strong>How do I reset my score?</strong> You can't reseat your score and leaderboard. </li>
          <li className='text'><strong>How can I contact support?</strong> You can contact support via email at support@quizapp.com.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Contact Support</h2>
        <p className='text'>If you have any issues or questions, feel free to reach out to us at <a href="mailto:support@quizapp.com">support@quizapp.com</a>.</p>
      </section>

    
    </div>
  );
};

export default HelpPage;


