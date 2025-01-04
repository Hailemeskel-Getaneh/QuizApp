import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/pagesStyle/quizCard.css';
import QuizTimer from './QuizTimer.jsx';

const QuizCard = () => {
  const { state } = useLocation();
  const { questions, quizName, quizId, totalTime } = state || {};

  // Check if timer was saved in localStorage and restore it
  const storedTime = localStorage.getItem(`quizTime-${quizId}`);
  const initialTime = storedTime ? parseInt(storedTime) : (totalTime ? totalTime * 60 : 30 * 60);

  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizDuration, setQuizDuration] = useState(initialTime); // Start with the saved or default time

  const QUESTIONS_PER_PAGE = 2;

  // Timer logic to update and handle quiz duration
  useEffect(() => {
    if (quizCompleted) return;

    const interval = setInterval(() => {
      setQuizDuration((prevDuration) => {
        if (prevDuration <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }

        const newDuration = prevDuration - 1;
        localStorage.setItem(`quizTime-${quizId}`, newDuration); // Save remaining time
        return newDuration;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [quizCompleted, quizId]);

  const handleTimeUp = () => {
    setQuizCompleted(true);
    alert('Time is up! Your quiz is being submitted.');
    handleSubmit();
  };

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

  const handleSubmit = async () => {
    setQuizCompleted(true);
    try {
      const score = calculateScore(); // Calculate the score
      await axios.post(`http://localhost:4000/api/quizzes/${quizId}/submit`, {
        answers,
        score,
      });

      alert('Quiz submitted successfully!');
      localStorage.removeItem(`quizTime-${quizId}`); // Clear stored timer
    } catch (error) {
      console.error('Error submitting quiz:', error);
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

  const currentQuestions = questions?.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizName}</h2>
        <QuizTimer duration={quizDuration} onTimeUp={handleTimeUp} />
      </div>

      {quizCompleted ? (
        <div className="quiz-completed-message">
          <h3>Thank you for completing the quiz!</h3>
          <p>
            You answered {Object.keys(answers).length} out of {questions.length}{' '}
            questions.
          </p>
          <p>
            Your score: {calculateScore()} out of {questions.length}.
          </p>
        </div>
      ) : (
        <>
          {currentQuestions && currentQuestions.length > 0 ? (
            <div className="quiz-question-card">
              {currentQuestions.map((question, index) => {
                const questionIndex = currentPage * QUESTIONS_PER_PAGE + index;
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
