import React from 'react';
import { useLocation } from 'react-router-dom';

const QuestionsPage = () => {
  const location = useLocation();
  const { questions, quizName } = location.state;

  return (
    <div>
      <h2>{quizName}</h2>
      <div className="questions-container">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
              <p>{question.questionText}</p>
              {/* Add options if needed */}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
