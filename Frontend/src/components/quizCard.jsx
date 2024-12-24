// QuizCard.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizCard = () => {
  const { state } = useLocation();
  const { questions, quizName } = state || {};

  return (
    <div>
      <h2>{quizName}</h2>
      {questions && questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <p>{question.questionText}</p>
            {/* Render options and logic for answering questions */}
          </div>
        ))
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default QuizCard;
