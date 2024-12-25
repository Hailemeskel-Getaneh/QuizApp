import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pagesStyle/quizCard.css';
import QuizTimer from './QuizTimer.jsx';
import axios from 'axios'; // Assuming you're using axios for API calls

const QuizCard = () => {
  const { state } = useLocation();
  const { questions, quizName, quizId } = state || {}; // Include quizId from state
  const [currentPage, setCurrentPage] = useState(0); // Track current page index
  const [answers, setAnswers] = useState({}); // Track user answers
  const [quizCompleted, setQuizCompleted] = useState(false);

  const DEFAULT_TIME = 1800; // Default quiz duration in seconds (e.g., 5 minutes)
  const QUESTIONS_PER_PAGE = 2; // Number of questions per page

  const handleOptionChange = (questionIndex, optionValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionValue,
    }));
  };

  const handleNext = () => {
    if ((currentPage + 1) * QUESTIONS_PER_PAGE < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    setQuizCompleted(true);
    const score = calculateScore(); // Calculate the score when the quiz is submitted

    // Send answers and score to the backend
    try {
      await axios.post(`http://localhost:4000/api/quizzes/${quizId}/submit`, {
        answers,
        score,
        quizId,
        username: 'John Doe', // Replace with actual username from user data
      });

      // Optionally, fetch the leaderboard after submitting
      const leaderboardResponse = await axios.get(`/api/leaderboard/${quizId}`);
      console.log('Leaderboard:', leaderboardResponse.data);

      alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const currentQuestions = questions?.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizName}</h2>
        <QuizTimer duration={DEFAULT_TIME} onTimeUp={handleSubmit} />
      </div>

      {quizCompleted ? (
        <div className="quiz-completed-message">
          <h3>Thank you for completing the quiz!</h3>
          <p>
            You answered {Object.keys(answers).length} out of {questions.length}{' '}
            questions.
          </p>
        </div>
      ) : (
        <>
          {currentQuestions && currentQuestions.length > 0 ? (
            <div className="quiz-question-card">
              {currentQuestions.map((question, index) => {
                const questionIndex =
                  currentPage * QUESTIONS_PER_PAGE + index;
                return (
                  <div key={questionIndex} className="quiz-question">
                    <p className="quiz-question-text">
                      <strong>Question {questionIndex + 1}:</strong>{' '}
                      {question.questionText}
                    </p>
                    <div className="quiz-options">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`quiz-option ${
                            answers[questionIndex] === option ? 'selected' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={option}
                            checked={answers[questionIndex] === option}
                            onChange={() =>
                              handleOptionChange(questionIndex, option)
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="quiz-navigation">
                <button
                  className="quiz-button"
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                {(currentPage + 1) * QUESTIONS_PER_PAGE < questions.length ? (
                  <button className="quiz-button" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className="quiz-button" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default QuizCard;
